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
                                        <el-input v-model="userInfoData.user.userId" :disabled="true" style="width:300px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="用户名:" required>
                                        <el-input v-model="userInfoData.user.username" style="width:300px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="等级:" required>
                                        <el-select clearable style="width:300px" class="filter-item" v-model="userInfoData.user.userLevel" placeholder="等级">
                                            <el-option v-for="item in userLevelStatus" :key="item.code" :label="item.text" :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="注册渠道:" required>
                                        <el-select clearable style="width:300px" class="filter-item" v-model="userInfoData.user.domainCode" placeholder="注册渠道">
                                            <el-option v-for="item in domainStatus" :key="item.domainId+''" :label="item.domainName" :value="item.domainId+''">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="注册时间:" required>
                                        <span v-if="userInfoData.user.createTime">{{userInfoData.user.createTime | timeFilter}}</span>
                                    </el-form-item>
                                    <el-form-item label="最后登录时间:" required>
                                        <span v-if="userInfoData.user.lastLoginTime">{{userInfoData.user.lastLoginTime | timeFilter}}</span>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <div class="filter-container">
                                <el-form label-width="100px" class="credit-aplly-form">
                                    <el-form-item label="用户头像:" required>
                                        <img :src="userInfoData.userExtends.userLogo" alt="" v-if="userInfoData.userExtends.userLogo" width="120" height="120">
                                        <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:paramName="'userInfoData.userExtends.userLogo'"></uploadImg>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="filter-container">
                    <h3 class="title">个人信息</h3>
                    <el-row>
                        <el-col :span="10" :offset="1">
                            <div class="filter-container">
                                <el-form label-width="150px" class="credit-aplly-form">
                                    <el-form-item label="姓名:" required>
                                        <el-input v-model="userInfoData.user.realName" style="width:300px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="性别:" required>
                                        <el-select clearable style="width:300px" class="filter-item" v-model="userInfoData.userExtends.userGender" placeholder="性别">
                                            <el-option v-for="item in sexStatus" :key="item.code" :label="item.text" :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="生日:" required>
                                        <el-date-picker v-model="userInfoData.userExtends.userBirthday" type="date" placeholder="结束时间" :editable="false" @change="dateChange">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="邮箱:" required>
                                        <el-input v-model="userInfoData.user.email" style="width:300px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="地址:" required>
                                        <span>{{userInfoData.userAddressList.insurantAddress}}</span>
                                    </el-form-item>
                                    <el-form-item label="实名认证状态:" required>
                                        <el-select clearable style="width:300px" class="filter-item" v-model="userInfoData.user.realNameStatus" placeholder="实名认证状态">
                                            <el-option v-for="item in realNameStatus" :key="item.code" :label="item.text" :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="证件类型:" required>
                                        <el-select clearable style="width:300px" class="filter-item" v-model="userInfoData.userExtends.idenType" placeholder="证件类型">
                                            <el-option v-for="item in idenTypeStatus" :key="item.code" :label="item.text" :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="证件号码:" required>
                                        <el-input v-model="userInfoData.userExtends.idenNo" style="width:300px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="身份证正面照:" required>
                                        <img :src="userInfoData.userExtends.idenImg1" alt="" v-if="userInfoData.userExtends.idenImg1"  width="120" height="120">
                                        <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:paramName="'userInfoData.userExtends.idenImg1'"></uploadImg>
                                    </el-form-item>
                                    <el-form-item label="身份证反面照:" required>
                                        <img :src="userInfoData.userExtends.idenImg2" alt="" v-if="userInfoData.userExtends.idenImg2"  width="120" height="120">
                                        <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:paramName="'userInfoData.userExtends.idenImg2'"></uploadImg>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="filter-container">
                    <el-button @click="updateUserBtn" type="primary" size="small" style="margin-left:100px;">
                        保存
                    </el-button>
                    <el-button @click="Cancel" type="primary" size="small">
                        取消
                    </el-button>
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
                                        <span>{{userAccounts.realNameStatus | realNameStatusFilter}}</span>
                                    </el-form-item>
                                    <el-form-item label="注册时间:" required>
                                        <span v-if="userAccounts.createTime">{{userAccounts.createTime | timeFilter}}</span>
                                    </el-form-item>
                                    <el-form-item label="最后登录时间:" required>
                                        <span v-if="userAccounts.lastLoginTime">{{userAccounts.lastLoginTime | timeFilter}}</span>
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
                    <el-form label-width="400px" class="credit-aplly-form" v-if="userBankCards">
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
                    <el-form label-width="400px" class="credit-aplly-form" v-else>
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
                <div class="filter-container">
                    <span class="title">他的上级经纪人</span>
                    <el-button class="filter-item" v-waves icon="plus" @click="newAddup" style="margin-left:50px;">新增</el-button>
                    <div class="filter-container">
                        <el-table :data="upReferrerList" border fit highlight-current-row style="width: 100%" @current-change="handleCurrentChange">
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
                            <el-table-column align="center" label="姓名">
                                <template scope="scope">
                                    {{scope.row.realName}}
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="推荐收入">
                                <template scope="scope">
                                    <span>{{scope.row.commisions}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="操作">
                                <template scope="scope">
                                    <el-button @click="removeReferrer(scope.row.userId)" type="text" size="small">
                                        删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="filter-container">
                    <span class="title">他的下级客户</span>
                    <el-button class="filter-item" v-waves icon="plus" @click="newAddDown" style="margin-left:50px;">新增</el-button>
                    <div class="filter-container">
                        <el-table :data="downReferrerList" border fit highlight-current-row style="width: 100%" @current-change="handleCurrentChange">
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
                            <el-table-column align="center" label="姓名">
                                <template scope="scope">
                                    {{scope.row.realName}}
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="推荐收入">
                                <template scope="scope">
                                    <span>{{scope.row.commisions}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="操作">
                                <template scope="scope">
                                    <el-button @click="removeReferrer1(scope.row.userId)" type="text" size="small">
                                        删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <!-- 新增上级经纪人 -->
                <el-dialog title="新增上级经纪人" :visible.sync="dialogFormVisible">
                    <div class="filter-container">
                        <span>用户ID:</span>
                        <el-input v-model="updateUpReferrerQuery.params.userId" placeholder="用户ID" style="width:200px;"></el-input>
                        <el-button class="filter-item" style="margin-left: 50px;" type="primary" v-waves icon="search" @click="getUpList">查询</el-button>
                    </div>
                    <div class="filter-container">
                        <el-table :data="updateUpReferrerList" border fit highlight-current-row style="width: 100%" @current-change="handleCurrentChange1">
                            <el-table-column align="center" label="序号" width="100">
                                <template scope="scope">
                                    <span>{{(updateUpReferrerQuery.params.page-1)*updateUpReferrerQuery.params.size+parseInt(scope.$index) + 1}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="用户ID">
                                <template scope="scope">
                                    {{scope.row.userId}}
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="姓名">
                                <template scope="scope">
                                    {{scope.row.realName}}
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="手机号">
                                <template scope="scope">
                                    {{scope.row.mobile}}
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="性别">
                                <template scope="scope">
                                    <span>{{scope.row.sex | sexFilter}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div v-show="total1" class="pagination-container">
                            <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentPageChange1" :current-page.sync="updateUpReferrerQuery.params.page" :page-sizes="[10,20,30, 50]" :page-size="updateUpReferrerQuery.params.size" layout="total, sizes, prev, pager, next, jumper" :total="total1">
                            </el-pagination>
                        </div>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="updateUpReferrer">确定</el-button>
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                    </div>
                </el-dialog>
                <!-- 新增下级客户 -->
                <el-dialog title="新增上级经纪人" :visible.sync="dialogFormVisible1">
                    <div class="filter-container">
                        <span>用户ID:</span>
                        <el-input v-model="addDownReferrerQuery.params.userId" placeholder="用户ID" style="width:200px;"></el-input>
                        <el-button class="filter-item" style="margin-left: 50px;" type="primary" v-waves icon="search" @click="getDownList">查询</el-button>
                    </div>
                    <div class="filter-container">
                        <el-table :data="addDownReferrerList" border fit highlight-current-row style="width: 100%" @current-change="handleCurrentChange2">
                            <el-table-column align="center" label="序号" width="100">
                                <template scope="scope">
                                    <span>{{(addDownReferrerQuery.params.page-1)*addDownReferrerQuery.params.size+parseInt(scope.$index) + 1}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="用户ID">
                                <template scope="scope">
                                    {{scope.row.userId}}
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="姓名">
                                <template scope="scope">
                                    {{scope.row.realName}}
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="手机号">
                                <template scope="scope">
                                    {{scope.row.mobile}}
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="性别">
                                <template scope="scope">
                                    <span>{{scope.row.sex | sexFilter}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div v-show="total1" class="pagination-container">
                            <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentPageChange2" :current-page.sync="addDownReferrerQuery.params.page" :page-sizes="[10,20,30, 50]" :page-size="addDownReferrerQuery.params.size" layout="total, sizes, prev, pager, next, jumper" :total="total1">
                            </el-pagination>
                        </div>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="addDownReferrer">确定</el-button>
                        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                    </div>
                </el-dialog>
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
                    <el-button class="filter-item" style="margin-left: 50px;" @click="reset" type="primary" icon="setting">重置</el-button>
                    <el-button class="filter-item" style="margin-left: 50px;" type="primary" v-waves icon="search" @click="findOrderList">查询</el-button>
                </div>
                <div class="filter-container">
                    <el-table :data="orderList" border fit highlight-current-row style="width: 100%" @current-change="handleCurrentChange">
                        <el-table-column align="center" label="序号" width="100">
                            <template scope="scope">
                                <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="订单号">
                            <template scope="scope">
                                <el-button class="filter-item" style="margin-left: 50px;" @click="goOrder(scope.row.tradeId)" type="text">{{scope.row.tradeId}}</el-button>                            </template>
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
import uploadImg from "@src/components/uploadImg";
export default {
    components: {
        uploadImg
    },
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
            userLevelStatus: [{ code: '10', text: 'C端' }, { code: '20', text: 'B端' }, { code: '11', text: '业务人员' }],//等级下拉框
            userInfoData: {},
            userId: null,
            domainStatus: [],//注册渠道下拉框
            sexStatus: [{ code: 2, text: '女' }, { code: 1, text: '男' }, { code: '', text: '未知' }],
            realNameStatus: [{ code: -1, text: '认证失败' }, { code: 1, text: '认证成功' }, { code: 0, text: '未认证' }],//实名认证状态
            idenTypeStatus: [{ code: 1, text: '身份证' }, { code: 2, text: '军官证' }, { code: 3, text: '护照' }, { code: 4, text: '驾驶证' }, { code: 5, text: '港澳台通行证' }, { code: 6, text: '回乡证' }],
            userAccounts: {},  //资产信息,
            listQuery: { params: { url: 'ordermanager/findOrderList', page: 1, size: 10, tradeId: '', selectAmount: '', orderSts: '', domainId: '', productName: '', tradeAgent: '', beginDate: '', endDate: '', userId: '' } },
            orderList: [], //订单列表
            userBankCards: {},
            tradeSts: [ //订单状态
                { sts: '', text: '全部' },
                { sts: 10, text: '已下单（待支付）' },
                { sts: -10, text: '订单取消' },
                { sts: -11, text: '订单已失效' },
                { sts: -12, text: '订单关闭；' },
                { sts: -13, text: '订单已删除' },
                { sts: 18, text: '已支付待激活' },
                { sts: 20, text: '已支付待发货' },
                { sts: 21, text: '支付不足' },
                { sts: 22, text: '支付超额；' },
                { sts: -20, text: '支付超时失败' },
                { sts: -21, text: '支付不足超时失败' },
                { sts: 25, text: '已激活待审核 ' },
                { sts: 30, text: '发货中' },
                { sts: 35, text: '已发货' },
                { sts: -30, text: '未知原因发货失败' },
                { sts: -31, text: '渠道余额不足发货失败' },
                { sts: -32, text: '供应商余额不足发货失败' },
                { sts: -33, text: '网络异常发货失败' },
                { sts: 40, text: '全部核销' },
                { sts: 41, text: '部分核销' },
                { sts: 50, text: '全部退款申请' },
                { sts: 51, text: '同意全部退款' },
                { sts: -51, text: '拒绝全部退款' },
                { sts: 55, text: '部分退款申请' },
                { sts: 56, text: '同意部分退款' },
                { sts: -56, text: '拒绝部分退款' }
            ],
            upReferrerList: [],
            downReferrerList: [],
            addDownReferrerList: [],
            //对话框
            dialogLoading: false,
            dialogLoading1: false,
            updateUpReferrerList: [],
            dialogFormVisible: false,
            dialogFormVisible1: false,
            total1: null,
            total2: null,
            dialogURL: 'product/param/updateProductClass',
            updateUpReferrerQuery: { params: { url: 'user/findUserMsg', page: 1, size: 10, userId: '' } },
            addDownReferrerQuery: { params: { url: 'user/findUserMsg', page: 1, size: 10, userId: '' } },
        };
    },
    created() {
        this.handleClick();
        this.userId = this.$route.query.userId;
        this.getList();
        console.log(this.domainStatus);
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
        //用户信息获取 
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
                    console.log(this.domainStatus);
                } else {

                }
            }).catch(err => {

            })
        },
        //保存按钮
        updateUserBtn() {
            if (this.userInfoData.userExtends.userBirthday) {
                this.userInfoData.userExtends.userBirthday = parseTime(this.userInfoData.userExtends.userBirthday, '{y}-{m}-{d}');
            }
            let obj = {
                url: 'user/updateUser',
                userId: this.userInfoData.user.userId,
                username: this.userInfoData.user.username,
                userLevel: this.userInfoData.user.userLevel,
                domainCode: this.userInfoData.user.domainCode,
                userLogo: this.userInfoData.userExtends.userLogo,
                userRealName: this.userInfoData.user.realName,
                userGender: this.userInfoData.userExtends.userGender,
                userBirthday: this.userInfoData.userExtends.userBirthday,
                email: '江西省九江市彭泽县',
                //email: this.userInfoData.userAddressList.insurantAddress,
                realNameStatus: this.userInfoData.user.realNameStatus,
                idenType: this.userInfoData.userExtends.idenType,
                idenNo: this.userInfoData.userExtends.idenNo,
                // idenImg1: this.userInfoData.userExtends.idenImg1,
                // idenImg2: this.userInfoData.userExtends.idenImg2
                idenImg1: this.userInfoData.userExtends.userLogo,
                idenImg2: this.userInfoData.userExtends.userLogo
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.$message({
                        message: response.respMsg,
                        type: 'success'
                    });
                    this.$router.push({ path: '/user/toUserView', query: { userId: this.userId } });
                } else {
                    this.$message({
                        message: response.respMsg,
                        type: 'warning'
                    });
                }
            }).catch(err => {

            })
        },
        //取消按钮
        Cancel() {
            this.$router.push({ path: '/user/toUserView' });
        },
        //前往订单详情页
        goOrder(val) {
            this.$router.push({ path: '/dealManage/orderDetail', query: { tradeId: val } });
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
        //获取上级经纪人
        getUpReferrer() {
            let obj = {
                url: 'user/getUpReferrer',
                userId: this.userId
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.upReferrerList = response.data.userList;
                } else {

                }
            }).catch(err => {

            })
        },
        //获取获取下级客户
        getDownReferrer() {
            let obj = {
                url: 'user/getDownReferrer',
                userId: this.userId
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.downReferrerList = response.data.userList;
                } else {

                }
            }).catch(err => {

            })
        },
        //删除下级客户
        removeReferrer(val) {
            let obj = {
                url: 'user/removeReferrer',
                userId: this.userId
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.$message({
                        message: response.respMsg,
                        type: 'success'
                    });
                    this.getUpReferrer();
                } else {
                    this.$message({
                        message: response.respMsg,
                        type: 'warning'
                    });
                }
            }).catch(err => {

            })
        },
        //删除下级客户
        removeReferrer1(val) {
            let obj = {
                url: 'user/removeReferrer',
                userId: val
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.$message({
                        message: response.respMsg,
                        type: 'success'
                    });
                    this.getDownReferrer();
                } else {
                    this.$message({
                        message: response.respMsg,
                        type: 'warning'
                    });
                }
            }).catch(err => {

            })
        },
        //新增上级按钮
        newAddup() {
            this.dialogFormVisible = true;
            this.getUpList();
        },
        //获取上级经纪人列表
        getUpList() {
            config(this.updateUpReferrerQuery.params).then(response => {
                if (response.respCode === '000000') {
                    this.total1 = response.data.total;
                    this.dialogLoading = false;
                    this.updateUpReferrerList = response.data.userList
                } else {
                }
            }).catch(err => {

            })
        },
        //新增上级经纪人
        updateUpReferrer() {
            let obj = {
                url: 'user/updateUpReferrer',
                updateUserIds: this.currentRow.userId,
                userId: this.userId
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
                this.dialogFormVisible = false;
                this.getUpReferrer();
            }).catch(err => {

            })
        },
        //下级客户新增按钮
        newAddDown() {
            this.dialogFormVisible1 = true;
            this.getDownList();
        },
        //获取下级客户列表
        getDownList() {
            config(this.addDownReferrerQuery.params).then(response => {
                if (response.respCode === '000000') {
                    this.total1 = response.data.total;
                    this.dialogLoading = false;
                    this.addDownReferrerList = response.data.userList
                } else {
                }
            }).catch(err => {

            })
        },
        //新增下级客户
        addDownReferrer() {
            let obj = {
                url: 'user/addDownReferrer',
                updateUserIds: this.currentRow.userId,
                userId: this.userId
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
                this.dialogFormVisible1 = false;
                this.getDownReferrer();
            }).catch(err => {

            })
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
        handleCurrentChange1(val) {
            this.currentRow = val;
        },
        // 改变每一页的条数
        handleSizeChange1(val) {
            this.updateUpReferrerQuery.params.size = val;
            this.getUpList();
        },
        // 切换页码
        handleCurrentPageChange1(val) {
            this.updateUpReferrerQuery.params.page = val;
            this.getUpList();
        },
        handleCurrentChange2(val) {
            this.currentRow = val;
        },
        // 改变每一页的条数
        handleSizeChange2(val) {
            this.addDownReferrerQuery.params.size = val;
            this.getDownList();
        },
        // 切换页码
        handleCurrentPageChange2(val) {
            this.addDownReferrerQuery.params.page = val;
            this.getDownList();
        },
        //tab切换事件
        handleClick() {
            if (this.tabsName == 'first') {
                this.getUserInfo();
                this.getList();
            }
            if (this.tabsName == 'second') {
                this.getAccountDetail();
                this.getUpReferrer();
                this.getDownReferrer();
            }
            if (this.tabsName == 'third') {
                this.findOrderList();
                this.getList();
            }
        },
        //上传图片事件
        acqImgUrl(params) {
            if ('userInfoData.userExtends.userLogo' == params[1]) {
                this.userInfoData.userExtends.userLogo = params[0];
            }
            if ('userInfoData.userExtends.idenImg1' == params[1]) {
                this.userInfoData.userExtends.idenImg1 = params[0];
            }
            if ('userInfoData.userExtends.idenImg2' == params[1]) {
                this.userInfoData.userExtends.idenImg2 = params[0];
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
}

.app-container .filter-container .rightData {
    margin-right: 100px;
}
</style>

