/* eslint-disable no-invalid-this */

import axios from 'axios';
import _ from 'underscore';
import Cookies from 'js-cookie'

const ajax = axios.create();

export class Descriptor {
  constructor(desc) {
    //_.isFunction(desc.url) ;判断是不是个方法
    this._url = _.isFunction(desc.url) ? desc.url : () => desc.url;
    this._defaultParams = _.mapObject(desc.params, v => v.defaultValue);
    this._headers = desc.headers || {};
    this._optionParams = desc.optionParams;
    //服务器响应的数据类型
    this._responseType = desc.responseType || 'json';
    //消息主体用那种方式编码
    this._contentType = `${desc.contentType || 'application/json'}; charset=UTF-8`;
  }

  makeParams(paramsFns) {
    return _.chain(paramsFns)
      .reduce((acc, v) => {
        const p = _.isFunction(v) ? v.call(acc) : v;
        return _.extend({}, acc, _.omit(p, value => _.isUndefined(value)));
      }, this._defaultParams)
      .mapObject((v, k, a) => _.isFunction(v) ? v.call(a) : v, this)
      .value();
  }

  makeRequest(method, params) {
    //
    if(Cookies.get('token')) {
      this._headers.token = Cookies.get('token')
    }
    //
    const data = _.omit.apply(_, [params].concat(this._optionParams))
      , useBody = method === 'POST' || method === 'PUT' || method === 'PATCH'
      , headers = _.extend({
        'Content-Type': this._contentType,
      }, this._headers);
    return _.extend({
      method,
      headers,
      cancelToken: null,
      url: this._url(params),
      responseType: this._responseType,
    }, useBody ? { data } : { params: data });
  }
}
  
export default (descriptor) => {
  const desc = new Descriptor(descriptor);

  return function () {
    const paramsFns = [].slice.call(arguments, 0)
      , exec = function (method, fn, errFn) {
        const params = desc.makeParams(paramsFns);
        let ajaxOption = desc.makeRequest(method, params);

        if (this._token) {
          this._token.cancel('Cancel ajax request.');
          this._token = null;
        }
        this._token = axios.CancelToken.source();
        
        ajaxOption.cancelToken = this._token.token;
        ajax(ajaxOption)
          .then(v => {
            this._token = null;
            fn(v.data, params);
          })
          .then(null, err => {
            if (!axios.isCancel(err)) {
              this._token = null;
              errFn(err, params);
            }
          });
      };

    return {
      get(fn, errFn) {
        return exec.call(this, 'GET', fn, errFn);
      },
      post(fn, errFn) {
        return exec.call(this, 'POST', fn, errFn);
      },
      put(fn, errFn) {
        return exec.call(this, 'PUT', fn, errFn);
      },
      del(fn, errFn) {
        return exec.call(this, 'DELETE', fn, errFn);
      },
    };
  };
};
