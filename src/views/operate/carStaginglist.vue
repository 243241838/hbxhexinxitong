+<template>
    <div>
        <div class="www-page">
            <div style="padding-bottom:20px;">
                <el-form :inline="true" :model="params" ref="params"  class="demo-form-inline">
                    <el-form-item v-show="false" label="当前页" prop="page">
                        <el-input  v-model="params.page"></el-input>
                    </el-form-item>
                    <el-form-item v-show="false" label="行数" prop="size">
                        <el-input v-model="params.size"></el-input>
                    </el-form-item>
                    <el-form-item label="车牌号" prop="licenseNo">
                        <el-input v-model="params.licenseNo" placeholder="车牌号查询"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号查询" prop="mobile">
                        <el-input v-model="params.mobile" placeholder="手机号查询"></el-input>
                    </el-form-item>
                    <el-form-item label="订单状态" prop="tradeSts">
                        <el-select v-model="params.tradeSts	" placeholder="订单状态">
                            <el-option  key="" label="全部" value=""></el-option>
                            <el-option  key="10" label="待支付" value="10"></el-option>
                            <el-option  key="20" label="已支付" value="20"></el-option>
                            <el-option  key="35" label="已完成" value="35"></el-option>
                            <el-option  key="-11" label="已失效" value="-11"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="审核状态" prop="idCardImgSts">
                        <el-select v-model="params.idCardImgSts" placeholder="审核状态">
                            <el-option  key="" label="全部" value=""></el-option>
                            <el-option  key="0" label="未审核" value="0"></el-option>
                            <el-option  key="1" label="已审核" value="1"></el-option>
                            <el-option  key="-1" label="审核不通过" value="-1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="投保公司" prop="insurerId">
                        <el-select v-model="params.insurerId" placeholder="投保公司">
                            <el-option  key="" label="全部" value=""></el-option>
                            <el-option v-for="item in poList" :key="item.insurerId" :label="item.insurerName" :value="item.insurerId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="更新时间">
                        <el-date-picker  v-model="pickTimeStart" type="date" placeholder="起始时间" :editable="false" @change="dateChange" >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="至">
                        <el-date-picker v-model="pickTimeEnd" type="date" placeholder="结束时间" :editable="false" @change="dateChange">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="" >
                         <el-checkbox v-model="newCarFlag">新车未上牌</el-checkbox>
                    </el-form-item>
                    <el-button type="primary" v-waves  icon="search" @click="getList()">查询</el-button>
                    <el-button v-waves  @click="reset('params')"  icon="setting">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data="data" v-loading="listLoading" fit border highlight-current-row stripe style="width: 100%">
                <el-table-column label="序号" width="100" align="center">
                    <template scope="scope">
                        <span>{{(params.page-1)*params.size + parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="车牌 " align="center">
                    <template scope="scope">
                        <span v-if="scope.row.licenseNo==0">新车未上牌</span>
                        <span v-else>{{scope.row.licenseNo}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="车主 " align="center">
                    <template scope="scope">
                        <span>{{scope.row.insuredName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="手机 " align="center">
                    <template scope="scope">
                        <span>{{scope.row.mobile}}</span>
                    </template>
                </el-table-column>
                 <el-table-column label="投保时间 " align="center">
                    <template scope="scope">
                        <span>{{scope.row.tradeDateStr}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="订单状态 " align="center">
                    <template scope="scope">
                        <span>{{scope.row.tradeSts | state}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="保险公司" align="center">
                    <template scope="scope">
                        <span>{{scope.row.insurerName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="保费" align="center">
                    <template scope="scope">
                        <span>{{scope.row.sumPremium | formatMoney}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="审核状态" align="center" >
                    <template scope="scope" >
                         <span v-show="scope.row.status == 10">未审核</span>
                         <span v-show="scope.row.status == 11">审核通过</span>
                         <span v-show="scope.row.status == 12">审核不通过</span>
                         <!--<span v-show="scope.row.status == 13">异常</span>-->
                        <!--<span v-show="scope.row.status == 13"></span>-->
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" >
                    <template scope="scope" >
                         <el-button type="text" @click="go(scope.row)" v-if="scope.row.status == 10">审核</el-button>
                        <el-button type="text"  @click="go(scope.row)"  v-else-if="scope.row.status == 12 && scope.row.tradeSts != -11 || scope.row.status == 11 && scope.row.tradeSts != -11">编辑</el-button>
                        <el-button type="text"  @click="go(scope.row)"  v-else>查看</el-button>
                        <!--<span v-show="scope.row.status == 13"></span>-->
                    </template>
                </el-table-column>
            </el-table>
            <div v-show="total" class="pagination-container" style="padding:10px 0;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="params.page"
                    :page-sizes="[10,20,30,50]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import config from '@api/config';
    import { parseTime } from '@filters/index.js';
    export default {
        data() {
            return {
                pickTimeStart: '',
                pickTimeEnd: '',
                listLoading: '',
                params: {
                    url: 'carinstallments/findOrderList',
                    page: 1,
                    size: 10,
                    endTime: '',
                    idCardImgSts: '',
                    instalSts: 1,
                    insurerId: '',
                    licenseNo: '',
                    mobile: '',
                    newCarFlag: '',
                    startTime: '',
                    tradeSts: ''
                },
                newCarFlag: '',
                total: 0,
                data: [],
                poList: [] //承保公司
            }
        },
        computed: {},
        created() {
            this.getList();
            this.insurance_company (); //获取保险公司
        },
        mounted() {},
        methods: {
            go(data) {
                this.$router.push({path: "/operationManage/stagesOrderDetail",query: {row: JSON.stringify(data)}});
            },
            //获取列表
            getList(cur) {
                this.listLoading = true;
                if (this.newCarFlag) {
                    this.params.newCarFlag = 0;
                } else {
                    this.params.newCarFlag = '';
                }
                console.log(this.params)
                config(this.params).then(response => {
                    if (response.respCode === '000000') {
                        let output = response.data;
                        if (!output) {
                            return false;
                        }
                        console.log(response)
                        this.data = response.data.tradeDetailsPoList;
                        this.total = response.data.total;
                    } else {
                        this.message('warning', response.respMsg)
                    }
                    this.listLoading = false;
                }).catch(err => {
                    this.listLoading = false;
                    console.log(err)
                })
            },
            //保险公司
            insurance_company () {
                let obj = {
                    url: 'insurer/findAll',
                    insurerType: 21
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
                    this.params.startTime = "";
                } else {
                    this.params.startTime = parseTime(this.pickTimeStart, '{y}-{m}-{d}');
                }
                if (this.pickTimeEnd === "") {
                    this.params.endTime = "";
                } else {
                    this.params.endTime = parseTime(this.pickTimeEnd, '{y}-{m}-{d}');
                }
            },
            // 重置搜索框
            reset(formName) {
                 this.newCarFlag = false;
                 this.$refs[formName].resetFields();
                 this.pickTimeStart = '';
                 this.pickTimeEnd = '';
            },
            // 改变每一页的条数
            handleSizeChange(val) {
                this.query.size = val;
                this.getList();
            },
            // 切换页码
            handleCurrentPageChange(val) {
                this.getList(val);
            }
        },
        filters: {
             state: function (val) {
                if (val == 10) {
                    return '待支付'
                } else if (val == 20) {
                    return '已支付'
                } else if (val == 35) {
                    return '已完成'
                } else if (val == -11) {
                    return '已失效'
                } else {
                    return ''
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
            },
            //金钱
            formatMoney (val) {
                if (!val) {
                    return '0.00';
                } else {
                    return (val/100).toFixed(2);
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .dash-add-btn {
        display: inline-block;
        margin: 10px 0;
        padding: 5px 30px 5px 44px;
        color: #768399;
        font-weight: bold;
        font-size: 14px;
        border: 1px dashed #d9dcdd;
        border-radius: 3px;
    }
</style>