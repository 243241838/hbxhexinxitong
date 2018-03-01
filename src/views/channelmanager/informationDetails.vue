<template>
    <div class="app-container calendar-list-container information">
        <div class="filter-container" v-show="isshow">
            <h2 class="ui-info-tit">渠道基本信息</h2>
            <el-row>
                <el-col :span="22">
                    <el-form label-width="180px" style="border: 1px solid #e7e7e2;padding:10px 0px;" :model="domainInfoRequest" :rules="rules"
                        ref="form">
                        <el-form-item label=" 渠道类型:">
                            <el-select style="width:300px;margin-left:100px;" v-model="domainInfoRequest.domainType">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="渠道编号:" prop="domainId">
                            <el-input style="width:300px;padding-left:100px;" v-model="domainInfoRequest.domainId"></el-input>
                        </el-form-item>
                        <el-form-item label="渠道名称:" prop="domainName">
                            <el-input style="width:300px;margin-left:100px;" v-model="domainInfoRequest.domainName"></el-input>
                        </el-form-item>
                        <el-form-item label="渠道联系人:">
                            <el-input style="width:300px;margin-left:100px;" v-model="domainInfoRequest.domainContacts"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话:">
                            <el-input style="width:300px;margin-left:100px;" v-model="domainInfoRequest.fixedPhone"></el-input>
                            <el-input style="width:300px;margin-left:14px;" v-model="domainInfoRequest.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="合作时间段:" required>
                            <el-date-picker type="datetime" placeholder="请输入开始时间" style="width:300px;margin-left:100px;" :editable="false" v-model="domainInfoRequest.effTime"
                                prop="effTime">
                            </el-date-picker>
                            <span style="color: #1f2d3d; font-size: inherit;font-weight:normal;margin-left:0px;">至</span>
                            <el-date-picker type="datetime" placeholder="请输入结束时间" style="width:300px;margin-left:0px;" :editable="false" v-model="domainInfoRequest.expTime"
                                prop="expTime">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label=" 结算类型:">
                            <el-select style="width:300px;margin-left:100px;" v-model="domainInfoRequest.settType">
                                <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="说明:">
                            <el-input type="textarea" style="width:300px;margin-left:100px;" :rows="2" v-model="domainInfoRequest.domainDesc"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <h2 class="ui-info-tit">渠道银行账户信息</h2>
            <el-row>
                <el-col :span="22">
                    <el-form label-width="180px" style="border: 1px solid #e7e7e2; padding:10px 0px;" :model="domainInfoRequest" :rules="rules"
                        ref="form1">
                        <el-form-item label="结算账户银行名称:" :maxlength=20 prop="depositBank">
                            <el-input style="width:300px;margin-left:100px;" v-model="domainInfoRequest.depositBank"></el-input>
                        </el-form-item>
                        <el-form-item label="结算账户户名:" :maxlength=20 prop="accountName">
                            <el-input style="width:300px;margin-left:100px;" v-model="domainInfoRequest.accountName"></el-input>
                        </el-form-item>
                        <el-form-item label="结算账户账号:" :maxlength=20 prop="accountNo">
                            <el-input style="width:300px;margin-left:100px;" v-model="domainInfoRequest.accountNo"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <div class="btn">
                <input type="button" value="下一步" class="ui-btn-blue" @click="submit('form','form1')">
                <input type="button" value="取消" class="ui-btn-grey" @click="goDetail">
            </div>
        </div>
        <div class="filter-container" v-show="!isshow">
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
            </div>
        </div>
    </div>
</template>
<script>
    import config from '@api/config';
    import '@res/css/rewrite.less';
    import {
        parseTime
    } from '@filters/index.js';
    import {
        trim
    } from '@src/utils/util';
    export default {
        data() {
            return {
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
                    label: '预付款'
                }, {
                    value: 20,
                    label: '后结算'
                }],
                domainInfoRequest: {
                    url: 'channel/add',
                    accountName: '',
                    depositBank: '',
                    accountNo: '',
                    domainContacts: '',
                    domainDesc: '',
                    domainId: '',
                    domainName: '',
                    domainType: 0,
                    effTime: '',
                    expTime: '',
                    fixedPhone: '',
                    settType: 10,
                    phone: '',
                    authSts: 0
                },
                isshow: true,
                rules: {
                    domainId: [{
                        required: true,
                        pattern: /^(0|[1-9][0-9]{0,6})$/,
                        message: '不能为空只能输入数字正数,最多输入6位',
                        trigger: 'blur'
                    }],
                    domainName: [{
                        required: true,
                        message: '不能为空',
                        trigger: 'blur'
                    }]
                }
            }
        },
        created() {},
        methods: {
            check() {
                let obj = {
                    url: 'channel/domainCheck',
                    domainId: this.domainInfoRequest.domainId,
                    domainName: this.domainInfoRequest.domainName
                }
                config(obj).then(response => {
                    this.domainInfoRequest.effTime = this.format(this.domainInfoRequest.effTime);
                    this.domainInfoRequest.expTime = this.format(this.domainInfoRequest.expTime);
                    if (response.respCode === '000000') {
                        this.isshow = false;
                    } else {
                        this.$message({
                            type: 'warning',
                            message: response.respMsg
                        });
                        return false
                    }
                })
            },
            goDetail() {
                this.$router.push({
                    path: "/channelmanager/channelinformanager",
                });
            },
            query() {
                config(this.domainInfoRequest).then(response => {
                    if (response.respCode === '000000') {
                        this.$message({
                            type: 'info',
                            message: '渠道添加成功'
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
            //提交
            submit(formName, formName1) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
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
                        if (this.domainInfoRequest.fixedPhone !== "") {
                            let reg =
                                /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$|(^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$)/;
                            if (!reg.test(this.domainInfoRequest.fixedPhone)) {
                                this.$message({
                                    type: 'warning',
                                    message: '号码不正确,请输入11-12位'
                                });
                                return false
                            }
                        }
                        if (this.domainInfoRequest.phone !== "") {
                            let reg =
                                /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$|(^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$)/;
                            if (!reg.test(this.domainInfoRequest.phone)) {
                                this.$message({
                                    type: 'warning',
                                    message: '号码不正确,请输入11-12位'
                                });
                                return false
                            }
                        }
                        if (this.domainInfoRequest.effTime == "") {
                            this.$message({
                                type: 'warning',
                                message: '请输入合作时间'
                            });
                            return false
                        }
                        if (this.domainInfoRequest.expTime == "") {
                            this.$message({
                                type: 'warning',
                                message: '请输入合作时间'
                            });
                            return false
                        }
                        if (new Date(this.domainInfoRequest.effTime) > new Date(this.domainInfoRequest.expTime)) {
                            this.$message({
                                type: 'warning',
                                message: '结束日期必须大于或等于起始日期'
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
                    } else {
                        return false;
                    }
                });
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