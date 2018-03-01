// 用户管理
import toUserView from '@src/views/user/toUserView' //用户信息管理
import customerInfoDetails from '@src/views/user/customerInfoDetails';//用户信息详情
import toAccountDetail from '@src/views/user/toAccountDetail';//用户资产管理详情
import agentAduitView from '@src/views/user/agentAduitView';//代理人申请审核
import certificationAduitView from '@src/views/user/certificationAduitView';//实名认证审核
import saleManView from '@src/views/user/saleManView';//代理人信息管理
import toAccountView from '@src/views/user/toAccountView';//用户资产管理
import toUserCount from '@src/views/user/toUserCount';//用户统计
import userInfoEdit from '@src/views/user/userInfoEdit';//用户信息编辑  
import newAddUser from '@src/views/user/newAddUser';//新增用户
//产品管理
import findListView from '@src/views/product/findListView';//个险产品管理
import occupationType from '@src/views/product/occupationType';//职业分类
import toInsurance from '@src/views/product/toInsurance';//保险类别
import toInsurerCompany from '@src/views/product/toInsurerCompany';//保险公司
import toPriceElement from '@src/views/product/toPriceElement';//计价因子
import toClassParam from '@src/views/product/toClassParam';//附加信息
import insuranceType from '@src/views/product/insuranceType';//保障利益
import carFindListView from '@src/views/product/carFindListView';//车险产品管理
import areaService from '@src/views/product/areaService';//地区维护
import carFindListDetail from '@src/views/product/carFindListDetail';//车险产品详情
import carFindEditDetail from '@src/views/product/carFindEditDetail';//车险产品编辑
import personInsuranceProDetail from '@src/views/product/personInsuranceProDetail';//个险产品详情
import findListViewEdit from '@src/views/product/findListViewEdit';//个险产品编辑
import findListViewAdd from '@src/views/product/findListViewAdd';//个险产品新增
import carFindAdd from '@src/views/product/carFindAdd';//车险产品新增
import carInstallment from '@src/views/product/carInstallment';//车险分期产品管理
import carInsurancedetails from '@src/views/product/carInsurancedetails';//车险分期产品管理详情
import carproductinformation from '@src/views/product/carproductinformation';//车险分期产品基本详情
import caraddDetail from '@src/views/product/caraddDetail';//车险分期产品新增详情
// 系统管理
import operatorManage from '@src/views/systemManage/operatorManage'; //操作员管理
import addOperatorDetail from '@src/views/systemManage/addOperator'; //新增操作员
import operatorDetail from '@src/views/systemManage/operatorDetail'; //操作员详情
import permissionDetail from '@src/views/systemManage/permission'; //操作员配置审核权限
import backgroundJobLog from '@src/views/systemManage/backgroundJobLog'; //后台日志管理
import roleManage from '@src/views/systemManage/roleManage'; //角色管理
import roleDetail from '@src/views/systemManage/roleDetail'; //角色详情
import roleAddDetail from '@src/views/systemManage/roleAdd'; //角色添加
import resourceAccreditDetail from '@src/views/systemManage/resourceAccredit'; //授权资源
import changePassword from '@src/views/systemManage/changePassword'; //密码修改
import auditManage from '@src/views/systemManage/auditManage'; //审核管理
import auditDetail from '@src/views/systemManage/auditDetail'; //审核新增详情
import specialAuditManage from '@src/views/systemManage/specialAuditManage'; //专题审核管理
import productAuditManage from '@src/views/systemManage/productAuditManage'; //产品审核管理
import productAuditDetail from '@src/views/systemManage/productAuditDetail'; //产品审核详情
import systemMessagesManage from '@src/views/systemManage/systemMessagesManage'; //系统消息管理
import systemMessagesEditDetail from '@src/views/systemManage/systemMessagesEdit'; //系统消息管理新增编辑和详情
//理赔管理
import toMsgList from '@src/views/claim/toMsgList';
import toCountMsg from '@src/views/claim/toCountMsg';
import policyDetails from '@src/views/claim/policyDetails';
import claimsDetails from '@src/views/claim/claimsDetails';
import applydetails from '@src/views/claim/applydetails';
import followupdetails from '@src/views/claim/followupdetails';
import successdetails from '@src/views/claim/successdetails';
//内容管理
import toServiceGuide from '@src/views/content/toServiceGuide';
import toAddLogo from '@src/views/content/toAddLogo';
import edit from '@src/views/content/edit';
import insured from '@src/views/content/insured';
//财务管理
import withdrawAduitview from '@src/views/aduit/withdrawAduitview';
import failorder from '@src/views/aduit/failorder';
import withdrawaldetails from '@src/views/aduit/withdrawaldetails';
//渠道管理
import channelinformanager from '@src/views/channelmanager/channelinformanager';
import productsDetails from '@src/views/channelmanager/productsDetails';
import secretkey from '@src/views/channelmanager/secretkey';
import productioneditor from '@src/views/channelmanager/productioneditor';
import channelproductdetails from '@src/views/channelmanager/channelproductdetails';
import shelvesDetails from '@src/views/channelmanager/shelvesDetails';
import cooperationDetails from '@src/views/channelmanager/cooperationDetails';
import managementdetails from '@src/views/channelmanager/managementdetails';
import informationDetails from '@src/views/channelmanager/informationDetails';
// 交易管理
import orderManage from '@src/views/dealManage/orderManage'; //订单管理
import orderDetail from '@src/views/dealManage/orderDetail'; //订单详情
import policyManage from '@src/views/dealManage/policyManage'; //保单管理
import dealManagePolicyDetails from '@src/views/claim/policyDetails'; //保单详情
import dealManagePersonInsuranceProDetail from '@src/views/product/personInsuranceProDetail'
import dealManageCarFindListDetail from '@src/views/product/carFindListDetail'
import dealStatistics from '@src/views/dealManage/dealStatistics'; //交易统计
import moneyDetail from '@src/views/dealManage/moneyDeal'; //交易明细
import paymentChannel from '@src/views/dealManage/paymentChannel';//支付渠道管理
import channelSwitch from '@src/views/dealManage/channelSwitch'; //渠道开关
import paymentRecord from '@src/views/dealManage/paymentRecord'; //支付渠道使用记录
import cancellationManage from '@src/views/dealManage/cancellationManage'; //退保管理
//客户端管理
import startManage from '@src/views/clientSide/startManage'; // 启动页面管理
import startManageAddDetail from '@src/views/clientSide/startManageAdd';// 启动页面管理添加
import startManageEditDetail from '@src/views/clientSide/startManageEdit';// 启动页面管理编辑
import AndroidManage from '@src/views/clientSide/AndroidManage'; //安卓版本管理
import IOSManage from '@src/views/clientSide/IOSManage'; //IOS版本管理
import versionAddDetail from '@src/views/clientSide/versionAdd';//版本控制添加
import versionDetail from '@src/views/clientSide/versionDetail';//版本控制详情

//运营管理
import priceFix from '@src/views/operate/marketingStrategyPriceFix';  //定价策略
import specialSubject from '@src/views/operate/marketingStrategySpecialSubject'; //专题管理
import marketingStrategySpecialSubjectAdd from '@src/views/operate/marketingStrategySpecialSubjectAdd'; //专题管理添加
import marketingStrategySpecialSubjectEdit from '@src/views/operate/marketingStrategySpecialSubjectEdit';//专题管理编辑
import marketingStrategySpecialSubjecthotEdit from '@src/views/operate/marketingStrategySpecialSubjecthotEdit';//专题管理爆款编辑
import flashSale from '@src/views/operate/marketingStrategyFlashSale';//限时抢购管理
import marketingStrategyFlashSaleAdd from '@src/views/operate/marketingStrategyFlashSaleAdd';//限时抢购添加
import marketingStrategyFlashSaleEdit from '@src/views/operate/marketingStrategyFlashSaleEdit';//限时抢购编辑
import commissionStrategy from '@src/views/operate/marketingStrategyCommissionStrategy';//佣金策略管理
import marketingStrategyCommissionStrategyAdd from '@src/views/operate/marketingStrategyCommissionStrategyAdd';//佣金策略添加
import marketingStrategyCommissionStrategyEdit from '@src/views/operate/marketingStrategyCommissionStrategyEdit';//佣金策略编辑
import position from '@src/views/operate/adsensePosition';//位置管理
import content from '@src/views/operate/adsenseContent';//内容管理
import adsenseContentAdd from '@src/views/operate/adsenseContentAdd'; //内容管理添加
import adsenseContentEdit from '@src/views/operate/adsenseContentEdit';//内容管理编辑
import recommendationCoefficient from '@src/views/operate/parametersRecommendationCoefficient';//推荐系数管理
import productLabel from '@src/views/operate/parametersProductLabel';//产品标签
import management from '@src/views/operate/couponManagement';//优惠券管理
import couponManagementAdd from '@src/views/operate/couponManagementAdd';//优惠券添加
import couponManagementEdit from '@src/views/operate/couponManagementEdit';//优惠券编辑
import activity from '@src/views/operate/couponActivity';//优惠活动管理
import couponActivityAdd from '@src/views/operate/couponActivityAdd';//优惠活动添加
import couponActivityEdit from '@src/views/operate/couponActivityEdit';//优惠活动编辑
import giftInsurance from '@src/views/operate/couponGiftInsurance';//赠险管理
import couponGiftInsuranceAdd from '@src/views/operate/couponGiftInsuranceAdd';//赠险管理添加
import couponGiftInsuranceEdit from '@src/views/operate/couponGiftInsuranceEdit';//赠险编辑
import carQuotationlist from '@src/views/operate/carQuotationlist';//车险分期报价列表
import carStaginglist from '@src/views/operate/carStaginglist';//车险分期订单列表
import carFulllist from '@src/views/operate/carFulllist';//车险全款订单列表
import couponManagementGrantRecord from '@src/views/operate/couponManagementGrantRecord';
import carFulllistdetails from '@src/views/operate/carFulllistdetails';//车险全款订单编辑详情
import carQuotationdetails from '@src/views/operate/carQuotationdetails';//车险分期报价编辑详情
import carQuotationshowdetails from '@src/views/operate/carQuotationshowdetails';//车险分期报价展示详情
import stagesOrderDetail from '@src/views/operate/stagesOrderDetail'; //分期订单详情
export {
    // 用户管理
    toUserView,
    customerInfoDetails,
    toAccountDetail,
    agentAduitView,
    certificationAduitView,
    saleManView,
    toAccountView,
    toUserCount,
    userInfoEdit,
    newAddUser,
    //产品管理
    findListView,
    occupationType,
    toInsurance,
    toInsurerCompany,
    toPriceElement,
    toClassParam,
    insuranceType,
    carFindListView,
    areaService,
    carFindListDetail,
    carFindEditDetail,
    personInsuranceProDetail,
    findListViewEdit,
    findListViewAdd,
    carFindAdd,
    caraddDetail,
    carInstallment,
    carInsurancedetails,
    carproductinformation,
    // 系统管理
    operatorManage,
    addOperatorDetail,
    operatorDetail,
    permissionDetail,
    roleManage,
    roleDetail,
    roleAddDetail,
    backgroundJobLog,
    resourceAccreditDetail,
    changePassword,
    auditManage,
    auditDetail,
    specialAuditManage,
    productAuditManage,
    productAuditDetail,
    systemMessagesManage,
    systemMessagesEditDetail,
    //理赔管理
    toMsgList,
    toCountMsg,
    policyDetails,
    claimsDetails, 
    followupdetails,
    applydetails,
    successdetails,
    //内容管理
    toServiceGuide,
    toAddLogo,
    edit,
    insured,
    //财务管理
    withdrawAduitview,
    failorder,
    withdrawaldetails, 
    //渠道管理
    channelinformanager,
    productsDetails,
    productioneditor,
    secretkey,
    channelproductdetails,
    shelvesDetails,
    cooperationDetails,
    managementdetails,
    informationDetail,
    channeldetails,
    keydetails,
    editingdetails,
    // 交易管理
    orderManage,
    orderDetail,
    policyManage,
    dealManagePolicyDetails,
    dealManagePersonInsuranceProDetail,
    dealManageCarFindListDetail,
    dealStatistics,
    moneyDetail,
    paymentChannel,
    channelSwitch,
    paymentRecord,
    // 客户端管理
    startManage,
    startManageAddDetail,
    startManageEditDetail,
    AndroidManage,
    IOSManage,
    versionAddDetail,
    versionDetail,

    // 运营管理
    priceFix,
    specialSubject,
    marketingStrategySpecialSubjectAdd,
    marketingStrategySpecialSubjectEdit,
    flashSale,
    marketingStrategyFlashSaleAdd,
    marketingStrategyFlashSaleEdit,
    commissionStrategy,
    marketingStrategyCommissionStrategyAdd,
    marketingStrategyCommissionStrategyEdit,
    marketingStrategySpecialSubjecthotEdit,
    position,
    content,
    adsenseContentAdd,
    adsenseContentEdit,
    recommendationCoefficient,
    productLabel,
    management,
    couponManagementAdd,
    couponManagementEdit,
    activity,
    couponActivityAdd,
    couponActivityEdit,
    giftInsurance,
    couponGiftInsuranceAdd,
    couponGiftInsuranceEdit,
    carQuotationlist,
    carStaginglist,
    carFulllist,
    couponManagementGrantRecord,
    carFulllistdetails,
    carQuotationdetails,
    carQuotationshowdetails,
    stagesOrderDetail
}