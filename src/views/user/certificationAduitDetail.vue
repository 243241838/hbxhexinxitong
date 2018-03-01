<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <h3 class="title">账户信息</h3>
            <el-form v-if="AuditInfo.commonUserPo">
                <el-form-item label="用户ID:" label-width="220" required>
                    {{AuditInfo.commonUserPo.userId}}
                </el-form-item>
                <el-form-item label="用户名:" label-width="220" required>
                    {{AuditInfo.commonUserPo.username}}
                </el-form-item>
                <el-form-item label="等级:" label-width="220" required>
                    {{AuditInfo.commonUserPo.userLevel}}
                </el-form-item>
                <el-form-item label="注册渠道:" label-width="220" required>
                    {{AuditInfo.commonUserPo.domainName}}
                </el-form-item>
                <el-form-item label="注册时间:" label-width="220" required>
                    {{AuditInfo.commonUserPo.createTime | timeFilter}}
                </el-form-item>
                <el-form-item label="最后登陆时间:" label-width="220" required>
                    {{AuditInfo.commonUserPo.lastLoginTime | timeFilter}}
                </el-form-item>
            </el-form>
            <el-form v-else>
                <el-form-item label="用户ID:" label-width="220" required>
                </el-form-item>
                <el-form-item label="用户名:" label-width="220" required>
                </el-form-item>
                <el-form-item label="等级:" label-width="220" required>
                </el-form-item>
                <el-form-item label="注册渠道:" label-width="220" required>
                </el-form-item>
                <el-form-item label="注册时间:" label-width="220" required>
                </el-form-item>
                <el-form-item label="最后登陆时间:" label-width="220" required>
                </el-form-item>
            </el-form>
        </div>
        <div class="filter-container">
            <h3 class="title">实名认证信息</h3>
            <el-form v-if="AuditInfo.auditData">
                <el-form-item label="实名认证状态:" label-width="220" required>
                    {{AuditInfo.commonUserPo.realNameStatus | realNameStatusFilter}}
                </el-form-item>
                <el-form-item label="证件类型:" label-width="220" required>
                    {{AuditInfo.auditData.idType | idTypeFilter}}
                </el-form-item>
                <el-form-item label="姓名:" label-width="220" required>
                    {{AuditInfo.auditData.realName}}
                </el-form-item>
                <el-form-item label="证件号码:" label-width="220" required>
                    {{AuditInfo.auditData.idNo}}
                </el-form-item>
                <el-form-item label="证件图片:" label-width="220" required>
                    <img :src="AuditInfo.auditData.idCard_B" alt="" width="320" height="200">
                    <img :src="AuditInfo.auditData.idCard_F" alt="" width="320" height="200">
                </el-form-item>
            </el-form>
            <el-form v-else>
                <el-form-item label="实名认证状态:" label-width="220" required>
                </el-form-item>
                <el-form-item label="证件类型:" label-width="220" required>
                </el-form-item>
                <el-form-item label="姓名:" label-width="220" required>
                </el-form-item>
                <el-form-item label="证件号码:" label-width="220" required>
                </el-form-item>
                <el-form-item label="证件图片:" label-width="220" required>
                </el-form-item>
            </el-form>
        </div>
        <div class="filter-container">
            <h3 class="title">审核信息</h3>
            <el-table :data="dataList" v-loading="listLoading" border fit highlight-current-row style="width: 100%" @current-change="handleCurrentChange">
                <el-table-column align="center" label="序号" width="100">
                    <template scope="scope">
                        <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="审核结果">
                    <template scope="scope">
                        {{scope.row.auditSts | auditStsFilter}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="审核不通过原因">
                    <template scope="scope">
                        {{scope.row.auditComment}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="审核员">
                    <template scope="scope">
                        {{scope.row.auditNickname}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="审核时间">
                    <template scope="scope">
                        <span>{{scope.row.auditTime | timeFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作员">
                    <template scope="scope">
                        <span>{{scope.row.reqNickname | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="提交时间">
                    <template scope="scope">
                        <span>{{scope.row.reqTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="filter-container" v-show="isShow == 0">
            <h3 class="title">审核信息</h3>
            <el-radio-group v-model="aduitPriceList1.params.auditSts">
                <el-radio :label="1">审核通过</el-radio>
                <el-radio :label="-1">审核不通过</el-radio>
            </el-radio-group>
            <div class="filter-container" v-if="aduitPriceList1.params.auditSts === -1">
                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="aduitPriceList1.params.auditComment" style="width:500px;">
                </el-input>
            </div>
        </div>
        <div class="filter-container" style="height:100px;line-height:100px;" v-show="isShow == 0">
            <el-button type="primary" @click="allSave">保存</el-button>
        </div>
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
            listQuery: { params: { url: 'audit/findCertificationAuditLog', page: 1, size: 10, bizId: this.$route.query.bizId } },
            current: 1, // 默认显示第一页
            total: 0,
            dataList: [],
            creditApplyStatus: [{ code: -10, text: '已拒绝', tag: 'danger' }, { code: 10, text: '已审批', tag: 'success' }, { code: 1, text: '待审批', tag: 'wanner' }, { code: 0, text: '资料完善中', tag: 'wanner' }],
            dialogVisible: false,
            AuditInfoList: { params: { url: 'audit/findAuditInfo', auditId: this.$route.query.auditId } },
            AuditInfo: {},
            aduitPriceList1: { params: { url: 'audit/auditPrice', auditId: this.$route.query.auditId, auditComment: '', auditSts: '' } },
            isShow: this.$route.query.auditSts //是否显示提交审核
            //aduitPriceList: { params: { url: 'aduit/aduitPrice', auditId: this.$route.query.auditId, auditComment: '', auditSts: '', idNo: this.AuditInfo.auditData.idNo, idType: this.AuditInfo.auditData.idType, realName: this.AuditInfo.auditData.realName, userId: this.AuditInfo.commonUserPo.userId } },//提交审核意见
        }
    },
    computed: {
    },
    created() {
        this.getApplyList();
        this.getInfoList();
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
                    this.dataList = response.data.auditLogsList;
                    console.log(this.dataList);
                }

            }).catch(err => {
                this.listLoading = true;
                this.dataList = null;
            })
        },
        //获取实名认证审核详情
        getInfoList() {
            config(this.AuditInfoList.params).then(response => {
                if (response.respCode === '000000') {
                    this.AuditInfo = response.data;
                } else {

                }
            }).catch(err => {
                this.listLoading = true;
                this.dataList = null;
            })
        },
        //提交审核意见
        allSave() {
            let obj = {
                url: 'audit/auditPrice',
                auditId: this.$route.query.auditId,
                auditComment: this.aduitPriceList1.params.auditComment,
                auditSts: this.aduitPriceList1.params.auditSts,
                idNo: this.AuditInfo.auditData.idNo,
                idType: this.AuditInfo.auditData.idType,
                realName: this.AuditInfo.auditData.realName,
                userId: this.AuditInfo.commonUserPo.userId,//提交审核意见
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.$message({
                        message: response.respMsg,
                        type: 'success'
                    });
                    this.getInfoList();
                    this.getApplyList();
                } else {
                    this.$message.error(response.respMsg);
                }
            }).catch(err => {

            })
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
        realNameStatusFilter(value) {
            if (value === 0) {
                return '未认证';
            } else if (value === 1) {
                return '认证成功';
            } else if (value === -1) {
                return '认证失败';
            } else {
                return value;
            }
        },
        //审核结果  0：待审核；-1：驳回；1：审核通过；
        auditStsFilter(value) {
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
        //证件类型过滤
        idTypeFilter(){
            if (value === 1) {
                return '身份证';
            } else if (value === 2) {
                return '军官证';
            } else if (value === 3) {
                return '护照';
            } else if (value === 4) {
                return '驾驶证';
            } else if (value === 5) {
                return '港澳台通行证';
            } else if (value === 6) {
                return '回乡证';
            } else {
                return value;
            }
        },    
        //时间过滤
        timeFilter(val) {
            var date = new Date(val);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = (date.getDate() < 10 ? '0' + (date.getDate() + 1) : date.getDate() + 1) + ' ';
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
    padding-bottom:20px;
}

.app-container .filter-container {
    margin-top: 20px;
}

.app-container .filter-container .rightData {
    margin-right: 100px;
}

.app-container .filter-container .title {
    margin-left: 18px;
    height: 43px;
    line-height: 43px;
    font-size: 14px;
    color: #3498da;
    font-weight: bold;
    border-bottom: 1px solid #e4e9eb;
}
</style>