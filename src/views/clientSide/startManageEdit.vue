<template>
    <div class="ggg_user">
         <div class="text">
               <el-form ref="params" :model="AddForm" :rules="rules" label-position="center" label-width="100px">
                    <el-form-item label="系统类型">
                         <span  v-text="AddForm.resourceLabel =='ios_startup_logo' ? 'IOS' : AddForm.resourceLabel == 'android_startup_logo' ? 'Android' : 'Other'"></span>
                    </el-form-item>
                    <el-form-item label="标题" prop="resourceKeywords">
                         <el-col :span="4">
                            <el-input v-model="AddForm.resourceKeywords"placeholder="标题" width="218px"></el-input>
                         </el-col>
                    </el-form-item>
                    <el-form-item label="图片" prop="urlImg">
                         <el-col :span="5" v-for="(item,index) in AddForm.resourcesVoList" :key="item.resourceHeight">
                                <uploadImg v-bind:ref="item.imgRef" v-on:acqImgUrl="acqImgUrl" v-bind:paramName="index+''"
                                           :tip="item.resourceWidth+'*'+item.resourceHeight" :bodyWidth="200"></uploadImg>
                            </el-col>
                    </el-form-item>
                    <el-form-item label="有效期" prop="effTimeStr">
                        <el-col :span="4">
                            <el-date-picker  v-model="pickTimeStart" type="date" placeholder="起始时间" :editable="false" @change="dateChange">
                            </el-date-picker>
                        </el-col>
                        <el-col :span="1">
                            至
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="" prop="expTimeStr" label-width="1px">
                                <el-date-picker v-model="pickTimeEnd" type="date" placeholder="结束时间" :editable="false" @change="dateChange">
                                </el-date-picker>
                             </el-form-item>
                         </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" v-waves  @click="commit('params')">保存</el-button>
                        <el-button v-waves  @click="$router.go(-1)">返回</el-button>
                    </el-form-item>
             </el-form>
         </div>
    </div>
</template>
<script>
import '@res/css/wjq/style.less';
import config from '@api/config';
import { parseTime } from '@filters/index.js';
import uploadImg from "@src/components/uploadImg";

export default {
    components: {
        uploadImg
    },
    data() {
        var imgurl = (rule, value, callback)=> {
            for(let i = 0; i < this.AddForm.resourcesVoList.length; i++) {
                let item = this.AddForm.resourcesVoList;
                if (!item[i].resourceValue) {
                     callback(new Error('请选择上传图片（4张）'));
                     return false;
                }
            }
            callback();
        }
        var compare = (rule, value, callback)=> { 
            if (this.pickTimeStart && this.pickTimeEnd) {
                if (parseTime(this.pickTimeStart, '{y}{m}{d}') > parseTime(this.pickTimeEnd, '{y}{m}{d}')) {
                     callback(new Error('开始时间不能大于结束事间'));
                     return false;
                }
            }
            callback();
        }
        return {
            pickTimeStart: '', //开始时间
            pickTimeEnd: '', //结束时间
            resourceLabelArr:[ //系统类型
                {value:'1', label:'IOS'},
                {value:'2', label:'Android'}
            ],
            //表格绑定数据
            AddForm: {
                resourceLabel :'', //系统类型
                resourceKeywords :'', //标题
                resourcesVoList:[ //图片集合
                    {resourceHeight:'1785',resourceWidth:'1242',resourceValue:'', imgRef:'img0'},
                    {resourceHeight:'1078',resourceWidth:'750',resourceValue:'', imgRef:'img1'},
                    {resourceHeight:'920',resourceWidth:'640',resourceValue:'', imgRef:'img2'},
                    {resourceHeight:'775',resourceWidth:'640',resourceValue:'', imgRef:'img3'}],
                effTimeStr: '', //开始时间
                expTimeStr: '' //结束时间
            },
            rules: {
                resourceLabel: [
                    {required: true, message: '请选择系统类型', trigger: 'change' }
                ],
                resourceKeywords: [
                    {required: true, message: '请输入标题', trigger: 'change' },
                    { min:1, max: 100, message: '长度1-100', trigger: 'change' }
                ],
                effTimeStr: [
                    { required: true, message: '请选择有效期开始时间', trigger: 'change' }
                ],
                expTimeStr: [
                    { required: true, message: '请选择有效期结束时间', trigger: 'change' },
                    {validator: compare, trigger: 'change' },
                ],
                auditComment: [
                    { required: true, message: '请填写审核不通过理由', trigger: 'change' },
                    { min:1, max: 200, message: '长度1-200', trigger: 'change' }
                ],
                urlImg: [
                    // { required: true, message: '请选择图片', trigger: 'change' },
                    {validator: imgurl, trigger: 'change' },
                ]
            },
            fileList3: [{
                name: 'food.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                status: 'finished'
            }, {
                name: 'food2.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                status: 'finished'
            }]
        }
    },
    created() {
        // this.getData();
        
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData (formName) {
            let obj = {
                url: 'client/toEditView',
                resourceId: this.$route.query.id ? this.$route.query.id : ''
            }
            // console.log(obj)
            config(obj).then(response => {
                console.log(response.data)
                if (response.respCode === '000000') {
                    // this.AddForm = response.data;
                    this.AddForm.resourceLabel = response.data.resourceLabel;
                    this.AddForm.resourceKeywords = response.data.resourceKeywords;
                    this.AddForm.effTimeStr = response.data.effTime;
                    this.AddForm.expTimeStr = response.data.expTime;
                    this.pickTimeStart = new Date(this.AddForm.effTimeStr);
                    this.pickTimeEnd = new Date(this.AddForm.expTimeStr)
                     if(response.data.resourceDetailRspList){
                        for(var i=0;i<response.data.resourceDetailRspList.length;i++){
                            if(response.data.resourceDetailRspList[i].resourceWidth==1242&&response.data.resourceDetailRspList[i].resourceHeight==1785){
                                this.AddForm.resourcesVoList[0].resourceValue=response.data.resourceDetailRspList[i].resourceValue;
                                this.$refs.img0[0].setInitImg([{name: '',
                                    url: response.data.resourceDetailRspList[i].resourceValue}]);

                                this.AddForm.resourcesVoList[0].resourceId = response.data.resourceDetailRspList[i].resourceId;
                            }else if(response.data.resourceDetailRspList[i].resourceWidth==750&&response.data.resourceDetailRspList[i].resourceHeight==1078){

                                this.AddForm.resourcesVoList[1].resourceValue=response.data.resourceDetailRspList[i].resourceValue;
                                this.$refs.img1[0].setInitImg([{name: '',
                                    url: response.data.resourceDetailRspList[i].resourceValue}]);

                                this.AddForm.resourcesVoList[1].resourceId = response.data.resourceDetailRspList[i].resourceId;
                            }else if(response.data.resourceDetailRspList[i].resourceWidth==640&&response.data.resourceDetailRspList[i].resourceHeight==920){
                                this.AddForm.resourcesVoList[2].resourceValue=response.data.resourceDetailRspList[i].resourceValue;
                                this.$refs.img2[0].setInitImg([{name: '',
                                    url: response.data.resourceDetailRspList[i].resourceValue}]);

                                this.AddForm.resourcesVoList[2].resourceId = response.data.resourceDetailRspList[i].resourceId;
                            }else if(response.data.resourceDetailRspList[i].resourceWidth==640&&response.data.resourceDetailRspList[i].resourceHeight==775){
                                console.log(3);
                                this.AddForm.resourcesVoList[3].resourceValue=response.data.resourceDetailRspList[i].resourceValue;
                                this.$refs.img3[0].setInitImg([{name: '',
                                    url: response.data.resourceDetailRspList[i].resourceValue}]);

                                this.AddForm.resourcesVoList[3].resourceId = response.data.resourceDetailRspList[i].resourceId;
                            }
                        }
                    }
                } else {
                    this.$message.warning(response.respMsg)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        commit (formName) {
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.AddForm)
                    this.AddForm.url = 'client/updStartImg';
                    config(this.AddForm).then(response => {
                        if (response.respCode === '000000') {
                            this.$message.success(response.respMsg)
                            this.$router.go(-1);
                        } else {
                            this.$message.warning(response.respMsg)
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        /*时间选择器默认事件*/
        dateChange () {
            if (this.pickTimeStart === "") {
                this.AddForm.effTimeStr = "";
            } else {
                this.AddForm.effTimeStr = parseTime(this.pickTimeStart, '{y}-{m}-{d}');
            }
            if (this.pickTimeEnd === "") {
                this.AddForm.expTimeStr = "";
            } else {
                this.AddForm.expTimeStr = parseTime(this.pickTimeEnd, '{y}-{m}-{d}');
            }
        },
        acqImgUrl(params){
            // console.log('a')
            this.AddForm.resourcesVoList[parseInt(params[1])].resourceValue = params[0];
        }
    }
}
</script>
<style lang="less" scoped>
  .text{
        padding-left:100px;
        padding-top:20px;
        /*width:300px;*/
    }
</style>
