/**
 * 将字符串转化为16进制码
 * codePointAt('𠮷a')
 */
function codePointAt (str) {
    let arr = [];
    for (let ch of str) {
        arr.push(ch.codePointAt(0).toString(16))
    }
    return arr;
}
/**
 * is32Bit("𠮷") // true
 * is32Bit("a") // false
 */
function is32Bit(c) {
    return c.codePointAt(0) > 0xFFFF;
}
/**
 * 0x20BB7 => 𠮷
 */
function fromCodePoint(code) {
    return String.fromCodePoint(code)
}
/*
console.log('𠮷𠮷𠮷𠮷'.at(0)) // "𠮷"
for (let i of '𠮷𠮷sfd𠮷𠮷') {
    console.log(i)
}
*/

/*
// 编译模板
let template = `
    <ul>
    <% for(let i=0; i < data.supplies.length; i++) { %>
        <li><%= data.supplies[i] %></li>
    <% } %>
    </ul>
`;
function compile(template){
    const evalExpr = /<%=(.+?)%>/g;
    const expr = /<%([\s\S]+?)%>/g;
    template = template
        .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
        .replace(expr, '`); \n $1 \n  echo(`');
    template = 'echo(`' + template + '`);';
    let script =
    `(function parse(data){
        let output = "";

        function echo(html){
        output += html;
        }

        ${ template }

        return output;
    })`;
    return script;
}
let parse = eval(compile(template));
console.log(parse({ supplies: [ "broom", "mop", "cleaner" ] }));
*/

/**
 * let total = 30;
        let msg = passthru`The total is ${total} (${total*1.05} with tax)`;

        function passthru(literals) {
            let result = '';
            let i = 0;
            while (i < literals.length) {
                result += literals[i++];
                if (i < arguments.length) {
                    result += arguments[i];
                }
            }
            return result;
        }
        console.log(msg)
 */