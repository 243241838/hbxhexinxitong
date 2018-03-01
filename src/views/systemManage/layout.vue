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
          name: '系统管理',
          hash:'/systemManage/operatorManage',    
          status: true,
          list: [
            {
              hash:'/systemManage/operatorManage',              
              nameTwo: '操作员管理'
            },
            {
              hash:'/systemManage/roleManage',              
              nameTwo: '角色管理'
            },
            {
              hash:'/systemManage/changePassword',              
              nameTwo: '密码修改'
            },
            {
              hash:'/systemManage/specialAuditManage',              
              nameTwo: '专题审核管理'
            },
            {
              hash:'/systemManage/productAuditManage',              
              nameTwo: '产品审核管理'
            },
            {
              hash:'/systemManage/systemMessagesManage',              
              nameTwo: '系统消息管理'
            }
            // {
            //   hash:'/systemManage/operatorDetail',              
            //   nameTwo: '操作员详情'
            // },
            // {
            //   hash:'/systemManage/addOperatorDetail',              
            //   nameTwo: '新增操作员'
            // },
            // {
            //   hash:'/systemManage/permissionDetail',              
            //   nameTwo: '配置操作员权限'
            // }
            // {
              //   hash:'/systemManage/roleDetail',              
              //   nameTwo: '角色详情'
              // },
              // {
              //   hash:'/systemManage/roleAddDetail',              
              //   nameTwo: '角色新增'
              // },
              //  {
              //   hash:'/systemManage/resourceAccreditDetail',              
              //   nameTwo: '授权资源'
              // }
              // {
              //   hash:'/systemManage/auditDetail',              
              //   nameTwo: '专题审核详情'
              // }
               // {
              //   hash:'/systemManage/productAuditDetail',              
              //   nameTwo: '产品审核详情'
              // }
              //        {
        //         hash:'/systemManage/backgroundJobLog',              
        //         nameTwo: '后台日志管理'
        //       }
         // {
              //   hash:'/systemManage/systemMessagesEditDetail',              
              //   nameTwo: '系统消息编辑和新增'
              // }
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
