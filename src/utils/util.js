// 去掉string前后空格
export function trim (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
}

export const changeDate= function(orgDate,datetype){
    if(datetype&&datetype=='datetime'&&orgDate){
        let temDate = new Date(orgDate);
        return temDate.getFullYear()+"-"+
            ((temDate.getMonth()+1) <10 ? ("0"+(temDate.getMonth()+1)):(temDate.getMonth()+1))
            +"-"+
            ( temDate.getDate()<10?("0"+temDate.getDate()) : temDate.getDate()  )
            +" "+
            ( temDate.getHours()<10?("0"+temDate.getHours()) : temDate.getHours()  )
            +":"+
            ( temDate.getMinutes()<10?("0"+temDate.getMinutes()) : temDate.getMinutes()  )
            +":"+
            ( temDate.getSeconds()<10?("0"+temDate.getSeconds()) : temDate.getSeconds()  )
            ;
    }
    if(!datetype&&orgDate){
        let temDate = new Date(orgDate);
        return temDate.getFullYear()+"-"+
            ((temDate.getMonth()+1) <10 ? ("0"+(temDate.getMonth()+1)):(temDate.getMonth()+1))
            +"-"+
            ( temDate.getDate()<10?("0"+temDate.getDate()) : temDate.getDate()  );
    }
    return null;
}

