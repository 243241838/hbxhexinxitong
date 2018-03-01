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
                    <el-date-picker  v-model="pickTimeStart" type="date" placeholder="起始时间" :editable="false" @change="dateChange" >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="至">
                    <el-date-picker v-model="pickTimeEnd" type="date" placeholder="结束时间" :editable="false" @change="dateChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="保单号" prop="policyNo">
                    <el-input v-model="params.policyNo" placeholder="保单号"></el-input>
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
                <el-form-item label="承保公司" prop="insurerId">
                    <el-select v-model="params.insurerId" placeholder="承保公司">
                        <el-option key="" label="全部" value=""></el-option>
                        <el-option v-for="item in poList" :key="item.insurerId" :label="item.insurerName" :value="item.insurerId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="被保险人" prop="insuredName">
                    <el-input v-model="params.insuredName" placeholder="被保险人"></el-input>
                </el-form-item>
                <el-form-item label="保单状态" prop="policySts">
                    <el-select v-model="params.policySts" placeholder="保单状态">
                        <!--10：核保中；-20：已拒保；20：已承保；25：申请退保；30：已退保；40：已失效-->
                        <el-option key="" label="全部" value=""></el-option>
                        <el-option key="10" label="核保中" value="10"></el-option>
                        <el-option key="-20" label="已拒保" value="-20"></el-option>
                        <el-option key="20" label="已承保" value="20"></el-option>
                        <el-option key="25" label="申请退保" value="25"></el-option>
                        <el-option key="30" label="已退保" value="30"></el-option>
                         <el-option key="40" label="已失效" value="40"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="保险名称" prop="productName">
                    <el-input v-model="params.productName" placeholder="保险名称"></el-input>
                </el-form-item>
                 <el-form-item label="被保险人手机" prop="mobile">
                    <el-input v-model="params.mobile" placeholder="被保险人手机"></el-input>
                </el-form-item>
                <el-form-item label="是否申请发票" prop="receiptSts">
                    <el-select v-model="params.receiptSts" placeholder="是否申请发票">
                        <!--1：是;0：否;-1：申请驳回;10：发票已提供-->
                        <el-option key="" label="全部" value=""></el-option>
                        <el-option key="1" label="是" value="1"></el-option>
                        <el-option key="0" label="否" value="0"></el-option>
                        <el-option key="-1" label="申请驳回否" value="-1"></el-option>
                        <el-option key="10" label="发票已提供" value="10"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                   <el-button type="primary" v-waves  icon="search" @click="getApplyList()">查询</el-button>
                   <el-button v-waves  @click="reset('params')"  icon="setting">重置</el-button>
                   <el-button v-waves  @click="derive()" >导出EXCEL</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="dataList" ref="table" :default-sort = "{prop: params.order, order: params.dir === 'desc' ? 'descending' : 'ascending'}" @sort-change="sort" v-loading="listLoading" border fit highlight-current-row >
            <el-table-column align="center" label="序号" width="100">
                <template scope="scope">
                    <span>{{(params.page-1)*params.size+parseInt(scope.$index) + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="保单号" width="240px">
                <template scope="scope">
                    <!--<span style="color:#1d90e6;font-size: 12px; cursor: pointer;" @click="gocustomerDetail(scope.row.detailId, 1)">{{scope.row.policyNo}}</span>-->
                    <el-button type="text" @click="gocustomerDetail(scope.row.detailId, 1)">{{scope.row.policyNo}}</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" label="保险名称" width="240px">
                <template scope="scope">
                    <!--<span style="color:#1d90e6;font-size: 12px; cursor: pointer;" @click="gocustomerDetail(scope.row.productId)">{{scope.row.productName}}</span>
                    -->
                    <el-button type="text" @click="gocustomerDetail(scope.row, 2)">{{scope.row.productName}}</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" label="承保公司" width="100px">
                <template scope="scope">
                    <span>{{scope.row.insurerName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="分销渠道" width="100px">
                <template scope="scope">
                    <span>{{scope.row.domainName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="投保时间" sortable="custom" prop="tradeDate" >
                <template scope="scope">
                    {{scope.row.tradeDate | timeFilter}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="被保险人" width="130px">
                <template scope="scope">
                    <span>{{scope.row.insuredName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="被保险人手机号码" width="150px;">
                <template scope="scope">
                    <span>{{scope.row.mobile}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="保险金额（元）" prop="sumPremium" sortable="custom" width="150px">
                <template scope="scope">
                    <span>{{scope.row.sumPremium | formatMoney}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="保单状态" width="100px">
                <template scope="scope">
                    <!--10：核保中；-20：已拒保；20：已承保；25：申请退保；30：已退保；40：已失效-->
                    <span v-show="scope.row.policySts == 10">核保中</span>
                    <span v-show="scope.row.policySts == -20">已拒保</span>
                    <span v-show="scope.row.policySts == 20">已承保</span>
                    <span v-show="scope.row.policySts == 25">申请退保</span>
                    <span v-show="scope.row.policySts == 30">已退保</span>
                    <span v-show="scope.row.policySts == 40">已失效</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="是否申请发票" width="100px">
                <template scope="scope">
                    <!--1：是;0：否;-1：申请驳回;10：发票已提供-->
                    <span v-show="scope.row.receiptSts == 1">是</span>
                    <span v-show="scope.row.receiptSts == 0">否</span>
                    <span v-show="scope.row.receiptSts == -1">申请驳回</span>
                    <span v-show="scope.row.receiptSts == 10">发票已提供</span>
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
                url: '/policymanager/findPolicyList',
                page: 1,
                size: 10,
                beginDate: '', //开始时间
                endDate: '', //结束时间
                policyNo: '', //保单号
                selectAmount: '', //交易金额
                customAmountLow: '', //自定义金额低
                customAmountHight: '', //自定义金额高
                insurerId: '', //承保公司id
                insuredName: '', //被保险人
                policySts: '', //保单状态
                productName: '', //保险名称
                mobile: '', //被保险人手机
                receiptSts: '', //是否申请发票
                order: 'tradeDate', //排序字段
                dir: 'desc' // desc ：降序；asc：升序
            },
            poList: '', //保险公司
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
            ]
        }
    },
    computed: {
    },
    created() {
        this.initTime(); //初始化查询开始时间
    },
    mounted() {
        this.insurance_company(); //保险公司
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
            if (parseInt(val) === 10) {
                this.isMoney = true;
            } else {
                this.isMoney = false;
                this.params.customAmountLow = ''; //自定义金额低
                this.params.customAmountHight = ''; //自定义金额高
            }
        },
        //保险公司
        insurance_company () {
            let obj = {
                url: 'insurer/findAll'
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    console.log(response.data)
                    let output = response.data;
                    if (!output) {
                        return false;
                    }
                    this.poList = response.data.insurersList;
                } else {
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                console.log(err)
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
                    this.dataList = response.data.policyInfoRecordList;
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
        //导出
        derive () {
             downloadExecl({ 
                 url: 'policymanager/exportExcel', 
                 input: {
                     beginDate: this.params.beginDate,
                     endDate: this.params.endDate,
                     policyNo: this.params.policyNo,
                     selectAmount: this.params.selectAmount,
                     customAmountLow: this.params.customAmountLow,
                     customAmountHight: this.params.customAmountHight,
                     insurerId: this.params.insurerId,
                     insuredName: this.params.insuredName,
                     policySts: this.params.policySts,
                     productName: this.params.productName,
                     mobile: this.params.mobile,
                     receiptSts: this.params.receiptSts
                }
            });
        },
        //去详情
        gocustomerDetail (val, number) {
            console.log(number)
            if (number === 1) {
                this.$router.push({ path: '/dealManage/dealManagePolicyDetails',query: { detailId: val } });
            } else {
                if (val.classType == 2) {
                      this.$router.push({ path: '/dealManage/dealManagePersonInsuranceProDetail',query: { productId: val.productId } }); //跳产品个险详情
                } else {
                    this.$router.push({ path: '/dealManage/dealManageCarFindListDetail',query: { productId: val.productId } }); //跳产品车险详情
                }
                console.log(val)
                // this.$router.push({ path: '/claim/policyDetails',query: { productId: val } }); //跳产品详情
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