<template>
  <div style="width:100%;">
    <div class="breadcrumb" style="text-align:center;color:red;" v-if="message">
      {{message}}
    </div>
    <div class="breadcrumb">
      <span :key="item.path" v-for="(item, index) in list">
        {{item.title}}
        <span v-if="index !== (list.length - 1)">></span>
      </span>
    </div>
  </div>
</template>

<script>
import ajax from '@api/config';
export default {
  data () {
    return {
      message: '',
      timer: null
    }
  },
  computed: {
    list() {
      let result = [];
      for (var index = 0; index < this.$route.matched.length; index++) {
        var item = this.$route.matched[index];
        result.push({
          title: item.meta.title,
          path: item.path,
        });
      }

      return result;
    }
  },
  mounted () {
    this.exceptionMonitor();
   this.timer = setInterval(this.exceptionMonitor, 1000 * 60);
  },
  destroyed () {
    clearInterval(this.timer);
  },
  methods: {
    exceptionMonitor () {
        // ajax({url: 'exceptionMonitor/info'}).then(response => {
        //     if (response.respCode === '000000') {
        //         this.message = response.data.exceptionMsg;
        //     }
        // }).catch(err => {
        // })
    }
  },
  watch:{
        // $route: function(newValue, oldValue) {
        //     // console.log('--------------------',newValue);
        //     if(newValue.fullPath.startsWith('/clientSide/version')&&newValue.params&&newValue.params.type) {
        //         var opName = '';
        //         if(newValue.fullPath.indexOf("add")!=-1){
        //             opName = '添加';
        //         }
        //         if(newValue.fullPath.indexOf("edit")!=-1){
        //             opName = '编辑';
        //         }


        //         if (newValue.params.type.toUpperCase() == 'IOS') {
        //             this.list[this.list.length - 1].title = '版本控制IOS'+opName;
        //         } else if (newValue.params.type.toUpperCase() == 'ANDROID') {
        //             this.list[this.list.length - 1].title = '版本控制安卓'+opName;
        //         }
        //     }
        // }
    }
}
</script>
<style lang="less" scoped>
  .breadcrumb{
    color: #90a4b2;
    line-height:40px;
    padding-left:10px;
    background: #edf0f1;
    border-bottom:1px solid #ddd;
    width:100%;
  }
</style>
