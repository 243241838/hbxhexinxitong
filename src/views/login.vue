<template>
  <!-- <div class="login-container">
            <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="login-form">
              <h3 class="title">核心业务系统</h3>
              <el-form-item class="www-form-item" prop="email">
                <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="登录名"></el-input>
              </el-form-item>
              <el-form-item class="www-form-item" prop="password">
                <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码"></el-input>
              </el-form-item>
              <el-form-item class="www-form-item">
                <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.validateCode" autoComplete="on" placeholder="验证码"></el-input>
              </el-form-item>
              <el-form-item >
                <img :src="imgUrl" alt="" @click="reLoad" />
              </el-form-item>
              <el-form-item class="www-form-item">
                <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
                  登录
                </el-button>
              </el-form-item>

            </el-form>

          </div> -->
  <div class="ui-login-body">
    <div class="sm-ui-header">
    </div>
    <div class="ui-login-main">
      <div class="ui-logion-logo">
        <img :src="logoUrl" width="62" height="60" />
        <img :src="logotUrl" width="302" height="31" />
      </div>
      <div class="ui-login-form fn-clear">
        <div class="ui-poll-wrap">
          <h3>最新消息</h3>
          <p class="ui-blue-hr"></p>
          <div class="ui-poll-out">
            <ul class="ui-poll-list fn-clear" id="scroll-list">
              <li>
                <label>暂无消息</label>
                <span></span>
              </li>
            </ul>
          </div>
          <p class="ui-blue-hr"></p>
          <div class="ui-triangle-bor"></div>
          <div class="ui-triangle"></div>

        </div>
        <div class="ui-login-right">
          <!-- <form class="ui-login-right-form" id="login-form" action="j_spring_security_check" method="post"> -->
          <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="ui-login-item" style="padding-top:30px;">
            <el-form-item prop="username" label="帐号" label-width="80px">
              <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="帐号" class="ui-login-input" style="width:240px;"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码" label-width="80px">
              <el-input name="password" type="password" v-model="loginForm.password" autoComplete="on" placeholder="密码" class="ui-login-input" style="width:240px;"></el-input>
            </el-form-item>
            <el-form-item prop="validateCode" label="验证码" label-width="80px">
              <el-input name="validateCode" type="text" @keyup.enter.native="handleLogin" v-model="loginForm.validateCode" autoComplete="on" placeholder="验证码" class="ui-login-input" style="width:134px;"></el-input>
              <img :src="imgUrl" alt="" @click="reLoad" />
            </el-form-item>
            <el-form-item>
              <input type="checkbox" class="ui-ckbox" id="rembName" />
              <label class="ui-remb">记住用户名</label>
              <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin">
                登录
              </el-button>
            </el-form-item>
          </el-form>
          <!-- <div class="ui-login-item">
        		            	<label>帐号</label>
        		            	<input type="text" name="username" class="easyui-validatebox ui-login-input" 
        		            	       data-options="required:true,validType:['letter']" missingMessage="请输入用户名" placeholder="请输入"/>
        		            </div>
        		            <div class="ui-login-item">
        		            	<label>密码</label>
        		            	<input type="password" name="password" class="easyui-validatebox ui-login-input"  required=true missingMessage="请输入密码" placeholder="请输入"/></div>
        		            <div class="ui-login-item">
        		            	<label>验证码</label>
        		            	<input type="text" name="validateCode" class="ui-login-dinput"  placeholder="请输入"/>
        		            	<img src="/resource/images/randImage.jsp" id="randImage" onclick="changeImage();"/>
        		            </div>
        		            <div class="ui-login-item">
        		            	<label> </label>
        		            	<input type="checkbox" class="ui-ckbox" id="rembName"/><label class="ui-remb">记住用户名</label>
        		            	<input type="button" value="登录"  class="ui-btn-blue" onclick="loginSubmit(this);">
        		            </div> -->
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import config from '@api/config';
import Cookies from 'js-cookie';
import { baseURL } from '@api/base.js';
import { mapGetters } from 'vuex';
import store from '@src/store';
//import handleRouter from '@src/utils/handleRouter';
import '@res/css/login.less';
export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('登录名不能为空！'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位！'));
      } else {
        callback();
      }
    };
    const validateValidateCode = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('验证码不能小于4位！'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        url: 'doLogin',
        username: '',
        password: '',
        validateCode: ''
      },
      loginRules: {
        username: [
          { trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { trigger: 'blur', validator: validatePass }
        ],
        validateCode: [
          { trigger: 'blur', validator: validateValidateCode }
        ],
      },
      loading: false,
      imgUrl: '',
      imgStatus: true,
      logoUrl: require('@res/img/logo.png'),
      logotUrl: require('@res/img/logot.png'),
    }
  },
  mounted() {

  },
  created() {
    this.imgUrl = baseURL() + "getValidateCode";
    console.log(require('@res/img/logo.png'))
    //document.getElementsById('header').style.display = 'none';
  },
  computed: {
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.login();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      this.login();
    },
    // 登录
    login() {
      config(this.loginForm).then(response => {
        // token
        if (response.respCode === '000000') {

          Cookies.set('token', response.data.token);
          Cookies.set('user', response.data.user);

          //this.$store.dispatch('SETUSER', {user: JSON.parse(response.data.user)});
          this.$router.push({path:'/user/toUserView'});
          this.$store.dispatch('SETTOKEN', { token: response.data.token });
          this.$store.dispatch('SETUSER', { token: response.data.user });
          this.$parent.$refs.profile.setHeader();
          this.getMenuList();
        } else {
          this.$message.error(response.respMsg)
        }
        this.loading = false;
      }).catch(err => {
        this.loading = false;
      });

    },
    reLoad() {
      var i = Math.random();//目的是使图片不一样  
      this.imgUrl = baseURL() + "getValidateCode?" + i;
    },
    // 用户信息
    // userInfo() {
    //   this.$store.dispatch('USERINFO').then(response => {
    //     this.$store.dispatch('SETUSER', { user: response.data.sysUserPo });
    //     this.getMenuList();
    //   })
    // },
    // 菜单信息
    getMenuList() {

      this.$store.dispatch('MenuList').then(response => {
        // handleRouter(response.data, true).then(() => {
        //   this.$parent.$refs.profile.setHeader();
        // })
      })
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: #eeeeee;
    height: 47px;
  }
  .el-input {
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: #eeeeee;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .el-form-item {
    // border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .forget-pwd {
    color: #fff;
  }
  .www-form-item {
    padding: 0 50px;
  }
}
</style>
