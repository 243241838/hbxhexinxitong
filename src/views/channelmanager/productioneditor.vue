<template>
    <div class="app-container calendar-list-container productioneditor">
        <div class="filter-container" v-show="isshow">
            <h2 class="ui-info-tit">渠道基本信息</h2>
            <el-row>
                <el-col :span="22">
                    <el-form label-width="180px" style="border: 1px solid #e7e7e2;padding:10px 0px;" :model="domainInfoRequest">
                        <el-form-item label=" 渠道ID:">
                            <span>{{domainInfoRequest.domainId}}</span>
                        </el-form-item>
                        <el-form-item label="渠道名称:">
                            <span>{{domainInfoRequest.domainName}}</span>
                        </el-form-item>
                        <el-form-item label="渠道类型:">
                            <el-select style="width:300px;margin-left:100px;" v-model="domainInfoRequest.domainType">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="联系人:">
                            <el-input style="width:300px;margin-left:100px;" v-model="domainInfoRequest.domainContacts"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话:">
                            <el-input style="width:300px;margin-left:100px;" v-model="firstphone"></el-input>
                            <el-input style="width:300px;margin-left:14px;" v-model="secphone"></el-input>
                        </el-form-item>
                        <el-form-item label="合作时间:">
                            <el-date-picker type="datetime" placeholder="请输入开始时间" style="width:300px;margin-left:100px;" :editable="false" v-model="domainInfoRequest.effTime"
                                prop="effTime">
                            </el-date-picker>
                            <span style="color: #1f2d3d; font-size: inherit;font-weight:normal;margin-left:0px;">至</span>
                            <el-date-picker type="datetime" placeholder="请输入结束时间" style="width:300px;margin-left:0px;" :editable="false" v-model="domainInfoRequest.expTime"
                                prop="expTime">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="渠道状态：">
                            <el-select style="width:300px;margin-left:100px;" v-model="domainInfoRequest.domainSts">
                                <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="渠道二维码:">
                            <div class="parent">
                                <img :src="domainInfoRequest.domainQrcode" v-if="domainInfoRequest.domainQrcode" />
                                <input type="button" v-waves @click="getcode" value="重新生成二维码" :class="{ 'on-choose': select }" v-if="domainInfoRequest.domainQrcode">
                                <input type="button" v-waves @click="getcode" value="重新生成二维码" v-else>

                            </div>

                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <h2 class="ui-info-tit">渠道银行账户信息</h2>
            <el-row>
                <el-col :span="22">
                    <el-form label-width="180px" style="border: 1px solid #e7e7e2; padding:10px 0px;" :model="domainInfoRequest">
                        <el-form-item label="结算账户开户行:" :maxlength=20 prop="depositBank">
                            <el-input style="width:300px;margin-left:100px;" v-model="domainInfoRequest.depositBank"></el-input>
                        </el-form-item>
                        <el-form-item label="结账账户户名:" :maxlength=20 prop="accountName">
                            <el-input style="width:300px;margin-left:100px;" v-model="domainInfoRequest.accountName"></el-input>
                        </el-form-item>
                        <el-form-item label="结账账户账号:" :maxlength=20 prop="accountNo">
                            <el-input style="width:300px;margin-left:100px;" v-model="domainInfoRequest.accountNo"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <h2 class="ui-info-tit">渠道用户信息</h2>
            <div>
                <el-table :data="commonUserPoList" v-loading="listLoading" fit border highlight-current-row stripe style="width: 100%">
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
                            <span>{{scope.row.status |   state}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div v-if="totalItems" class="pagination-container" style="padding:10px 0;">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="params.page"
                        :page-sizes="[10,20,30,50]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper"
                        :total="totalItems">
                    </el-pagination>
                </div>
            </div>
            <div class="btn">
                <input type="button" value="完成" class="ui-btn-blue" @click="submit()">
                <input type="button" value="返回" class="ui-btn-grey" @click="goBack">
            </div>
        </div>
        <!--<div class="filter-container" v-show="!isshow">
            <h2 class="ui-info-tit">渠道基本信息</h2>
            <el-row>
                <el-col :span="22">
                    <el-form label-width="180px" style="border: 1px solid #e7e7e2;">
                        <el-form-item label="渠道编号:" style="background:#f9fafa;"><span>{{domainInfoRequest.domainId}}</span></el-form-item>
                        <el-form-item label="渠道名称:" style="background:#f9fafa;"><span>{{domainInfoRequest.domainName}}</span></el-form-item>
                        <el-form-item label="联系人:" style="background:#f9fafa;"><span>{{domainInfoRequest.domainContacts}}</span></el-form-item>
                        <el-form-item label="联系电话:">
                            <span>{{domainInfoRequest.fixedPhone}}</span>
                            <span style="margin-left:10px;">{{domainInfoRequest.phone}}</span>
                        </el-form-item>
                        <el-form-item label="合作时间:" style="background:#f9fafa;">
                            <span>{{domainInfoRequest.effTime}}</span>
                            <span v-if="domainInfoRequest.expTime" style="margin-left:0px;">至{{domainInfoRequest.expTime}}</span>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <h2 class="ui-info-tit">渠道银行账户信息</h2>
            <el-row>
                <el-col :span="22">
                    <el-form label-width="180px" style="border: 1px solid #e7e7e2;" :model="domainInfoRequest">
                        <el-form-item label="结算账户开户行:">
                            <span>{{domainInfoRequest.depositBank}}</span>
                        </el-form-item>
                        <el-form-item label="结账账户户名:" style="background:#f9fafa;"><span>{{domainInfoRequest.accountName}}</span></el-form-item>
                        <el-form-item label="结账账户账号:"><span>{{domainInfoRequest.accountNo}}</span></el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <div class="btn">
                <input type="button" value="保存" class="ui-btn-blue" @click="query">
                <input type="button" value="返回修改" class="ui-btn-grey" @click="isshow=true">
            </div>-->
    </div>
    </div>
</template>
<script>
    import config from '@api/config';
    import '@res/css/write.less';
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
                firstphone: '',
                secphone: '',
                options: [{
                    value: 0,
                    label: '自有渠道'
                }, {
                    value: 1,
                    label: 'B端渠道'
                }, {
                    value: 2,
                    label: 'c端渠道'
                }],
                option: [{
                    value: 10,
                    label: '正常'
                }, {
                    value: -11,
                    label: '禁用'
                }],
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
                code: {
                    url: 'channel/regenerateDomainQrcode',
                    domainId: this.$route.query.domainId
                },
                domainInfoRequest: {},
                commonUserPoList: [],
                totalItems: '',
                isshow: true,
                select: true,
                url: '',
            }
        },
        created() {
            this.search();
            this.getData();
        },
        methods: {
            goBack() {
                this.$router.push({
                    path: "/channelmanager/channelinformanager",
                });
            },
            getcode() {
                config(this.code).then(response => {
                    if (response.respCode === '000000') {
                        this.$message({
                            type: 'info',
                            message: '生成二维码成功！'
                        });
                    }
                    this.domainInfoRequest.domainQrcode = response.data.domainQrcode

                })
            },
            handleSizeChange(val) {
                this.params.size = val;
                this.getData()
            },
            // 切换页码
            handleCurrentPageChange(val) {
                this.query.page = val;
                this.getData()
            },
            check() {

                let obj = {
                    url: 'channel/update',
                    domainId: this.domainInfoRequest.domainId,
                    domainName: this.domainInfoRequest.domainName,
                    domainContacts: this.domainInfoRequest.domainContacts,
                    accountName: this.domainInfoRequest.accountName,
                    accountNo: this.domainInfoRequest.accountNo,
                    depositBank: this.domainInfoRequest.depositBank,
                    domainQrcode: this.domainInfoRequest.domainQrcode,
                    domainSts: this.domainInfoRequest.domainSts,
                    domainType: this.domainInfoRequest.domainType,
                    effTime: this.format(this.domainInfoRequest.effTime),
                    expTime: this.format(this.domainInfoRequest.expTime),
                    fixedPhone: ''

                }
                if (this.secphone != "") {
                    obj.fixedPhone = this.firstphone + "," + this.secphone
                } else {
                    obj.fixedPhone = this.firstphone;
                }
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                        this.$message({
                            type: 'success',
                            message: response.respMsg
                        });
                        setTimeout(() => {
                            this.$router.push({
                                path: "/channelmanager/channelinformanager",
                            });

                        }, 2000);
                    } else {
                        this.$message({
                            type: 'warning',
                            message: response.respMsg
                        });
                        return false
                    }
                })
            },
            goDetail(userId) {
                this.$router.push({
                    path: "/user/customerInfoDetails",
                    query: {
                        userId: userId
                    }
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
                        if (this.domainInfoRequest.effTime != "") {
                            this.domainInfoRequest.effTime = this.format(this.domainInfoRequest.effTime);
                        }
                        if (this.domainInfoRequest.expTime != "") {
                            this.domainInfoRequest.expTime = this.format(this.domainInfoRequest.expTime);
                        }
                        if (response.data.domainsPo.domainTel == "null" || response.data.domainsPo.domainTel ==
                            "") {
                            this.firstphone = '';
                            this.secphone = '';
                        } else {
                            let phone = response.data.domainsPo.domainTel.split(",");
                            if (phone.length > 1) {
                                this.firstphone = phone[0];
                                this.secphone = phone[1]
                            } else {
                                this.firstphone = phone[0];
                                this.secphone = ''
                            }
                        }
                    }
                })
            },
            format(val) {
                let datatime = new Date(val);
                let year = datatime.getFullYear();
                let month = datatime.getMonth();
                let date = datatime.getDate();
                let hour = datatime.getHours();
                let minute = datatime.getMinutes();
                let second = datatime.getSeconds();
                let result = year + '-' + ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) + '-' + (date >= 10 ?
                    date : '0' + date) + ' ' + (hour >= 10 ? hour : '0' + hour) + ':' + (minute >= 10 ? minute :
                    '0' + minute) + ':' + (second >= 10 ? second : '0' + second)
                return result
            },



            submit() {
                let first = "";
                let sec = "";
                let reg = /^([\u4e00-\u9fa5]+|[a-zA-Z]+)$/
                if (this.domainInfoRequest.domainContacts != "") {
                    if (!reg.test(this.domainInfoRequest.domainContacts)) {
                        this.$message({
                            type: 'warning',
                            message: '渠道联系人请输入汉字或是字母'
                        });
                        return false
                    }
                }
                if (this.firstphone !== "") {
                    let reg1 = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
                    if (!reg1.test(this.firstphone)) {
                        this.$message({
                            type: 'warning',
                            message: '号码不正确,请输入11-12位'
                        });
                        return false
                    }
                }
                if (this.secphone !== "") {
                    let reg1 = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
                    if (!reg1.test(this.secphone)) {
                        this.$message({
                            type: 'warning',
                            message: '号码不正确11,请输入11-12位'
                        });
                        return false
                    }
                }
                // if (this.domainInfoRequest.effTime == "") {
                //     this.$message({
                //         type: 'warning',
                //         message: '请输入合作开始时间'
                //     });
                //     return false
                // }
                // if (this.domainInfoRequest.expTime == "") {
                //     this.$message({
                //         type: 'warning',
                //         message: '请输入合作结束时间'
                //     });
                //     return false
                // }
                if (typeof (this.domainInfoRequest.effTime) == 'string') {
                    first = new Date(this.domainInfoRequest.effTime.replace(/-/g, '/')).getTime()
                } else {
                    first = new Date(this.domainInfoRequest.effTime).getTime()
                }
                if (typeof (this.domainInfoRequest.expTime) == 'string') {
                    sec = new Date(this.domainInfoRequest.expTime.replace(/-/g, '/')).getTime()

                } else {
                    sec = new Date(this.domainInfoRequest.expTime).getTime()
                }
                if (first > sec) {
                    this.$message({
                        type: 'warning',
                        message: '结束时间不能小于开始时间'
                    });
                    return false
                }
                if (this.domainInfoRequest.depositBank != "") {
                    if (trim(this.domainInfoRequest.depositBank).length > 20) {
                        this.$message({
                            type: 'warning',
                            message: '账号信息最多输入20位'
                        });
                        return false
                    }
                }
                if (this.domainInfoRequest.accountName != "") {
                    if (trim(this.domainInfoRequest.accountName).length > 20) {
                        this.$message({
                            type: 'warning',
                            message: '账号信息最多输入20位'
                        });
                        return false
                    }
                }
                if (this.domainInfoRequest.accountNo != "") {
                    if (trim(this.domainInfoRequest.accountNo).length > 20) {
                        this.$message({
                            type: 'warning',
                            message: '账号信息最多输入20位'
                        });
                        return false
                    }
                }
                this.check()
            }


        },
        filters: {
            state: function (val) {
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