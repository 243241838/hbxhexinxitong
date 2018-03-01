import Template from '@src/template';
import SecondLayout from './layout.vue';

import findListView from './findListView';
import occupationType from './occupationType';
import toInsurance from './toInsurance';
import toInsurerCompany from './toInsurerCompany';
import toPriceElement from './toPriceElement';
import toClassParam from './toClassParam';
import insuranceType from './insuranceType';
import carFindListView from './carFindListView';
import areaService from './areaService';
import carFindListDetail from './carFindListDetail';
import carFindEditDetail from './carFindEditDetail';
import personInsuranceProDetail from './personInsuranceProDetail';
import findListViewEdit from './findListViewEdit';
import findListViewAdd from './findListViewAdd';
import carFindAdd from './carFindAdd';
import carInstallment from './carInstallment';
import carInsurancedetails from './carInsurancedetails';
import carproductinformation from './carproductinformation';
import caraddDetail from './caraddDetail';
module.exports = {
    path:'/product', 
    component: Template,
    meta: {
        title: '产品管理'
    },
    children:[
        {
            path:'/', 
            component: SecondLayout,  
            children:[
                { 
                    path:'findListView',
                    name: 'product_findListView',
                    component: findListView,
                    meta: {
                        title: '个险产品管理'
                    }
                },
                { 
                    path:'carFindListView',
                    name: 'product_carFindListView',
                    component: carFindListView,
                    meta: {
                        title: '车险产品管理'
                    }
                },
                { 
                    path:'occupationType',
                    name: 'product_occupationType',
                    component: occupationType,
                    meta: {
                        title: '职业分类'
                    }
                },
                { 
                    path:'toInsurance',
                    name: 'product_toInsurance',
                    component: toInsurance, 
                    meta: {
                        title: '保险类别'
                    }
                },
                { 
                    path:'toInsurerCompany',
                    name: 'product_toInsurerCompany',
                    component: toInsurerCompany, 
                    meta: {
                        title: '保险公司'
                    }
                },
                { 
                    path:'toPriceElement',
                    name: 'product_toPriceElement',
                    component: toPriceElement, 
                    meta: {
                        title: '计价因子'
                    }
                },
                { 
                    path:'toClassParam',
                    name: 'product_toClassParam',
                    component: toClassParam, 
                    meta: {
                        title: '附加信息'
                    }
                },
                { 
                    path:'insuranceType',
                    name: 'product_insuranceType',
                    component: insuranceType, 
                    meta: {
                        title: '保障利益'
                    }
                },
                { 
                    path:'areaService',
                    name: 'product_areaService',
                    component: areaService, 
                    meta: {
                        title: '地区维护'
                    }
                },
                { 
                    path:'carFindListDetail',
                    name: 'product_carFindListDetail',
                    component: carFindListDetail, 
                    meta: {
                        title: '车险产品详情'
                    }
                },
                { 
                    path:'carFindEditDetail',
                    name: 'product_carFindEditDetail',
                    component: carFindEditDetail, 
                    meta: {
                        title: '车险产品编辑'
                    }
                },
                { 
                    path:'personInsuranceProDetail',
                    name: 'product_personInsuranceProDetail',
                    component: personInsuranceProDetail, 
                    meta: {
                        title: '个险产品详情'
                    }
                },
                { 
                    path:'findListViewEdit',
                    name: 'product_findListViewEdit',
                    component: findListViewEdit, 
                    meta: {
                        title: '个险产品编辑'
                    }
                },
                { 
                    path:'findListViewAdd',
                    name: 'product_findListViewAdd',
                    component: findListViewAdd, 
                    meta: {
                        title: '个险产品新增'
                    }
                },
                { 
                    path:'carFindAdd',
                    name: 'product_carFindAdd',
                    component: carFindAdd, 
                    meta: {
                        title: '车险产品新增'
                    }
                },
                { 
                    path:'carInstallment',
                    name: 'product_carInstallment',
                    component: carInstallment, 
                    meta: {
                        title: '车险分期产品管理'
                    }
                },
                 { 
                    path:'carInsurancedetails',
                    name: 'product_carInsurancedetails',
                    component: carInsurancedetails, 
                    meta: {
                        title: '车险分期产品详情'
                    }
                },
                 { 
                    path:'carproductinformation',
                    name: 'product_carproductinformation',
                    component: carproductinformation, 
                    meta: {
                        title: '车险分期产品基本信息'
                    }
                },
                 { 
                    path:'caraddDetail',
                    name: 'product_caraddDetail',
                    component: caraddDetail, 
                    meta: {
                        title: '车险分期新增'
                    }
                }
            ]
        }

    ]
    
}
