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
                <el-form-item label="产品Id" prop="bizId">
                    <el-input v-model="params.bizId" placeholder="产品Id"></el-input>
                </el-form-item>
                <el-form-item label="提交日期">
                    <el-date-picker  v-model="pickTimeStart" type="date" placeholder="起始时间" :editable="false" @change="dateChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="至">
                    <el-date-picker v-model="pickTimeEnd" type="date" placeholder="结束时间" :editable="false" @change="dateChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="操作员" prop="reqNickname">
                    <el-input v-model="params.reqNickname" placeholder="操作员"></el-input>
                </el-form-item>
                <el-form-item label="操作类型" prop="itemType">
                    <el-select v-model="params.itemType" placeholder="操作类型" >
                        <el-option key="" label="全部" value=""></el-option>
                        <el-option key="11" label="新增" value="11"></el-option>
                        <el-option key="12" label="编辑" value="12"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核状态" prop="auditSts">
                    <!--0：待审核；1：审核通过；-1：审核未通过-->
                    <el-select v-model="params.auditSts" placeholder="审核状态" >
                        <el-option key="" label="全部" value=""></el-option>
                        <el-option key="0" label="待审核" value="0"></el-option>
                        <el-option key="1" label="审核通过" value="1"></el-option>
                        <el-option key="-1" label="审核未通过" value="-1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                   <el-button type="primary" v-waves  icon="search" @click="getApplyList()">查询</el-button>
                   <el-button v-waves  @click="reset('params')"  icon="setting">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="dataList" ref="table" v-loading="listLoading" border fit highlight-current-row :default-sort = "{prop: params.order, order: params.dir === 'desc' ? 'descending' : 'ascending'}" @sort-change="sort" >
            <el-table-column align="center" label="序号" width="100">
                <template scope="scope">
                    <span>{{(params.page-1)*params.size+parseInt(scope.$index) + 1}}</span>
                </template>
            </el-table-column>
             <el-table-column align="center" label="审核ID">
                <template scope="scope">
                    <el-button type="text" @click="go(scope.row, 1)">{{scope.row.auditId}}</el-button>
                </template>
            </el-table-column>
             <el-table-column align="center" label="提交日期" sortable="custom" prop="reqTime" >
                <template scope="scope">
                     <span>{{scope.row.reqTime}}</span>
                </template>
            </el-table-column>
             <el-table-column align="center" label="操作员">
                <template scope="scope">
                    <span>{{scope.row.reqNickname}}</span>
                </template>
            </el-table-column>
             <el-table-column align="center" label="产品ID">
                <template scope="scope">
                    <span>{{scope.row.bizId}}</span>
                </template>
            </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="产品名称">
                <template scope="scope">
                    <span>{{scope.row.productName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作名称">
                <template scope="scope">
                    <span v-text="scope.row.itemName"></span>
                </template>
            </el-table-column>
           <el-table-column align="center" label="操作类型">
                <template scope="scope">
                    <span v-show="scope.row.itemType == 11">新增</span>
                    <span v-show="scope.row.itemType == 12">修改</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="审核状态">
                <template scope="scope">
                    <span v-show="scope.row.auditSts == 0">待审核</span>
                    <span v-show="scope.row.auditSts == 1">审核通过</span>
                    <span v-show="scope.row.auditSts == -1">审核未通过</span>
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
                url: 'productaudit/aduitProductListView',
                page: 1,
                size: 10,
                bizId: '', //专题id
                effTimestr: '', //开始时间
                expTimestr: '', //结束时间
                reqNickname: '', //操作员
                itemType: '', // 操作类型
                auditSts: '0', // 状态
                order: 'reqTime',
                dir: 'desc'
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
                    this.dataList = response.data.productAuditRspList;
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
                this.params.effTimestr = "";
            } else {
                this.params.effTimestr = parseTime(this.pickTimeStart, '{y}-{m}-{d}');
            }
            if (this.pickTimeEnd === "") {
                this.params.expTimestr = "";
            } else {
                this.params.expTimestr = parseTime(this.pickTimeEnd, '{y}-{m}-{d}');
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
         //排序
        sort (column) {
            // console.log(column)
            this.params.order = column.prop; //排序字段；
            this.params.dir = column.order=== 'descending' ? 'desc' : 'asc'; //升降序
            this.params.page = 1;
            this.getApplyList();
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
              this.pickTimeStart = ''; //开始时间
              this.pickTimeEnd = '';
              this.params.effTimestr = "";
              this.params.expTimestr = "";
        },
        //去支付渠道列表
        go (val, number) {
            this.$router.push({ path: '/systemManage/productAuditDetail',query: { data: JSON.stringify(val)} })
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