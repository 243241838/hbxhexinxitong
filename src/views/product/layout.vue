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
import topNav from '@src/topNav';
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
          name: '产品信息管理',
          hash:'/product/findListView',    
          status: true,
          list: [
            {
              hash:'/product/findListView',              
              nameTwo: '个险产品管理'
            },
            {
              hash:'/product/carFindListView',              
              nameTwo: '车险产品管理'
            },
            {
              hash:'/product/carFindListDetail',              
              nameTwo: '车险产品详情',
              hidden:true
            },
            {
              hash:'/product/carFindEditDetail',              
              nameTwo: '车险产品编辑',
              hidden:true
            },
            {
              hash:'/product/personInsuranceProDetail',              
              nameTwo: '个险产品详情',
              hidden:true
            },
            {
              hash:'/product/findListViewEdit',              
              nameTwo: '个险产品编辑',
              hidden:true
            },
            {
              hash:'/product/findListViewAdd',              
              nameTwo: '个险产品新增',
              hidden:true
            },
            {
              hash:'/product/carFindAdd',              
              nameTwo: '车险产品新增',
              hidden:true
            },
             {
              hash:'/product/carInstallment',              
              nameTwo: '车险分期产品管理',
             },
             {
              hash:'/product/carInsurancedetails',              
              nameTwo: '车险分期产品详情',
              hidden:true
            },
             {
              hash:'/product/carproductinformation',              
              nameTwo: '车险分期产品基本信息',
              hidden:true
            }
          ]
        },
        {
          img: require('@res/img/item.png'),
          name: '产品参数管理',
          hash:'/product/findListView',    
          status: true,
          list: [
            {
              hash:'/product/occupationType',              
              nameTwo: '职业分类'
            },
            {
              hash:'/product/toInsurance',              
              nameTwo: "保险类别"
            },
            {
              hash:'/product/toInsurerCompany',              
              nameTwo: "保险公司"
            },
            {
              hash:'/product/toPriceElement',              
              nameTwo: "计价因子"
            },
            {
              hash:'/product/toClassParam',              
              nameTwo: "附加信息"
            },
            {
              hash:'/product/insuranceType',              
              nameTwo: "保障利益"
            },
            // {
            //   hash:'/product/areaService',              
            //   nameTwo: "地区维护"
            // },
          ]
        }
        
      ]
    }
  },
  created () {
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

