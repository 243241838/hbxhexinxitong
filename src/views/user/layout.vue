<template>
  <div class="Bigbox">
    <div class='leftNav'>
      <ul class='listBox'>
        <li :key="index" v-for="(item,index) in listInfo" class='list'>
          <div v-on:click='statusFlag(item,listInfo)' :class="{activeDiv:item.status}">
            <span>{{item.name}}</span>
            <img :src="item.status?arrowTop:arrow" :alt="item.name" :title="item.name">
          </div>
          <ul class="listBoxTwo" v-if="item.status">
            <li :key="indexs" v-for="(items,indexs) in item.list" class='listTwo'>
              <router-link style="display:block;" :to="(items.hash)" :class="{'www-hidden':items.hidden}">
                <span>{{items.nameTwo}}</span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <mainCon class="rightCon">
      <topNav></topNav>
      <router-view ></router-view> 
    </mainCon>
  </div>
</template>
<script>
import mainCon from "./main.vue";
import topNav from '@src/topNav'
//import {layoutRouter} from '@utils/handleRouter';
export default {
  components:{
    topNav,
    mainCon
  },
  data() {
    return {
      item: require('@res/img/item.png'),
      arrow: require('@res/img/arrow.png'),
      arrowTop: require('@res/img/arrow2.png'),
      listInfo: [
        {
          img: require('@res/img/item.png'),
          name: '用户管理',
          hash:'/user/toUserView',
          isShow: false,          
          status: true,
          list: [
            {
              hash:'/user/toUserView',                            
              nameTwo: '用户信息管理'
            },
            {
              hash:'/user/customerInfoDetails',                                          
              nameTwo: '用户信息详情',
              hidden:true
            },
            {
              hash:'/user/agentAduitView',                                          
              nameTwo: '代理人申请审核'
            },
            {
              hash:'/user/certificationAduitView',                                          
              nameTwo: '实名认证审核'
            },
            {
              hash:'/user/saleManView',                                          
              nameTwo: '代理人信息管理'
            },
            {
              hash:'/user/toAccountView',                                          
              nameTwo: '用户资产管理'
            },
            {
              hash:'/user/toAccountDetail',                                          
              nameTwo: '用户资产管理详情',
              hidden:true
            },
            {
              hash:'/user/toUserCount',                                          
              nameTwo: '用户统计'
            },
            {
              hash:'/user/userInfoEdit',                                          
              nameTwo: '用户信息编辑',
              hidden:true
            },
            {
              hash:'/user/certificationAduitDetail',                                          
              nameTwo: '实名认证审核详情',
              hidden:true
            }
          ]
        }
      ]
    }
  },
  created () {
    //this.listInfo = layoutRouter('user');
  },
  methods: {
    clickHandler() {
      alert(Date.now())
    },
    statusFlag: function (item, listInfo) {
      let status = !item.status;
      for (let list in listInfo) {
        listInfo[list].status = false;
      }
      item.status = status;
    }
  }
}
</script>

