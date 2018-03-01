
/*授信申请状态*/ 
export const creditApplyStatus=[{ code:-10, text:'已拒绝', tag: 'danger'},{ code:10, text:'已审批', tag: 'success'}, { code:1, text:'待审批', tag: 'wanner'},{code:0, text:'资料完善中', tag: 'wanner'} ];

/*操作方式*/
export const operationStyle=[{ code:1, text:'自动扣款'},{ code:2, text:'手动扣款'},{ code:3, text:'线下冲账'}];

 export const pickerOptions = {shortcuts:[
   {
     text: '今天',
     onClick(picker) {
       const end = new Date();
       const start = new Date(new Date().toDateString());
       end.setTime(start.getTime());
       picker.$emit('pick', [start, end]);
     }
   }, {
     text: '最近一周',
     onClick(picker) {
       const end = new Date(new Date().toDateString());
       const start = new Date();
       start.setTime(end.getTime() - 3600 * 1000 * 24 * 7);
       picker.$emit('pick', [start, end]);
     }
   }, {
     text: '最近一个月',
     onClick(picker) {
       const end = new Date(new Date().toDateString());
       const start = new Date();
       start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
       picker.$emit('pick', [start, end]);
     }
   }, {
     text: '最近三个月',
     onClick(picker) {
       const end = new Date(new Date().toDateString());
       const start = new Date();
       start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
       picker.$emit('pick', [start, end]);
     }
   }]}