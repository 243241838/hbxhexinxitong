<template>
    <div class="app-container calendar-list-container channel">
        <div class="filter-container">
            <h2 class="ui-info-tit">渠道基本信息</h2>
            <el-row>
                <el-col :span="22">
                    <el-form label-width="180px" style="border: 1px solid #e7e7e2;" :model="domainInfoRequest">
                        <el-form-item label=" 渠道ID:">
                            <span>{{domainInfoRequest.domainId}}</span>
                        </el-form-item>
                        <el-form-item label="渠道名称:">
                            <span>{{domainInfoRequest.domainName}}</span>
                        </el-form-item>
                        <el-form-item label="渠道类型:" >
                            <span>{{domainInfoRequest.domainType |  type}}</span>
                        </el-form-item>
                        <el-form-item label="联系人:" >
                            <span>{{domainInfoRequest.domainContacts}}</span>
                        </el-form-item>
                        <el-form-item label="联系电话:">
                            <span>{{domainInfoRequest.domainTel}}</span>
                        </el-form-item>
                        <el-form-item label="合作时间:" >
                            <span>{{domainInfoRequest.effTime}}</span>
                            <span style="color: #1f2d3d; font-size: inherit;font-weight:normal;margin-left:0px;">至{{domainInfoRequest.expTime}}</span>
                        </el-form-item>
                        <el-form-item label="渠道状态：">
                            <span>{{domainInfoRequest.domainSts |  state}}</span>
                        </el-form-item>
                        <el-form-item label="渠道二维码:">
                            <img :src="domainInfoRequest.domainQrcode" style="margin-left:100px;" v-if="domainInfoRequest.domainQrcode" />
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <h2 class="ui-info-tit">渠道银行账户信息</h2>
            <el-row>
                <el-col :span="22">
                    <el-form label-width="180px" style="border: 1px solid #e7e7e2; padding:10px 0px;" :model="domainInfoRequest">
                        <el-form-item label="结算账户开户行:">
                            <span>{{domainInfoRequest.depositBank}}</span>
                        </el-form-item>
                        <el-form-item label="结账账户户名:">
                            <span>{{domainInfoRequest.accountName}}</span>
                        </el-form-item>
                        <el-form-item label="结账账户账号:">
                            <span>{{domainInfoRequest.accountNo}}</span>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <h2 class="ui-info-tit">渠道用户信息</h2>
            <el-row>
                <el-col :span="22">
                    <el-table :data="commonUserPoList" v-loading="listLoading" fit border highlight-current-row stripe style="width:100%">
                        <el-table-column label="序号" width="100" align="center">
                            <template scope="scope">
                                <span>{{(params.page-1)*params.size + parseInt(scope.$index) + 1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="用户名" align="center">
                            <template scope="scope">
                                <span style="color: #3498da;cursor: pointer;" @click="goDetail(scope.row.userId)">{{scope.row.username}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="姓名" align="center" prop="realName"></el-table-column>
                        <el-table-column label="手机" align="center" prop="mobile"></el-table-column>
                        <el-table-column label="邮箱" align="center" prop="email"></el-table-column>
                        <el-table-column label="用户状态" align="center" prop="username">
                            <template scope="scope">
                                <span>{{scope.row.status |   states}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <div v-if="totalItems" class="pagination-container" style="padding:10px 0;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="params.page"
                    :page-sizes="[10,20,30,50]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper" :total="totalItems">
                </el-pagination>
            </div>
            <div style="padding:10px 0px;">该渠道合作的保险产品共有{{total}}个,<span style="color: #3498da;cursor: pointer;" @click="go">点击查看详情</span></div>
            <div class="btn">
                <input type="button" value="返回" class="ui-btn-grey" @click="goBack">
            </div>
        </div>
    </div>
</template>
<script>
    import config from '@api/config';
    import '@res/css/channel.less';
    import {
        parseTime
    } from '@filters/index.js';
    import {
        trim
    } from '@src/utils/util';
    export default {
        data() {
            return {
                listLoading: false,
                query: {
                    url: 'channel/getDomainInfos',
                    domainId: this.$route.query.domainId,
                },
                params: {
                    url: 'channel/getDomainUserInfos',
                    page: 1,
                    size: 10,
                    domainId: this.$route.query.domainId
                },
                domainInfoRequest: {},
                commonUserPoList: [],
                totalItems: '',
                total: this.$route.query.total
            }
        },
        created() {
            this.search();
            this.getData();
        },
        methods: {
            handleSizeChange(val) {
                this.params.size = val;
                this.getData()
            },
            // 切换页码
            handleCurrentPageChange(val) {
                this.query.page = val;
                this.getData()
            },
            goDetail(userId) {
               this.$router.push({
                    path: "/user/customerInfoDetails",
                    query: {
                      userId: userId
                    }
                });
            },
            go() {
                this.$router.push({
                    path: "/channelmanager/cooperationDetails",
                    query: {
                        domainId: this.$route.query.domainId,
                    }
                });
            },
            goBack() {
                this.$router.push({
                    path: "/channelmanager/channelinformanager",
                   });
            },
            getData() {
                this.listLoading = true;
                config(this.params).then(response => {
                    this.listLoading = false;
                    if (response.respCode === '000000') {
                        this.commonUserPoList = response.data.commonUserPoList;
                        this.totalItems = response.data.userCount;
                    }
                })
            },
            search() {
                config(this.query).then(response => {
                    if (response.respCode === '000000') {
                        this.domainInfoRequest = response.data.domainsPo;
                        console.log(this.domainInfoRequest)
                        if (this.domainInfoRequest.effTime != "") {
                            this.domainInfoRequest.effTime = this.format(this.domainInfoRequest.effTime);
                        }
                        if (this.domainInfoRequest.expTime != "") {
                            this.domainInfoRequest.expTime = this.format(this.domainInfoRequest.expTime);
                        }
                    }
                })
            },
            format(val) {
                let datatime = new Date(val);
                let year = datatime.getFullYear();
                let month = datatime.getMonth();
                let date = datatime.getDate();
                // let hour = datatime.getHours();
                // let minute = datatime.getMinutes();
                // let second = datatime.getSeconds();
                let result = year + '-' + ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) + '-' + (date >= 10 ?
                    date : '0' + date);
                return result
            },
        },
        filters: {
            type: function (val) {
                if (val == 0) {
                    return '自有渠道'
                } else if (val == 1) {
                    return 'B端渠道'
                } else if (val == 2) {
                    return 'c端渠道'
                }
            },
            state: function (val) {
                if (val == 10) {
                    return '正常'
                } else if (val == -11) {
                    return '禁用'
                }
            },
            states: function (val) {
                if (val == 0) {
                    return '正常'
                } else if (val == -1) {
                    return '注销'
                } else if (val == -2) {
                    return '冻结'
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .app-container {
        margin-top: 17px;
    }

    .app-container .filter-container {
        padding: 6px 1.4% 18px 1.4%;
    }

    .app-container .filter-container .ui-info-tit {
        margin-left: 18px;
        height: 43px;
        line-height: 43px;
        font-size: 14px;
        color: #3498da;
        font-weight: bold;
    }

    .btn {
        padding: 20px;
        text-align: center;
    }

    .ui-btn-blue {
        display: inline-block;
        width: 87px;
        height: 30px;
        line-height: 30px;
        border: 0;
        font-weight: bold;
        color: #fff;
        background-color: #75b9e6;
        border-radius: 5px;
        text-align: center;
        outline: none;
        cursor: pointer;
    }

    .ui-btn-grey {
        display: inline-block;
        width: 87px;
        height: 30px;
        line-height: 30px;
        border: 0;
        font-weight: bold;
        background: #f0f0f0;
        color: #768399;
        border-radius: 5px;
        text-align: center;
        outline: none;
        cursor: pointer;
    }
</style>