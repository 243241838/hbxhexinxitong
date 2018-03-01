<template>
  <div class="Bigbox">
    <div class='leftNav'>
      <ul class='listBox'>
        <li :key="index" v-for="(item,index) in listInfo" class='list'>
          <div v-on:click='statusFlag(item,listInfo)' :class="{activeDiv:item.status}">
            <!--<img :src="item.img" :alt="item.name" :title="item.name">-->
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
      <router-view></router-view>
    </mainCon>
  </div>
</template>
<script>
  import mainCon from "./main.vue";
  import topNav from '@src/topNav';
  // import {layoutRouter} from '@utils/handleRouter';
  export default {
    components: {
      topNav,
      mainCon
    },
    data() {
      return {
        item: require('@res/img/item.png'),
        arrow: require('@res/img/arrow.png'),
        arrowTop: require('@res/img/arrow2.png'),
        listInfo: [{
          img: require('@res/img/item.png'),
          name: '理赔信息管理',
          hash: '/claim/toMsgList',
          status: true,
          list: [{
              hash: '/claim/toMsgList',
              nameTwo: '理赔信息管理',
              children: [{
                hash: '/claim/toMsgList',
                nameTwo: '理赔信息管理',
              }]
            },
            {
              hash: '/claim/toCountMsg',
              nameTwo: '理赔统计',
              children: [{
                hash: '/claim/toCountMsg',
                nameTwo: '理赔统计',
              }]
            },
            // {
            //   hash: '/claim/policyDetails',
            //   nameTwo: '保单详情',
            //   children: [{
            //     hash: '/claim/policyDetails',
            //     nameTwo: '保单详情',
            //   }]
            // },
            // {
            //   hash: '/claim/claimsDetails',
            //   nameTwo: '理赔详情',
            //   children: [{
            //     hash: '/claim/claimsDetails',
            //     nameTwo: '保单详情',
            //   }]
            // },
            // {
            //   hash: '/claim/followupdetails',
            //   nameTwo: '跟进详情',
            //   children: [{
            //     hash: '/claim/followupdetails',
            //     nameTwo: '跟进详情',
            //   }]
            // },
            // {
            //   hash: '/claim/applydetails',
            //   nameTwo: '申请理赔详情',
            //   children: [{
            //     hash: '/claim/applydetails',
            //     nameTwo: '申请理赔详情',
            //   }]
            // },
            // {
            //   hash: '/claim/successdetails',
            //   nameTwo: '成功理赔详情',
            //   children: [{
            //     hash: '/claim/successdetails',
            //     nameTwo: '成功理赔详情',
            //   }]
            // }
          ]
        }]
      }
    },
    created() {
      //this.listInfo = layoutRouter('systemManage');
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