<template>
    <div class="app-container calendar-list-container">
        <el-tabs v-model="tabsName" type="card" @tab-click="handleClick">
            <el-tab-pane label="用户信息" name="first">
                <div class="filter-container">
                    <h3 class="title">账号信息</h3>
                    <el-row>
                        <el-col :span="10" :offset="1">
                            <div class="filter-container">
                                <el-form label-width="150px" class="credit-aplly-form">
                                    <el-form-item label="用户名ID:" required>
                                        {{userInfoData.user.userId}}
                                    </el-form-item>
                                    <el-form-item label="用户名:" required>
                                        {{userInfoData.user.username}}
                                    </el-form-item>
                                    <el-form-item label="等级:" required>
                                        {{userInfoData.userExtends.userLevel | userLevelFilter}}
                                    </el-form-item>
                                    <el-form-item label="注册渠道:" required>
                                        {{userInfoData.user.domainName}}
                                    </el-form-item>
                                    <el-form-item label="注册时间:" required>
                                        <span>{{userInfoData.user.createTime | timeFilter}}</span>
                                    </el-form-item>
                                    <el-form-item label="最后登录时间:" required>
                                        <span>{{userInfoData.user.lastLoginTime | timeFilter}}</span>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <div class="filter-container">
                                <el-form label-width="100px" class="credit-aplly-form">
                                    <el-form-item label="用户头像:" required>
                                        <img :src="userInfoData.userExtends.userLogo" alt="" v-if="userInfoData.userExtends.userLogo" width="120" height="120">
                                        <span v-else>暂无图片</span>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="filter-container">
                    <h3 class="title">个人信息</h3>
                    <div class="filter-container">
                        <el-form label-width="150px" class="credit-aplly-form">
                            <el-form-item label="姓名:" required>
                                {{userInfoData.user.realName}}
                            </el-form-item>
                            <el-form-item label="性别:" required>
                                {{userInfoData.userExtends.userGender | sexFilter}}
                            </el-form-item>
                            <el-form-item label="生日:" required>
                                {{userInfoData.userExtends.userBirthday}}
                            </el-form-item>
                            <el-form-item label="邮箱:" required>
                                <span>{{userInfoData.user.email}}</span>
                            </el-form-item>
                            <el-form-item label="地址:" required>
                                <span>{{userInfoData.userAddressList.insurantAddress}}</span>
                            </el-form-item>
                            <el-form-item label="实名认证状态:" required>
                                {{userInfoData.user.realNameStatus | realNameStatusFilter}}
                            </el-form-item>
                            <el-form-item label="证件类型:" required>
                                {{userInfoData.userExtends.idenType}}
                            </el-form-item>
                            <el-form-item label="证件号码:" required>
                                {{userInfoData.userExtends.idenNo}}
                            </el-form-item>
                            <el-form-item label="身份证正面照:" required>
                                <img :src="userInfoData.userExtends.idenImg1" alt="" v-if="userInfoData.userExtends.idenImg1" width="120" height="120">
                                <span v-else>暂无图片</span>
                            </el-form-item>
                            <el-form-item label="身份证反面照:" required>
                                <img :src="userInfoData.userExtends.idenImg2" alt="" v-if="userInfoData.userExtends.idenImg2" width="120" height="120">
                                <span v-else>暂无图片</span>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="资产信息" name="second">
                <div class="filter-container">
                    <h3 class="title">账户信息</h3>
                    <el-row>
                        <el-col :span="10" :offset="1">
                            <div class="filter-container">
                                <el-form label-width="150px" class="credit-aplly-form">
                                    <el-form-item label="用户ID:" required>
                                        <span>{{userAccounts.userId}}</span>
                                    </el-form-item>
                                    <el-form-item label="用户名:" required>
                                        <span>{{userAccounts.username}}</span>
                                    </el-form-item>
                                    <el-form-item label="姓名:" required>
                                        <span>{{userAccounts.realName}}</span>
                                    </el-form-item>
                                    <el-form-item label="认证情况:" required>
                                        <span>{{userAccounts.realNameStatus}}</span>
                                    </el-form-item>
                                    <el-form-item label="注册时间:" required>
                                        <span>{{userAccounts.createTime | timeFilter}}</span>
                                    </el-form-item>
                                    <el-form-item label="最后登录时间:" required>
                                        <span>{{userAccounts.lastLoginTime | timeFilter}}</span>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <div class="filter-container">
                                <el-form label-width="100px" class="credit-aplly-form">
                                    <el-form-item label="总收入:" required>
                                        <span>{{userAccounts.acctSum}}</span>
                                    </el-form-item>
                                    <el-form-item label="可提现:" required>
                                        <span>{{userAccounts.acctBalance}}</span>
                                    </el-form-item>
                                    <el-form-item label="红包:" required>
                                        <span>{{userAccounts.couponCounts}}</span>
                                    </el-form-item>
                                    <el-form-item label="积分:" required>
                                        <span>{{userAccounts.integral}}</span>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="filter-container">
                    <h3 class="title">提现银行信息</h3>
                    <el-form label-width="200px" class="credit-aplly-form" v-if="userBankCards">
                        <el-form-item label="提现账户银行名称:" required>
                            <span>{{userBankCards.bankName}}</span>
                        </el-form-item>
                        <el-form-item label="提现账户户名:" required>
                            <span>{{userBankCards.accountName}}</span>
                        </el-form-item>
                        <el-form-item label="提现账户账号:" required>
                            <span>{{userBankCards.cardNo}}</span>
                        </el-form-item>
                        <el-form-item label="身份证号:" required>
                            <span>{{userBankCards.idenNo}}</span>
                        </el-form-item>
                    </el-form>
                    <el-form label-width="200px" class="credit-aplly-form" v-else>
                        <el-form-item label="提现账户银行名称:" required>
                        </el-form-item>
                        <el-form-item label="提现账户户名:" required>
                        </el-form-item>
                        <el-form-item label="提现账户账号:" required>
                        </el-form-item>
                        <el-form-item label="身份证号:" required>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="订单信息" name="third">
                <div class="filter-container">
                    <span>查询日期:</span>
                    <el-date-picker v-model="pickTimeStart" type="date" placeholder="起始时间" :editable="false" @change="dateChange">
                    </el-date-picker>至
                    <el-date-picker v-model="pickTimeEnd" type="date" placeholder="结束时间" :editable="false" @change="dateChange">
                    </el-date-picker>
                    <span>订单号:</span>
                    <el-input v-model="listQuery.params.tradeId" placeholder="订单号" style="width:200px;margin-right: 50px;"></el-input>
                    <span>交易金额:</span>
                    <el-select clearable style="width:150px" class="filter-item" v-model="listQuery.params.selectAmount" placeholder="交易金额">
                        <el-option v-for="item in selectAmountStatus" :key="item.code" :label="item.text" :value="item.code">
                        </el-option>
                    </el-select>
                </div>
                <div class="filter-container">
                    <span>订单状态:</span>
                    <el-select clearable style="width:150px" class="filter-item" v-model="listQuery.params.orderSts" placeholder="订单状态">
                        <el-option v-for="item in tradeSts" :key="item.sts" :label="item.text" :value="item.sts">
                        </el-option>
                    </el-select>
                    <span>分销渠道:</span>
                    <el-select clearable style="width:150px" class="filter-item" v-model="listQuery.params.domainId" placeholder="分销渠道">
                        <el-option v-for="item in domainStatus" :key="item.code" :label="item.text" :value="item.code">
                        </el-option>
                    </el-select>
                    <span>保险名称:</span>
                    <el-input v-model="listQuery.params.productName" placeholder="保险名称" style="width:200px;margin-right: 50px;"></el-input>
                    <span>代理人:</span>
                    <el-input v-model="listQuery.params.tradeAgent" placeholder="代理人" style="width:200px;margin-right: 50px;"></el-input>
                    <el-button class="filter-item" style="margin-left: 50px;" @click="reset" type="primary" icon="reset">重置</el-button>
                    <el-button class="filter-item" style="margin-left: 50px;" type="primary" v-waves icon="search" @click="findOrderList">查询</el-button>
                </div>
                <div class="filter-container">
                    <el-table :data="orderList"  border fit highlight-current-row style="width: 100%" @current-change="handleCurrentChange">
                        <el-table-column align="center" label="序号" width="100">
                            <template scope="scope">
                                <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="订单号">
                            <template scope="scope">
                                 <el-button class="filter-item" style="margin-left: 50px;" @click="goOrder(scope.row.tradeId)" type="text">{{scope.row.tradeId}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="保险名称">
                            <template scope="scope">
                                {{scope.row.productName}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="分销渠道">
                            <template scope="scope">
                                {{scope.row.domainName}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="投保时间">
                            <template scope="scope">
                                <span>{{scope.row.tradeDate | timeFilter}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="投保人姓名">
                            <template scope="scope">
                                <span>{{scope.row.policyholderName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="投保人手机号码">
                            <template scope="scope">
                                <span>{{scope.row.mobile}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="交易金额(元)">
                            <template scope="scope">
                                <span>{{scope.row.payAmount}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="订单状态">
                            <template scope="scope">
                                <span>{{scope.row.tradeSts | tradeStsFilter}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="代理人">
                            <template scope="scope">
                                <span>{{scope.row.tradeAgent}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div v-show="orderList" class="pagination-container">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="listQuery.params.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.params.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import '@res/css/wjq/style.less';
import config from '@api/config';
import { parseTime } from '@filters/index.js';
export default {
    data() {
        return {
            tabsName: 'first',
            dataList: [],
            imageUrl: require('@res/img/background.jpg'),
            loading: true,
            total: null,
            pickTimeStart: '',
            pickTimeEnd: '',
            userInfoList: { params: { url: 'user/userDetail', userId: this.$route.query.userId } },
            selectAmountStatus: [{ code: 1, text: '0-1元' }, { code: 2, text: '1-10元' }, { code: 3, text: '10-50元' }, { code: 4, text: '50-100元' }, { code: 5, text: '100元及以上' }, { code: 10, text: '自定义' }],//用户状态下拉框
            userLevelStatus: [{ code: 10, text: 'C端' }, { code: 20, text: 'B端' }, { code: 11, text: '业务人员' }],//等级下拉框
            userInfoData: {},
            userId: null,
            domainStatus: '',//注册渠道下拉框
            sexStatus: [{ code: -1, text: '认证失败' }, { code: 1, text: '认证成功' }, { code: 0, text: '未认证' }],
            realNameStatus: [{ code: -1, text: '认证失败' }, { code: 1, text: '认证成功' }, { code: 0, text: '未认证' }],//实名认证状态
            idenTypeStatus: [{ code: 1, text: '身份证' }, { code: 2, text: '军官证' }, { code: 3, text: '护照' }, { code: 4, text: '驾驶证' }, { code: 5, text: '港澳台通行证' }, { code: 6, text: '回乡证' }],
            userAccounts: {},  //资产信息,
            listQuery: { params: { url: 'ordermanager/findOrderList', page: 1, size: 10, tradeId: '', selectAmount: '', orderSts: '', domainId: '', productName: '', tradeAgent: '', beginDate: '', endDate: '', userId: '' } },
            orderList: [], //订单列表
            userBankCards:{},
            tradeSts: [ //订单状态
                {sts: '', text: '全部'},
                {sts: 10, text: '已下单（待支付）'},
                {sts: -10, text: '订单取消'},
                {sts: -11, text: '订单已失效'},
                {sts: -12, text: '订单关闭；'},
                {sts: -13, text: '订单已删除'},
                {sts: 18, text: '已支付待激活'},
                {sts: 20, text: '已支付待发货'},
                {sts: 21, text: '支付不足'},
                {sts: 22, text: '支付超额；'},
                {sts: -20, text: '支付超时失败'},
                {sts: -21, text: '支付不足超时失败'},
                {sts: 25, text: '已激活待审核 '},
                {sts: 30, text: '发货中'},
                {sts: 35, text: '已发货'},
                {sts: -30, text: '未知原因发货失败'},
                {sts: -31, text: '渠道余额不足发货失败'},
                {sts: -32, text: '供应商余额不足发货失败'},
                {sts: -33, text: '网络异常发货失败'},
                {sts: 40, text: '全部核销'},
                {sts: 41, text: '部分核销'},
                {sts: 50, text: '全部退款申请'},
                {sts: 51, text: '同意全部退款'},
                {sts: -51, text: '拒绝全部退款'},
                {sts: 55, text: '部分退款申请'},
                {sts: 56, text: '同意部分退款'},
                {sts: -56, text: '拒绝部分退款'}
            ]
        };
    },
    created() {
        this.handleClick();
        this.userId = this.$route.query.userId;
    },
    computed: {
    },
    methods: {
        /*时间选择器默认事件*/
        dateChange() {
            if (this.pickTimeStart === "") {
                this.listQuery.params.beginDate = "";
            } else {
                this.listQuery.params.beginDate = parseTime(this.pickTimeStart, '{y}-{m}-{d}');
            }
            if (this.pickTimeEnd === "") {
                this.listQuery.params.endDate = "";
            } else {
                this.listQuery.params.endDate = parseTime(this.pickTimeEnd, '{y}-{m}-{d}');
            }
        },
        //用户信息获取 tradeId: '', selectAmount: '', orderSts: '', domainId: '', productName: '', tradeAgent: '', beginDate: '', endDate: ''
        getUserInfo() {
            config(this.userInfoList.params).then(response => {
                if (response.respCode === '000000') {
                    this.userInfoData = response.data;
                } else {

                }
            }).catch(err => {

            })
        },
        //重置
        reset() {
            this.listQuery.params.tradeId = "";
            this.listQuery.params.selectAmount = "";
            this.listQuery.params.orderSts = "";
            this.listQuery.params.domainId = "";
            this.listQuery.params.productName = "";
            this.listQuery.params.tradeAgent = "";
            this.listQuery.params.beginDate = "";
            this.listQuery.params.endDate = "";
        },
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
        //资产信息获取
        getAccountDetail() {
            let obj = {
                url: 'user/accountDetail',
                userId: this.userId
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.userAccounts = response.data.userAccounts;
                    this.userBankCards = response.data.userBankCards;

                } else {

                }
            }).catch(err => {

            })
        },
        //订单信息查询
        findOrderList() {
            this.listQuery.params.userId = this.userId;
            config(this.listQuery.params).then(response => {
                if (response.respCode === '000000') {
                    this.orderList = response.data.orderInfoRecordList;
                    this.total = response.data.total;
                } else {

                }
            }).catch(err => {

            })
        },
        //前往订单详情页
        goOrder(val) {
            this.$router.push({ path: '/dealManage/orderDetail', query: { tradeId: val } });
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        // 改变每一页的条数
        handleSizeChange(val) {
            this.listQuery.params.size = val;
            this.findOrderList();
        },
        // 切换页码
        handleCurrentPageChange(val) {
            this.listQuery.params.page = val;
            this.findOrderList();
        },
        //tab切换事件
        handleClick() {
            if (this.tabsName == 'first') {
                this.getUserInfo();
            }
            if (this.tabsName == 'second') {
                this.getAccountDetail();
            }
            if (this.tabsName == 'third') {
                this.findOrderList();
                this.getList();
            }
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
        //实名认证状态
        realNameStatusFilter(value) {
            if (value === 0) {
                return '未认证';
            } else if (value === -1) {
                return '认证失败';
            } else if (value === 1) {
                return '认证成功';
            } else {
                return value;
            }
        },
        tradeStsFilter(value) {
            if (value === '') {
                return '全部';
            } else if (value === 10) {
                return '已下单（待支付）';
            } else if (value === -11) {
                return '订单已失效';
            } else if (value === -12) {
                return '订单关闭';
            } else if (value === -13) {
                return '订单已删除';
            } else if (value === 18) {
                return '已支付待激活';
            } else if (value === 20) {
                return '已支付待发货';
            } else if (value === 21) {
                return '支付不足';
            } else if (value === 22) {
                return '支付超额';
            } else if (value === -20) {
                return '支付超时失败';
            } else if (value === -21) {
                return '支付不足超时失败';
            } else if (value === 25) {
                return '已激活待审核';
            } else if (value === 30) {
                return '发货中';
            } else if (value === 35) {
                return '已发货';
            } else if (value === -30) {
                return '未知原因发货失败';
            } else if (value === -31) {
                return '渠道余额不足发货失败';
            } else if (value === -32) {
                return '供应商余额不足发货失败';
            } else if (value === -33) {
                return '网络异常发货失败';
            } else if (value === 40) {
                return '全部核销';
            } else if (value === 41) {
                return '部分核销';
            } else if (value === 50) {
                return '全部退款申请';
            } else if (value === 51) {
                return '同意全部退款';
            } else if (value === -51) {
                return '拒绝全部退款';
            } else if (value === 55) {
                return '部分退款申请';
            } else if (value === 56) {
                return '同意部分退款';
            } else if (value === -56) {
                return '拒绝部分退款';
            } else {
                return value;
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
            if (value === 10) {
                return 'C端';
            } else if (value === 20) {
                return 'B端';
            } else if (value === 11) {
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
    },
};
</script>
<style lang="less" scoped>
.app-container {
    margin: 10px 10px 0 10px;
}

.app-container .filter-container {
    margin-top: 20px;
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

.app-container .filter-container .rightData {
    margin-right: 100px;
}
</style>

