<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <h2 class="ui-info-tit">申请信息</h2>
            <el-row>
                <el-col :span="22">
                    <el-form label-width="180px" style="border: 1px solid #e7e7e2;">
                        <el-form-item label="用户ID:" style="margin-bottom:4px;font-weight:700;">
                            <span style="color: #768399;font-weight:normal;margin-left:100px;">{{commonUserPo.userId}}</span>
                        </el-form-item>
                        <el-form-item label="保单号:" style="margin-bottom:4px;font-weight:700;">
                            <span style="color: #768399;font-weight:normal;margin-left:100px;">{{claimRecordsPo.policyNo}}</span>
                        </el-form-item>
                        <el-form-item label="投保人:" style="margin-bottom:4px;font-weight:700;">
                            <span style="color: #768399;font-weight:normal;margin-left:100px;">{{claimRecordsPo.policyholderName}}</span>
                        </el-form-item>
                        <el-form-item label="申请人:" style="margin-bottom:4px;font-weight:700;">
                            <span style="color: #768399;font-weight:normal;margin-left:100px;">{{claimRecordsPo.applyUserName}}</span>
                        </el-form-item>
                        <el-form-item label="申请人手机:" style="margin-bottom:4px;font-weight:700;">
                            <span style="color: #768399;font-weight:normal;margin-left:100px;">{{claimRecordsPo.applyUserMobile}}</span>
                        </el-form-item>
                        <el-form-item label="保单状态:" style="margin-bottom:4px;font-weight:700;background:#f9fafa;">
                            <span style="color: #768399;font-weight:normal;margin-left:100px;">{{claimRecordsPo.state |  classification}}</span>
                        </el-form-item>
                        <el-form-item label="保险名称:" style="margin-bottom:4px;font-weight:700;">
                            <span style="color: #768399;font-weight:normal;margin-left:100px;">{{claimRecordsPo.productName}}</span>
                        </el-form-item>
                        <el-form-item label="投保人手机号:" style="margin-bottom:4px;font-weight:700;">
                            <span style="color: #768399;font-weight:normal;margin-left:100px;">{{claimRecordsPo.mobile}}</span>
                        </el-form-item>
                        <el-form-item label="申请时间:" style="margin-bottom:4px;font-weight:700;background:#f9fafa;">
                            <span style="color: #768399;font-weight:normal;margin-left:100px;">{{claimRecordsPo.createTimeStr}}</span>
                        </el-form-item>
                        <el-form-item label="邮箱:" style="margin-bottom:4px;font-weight:700;">
                            <span style="color: #768399;font-weight:normal;margin-left:100px;">{{claimRecordsPo.applyUserEmail}}</span>
                        </el-form-item>
                        <el-form-item label="被保人姓名:" style="margin-bottom:4px;font-weight:700;">
                            <span style="color: #768399;font-weight:normal;margin-left:100px;">{{claimRecordsPo.recognizee}}</span>
                        </el-form-item>
                        <el-form-item label="发生案件时间:" style="margin-bottom:4px;font-weight:700;">
                            <span style="color: #768399;font-weight:normal;margin-left:100px;">{{claimRecordsPo.caseTimeStr}}</span>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <h2 class="ui-info-tit">事情经过</h2>
            <el-row>
                <el-col :span="22">
                    <el-form>
                        <textarea rows="8" style="width:100%;outline:none;color: #768399;font-weight:normal;font-size:14px;text-indent:10px;line-height:20px;">{{claimRecordsPo.applyAdvice}}</textarea>
                    </el-form>
                </el-col>
            </el-row>
            <h2 class="ui-info-tit">图片视频信息</h2>
            <el-row>
                <el-col :span="22" style="border:1px solid #e7e7e2;height:168px;">
                    <ul v-if="claimRecordsFilesPoList.length>0" style="padding-left:7%; width:93%;padding-top:10px;padding-bottom:10px; height:100%;"
                        class="clearfix">
                        <li v-for="item in claimRecordsFilesPoList" style="float:left;margin-right:10px;"><img :src="item.filesUrl" v-if="item.filesType==1" style="width:148px;height:148px;" />
                            <video :src="item.filesUrl" controls="controls" v-if="item.filesType==0" width="300" height="148"></video>
                        </li>
                    </ul>
                </el-col>
            </el-row>
            <h2 class="ui-info-tit">跟进情况</h2>
            <el-row>
                <el-col :span="22">
                    <el-table :data="claimLogsPos" fit border highlight-current-row stripe style="width: 100%">
                        <el-table-column prop="claimNickname" label="跟进人" width="120" align="center">
                        </el-table-column>
                        <el-table-column prop="claimTimeStr" label="跟进日期" align="center">
                        </el-table-column>
                        <el-table-column prop="createTimeStr" label="添加备注时间" align="center">
                        </el-table-column>
                        <el-table-column prop="claimStatus" label="理赔状态" align="center" width="140" >
                            <template scope="scope">
                            <span>{{scope.row.claimStatus|  type}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column prop="claimAmount" label="理赔金额（元）" align="center" width="180">
                        </el-table-column>
                        <el-table-column prop="claimAdvice" label="情况备注说明" align="center">
                            <template scope="scope">
                            <span v-html="scope.row.claimAdvice"></span>
                        </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22" style="text-align:center">
                    <button class="ui-btn-grey" @click="goBack">返回</button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import config from '@api/config';
    import {
        parseTime
    } from '@filters/index.js';
    export default {
        data() {
            return {
                bg: "#FFFFFF",
                listQuery: {
                    params: {
                        url: 'claim/toClaimAudit',
                        claimId: this.$route.query.claimId
                    }
                },
                claimRecordsPo: '',
                commonUserPo: '',
                claimRecordsFilesPoList: [],
                claimLogsPos: []
            };
        },
        created() {
            this.getlist();
        },
        methods: {
            //提交
            getlist() {
                config(this.listQuery.params).then(response => {
                    if (response.respCode === '000000') {
                        this.claimRecordsPo = response.data.claimRecordsPo;
                        this.commonUserPo = response.data.commonUserPo;
                        this.claimRecordsFilesPoList = response.data.claimRecordsFilesPoList;
                        this.claimLogsPos = response.data.claimLogsPos;
                    }

                }).catch(err => {

                })
            },
            goBack() {
                this.$router.push({
                    path: "/claim/toMsgList/"
                });
            }
        },
        filters: {
            classification: function (val) {
                if (val == 10) {
                    return '理赔中'
                } else if (val == -20) {
                    return '理赔失败'
                } else if (val == 30) {
                    return '审核通过待打款'
                } else if (val == 40) {
                    return '审核通过已打款'
                }
            },
            type: function (val) {
                if (val == 10) {
                    return '理赔中'
                } else if (val == -20) {
                    return '理赔失败'
                } else if (val == 30) {
                    return '理赔待打款'
                } else if (val == 40) {
                    return '理赔已打款'
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

    .ui-btn-grey {
        display: inline-block;
        width: 87px;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        background: #f0f0f0;
        color: #768399;
        cursor: pointer;
        font-weight: bold;
        border: 0;
        border-radius: 5px;
        margin-top: 10px;
        outline: none;
    }
</style>