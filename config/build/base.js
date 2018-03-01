var fs = require('fs');
var path = require('path');
module.exports = function write (ip) {
    var data = getData(ip);
    var p = path.resolve(__dirname, '../../src/api/base.js');
    fs.writeFile(p, data, function (err) {
        if (err) {
            throw err;
        }
        console.log('change server is successful: ' + ip);
    })
    function getData (ip) {
        return `
            export function baseURL () {
                return ` + '"' + ip  + '"' + `
            }
        `
    }
}