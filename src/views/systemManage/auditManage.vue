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
                <el-form-item label="提交日期">
                    <el-date-picker  v-model="pickTimeStart" type="date" placeholder="起始时间" :editable="false" @change="dateChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="至">
                    <el-date-picker v-model="pickTimeEnd" type="date" placeholder="结束时间" :editable="false" @change="dateChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                   <el-button type="primary" v-waves  icon="search" @click="getApplyList()">查询</el-button>
                   <el-button v-waves  @click="reset('params')"  icon="setting">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-button style="margin-bottom:10px;" v-waves  @click="$router.push({ path: '/systemManage/addOperator'})">新增</el-button>
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
        </el-table>
        <div style="padding:20px 0;">
            <div v-show="total" class="pagination-container" style="display:inline-block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="params.page" :page-sizes="[10,20,30, 50]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
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
            pickTimeStart: '', //开始时间
            pickTimeEnd: '', //结束时间
            params: { 
                url: 'operator/findOperatorList',
                page: 1,
                size: 10,
               
            },
            total: 0, //总条数
            dataList: []
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
          /*时间选择器默认事件*/
        dateChange () {
            if (this.pickTimeStart === "") {
                this.params.beginDate = "";
            } else {
                this.params.beginDate = parseTime(this.pickTimeStart, '{y}-{m}-{d}');
            }
            if (this.pickTimeEnd === "") {
                this.params.endDate = "";
            } else {
                this.params.endDate = parseTime(this.pickTimeEnd, '{y}-{m}-{d}');
            }
        },
        //查询
        subForm () {
            if (this.pickTimeStart && this.pickTimeEnd) {
                if (parseTime(this.pickTimeStart, '{y}{m}{d}') > parseTime(this.pickTimeEnd, '{y}{m}{d}')) {
                    this.message('warning', '结束时间不能大于开始时间');
                    return false;
                }
            }
            this.getApplyList();
        },
        //调整每页几条
        handleSizeChange(val) {
            this.params.size = val;
            this.params.page = 1;
            this.subForm();
        },
        //翻页
        handleCurrentPageChange (val) {
            this.params.page = val; //第几页赋值
            this.subForm();
        },
        //重置
        reset (formName) {
            this.$refs[formName].resetFields();
        },
        //去支付渠道列表
        go (val, number) {
            if (number === 1) { //去查看详情
                this.$router.push({ path: '/systemManage/operatorDetail',query: { userId: val.userId } })
            } else if (number === 2) {
                this.$router.push({ path: '/systemManage/permission',query: { userId: val.userId } }) //去产品详情
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