import Template from '@src/template';
import SecondLayout from './layout.vue';

import operatorManage from './operatorManage'; //操作员管理
import addOperator from './addOperator'; //新增操作员
import operatorDetail from './operatorDetail'; //操作员详情
import permission from './permission'; //操作员配置审核权限
import backgroundJobLog from './backgroundJobLog'; //后台日志管理
import roleManage from './roleManage'; //角色管理
import roleDetail from './roleDetail'; //角色详情
import roleAdd from './roleAdd'; //角色添加
import resourceAccredit from './resourceAccredit'; //授权资源
import changePassword from './changePassword'; //密码修改
import auditManage from './auditManage'; //审核管理
import auditDetail from './auditDetail'; //审核新增详情
import specialAuditManage from './specialAuditManage'; //专题审核管理
import productAuditManage from './productAuditManage'; //产品审核管理
import productAuditDetail from './productAuditDetail'; //产品审核详情
import systemMessagesManage from './systemMessagesManage'; //系统消息管理
import systemMessagesEdit from './systemMessagesEdit'; //系统消息管理新增编辑和详情
module.exports = {
    path:'/systemManage', 
    component: Template,
    meta: {
        title: '系统管理'
    },
    children:[
        {
            path:'/', 
            component: SecondLayout,
            children:[
                { 
                    path:'operatorManage',
                    name: 'systemManage_operatorManage',
                    component: operatorManage,
                    meta: {
                        title: '操作员管理'
                    }
                },
                { 
                    path:'operatorDetail',
                    name: 'systemManage_operatorDetail',
                    component: operatorDetail,
                    meta: {
                        title: '操作员详情'
                    }
                },
                { 
                    path:'addOperatorDetail',
                    name: 'systemManage_addOperator',
                    component: addOperator,
                    meta: {
                        title: '新增操作员'
                    }
                },
                { 
                    path:'permissionDetail',
                    name: 'systemManage_permission',
                    component: permission,
                    meta: {
                        title: '配置操作员权限'
                    }
                },
                 { 
                    path:'roleManage',
                    name: 'systemManage_roleManage',
                    component: roleManage,
                    meta: {
                        title: '角色管理'
                    }
                },
                { 
                    path:'roleDetail',
                    name: 'systemManage_roleDetail',
                    component: roleDetail,
                    meta: {
                        title: '角色详情'
                    }
                },
                { 
                    path:'roleAddDetail',
                    name: 'systemManage_roleAdd',
                    component: roleAdd,
                    meta: {
                        title: '角色新增'
                    }
                },
                { 
                    path:'resourceAccreditDetail',
                    name: 'systemManage_resourceAccredit',
                    component: resourceAccredit,
                    meta: {
                        title: '授权资源'
                    }
                },
                { 
                    path:'backgroundJobLog',
                    name: 'systemManage_backgroundJobLog',
                    component: backgroundJobLog,
                    meta: {
                        title: '后台日志'
                    }
                },
                { 
                    path:'changePassword',
                    name: 'systemManage_changePassword',
                    component: changePassword,
                    meta: {
                        title: '密码修改'
                    }
                },
                // { 
                //     path:'auditManage',
                //     name: 'systemManage_auditManage',
                //      component: resolve => import('./auditManage').then(resolve),
                //     // component: operatorManage,
                //     meta: {
                //         title: '审核管理'
                //     }
                // },
                { 
                    path:'specialAuditManage',
                    name: 'systemManage_specialAuditManage',
                    component: specialAuditManage,
                    meta: {
                        title: '专题审核管理'
                    }
                },
                { 
                    path:'auditDetail',
                    name: 'systemManage_auditDetail',
                    component: auditDetail,
                    meta: {
                        title: '专题审核详情'
                    }
                },
                { 
                    path:'productAuditManage',
                    name: 'systemManage_productAuditManage',
                    component: productAuditManage,
                    meta: {
                        title: '产品审核管理'
                    }
                },
                { 
                    path:'productAuditDetail',
                    name: 'systemManage_productAuditDetail',
                    component: productAuditDetail,
                    meta: {
                        title: '产品审核详情'
                    }
                },
                { 
                    path:'systemMessagesManage',
                    name: 'systemManage_systemMessagesManage',
                    component: systemMessagesManage,
                    meta: {
                        title: '系统消息管理'
                    }
                },
                { 
                    path:'systemMessagesEditDetail',
                    name: 'systemManage_systemMessagesEdit',
                    component: systemMessagesEdit,
                    meta: {
                        title: '系统消息编辑和新增'
                    }
                },
            ]
        }
    ]
    
}
