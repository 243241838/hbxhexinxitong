<template>
    <div>
        <div class="www-page">
            <div style="padding-bottom:20px;">
                <div>
                    申请时间
                    <el-date-picker v-model="createTime" type="date" placeholder="开始时间" style="width:200px;margin-bottom:10px;margin-right:2px;">
                    </el-date-picker>至
                    <el-date-picker v-model="lastLoginTime" type="date" placeholder="结束时间" style="width:200px;margin-bottom:10px;margin-left:2px;">
                    </el-date-picker>
                    保险名称
                    <el-input v-model="query.productName" :maxlength=30 style="width:200px;margin-bottom:10px;margin-right:10px;" placeholder="保险名称"></el-input>
                    <el-button type="primary" v-waves icon="search" @click="search">统计</el-button>
                    <el-button v-waves @click="reset" icon="setting">重置</el-button>
                    <el-button style="margin-left: 10px;" @click="handleExcel" icon="arrow-down">导出Excel</el-button>
                </div>
                <div style="margin-top:10px;">统计时间:<span>{{start}}</span> 至<span>{{end}}</span> 共理赔 <span style="color: rgb(255, 0, 0);margin-right:10px;">{{data.totalItem}} 笔</span>理赔金额
                    <span style="color: rgb(255, 0, 0);">{{data.totalAmount}} 元</span>
                </div>
            </div>
            <div>
                <el-table :data="data.claimRecordsPoList" v-loading="listLoading" fit border highlight-current-row stripe style="width: 100%"
                    :default-sort="{prop:query.order,order:query.dir === 'desc' ? 'descending' : 'ascending'}" @sort-change="sort">
                    <el-table-column label="序号" width="100" align="center">
                        <template scope="scope">
                            <span>{{(query.page-1)*query.size + parseInt(scope.$index) + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="理赔时间" align="center" sortable="custom" prop="createTime">
                        <template scope="scope">
                            <span>{{scope.row.createTime |  time}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="保险名称" align="center">
                        <template scope="scope">
                            <span style="color:#3498da;cursor:pointer;" @click="go(scope.row.classType,scope.row.productId)">{{scope.row.productName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="申请理赔笔数" align="center" sortable="custom" prop="totCon">
                        <template scope="scope">
                            <span style="color:#3498da;cursor:pointer;" @click="gohome(scope.row.createTime)">{{scope.row.totCon}}</span>
                        </template>
                    </el-table-column>
                    </el-table-column>
                    <el-table-column label="成功理赔笔数" align="center" prop="succCon" sortable="custom">
                        <template scope="scope">
                            <span style="color:#3498da;cursor:pointer;" @click="successfulclaims(scope.row.createTime)">{{scope.row.succCon}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="totMon" label="理赔金额" align="center" sortable="custom">
                        <template scope="scope">
                            <span>{{scope.row.totMon/100 |  money}}</span>
                        </template>
                    </el-table-column>
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
        downloadExecl
    } from '@api/excel.js';
    import {
        trim
    } from '@src/utils/util';
    export default {
        data() {
            return {
                listLoading: false,
                createTime: '',
                lastLoginTime: '',
                start:'',
                end:new Date(),
                query: {
                    url: 'claim/findListMsg',
                    page: 1,
                    size: 10,
                    strStartDate: '',
                    strEndDate: '',
                    productName: '',
                    dir: 'desc',
                    order: 'createTime',
                },
                data: {
                    claimRecordsPoList: [],
                    totalItems: 0,
                    totalAmount: 0
                }
            }
        },
        computed: {},
        created() {
            this.search();
            this.end=this.format(this.end)
        },
        mounted() {},
        methods: {
            sort(column) {
                this.query.order = column.prop; //排序字段；
                this.query.dir = column.order === 'descending' ? 'desc' : 'asc'; //升降序
                this.search(1);
            },
            successfulclaims(createTime) {
                this.$router.push({
                    path: "/claim/toMsgList",
                    query: {
                        createTime: this.format(createTime),
                        sts: 4
                    }
                });
            },
            go(type,productId) {
                if (type == 2) {
                    this.$router.push({
                        path: "/product/personInsuranceProDetail",
                        query: {
                            productId: productId
                        }
                    });
                } else if (type == 1) {
                    this.$router.push({
                        path: "/product/carFindListDetail?",
                        query: {
                            productId: productId
                        }
                    });
                }
            },
            gohome(createTime) {
                this.$router.push({
                    path: "/claim/toMsgList",
                    query: {
                        createTime: this.format(createTime)
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
                    this.query.strStartDate = this.format(this.createTime);
                } else {
                    this.query.strStartDate = ''
                }
                if (this.lastLoginTime !== '') {
                    this.query.strEndDate = this.format(this.lastLoginTime);
                } else {
                    this.query.strEndDate = ''
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
                       if(this.createTime!=''){
                         this.start=this.format(this.createTime)
                       }
                       if(this.lastLoginTime!=''){
                           this.end=this.format(this.lastLoginTime)
                       }
                    }
                })
            },
            // 重置搜索框
            reset() {
                this.createTime = "";
                this.lastLoginTime = "";
                this.query.productName = "";
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
                    productName: this.query.productName,
                    strStartDate: '',
                    strEndDate: '',
                    type: "count"
                };
                if (this.createTime == '') {
                    obj.strStartDate = "";
                } else {
                    obj.strStartDate = this.format(this.createTime)
                }
                if (this.lastLoginTime == '') {
                    obj.strEndDate = "";
                } else {
                    obj.strEndDate = this.format(this.lastLoginTime);
                }
                downloadExecl({
                    url: 'claim/exportExcel',
                    input: obj,
                    enctype: 'application/json'
                });

            }

        },
        filters: {
            classification: function (val) {
                if (val == 10) {
                    return '理赔中'
                } else if (val == -20) {
                    return '理赔失败'
                } else if (val == 30) {
                    return '审核通过待打款'
                } else if (val == 40) {
                    return '审核通过已打款'
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