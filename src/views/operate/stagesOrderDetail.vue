<template>
    <div class="ggg_user">
         <h2>订单信息</h2>
        <div class="text">
             <el-form label-position="center" label-width="120px" class="noborder">
                    <el-form-item label="订单编号">
                        <span class="el-input" v-text="EditForm.tradeDetailsPo.tradeId"></span>
                    </el-form-item>
                    <el-form-item label="车牌号">
                        <span class="el-input" v-text="EditForm.tradeDetailsPo.licenseNo == 0 ? '新车未上牌' : EditForm.tradeDetailsPo.licenseNo"></span>
                    </el-form-item>
                     <el-form-item label="保险公司">
                        <span class="el-input" v-text="EditForm.insurersPo.insurerName"></span>
                    </el-form-item>
                    <el-form-item label="交强险起保时间">
                        <span class="el-input" v-text="EditForm.tradeRecordsPo.jqStartTimeStr"></span>
                    </el-form-item>
                    <el-form-item label="商业险起保时间">
                        <span class="el-input" v-text="EditForm.tradeRecordsPo.startTimeStr"></span>
                    </el-form-item>
                    <el-form-item label="交强险">
                        <span class="el-input">{{EditForm.tradeRecordsPo.jqPreium | formatMoney}}</span>
                    </el-form-item>
                    <el-form-item label="代缴车船税">
                        <span class="el-input" >{{EditForm.tradeRecordsPo.ccsPreium | formatMoney}}</span>
                    </el-form-item>
                    <el-form-item label="商业险">
                        <span class="el-input">{{EditForm.tradeRecordsPo.syPreium | formatMoney}}</span>
                    </el-form-item>
                    <el-form-item label="商业险明细">
                        <span class="el-input">
                            <img :src="EditForm.tradeDetailsPo.syxDetailImg" alt="">
                        </span>
                    </el-form-item>
            </el-form>
        </div>
        <div style="padding-left:80px" class="test">
            <el-tabs type="border-card" :value="tabPosition">
                <el-tab-pane label="订单详情">
                      <el-form label-position="center" label-width="120px" class="noborder form">
                            <el-form-item label="保障内容">
                                <div class="el-input" >
                                    <table class="userTable" border="1">
                                        <tr>
                                            <td>保障内容</td>
                                            <td>保额</td>
                                            <td>不计免赔</td>
                                        </tr>
                                        <tr v-for="item in EditForm.tradeBenefitsList">
                                            <td v-text="item.benefitName"></td>
                                            <td>
                                                <span v-if="item.insuredAmount == 1">投保</span>
                                                <span v-else-if="item.insuredAmount == 0">不投保</span>
                                                <span v-else>{{item.insuredAmount | formatMoney}}</span>
                                            </td>
                                            <td>
                                                <span v-if="item.franchiseFlag == 1">是</span>
                                                <span v-else>不是</span>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </el-form-item>
                            <el-form-item label="车主信息">
                                <div class="el-input" >
                                    <table class="userTable" border="1">
                                        <tr>
                                            <td>车主姓名</td>
                                            <td v-text="EditForm.tradeDetailsPo.insuredName"></td>
                                        </tr>
                                        <tr>
                                            <td>身份证号码</td>
                                            <td v-text="EditForm.tradeDetailsPo.identifyNumber"></td>
                                        </tr>
                                        <tr>
                                            <td>联系电话</td>
                                            <td v-text="EditForm.tradeDetailsPo.mobile"></td>
                                        </tr>
                                    </table>
                                </div>
                            </el-form-item>
                            <el-form-item label="保单邮寄信息">
                                <div class="el-input" >
                                    <table class="userTable" border="1">
                                        <tr>
                                            <td>收件人</td>
                                            <td v-text="EditForm.tradeRecordsPo.cneeName"></td>
                                        </tr>
                                        <tr>
                                            <td>联系方式</td>
                                            <td v-text="EditForm.tradeRecordsPo.cneeMobile"></td>
                                        </tr>
                                        <tr>
                                            <td>详细地址</td>
                                            <td v-text="EditForm.tradeRecordsPo.shippingAddress"></td>
                                        </tr>
                                    </table>
                                </div>
                            </el-form-item>
                            <el-form-item label="车辆信息">
                                <div class="el-input" >
                                    <table class="userTable" border="1">
                                        <tr>
                                            <td>品牌型号</td>
                                            <td v-text="EditForm.tradeDetailsPo.vehicleModel"></td>
                                        </tr>
                                        <tr>
                                            <td>车辆识别代码</td>
                                            <td v-text="EditForm.tradeDetailsPo.vehicleFrameNo"></td>
                                        </tr>
                                        <tr>
                                            <td>发动机号</td>
                                            <td v-text="EditForm.tradeDetailsPo.engineNo"></td>
                                        </tr>
                                        <tr>
                                            <td>注册时间</td>
                                            <td v-text="EditForm.tradeDetailsPo.registerDateStr"></td>
                                        </tr>
                                        <tr>
                                            <td>核载人数</td>
                                            <td v-text="EditForm.tradeDetailsPo.seats"></td>
                                        </tr>
                                        <tr>
                                            <td>交强险起保时间</td>
                                            <td v-text="EditForm.tradeRecordsPo.jqStartTimeStr"></td>
                                        </tr>
                                        <tr>
                                            <td>商业险起保时间</td>
                                            <td v-text="EditForm.tradeRecordsPo.startTimeStr"></td>
                                        </tr>
                                    </table>
                                </div>
                            </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="证件信息">
                       <el-form label-position="center" label-width="120px" class="noborder form">
                            <el-form-item label="身份证正面照">
                                <span class="el-input" >
                                    <img :src="EditForm.tradeDetailsPo.frontIdCardImg" alt="">
                                </span>
                            </el-form-item>
                            <el-form-item label="身份证反面照">
                                <span class="el-input" >
                                    <img :src="EditForm.tradeDetailsPo.backIdCardImg" alt="">
                                </span>
                            </el-form-item>
                            <el-form-item label="行驶证">
                                <span class="el-input" >
                                    <img :src="EditForm.tradeDetailsPo.travelLicenseImg" alt="">
                                </span>
                            </el-form-item>
                        </el-form>
                </el-tab-pane>
                <el-tab-pane label="绑卡信息">
                     <el-form label-position="center" label-width="120px" class="noborder form">
                            <el-form-item label="绑卡信息">
                                <div class="el-input" >
                                    <table class="userTable" border="1">
                                        <tr>
                                            <td>真实姓名</td>
                                            <td>身份证号</td>
                                            <td>银行卡号</td>
                                            <td>开户行</td>
                                            <td>手机号</td>
                                        </tr>
                                        <tr v-for="item in EditForm.loanUserBankCardPoList">
                                            <td v-text="item.name"></td>
                                            <td v-text="item.cardId"></td>
                                            <td v-text="item.bankCardNo"></td>
                                            <td v-text="item.bankName"></td>
                                            <td v-text="item.phone"></td>
                                        </tr>
                                    </table>
                                </div>
                            </el-form-item>
                     </el-form>
                </el-tab-pane>
                <el-tab-pane label="联系人信息" name="aa">
                    <el-form label-position="center" label-width="120px" class="form" :class="{noborder: !isEdit}" ref="table"  :model="EditForm">
                            <el-form-item label="联系人信息">
                                <div class="el-input" >
                                    <table class="userTable" border="1">
                                        <tr>
                                            <td>角色</td>
                                            <td>姓名</td>
                                            <td>手机号</td>
                                        </tr>
                                        <tr >
                                            <td>首要联系人</td>
                                            <template v-for="(item, index) in EditForm.loanUserContactPoList" v-if="item.contactTypeId == 1">
                                                <td>
                                                    <el-form-item label="" label-width="0px" :prop="'loanUserContactPoList.' + index + '.name'" :rules="[{validator: name, trigger: 'blur'}]">
                                                        <el-input :maxlength=8 v-model="item.name"   placeholder="" :readonly="!isEdit"></el-input>
                                                    </el-form-item>
                                                </td>
                                                <td>
                                                    <el-form-item label="" label-width="0px" :prop="'loanUserContactPoList.' + index + '.phone'" :rules="[{validator: phone, trigger: 'blur'}]">
                                                        <el-input :maxlength=11 v-model="item.phone"  placeholder="" :readonly="!isEdit"></el-input>
                                                    </el-form-item>
                                                </td>
                                            </template>
                                        </tr>
                                         <tr>
                                            <td>次要联系人</td>
                                            <template v-for="(item, index) in EditForm.loanUserContactPoList" v-if="item.contactTypeId == 2">
                                                 <td>
                                                    <el-form-item label="" label-width="0px" :prop="'loanUserContactPoList.' + index + '.name'" :rules="[{validator: name, trigger: 'blur'}]">
                                                        <el-input :maxlength=8 v-model="item.name"   placeholder="" :readonly="!isEdit"></el-input>
                                                     </el-form-item>
                                                </td>
                                                <td>
                                                    <el-form-item label="" label-width="0px" :prop="'loanUserContactPoList.' + index + '.phone'" :rules="[{validator: phone, trigger: 'blur'}]">
                                                        <el-input :maxlength=11 v-model="item.phone"  placeholder="" :readonly="!isEdit"></el-input>
                                                    </el-form-item>
                                                </td>
                                            </template>
                                        </tr>
                                         <tr>
                                            <td>第三联系人</td>
                                            <template v-for="(item, index) in EditForm.loanUserContactPoList" v-if="item.contactTypeId == 3">
                                                 <td>
                                                     <el-form-item label="" label-width="0px" :prop="'loanUserContactPoList.' + index + '.name'" :rules="[{validator: name, trigger: 'blur'}]">
                                                        <el-input :maxlength=8 v-model="item.name"   placeholder="" :readonly="!isEdit"></el-input>
                                                     </el-form-item>
                                                </td>
                                                <td>
                                                    <el-form-item label="" label-width="0px" :prop="'loanUserContactPoList.' + index + '.phone'" :rules="[{validator: phone, trigger: 'blur'}]">
                                                        <el-input :maxlength=11 v-model="item.phone"  placeholder="" :readonly="!isEdit"></el-input>
                                                    </el-form-item>
                                                </td>
                                            </template>
                                        </tr>
                                    </table>
                                </div>
                            </el-form-item>
                             <el-form-item>
                                <el-button type="primary" v-if="!isEdit" v-waves @click="isEdit = true">编辑</el-button>
                                <el-button type="primary" v-else v-waves @click="subcontacts('table')">保存</el-button>
                            </el-form-item>
                     </el-form>
                </el-tab-pane>
                <el-tab-pane label="还款计划">
                     <el-form label-position="center" label-width="120px" class="noborder form">
                        <el-form-item label="还款计划">
                            <table class="userTable" border="1" >
                                <tr>
                                    <td>期数</td>
                                    <td>状态</td>
                                    <td>本金</td>
                                    <td>利息</td>
                                    <td>手续费</td>
                                    <td>罚息</td>
                                    <td>应还（元）</td>
                                    <td>已还（元）</td>
                                    <td>未还（元）</td>
                                    <td>还款时间</td>
                                    <td>实际还款时间</td>
                                    <td>逾期天数</td>
                                </tr>
                                <tr v-for="item in EditForm.loanRepaymentPlanPoList">
                                    <td v-text="item.period"></td>
                                    <td>
                                        <span v-show="item.status == -10">已删除</span>
                                        <span v-show="item.status == 20">未还款</span>
                                        <span v-show="item.status == 10">已还款</span>
                                    </td>
                                    <td>{{item.duePrincipal | formatMoney}}</td>
                                    <td>{{item.dueInterest | formatMoney}}</td>
                                    <td>{{item.dueServiceFee | formatMoney}}</td>
                                    <td>{{item.dueLateInterest | formatMoney}}</td>
                                    <td>{{item.dueAmount | formatMoney}}</td>
                                    <td>{{item.repaidAmount | formatMoney}}</td>
                                    <td>{{item.dueAmount ? item.dueAmount : 0 - item.repaidAmount ? item.repaidAmount : 0 | formatMoney}}</td>
                                    <td>{{item.repayDate | timeFilter}}</td>
                                    <td>{{item.actualRepayDate | timeFilter}}</td>
                                    <td>{{item.overdueDays}}</td>
                                </tr>
                            </table>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="text" style="padding-top:20px;" v-if="row.tradeSts != -11">
             <el-form ref="submit" label-position="center" label-width="100px" :model="form" >
                    <el-form-item label="保单号" prop="policyNo">
                        <el-col :span="6">
                            <el-input :maxlength="25" v-model="form.policyNo" placeholder="请输入保单号"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="审核意见" prop="rejectReason">
                        <el-col :span="6">
                            <el-input type="textarea" :rows="4" placeholder="请输入审核意见" v-model="form.rejectReason"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item v-if="row.status == 10">
                        <el-button type="primary" v-waves @click="submitData('submit', 11)" >代扣首付并通过审核</el-button>
                        <el-button  type="primary" v-waves @click="submitData('submit', 12)">审核不通过</el-button>
                    </el-form-item>
                    <el-form-item v-if="row.status == 11 || row.status == 12">
                        <el-button type="primary" v-waves  @click="submitData('submit')">编辑</el-button>
                        <el-button  v-waves @click="$router.go(-1)">返回</el-button>
                    </el-form-item>
                    <el-form-item v-if="!row.status ">
                        <el-button  v-waves @click="$router.go(-1)">返回</el-button>
                    </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import '@res/css/wjq/style.less';
import config from '@api/config';
import {validate } from '@src/utils/gxfCommin';
export default {
    data() {
        return {
            tabPosition: '',
            row: '',
            EditForm: {
                insurersPo: '',
                loanRepaymentPlanPoList: '',
                loanUserBankCardPoList: '',
                loanUserContactPoList: [],
                tradeBenefitsList: '',
                tradeDetailsPo: '',
                tradeRecordsPo: ''
            },
            userId: '',
            form: {
                    policyNo: '',
                    rejectReason: ''
            },
            isEdit: false
        }
    },
    created() {
            this.row = this.$route.query.row ? JSON.parse(this.$route.query.row) : '';
            this.getDetail();
    },
    methods: {
        name (rule, value, callback) {
            //  console.log(value)
            if (value && !validate.userName(value)) {
                callback(new Error('联系人姓名为2-8位中文'));
                return false;
            }
            callback();
        },
        phone (rule, value, callback) {
            if (value && !validate.validatPhone(value)) {
                callback(new Error('手机格式不正确'));
                return false;
            }
            callback();
        },
        getDetail () {
            let obj = {
                url: '/carinstallments/getInstalmentOrderInfo',
                tradeId: this.row.tradeId
            };
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    console.log(response.data)
                    this.EditForm = response.data;
                    let loanUserContactPoList = [
                        {phone: '', name: '', contactTypeId: 1, id: ''},
                        {phone: '', name: '', contactTypeId: 2, id: ''},
                        {phone: '', name: '', contactTypeId: 3, id: ''}
                    ];
                    for (let i = 0; i < this.EditForm.loanUserContactPoList.length; i++) {
                        let item = this.EditForm.loanUserContactPoList[i]
                        console.log(item)
                        if (item.userId) {
                            this.userId = item.userId;
                        }
                        if (item.contactTypeId == 1) {
                            loanUserContactPoList[0] = {
                                phone: item.phone,
                                name: item.name,
                                contactTypeId: 1,
                                id: item.id
                            }
                        }
                        if (item.contactTypeId == 2) {
                             loanUserContactPoList[1] = {
                                phone: item.phone,
                                name: item.name,
                                contactTypeId: 2,
                                id: item.id
                            }
                        }
                        if (item.contactTypeId == 3) {
                             loanUserContactPoList[2] = {
                                phone: item.phone,
                                name: item.name,
                                contactTypeId: 3,
                                id: item.id
                            }
                        }
                    }
                    this.EditForm.loanUserContactPoList = loanUserContactPoList;
                    this.form.policyNo = this.EditForm.tradeDetailsPo.policyNo
                    this.form.rejectReason = this.EditForm.rejectReason
                } else {
                    this.$message.warning(response.respMsg)
                }
            }).catch(err => {

            })
        },
        //提交联系人
        subcontacts (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let number = 0;
                    let arr = [];
                    for (let i = 0; i < this.EditForm.loanUserContactPoList.length; i++) {
                            let item = this.EditForm.loanUserContactPoList[i];
                            if (item.phone && arr.indexOf(item.phone) == -1) {
                                arr.push(item.phone)
                            } else {
                                if (item.phone) {
                                   this.$message.warning('联系人电话重复')
                                   return false;
                                }
                            }
                            if (item.phone && item.name) {
                                number++;
                            }
                    }
                    // console.log(arr)
                    if (number < 2) {
                        this.$message.warning('至少填写两个人的姓名和电话')
                    }
                    let obj = {
                        url: 'carinstallments/updateUserContactInfo',
                        loanUserContactVoList: this.EditForm.loanUserContactPoList,
                        userId: this.userId
                    }
                    // console.log(this.EditForm.loanUserContactPoList)
                    config(obj).then(response => {
                        if (response.respCode === '000000') {
                            this.$message.success(response.respMsg)
                            this.isEdit = false;
                        } else {
                            this.$message.warning(response.respMsg)
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            // console.log(this.EditForm.loanUserContactPoList)
        },
        submitData (formName, number) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.form.id = this.EditForm.loanOrderId;
                    this.form.tradeId = this.EditForm.tradeDetailsPo.tradeId
                    if (number) {
                        this.form.url = 'carinstallments/auditCarInstalmentResult';
                        this.form.status = number;
                    } else {
                        this.form.url = 'carinstallments/updateInstallmentInfo';
                    }
                    console.log(this.form)
                    config(this.form).then(response => {
                        if (response.respCode === '000000') {
                            this.$message.success(response.respMsg)
                            this.$router.go(-1);
                        } else {
                            this.$message.warning(response.respMsg)
                        }
                    }).catch(err => {

                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
    filters: {
        //金钱
        formatMoney (val) {
            if (!val) {
                return '0.00';
            } else {
                return (val/100).toFixed(2);
            }
        },
            //时间过滤
        timeFilter (val) {
            if (!val) {
                return '';
            } else {
                var date = new Date(val);
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                let D = date.getDate() + ' ';
                let h = date.getHours() + ':';
                let m = (date.getMinutes()< 10 ? '0' + date.getMinutes() : date.getMinutes())+ ':';
                let s = date.getSeconds();
                return Y + M + D + h + m + s;
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .text{
        padding-left:100px;
    }
    .test img{
       width:150px
    }
     h2{
        margin-left: 18px;
        line-height: 43px;
        font-size: 14px;
        color: #3498da;
        font-weight: bold;
    }
    .form table{
        width:auto;
        min-width: 10px;
        border:0;
    }
    .userTable td{
        padding: 20px;
        text-align: center;
    }
</style>
