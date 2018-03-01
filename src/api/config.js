import configBase from "@api/configBase";
import Cookies from 'js-cookie';
import logout from '@src/utils/logout';
import router from '@src/router';
const Deferred = function () {
    var promise = {
        resolve: null,
        reject: null,
        promise: null,
    };

    var innerPromise = new Promise((resolve, reject) => {
        promise.resolve = resolve;
        promise.reject = reject;
    });

    promise.promise = innerPromise;

    return promise;
};
export default (params) => {
    const deferred = Deferred();
    configBase(params).post(res => {
        if (res.respCode === '000000') {
        } else if (res.respCode === '200000') {
            // login
             logout();
        } else {
        }
        deferred.resolve(res, params);
    }, err => {
        // 非200
        deferred.reject(err, params);
    })
    return deferred.promise;
}