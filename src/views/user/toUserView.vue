<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span>用户ID:</span>
            <el-input v-model="listQuery.params.userId" placeholder="用户ID" style="width:200px;margin-right: 50px;"></el-input>
            <span>用户名:</span>
            <el-input v-model="listQuery.params.username" placeholder="用户名" style="width:200px;margin-right: 50px;"></el-input>
            <span>用户昵称:</span>
            <el-input v-model="listQuery.params.userNickName" placeholder="用户昵称" style="width:200px;margin-right: 50px;"></el-input>
            <span>注册时间:</span>
            <el-date-picker v-model="pickTimeStart" type="date" placeholder="起始时间" :editable="false" @change="dateChange">
            </el-date-picker>至
            <el-date-picker v-model="pickTimeEnd" type="date" placeholder="结束时间" :editable="false" @change="dateChange">
            </el-date-picker>
        </div>
        <div class="filter-container">
            <span>姓名:</span>
            <el-input v-model="listQuery.params.realName" placeholder="姓名" style="width:200px;margin-right: 50px;"></el-input>
            <span>手机号码:</span>
            <el-input v-model="listQuery.params.username" placeholder="手机号码" style="width:200px;margin-right: 50px;"></el-input>
            <span>等级:</span>
            <el-select clearable style="width:200px" class="filter-item" v-model="listQuery.params.userLevel" placeholder="等级">
                <el-option v-for="item in userLevelStatus" :key="item.code" :label="item.text" :value="item.code">
                </el-option>
            </el-select>
            <span>注册渠道:</span>
            <el-select clearable style="width:200px" class="filter-item" v-model="listQuery.params.domainCode" placeholder="注册渠道">
                <el-option v-for="item in domainStatus" :key="item.domainId" :label="item.domainName" :value="item.domainId">
                </el-option>
            </el-select>
            <span>用户状态:</span>
            <el-select clearable style="width:200px" class="filter-item" v-model="listQuery.params.status" placeholder="用户状态">
                <el-option v-for="item in creditApplyStatus" :key="item.code" :label="item.text" :value="item.code">
                </el-option>
            </el-select>
        </div>
        <div class="filter-container">
            <el-button class="filter-item" style="margin-left: 50px;" @click="newAdd" type="primary" icon="plus">新增</el-button>
            <el-button class="filter-item" style="margin-left: 50px;" @click="reset" type="primary" icon="setting">重置</el-button>
            <el-button class="filter-item" style="margin-left: 50px;" type="primary" v-waves icon="search" @click="getApplyList">查询</el-button>
        </div>
        <div class="filter-container" style="width:1665px;overflow:hidden;" >
            <el-table :data="dataList" v-loading="listLoading" border fit highlight-current-row style="width: 100%" @current-change="handleCurrentChange">
                <el-table-column align="center" label="序号" width="100">
                    <template scope="scope">
                        <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作项">
                    <template scope="scope">
                        <el-button @click="goUserInfoEdit(scope.row.userId)" type="text" size="small">
                            [编辑]
                        </el-button>
                        <el-button @click="forbid(scope.row.userId,scope.row.status)" type="text" size="small" v-if="scope.row.status===0">
                            [禁用]
                        </el-button>
                        <el-button @click="forbid(scope.row.userId,scope.row.status)" type="text" size="small" v-if="scope.row.status===-1||scope.row.status===-2">
                            [恢复]
                        </el-button>
                        <el-button @click="initialize(scope.row.userId)" type="text" size="small">
                            [初始化密码]
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="用户ID">
                    <template scope="scope">
                        <el-button @click="gocustomerDetail(scope.row.userId)" type="text" size="small">
                            {{scope.row.userId}}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="用户名">
                    <template scope="scope">
                        {{scope.row.username}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="用户昵称">
                    <template scope="scope">
                        <span>{{scope.row.userNickName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="等级">
                    <template scope="scope">
                        {{scope.row.userLevel | userLevelFilter}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="注册渠道">
                    <template scope="scope">
                        <span>{{scope.row.domainName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="注册时间">
                    <template scope="scope">
                        <span>{{scope.row.createTime | timeFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="最后登录时间">
                    <template scope="scope">
                        <span>{{scope.row.lastLoginTime | timeFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="姓名">
                    <template scope="scope">
                        <span>{{scope.row.realName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="手机">
                    <template scope="scope">
                        <span>{{scope.row.mobile}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="性别">
                    <template scope="scope">
                        <span>{{scope.row.userGender | sexFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="用户状态">
                    <template scope="scope">
                        <span>{{scope.row.status | statusFilter}}</span>
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
            listQuery: { params: { url: 'user/findUserMsg', page: 1, size: 10, userId: null, username: '', userNickName: '', createTimeStart: '', createTimeEnd: '', realName: '', mobile: '', userLevel: '', domainCode: '', status: '' } },
            total: 0,
            dataList: [],//列表渲染数据 
            creditApplyStatus: [{ code: 0, text: '正常' }, { code: -1, text: '注销' }, { code: -2, text: '冻结' }],//用户状态下拉框
            userLevelStatus: [{ code: 10, text: 'C端' }, { code: 20, text: 'B端' }, { code: 11, text: '业务人员' }],//等级下拉框
            domainStatus: [],
            dialogVisible: false
        }
    },
    computed: {
    },
    created() {
        this.getApplyList();
        this.getList();
    },
    mounted() {

    },
    methods: {
        /*时间选择器默认事件*/
        dateChange() {
            if (this.pickTimeStart === "") {
                this.listQuery.params.createTimeStart = "";
            } else {
                this.listQuery.params.createTimeStart = parseTime(this.pickTimeStart, '{y}-{m}-{d}');
            }
            if (this.pickTimeEnd === "") {
                this.listQuery.params.createTimeEnd = "";
            } else {
                this.listQuery.params.createTimeEnd = parseTime(this.pickTimeEnd, '{y}-{m}-{d}');
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
        //渠道下拉框菜单
        getList() {
            let obj = {
                url: 'channel/menuList'
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.domainStatus = response.data.domainsPoList;
                } else {

                }
            }).catch(err => {

            })
        },
        //重置userId: '',username: '',userNickName: '',createTimeStart: '',createTimeEnd: '',realName: '',mobile: '',userLevel: '',domainCode: '',status: ''
        reset() {
            this.listQuery.params.username = "";
            this.listQuery.params.createTimeStart = "";
            this.listQuery.params.createTimeEnd = "";
            this.listQuery.params.userNickName = "";
            this.listQuery.params.realName = "";
            this.listQuery.params.userId = "";
            this.listQuery.params.mobile = "";
            this.listQuery.params.userLevel = "";
            this.listQuery.params.domainCode = "";
            this.listQuery.params.status = "";
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
                    this.dataList = response.data.userList;
                }

            }).catch(err => {
                this.listLoading = true;
                this.dataList = null;
            })
        },
        /*初始化密码*/
        initialize(val) {
            let obj = {
                url: '/user/resetPassword',
                userId: val
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.$message({
                        message: response.respMsg,
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: response.respMsg,
                        type: 'warning'
                    });
                }
            }).catch(err => {

            })
        },
        //禁用,恢复
        forbid(val, val1) {
            if (val1 === -1 || val1 === -2) {
                val1 = 1;
            }
            let obj = {
                url: 'user/deleteUser',
                userId: val,
                updateStatusFlag: val1
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.$message({
                        message: response.respMsg,
                        type: 'success'
                    });
                    this.getApplyList();
                } else {
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
            this.$router.push({ path: '/user/customerInfoDetails', query: { userId: val } })
        },
        //进入用户信息编辑页面
        goUserInfoEdit(val) {
            this.$router.push({ path: '/user/userInfoEdit', query: { userId: val } })
        },
        //进入用户新增页面
        newAdd() {
            this.$router.push({ path: '/user/newAddUser' })
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
                return '正常';
            } else if (value === -1) {
                return '注销';
            } else if (value === -2) {
                return '冻结';
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