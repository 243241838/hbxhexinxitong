<template>
    <div class="ggg_user">
         <h2>查看版本</h2>
        <div class="text">
             <el-form label-position="center" label-width="100px" class="noborder">
                <el-form-item label="版本号">
                    <span class="el-input" v-text="EditForm.currentVersion"></span>
                </el-form-item>
                <el-form-item label="适配系统">
                    <span class="el-input" v-text="EditForm.systemVersion"></span>
                </el-form-item>
                <el-form-item label="发布类型">
                    <span class="el-input" v-text="EditForm.versionStateDesc"></span>
                </el-form-item>
                <el-form-item label="apk地址">
                    <span class="el-input" v-text="EditForm.downUrl"></span>
                </el-form-item>
                <el-form-item label="发布渠道" v-if="false">
                    <el-col :span="3">
                        <span class="el-input" v-for="(itemTop,index) in EditForm.channelPos" v-text="itemTop.channelName"></span>
                    </el-col>
                     <el-col :span="3" v-if="EditForm.channelPos && EditForm.channelPos.length >0">
                         <span  class="el-input">安装包：<a v-for="(itemTop,index) in EditForm.channels" :href="itemTop.verPath" download></a></span>
                    </el-col>
                </el-form-item>
                <el-form-item label="更新类型">
                    <span class="el-input" v-text="EditForm.updateTypeDesc"></span>
                </el-form-item>
                <el-form-item label="更新信息">
                    <span class="el-input" v-text="EditForm.verDec"></span>
                </el-form-item>
                <el-form-item label="提交人">
                    <span class="el-input" v-text="EditForm.opName"></span>
                </el-form-item>
                <el-form-item label="提交时间">
                    <span class="el-input" v-text="EditForm.createTimeDesc"></span>
                </el-form-item>
                <el-form-item >
                    <el-button  @click="$router.go(-1)">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import config from '@api/config';

    export default {
        data() {
            return {
                EditForm: {},
               isIos:this.$route.query.type =='IOS'
            }
        },
        created() {
            this.getDetail();
        },
        methods: {
            //获取详情
            getDetail () {
                let obj = {
                    url: '/client/versionDetail',
                    verId: this.$route.query.id*1,
                };
                config(obj).then(response => {
                    console.log(response)
                    if (response.respCode === '000000') {
                        this.EditForm = response.data;
                    } else {
                        this.$message.warning(response.respMsg)
                    }
                }).catch(err => {

                })
            },
        }
    }
</script>
<style lang="less" scoped>
    .text{
        padding-left:100px;
    }
     h2{
        margin-left: 18px;
        line-height: 43px;
        font-size: 14px;
        color: #3498da;
        font-weight: bold;
    }
</style>
