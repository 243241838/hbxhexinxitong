<template>
    <div class="ggg_user">
        <h2>新增操作员</h2>
        <div class="text" v-show="!isEdit">
            <el-form label-position="center" label-width="100px" class="noborder">
                <el-form-item label="操作员账号">
                    <span class="el-input" v-text="form.nickname"></span>
                </el-form-item>
                <el-form-item label="姓名">
                     <span class="el-input" v-text="form.userName"></span>
                </el-form-item>
                <el-form-item label="手机">
                    <span class="el-input" v-text="form.phone"></span>
                </el-form-item>
                <el-form-item label="邮箱">
                    <span class="el-input" v-text="form.email"></span>
                </el-form-item>
                <el-form-item label="所属角色">
                    <span class="el-input" v-for="item in roleData" v-text="item.roleName" v-show="item.roleId == form.roleId"></span>
                </el-form-item>
                <el-form-item>
                    <el-button v-waves  type="primary"@click="submitData()">完成</el-button>
                    <el-button v-waves @click="isEdit = true">返回修改</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="text" v-show="isEdit">
            <el-form :rules="rules"  ref="editForm" label-position="center" :model="form2" label-width="100px">
                <el-form-item label="操作员账号" prop="nickname">
                    <el-input  v-model="form2.nickname"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="userName">
                     <el-input  v-model="form2.userName"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="phone">
                    <el-input  v-model="form2.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input  v-model="form2.email"></el-input>
                </el-form-item>
                <el-form-item label="所属角色" prop="roleId" required>
                    <el-select v-model="form2.roleId" placeholder="所属角色">
                        <el-option v-for="item in roleData" :key="item.roleId" :label="item.roleName" :value="item.roleId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button v-waves  type="primary" @click="next_step('editForm')">下一步</el-button>
                    <el-button v-waves @click="$router.go(-1)">取消</el-button>
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
import { validate } from '@src/utils/gxfCommin';

export default {
    data() {
        var letter = (rule, value, callback)=> {  
            if (!validate.validatAlphabets(value)) {
                callback(new Error('请输入字母'));
                return false;
            }
            callback();
        }
        //汉字和字母
        var userName = (rule, value, callback)=> {  
            if (!validate.validaChineseletter(value)) {
                callback(new Error('请输入汉字或字母'));
                return false;
            }
            callback();
        }
        var phone = (rule, value, callback)=> {
            if (!validate.validatPhone(value)) {
                callback(new Error('手机号码格式错误'));
                return false;
            }
            callback();
        }
        var isEmail = (rule, value, callback) => {
            if (!validate.validaEmail(value)) {
                callback(new Error('邮箱格式错误'));
                return false;
            }
            callback();
        }
        var roleId = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请选择角色'));
                return false;
            }
            callback();
        }
        return {
            listLoading: false,
            isEdit: true,
            form: {},
            form2: {roleId: ''},
            roleData: '',
            rules: {
                nickname: [
                    {required: true, message: '请输入账号', trigger: 'blur' },
                    {validator: letter, trigger: 'blur' },
                    { min:1, max: 20, message: '长度在1到20', trigger: 'blur' }
                ],
                userName: [
                    {required: true, message: '请输入姓名', trigger: 'blur' },
                    {validator: userName, trigger: 'blur' },
                    { min:1, max: 20, message: '长度在1到20', trigger: 'blur' }
                ],
                phone: [
                    {required: true, message: '请输入手机号', trigger: 'blur' },
                    {validator: phone, trigger: 'blur' },
                ],
                email: [
                    {required: true, message: '请输入邮箱', trigger: 'blur' },
                    {validator: isEmail, trigger: 'blur' },
                ],
                roleId: [
                    {validator: roleId, trigger: 'blur' },
                ]
            }
            
        }
    },
    computed: {
    },
    created() {
        this.role(); //获取角色
    },
    mounted() {
    },
    methods: {
        //获取角色
        role () {
            config({url: 'role/findAllRole'}).then(response => {
                console.log(response) //获取数据
                if (response.respCode === '000000') {
                   this.roleData = response.data.securityRoleList;
                } else {
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        //下一步
        next_step (formName) {
            console.log(this.form2)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.form = this.form2;
                    this.isEdit = false;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
         //完成
        submitData (formName) {
            this.form.url = 'operator/addOperator';
            console.log(this.form)
            config(this.form).then(response => {
                console.log(response)
                if (response.respCode === '000000') {
                    this.message('success', response.respMsg)
                    this.$router.push({ path: '/systemManage/operatorManage'})
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