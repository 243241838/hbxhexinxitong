<template>
    <div class="ggg_user">
        <div class="text">
              <el-form label-position="center" label-width="100px" ref="AddForm" :model="AddForm" :rules="rules">
                <el-form-item label="版本号" prop="currentVersion">
                    <el-col :span="4">
                        <el-input v-model="AddForm.currentVersion" placeholder="请输入版本号"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="适配系统" prop="systemVersion">
                    <el-col :span="4">
                        <el-input v-model="AddForm.systemVersion" placeholder="请输入适配系统"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="发布类型" prop="versionState">
                     <el-select v-model="AddForm.versionState" placeholder="请选择">
                        <el-option v-for="item in output.clientVersionStateList" :key="item.code.toString()"  :label="item.desc"  :value="item.code.toString()">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="apk地址" prop="downUrl">
                    <el-col :span="4">
                       <el-input v-model="AddForm.downUrl"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label-width="0px" v-if="false">
                    <template v-for="(itemTop,index) in AddForm.channels">
                        <el-form-item label-width="0px" :class="{margin_bottom: AddForm.channels.length>0 && index != AddForm.channels.length-1}">
                                <el-col :span="5">
                                    <el-form-item v-if="index==0" label="发布渠道"   :prop="'channels[' + index + ']'" :rules="[{required: true, message: '渠道类型不能为空', trigger: 'blur'}]">
                                        <el-select v-model="AddForm.channels[index]" placeholder="请选择">
                                            <el-option v-for="item in output.deployChannels" :key="item.dictKey.toString()"  :label="item.dictValue"  :value="item.dictKey.toString()">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item v-else label="    "   :prop="'channels[' + index + ']'" :rules="[{required: true, message: '渠道类型不能为空', trigger: 'blur'}]">
                                        <el-select v-model="AddForm.channels[index]" placeholder="请选择">
                                            <el-option v-for="item in output.deployChannels" :key="item.dictKey.toString()"  :label="item.dictValue"  :value="item.dictKey.toString()">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4">
                                    <el-form-item label="apk地址" :prop="'verUrlList[' + index + ']'" :rules="[{required: true, message: 'api地址不能为空', trigger: 'blur'}]">
                                        <el-input v-model="AddForm.verUrlList[index]"></el-input>
                                    </el-form-item> 
                                </el-col>
                                <el-col :span="4">
                                    <el-button style="margin-left:10px;" type="primary" @click="addCol()" v-show="index==(AddForm.channels.length-1)&&!isIos">+</el-button>
                                    <el-button type="primary" @click="desCol(index)" v-show="AddForm.verUrlList.length != 1 && !isIos">-</el-button>
                                </el-col>
                        </el-form-item>
                    </template>
                </el-form-item>
                 <el-form-item label="更新类型" prop="isOptional">
                     <el-select v-model="AddForm.isOptional" placeholder="请选择">
                        <el-option v-for="item in output.clientUpdateTypeList" :key="item.code.toString()"  :label="item.desc"  :value="item.code.toString()">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="更新信息" prop="verDec">
                    <el-col :span="4">
                        <el-input type="textarea" v-model="AddForm.verDec" :rows="2" placeholder="请输入更新信息"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="commit('AddForm')">确 定</el-button>
                    <el-button type="primary" @click="$router.go(-1)">取 消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import '@res/css/wjq/style.less';
import config from '@api/config';
import {validate } from '@src/utils/gxfCommin';
export default {
    data() {
        var verno = (rule, value, callback)=> {  
            if (!validate.verno(value)) {
                callback(new Error('版本号格式不正确'));
                return false;
            }
            callback();
        }
        var channels = (rule, value, callback)=> {
            console.log(rule)
            console.log(value)
            callback();
        }
        return {
            output: {
                clientVersionStateList: [], //发布类型
                isOptionalArr: [], //更新类型
                channelsArr:[], //渠道类型
            },
            aa: '',
            AddForm: {
                url: '/client/addVersion',
                currentVersion:'', //版本号
                systemVersion:'', //适配系统
                versionState:'', //发布类型
                isOptional:'',//更新类型
                // channels :[''], //发布渠道
                // verUrlList:[''], //发布渠道下载路径
                downUrl: '', // apk地址
                verDec:'', //更新信息
                type: 'IOS'
            },
            channelsdeal: [false],
            verUrlList: [false],
            rules: {
                currentVersion: [
                    {required: true, message: '请输入版本号', trigger: 'change' },
                    {validator: verno, trigger: 'blur' },
                ],
                systemVersion: [
                    {required: true, message: '请输入适配系统', trigger: 'blur' }
                ],
                versionState: [
                    {required: true, message: '请选择发布类型', trigger: 'blur' },
                ],
                isOptional: [
                    {required: true, message: '请选择', trigger: 'blur' },
                ],
                downUrl: [
                    {required: true, message: '请输入apk地址', trigger: 'blur' },
                ],
                verDec: [
                    {required: true, message: '请输入', trigger: 'blur' },
                ]
            },
            isIos: false
        }
    },
    created() {
        this.isIos = this.$route.query.type=='IOS';
        if (this.isIos) {
            this.AddForm.type = 'IOS';
        } else {
            this.AddForm.type = 'Android';
        }
        this.acqChannelsArr(); //获取更新类型
    },
    mounted () {

    },
    methods: {
        //加号按钮
            addCol(){
                this.AddForm.channels.push('');
                this.AddForm.verUrlList.push('');
                this.channelsdeal.push(false);
                this.verUrlList.push(false)
            },
            //减号按钮
            desCol(index){
                this.AddForm.channels.splice(index, 1);
                this.AddForm.verUrlList.splice(index, 1);
                this.channelsdeal.splice(index, 1);
                this.verUrlList.splice(index, 1);
            },
            acqChannelsArr(){
            let obj = {
                url: '/client/versionTypeList',
                type: this.$route.query.type
            }
            config(obj).then(response => {
                if (response.respCode == '000000') {
                    console.log(response.data);
                    this.output = response.data;
                } else {
                    this.$message.warning(response.respMsg)
                }

            }).catch(err => {

            })
        },
        //保存
        commit (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    config(this.AddForm).then(response => {
                        if (response.respCode === '000000') {
                            this.$message.success(response.respMsg)
                            this.$router.go(-1);
                        } else {
                            this.$message.warning(response.respMsg)
                        }
                    }).catch(err => {

                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>
<style lang="less" scoped>
    .text{
        padding-left:100px;
        padding-top:10px;
    }
     h2{
        margin-left: 18px;
        line-height: 43px;
        font-size: 14px;
        color: #3498da;
        font-weight: bold;
    }
</style>
