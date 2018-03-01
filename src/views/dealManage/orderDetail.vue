<template>
    <div class="ggg_user">
            <el-collapse v-model="activeNames">
                    <el-collapse-item title="订单支付信息" name="1" class="font_bold">
                        <el-form :inline="true"  class="demo-form-inline noborder">
                            <el-form-item label="订单号：">
                                    <el-input style="width:400px" :value="output.tradeId + '  [  ' + output.tradeSts + '  ]'" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="实付款：">
                                    <el-input readonly :value="output.actualPayAmount | formatMoney"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-table :data="payment" >
                            <el-table-column align="center" label="支付方式">
                                    <template scope="scope">
                                        <span>{{scope.row.paymentName}}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column align="center" label="支付金额">
                                    <template scope="scope">
                                        <span>{{scope.row.payAmount | formatMoney}}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column  align="center" label="支付时间">
                                    <template scope="scope">
                                        <span>{{scope.row.payTime | timeFilter}}</span>
                                    </template>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <el-collapse-item title="代理人佣金信息" name="2" class="font_bold">
                       <el-table :data="distribution" >
                            <el-table-column align="center" label="一级分销用户">
                                    <template scope="scope">
                                        <span>{{scope.row.commisionValue1User}}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column align="center" label="一级分销佣金">
                                    <template scope="scope">
                                        <span>{{scope.row.distribution | formatMoney}}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column align="center" label="二级分销用户">
                                    <template scope="scope">
                                        <span>{{scope.row.commisionValue2User}}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column align="center" label="二级分销佣金">
                                    <template scope="scope">
                                        <span>{{scope.row.commisionValue2 | formatMoney}}</span>
                                    </template>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <el-collapse-item title="产品信息" name="3" class="font_bold">
                        <el-table :data="product" >
                            <el-table-column align="center" label="产品ID">
                                    <template scope="scope">
                                        <el-button type="text" @click="go_productDetail()">{{scope.row.productId}}</el-button>
                                    </template>
                            </el-table-column>
                            <el-table-column align="center" label="产品名称">
                                    <template scope="scope">
                                        <span>{{scope.row.productName}}</span>
                                    </template>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <el-collapse-item title="投保信息" name="4" class="font_bold">
                        <el-table :data="insure.table1" >
                            <el-table-column align="center" label="投保用户ID">
                                    <template scope="scope">
                                        <el-button type="text" @click="go_user()">{{scope.row.userId}}</el-button>
                                    </template>
                            </el-table-column>
                            <el-table-column align="center" label="手机号码">
                                    <template scope="scope">
                                        <span>{{scope.row.mobile}}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column align="center" label="投保渠道">
                                    <template scope="scope">
                                        <span>{{scope.row.domainName}}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column align="center" label="保险公司">
                                    <template scope="scope">
                                        <span>{{scope.row.insurerName}}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column align="center" label="投保时间">
                                    <template scope="scope">
                                        <span>{{scope.row.tradeDate}}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column align="center" label="投保分数">
                                    <template scope="scope">
                                        <span>{{scope.row.insureCount}}</span>
                                    </template>
                            </el-table-column>
                        </el-table>
                        <el-table :data="insure.table2" >
                            <el-table-column align="center" label="投保人姓名">
                                    <template scope="scope">
                                        <span>{{scope.row.policyholderName}}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column align="center" label="投保人手机号码">
                                    <template scope="scope">
                                        <span>{{scope.row.mobile}}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column align="center" label="投保人证件类型">
                                    <template scope="scope">
                                        <span>{{scope.row.identifyType}}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column align="center" label="投保人证件号码">
                                    <template scope="scope">
                                        <span>{{scope.row.identifyNumber}}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column align="center" label="性别">
                                    <template scope="scope">
                                        <span>{{scope.row.sex}}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column align="center" label="生日">
                                    <template scope="scope">
                                        <span>{{scope.row.birthday | timeFilter}}</span>
                                    </template>
                            </el-table-column>
                        </el-table>
                        <el-table :data="insure.table3" >
                            <el-table-column align="center" label="投保人Email">
                                    <template scope="scope">
                                        <span>{{scope.row.email}}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column align="center" label="起保时间" >
                                    <template scope="scope">
                                        <span>{{scope.row.startTime}}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column align="center" label="终保时间" >
                                    <template scope="scope">
                                        <span>{{scope.row.endTime}}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column align="center" label="" ></el-table-column>
                            <el-table-column align="center" label="" ></el-table-column>
                            <el-table-column align="center" label="" ></el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <el-collapse-item title="保单信息" name="5" class="font_bold">
                        <el-table :data="policy" >
                            <el-table-column align="center" label="保单号">
                                    <template scope="scope">
                                        <span>{{scope.row.policyNo}}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column align="center" label="保单状态" >
                                    <template scope="scope">
                                        <span>{{scope.row.policySts}}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column align="center" label="被保人" >
                                    <template scope="scope">
                                        <span>{{scope.row.insuredName}}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column align="center" label="与投保人关系" >
                                    <template scope="scope">
                                        <span>{{scope.row.relationTypeStr}}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column align="center" label="投保计划" >
                                    <template scope="scope">
                                        <span>{{scope.row.endTime}}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column align="center" label="保障期限"  width="360">
                                    <template scope="scope">
                                        <span>{{scope.row.time}}</span>
                                    </template>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
            </el-collapse>
            <div style="padding: 20px; text-align:center;">
                <el-button v-waves  @click="go_back()" >返回</el-button>
            </div>
    </div>
</template>
<script>
import '@res/css/wjq/style.less';
import config from '@api/config';
import { downloadExecl } from '@api/excel.js';
import { parseTime } from '@filters/index.js';
import { trim } from '@src/utils/util';

export default {
    data() {
        return {
            output: '', //总数据
            activeNames: ['1', '2', '3', '4', '5'],
            payment : [], //支付方式表格
            distribution: [], //分销表格
            product: [], // 产品表格
            insure: {  //投保表格
                table1: [],
                table2: [],
                table3: []
            },
            policy: [] //保单信息表格
        }
    },
    computed: {
    },
    created() {
        this.getData(); //获取详情
    },
    mounted() {
    },
    methods: {
         //获取详情
        getData () {
            let obj = {
                  url: 'ordermanager/findTradeDetails',
                  tradeId: this.$route.query.tradeId
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                   let output = response.data;
                   if (!output) {
                       return false;
                   }
                   console.log(response.data)
                   this.output =  response.data;
                //支付表格
                   let payment = {
                       paymentName: this.output.paymentName,
                       payAmount: this.output.payAmount,
                       payTime: this.output.payTime
                   }
                   this.payment.push(payment)
                   //分销表格
                   let distribution = {
                       commisionValue1User: this.output.commisionValue1User,
                       commisionValue1: this.output.commisionValue1,
                       commisionValue2User: this.output.commisionValue2User,
                       commisionValue2: this.output.commisionValue2
                   }
                   this.distribution.push(distribution);
                //产品表格
                   let product = {
                      productId: this.output.productId,
                      productName: this.output.productName
                   }
                   this.product.push(product);
                //投保表格 insure    
                   let table1 = {
                       userId: this.output.userId,
                       mobile: this.output.mobile,
                       domainName: this.output.domainName,
                       insurerName: this.output.insurerName,
                       tradeDate: this.output.tradeDate,
                       insureCount: this.output.insureCount
                   }
                   this.insure.table1.push(table1)
                   let table2 = {
                       policyholderName: this.output.policyholderName,
                       mobile: this.output.mobile,
                       identifyType: this.output.identifyType,
                       identifyNumber: this.output.identifyNumber,
                       sex: this.output.sex,
                       birthday: this.output.birthday,
                   }
                   this.insure.table2.push(table2);
                   let table3 = {
                       email: this.output.email,
                       startTime: this.output.startTime,
                       endTime: this.output.endTime
                   }
                   this.insure.table3.push(table3)
                // 保单信息
                   let policy = {
                       policyNo: this.output.policyNo,
                       policySts: this.output.policySts,
                       insuredName: this.output.insuredName,
                       relationTypeStr: this.output.relationTypeStr,
                       time: this.output.endTime + ' - ' + this.output.startTime
                   }
                   console.log(policy)
                   this.policy.push(policy)
                } else {
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                console.log(err);
            })
        },
        go_back () {
            this.$router.go(-1)
        },
        go_productDetail () {
            if (this.output.classType == 2) {
                    this.$router.push({ path: '/product/personInsuranceProDetail',query: { productId: this.output.productId } }); //跳产品个险详情
            } else if (this.output.classType == 1) {
                this.$router.push({ path: '/product/carFindListDetail',query: { productId: this.output.productId } }); //跳产品车险详情
            }
        },
        go_user () {
            this.$router.push({ path: '/user/customerInfoDetails',query: { userId: this.output.userId } }); //用户详情
        },
        //请求提示
        message (sts, text) {
            this.$message({
                message: text,
                type: sts
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
        },
        //转换时间为天-小时-分-秒
        formatDuring (mss) {
            if (!mss) {
                return '';
            } else {
                var days = parseInt(mss / (1000 * 60 * 60 * 24));
                var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = (mss % (1000 * 60)) / 1000;
                return days + '天' + hours + '小时' + minutes + '分' + seconds + '秒' 
            }      
       }
    }
}
</script>
<style lang="less" scoped>
</style>