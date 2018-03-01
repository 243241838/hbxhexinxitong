<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <h2 class="ui-info-tit">申请信息</h2>
            <el-row>
                <el-col :span="20":offset="1">
                    <el-form label-width="180px">
                        <el-form-item label="提现流水号:" style="margin-bottom:4px;font-weight:700;">
                            <span class="ui-info-item">{{cashRecordsPo.cashId}}</span>
                        </el-form-item>
                        <el-form-item label="提现申请时间:" style="margin-bottom:4px;font-weight:700;">
                            <span class="ui-info-item">{{cashRecordsPo.cashTimeStr}}</span>
                        </el-form-item>
                        <el-form-item label="提现用户ID:" style="margin-bottom:4px;font-weight:700;">
                            <span class="ui-info-item">{{cashRecordsPo.userId}}</span>
                        </el-form-item>
                        <el-form-item label="用户手机号:" style="margin-bottom:4px;font-weight:700;">
                            <span class="ui-info-item">{{cashRecordsPo.mobile}}</span>
                        </el-form-item>
                        <el-form-item label="真实姓名:" style="margin-bottom:4px;font-weight:700;">
                            <span class="ui-info-item">{{cashRecordsPo.realName}}</span>
                        </el-form-item>
                        <el-form-item label="开户银行:" style="margin-bottom:4px;font-weight:700;">
                            <span class="ui-info-item">{{cashRecordsPo.bankName}}</span>
                        </el-form-item>
                        <el-form-item label="银行卡号:" style="margin-bottom:4px;font-weight:700;">
                            <span class="ui-info-item">{{cashRecordsPo.cardNo}}</span>
                        </el-form-item>
                        <el-form-item label="申请提现金额:" style="margin-bottom:4px;font-weight:700;">
                            <span class="ui-info-item" v-if="cashRecordsPo.cashAmount">{{(cashRecordsPo.cashAmount/100)}}元</span>
                            <span class="ui-info-item" v-else></span>
                        </el-form-item>
                        <el-form-item label="提现手续费:" style="margin-bottom:4px;font-weight:700;">
                            <span class="ui-info-item" v-if="cashRecordsPo.cashFee">{{cashRecordsPo.cashFee/100}}元</span>
                             <span class="ui-info-item" v-else></span>
                        </el-form-item>
                        <el-form-item label="合计扣除:" style="margin-bottom:4px;font-weight:700;">
                            <span class="ui-info-item" v-if="(cashRecordsPo.cashAmount+cashRecordsPo.cashFee)">{{(cashRecordsPo.cashAmount+cashRecordsPo.cashFee)/100}}元</span>
                            <span class="ui-info-item" v-else></span>
                        </el-form-item>
                    </el-form>
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
                query: {
                    url: 'finance/showCashRecords',
                    cashId: this.$route.query.cashId,
                },
                cashRecordsPo: ''
            }
        },
        created() {
            this.getlist();
        },
        methods: {
            //提交
            getlist() {
                config(this.query).then(response => {
                    if (response.respCode === '000000') {
                        this.cashRecordsPo = response.data.cashRecordsPo;
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            goBack() {
                this.$router.push({
                    path: "/claim/toMsgList/"
                });
            }
        }
    }
</script>
<style lang="less" scoped>
    .app-container {
        margin: 17px 18px 0px 18px;
        border: 1px solid #e4e9eb;
        border-radius: 5px;
    }

    .app-container .filter-container .ui-info-tit {
        margin-left: 18px;
        height: 43px;
        line-height: 43px;
        font-size: 14px;
        color: #3498da;
        font-weight: bold;
    }

    .ui-info-item {
        color: black;
        font-size:14px;
        font-weight: normal;
        margin-left: 12px;
    }
</style>