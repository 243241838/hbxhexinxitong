<template>
    <div class="ggg_user">
        <h2>新增操作员</h2>
        <div class="text">
            <el-form :rules="rules"  ref="editForm" label-position="center" :model="form" label-width="100px">
                <el-form-item label="操作员ID" prop="userId">
                    <span class="el-input" v-text="form.userId"></span>
                </el-form-item>
                <el-form-item label="操作员账号" prop="nickname">
                    <span class="el-input" v-text="form.nickname"></span>
                </el-form-item>
                <el-form-item label="姓名" prop="userName">
                     <span class="el-input" v-text="form.userName"></span>
                </el-form-item>
                <el-form-item label="原密码" prop="passwordOld">
                     <el-input type="password" v-model="form.passwordOld"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="passwordNew">
                     <el-input type="password" v-model="form.passwordNew"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password">
                     <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button v-waves  type="primary" @click="next_step('editForm')">确定</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import '@res/css/wjq/style.less';
import config from '@api/config';
import { downloadExecl } from '@api/excel.js';
import { parseTime } from '@filters/index.js';
import { trim } from '@src/utils/util';
import { validate, Common } from '@src/utils/gxfCommin';
export default {
    data() {
        //数字和字母
        var password = (rule, value, callback)=> {
            if (!validate.validaLeterNumber(value)) {
                callback(new Error('请输入数字或字母'));
                return false;
            }
            callback();
        }
        return {
            userInfo: '',
            listLoading: false,
            form: {},
            rules: {
                passwordOld: [
                    {required: true, message: '请输入原密码', trigger: 'blur' },
                    {validator: password, trigger: 'blur' },
                    { min:8, max: 16, message: '长度在8到16', trigger: 'blur' }
                ],
                passwordNew: [
                    {required: true, message: '请输入新密码', trigger: 'blur' },
                    {validator: password, trigger: 'blur' },
                    { min:8, max: 16, message: '长度在8到16', trigger: 'blur' }
                ],
                password: [
                    {required: true, message: '请确认密码', trigger: 'blur' },
                    {validator: password, trigger: 'blur' },
                    { min:8, max: 16, message: '长度在8到16', trigger: 'blur' }
                ]
            }
            
        }
    },
    computed: {
    },
    created() {
         this.userInfo = Common.getCookies('user');
        this.getDate(); //获取操作员数据
    },
    mounted() {
    },
    methods: {
         //获取数据
        getDate () {
            let obj = {
                url: 'operator/findOperatorDetail',
                userId: this.userInfo.userId
            }
            config(obj).then(response => {
                console.log(response)
                if (response.respCode === '000000') {
                   this.form = response.data.user;
                   this.form.password = '';
                } else {
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        //下一步
        next_step (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let obj = {
                        url: 'operator/doPasswordEdit',
                        userId: this.userInfo.userId,
                        password: this.form.password,
                        passwordOld: this.form.passwordOld,
                        passwordNew: this.form.passwordNew
                    }
                    console.log(obj)
                    config(obj).then(response => {
                        console.log(response)
                        if (response.respCode === '000000') {
                            this.message('success', response.respMsg);
                            this.getDate();
                        } else {
                            this.message('warning', response.respMsg)
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
        },
        //时间过滤
        timeFilter (val) {
            if (!val) {
               return '';
           } else {
               var date = new Date(val);
               let Y = date.getFullYear() + '-';
               let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
               let D = date.getDate() + ' ';
               let h = date.getHours() + ':';
               let m = (date.getMinutes()< 10 ? '0' + date.getMinutes() : date.getMinutes())+ ':';
               let s = date.getSeconds();
               return Y + M + D + h + m + s;
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
        padding-left:100px;
        width:300px;
    }
</style>