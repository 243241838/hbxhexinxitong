<template>
    <div class="ggg_user">
         <div class="text">
               <el-form ref="params" :model="AddForm" :rules="rules" label-position="center" label-width="100px">
                    <el-form-item label="系统类型" prop="resourceLabel" >
                         <el-select v-model="AddForm.resourceLabel" placeholder="系统类型">
                            <el-option v-for="item in resourceLabelArr" :key="item.value"  :label="item.label"  :value="item.value">
                            </el-option>
                         </el-select>
                    </el-form-item>
                    <el-form-item label="标题" prop="resourceKeywords">
                         <el-col :span="4">
                            <el-input v-model="AddForm.resourceKeywords" placeholder="标题" width="218px"></el-input>
                         </el-col>
                    </el-form-item>
                    <el-form-item label="图片" prop="urlImg">
                          <el-col :span="5" v-for="(item,index) in AddForm.resourcesVoList" :key="item.resourceHeight">
                                <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:paramName="index+''" :tip="item.resourceWidth+'*'+item.resourceHeight" :bodyWidth="200"></uploadImg>
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
                url: 'client/addStartImg',
                resourceLabel :'', //系统类型
                resourceKeywords :'', //标题
                resourcesVoList:[ //图片集合
                    {resourceHeight:'1785',resourceWidth:'1242',resourceValue:''},
                    {resourceHeight:'1078',resourceWidth:'750',resourceValue:''},
                    {resourceHeight:'920',resourceWidth:'640',resourceValue:''},
                    {resourceHeight:'775',resourceWidth:'640',resourceValue:''}],
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
            }
        }
    },
    created() {
    },
    methods: {
        commit (formName) {
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.AddForm)
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
            console.log(parseInt(params[1]))
            this.AddForm.resourcesVoList[parseInt(params[1])].resourceValue = params[0];
        }
    }
}
</script>
<style lang="less" scoped>
  .text{
        padding-left:100px;
        /*width:300px;*/
    }
</style>
