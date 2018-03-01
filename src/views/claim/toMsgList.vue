<template>
    <div>
        <div class="www-page">
            <div style="padding-bottom:20px;">
                理赔编号：
                <el-input v-model="query.claimId" :maxlength=30 style="width:200px;margin-bottom:10px;margin-right:10px;" placeholder="理赔编号"></el-input>
                保单号：
                <el-input v-model="query.policyNo" :maxlength=30 style="width:200px;margin-bottom:10px;margin-right:10px;" placeholder="保单号"></el-input>
                保险名称：
                <el-input v-model="query.productName" :maxlength=30 style="width:200px;margin-bottom:10px;margin-right:10px;" placeholder="保险名称"></el-input>
                投保人：
                <el-input v-model="query.policyholderName" :maxlength=30 style="width:200px;margin-bottom:10px;margin-right:10px;" placeholder="投保人"></el-input>
                手机号码：
                <el-input v-model="query.mobile" :maxlength=30 style="width:200px;margin-bottom:10px;margin-right:10px;" placeholder="手机号码"></el-input>
                申请时间：
                <el-date-picker v-model="createTime" type="date" placeholder="开始日期" style="width:200px;margin-bottom:10px;margin-right:2px;">
                </el-date-picker>至
                <el-date-picker v-model="lastLoginTime" type="date" placeholder="结束日期" style="width:200px;margin-bottom:10px;margin-left:2px;">
                </el-date-picker>
                理赔状态：
                <el-select v-model="query.sts" placeholder="全部">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button v-waves @click="reset" icon="setting">重置</el-button>
                <el-button type="primary" v-waves icon="search" @click="search">查询</el-button>
            </div>
            <div>
                <el-table :data="data.claimRecordsPoList" v-loading="listLoading" fit border highlight-current-row  stripe style="width: 100%":default-sort="{prop:query.order,order:query.dir === 'desc' ? 'descending' : 'ascending'}" @sort-change="sort">
                    <el-table-column label="序号" width="100" align="center">
                        <template scope="scope">
                            <span>{{(query.page-1)*query.size + parseInt(scope.$index) + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="100">
                        <template scope="scope">
                            <span style="color:#3498da;cursor:pointer;" @click="go(scope.row.claimId)">[跟进]</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="claimId" label="理赔编号" align="center" width="220">
                        <template scope="scope">
                            <span @click="goclaimDetail(scope.row.claimId)" style="cursor:pointer;color:#3498da;">{{scope.row.claimId}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="保单号" width="260" align="center" prop="policyNo">
                        <template scope="scope">
                            <span @click="goDetail(scope.row.detailId)" style="cursor:pointer;color:#3498da;">{{scope.row.policyNo}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="保险名称" width="260" align="center" prop="productName"> </el-table-column>
                    <el-table-column prop="userId" label="用户ID" width="120" align="center"></el-table-column>
                    <el-table-column prop="policyholderName" label="投保人" width="120" align="center"></el-table-column>
                    <el-table-column prop="mobile" label="手机号码" width="200" align="center"></el-table-column>
                    <el-table-column label="申请时间" width="200" align="center" prop="createTime"  sortable="custom">
                        <template scope="scope">
                            <span>{{scope.row.createTime |  time}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="state" label="理赔状态" width="200" align="center">
                        <template scope="scope">
                            <span>{{scope.row.state | classification}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sumAmount" label="理赔金额(元)" width="160" align="center"></el-table-column>
                </el-table>
                <div v-if="data.totalItem" class="pagination-container" style="padding:10px 0;">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="query.page"
                        :page-sizes="[10,20,30,50]" :page-size="query.size" layout="total, sizes, prev, pager, next, jumper"
                        :total="data.totalItem">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import config from '@api/config';
    import {
        trim
    } from '@src/utils/util';
    export default {
        data() {
            return {
                listLoading: false,
                createTime: this.$route.query.createTime ? this.$route.query.createTime : '',
                lastLoginTime: '',
                options: [{
                    value: null,
                    label: '全部'
                }, {
                    value: 1,
                    label: '理赔中'
                }, {
                    value: 2,
                    label: '已理赔待打款'
                }, {
                    value: 4,
                    label: '已理赔已打款'
                }, {
                    value: 3,
                    label: '理赔失败'
                }],
                query: {
                    url: 'claim/findClaimList',
                    page: 1,
                    size: 10,
                    claimId: '',
                    effTimeStr: null,
                    effTimeStr2: null,
                    mobile: '',
                    policyNo: '',
                    policyholderName: '',
                    productName: '',
                    sts: null,
                    dir: 'desc',
                    order: 'createTime',
                },
                data: {
                    claimRecordsPoList: [],
                    totalItems: 0
                },
            }
        },
        computed: {},
        created() {
            this.search(1);
        },
        mounted() {},
        methods: {
            sort(column) {
                this.query.order = column.prop; //排序字段；
                this.query.dir = column.order === 'descending' ? 'desc' : 'asc'; //升降序
                this.search(1);
            },
            go(claimId) {
                this.$router.push({
                    path: "/claim/followupdetails",
                    query: {
                        claimId: claimId
                    }
                });
            },
            goclaimDetail(claimId) {
                this.$router.push({
                    path: "/claim/claimsDetails",
                    query: {
                        claimId: claimId
                    }
                });
            },
            goDetail(detailId) {
                this.$router.push({
                    path: "/claim/policyDetails",
                    query: {
                        detailId: detailId
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
                    this.query.effTimeStr = this.format(this.createTime);
                } else {
                    this.query.effTimeStr = null
                }
                if (this.lastLoginTime !== '') {
                    this.query.effTimeStr2 = this.format(this.lastLoginTime);
                } else {
                    this.query.effTimeStr = null
                }
            },
            //获取列表
            search(cur) {
                this.changeQuery(cur);
                this.listLoading = true;
                this.query.mobile = trim(this.query.mobile);
                if (this.$route.query.createTime) {
                    this.query.effTimeStr = this.$route.query.createTime;
                } else {
                    if (this.createTime == "") {
                        this.query.effTimeStr = null
                    } else {
                        this.query.effTimeStr = this.format(this.createTime)
                    }
                }
                if (this.$route.query.sts) {
                    this.query.sts = this.$route.query.sts;
                }
                config(this.query).then(response => {
                    this.listLoading = false;
                    if (response.respCode === '000000') {
                        this.data = response.data;
                    }
                })
            },
            // 重置搜索框
            reset() {
                this.query.claimId = "";
                this.query.effTimeStr = null;
                this.query.effTimeStr2 = null;
                this.query.mobile = "";
                this.query.policyNo = "";
                this.query.policyholderName = "";
                this.query.productName = "";
                this.query.sts = null;
                this.createTime = '';
                this.lastLoginTime = "";
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

        },
        filters: {
            classification: function (val) {
                if (val == 10) {
                    return '理赔中'
                } else if (val == -20) {
                    return '理赔失败'
                } else if (val == 30) {
                    return '已理赔待打款'
                } else if (val == 40) {
                    return '已理赔已打款'
                }
            },
            time: function (val) {
                let datatime = new Date(val);
                let year = datatime.getFullYear();
                let month = datatime.getMonth();
                let date = datatime.getDate();
                let hour = datatime.getHours();
                let minute = datatime.getMinutes();
                let second = datatime.getSeconds();
                let result = year + '-' + ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) + '-' + (date >= 10 ?
                        date : '0' + date) + ' ' + (hour >= 10 ? hour : '0' + hour) + ':' +
                    (minute >= 10 ? minute : '0' + minute) + ":" + (second >= 10 ? second : '0' + second);
                return result
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