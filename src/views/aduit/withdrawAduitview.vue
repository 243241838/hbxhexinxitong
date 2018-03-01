<template>
    <div>
        <div class="www-page">
            <div style="padding-bottom:20px;">
                提交日期：
                <el-date-picker v-model="createTime" type="date" placeholder="开始日期" style="width:200px;margin-bottom:10px;margin-right:2px;":editable="false">
                </el-date-picker>至
                <el-date-picker v-model="lastLoginTime" type="date" placeholder="结束日期" style="width:200px;margin-bottom:10px;margin-left:2px;":editable="false">
                </el-date-picker>
                用户ID:
                <el-input v-model="query.userId" :maxlength=30 style="width:200px;margin-bottom:10px;margin-right:10px;" placeholder="用户ID"></el-input>
                申请人：
                <el-input v-model="query.reqNickname" :maxlength=30 style="width:200px;margin-bottom:10px;margin-right:10px;" placeholder="申请人"></el-input>
                审核状态：
                <el-select v-model="query.auditSts" placeholder="全部">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" v-waves icon="search" @click="search">查询</el-button>
                <el-button v-waves @click="reset" icon="setting">重置</el-button>
            </div>
            <div>
                <el-table :data="data.auditRecordsPoList" v-loading="listLoading" fit border highlight-current-row style="width: 100%" :default-sort="{prop:query.order,order:query.dir === 'desc' ? 'descending' : 'ascending'}" @sort-change="sort">
                    <el-table-column label="序号" width="100" align="center">
                        <template scope="scope">
                            <span>{{(query.page-1)*query.size + parseInt(scope.$index) + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="审核ID" align="center" width="120" prop="auditId"> </el-table-column>
                    <el-table-column prop="bizId" label="提现流水号" align="center"></el-table-column>
                    <el-table-column label="提现用户ID" width="160" align="center" prop="userId"></el-table-column>
                    <el-table-column label="手机号" width="200" align="center" prop="mobile"> </el-table-column>
                    <el-table-column prop="realName" label="真实姓名" width="140" align="center"></el-table-column>
                    <el-table-column prop="bankName" label="开户银行" width="160" align="center"></el-table-column>
                    <el-table-column prop="cashAmount" label="提现金额" width="160" align="center"></el-table-column>
                    <el-table-column label="申请提现日期"  align="center" prop="reqTime" sortable="custom">
                        <template scope="scope">
                            <span>{{scope.row.reqTime |  time}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="审核状态" width="200" align="center">
                        <template scope="scope">
                            <span>{{scope.row.auditSts | classification}}</span>
                        </template>
                    </el-table-column>
                    </el-table>
                <div v-if="data.totalItems" class="pagination-container" style="padding:10px 0;">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="query.page"
                        :page-sizes="[10,20,30,50]" :page-size="query.size" layout="total, sizes, prev, pager, next, jumper"
                        :total="data.totalItems">
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
                createTime: '',
                lastLoginTime: '',
                options: [{
                    value: null,
                    label: '全部'
                }, {
                    value: 0,
                    label: '待审核'
                }, {
                    value: -1,
                    label: '审核不通过'
                }, {
                    value: 1,
                    label: '审核通过'
                }],
                query: {
                    url: 'finance/aduitWithdrawListView',
                    page: 1,
                    size: 10,
                    reqNickname: '',
                    userId:null,
                    effTimestr:null,
                    expTimestr:null,
                    auditSts:null,
                    order:'reqTime',
                    dir:'desc'
                   },
                data: {
                    auditRecordsPoList: [],
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
                    this.query.expTimestr = this.format(this.lastLoginTime);
                } else {
                    this.query.effTimeStr = null
                }
            },
            //获取列表
            search(cur) {
                this.changeQuery(cur);
                this.listLoading = false;
                config(this.query).then(response => {
                    this.listLoading = false;
                    if (response.respCode === '000000') {
                        this.data = response.data;
                    }
                })
            },
            // 重置搜索框
            reset() {
                this.createTime="";
                this.lastLoginTime="";
                this.query.reqNickname = "";
                this.query.effTimestr = null;
                this.query.expTimestr = null;
                this.query.userId = "";
                this.query.auditSts = "";
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
                if (val == 0) {
                    return '等待审核'
                } else if (val == 1) {
                    return '审核通过'
                } else if (val == -1) {
                    return '审核不通过'
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
   
</style>