<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span>注册时间:</span>
            <el-date-picker v-model="pickTimeStart" type="date" placeholder="起始时间" :editable="false" @change="dateChange">
            </el-date-picker>至
            <el-date-picker v-model="pickTimeEnd" type="date" placeholder="结束时间" :editable="false" @change="dateChange">
            </el-date-picker>
            <el-button class="filter-item" style="margin-left: 50px;" @click="reset" type="primary" icon="setting">重置</el-button>
            <el-button class="filter-item" style="margin-left: 50px;" type="primary" v-waves icon="search" @click="getApplyList">查询</el-button>
        </div>
        <div class="filter-container">
            <div>截止至2018-01-12累计用户数：{{tradeIncreaseNum}}</div>
            <div>统计时间2018-01-01至2018-01-12总计新增用户数：{{userIncreaseNum}},总计购买用户数：{{userHistoryNum}}</div>
        </div>
        <div class="filter-container">
            <el-table :data="dataList" v-loading="listLoading" border fit highlight-current-row style="width: 100%" @current-change="handleCurrentChange">
                <el-table-column align="center" label="序号" width="100">
                    <template scope="scope">
                        <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="日期">
                    <template scope="scope">
                        {{scope.row.time | timeFilter}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="新增用户数">
                    <template scope="scope">
                        <span>{{scope.row.userCount}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="购买用户数">
                    <template scope="scope">
                        {{scope.row.tradeCount}}
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
            listQuery: { params: { url: 'user/findUserCount', page: 1, size: 10, endTime: '', startTime: '' } },
            total: 0,
            dataList: [],//列表渲染数据 
            domainStatus: [],
            dialogVisible: false,
            tradeIncreaseNum: '',
            userHistoryNum: '',
            userIncreaseNum: ''
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
                this.listQuery.params.startTime = "";
            } else {
                this.listQuery.params.startTime = parseTime(this.pickTimeStart, '{y}-{m}-{d}');
            }
            if (this.pickTimeEnd === "") {
                this.listQuery.params.endTime = "";
            } else {
                this.listQuery.params.endTime = parseTime(this.pickTimeEnd, '{y}-{m}-{d}');
            }
        },
        //菜单权限
        // getList() {
        //     let obj = {
        //         url: '/getMenuList'
        //     }
        //     config(obj).then(response => {
        //         if (response.respCode === '000000') {

        //         }
        //     }).catch(err => {

        //     })
        // },
        //重置
        reset() {
            this.listQuery.params.endTime = "";
            this.listQuery.params.startTime = "";
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
                console.log(response)
                if (response.respCode === '000000') {
                    this.total = response.data.total;
                    this.listLoading = false;
                    this.dataList = response.data.poList;
                    this.tradeIncreaseNum = response.data.tradeIncreaseNum;
                    this.userHistoryNum = response.data.userHistoryNum;
                    this.userIncreaseNum = response.data.userIncreaseNum;
                }

            }).catch(err => {
                this.listLoading = true;
            })
        },
    },
    filters: {
        //时间过滤
        timeFilter(val) {
            var date = new Date(val);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
            let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
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