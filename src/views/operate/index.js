import SecondLayout from './layout.vue';
const layout = {
    template: `<router-view></router-view>`
}
//运营管理
import marketingStrategyPriceFix from './marketingStrategyPriceFix';  //定价策略
import marketingStrategySpecialSubject from './marketingStrategySpecialSubject'; //专题管理
import marketingStrategySpecialSubjectAdd from './marketingStrategySpecialSubjectAdd'; //专题管理添加 543
import marketingStrategySpecialSubjectEdit from './marketingStrategySpecialSubjectEdit';//专题管理编辑
import marketingStrategySpecialSubjecthotEdit from './marketingStrategySpecialSubjecthotEdit';//专题管理爆款编辑
import marketingStrategyFlashSale from './marketingStrategyFlashSale';//限时抢购管理
import marketingStrategyFlashSaleAdd from './marketingStrategyFlashSaleAdd';//限时抢购添加
import marketingStrategyFlashSaleEdit from './marketingStrategyFlashSaleEdit';//限时抢购编辑 65465
import marketingStrategyCommissionStrategy from './marketingStrategyCommissionStrategy';//佣金策略管理
import marketingStrategyCommissionStrategyAdd from './marketingStrategyCommissionStrategyAdd';//佣金策略添加 790
import marketingStrategyCommissionStrategyEdit from './marketingStrategyCommissionStrategyEdit';//佣金策略编辑 7987
import adsensePosition from './adsensePosition';//位置管理
import adsenseContent from './adsenseContent';//内容管理
import adsenseContentAdd from './adsenseContentAdd'; //内容管理添加
import adsenseContentEdit from './adsenseContentEdit';//内容管理编辑
import parametersRecommendationCoefficient from './parametersRecommendationCoefficient';//推荐系数管理
import parametersProductLabel from './parametersProductLabel';//产品标签
import couponManagement from './couponManagement';//优惠券管理
import couponManagementAdd from './couponManagementAdd';//优惠券添加
import couponManagementEdit from './couponManagementEdit';//优惠券编辑
import couponActivity from './couponActivity';//优惠活动管理
import couponActivityAdd from './couponActivityAdd';//优惠活动添加
import couponActivityEdit from './couponActivityEdit';//优惠活动编辑
import couponGiftInsurance from './couponGiftInsurance';//赠险管理
import couponGiftInsuranceAdd from './couponGiftInsuranceAdd';//赠险管理添加
import couponGiftInsuranceEdit from './couponGiftInsuranceEdit';//赠险编辑
import carQuotationlist from './carQuotationlist';//车险分期报价列表
import carStaginglist from './carStaginglist';//车险分期订单列表
import carFulllist from './carFulllist';//车险全款订单列表
import couponManagementGrantRecord from './couponManagementGrantRecord';

import carFulllistdetails from '@src/views/operate/carFulllistdetails';//车险全款订单编辑详情
import carQuotationdetails from '@src/views/operate/carQuotationdetails';//车险分期报价编辑详情
import carQuotationshowdetails from '@src/views/operate/carQuotationshowdetails';//车险分期报价展示详情
import stagesOrderDetail from './stagesOrderDetail'; //分期订单详情
module.exports = {
    path: '/operationManage',
    component: layout,
    meta: {
        title: '运营管理'
    },
    children:[
        {
            path: '/',
            component: SecondLayout,
            children: [
                {
                    path: 'marketingStrategy/priceFix',
                    component:marketingStrategyPriceFix,
                    meta: {
                        title: '定价管理'
                    },
                    name: 'marketingStrategy_priceFix'
                },
                {
                    path: 'marketingStrategy/specialSubject',
                    component:marketingStrategySpecialSubject,
                    meta: {
                        title: '专题管理'
                    },
                    name: 'marketingStrategy_specialSubject'
                },
                 {
                    path: 'marketingStrategy/flashSale',
                    component:marketingStrategyFlashSale,
                    meta: {
                        title: '限时抢购管理'
                    },
                    name: 'marketingStrategy_flashSale'
                },
                {
                    path: 'marketingStrategy/commissionStrategy',
                    component:marketingStrategyCommissionStrategy,
                    meta: {
                        title: '佣金策略管理'
                    },
                    name: 'marketingStrategy_commissionStrategy'
                },
                {
                    path: 'adsense/position',
                    component:adsensePosition,
                    meta: {
                        title: '位置管理'
                    },
                    name: 'adsense_position'
                },
                {
                    path: 'adsense/content',
                    component:adsenseContent,
                    meta: {
                        title: '已处理账单'
                    },
                    name: 'adsense_content'
                },
                {
                    path: 'parameters/recommendationCoefficient',
                    component:parametersRecommendationCoefficient,
                    meta: {
                        title: '推荐系数'
                    },
                    name: 'parameters_recommendationCoefficient'
                },
                {
                    path: 'parameters/productLabel',
                    component:parametersProductLabel,
                    meta: {
                        title: '产品标签'
                    },
                    name: 'parameters_productLabel'
                },
                {
                    path: 'coupon/management',
                    component:couponManagement,
                    meta: {
                        title: '优惠劵管理'
                    },
                    name: 'coupon_management'
                },
                {
                    path: 'coupon/activity',
                    component:couponActivity,
                    meta: {
                        title: '优惠劵活动管理'
                    },
                    name: 'coupon_activity'
                },
                {
                    path: 'coupon/giftInsurance',
                    component:couponGiftInsurance,
                    meta: {
                        title: '优惠劵活动管理'
                    },
                    name: 'coupon_giftInsurance'
                },
                {
                    path: 'marketingStrategy/specialSubject/edit',
                    component:marketingStrategySpecialSubjectEdit,
                    meta: {
                        title: '已处理账单'
                    },
                    name: 'marketingStrategy_specialSubject_edit'
                },
                {
                    path: 'marketingStrategy/specialSubject/add',
                    component:marketingStrategySpecialSubjectAdd,
                    meta: {
                        title: '已处理账单'
                    },
                    name: 'marketingStrategy_specialSubject_add'
                },
                {
                    path: 'adsense/content/add',
                    component:adsenseContentAdd,
                    meta: {
                        title: '广告内容新增'
                    },
                    name: 'adsense_content_add'
                },
                {
                    path: 'adsense/content/edit',
                    component:adsenseContentEdit,
                    meta: {
                        title: '广告内容编辑'
                    },
                    name: 'adsense_content_edit'
                },
                {
                    path: 'marketingStrategy/flashSale/add',
                    component:marketingStrategyFlashSaleAdd,
                    meta: {
                        title: '限时抢购管理'
                    },
                    name: 'marketingStrategy_flashSale_add'
                },
                {
                    path: 'marketingStrategy/flashSale/edit',
                    component:marketingStrategyFlashSaleEdit,
                    meta: {
                        title: '限时抢购管理'
                    },
                    name: 'marketingStrategy_flashSale_edit'
                },
                {
                    path: 'marketingStrategy/commissionStrategy/add',
                    component:marketingStrategyCommissionStrategyAdd,
                    meta: {
                        title: '限时抢购管理'
                    },
                    name: 'marketingStrategy_commissionStrategy_add'
                },
                {
                    path: 'marketingStrategy/commissionStrategy/edit',
                    component:marketingStrategyCommissionStrategyEdit,
                    meta: {
                        title: '限时抢购管理'
                    },
                    name: 'marketingStrategy_commissionStrategy_edit'
                },
                {
                    path: 'coupon/management/add',
                    component:couponManagementAdd,
                    meta: {
                        title: '优惠劵管理添加'
                    },
                    name: 'coupon_management_add'
                },
                {
                    path: 'coupon/management/edit',
                    component:couponManagementEdit,
                    meta: {
                        title: '优惠劵管理编辑'
                    },
                    name: 'coupon_management_edit'
                },
                {
                    path: 'coupon/management/grantRecord',
                    component:couponManagementGrantRecord,
                    meta: {
                        title: '优惠劵管理编辑'
                    },
                    name: 'coupon_management_grantRecord'
                }
                ,
                {
                    path: 'coupon/activity/add',
                    component:couponActivityAdd,
                    meta: {
                        title: '优惠劵活动添加'
                    },
                    name: 'coupon_activity_add'
                },
                {
                    path: 'coupon/activity/edit',
                    component:couponActivityEdit,
                    meta: {
                        title: '优惠劵活动编辑'
                    },
                    name: 'coupon_activity_edit'
                },
                {
                    path: 'coupon/giftInsurance/add',
                    component:couponGiftInsuranceAdd,
                    meta: {
                        title: '赠险添加'
                    },
                    name: 'coupon_giftInsurance_add'
                },
                {
                    path: 'coupon/giftInsurance/edit',
                    component:couponGiftInsuranceEdit,
                    meta: {
                        title: '赠险编辑'
                    },
                    name: 'coupon_giftInsurance_edit'
                },
                 {
                    path: '/operationManage/car/Quotationlist',
                    component:carQuotationlist,
                    meta: {
                        title: '报价列表'
                    },
                    name: 'car_Quotation_list'
                },
                 {
                    path: '/operationManage/car/Staginglist',
                    component:carStaginglist,
                    meta: {
                        title: '分期订单列表'
                    },
                    name: 'car_Staging_list'
                },
                 {
                    path: '/operationManage/car/Fulllist',
                    component:carFulllist,
                    meta: {
                        title: '全款订单列表'
                    },
                    name: 'car_Full_list'
                },
                 {
                    path: '/marketingStrategy/SpecialSubjecthotEdit',
                    component:marketingStrategySpecialSubjecthotEdit,
                    meta: {
                        title: '专题爆款详情'
                    },
                    name: 'marketingStrategy_SpecialSubjecthotEdit'
                },
                {
                    path: '/operationManage/car/Fulllistdetails',
                    component:carFulllistdetails,
                    meta: {
                        title: '全款订单详情'
                    },
                    name: 'car_Full_listdetails'
                },
                 {
                    path: '/operationManage/car/Quotationdetails',
                    component:carQuotationdetails,
                    meta: {
                        title: '报价订单编辑详情'
                    },
                    name: 'car_Quotation_details'
                },
                 {
                    path: '/operationManage/car/Quotationshowdetails',
                    component:carQuotationshowdetails,
                    meta: {
                        title: '报价订单展示详情'
                    },
                    name: 'car_Quotation_showdetails'
                },
                { 
                    path:'stagesOrderDetail',
                    name: 'product_stagesOrderDetail',
                    component: stagesOrderDetail, 
                    meta: {
                        title: '车险分期详情'
                    }
                }

            ]
        }
    ]

}
