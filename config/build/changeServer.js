var base = require('./base');
var argument = process.argv.splice(2);

if (argument[0] === 'testServer') {
    base('http://10.1.11.49:8080/web/');
} else if (argument[0] === 'build-gxf') {
    base('http://10.1.17.119:8088/');
} else if (argument[0] === 'production') {
    base('https://hxj.51kaledai.com/admin/');
}
//   return "http://10.1.17.166:8070/"  //永平  http://10.1.16.125:8090/
//return "http://10.1.16.125:8090/"  //美
// return "http://10.25.1.31:8080/"  //永平
// return "http://10.1.17.55:8081/" //张展
//    return "http://10.1.17.119:8088/" //开发
// return "http://10.1.11.49:8080/web/" 测试的




// export function baseURL() {
    /* development */
    
    // return '/kxd-admin/' // 王美昕
    // return '/kxd-admin/' // 张永平
    // return '/kxd-admin/' // 俊哥
    // return '/kxd-admin/' // 测试服务器
    // return '/kxd-admin-server/' // 开发服务器

// ------------------------------------------------- //
    /* production */

    // return 'http://10.1.11.43:8080/' // 测试服务器
    // return 'https://hxj.51kaledai.com/admin/' // 线上
// }


