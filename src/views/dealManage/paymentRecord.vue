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
                <el-form-item label="订单号" prop="tradeId">
                    <el-input v-model="params.tradeId"></el-input>
                </el-form-item>
                <el-form-item label="保险名称" prop="productName">
                    <el-input v-model="params.productName"></el-input>
                </el-form-item>
                <el-form-item label="用户ID" prop="userId">
                    <el-input v-model="params.userId"></el-input>
                </el-form-item>
                <el-form-item label="支付渠道" prop="paymentId">
                    <el-select v-model="params.paymentId" placeholder="支付渠道">
                        <el-option  key="-10001" label="全部" value="-10001"></el-option>
                        <el-option v-for="item in payment" :key="item.paymentId" :label="item.paymentName" :value="item.paymentId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                   <el-button type="primary" v-waves  icon="search" @click="getApplyList()">查询</el-button>
                   <el-button v-waves  @click="reset('params')"  icon="setting">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="dataList" ref="table" v-loading="listLoading" border fit highlight-current-row >
            <el-table-column align="center" label="序号" width="100">
                <template scope="scope">
                    <span>{{(params.page-1)*params.size+parseInt(scope.$index) + 1}}</span>
                </template>
            </el-table-column>
             <el-table-column align="center" label="订单号">
                <template scope="scope">
                    <el-button type="text" @click="go(scope.row, 1)">{{scope.row.tradeId}}</el-button>
                </template>
            </el-table-column>
             <el-table-column align="center" label="保险名称">
                <template scope="scope">
                     <el-button type="text" @click="go(scope.row, 2)">{{scope.row.productName}}</el-button>
                </template>
            </el-table-column>
             <el-table-column align="center" label="用户ID">
                <template scope="scope">
                    <span>{{scope.row.userId}}</span>
                </template>
            </el-table-column>
             <el-table-column align="center" label="支付时间">
                <template scope="scope">
                    <span>{{scope.row.payTime}}</span>
                </template>
            </el-table-column>
             <el-table-column align="center" label="支付金额（元）">
                <template scope="scope">
                    <span>{{scope.row.payAmount}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="支付渠道">
                <template scope="scope">
                    <span>{{scope.row.paymentName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="手续费（元）">
                <template scope="scope">
                    <span>{{scope.row.payAmount*scope.row.payCommission | formatMoney}}</span>
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
            isFirst: true,
            listLoading: false,
            params: { 
                url: 'channelmanager/getPayDomainsUsedList',
                page: 1,
                size: 10,
                tradeId: '', //订单号
                productName: '', //产品名称
                userId: '', //用户Id,
                paymentId: '-10001' // 渠道id
            },
            payment: '', //支付渠道信息
            total: 0, //总条数
            dataList: []
        }
    },
    computed: {
    },
    created() {
        this.getpayment(); //获取支付渠道
        this.getApplyList();
    },
    mounted() {
    },
    methods: {
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
        /*搜索列表信息*/
        getApplyList () {
            this.listLoading = true; //加载动作
            console.log(this.params)
            config(this.params).then(response => {
                console.log(response)
                if (response.respCode === '000000') {
                    this.total = response.data.total; //总条数赋值
                    this.listLoading = false;
                    this.dataList = response.data.payChannelUsedRecordRspList;
                } else {
                    this.listLoading =false; //加载动作
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                this.listLoading =false; //加载动作
                this.dataList = null;
            })
        },
        // 获取支付渠道信息
        getpayment () {
            config({url: 'channelmanager/findAllChanelInfoList'}).then(response => {
                console.log(response)
                if (response.respCode === '000000') {
                    this.payment = response.data.paymentDetailRspList;
                } else {
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
               console.log(err)
            })
        },
        //重置
        reset (formName) {
            this.$refs[formName].resetFields();
        },
        //去支付渠道列表
        go (val, number) {
            if (number === 1) {
                this.$router.push({ path: '/dealManage/orderDetail',query: { tradeId: val.tradeId } })
            } else if (number === 2) {
                 if (val.classType == 2) {
                      this.$router.push({ path: '/dealManage/dealManagePersonInsuranceProDetail',query: { productId: val.productId } }); //跳产品个险详情
                } else {
                    this.$router.push({ path: '/dealManage/dealManageCarFindListDetail',query: { productId: val.productId } }); //跳产品车险详情
                }
                // this.$router.push({ path: '/dealManage/orderDetail',query: { tradeId: val.tradeId } }) //去产品详情
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