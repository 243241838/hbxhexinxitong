<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <div class="container">
                <h2 class="ui-info-tit">渠道基本信息</h2>
                <el-form label-width="120px" :model="data">
                    <el-form-item label=" 渠道ID:" class="active">
                        <span>{{data.domainId}}</span>
                    </el-form-item>
                    <el-form-item label="渠道名称:">
                        <span>{{data.domainName}}</span>
                    </el-form-item>
                    <h2 class="ui-info-tit">渠道密钥信息</h2>
                    <el-form-item label="生效日期:" v-show="isshow">
                        <el-date-picker type="date" placeholder="请选择开始日期" v-model="data.effTimeStr" style="margin-right:4px;" :editable="false">
                        </el-date-picker>至
                        <el-date-picker type="date" placeholder="请选择结束日期" v-model="data.expTimeStr" :editable="false">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="生效日期:" v-show="!isshow">
                        <span>{{data.effTimeStr}}</span>
                        <span>至{{data.expTimeStr}}</span>
                    </el-form-item>
                    <el-form-item label="状态：" v-show="isshow">
                        <el-select v-model="data.keySts" style="width:80px;">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态：" v-show="!isshow">
                        {{data.keySts | state}}
                    </el-form-item>
                    <el-form-item label="密钥类型:">
                        <el-radio-group v-model="data.keyType">
                            <el-radio :label="1">MD5</el-radio>
                            <el-radio :label="10">RSA</el-radio>
                            <el-radio :label="20">3DES</el-radio>
                        </el-radio-group>
                        <el-button v-waves style="margin-left:5px;" @click="getKey" v-show="isshow">自动生成</el-button>
                    </el-form-item>
                    <el-form-item label="公钥:">
                        <el-input type="textarea" style="width:260px;" v-model="data.publicKey" v-show="isshow"></el-input>
                        <el-input type="textarea" style="width:260px;" v-model="data.publicKey" readonly="readonly" v-show="!isshow"></el-input>
                    </el-form-item>
                    <el-form-item label="私钥:">
                        <el-input type="textarea" style="width:260px;" v-model="data.privateKey" v-show="isshow"></el-input>
                        <el-input type="textarea" style="width:260px;" v-model="data.privateKey" readonly="readonly" v-show="!isshow"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="btn">
                <input type="button" value="返回" class="ui-btn-grey" @click="go">
                <input type="button" value="下一步" class="ui-btn-blue" v-show="isshow" @click="goNext">
            </div>
        </div>
    </div>
</template>
<script>
    import '@res/css/secretkey.less';
    import config from '@api/config';
    import {
        parseTime
    } from '@filters/index.js';
    import {
        trim
    } from '@src/utils/util';
    export default {
        data() {
            return {
                isshow: this.$route.query.isshow,
                query: {
                    url: 'channel/toEditKey',
                    keyId: this.$route.query.keyId
                },
                options: [{
                    value: 10,
                    label: '生效'
                }, {
                    value: -10,
                    label: '失效'
                }],
                data: {},
                startfirst: "",
                endfirst: "",
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                config(this.query).then(response => {
                    if (response.respCode === '000000') {
                        this.data = response.data;
                        this.startfirst = response.data.effTimeStr;
                        this.endfirst = response.data.expTimeStr;
                    }
                })
            },
            go() {
                this.$router.go(-1);
            },
            getKey() {
                let obj = {
                    url: 'channel/createKey',
                    keyType: this.data.keyType
                }
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                        this.data.publicKey = response.data.publicKey;
                        this.data.privateKey = response.data.privateKey;
                    } else {
                        this.$message({
                            type: 'warning',
                            message: response.respMsg
                        });
                    }
                })
            },
            goNext() {
                let start = "";
                let end = "";
                if (this.startfirst == this.data.effTimeStr) {
                    start = new Date(this.data.effTimeStr.replace(/-/g, '/')).getTime();
                } else {
                    start = new Date(this.data.effTimeStr).getTime();
                    this.data.effTimeStr = this.format(this.data.effTimeStr);
                }
                if (this.endfirst == this.data.expTimeStr) {
                    end = new Date(this.data.expTimeStr.replace(/-/g, '/')).getTime();
                } else {
                    end = new Date(this.data.expTimeStr).getTime();
                    this.data.expTimeStr = this.format(this.data.expTimeStr);
                }
                if (start > end) {
                    this.$message({
                        type: 'warning',
                        message: '结束日期必须大于或等于起始日期!'
                    });
                    return false
                }
                if (this.data.publicKey == "") {
                    this.$message({
                        type: 'warning',
                        message: '请输入公钥'
                    });
                    return false
                }
                if (this.data.privateKey == "") {
                    this.$message({
                        type: 'warning',
                        message: '请输入私钥'
                    });
                    return false
                }
                this.save();
            },
            format(val) {
                let datatime = new Date(val);
                let year = datatime.getFullYear();
                let month = datatime.getMonth();
                let date = datatime.getDate();
                let result = year + '-' + ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) + '-' + (date >= 10 ?
                    date : '0' + date);
                return result
            },
            save() {
                let obj = {
                    url: 'channel/doUpdateKey',
                    domainId: this.data.domainId,
                    effTimeStr: this.data.effTimeStr,
                    expTimeStr: this.data.expTimeStr,
                    keyId: this.$route.query.keyId,
                    keyType: this.data.keyType,
                    publicKey: this.data.publicKey,
                    privateKey: this.data.privateKey,
                    keySts: this.data.keySts
                }
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                        this.$message({
                            type: 'success',
                            message: response.respMsg
                        });
                        setTimeout(() => {
                            this.$router.push({
                                path: "/channelmanager/keydetails",
                                query: {
                                    domainId: this.data.domainId
                                }
                            })
                        }, 2000)
                    } else {
                        this.$message({
                            type: 'warning',
                            message: response.respMsg
                        });
                    }
                })
            }
        },
        filters: {
            state: function (val) {
                if (val == 10) {
                    return '生效'
                } else if (val == -10) {
                    return '失效'
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