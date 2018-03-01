<template>
    <div class="app-container calendar-list-container productioneditor">
        <div class="filter-container">
            <el-row style="margin-bottom:20px;">
                <el-col :span="24" style="border: 1px solid #e7e7e2;border-radius: 5px;">
                    <h2 class="ui-info-tit">询价信息</h2>
                    <el-form label-width="180px" :model="data.queryPo">
                        <el-form-item label="询价流水号:">
                            <span>{{data.queryPo.serialId}}</span>
                        </el-form-item>
                        <el-form-item label="询价时间:">
                            <span>{{data.queryPo.queryTimeStr}}</span>
                        </el-form-item>
                        <el-form-item label="车主姓名:">
                            <span>{{data.queryPo.queryRealName}}</span>
                        </el-form-item>
                        <el-form-item label="车主手机号:">
                            <span>{{data.queryPo.queryMobile}}</span>
                        </el-form-item>
                        <el-form-item label="车主身份证:">
                            <span>{{data.queryPo.queryIdNo}}</span>
                        </el-form-item>
                        <el-form-item label="保险公司:">
                            <span>{{data.queryPo.insurerName}}</span>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="24" style="border: 1px solid #e7e7e2;border-radius: 5px;">
                    <h2 class="ui-info-tit">车辆信息</h2>
                    <el-form label-width="180px" :model="data.insCarInfoPo">
                        <el-form-item label="品牌型号:">
                            <span>{{data.insCarInfoPo.modelType}}</span>
                        </el-form-item>
                        <el-form-item label="车牌号:">
                            <span v-if="data.insCarInfoPo.licenseNo==0">新车未上牌</span>
                            <span v-else>{{data.insCarInfoPo.licenseNo}}</span>
                        </el-form-item>
                        <el-form-item label="车架号:">
                            <span>{{data.insCarInfoPo.vinNo}}</span>
                        </el-form-item>
                        <el-form-item label="发动机号:">
                            <span>{{data.insCarInfoPo.engineNo}}</span>
                        </el-form-item>
                        <el-form-item label="注册时间:">
                            <span>{{data.insCarInfoPo.firstRegDate}}</span>
                        </el-form-item>
                        <el-form-item label="核载人数:">
                            <span>{{data.insCarInfoPo.seats}}</span>
                        </el-form-item>
                        <el-form-item label="交强险起保时间:">
                            <span>{{data.insCarInfoPo.jqStartTimeStr}}</span>
                        </el-form-item>
                        <el-form-item label="商业险起保时间:">
                            <span>{{data.insCarInfoPo.syStartTimeStr}}</span>
                        </el-form-item>
                        <el-form-item label="是否为过户车辆:">
                            <span v-if="data.insCarInfoPo.transferFlag==0">未过户</span>
                            <span v-if="data.insCarInfoPo.transferFlag==1">已过户</span>
                        </el-form-item>
                        <el-form-item label="过户时间:" v-if="data.insCarInfoPo.transferDate">
                            <span>{{data.insCarInfoPo.transferDate}}</span>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="24" style="border: 1px solid #e7e7e2;border-radius: 5px;">
                    <h2 class="ui-info-tit">保障内容</h2>
                    <table class="ui-submod-tab" width="50%" border="1" style="text-align: center;background:#fff;border:0;border-color:#ddd;margin-left:180px;margin-bottom:22px;"
                        cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr class="ui-submod-tr-grey" style="font-size: 14px; font-weight: bold;color:#768399;background:#f9fafa">
                                <td>
                                    交强险
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr v-for="item in insurance">
                                <td>
                                    {{item.benefitName}}
                                </td>
                                <td>
                                    <span v-if="item.franchiseFlag==0"><el-checkbox  v-model="checked" :disabled="true">不计免赔</el-checkbox></span>
                                    <span v-else-if="item.franchiseFlag==1"><el-checkbox  v-model="check" :disabled="true">不计免赔</el-checkbox></span>
                                    <span v-else></span>
                                </td>
                                <td v-if="item.insuredAmount==0">
                                    不投保
                                </td>
                                <td v-if="item.insuredAmount==1">
                                    投保
                                </td>
                            </tr>
                            <tr class="ui-submod-tr-grey" style="font-size: 14px; font-weight: bold;color:#768399;background:#f9fafa">
                                <td width="35%">
                                    商业险
                                </td>
                                <td width="35%"></td>
                                <td width="30%"></td>
                            </tr>
                            <tr v-for="item in business">
                                <td>
                                    {{item.benefitName}}
                                </td>
                                <td>
                                    <span v-if="item.franchiseFlag==0"><el-checkbox  v-model="checked" :disabled="true">不计免赔</el-checkbox></span>
                                    <span v-else-if="item.franchiseFlag==1"><el-checkbox  v-model="check" :disabled="true">不计免赔</el-checkbox></span>
                                    <span v-else></span>
                                </td>
                                <td v-if="item.benefitCode=='Z1'">
                                    <span v-if="item.insuredAmount==1">投保</span>
                                    <span v-if="item.insuredAmount==0">不投保</span>
                                </td>
                                <td v-if="item.benefitCode=='Z2'">
                                    <span v-if="item.insuredAmount==1">投保</span>
                                    <span v-if="item.insuredAmount==0">不投保</span>
                                </td>
                                <td v-if="item.benefitCode=='Z3'">
                                    <span v-if="item.insuredAmount==1">投保</span>
                                    <span v-else>{{item.insuredAmount}}</span>
                                </td>
                                <td v-if="item.benefitCode=='Z4'">
                                    <span v-if="item.insuredAmount==0">不投保</span>
                                    <span v-else>{{item.insuredAmount}}</span>
                                </td>
                                <td v-if="item.benefitCode=='Z5'">
                                    <span v-if="item.insuredAmount==0">不投保</span>
                                    <span v-else>{{item.insuredAmount}}</span>
                                </td>
                            </tr>
                            <tr class="ui-submod-tr-grey" style="font-size: 14px; font-weight: bold;color:#768399;background:#f9fafa">
                                <td width="35%">
                                    附加险
                                </td>
                                <td width="35%"></td>
                                <td width="30%"></td>
                            </tr>
                            <tr v-for="item in add">
                                <td>
                                    {{item.benefitName}}
                                </td>
                                <td>
                                    <span v-if="item.franchiseFlag==0"><el-checkbox  v-model="checked" :disabled="true">不计免赔</el-checkbox></span>
                                    <span v-else-if="item.franchiseFlag==1"><el-checkbox  v-model="check" :disabled="true">不计免赔</el-checkbox></span>
                                    <span v-else></span>
                                </td>
                                <td v-if="item.benefitCode=='F1'">
                                    <span v-if="item.insuredAmount==0">不投保</span>
                                    <span v-else>{{item.insuredAmount}}</span>
                                </td>
                                <td v-if="item.benefitCode=='F2'">
                                    <span v-if="item.insuredAmount==1">国产玻璃</span>
                                    <span v-if="item.insuredAmount==2">进口玻璃</span>
                                    <span v-if="item.insuredAmount==0">不投保</span>
                                </td>
                                <td v-if="item.benefitCode=='F3'">
                                    <span v-if="item.insuredAmount==1">投保</span>
                                    <span v-if="item.insuredAmount==0">不投保</span>
                                </td>
                                <td v-if="item.benefitCode=='F4'">
                                    <span v-if="item.insuredAmount==1">投保</span>
                                    <span v-if="item.insuredAmount==0">不投保</span>
                                </td>
                                <td v-if="item.benefitCode=='F5'">
                                    <span v-if="item.insuredAmount==1">投保</span>
                                    <span v-if="item.insuredAmount==0">不投保</span>
                                </td>
                                <td v-if="item.benefitCode=='F6'">
                                    <span v-if="item.insuredAmount==1">投保</span>
                                    <span v-if="item.insuredAmount==0">不投保</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="24" style="border: 1px solid #e7e7e2;border-radius: 5px;">
                    <h2 class="ui-info-tit">保费信息</h2>
                    <el-form label-width="180px" :model="data.queryInsPricePo">
                        <el-form-item label="">
                            <el-radio v-model="data.queryInsPricePo.querySts" label="20" :disabled="true">询价成功</el-radio>
                            <el-radio v-model="data.queryInsPricePo.querySts" label="-20" :disabled="true">询价失败</el-radio>
                        </el-form-item>
                        <el-form-item label="商业险:"  v-show="data.queryInsPricePo.querySts==20">
                            <el-input style="width:265px;" v-model="data.queryInsPricePo.syPreium" :disabled="true"></el-input>
                            <span style="margin-left:0px;">元</span>
                        </el-form-item>
                        <el-form-item label="交强险:"  v-show="data.queryInsPricePo.querySts==20">
                            <el-input style="width:265px;" v-model="data.queryInsPricePo.jqPreium" :disabled="true"></el-input>
                            <span style="margin-left:0px;">元</span>
                        </el-form-item>
                        <el-form-item label="代缴车船税:"  v-show="data.queryInsPricePo.querySts==20">
                            <el-input style="width:265px;" v-model="data.queryInsPricePo.ccsPreium" :disabled="true"></el-input>
                            <span style="margin-left:0px;">元</span>
                        </el-form-item>
                        <el-form-item label="商业险明细:"  v-show="data.queryInsPricePo.querySts==20">
                            <img :src="data.queryInsPricePo.resultImg"  v-if="data.queryInsPricePo.resultImg" width="120" height="120"/>
                        </el-form-item>
                         <el-form-item style="position:relative;height:120px;" v-show="data.queryInsPricePo.querySts==-20">
                            <el-input type="textarea" placeholder="询价不成功理由" :rows="5" style="width:822px;" v-model="data.queryInsPricePo.queryResult" readonly="readonly"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <div class="btn">
                <input type="button" value="返回" class="ui-btn-grey" @click="goback">
            </div>
        </div>
    </div>
</template>
<script>
    import config from '@api/config';
    import '@res/css/car.less';
    import {
        parseTime
    } from '@filters/index.js';
    import {
        trim
    } from '@src/utils/util';
    import {
        downloadExecl
    } from '@api/excel.js';
    export default {
        data() {
            return {
                radio:'1',
                params: {
                    url: 'carinstallments/getQueryInfo',
                    serialId: this.$route.query.serialId
                },
                data: {
                    insCarInfoPo: {},
                    queryPo: {},
                    queryBenefitsList: {},
                    queryInsPricePo: {}
                },
                checked: false,
                check: true,
                backIdCardImgSts: '',
                frontIdCardImgSts: '',
                travelLicenseImgSts: '',
                insurance: [],
                business: [],
                add: []
            }
        },
        created() {
            this.getData();
        },
        methods: {
            goback() {
                this.$router.go(-1);
            },
            getData() {
               config(this.params).then(response => {
                    if (response.respCode === '000000') {
                        this.data = response.data;
                        this.data.queryInsPricePo.querySts=this.data.queryInsPricePo.querySts+'';
                        console.log(typeof(this.data.queryInsPricePo.querySts))
                        this.data.queryPo.insurerName = response.data.queryInsPricePo.insurerName;
                        if (this.data.queryInsPricePo.syPreium) {
                            this.data.queryInsPricePo.syPreium = this.data.queryInsPricePo.syPreium / 100;
                        }
                        if (this.data.queryInsPricePo.ccsPreium) {
                            this.data.queryInsPricePo.ccsPreium = this.data.queryInsPricePo.ccsPreium / 100;
                        }
                        if (this.data.queryInsPricePo.jqPreium) {
                            this.data.queryInsPricePo.jqPreium = this.data.queryInsPricePo.jqPreium / 100;
                        }
                      for (let i = 0; i < this.data.queryBenefitsList.length; i++) {
                            if (this.data.queryBenefitsList[i].benefitCode.charAt(0) == 'J') {
                                this.insurance.push(this.data.queryBenefitsList[i])
                            }
                            if (this.data.queryBenefitsList[i].benefitCode.charAt(0) == 'Z') {
                                this.business.push(this.data.queryBenefitsList[i])
                            }
                            if (this.data.queryBenefitsList[i].benefitCode.charAt(0) == 'F') {
                                this.add.push(this.data.queryBenefitsList[i])
                            }

                        }
                    } else {
                        this.$message.error(response.respMsg)
                    }

                })


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