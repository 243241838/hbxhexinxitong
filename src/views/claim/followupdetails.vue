<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <div class="container" style="padding-top:10px;">
                <el-form label-width="120px" :model="query">
                    <el-form-item label=" 跟进日期:">
                        <el-date-picker type="datetime" style="width:265px;" :editable="false" v-model="query.claimTimeStr">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="理赔状态:">
                        <el-radio-group v-model="query.claimStatus" style="margin-top:10px;">
                            <el-radio :label="30">待打款</el-radio>
                            <el-radio :label="40">已打款</el-radio>
                            <el-radio :label="-20">理赔失败</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="理赔金额:">
                        <el-input style="width:260px;" v-model="query.claimAmount"></el-input>
                    </el-form-item>
                    <el-form-item label="情况备注:">
                        <weditor v-bind:loanid="'subjectEditorName'" v-bind:editorName="'subjectEditorName'" v-on:listenWEditorChange="wEditorChange"
                            v-model="query.claimAdvice" style="width:60%;"></weditor>
                    </el-form-item>
                </el-form>
            </div>
            <div class="btn">
                <input type="button" value="完成" class="ui-btn-blue" @click="goNext">
                <input type="button" value="取消" class="ui-btn-grey" @click="go">
            </div>
        </div>
    </div>
</template>
<script>
    import '@res/css/secretkey.less';
    import config from '@api/config';
    import weditor from '@components/WEditor.vue';
    import {
        parseTime
    } from '@filters/index.js';
    import {
        trim
    } from '@src/utils/util';
    export default {
        components: {
            weditor
        },
        data() {
            return {
                query: {
                    url: 'claim/claimFollowUp',
                    claimTimeStr: '',
                    claimId: this.$route.query.claimId,
                    claimAmount: '',
                    claimAdvice: '',
                    claimStatus: '',
                }
            }
        },
        created() {},
        methods: {
            wEditorChange(html) {
                this.query.claimAdvice = html;
            },
            go() {
                this.$router.go(-1);
            },
            goNext() {
                if (this.query.claimTimeStr == "") {
                    this.$message({
                        type: 'warning',
                        message: '请输入理赔跟进时间'
                    });
                    return false
                }
                if (this.query.claimStatus == "") {
                    this.$message({
                        type: 'warning',
                        message: '理赔状态不能为空'
                    });
                    return false
                }
                if (this.query.claimAmount == "") {
                    this.$message({
                        type: 'warning',
                        message: '理赔金额不能为空'
                    });
                    return false
                }
                let reg = /^([1-9]\d{0,}|0)$/
                if (!reg.test(this.query.claimAmount)) {
                    this.$message({
                        type: 'warning',
                        message: '理赔金额只能是大于等于零的整数'
                    });
                    return false
                }
                this.save()

            },
            save() {
                this.query.claimTimeStr = this.format(this.query.claimTimeStr)
                config(this.query).then(response => {
                    if (response.respCode === '000000') {
                        this.$message({
                            type: 'success',
                            message: response.respMsg
                        });
                        setTimeout(() => {
                            this.$router.push({
                                path: "/claim/toMsgList",
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

    .app-container .filter-container>div.container {
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