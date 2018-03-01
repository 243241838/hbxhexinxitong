<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span>代理ID:</span>
            <el-input v-model="listQuery.params.salesamanId" placeholder="代理ID" style="width:200px;margin-right: 50px;"></el-input>
            <span>代理账号:</span>
            <el-input v-model="listQuery.params.salesamanUser" placeholder="代理账号" style="width:200px;margin-right: 50px;"></el-input>
            <span>代理人名称:</span>
            <el-input v-model="listQuery.params.salesamanName" placeholder="代理人名称" style="width:200px;margin-right: 50px;"></el-input>
        </div>
        <div class="filter-container">
            <span>注册渠道:</span>
            <el-select clearable style="width:200px" class="filter-item" v-model="listQuery.params.domainId" placeholder="注册渠道">
                <el-option v-for="item in domainStatus" :key="item.code" :label="item.domainName" :value="item.domainId">
                </el-option>
            </el-select>
            <span>代理人状态:</span>
            <el-select clearable style="width:200px" class="filter-item" v-model="listQuery.params.salesamanSts" placeholder="代理人状态">
                <el-option v-for="item in creditApplyStatus" :key="item.code" :label="item.text" :value="item.code">
                </el-option>
            </el-select>
            <el-button class="filter-item" style="margin-left: 50px;" @click="reset" type="primary" icon="setting">重置</el-button>
            <el-button class="filter-item" style="margin-left: 50px;" type="primary" v-waves icon="search" @click="getApplyList">查询</el-button>
        </div>
        <div class="filter-container">
            <el-button class="filter-item" type="primary" v-waves icon="plus" @click="dialogVisible = true">新增</el-button>
        </div>
        <div class="filter-container">
            <el-table :data="dataList" v-loading="listLoading" border fit highlight-current-row style="width: 100%" @current-change="handleCurrentChange">
                <el-table-column align="center" label="序号" width="100">
                    <template scope="scope">
                        <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="代理ID">
                    <template scope="scope">
                        {{scope.row.salesamanId}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="代理账号">
                    <template scope="scope">
                        {{scope.row.salesamanUser}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="代理人名称">
                    <template scope="scope">
                        {{scope.row.salesamanName}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="代理所属渠道">
                    <template scope="scope">
                        <span>{{scope.row.domainId}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="代理账户生成时间 ">
                    <template scope="scope">
                        <span>{{scope.row.createTime | timeFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="代理人状态">
                    <template scope="scope">
                        <span>{{scope.row.salesamanSts | salesamanStsFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template scope="scope">
                        <el-button @click="Edit(scope.row.salesamanId,scope.row.salesamanUser,scope.row.salesamanName,scope.row.domainId,scope.row.salesamanSts)" type="text" size="small">
                            编辑
                        </el-button>
                        <el-button @click="Delete(scope.row.salesamanId)" type="text" size="small">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="total" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="listQuery.params.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.params.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="15%">
            <el-form>
                <el-form-item label="代理ID:" label-width="120">
                    <el-input v-model="listQuery.params.salesamanId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="代理账号:" label-width="120">
                    <el-input v-model="listQuery.params.salesamanUser" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="代理人名称:" label-width="120">
                    <el-input v-model="listQuery.params.salesamanName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="注册渠道:" label-width="120">
                    <el-select clearable style="width:200px" class="filter-item" v-model="listQuery.params.domainId" placeholder="注册渠道">
                        <el-option v-for="item in domainStatus" :key="item.code" :label="item.domainName" :value="item.domainId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="代理人状态:" label-width="120">
                    <el-select clearable style="width:200px" class="filter-item" v-model="listQuery.params.salesamanSts" placeholder="代理人状态">
                        <el-option v-for="item in creditApplyStatus" :key="item.code" :label="item.text" :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="Add()">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="dialogVisible1" width="15%">
            <el-form :model="dialog1Date" :rules="rules" ref="dialog1Date" >
                <el-form-item label="代理ID:" label-width="120" required>
                    <span>{{dialog1Date.salesamanId}}</span>
                </el-form-item>
                <el-form-item label="代理账号:" label-width="120" required>
                    <span>{{dialog1Date.salesamanUser}}</span>
                </el-form-item>
                <el-form-item label="代理人名称:" label-width="120"  required>
                    <!-- prop="salesamanName" -->
                    <el-input v-model="dialog1Date.salesamanName" auto-complete="off" max="100"></el-input>
                </el-form-item>
                <el-form-item label="注册渠道:" label-width="120" required>
                    <el-select clearable style="width:200px" class="filter-item" v-model="dialog1Date.domainId" placeholder="注册渠道">
                        <el-option v-for="item in domainStatus" :key="item.code" :label="item.domainName" :value="item.domainId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="代理人状态:" label-width="120" required>
                    <el-select clearable style="width:200px" class="filter-item" v-model="dialog1Date.salesamanSts" placeholder="代理人状态">
                        <el-option v-for="item in creditApplyStatus1" :key="item.code" :label="item.text" :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="compile()">确 定</el-button>
            </div>
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
            listQuery: { params: { url: 'agent/getSalesManInfo', page: 1, size: 10, salesamanId: '', salesamanUser: '', salesamanName: '', salesamanSts: '', domainId: '' } },
            current: 1, // 默认显示第一页
            total: 0,
            domainStatus: '', //注册渠道下拉框
            creditApplyStatus: [{ code: 10, text: '正常' }, { code: -10, text: '禁用' }, { code: -11, text: '后台冻结' }, { code: -12, text: '密码错冻结' }, { code: -13, text: '登录异常冻结' }],//代理人状态下拉框
            creditApplyStatus1: [{ code: 10, text: '正常' }, { code: -10, text: '禁用' }, { code: -11, text: '后台冻结' }, { code: -12, text: '密码错冻结' }, { code: -13, text: '登录异常冻结' }],//代理人状态下拉框
            dataList: [],
            dialogVisible: false,
            dialogVisible1: false, //编辑提示框,
            dialog1Date:{salesamanName: ''}

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
        rules: {
          salesamanName: [
            { required: true, message: '请输入代理人名称', trigger: 'blur' }
          ]
        },
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
        //重置
        reset() {
            this.listQuery.params.salesamanId = "";
            this.listQuery.params.salesamanUser = "";
            this.listQuery.params.salesamanName = "";
            this.listQuery.params.domainId = "";
            this.listQuery.params.salesamanSts = "";
        },
        //新增
         Add() {
            let obj = {
                url: 'agent/addSalesmanInfo',
                salesamanId: this.listQuery.params.salesamanId,
                salesamanUser: this.listQuery.params.salesamanUser,
                salesamanName: this.listQuery.params.salesamanName,
                salesamanSts: this.listQuery.params.salesamanSts,
                domainId: this.listQuery.params.domainId
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.$message({
                        message: response.respMsg,
                        type: 'success'
                    });
                    this.getApplyList();
                    this.reset();
                    this.dialogVisible = false;
                } else {
                    this.$message({
                        message: response.respMsg,
                        type: 'warning'
                    });
                    this.dialogVisible = false;
                }
            }).catch(err => {

            })
        },
        //编辑按钮
        Edit(val,val1,val2,val3,val4) {
            this.dialogVisible1 = true;
            this.dialog1Date.salesamanId = val;
            this.dialog1Date.salesamanUser = val1;
            this.dialog1Date.salesamanName = val2;
            this.dialog1Date.domainId = val3;
            this.dialog1Date.salesamanSts = val4;
            this.dialog1Date.creditApplyStatus = this.creditApplyStatus;
        },
        //编辑
        compile() {
            let obj = {
                url: 'agent/updateSalesmanInfos',
                salesamanId: this.dialog1Date.salesamanId,
                salesamanUser: this.dialog1Date.salesamanUser,
                salesamanName: this.dialog1Date.salesamanName,
                salesamanSts: this.dialog1Date.salesamanSts,
                domainId: this.dialog1Date.domainId
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.$message({
                        message: response.respMsg,
                        type: 'success'
                    });
                    this.getApplyList();
                    this.reset();
                    this.dialogVisible1 = false;
                } else {
                    this.$message({
                        message: response.respMsg,
                        type: 'warning'
                    });
                    this.dialogVisible1 = false;
                }
            }).catch(err => {

            })
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
                    this.dataList = response.data.salesmanList;
                }
            }).catch(err => {
                this.listLoading = true;
                this.dataList = null;
            })
        },
        /*删除*/
        Delete(val) {
            console.log(11111)
            let obj = {
                url: 'agent/deleteBySalesamanId',
                salesamanId: val
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
        }
    },
    filters: {
        //代理人状态"10":正常 ; "-10":禁用 ; "-11":后台冻结 ; "-12":密码错冻结 ; "-13":登录异常冻结
        salesamanStsFilter(value) {
            if (value === 10) {
                return '正常';
            } else if (value === -10) {
                return '禁用';
            } else if (value === -11) {
                return '后台冻结';
            } else if (value === -12) {
                return '密码错冻结';
            } else if (value === -13) {
                return '登录异常冻结';
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