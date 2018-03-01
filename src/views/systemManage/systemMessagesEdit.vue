<template>
    <div class="ggg_user">
        <h2>查看详情</h2>
        <div class="text" v-show="data.isEdit == 3">
            <el-form label-position="center" label-width="80px" class="noborder">
                <el-form-item label="消息ID">
                    <span class="el-input" v-text="form.messageId"></span>
                </el-form-item>
                <el-form-item label="消息标题">
                    <span class="el-input" v-text="form.messageTitle"></span>
                </el-form-item>
                <el-form-item label="消息内容">
                     <span class="el-input" v-text="form.messageContent"></span>
                </el-form-item >
                 <el-form-item label="发送时间">
                     <span class="el-input" v-text="form.sendTime"></span>
                </el-form-item >
                 <el-form-item label-width="120px" >
                    <el-button v-waves  type="primary"@click="edit()">编辑</el-button>
                    <el-button v-waves @click="$router.go(-1)">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="text" v-show="data.isEdit == 1">
            <el-form :rules="rules"  ref="editForm" label-position="center" :model="form2" label-width="100px">
                <el-form-item label="消息ID" v-if="form2.messageId">
                    <span class="el-input" >{{form2.messageId}}</span>
                </el-form-item>
                <el-form-item label="消息标题" prop="messageTitle">
                    <el-input  v-model="form2.messageTitle"></el-input>
                </el-form-item>
                <el-form-item label="消息内容" prop="messageContent">
                     <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="form2.messageContent"></el-input>
                </el-form-item>
                <el-form-item label="发送时间" prop="sendTime">
                    <el-date-picker  v-model="pickTimeStart" type="datetime" placeholder="发送时间" :editable="false" @change="dateChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button v-waves  type="primary" @click="submitData('editForm')">保存</el-button>
                    <el-button v-waves @click="$router.go(-1)">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" top="30%"  class="autoAlert">
            <span >确认提交吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button v-waves  @click="dialogVisible = false">取 消</el-button>
                <el-button v-waves type="primary" @click="submitRadio()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import '@res/css/wjq/style.less';
import config from '@api/config';
import { downloadExecl } from '@api/excel.js';
import { parseTime } from '@filters/index.js';
import { trim } from '@src/utils/util';
import {validate } from '@src/utils/gxfCommin';

export default {
    data() {
        return {
            data: {}, //传过来的行数据
            pickTimeStart: '', //发送时间
            listLoading: false,
            form: {},
            form2: {},
            rules: {
                messageTitle: [
                    {required: true, message: '请输入消息标题', trigger: 'blur' },
                    { min:1, max: 40, message: '长度在1到40', trigger: 'blur' }
                ],
                messageContent: [
                    {required: true, message: '请输入消息内容', trigger: 'blur' },
                    { min:1, max: 400, message: '长度在1到20', trigger: 'blur' }
                ],
                sendTime: [
                    {required: true, message: '请选择时间', trigger: 'change' },
                ]
            },
            dialogVisible: false, //弹框
            obj: '' //确认数据

            
        }
    },
    computed: {
    },
    created() {
        //isEdit ==1 编辑  等于3详情
        let output = this.$route.query.data;
        if (output) {
            this.data = output ? JSON.parse(output) : '';
            this.getData(); //获取数据
        } else {
            this.data.isEdit = 1;
        }
    },
    mounted() {
    },
    methods: {
        //获取数据
        getData () {
            let obj = {
                url: 'system/message/toEditMessage',
                messageId: this.data.messageId
            }
            console.log(obj)
            config(obj).then(response => {
                console.log(response)
                if (response.respCode === '000000') {
                   this.form = response.data;
                   this.form2 = response.data;
                   this.pickTimeStart = new Date(this.form2.sendTime);
                } else {
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        //点击编辑按钮
        edit () {
            this.data.isEdit = 1;
        },
        //保存
        submitData (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let obj = {};
                    if (this.form2.messageId) {
                        obj = {
                            url: 'system/message/editMessage',
                            messageId: this.form2.messageId,
                            messageTitle: this.form2.messageTitle,
                            messageContent: this.form2.messageContent,
                            sendTimestr: this.form2.sendTime
                        }
                    } else {
                        obj = {
                            url: 'system/message/addMessage',
                            messageTitle: this.form2.messageTitle,
                            messageContent: this.form2.messageContent,
                            sendTimestr: this.form2.sendTime
                        }
                    }
                    this.obj = obj;
                    this.dialogVisible = true;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
          /*时间选择器默认事件*/
        dateChange (val) {
            if (this.pickTimeStart === "") {
                this.form2.sendTime = "";
            } else {
                this.form2.sendTime = parseTime(this.pickTimeStart, '{y}-{m}-{d} {h}:{i}:{s}');
            }
        },
        //提交
        submitRadio () {
            console.log(this.obj)
            config(this.obj).then(response => {
                if (response.respCode === '000000') {
                    this.message('success', response.respMsg)
                    this.$router.go(-1)
                } else {
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        //请求提示
        message (sts, text) {
            this.$message({
                message: text,
                type: sts
            });
        }
    },
    filters: {
        //金钱
        formatMoney (val) {
             if (!val) {
                return '0.00';
            } else {
                return (val/100).toFixed(2);
            }
        }
    }
}
</script>
<style lang="less" scoped>
    h2{
        margin-left: 18px;
        line-height: 43px;
        font-size: 14px;
        color: #3498da;
        font-weight: bold;
    }
    .text{
        padding-left:150px;
        width:300px;
    }
</style>
