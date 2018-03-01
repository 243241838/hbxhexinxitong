<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <div class="container">
                <h2 class="ui-info-tit">渠道基本信息</h2>
                <el-form label-width="120px" :model="query">
                    <el-form-item label=" 渠道ID:" class="active">
                        <span>{{domainId}}</span>
                    </el-form-item>
                    <el-form-item label="渠道名称:">
                        <span>{{domainName}}</span>
                    </el-form-item>
                    <h2 class="ui-info-tit">渠道密钥信息</h2>
                    <el-form-item label="生效日期:" v-show="isshow">
                        <el-date-picker type="date" placeholder="请选择开始日期" v-model="query.effTimeStr" style="margin-right:4px;">
                        </el-date-picker>至
                        <el-date-picker type="date" placeholder="请选择结束日期" v-model="query.expTimeStr">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="生效日期:" v-show="!isshow">
                        <span>{{query.effTimeStr}}</span>
                        <span>至{{query.expTimeStr}}</span>
                    </el-form-item>
                    <el-form-item label="渠道名称：" v-show="!isshow">
                        生效
                    </el-form-item>
                    <el-form-item label="密钥类型:">
                        <el-radio label="1" v-model="query.keyType">MD5</el-radio>
                        <el-radio label="10" v-model="query.keyType">RSA</el-radio>
                        <el-radio label="20" v-model="query.keyType">3DES</el-radio>
                        <el-button v-waves style="margin-left:5px;" @click="getKey" v-show="isshow">自动生成</el-button>
                    </el-form-item>
                    <el-form-item label="公钥:">
                        <el-input type="textarea" style="width:260px;" v-model="query.publicKey"></el-input>
                    </el-form-item>
                    <el-form-item label="私钥:">
                        <el-input type="textarea" style="width:260px;" v-model="query.privateKey"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="btn">
                <input type="button" value="返回" class="ui-btn-grey" @click="go" v-show="isshow">
                <input type="button" value="返回" class="ui-btn-grey" @click="isshow=true" v-show="!isshow">
                <input type="button" value="下一步" class="ui-btn-blue" @click="goNext" v-show="isshow">
                <input type="button" value="保存" class="ui-btn-blue" v-show="!isshow" @click="save">
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
                isshow: true,
                domainId: this.$route.query.domainId,
                domainName: this.$route.query.domainName,
                query: {
                    url: 'channel/addKey',
                    domainId: this.$route.query.domainId,
                    effTimeStr: '',
                    expTimeStr: '',
                    keyType: '1',
                    privateKey: '',
                    publicKey: ''
                }
            }
        },
        created() {},
        methods: {
            getKey() {
                let obj = {
                    url: 'channel/createKey',
                    keyType: this.query.keyType
                }
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                        this.query.privateKey = response.data.privateKey;
                        this.query.publicKey = response.data.publicKey;
                    } else {
                        this.$message({
                            type: 'warning',
                            message: response.respMsg
                        });
                    }
                })
            },
            go() {
                this.$router.go(-1);
            },
            goNext() {
                if (this.query.effTimeStr == "") {
                    this.$message({
                        type: 'warning',
                        message: '请输入生效时间'
                    });
                    return false
                }
                if (this.query.expTimeStr == "") {
                    this.$message({
                        type: 'warning',
                        message: '请输入失效时间'
                    });
                    return false
                }
                let start = new Date(this.query.effTimeStr).getTime();
                let end = new Date(this.query.expTimeStr).getTime();
                if (start > end) {
                    this.$message({
                        type: 'warning',
                        message: '结束日期必须大于或等于起始日期!'
                    });
                    return false
                }
                if (this.query.publicKey == "") {
                    this.$message({
                        type: 'warning',
                        message: '请输入公钥'
                    });
                    return false
                }
                if (this.query.privateKey == "") {
                    this.$message({
                        type: 'warning',
                        message: '请输入私钥'
                    });
                    return false
                }
                this.query.effTimeStr = this.format(this.query.effTimeStr);
                this.query.expTimeStr = this.format(this.query.expTimeStr);
                this.isshow = false;

            },
            save() {
                config(this.query).then(response => {
                    if (response.respCode === '000000') {
                        this.$message({
                            type: 'success',
                            message: response.respMsg
                        });
                        setTimeout(() => {
                            this.$router.push({
                                path: "/channelmanager/keydetails",
                                query: {
                                    domainId: this.$route.query.domainId,
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
            },
            format(val) {
                let datatime = new Date(val);
                let year = datatime.getFullYear();
                let month = datatime.getMonth();
                let date = datatime.getDate();
                let result = year + '-' + ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) + '-' + (date >= 10 ?
                    date : '0' + date);
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