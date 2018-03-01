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
                <el-form-item v-show="false" label="排序字段" prop="order">
                    <el-input  v-model="params.order"></el-input>
                </el-form-item>
                  <el-form-item v-show="false" label="升降序" prop="dir">
                    <el-input  v-model="params.dir"></el-input>
                </el-form-item>
                <el-form-item label="退保编号" prop="cancelId">
                    <el-input v-model="params.cancelId" placeholder="退保编号"></el-input>
                </el-form-item>
                <el-form-item label="订单号" prop="tradeId">
                    <el-input v-model="params.tradeId" placeholder="订单号"></el-input>
                </el-form-item>
                <el-form-item label="保险名称" prop="productName">
                    <el-input v-model="params.productName" placeholder="保险名称"></el-input>
                </el-form-item>
                <el-form-item label="申请人" prop="applyUserName">
                    <el-input v-model="params.applyUserName" placeholder="申请人"></el-input>
                </el-form-item>
                <el-form-item label="退保状态" prop="cancelSts">
                    <!--<10：退保中；20：已退保；30：退保失败-->
                    <el-select v-model="params.cancelSts" placeholder="退保状态">
                        <el-option key="" label="全部" value=""></el-option>
                        <el-option key="10" label="退保中" value="10"></el-option>
                        <el-option key="20" label="已退保" value="20"></el-option>
                        <el-option key="30" label="退保失败" value="30"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                <el-form-item label="申请时间">
                    <el-date-picker  v-model="pickTimeStart" type="date" placeholder="起始时间" :editable="false" @change="dateChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="至">
                    <el-date-picker v-model="pickTimeEnd" type="date" placeholder="结束时间" :editable="false" @change="dateChange">
                    </el-date-picker>
                </el-form-item>
                   <el-button type="primary" v-waves  icon="search" @click="subForm()">查询</el-button>
                   <el-button v-waves  @click="reset('params')"  icon="setting">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="dataList" ref="table" :default-sort = "{prop: params.order, order: params.dir === 'desc' ? 'descending' : 'ascending'}" @sort-change="sort" v-loading="listLoading" border fit highlight-current-row >
            <el-table-column align="center" label="序号" width="100">
                <template scope="scope">
                    <span>{{(params.page-1)*params.size+parseInt(scope.$index) + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="退保编号" width="210">
                <template scope="scope">
                     <span>{{scope.row.cancelId}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="订单号" width="220">
                <template scope="scope">
                    <el-button type="text" @click="gocustomerDetail(scope.row.tradeId, 1)">{{scope.row.tradeId}}</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" label="保险名称" width="230">
                <template scope="scope">
                    <el-button type="text" @click="gocustomerDetail(scope.row, 2)">{{scope.row.productName}}</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" label="用户ID">
                <template scope="scope">
                    <span>{{scope.row.userId}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="申请人">
                <template scope="scope">
                    <span>{{scope.row.applyUserName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="申请时间" sortable="custom" prop="createTime" >
                <template scope="scope">
                    {{scope.row.createTime | timeFilter}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="退保状态">
                <template scope="scope">
                    <span style="color: red;" v-show="scope.row.cancelSts == 10">退保中</span>
                    <span style="color: green;" v-show="scope.row.cancelSts == 20">已退保</span>
                    <span style="color: red;" v-show="scope.row.cancelSts == 30">退保失败</span>
                </template>
            </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="退保金额">
                <template scope="scope">
                    <span>{{scope.row.amount}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="退保失败原因">
                <template scope="scope">
                    <span>{{scope.row.cancelDesc ? scope.row.cancelDesc.substring(0, 20) : ''}}</span>
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
                url: 'policymanager/findReturnPolicyList',
                page: 1,
                size: 10,
                cancelId: '', //退保编号
                tradeId: '', //订单号
                productName: '', //保险名称
                applyUserName: '', //申请人
                cancelSts: '', //退保状态
                applyBeginDate: '', //申请开始时间
                applyEndDate: '', //申请结束时间
                order: 'createTime', //排序字段
                dir: 'desc' // desc ：降序；asc：升序
            },
            total: 0, //总条数
            dataList: []
        }
    },
    computed: {
    },
    created() {
        this.getApplyList(); //初始化查询开始时间
    },
    mounted() {
    },
    methods: {
        /*搜索列表信息*/
        getApplyList () {
            console.log(this.params)
            this.listLoading = true; //加载动作
            config(this.params).then(response => {
                console.log(response)
                if (response.respCode === '000000') {
                    this.total = response.data.total; //总条数赋值
                    this.listLoading = false;
                    this.dataList = response.data.returnPolicyRecordRspList;
                } else {
                    this.listLoading =false; //加载动作
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                this.listLoading =false; //加载动作
                this.dataList = null;
            })
        },
        //查询
        subForm () {
            if (this.pickTimeStart && this.pickTimeEnd) {
                if (parseTime(this.pickTimeStart, '{y}{m}{d}') > parseTime(this.pickTimeEnd, '{y}{m}{d}')) {
                    this.message('warning', '结束时间不能大于开始时间');
                    return false;
                }
            }
            //判断交易金额自定义
            if (parseInt(this.params.selectAmount) === 10) {
                if (this.params.customAmountLow && this.params.customAmountHight) {
                    if (parseInt(this.params.customAmountLow) > parseInt(this.params.customAmountHight)) {
                        this.message('warning', '左边金额不能大于右边金额');
                        return false;
                    }
                }
            }
            this.getApplyList();
        },
          /*时间选择器默认事件*/
        dateChange () {
            if (this.pickTimeStart === "") {
                this.params.applyBeginDate = "";
            } else {
                this.params.applyBeginDate = parseTime(this.pickTimeStart, '{y}-{m}-{d}');
            }
            if (this.pickTimeEnd === "") {
                this.params.applyEndDate = "";
            } else {
                this.params.applyEndDate = parseTime(this.pickTimeEnd, '{y}-{m}-{d}');
            }
        },
        //调整每页几条
        handleSizeChange(val) {
            this.params.size = val;
            this.params.page = 1;
            this.subForm(); //校检时间
        },
        //翻页
        handleCurrentPageChange (val) {
            this.params.page = val; //第几页赋值
            this.subForm(); //校检时间
        },
         //排序
        sort (column) {
            // console.log(column)
            this.params.order = column.prop; //排序字段；
            this.params.dir = column.order=== 'descending' ? 'desc' : 'asc'; //升降序
            this.params.page = 1;
            this.getApplyList();
        },
         //重置
        reset (formName) {
            this.$refs[formName].resetFields();
            this.pickTimeStart= ''; //开始时间
            this.pickTimeEnd= ''; //结束时间
            this.params.applyBeginDate = '';
            this.params.applyEndDate = '';
        },
        //去订单详情和产品详情
        gocustomerDetail (val, number) {
            if (number === 1) {
                this.$router.push({ path: '/dealManage/orderDetail',query: { tradeId: val } })
            } else {
                 if (val.classType == 2) {
                      this.$router.push({ path: '/dealManage/dealManagePersonInsuranceProDetail',query: { productId: val.productId } }); //跳产品个险详情
                } else {
                    this.$router.push({ path: '/dealManage/dealManageCarFindListDetail',query: { productId: val.productId } }); //跳产品车险详情
                }
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