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
                <el-form-item label="查询时间">
                    <el-date-picker  v-model="pickTimeStart" type="date" placeholder="起始时间" :editable="false" @change="dateChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="至">
                    <el-date-picker v-model="pickTimeEnd" type="date" placeholder="结束时间" :editable="false" @change="dateChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="订单号" prop="tradeId">
                    <el-input v-model="params.tradeId" placeholder="订单号"></el-input>
                </el-form-item>
                <el-form-item label="交易金额" prop="selectAmount">
                    <!--1 :0-1元;2 :1-10元;3 :10-50元;4 :50-100元;5 :100元及以上;10 :自定义-->
                    <el-select v-model="params.selectAmount" placeholder="交易金额" @change="selectChange">
                        <el-option v-for="item in selectAmount" :key="item.code" :label="item.text" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-show="isMoney" prop="customAmountLow">
                    <el-input type="number"  v-model="params.customAmountLow"></el-input>
                </el-form-item>
                <el-form-item v-show="isMoney" label="至" prop="customAmountHight">
                    <el-input type="number"  v-model="params.customAmountHight"></el-input>
                </el-form-item>
                <el-form-item label="订单状态" prop="orderSts">
                    <el-select v-model="params.orderSts" placeholder="订单状态">
                        <el-option v-for="item in tradeSts" :key="item.sts" :label="item.text" :value="item.sts"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分销渠道" prop="domainId">
                    <el-select v-model="params.domainId" placeholder="分销渠道">
                        <el-option key="" label="全部" value=""></el-option>
                        <el-option v-for="item in channel" :key="item.domainId" :label="item.domainName" :value="item.domainId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="保险名称" prop="productName">
                    <el-input v-model="params.productName" placeholder="保险名称"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" prop="policyholderName">
                    <el-input v-model="params.policyholderName" placeholder="用户姓名"></el-input>
                </el-form-item>
                 <el-form-item label="用户手机" prop="mobile">
                    <el-input v-model="params.mobile" placeholder="用户手机"></el-input>
                </el-form-item>
                <el-form-item label="代理人" prop="tradeAgent">
                    <el-input v-model="params.tradeAgent" placeholder="代理人"></el-input>
                </el-form-item>
                <el-form-item>
                   <el-button type="primary" v-waves  icon="search" @click="getApplyList()">查询</el-button>
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
            <el-table-column align="center" label="订单号" width="200">
                <template scope="scope">
                     <!--<span style="color:#1d90e6;font-size: 12px; cursor: pointer;"  @click="gocustomerDetail(scope.row.tradeId)">{{scope.row.tradeId}}</span>-->
                     <el-button type="text" @click="gocustomerDetail(scope.row.tradeId)">{{scope.row.tradeId}}</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" label="保险名称">
                <template scope="scope">
                    {{scope.row.productName}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="分销渠道">
                <template scope="scope">
                    <span>{{scope.row.domainName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="投保时间" sortable="custom" prop="tradeDate" >
                <template scope="scope">
                    {{scope.row.tradeDate | timeFilter}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="投保人姓名">
                <template scope="scope">
                    <span>{{scope.row.policyholderName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="投保人手机号码">
                <template scope="scope">
                    <span>{{scope.row.mobile}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="交易金额" prop="payAmount" sortable="custom">
                <template scope="scope">
                    <span>{{scope.row.payAmount | formatMoney}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="订单状态">
                <template scope="scope">
                    <!--10:已下单（待支付）；-10：订单取消, -11：订单已失效；-12:订单关闭；-13：订单已删除；            18：已支付待激活, 20:已支付待发货, 21:支付不足；22:支付超额；-20:支付超时失败；-21：支付不足超时失败,            25：已激活待审核           30: 发货中；35：已发货；-30:未知原因发货失败；-31：渠道余额不足发货失败；-32：供应商余额不足发货失败；-33：网络异常发货失败           40: 全部核销；41：部分核销         50：全部退款申请；51：同意全部退款；-51：拒绝全部退款；55：部分退款申请；56：同意部分退款；-56：拒绝部分退款-->
                    <!--18 :已支付待激活;20 :已支付待发货;25 :已激活待审核;30 :发货中;35 :已发货;50 :已退款;-11 :已失效;-12 :已关闭;-13 :已删除-->
                    
                    <span v-for="item in tradeSts" v-show="scope.row.tradeSts == item.sts" v-text="item.text"></span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="代理人">
                <template scope="scope">
                    <span>{{scope.row.tradeAgent}}</span>
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
            isMoney: false, //是否出现自定义金钱
            pickTimeStart: '', //开始时间
            pickTimeEnd: new Date(), //结束时间
            params: { 
                url: '/ordermanager/findOrderList',
                page: 1,
                size: 10,
                beginDate: '', //开始时间
                endDate: '', //结束时间
                tradeId: '', //订单号
                selectAmount: '', //交易金额
                customAmountLow: '', //自定义金额低
                customAmountHight: '', //自定义金额高
                orderSts: '', //订单状态
                domainId: '', //分销渠道
                productName: '', //保险名称
                policyholderName: '', //用户名
                mobile: '', //手机
                tradeAgent: '', //代理人
                order: 'tradeDate', //排序字段
                dir: 'desc' // desc ：降序；asc：升序
            },
            channel: '', //渠道
            total: 0, //总条数
            dataList: [],
            selectAmount: [ //交易金额 <!-- 1 :0-1元;2 :1-10元;3 :10-50元;4 :50-100元;5 :100元及以上;10 :自定义-->
                {code: '', text: '全部'},
                {code: '1', text: '0-1元'},
                {code: '2', text: '1-10元'},
                {code: '3', text: '10-50元'},
                {code: '4', text: '50-100元'},
                {code: '5', text: '100元及以上'},
                {code: '10', text: '自定义'},
            ],
            tradeSts: [ //订单状态
                {sts: '', text: '全部'},
                {sts: 10, text: '已下单（待支付）'},
                {sts: -10, text: '订单取消'},
                {sts: -11, text: '订单已失效'},
                {sts: -12, text: '订单关闭'},
                {sts: -13, text: '订单已删除'},
                {sts: 18, text: '已支付待激活'},
                {sts: 20, text: '已支付待发货'},
                {sts: 21, text: '支付不足'},
                {sts: 22, text: '支付超额'},
                {sts: -20, text: '支付超时失败'},
                {sts: -21, text: '支付不足超时失败'},
                {sts: 25, text: '已激活待审核'},
                {sts: 30, text: '发货中'},
                {sts: 35, text: '已发货'},
                {sts: -30, text: '未知原因发货失败'},
                {sts: -31, text: '渠道余额不足发货失败'},
                {sts: -32, text: '供应商余额不足发货失败'},
                {sts: -33, text: '网络异常发货失败'},
                {sts: 40, text: '全部核销'},
                {sts: 41, text: '部分核销'},
                {sts: 50, text: '全部退款申请'},
                {sts: 51, text: '同意全部退款'},
                {sts: -51, text: '拒绝全部退款'},
                {sts: 55, text: '部分退款申请'},
                {sts: 56, text: '同意部分退款'},
                {sts: -56, text: '拒绝部分退款'}
            ]
        }
    },
    computed: {
    },
    created() {
        this.initTime(); //初始化查询开始时间
    },
    mounted() {
        this.getChannel(); //渠道
    },
    methods: {
        //初始化查询开始时间
        initTime () {
            let date = new Date();
            let month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '' + 0 + (date.getMonth() + 1);
            let year = date.getFullYear();
            this.pickTimeStart = new Date(year, date.getMonth(), '01')
            this.pickTimeEnd = new Date();
            this.params.beginDate = parseTime(this.pickTimeStart, '{y}-{m}-{d}');
            this.params.endDate = parseTime(this.pickTimeEnd, '{y}-{m}-{d}');
            if (this.isFirst) {
                this.getApplyList();
                this.isFirst = false;
            }
        },
        //下拉框
        selectChange (val) {
            console.log('a:' + val)
            if (parseInt(val) === 10) {
                this.isMoney = true;
            } else {
                this.isMoney = false;
                this.params.customAmountLow = ''; //自定义金额低
                this.params.customAmountHight = ''; //自定义金额高
            }
        },
        //渠道下拉框菜单
        getChannel () {
            let obj = {
                  url: 'channel/menuList'
            }
            config(obj).then(response => {
                console.log(response)
                if (response.respCode === '000000') {
                    let output = response.data;
                    if (!output) {
                        return false;
                    }
                   this.channel =  response.data.domainsPoList;
                   console.log(this.channel)
                } else {
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                console.log(err);
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
        //调整每页几条
        handleSizeChange(val) {
            this.params.size = val;
            this.params.page = 1;
            this.getApplyList(); //校检时间
        },
        //翻页
        handleCurrentPageChange (val) {
            this.params.page = val; //第几页赋值
            this.getApplyList(); //校检时间
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
        /*搜索列表信息*/
        getApplyList () {
            console.log(this.params)
            this.listLoading = true; //加载动作
            config(this.params).then(response => {
                console.log(response)
                if (response.respCode === '000000') {
                    this.total = response.data.total; //总条数赋值
                    this.listLoading = false;
                    this.dataList = response.data.orderInfoRecordList;
                } else {
                    this.listLoading =false; //加载动作
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                this.listLoading =false; //加载动作
                this.dataList = null;
            })
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
            this.initTime(); //重置时间
        },
        gocustomerDetail (val) {
            console.log(val)
            this.$router.push({ path: '/dealManage/orderDetail',query: { tradeId: val } })
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