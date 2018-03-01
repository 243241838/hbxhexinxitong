<template>
    <div class="ggg_user">
          <div class="filter-container">
            <el-form :inline="true" :model="params" ref="params"  class="demo-form-inline">
                <el-form-item v-show="false" label="当前页" prop="page">
                    <el-input  v-model="params.page"></el-input>
                </el-form-item>
                <el-form-item v-show="false" label="行数" prop="size">
                    <el-input v-model="params.size"></el-input>
                </el-form-item>
                <el-form-item label="操作员ID" prop="userId">
                    <el-input v-model="params.userId" placeholder="操作员ID"></el-input>
                </el-form-item>
                <el-form-item label="操作员账号" prop="nickname">
                    <el-input v-model="params.nickname" placeholder="操作员账号"></el-input>
                </el-form-item>
                <el-form-item label="操作员姓名" prop="userName">
                    <el-input v-model="params.userName" placeholder="操作员姓名"></el-input>
                </el-form-item>
                <el-form-item label="所属角色" prop="roleId">
                    <el-select v-model="params.roleId" placeholder="所属角色">
                        <el-option  key="" label="全部" value=""></el-option>
                        <el-option v-for="item in roleData" :key="item.roleId" :label="item.roleName" :value="item.roleId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="enabled">
                    <el-select v-model="params.enabled" placeholder="状态">
                        <el-option  key="" label="全部" value=""></el-option>
                        <el-option key="1" label="正常" value="1"></el-option>
                        <el-option key="0" label="禁用" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                   <el-button type="primary" v-waves  icon="search" @click="getApplyList()">查询</el-button>
                   <el-button v-waves  @click="reset('params')"  icon="setting">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-button style="margin-bottom:10px;" v-waves  @click="$router.push({ path: '/systemManage/addOperatorDetail'})">新增</el-button>
        <el-table :data="dataList" ref="table" v-loading="listLoading" border fit highlight-current-row>
            <el-table-column align="center" label="序号" width="100">
                <template scope="scope">
                    <span>{{(params.page-1)*params.size+parseInt(scope.$index) + 1}}</span>
                </template>
            </el-table-column>
             <el-table-column align="center" label="操作员ID">
                <template scope="scope">
                    <span>{{scope.row.userId}}</span>
                </template>
            </el-table-column>
             <el-table-column align="center" label="操作员账号">
                <template scope="scope">
                     <el-button type="text" @click="go(scope.row, 1)">{{scope.row.nickname}}</el-button>
                </template>
            </el-table-column>
             <el-table-column align="center" label="姓名">
                <template scope="scope">
                    <span>{{scope.row.userName}}</span>
                </template>
            </el-table-column>
             <el-table-column align="center" label="手机号">
                <template scope="scope">
                    <span>{{scope.row.phone}}</span>
                </template>
            </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="邮箱">
                <template scope="scope">
                    <span>{{scope.row.email}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="所属角色">
                <template scope="scope">
                    <span>{{scope.row.roleName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="所属角色">
                <template scope="scope">
                    <span>{{scope.row.roleName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="状态">
                <template scope="scope">
                    <span>{{scope.row.enabledStr}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template scope="scope">
                    <el-button type="text" v-show="!scope.row.enabled" @click="forbidden_reset(1, scope.row)"  size="small">设为正常</el-button>
                    <el-button type="text" v-show="scope.row.enabled" @click="forbidden_reset(1, scope.row)"  size="small">禁用</el-button>
                    <el-button type="text" @click="forbidden_reset(2, scope.row)"  size="small">重置密码</el-button>
                    <el-button type="text" @click="go(scope.row, 2)"  size="small">配置审核权限</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="padding:20px 0;">
            <div v-show="total" class="pagination-container" style="display:inline-block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="params.page" :page-sizes="[10,20,30, 50]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" top="30%"  class="autoAlert">
            <span v-text="text">这是一段信息</span>
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

export default {
    data() {
        return {
            listLoading: false,
            params: { 
                url: 'operator/findOperatorList',
                page: 1,
                size: 10,
                userId: '', //操作员Id
                nickname: '', //操作员账户
                userName: '', //操作员姓名
                roleId: '', //所属角色,
                enabled: '' //状态
            },
            roleData: '', //角色数据
            total: 0, //总条数
            dataList: [],
            text: '',
            dialogVisible: false, //弹框
            number: '', //判断是禁用恢复还是重置
            date: '' //传过来的行数据
        }
    },
    computed: {
    },
    created() {
        this.role(); //获取角色
        this.getApplyList();
    },
    mounted() {
    },
    methods: {
        //获取角色
        role () {
            config({url: 'role/findAllRole'}).then(response => {
                console.log(response)
                if (response.respCode === '000000') {
                   this.roleData = response.data.securityRoleList;
                } else {
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        /*搜索列表信息*/
        getApplyList () {
            this.listLoading = true; //加载动作
            console.log(this.params)
            config(this.params).then(response => {
                console.log(response)
                if (response.respCode === '000000') {
                    this.total = response.data.total; //总条数赋值
                    this.listLoading = false;
                    this.dataList = response.data.securityUserList;
                } else {
                    this.listLoading =false; //加载动作
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                this.listLoading =false; //加载动作
                this.dataList = null;
            })
        },
        //调整每页几条
        handleSizeChange(val) {
            this.params.size = val;
            this.params.page = 1;
            this.getApplyList();
        },
        //翻页
        handleCurrentPageChange (val) {
            this.params.page = val; //第几页赋值
            this.getApplyList();
        },
        //重置
        reset (formName) {
            this.$refs[formName].resetFields();
        },
        forbidden_reset (number, date) {
            if (number === 1) {
                if (date.enabled) {
                    this.text = '确定要禁用该用户吗？';
                } else {
                    this.text = '确定将该用户设为正常吗？';
                }
            } else {
                this.text = '确定要为该操作员（账号：' + date.nickname + '）重置密码吗？'
            }
            this.dialogVisible = true; //显示弹窗
            this.number = number;
            this.date = date;
        },
        //提交
        submitRadio () {
            let obj = {};
            if (this.number === 1) {
                obj = {
                    url: 'operator/editOperatorSts',
                    userId: this.date.userId,
                    flag: this.date.enabled ? 0 : 1
                }
            } else {
                obj = {
                    url: 'operator/doResetPassword',
                    userId: this.date.userId
                }
            }
            config(obj).then(response => {
                console.log(response)
                if (response.respCode === '000000') {
                    this.message('success', response.respMsg)
                    this.dialogVisible = false;
                    //当禁用和恢复账号时刷新列表
                    if (this.number === 1) {
                        this.getApplyList(); // 更新表格
                    }
                } else {
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        //去支付渠道列表
        go (val, number) {
            if (number === 1) { //去查看详情
                this.$router.push({ path: '/systemManage/operatorDetail',query: { userId: val.userId } })
            } else if (number === 2) {
                this.$router.push({ path: '/systemManage/permissionDetail',query: { userId: val.userId } }) //去产品详情
            }
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

</style>