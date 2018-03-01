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
      <router-view></router-view>
    </mainCon>
  </div>
</template>
<script>
import mainCon from "./main.vue";
import topNav from '@src/topNav.vue';
//获取侧边路由
// import {layoutRouter} from '@utils/handleRouter';
export default {
  components: {
    mainCon,
    topNav
  },
  data() {
    return {
      item: require('@res/img/item.png'),
      arrow: require('@res/img/arrow.png'),
      arrowTop: require('@res/img/arrow2.png'),
      listInfo: [
          {
            img: require('@res/img/item.png'),
            name: '交易管理',
            hash:'/dealManage/orderManage',
            status: false,
            list: [
              {
                hash:'/dealManage/orderManage',
                nameTwo: '订单管理查询'
              },
              {
                hash:'/dealManage/policyManage',
                nameTwo: '保单管理'
              },
               {
                hash:'/dealManage/dealStatistics',
                nameTwo: '交易统计'
              },
              {
                hash:'/dealManage/cancellationManage',
                nameTwo: '退保管理'
              }
              // {
              //   hash:'/dealManage/orderDetail',
              //   nameTwo: '订单详情'
              // }
              // {
              //   hash:'/dealManage/moneyDetail',
              //   nameTwo: '交易明细'
              // }
            ]
          },
          {
            img: require('@res/img/item.png'),
            name: '支付渠道管理',
            hash:'/dealManage/paymentChannel',
            status: false,
            list: [
              {
                hash:'/dealManage/paymentChannel',
                nameTwo: '支付渠道管理'
              },
              {
                hash:'/dealManage/channelSwitch',
                nameTwo: '渠道开关'
              },
              {
                hash:'/dealManage/paymentRecord',
                nameTwo: '支付渠道使用记录'
              }
            ]
          }
      ]
    }


  },
  created () {
    // this.listInfo = layoutRouter('billManage');
  },
  methods: {
    clickHandler() {
      alert(Date.now())
    },
    statusFlag: function(item, listInfo) {
      let status = !item.status;
      for (let list in listInfo) {
        listInfo[list].status = false;
      }
      item.status = status;
    }
  }
}
</script>

