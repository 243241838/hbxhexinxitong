export const posTypeArr = [{ value:10, label:'广告类'}, { value:20, label:'标准产品'},{ value:21, label:'专题产品'},{ value:22, label:'促销产品'},{ value:23, label:'限时抢购产品'},{ value:99, label:'其他'}];

export const resourceTypeArr = [{value:10,label:'图片'},{value:20,label:'视频'}];

export const deviceTypeArr = [{value:'1',label:'移动端'},{value:'2',label:'PC端'}];

export const prodAuditStsArr = [{value:0,label:'等待审核'},{value:1,label:'审核通过'},{value:-1,label:'审核不通过'}];
//0: '等待审核'; 1 '审核通过'; -1: '审核不通过';
export const prodSts1StsArr = [{value:0,label:'编辑状态（新增未完成）'},{value:1,label:'新增待审核'},{value:2,label:'新增审核驳回'},{value:6,label:'修改待审核'},{value:7,label:'修改待审核驳回'},{value:10,label:'上架'},{value:-10,label:'下架'}];

export const resourceStsArr = [{value:'1',label:'正常'},{value:'0',label:'未生效'},{value:'-2',label:'过期'},{value:'-1',label:'禁用'}];


// 专题
export const exstsArr = [{value:0,label:'待审核'},{value:-1,label:'审核不通过'},{value:1,label:'审核通过'}];

export const specialTypeArr = [{value:'10',label:'普通'},{value:'20',label:'爆款'}];

export const timestsArr =   [{value:'1',label:'未开始'},{value:'2',label:'进行中'},{value:'3',label:'已结束'}];

export const specialMouldArr =  [{value:'1',label:'模板一'}];

export const domainIdArr =  [{value:'0',label:'所有渠道'},{value:'10',label:'android'},{value:'20',label:'IOS'},{value:'30',label:'WAP'},{value:'101',label:'链钱'},{value:'4442',label:'虫师'}];

export const overbuyTypeArr =  [{value:1,label:'按原价购买'},{value:0,label:'不可购买'}];

export const couponTypeArr =  [{value:1,label:'比例金额'},{value:2,label:'固定金额'},{value:3,label:'随机金额'}];

export const couponTypeAddArr =  [{value:2,label:'固定金额'},{value:3,label:'随机金额'}];

export const couponUserTypeArr =  [{value:0,label:'所有用户'},{value:10,label:'新注册用户'},{value:20,label:'活跃用户'},{value:21,label:'沉默用户'},{value:99,label:'指定用户'}];

export const promotionTypeArr =  [{value:10,label:'注册赠送活动'},{value:11,label:'邀请注册活动'},{value:20,label:'充值赠送活动'},{value:30,label:'交易减免活动'},{value:1,label:'发放红包活动'}];

export const resourceLabelArr =  [{value:'1',label:'IOS'},{value:'2',label:'Android'}];

export const versionStateArr =  [{value:1,label:'正式发布'},{value:2,label:'预发布'}];

export const isOptionalArr =  [{value:1,label:'强制更新'},{value:0,label:'非强制更新'}];

// 产品选择
export const betteMoneyArr =  [{value:1,label:'0-1元'},{value:2,label:'1-10元'},{value:3,label:'10-50元'},{value:4,label:'50-100元'},{value:5,label:'100元及以上'},{value:6,label:'自定义'}];

// 活动赠险
export const RedPromotionTypeArr =  [{value:'10',label:'注册赠送活动'},{value:'11',label:'邀请注册活动'},{value:'20',label:'升级代理人活动'},{value:'30',label:'下单完成赠送活动'},{value:'1',label:'发放红包活动'},{value:'40',label:'用户领取活动'}];

export const giveQuantityArr = [{value:'1',label:'1000-4999'},{value:'2',label:'5000-9999'},{value:'3',label:'10000-19999'}];

export const redTimestsArr =[{value:'1',label:'未开始'},{value:'2',label:'进行中'},{value:'3',label:'已作废'}];

export const promotionTypeClassArr = [{value:5,label:'领用后有效'},{value:10,label:'指定日期'}];

export const periodValueArr = [{value:1,label:'天'},{value:2,label:'周'},{value:3,label:'月'},{value:4,label:'年'}];

export const productUseLimitArr =  [{value:1,label:'指定分类可用'},{value:2,label:'指定商品可用'}];
export const deviceType =  [{value:1,label:'正常'},{value:-1,label:'禁用'}];
//车险分期管理
export const certificateType =  [{value:'',label:'全部'},{value:0,label:'未审核'},{value:1,label:'已审核'},{value:-1,label:'审核失败'}];
export const orderType =  [{value:'',label:'全部'},{value:10,label:'待支付'},{value:20,label:'已支付'},{value:35,label:'已完成'},{value:-11,label:'已失效'}];
export const stateType =  [{value:'',label:'全部'},{value:10,label:'等待询价'},{value:20,label:'询价成功'},{value:-20,label:'询价失败'}];