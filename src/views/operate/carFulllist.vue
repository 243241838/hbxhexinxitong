<template>
    <div>
        <div class="www-page">
            <div style="padding-bottom:20px;">
                <div>
                    车牌:
                    <el-input v-model="query.licenseNo" :maxlength=30 style="width:200px;margin-bottom:10px;margin-right:10px;" placeholder="车牌"
                        :disabled="disabled"></el-input>
                    <el-checkbox style="margin-bottom:10px;margin-right:10px;" v-model="check" @change="change">新车未上牌</el-checkbox>
                    手机:
                    <el-input v-model="query.mobile" :maxlength=30 style="width:200px;margin-bottom:10px;margin-right:10px;" placeholder="手机"></el-input>
                    订单状态：
                    <el-select v-model="query.tradeSts">
                        <el-option v-for="item in orderType" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    证件状态:
                    <el-select v-model="query.idCardImgSts">
                        <el-option v-for="item in certificateType" :key="item.value" :label="item.label" :value="item.value" placeholder="全部">
                        </el-option>
                    </el-select>
                    保险公司:
                    <el-select v-model="query.insurerId">
                        <el-option v-for="item in insurersList" :key="item.insurerId" :label="item.insurerName" :value="item.insurerId" placeholder="全部">
                        </el-option>
                    </el-select>
                    更新时间:
                    <el-date-picker v-model="createTime" type="date" placeholder="开始日期" :editable=false style="width:200px;margin-bottom:10px;margin-right:2px;">
                    </el-date-picker>至
                    <el-date-picker v-model="lastLoginTime" type="date" placeholder="结束日期" :editable=false style="width:200px;margin-bottom:10px;margin-left:2px;">
                    </el-date-picker>
                </div>
                <el-button type="primary" v-waves icon="search" @click="search">搜索</el-button>
                <el-button v-waves @click="reset" icon="setting">重置</el-button>
                <el-button style="margin-left: 10px;" @click="handleExcel" icon="arrow-down">导出Excel</el-button>
            </div>
            <div>
                <el-table :data="data.tradeDetailsPoList" v-loading="listLoading" fit border highlight-current-row stripe style="width: 100%">
                    <el-table-column label="序号" width="100" align="center">
                        <template scope="scope">
                            <span>{{(query.page-1)*query.size + parseInt(scope.$index) + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作 " align="center" width="100">
                        <template scope="scope">
                            <span style="color:#20a0ff;cursor:pointer;" @click="godetails(scope.row.tradeId)">编辑</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="车牌" align="center" prop="licenseNo">
                        <template scope="scope">
                            <span>{{scope.row.licenseNo=scope.row.licenseNo==0?'新车未上牌':scope.row.licenseNo}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="车主" align="center" prop="insuredName"></el-table-column>
                    <el-table-column label="手机" align="center" prop="mobile"></el-table-column>
                    <el-table-column label="投保时间 " align="center" prop="tradeDateStr"></el-table-column>
                    <el-table-column label="订单状态" align="center" width="160">
                        <template scope="scope">
                            <span>{{scope.row.tradeSts |  state}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column p label="保险公司" align="center" prop="insurerName"></el-table-column>
                    <el-table-column label="保费 " align="center" prop="sumPremium">
                        <template scope="scope">
                            <span>{{scope.row.sumPremium |  money}}</span>
                        </template>
                    </el-table-column>
                    </el-table-column>
                    <el-table-column label="证件状态" align="center" width="160">
                        <template scope="scope">
                            <span v-if="scope.row.idCardImgSts==null">未审核</span>
                            <span v-else-if="scope.row.idCardImgSts==7">审核通过</span>
                            <span v-else>审核不通过</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div v-if="data.total" class="pagination-container" style="padding:10px 0;">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="query.page"
                        :page-sizes="[10,20,30,50]" :page-size="query.size" layout="total, sizes, prev, pager, next, jumper"
                        :total="data.total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import config from '@api/config';
    import * as static_data from '@utils/static_data.js';
    import {
        downloadExecl
    } from '@api/excel.js';
    import {
        trim
    } from '@src/utils/util';
    export default {
        data() {
            return {
                disabled: false,
                check: false,
                listLoading: false,
                createTime: '',
                lastLoginTime: '',
                certificateType: static_data.certificateType,
                orderType: static_data.orderType,
                query: {
                    url: 'carinstallments/findOrderList',
                    page: 1,
                    size: 10,
                    endTime: '',
                    idCardImgSts: '',
                    instalSts: 0,
                    insurerId: '',
                    licenseNo: '',
                    mobile: '',
                    startTime: '',
                    tradeSts: ''
                },
                data: {
                    tradeDetailsPoList: [],
                    total: 0
                },
                insurersList: [{
                    insurerId: '',
                    insurerName: '全部'
                }],
                params: {
                    url: 'insurer/findAll',
                    insurerType: 21,
                }
            }
        },
        computed: {},
        created() {
            this.getList();
            this.search();

        },
        mounted() {},
        methods: {
            godetails(tradeId) {
                this.$router.push({
                    path: "/operationManage/car/Fulllistdetails",
                    query: {
                        tradeId: tradeId
                    }
                });
            },
            change() {
                if (this.check) {
                    this.disabled = true;
                    this.query.newCarFlag = '0';
                    this.query.licenseNo = '';
                } else {
                    this.disabled = false;
                    delete this.query.newCarFlag;
                }
            },
            getList() {
                config(this.params).then(response => {
                    if (response.respCode === '000000') {
                        for (let i = 0; i < response.data.insurersList.length; i++) {
                            let obj = {
                                insurerId: response.data.insurersList[i].insurerId,
                                insurerName: response.data.insurersList[i].insurerName
                            }

                            this.insurersList.push(obj)
                        }

                    }
                })
            },
            format(time) {
                let Stime = new Date(time);
                let year = Stime.getFullYear();
                let month = Stime.getMonth() + 1;
                let date = Stime.getDate();
                let result = year + '-' + (month >= 10 ? month : '0' + month) + '-' + (date >= 10 ? date : '0' + date);
                return result
            },
            changeQuery(cur) {
                if (cur && typeof cur === 'number') {
                    this.query.page = cur;
                }
                if (this.createTime !== '') {
                    this.query.startTime = this.format(this.createTime);
                } else {
                    this.query.startTime = ''
                }
                if (this.lastLoginTime !== '') {
                    this.query.endTime = this.format(this.lastLoginTime);
                } else {
                    this.query.endTime = ''
                }
            },
            //获取列表
            search(cur) {
                this.changeQuery(cur);
                this.listLoading = true;
                config(this.query).then(response => {
                    this.listLoading = false;
                    if (response.respCode === '000000') {
                        this.data = response.data;
                    }
                })
            },
            // 重置搜索框
            reset() {
                this.createTime = "";
                this.lastLoginTime = "";
                this.query.licenseNo = "";
                this.query.mobile = "";
                this.query.tradeSts = "";
                this.query.idCardImgSts = "";
                this.query.insurerId = "";
                this.query.startTime = "";
                this.query.endTime = "";
                this.disabled=false;
                this.check=false;
                if(this.query.newCarFlag==0){
                    delete this.query.newCarFlag
                }
            },
            // 改变每一页的条数
            handleSizeChange(val) {
                this.query.size = val;
                this.search();
            },
            // 切换页码
            handleCurrentPageChange(val) {
                this.search(val);
            },
            handleExcel() {
                let obj = {
                    endTime: this.query.endTime,
                    idCardImgSts: this.query.idCardImgSts,
                    instalSts: 0,
                    insurerId: this.query.insurerId,
                    licenseNo: this.query.licenseNo,
                    mobile: this.query.mobile,
                    startTime: this.query.startTime,
                    tradeSts: this.query.tradeSts
                };
                if (this.createTime == '') {
                    obj.startTime = "";
                } else {
                    obj.startTime = this.format(this.createTime)
                }
                if (this.lastLoginTime == '') {
                    obj.endTime = "";
                } else {
                    obj.endTime = this.format(this.lastLoginTime);
                }
                if (this.check) {
                    obj.newCarFlag = '0';
                } else {
                    delete obj.newCarFlag;
                }
                downloadExecl({
                    url: 'carinstallments/exportExcel',
                    input: obj,
                });

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
                }
            },
            time: function (val) {
                let datatime = new Date(val);
                let year = datatime.getFullYear();
                let month = datatime.getMonth();
                let date = datatime.getDate();
                let result = year + '-' + ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) + '-' + (date >= 10 ?
                    date : '0' + date);
                return result
            },
            money: function (val) {
                if (!val) {
                    return '0.00'
                } else {
                    return (val / 100).toFixed(2)
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