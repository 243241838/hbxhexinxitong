<template>
  <div>
   <div>
    <header-nav ref='profile'></header-nav>
    <div>
      <router-view></router-view>	
    </div>
   </div>
  </div>
</template>
<script>
import headerNav from './header.vue';
import '@res/css/wstyle.less';
export default {
  components: {
    headerNav
  },
  data(){
    return{
      isShow: false // header是否显示
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

