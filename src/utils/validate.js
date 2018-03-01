
/* 是否是公司邮箱*/
export function isWscnEmail(str) {
  const reg = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@51lianchuan\.com$/i;
  return reg.test(str.trim());
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 验证key*/
// export function validateKey(str) {
//     var reg = /^[a-z_\-:]+$/;
//     return reg.test(str);
// }

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/* 手机号码*/
export function validatPhone(str) {
 // const reg = /0?(13|14|15|17|18)[0-9]{9}/;
  const reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
   return reg.test(str);
}


/* 身份证号*/
export function validaIDCard(str) {
  const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
    
  return reg.test(str);
}

/* 金额*/
export function validaMoney(str){
  const reg = /^[0-9]+(.[0-9]{1,2})?$/;
  return reg.test(str);
}


/* 正整数*/
export function validaInt(str){
  const reg = /^[1-9]\d*$/;
  return reg.test(str);
}


/* 企业账户号*/
export function validaAccount(str){
  const reg = /^\d{1,30}$/;
  return reg.test(str);
}


/* 输入字符控制*/
export function validaString(str){
  const reg = /^\S{1,100}$/;
  return reg.test(str);
}


// 手机号码
export var mobile = [
    {required: true, message: '手机不能为空', trigger: 'blur'},
    {required: true, pattern: /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$|17[0-9]{9}$/, message: '手机格式有误', trigger: 'blur'}
]
// 用户账号
export var userName = [
    {required: true, message: '账号不能为空', trigger: 'blur'},
    {required: true, pattern: /^(\w){3,20}$/, message: '只能输入3-20个字母、数字、下划线'}
]

// 邮箱
export var email = [
    {required: true, message: '邮箱不能为空', trigger: 'blur'},
    {required: true,pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, message: '邮箱格式有误', trigger: 'blur'}
]
//验证是否是整数
 export function isInteger(obj) {
    return typeof obj === 'number' && obj%1 === 0
}