<template>
    <div>
        <div class="www-page">
            <div>
                <h4 class="ui-base-tit">保单信息</h4>
                <div style="width:100%;margin-bottom:17px;border:1px solid #e7e7e2">
                    <ul style="background-color:#eee;height:35px;">
                        <li class="linetop">保单号</li>
                        <li class="linetop">保单状态</li>
                        <li class="linetop">投保时间</li>
                        <li class="linetop">起保时间</li>
                        <li class="linetop">终保时间</li>
                    </ul>
                    <ul style="background-color: #f9fafa;height:45px;">
                        <li class="linebottom">{{data.policyDetailRsp.policyNo}}</li>
                        <li class="linebottom">{{data.policyDetailRsp.policySts}}</li>
                        <li class="linebottom" v-if="data.policyDetailRsp.tradeDate">{{data.policyDetailRsp.tradeDate | time}}</li>
                        <li class="linebottom" v-else></li>
                        <li class="linebottom" v-if="data.policyDetailRsp.startTime">{{data.policyDetailRsp.startTime | time}}</li>
                        <li class="linebottom" v-else></li>
                        <li class="linebottom" v-if="data.policyDetailRsp.endTime">{{data.policyDetailRsp.endTime | time}}</li>
                        <li class="linebottom" v-else></li>
                    </ul>
                    <ul style="background-color:#eee;height:35px;">
                        <li class="linetop">保费</li>
                        <li class="linetop">份数</li>
                        <li class="linetop">总保费</li>
                        <li class="linetop">保险公司</li>
                        <li class="linetop"></li>
                    </ul>
                    <ul style="background-color: #f9fafa;height:45px;">
                        <li class="linebottom">{{data.policyDetailRsp.insurePremium | money}}</li>
                        <li class="linebottom">{{data.policyDetailRsp.insureCount}}</li>
                        <li class="linebottom">{{data.policyDetailRsp.sumPremium | money}}</li>
                        <li class="linebottom">{{data.policyDetailRsp.insurerName}}</li>
                        <li class="linebottom"></li>
                    </ul>
                </div>
                <h4 class="ui-base-tit">被保人信息</h4>
                <div style="width:100%;margin-bottom:17px;border: 1px solid #e7e7e2">
                    <ul style="background-color:#eee;height:35px;">
                        <li class="linetop">与投保人关系</li>
                        <li class="linetop">姓名</li>
                        <li class="linetop">性别</li>
                        <li class="linetop">证件类型</li>
                        <li class="linetop">证件号码</li>
                    </ul>
                    <ul style="background-color: #f9fafa;height:45px;">
                        <li class="linebottom">{{data.policyDetailRsp.relationTypeStr}}</li>
                        <li class="linebottom">{{data.policyDetailRsp.insuredName}}</li>
                        <li class="linebottom">{{data.policyDetailRsp.gender}}</li>
                        <li class="linebottom">{{data.policyDetailRsp.identifyType}}</li>
                        <li class="linebottom">{{data.policyDetailRsp.identifyNumber}}</li>
                    </ul>
                    <ul style="background-color:#eee;height:35px;">
                        <li class="linetop">出生日期</li>
                        <li class="linetop">联系方式</li>
                        <li class="linetop">从事职业</li>
                        <li class="linetop">受益人</li>
                        <li class="linetop"></li>
                    </ul>
                    <ul style="background-color: #f9fafa;height:45px;">
                        <li class="linebottom" v-if="data.policyDetailRsp.birthday">{{data.policyDetailRsp.birthday | time}}</li>
                        <li class="linebottom" v-else></li>
                        <li class="linebottom">{{data.policyDetailRsp.insuredMobile}}</li>
                        <li class="linebottom">{{data.policyDetailRsp.job}}</li>
                        <li class="linebottom">{{data.policyDetailRsp.benCounts}}</li>
                        <li class="linebottom"></li>
                    </ul>
                </div>
                <h4 class="ui-base-tit">产品信息</h4>
                <div style="width:100%;margin-bottom:17px;border: 1px solid #e7e7e2">
                    <ul style="background-color:#eee;height:35px;">
                        <li class="linetop" style="width:50%;">产品ID</li>
                        <li class="linetop" style="width:50%;">产品名称</li>
                    </ul>
                    <ul style="background-color: #f9fafa;height:45px;">
                        <li class="linebottom" style="width:50%;" v-if="data.policyDetailRsp.productId">
                            <router-link to="/claim/claimsDetails">{{data.policyDetailRsp.productId}}</router-link>
                        </li>
                        <li class="linebottom" v-else></li>
                        <li class="linebottom" style="width:50%;">{{data.policyDetailRsp.productName}}</li>
                    </ul>
                </div>
                <h4 class="ui-base-tit">保障信息</h4>
                <el-table :data="tableData" style="width:100%;color:#768399" v-if="tableData.length>0">
                    <el-table-column prop="insureName" label="保障内容" align="center" style="min-width:35px;">
                    </el-table-column>
                    <el-table-column prop="insureAmount" label="保障金额" align="center">
                    </el-table-column>
                    <el-table-column prop="desc" label="保障内容说明" align="center">
                    </el-table-column>
                </el-table>
                <div style="width:100%;margin-bottom:17px;border: 1px solid #e7e7e2" v-else>
                    <ul style="background-color:#eee;height:35px;">
                        <li class="linetop" style="width:33.3%;">保障内容</li>
                        <li class="linetop" style="width:33.3%;">保障金额</li>
                        <li class="linetop" style="width:33.3%;">保障内容说明</li>
                    </ul>
                    <ul style="background-color: #f9fafa;height:35px;">
                        <li class="linebottom">{{data.policyDetailRsp.insureName}}</li>
                        <li class="linebottom">{{data.policyDetailRsp.insureAmount}}</li>
                        <li class="linebottom">{{data.policyDetailRsp.desc}}</li>
                    </ul>
                </div>
                <h4 class="ui-base-tit">附加信息</h4>
                <div style="width:100%;margin-bottom:17px;border: 1px solid #e7e7e2">
                    <ul style="background-color:#eee;height:35px;">
                        <li class="linetop" style="width:33.3%;">收件人</li>
                        <li class="linetop" style="width:33.3%;">收件号码</li>
                        <li class="linetop" style="width:33.3%;">详细地址</li>
                    </ul>
                    <ul style="background-color: #f9fafa;height:45px;">
                        <li class="linebottom" style="width:33.3%;">{{data.policyDetailRsp.receiverName}}</li>
                        <li class="linebottom" style="width:33.3%;">{{data.policyDetailRsp.receiverMobile}}</li>
                        <li class="linebottom" style="width:33.3%;">{{data.policyDetailRsp.shippingAddress}}</li>
                    </ul>
                </div>
                <h4 class="ui-base-tit">订单信息</h4>
                <div style="width:100%;margin-bottom:17px;border: 1px solid #e7e7e2">
                    <ul style="background-color:#eee;height:35px;">
                        <li class="linetop">订单号</li>
                        <li class="linetop">投保用户ID</li>
                        <li class="linetop">投保人姓名</li>
                        <li class="linetop">手机号</li>
                        <li class="linetop">投保渠道</li>
                    </ul>
                    <ul style="background-color: #f9fafa;height:45px;">
                        <li class="linebottom" v-if="data.policyDetailRsp.tradeId">
                         <router-link :to="{ path: '/dealManage/orderDetail', query: {tradeId: data.policyDetailRsp.tradeId }}">{{data.policyDetailRsp.tradeId}}</router-link>
                        </li>
                        <li class="linebottom" v-else></li>
                        <li class="linebottom" v-if="data.policyDetailRsp.userId">
                            <router-link :to="{ path: '/user/customerInfoDetails', query: {userId: data.policyDetailRsp.userId}}">{{data.policyDetailRsp.userId}}</router-link>
                        </li>
                        <li class="linebottom" v-else></li>
                        <li class="linebottom">{{data.policyDetailRsp.policyholderName}}</li>
                        <li class="linebottom">{{data.policyDetailRsp.policyholderMobile}}</li>
                        <li class="linebottom">{{data.policyDetailRsp.domainName}}</li>
                    </ul>
                </div>
                <el-row>
                    <el-col :span="22" style="text-align:center">
                        <button class="ui-btn-grey" @click="goBack">返回</button>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import config from '@api/config';
    import {
        downloadExecl
    } from '@api/excel.js';
    import {
        trim
    } from '@src/utils/util';
    export default {
        data() {
            return {
                //listLoading: false,
                createTime: '',
                lastLoginTime: '',
                query: {
                    url: 'policymanager/findPolicyDetails',
                    detailId: this.$route.query.detailId,
                   },
                data: {
                    policyDetailRsp: []
                },
                tableData:[]
            }
        },
        computed: {},
        created() {
            this.search();
            console.log(this.$route.query.detailId)
        },
        mounted() {},
        methods: {
            goBack() {
                this.$router.push({
                    path: "/claim/toMsgList/"
                });
            },
            format(time) {
                let Stime = new Date(time);
                let year = Stime.getFullYear();
                let month = Stime.getMonth() + 1;
                let date = Stime.getDate();
                let result = year + '-' + (month >= 10 ? month : '0' + month) + '-' + (date >= 10 ? date : '0' + date);
                return result
            },
            //获取列表
            search() {
                //this.listLoading = true;
                config(this.query).then(response => {
                    //this.listLoading = false;
                    if (response.respCode === '000000') {
                        this.data = response.data;
                        if (response.data.policyDetailRsp.benefitsList[0].insureList.length>0){
                            this.tableData=response.data.policyDetailRsp.benefitsList[0].insureList;
                        }
                    }
                })
            }
        },
        filters: {
            money: function (val) {
                if (val) {
                    return '￥' + ' ' + val;
                }
            },
            time: function (val) {
                let datatime = new Date(val);
                let year = datatime.getFullYear();
                let month = datatime.getMonth();
                let date = datatime.getDate();
                let hour = datatime.getHours();
                let minute = datatime.getMinutes();
                let second = datatime.getSeconds();
                let result = year + '-' + ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) + '-' + (date >= 10 ?
                        date : '0' + date) + ' ' + (hour >= 10 ? hour : '0' + hour) + ':' +
                    (minute >= 10 ? minute : '0' + minute) + ":" + (second >= 10 ? second : '0' + second);
                return result
            }
        }
    }
</script>
<style lang="less" scoped>
    .ui-base-tit {
        color: #4aa1da;
        font-weight: 700;
        font-size: 14px;
        margin-bottom: 14px;
    }

    .linetop {
        text-align: center;
        color: #768399;
        font-weight: 700;
        float: left;
        width: 20%;
        line-height: 35px;
        height: 35px;
    }

    .linebottom {
        text-align: center;
        color: #768399;
        font-weight: normal;
        float: left;
        width: 20%;
        line-height: 45px;
        height: 45px;
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