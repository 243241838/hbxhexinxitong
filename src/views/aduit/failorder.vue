<template>
    <div>
        <div class="www-page">
            <div style="padding-bottom:20px;">
                提现流水号:
                <el-input v-model="query.cashId" :maxlength=30 style="width:200px;margin-bottom:10px;margin-right:10px;" placeholder=" 提现流水号"></el-input>
                订单状态：
                <el-select v-model="query.cashSts" placeholder="全部">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" v-waves icon="search" @click="search">查询</el-button>
                <el-button v-waves @click="reset" icon="setting">重置</el-button>
            </div>
            <div>
                <el-table :data="data.cashRecordPoList" v-loading="listLoading" fit border highlight-current-row style="width: 100%">
                    <el-table-column label="序号" width="100" align="center">
                        <template scope="scope">
                            <span>{{(query.page-1)*query.size + parseInt(scope.$index) + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="提现流水号" align="center">
                        <template scope="scope">
                         <router-link :to="{path:'/aduit/withdrawaldetails',query: {cashId:scope.row.cashId}}" style="color:#3498da;cursor:pointer;">{{scope.row.cashId}}</router-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
                    <el-table-column label="用户名" align="center" prop="userName"></el-table-column>
                    <el-table-column label="真实姓名" align="center" prop="realName"> </el-table-column>
                    <el-table-column prop="idenNo" label="身份证号" align="center"></el-table-column>
                    <el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
                    <el-table-column prop="cashAmount" label="提现金额" align="center">
                        <template scope="scope">
                            <span>{{(scope.row.cashAmount/100).toFixed(2)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="订单状态" align="center">
                        <template scope="scope">
                            <span>{{scope.row.cashSts |  classification}}</span>
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
                options: [{
                    value: null,
                    label: '全部'
                }, {
                    value: -10,
                    label: '订单异常'
                }, {
                    value: -30,
                    label: '到账失败'
                }],
                query: {
                    url: 'finance/cashRecordListView',
                    page: 1,
                    size: 10,
                    cashId: '',
                    cashSts: ''
                },
                data: {
                    cashRecordPoList: [],
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
            changeQuery(cur) {
                if (cur && typeof cur === 'number') {
                    this.query.page = cur;
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
                this.query.cashId = "";
                this.query.cashSts = "";
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
            classification: function (val) {
                if (val == 10) {
                    return '提现中';
                } else if (val == -10) {
                    return '提现异常';
                } else if (val == 20) {
                    return '待到账';
                } else if (val == -20) {
                    return '审核驳回';
                } else if (val == 30) {
                    return '到账成功';
                } else if (val == -30) {
                    return '到账失败';
                } else if (val == -40) {
                    return '提现失败';
                }
            }
        }
    }
</script>
<style lang="less" scoped>

</style>