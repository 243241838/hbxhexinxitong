import Template from '@src/template';
import SecondLayout from './layout.vue';
import channelinformanager from './channelinformanager';
import productsDetails from './productsDetails';
import secretkey from './secretkey';
import productioneditor from './productioneditor';
import channelproductdetails from './channelproductdetails';
import shelvesDetails from './shelvesDetails';
import cooperationDetails from './cooperationDetails';
import managementdetails from './managementdetails';
import informationDetails from './informationDetails';
import channeldetails from './channeldetails';
import keydetails from './keydetails';
import editingdetails from './editingdetails';
module.exports = {
    path: '/channelmanager',
    component: Template,
    meta: {
        title: '渠道管理'
    },
    children: [{
        path: '/',
        component: SecondLayout,
        meta: {
            title: '渠道信息管理'
        },
        children: [{
                path: 'channelinformanager',
                name: 'channelmanager_channelinformanager',
                component: channelinformanager,
                meta: {
                    title: '渠道信息管理'
                }
            }, {
                path: 'productsDetails',
                name: 'channelmanager_productsDetails',
                component: productsDetails,
                meta: {
                    title: '产品详情'
                }
            },
            {
                path: 'secretkey',
                name: 'channelmanager_secretkey',
                component: secretkey,
                meta: {
                    title: '查看秘钥'
                }
            },
            {
                path: 'productioneditor',
                name: 'channelmanager_productioneditor',
                component: productioneditor,
                meta: {
                    title: '编辑详情'
                }
            },
            {
                path: 'channelproductdetails',
                name: 'channelmanager_channelproductdetails',
                component: channelproductdetails,
                meta: {
                    title: '渠道产品详情'
                }
            },
            {
                path: 'shelvesDetails',
                name: 'channelmanager_shelvesDetails',
                component: shelvesDetails,
                meta: {
                    title: '上架产品详情'
                }
            },
             {
                path: 'cooperationDetails',
                name: 'channelmanager_cooperationDetails',
                component: cooperationDetails,
                meta: {
                    title: '合作详情'
                }
            },
            {
                path: 'managementdetails',
                name: 'channelmanager_managementdetails',
                component: managementdetails,
                meta: {
                    title: '管理详情'
                }
            },
            {
                path: 'informationDetails',
                name: 'channelmanager_informationDetails',
                component: informationDetails,
                meta: {
                    title: '新增详情'
                }
            },
             {
                path: 'channeldetails',
                name: 'channelmanager_channeldetails',
                component: channeldetails,
                meta: {
                    title: '管理id详情'
                }
            },
            {
                path: 'keydetails',
                name: 'channelmanager_keydetails',
                component: keydetails,
                meta: {
                    title: '秘钥详情'
                }
            },
            {
                path: 'editingdetails',
                name: 'channelmanager_editingdetails',
                component: editingdetails,
                meta: {
                    title: '秘钥编辑详情'
                }
            }
        ]
    }]

}