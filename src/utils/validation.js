
var validate = {}
/* 手机号码*/
validate.validatPhone = (str)=> {
 // const reg = /0?(13|14|15|17|18)[0-9]{9}/;
  const reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
   return reg.test(str);
}

//身份证号码
validate.validaIDCard = (str) => {
  const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
    
  return reg.test(str);
}
//汉字或数字
validate.validaChineseNumber = (str) => {
  const reg = /^[0-9\u4e00-\u9fa5]+$/;
  return reg.test(str)
}
//字母和数字
validate.validaLeterNumber = (str) => {
  const reg = /^[0-9a-zA-Z]+$/;
  return reg.test(str)
}
//版本号
validate.verno = (str) => {
  // const reg = /^([0-9]{1,2}[.]){3}[0-9]{1,2}$/;
  // const reg = /^([0-9]{1,2}[.])[0-9]{1,2}[.][0-9]{1,2}$/;
    const reg = /^\d+(\.\d+)*$/;
  return reg.test(str)
}
//邮箱
validate.validaEmail = (str)=> {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  return reg.test(str)
}
/* 大小写字母*/
validate.validatAlphabets = (str)=> {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}
// url
validate.url = (str)=> {
  const reg = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;
  return reg.test(str);
}



var Common = {}
Common.getCookies = (name) => {
      if (Cookies.get(name)) {
          return JSON.parse(Cookies.get(name));
      } else {
          return '';
      }
}
export {
    validate, Common
}