<template>
    <div>
        <div class="www-page">
            <div style="padding-bottom:20px;">
                <div>
                    询价流水号:
                    <el-input v-model="query.serialId" :maxlength=30 style="width:200px;margin-bottom:10px;margin-right:10px;" placeholder="询价流水号"></el-input>
                    车牌号:
                    <el-input v-model="query.licenseNo" :maxlength=30 style="width:200px;margin-bottom:10px;margin-right:10px;" placeholder="车牌号"
                        :disabled="disabled"></el-input>
                    <el-checkbox style="margin-bottom:10px;margin-right:10px;" v-model="check" @change="change">新车未上牌</el-checkbox>
                    询价状态：
                    <el-select v-model="query.querySts" style="margin-bottom:10px;margin-right:10px;">
                        <el-option v-for="item in stateType" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    询价时间:
                    <el-date-picker v-model="createTime" type="date" placeholder="开始日期" style="width:200px;margin-bottom:10px;margin-right:2px;"
                        :editable=false>
                    </el-date-picker>至
                    <el-date-picker v-model="lastLoginTime" type="date" placeholder="结束日期" style="width:200px;margin-bottom:10px;margin-left:2px;margin-right:10px;"
                        :editable=false>
                    </el-date-picker>
                    <el-button type="primary" v-waves icon="search" @click="search">搜索</el-button>
                    <el-button v-waves @click="reset" icon="setting">重置</el-button>
                </div>
            </div>
            <el-table :data="data.queryList" v-loading="listLoading" fit border highlight-current-row stripe style="width: 100%">
                <el-table-column label="序号" width="100" align="center">
                    <template scope="scope">
                        <span>{{(query.page-1)*query.size + parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作 " align="center" prop="createTime" width="100">
                    <template scope="scope">
                        <span style="color: #20a0ff;cursor:pointer;" @click="go(scope.row.serialId)">编辑</span>
                    </template>
                </el-table-column>
                <el-table-column label="询价流水号 " align="center" prop="serialId">
                    <template scope="scope">
                        <span style="color: #20a0ff;cursor:pointer;" @click="godetails(scope.row.serialId)">{{scope.row.serialId}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="询价车牌号 " align="center" prop="licenseNo">
                    <template scope="scope">
                        <span v-if="scope.row.licenseNo==0">新车未上牌</span>
                        <span v-else>{{scope.row.licenseNo}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="询价人姓名 " align="center" prop="queryRealName"></el-table-column>
                <el-table-column prop="queryMobile" label="手机号  " align="center"></el-table-column>
                <el-table-column prop="queryTimeStr" label="询价时间 " align="center"></el-table-column>
                <el-table-column prop="resultTimeStr" label="报价时间 " align="center"></el-table-column>
                <el-table-column prop="querySts" label="报价状态" align="center">
                    <template scope="scope">
                        <span>{{scope.row.querySts | states}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div v-if="data.total" class="pagination-container" style="padding:10px 0;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="query.page"
                    :page-sizes="[10,20,30,50]" :page-size="query.size" layout="total, sizes, prev, pager, next, jumper" :total="data.total">
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
                stateType: static_data.stateType,
                query: {
                    url: 'carinstallments/findQueryList',
                    page: 1,
                    size: 10,
                    startTime: '',
                    querySts: '',
                    serialId: '',
                    licenseNo: '',
                    endTime: '',
                },
                data: {
                    queryList: [],
                    total: 0,
                }
            }
        },
        computed: {},
        created() {
            this.search();

        },
        mounted() {},
        methods: {
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
            go(serialId) {
                this.$router.push({
                    path: "/operationManage/car/Quotationdetails",
                    query: {
                        serialId: serialId
                    }
                });

            },
            godetails(serialId) {
                this.$router.push({
                    path: "/operationManage/car/Quotationshowdetails",
                    query: {
                        serialId: serialId
                    }
                });

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
                this.query.serialId = "";
                this.query.licenseNo = "";
                this.query.querySts = "";
                this.query.startTime = "";
                this.query.endTime = "";
                this.disabled = false;
                this.check = false;
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
            }
        },
        filters: {
            states: function (val) {
                if (val == 10) {
                    return '报价中'
                } else if (val == 20) {
                    return '报价成功'
                } else if (val == -20) {
                    return '报价失败'
                }
            },
            money: function (val) {
                if (!val) {
                    return '0.00'
                } else {
                    return val.toFixed(2)
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