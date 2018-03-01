<template>
    <div>
        <div class="sm-ui-header">
            <div class="sm-ui-operation-main">
                <span class="ui-welcome" v-if="userShow">
                    <span>操作员:{{userName}}</span>
                    <span>上次登录时间：{{lastLoginTime}}</span>
                    <span style="margin-right: 20px;width: 65px;color: #3498da;font-weight: bold;" @click="safeExit">安全退出</span>
                </span>
                <span class="ui-welcome" v-if="!userShow">欢迎您，请登录</span>
            </div>
        </div>
        <div class='header' style="min-width:1480px;" id="_header" v-if="isShow">
            <span class="sm-ui-logo" title="后台管理">
                <img :src="logoUrl" width="60" height="58" />
                <img :src="logotUrl" width="190" height="22" />
            </span>
            <div style="float:left;height:74px;line-height:74px;color: #fff;">
                <el-menu class="el-menu-demo" :default-active="activeIndex" mode="horizontal" background-color="#1ebd7d" style="height:74px;line-height:74px;color: #fff;">
                    <el-menu-item v-for="(item,index) in data" :index="index + ''" :key="index" class="shy-menu-item" style="height:74px;border:none;">
                        <router-link style="color:#fff;display:block;" :to="(item.resourceUrl)">{{item.resourceName}}</router-link>
                    </el-menu-item>
                </el-menu>
            </div>
        </div>
    </div>
</template>

<script>

import config from '@api/config.js';
import { mobile } from '@utils/validate.js';
import logout from '@utils/logout';
import Cookies from 'js-cookie';
import { mapGetters } from 'vuex';

export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm2.checkPass !== '') {
                    this.$refs.ruleForm2.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm2.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            isShow: this.$store.getters.token,
            logoUrl: require('@res/img/logo.png'),
            logotUrl: require('@res/img/logot.png'),
            activeIndex: '0',
            dialogLoading: false,
            mobileDisable: true,
            isEdit: false,
            dialogFormVisible: false,
            userShow: false,
            userName: '',
            lastLoginTime: "",
            sysUserVo: null,
            passwordDialog: false,
            //data: this.$store.getters.headerRouters
            data: [
                { resourceUrl: '/user/toUserView', resourceName: '用户管理' },
                { resourceUrl: '/product/findListView', resourceName: '产品管理' },
                { resourceUrl: '/operationManage/marketingStrategy/priceFix', resourceName: '运营管理' },
                { resourceUrl: '/systemManage/operatorManage', resourceName: '系统管理' },
                { resourceUrl: '/dealManage/orderManage', resourceName: '交易管理' },
                { resourceUrl: '/clientSide/startManage', resourceName: '客户端管理' },
                { resourceUrl: '/claim/toMsgList', resourceName: '理赔管理' },
                { resourceUrl: '/content/toServiceGuide', resourceName: '内容管理' },
                { resourceUrl: '/aduit/withdrawAduitview', resourceName: '财务管理' },
                { resourceUrl: '/channelmanager/channelinformanager', resourceName: '渠道管理' }
            ]
        }
    },
    created() {
        //this.isShow = Cookies.get('token');
        //this.userName = JSON.parse(Cookies.get('user')).userName;
        // console.log(1111111);
        // console.log(this.$store.getters.token);
        // console.log(this.$store.getters.user);
        this.getUserInfo();
        // console.log(Cookies.get('token'))
        // console.log(JSON.parse(Cookies.get('user')).userName);
        // console.log(this.userShow);
        // console.log(this.lastLoginTime);

    },
    computed: {
        //     ...mapGetters([
        //       'user'
        //   ])
    },
    mounted() {
        window.onresize = function(ev) {
            let e = ev || event;
            let width = e.target.innerWidth;
            if (width <= 1000) {
                this.fixedWidth = true;
            } else {
                this.fixedWidth = false;
            }
        }
    },
    methods: {
        getUserInfo() {
            // this.userName = this.$store.getters.user.userName;
            // this.lastLoginTime = this.$store.getters.user.lastLoginTime;
            // this.isShow = this.$store.getters.token;
            let user = Cookies.get('user') ? JSON.parse(Cookies.get('user')):'';
            this.lastLoginTime = user.lastLoginTimeString;
            this.userName = user.userName;
            if (user) {
                this.userShow = true;
            } else {
                this.userShow = false;
            }
            
        },
        handleSelect(key) {
            this.getUserInfo();
            if (key == 'personalInfo') {
                this.dialogFormVisible = true;
            } else if (key == 'modifyPass') {
                this.passwordDialog = true;
            } else if (key == 'logout') {
                logout();
            }
        },
        goUrl(value) {
            this.$router.push({ path: value });
        },
        //安全退出
        safeExit() {
            this.$message({
                message: '安全退出成功！',
                type: 'success'
            });
            logout();
        },
        // 设置头
        setHeader() {
            //this.data = this.$store.getters.headerRouters;
            this.isShow = this.$store.getters.token;
            this.isShow = true;
            this.getUserInfo();
        },
        setActiveIndex(index) {
            this.activeIndex = index + '';
        }
    }
}
</script>
<style lang="less" scoped>
    .shy-menu-item:hover{
        background: #1ebd7d;
    }
    
</style>

