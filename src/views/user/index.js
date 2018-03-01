import Template from '@src/template';
import SecondLayout from './layout.vue';
import toUserView from './toUserView.vue';
import customerInfoDetails from './customerInfoDetails.vue';
import agentAduitView from './agentAduitView.vue';
import certificationAduitView from './certificationAduitView.vue';
import saleManView from './saleManView.vue';
import toAccountView from './toAccountView.vue';
import toUserCount from './toUserCount.vue';
import userInfoEdit from './userInfoEdit.vue';
import newAddUser from './newAddUser.vue';
import toAccountDetail from './userInfoEdit';
import toAccountViewDetail from './toAccountViewDetail.vue';
import certificationAduitDetail from './certificationAduitDetail.vue';
module.exports = {
    path:'/user', 
    component: Template,
    meta: {
        title: '客户管理'
    },
    children:[
        {
            path:'/', 
            component: SecondLayout, 
            children:[
                {
                    path:'toUserView',
                    component: toUserView,
                    name:"user_toUserView",
                    meta: {
                        title: '用户信息管理'
                    }
                },
                {  
                    path:'customerInfoDetails',
                    component: customerInfoDetails,
                    name:"user_customerInfoDetails",
                    meta: {
                        title: '用户信息详情'
                    }
                },
                {  
                    path:'agentAduitView',
                    component: agentAduitView,
                    name:"user_agentAduitView",
                    meta: {
                        title: '代理人申请审核'
                    }
                },
                {  
                    path:'certificationAduitView',
                    component: certificationAduitView,
                    name:"user_certificationAduitView",
                    meta: {
                        title: '实名认证审核'
                    }
                },
                {  
                    path:'saleManView',
                    component: saleManView,
                    name:"user_saleManView",
                    meta: {
                        title: '代理人信息管理'
                    }
                },
                {  
                    path:'toAccountView',
                    component: toAccountView,
                    name:"user_toAccountView",
                    meta: {
                        title: '用户资产管理'
                    }
                },
                {  
                    path:'toUserCount',
                    component: toUserCount,
                    name:"user_toUserCount",
                    meta: {
                        title: '用户统计'
                    }
                },
                {  
                    path:'userInfoEdit',
                    component: userInfoEdit,
                    name:"user_userInfoEdit",
                    meta: {
                        title: '用户信息编辑'
                    }
                },
                {  
                    path:'newAddUser',
                    component: newAddUser,
                    name:"user_newAddUser",
                    meta: {
                        title: '新增用户'
                    }
                },
                {  
                    path:'toAccountDetail',
                    component: toAccountDetail,
                    name:"user_toAccountDetail",
                    meta: {
                        title: '用户资产管理详情'
                    }
                },
                {  
                    path:'certificationAduitDetail',
                    component: certificationAduitDetail,
                    name:"user_certificationAduitDetail",
                    meta: {
                        title: '实名认证审核详情'
                    }
                }
            ]
        }
    ]
    
}
