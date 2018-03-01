<template>
    <div class="ggg_user">
        <h2>查看详情</h2>
        <div class="text" v-show="!isEdit">
            <el-form label-position="center" label-width="100px" class="noborder">
                <el-form-item label="角色ID">
                    <span class="el-input" v-text="form.roleId"></span>
                </el-form-item>
                <el-form-item label="角色名称">
                    <span class="el-input" v-text="form.roleName"></span>
                </el-form-item>
                <el-form-item label="职责描述">
                     <span class="el-input" v-text="form.descs"></span>
                </el-form-item>
                <el-form-item label="修改人员">
                    <span class="el-input" v-text="form.modifyNickName"></span>
                </el-form-item>
                <el-form-item label="修改时间">
                    <span class="el-input" >{{form.modifyTime | timeFilter}}</span>
                </el-form-item>
                <el-form-item>
                    <el-button v-waves  type="primary"@click="edit()">编辑</el-button>
                    <el-button v-waves @click="$router.go(-1)">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="text" v-show="isEdit">
            <el-form :rules="rules"  ref="editForm" label-position="center" :model="form2" label-width="100px">
                 <el-form-item label="角色ID">
                    <span class="el-input" >{{form.roleId}}</span>
                </el-form-item>
                <el-form-item label="角色名称" prop="roleName">
                    <el-input  v-model="form2.roleName"></el-input>
                </el-form-item>
                <el-form-item label="职责描述" prop="descs">
                     <el-input  v-model="form2.descs"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button v-waves  type="primary" @click="submitData('editForm')">保存</el-button>
                    <el-button v-waves @click="cancel('editForm')">取消</el-button>
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
import {validate } from '@src/utils/gxfCommin';

export default {
    data() {
         var roleName = (rule, value, callback)=> {  
            if (!validate.validaChineseNumber(value)) {
                callback(new Error('请输入汉字和数字'));
                return false;
            }
            callback();
        }
        return {
            listLoading: false,
            form: {},
            form2: {},
            isEdit: false,
            rules: {
                roleName: [
                    {required: true, message: '请输入角色名称', trigger: 'blur' },
                    {validator: roleName, trigger: 'blur' },
                    { min:1, max: 20, message: '长度在1到20', trigger: 'blur' }
                ],
                descs: [
                    {required: true, message: '请输入职责描述', trigger: 'blur' },
                    { min:1, max: 20, message: '长度在1到38', trigger: 'blur' }
                ]
            }
            
        }
    },
    computed: {
    },
    created() {
        this.getDate(); //获取数据
    },
    mounted() {
    },
    methods: {
        //获取数据
        getDate () {
            let obj = {
                url: 'role/findRoleDetail',
                roleId: this.$route.query.roleId ? this.$route.query.roleId : ''
            }
            console.log(obj)
            config(obj).then(response => {
                console.log(response)
                if (response.respCode === '000000') {
                    this.form = response.data.role;
                    this.form.modifyNickName = response.data.modifyNickName;
                  
                } else {
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        //点击编辑按钮
        edit () {
            this.form2 = JSON.parse(JSON.stringify(this.form))
            this.isEdit = true;
        },
        //保存
        submitData (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let obj = {
                        url: 'role/editRole',
                        descs: this.form2.descs,
                        roleId: this.form2.roleId,
                        roleName: this.form2.roleName
                    }
                    console.log(obj)
                    config(obj).then(response => {
                        console.log(response)
                        if (response.respCode === '000000') {
                            this.message('success', response.respMsg)
                            this.getDate(); //获取数据
                            this.isEdit = false;
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
        //取消
        cancel (formName) {
            this.$refs[formName].resetFields();//// 移除整个表单的校验结果
            this.isEdit = false;
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