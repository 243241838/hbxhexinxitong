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
              <router-link :to="(items.hash)">
                <span>{{items.nameTwo}}</span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <mainCon class="rightCon"> 
      <router-view ></router-view> 
    </mainCon>
  </div>
</template>
<script>
import mainCon from "./main.vue";
export default {
  components:{
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
          name: '首页',
          hash:'/homePage/index',
          status: false,
          list: [
            {
              hash:'/homePage/index',
              nameTwo: '首页',
              children:[
                {
                  hash:'/homePage/index',
                  nameTwo: '首页',
                }
              ]
            }
          ]
        }
      ]
    }
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

