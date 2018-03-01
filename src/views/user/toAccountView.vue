<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span>用户ID:</span>
            <el-input v-model="listQuery.params.userId" placeholder="用户ID" style="width:150px;margin-right: 50px;"></el-input>
            <span>用户名:</span>
            <el-input v-model="listQuery.params.username" placeholder="用户名" style="width:150px;margin-right: 50px;"></el-input>
            <span>姓名:</span>
            <el-input v-model="listQuery.params.realName" placeholder="姓名" style="width:150px;margin-right: 50px;"></el-input>
            <span>提交日期:</span>
            <el-date-picker v-model="pickTimeStart" type="date" placeholder="起始时间" :editable="false" @change="dateChange">
            </el-date-picker>至
            <el-date-picker v-model="pickTimeEnd" type="date" placeholder="结束时间" :editable="false" @change="dateChange">
            </el-date-picker>
            
        </div>
        <div class="filter-container">
            <span>认证情况:</span>
            <el-select clearable style="width:150px" class="filter-item" v-model="listQuery.params.realNameStatus" placeholder="认证情况">
                <el-option v-for="item in realNameStatus" :key="item.code" :label="item.text" :value="item.code">
                </el-option>
            </el-select>
            <span>总收入:</span>
            <el-select clearable style="width:150px" class="filter-item" v-model="listQuery.params.accoutSum" placeholder="总收入">
                <el-option v-for="item in accoutSumStatus" :key="item.code" :label="item.text" :value="item.code">
                </el-option>
            </el-select>
            <span>可提现:</span>
            <el-select clearable style="width:150px" class="filter-item" v-model="listQuery.params.accountBalance" placeholder="可提现">
                <el-option v-for="item in accountBalanceStatus" :key="item.code" :label="item.text" :value="item.code">
                </el-option>
            </el-select>
            <span>积分:</span>
            <el-select clearable style="width:150px" class="filter-item" v-model="listQuery.params.integral" placeholder="积分">
                <el-option v-for="item in integralStatus" :key="item.code" :label="item.text" :value="item.code">
                </el-option>
            </el-select>
            <el-button class="filter-item" style="margin-left: 50px;" @click="reset" type="primary" icon="setting">重置</el-button>
            <el-button class="filter-item" style="margin-left: 50px;" type="primary" v-waves icon="search" @click="getApplyList">查询</el-button>
        </div>
        <div class="filter-container">
            <el-table :data="dataList" v-loading="listLoading" border fit highlight-current-row style="width: 100%" @current-change="handleCurrentChange">
                <el-table-column align="center" label="序号" width="100">
                    <template scope="scope">
                        <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="用户ID">
                    <template scope="scope">
                        {{scope.row.userId}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="用户名">
                    <template scope="scope">
                        {{scope.row.username}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="注册时间">
                    <template scope="scope">
                        <span>{{scope.row.createTime | timeFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="姓名">
                    <template scope="scope">
                        <span>{{scope.row.realName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="总收入">
                    <template scope="scope">
                        <span>{{scope.row.acctSum}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="可提现">
                    <template scope="scope">
                        <span>{{scope.row.acctBalance}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="红包">
                    <template scope="scope">
                        <span>{{scope.row.couponCounts}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="积分">
                    <template scope="scope">
                        <span>{{scope.row.integral}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="认证情况">
                    <template scope="scope">
                        <span>{{scope.row.realNameStatus}}</span>
                    </template>
                </el-table-column>  
                <el-table-column align="center" label="操作项">
                    <template scope="scope">
                        <el-button @click="goDetail(scope.row.userId)" type="text" size="small">
                            [查看]
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="total" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="listQuery.params.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.params.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
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
            listLoading: true,
            pickTimeStart: '',
            pickTimeEnd: '',
            listQuery: { params: { url: 'user/findAllAccounts', page: 1, size: 10, userId: '',username: '',realName: '',minCreateTime: '',maxCreateTime: '',realNameStatus: '',accoutSum: '',accountBalance: '',integral: ''} },
            current: 1, // 默认显示第一页
            total: 0,
            dataList: [],
            realNameStatus: [{ code: -1, text: '认证失败'}, { code: 1, text: '认证成功'}, { code: 0, text: '未认证'}],
            accoutSumStatus: [{ code: 1, text: '0-1000'}, { code: 2, text: '1000-5000'}, { code: 3, text: '5000-10000'},{ code: 4, text: '10000以上'}],
            accountBalanceStatus: [{ code: 1, text: '0-1000'}, { code: 2, text: '1000-5000'}, { code: 3, text: '5000-10000'},{ code: 4, text: '10000以上'}],
            integralStatus: [{ code: 1, text: '0-1000'}, { code: 2, text: '1000-5000'}, { code: 3, text: '5000-10000'},{ code: 4, text: '10000以上'}],
            dialogVisible: false
        }
    },
    computed: {
    },
    created() {
        this.getApplyList();
    },
    mounted() {

    },
    methods: {
        /*时间选择器默认事件*/
        dateChange() {
            if (this.pickTimeStart === "") {
                this.listQuery.params.minCreateTime = "";
            } else {
                this.listQuery.params.minCreateTime = parseTime(this.pickTimeStart, '{y}-{m}-{d}');
            }
            if (this.pickTimeEnd === "") {
                this.listQuery.params.maxCreateTime = "";
            } else {
                this.listQuery.params.maxCreateTime = parseTime(this.pickTimeEnd, '{y}-{m}-{d}');
            }
        },
        //前往详情页
        goDetail(val) {
            this.$router.push({ path: '/user/toAccountDetail', query: { userId: val } });
            //this.$router.push({ path: '/user/customerInfoDetails',query: { userId: val } })
        },
        //渠道菜单
        getList() {
            let obj = {
                url: 'channel/menuList'
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {

                }
            }).catch(err => {

            })
        },
        //重置
        reset() {
            this.listQuery.params.userId = "";
            this.listQuery.params.username = "";
            this.listQuery.params.realName = "";
            this.listQuery.params.minCreateTime = "";
            this.listQuery.params.maxCreateTime = "";
            this.listQuery.params.realNameStatus = "";
            this.listQuery.params.accoutSum = "";
            this.listQuery.params.accountBalance = "";
            this.listQuery.params.integral = "";
        },
        //表格默认时间
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        handleSizeChange(val) {
            this.listQuery.params.size = val;
            this.getApplyList();
        },
        handleCurrentPageChange(val) {
            this.listQuery.params.page = val;
            this.getApplyList();
        },
        /*搜索列表信息*/
        getApplyList() {
            config(this.listQuery.params).then(response => {
                if (response.respCode === '000000') {
                    this.total = response.data.total;
                    this.listLoading = false;
                    this.dataList = response.data.userAccountList;
                }

            }).catch(err => {
                this.listLoading = true;
                this.dataList = null;
            })
        },
    },
    filters: {
        //性别过滤
        sexFilter(value) {
            if (value === 2) {
                return '女';
            } else if (value === 1) {
                return '男';
            } else {
                return '未知';
            }
        },
        //用户状态
        statusFilter(value) {
            if (value === 0) {
                return '等待审核';
            } else if (value === 1) {
                return '审核通过';
            } else if (value === -1) {
                return '审核不通过';
            } else {
                return value;
            }
        },
        //等级过滤
        userLevelFilter(value) {
            if (value === '10') {
                return 'C端';
            } else if (value === '20') {
                return 'B端';
            } else if (value === '11') {
                return '业务人员';
            } else {
                return value;
            }
        },
        //时间过滤
        timeFilter(val) {
           var date = new Date(val);
           let Y = date.getFullYear() + '-';
           let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
           let D = (date.getDate()<10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
           let h = (date.getHours()< 10 ? '0' + date.getHours() : date.getHours())+ ':';
           let m = (date.getMinutes()< 10 ? '0' + date.getMinutes() : date.getMinutes())+ ':';
           let s = date.getSeconds()< 10 ? '0' + date.getSeconds() : date.getSeconds();
            return Y + M + D + h + m + s;
        }
    }
}
</script>
<style lang="less" scoped>
.app-container {
    margin: 10px 10px 0 10px;
}

.app-container .filter-container {
    margin-top: 20px;
}

.app-container .filter-container .rightData {
    margin-right: 100px;
}
</style>