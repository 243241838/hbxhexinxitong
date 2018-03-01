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
                <el-form-item label="角色ID" prop="roleId">
                    <el-input v-model="params.roleId" placeholder="角色ID"></el-input>
                </el-form-item>
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="params.roleName" placeholder="角色名称"></el-input>
                </el-form-item>
                <el-form-item label="关键字" prop="descs">
                    <el-input v-model="params.descs" placeholder="职责描述"></el-input>
                </el-form-item>
                <el-form-item>
                   <el-button type="primary" v-waves  icon="search" @click="getApplyList()">查询</el-button>
                   <el-button v-waves  @click="reset('params')"  icon="setting">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-button style="margin-bottom:10px;" v-waves  @click="$router.push({ path: '/systemManage/roleAddDetail'})">新增</el-button>
        <el-table :data="dataList" ref="table" v-loading="listLoading" border fit highlight-current-row>
            <el-table-column align="center" label="序号" width="100">
                <template scope="scope">
                    <span>{{(params.page-1)*params.size+parseInt(scope.$index) + 1}}</span>
                </template>
            </el-table-column>
             <el-table-column align="center" label="角色ID">
                <template scope="scope">
                    <span>{{scope.row.roleId}}</span>
                </template>
            </el-table-column>
             <el-table-column align="center" label="角色名称">
                <template scope="scope">
                     <el-button type="text" @click="go(scope.row, 1)">{{scope.row.roleName}}</el-button>
                </template>
            </el-table-column>
             <el-table-column align="center" label="职责描述">
                <template scope="scope">
                    <span>{{scope.row.descs}}</span>
                </template>
            </el-table-column>
             <el-table-column align="center" label="修改人员">
                <template scope="scope">
                    <span>{{scope.row.modifyUserName}}</span>
                </template>
            </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="修改时间">
                <template scope="scope">
                    <span>{{scope.row.modifyTimeStr}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template scope="scope">
                    <el-button type="text" @click="go(scope.row, 2)"  size="small">授权资源</el-button>
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
                url: 'role/findList',
                page: 1,
                size: 10,
                roleId: '', //角色Id
                roleName: '', //角色名称
                descs: '' //职责描述
            },
            total: 0, //总条数
            dataList: [],
            text: '',
            dialogVisible: false //弹框
        }
    },
    computed: {
    },
    created() {
        this.getApplyList();
    },
    mounted() {
    },
    methods: {
        /*搜索列表信息*/
        getApplyList () {
            this.listLoading = true; //加载动作
            console.log(this.params)
            config(this.params).then(response => {
                console.log(response)
                if (response.respCode === '000000') {
                    this.total = response.data.total; //总条数赋值
                    this.listLoading = false;
                    this.dataList = response.data.securityRoleList;
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
        //跳转
        go (val, number) {
            if (number === 1) { //去查看详情
                this.$router.push({ path: '/systemManage/roleDetail',query: { roleId: val.roleId } })
            } else if (number === 2) {
                this.$router.push({ path: '/systemManage/resourceAccreditDetail',query: { roleId: val.roleId } }) //去授权资源
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