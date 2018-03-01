import ajax from '@api/api-factory';
import {baseURL} from '@api/base.js';
import Cookies from 'js-cookie';


export default ajax({
    url: v => baseURL() + `${v.url}`,
    optionParams: ['url'],
    params: {
        // pageIndex: {
        //     defaultValue: 0
        // },
        // pageSize: {
        //     defaultValue: 10
        // },
        // type: {
        //     defaultValue: 'json'
        // },
        // _: {
        //     defaultValue: () => Date.now()
        // }
    }
});