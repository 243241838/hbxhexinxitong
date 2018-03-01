<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span>提交日期:</span>
            <el-date-picker v-model="pickTimeStart" type="date" placeholder="起始时间" :editable="false" @change="dateChange">
            </el-date-picker>至
            <el-date-picker v-model="pickTimeEnd" type="date" placeholder="结束时间" :editable="false" @change="dateChange">
            </el-date-picker>
            <span>用户ID:</span>
            <el-input v-model="listQuery.params.bizId" placeholder="用户ID" style="width:200px;margin-right: 50px;"></el-input>
            <span>申请人:</span>
            <el-input v-model="listQuery.params.reqNickname" placeholder="申请人" style="width:200px;margin-right: 50px;"></el-input>
            <span>审核状态:</span>
            <el-input v-model="listQuery.params.auditSts" placeholder="用户昵称" style="width:200px;margin-right: 50px;"></el-input>
        </div>
        <div class="filter-container">
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
                <el-table-column align="center" label="审核ID">
                    <template scope="scope">
                        {{scope.row.auditId}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="用户ID">
                    <template scope="scope">
                        {{scope.row.userId}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="用户名">
                    <template scope="scope">
                        {{scope.row.userName}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="真实姓名">
                    <template scope="scope">
                        <span>{{scope.row.realName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="申请人账号">
                    <template scope="scope">
                        <span>{{scope.row.reqNickname}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="提交日期">
                    <template scope="scope">
                        <span>{{scope.row.reqTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="审核状态">
                    <template scope="scope">
                        <span>{{scope.row.auditSts | statusFilter}}</span>
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
            listQuery: { params: { url: 'audit/agentAuditList', page: 1, size: 10, userId:'', bizId: '',reqNickname: '',auditSts: '',effTimestr: '',expTimestr: ''} },
            current: 1, // 默认显示第一页
            total: 0,
            dataList: [],
            creditApplyStatus: [{ code: -10, text: '已拒绝', tag: 'danger' }, { code: 10, text: '已审批', tag: 'success' }, { code: 1, text: '待审批', tag: 'wanner' }, { code: 0, text: '资料完善中', tag: 'wanner' }],
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
                this.listQuery.params.effTimestr = "";
            } else {
                this.listQuery.params.effTimestr = parseTime(this.pickTimeStart, '{y}-{m}-{d}');
            }
            if (this.pickTimeEnd === "") {
                this.listQuery.params.expTimestr = "";
            } else {
                this.listQuery.params.expTimestr = parseTime(this.pickTimeEnd, '{y}-{m}-{d}');
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
            this.listQuery.params.orderNo = "";
            this.pickTimeEnd = "";
            this.pickTimeStart = "";
            this.listQuery.params.mobile = "";
            this.listQuery.params.realName = "";
            this.listQuery.params.userId = "";
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
                    this.dataList = response.data.auditRecordsList;
                }

            }).catch(err => {
                this.listLoading = true;
                this.dataList = null;
            })
        },
        /*初始化密码*/
        initialize(val) {
            let obj = {
                url: 'user/resetPassword',
                userId: val
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.$message({
                        message: response.respMsg,
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message: response.respMsg,
                        type: 'warning'
                    });
                }
            }).catch(err => {

            })
        },
        //禁用，恢复
        forbid(val) {
            let obj = {
                url: ' user/deleteUser',
                userId: val
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                     this.$message({
                        message: response.respMsg,
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message: response.respMsg,
                        type: 'warning'
                    });
                }
            }).catch(err => {
                 
            })
        },
        //跳转进入详情页
        gocustomerDetail(val) {
            this.$router.push({ path: '/user/customerInfoDetails',query: { userId: val } })
        }
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
           let D = (date.getDate()<10 ? '0' + (date.getDate() + 1) : date.getDate() + 1) + ' ';
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