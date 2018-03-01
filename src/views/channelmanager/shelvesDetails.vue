<template>
    <div>
        <div class="www-page shelvesDetails">
            <div class="ui-info-main">
                <h2 class="ui-info-tit">渠道信息</h2>
                <ul class="ui-info-list" v-for="(item,index) in domainList" v-bind:key="index">
                    <li class="ui-info-item ui-info-item-grey"> 渠道ID:<span>{{item.domainId}}</span></li>
                    <li class="ui-info-item ui-info-item-grey"> 渠道名称:<span>{{item.domainName}}</span></li>
                    <li class="ui-info-item ui-info-item-grey">合作时间:<span style="margin-right:0px;">{{item.effTimestr}}至</span><span style="margin-left:0px;">{{item.expTimestr}}</span></li>
                </ul>
                <div class="container" v-for="(item,index) in productsPoList" v-bind:key="index">

                    <h2 class="ui-info-tit">产品{{index+1}}</h2>
                    <ul class="ui-info-list">
                        <li class="ui-info-item ui-info-item-grey"> 产品ID:<span>{{item.productId}}</span></li>
                        <li class="ui-info-item ui-info-item-grey"> 渠道名称:<span style="color: rgb(0, 0, 255);cursor: pointer;">{{item.productName}}</span></li>
                        <li class="ui-info-item ui-info-item-grey">总库存:<span v-if="item.maxQuantity==-1">不限</span><span v-else>{{item.maxQuantity}}</span></li>
                        <li class="ui-info-item ui-info-item-grey">剩余库存:<span v-if="item.maxQuantity==-1&&isshow">不限{{item.shengyuQuantity}}</span><span v-else-if="item.maxQuantity==-1&&!isshow">不限</span>
                            <span v-else>{{item.maxQuantity}}</span>
                        </li>
                    </ul>
                    <h2 class="ui-info-tit">配置信息</h2>
                    <el-form ref="ruleForm2" :model="item" label-width="156px" v-show="isshow">
                        <el-form-item label="已分配数量">
                            <span>{{item.domainQuantity}}份</span>
                        </el-form-item>
                        <el-form-item label="分配数量">
                            <el-input v-model="item.updateQuantity" style="width:265px;" :maxlength="10" @input="total(index)"></el-input>
                            <span v-if="item.maxQuantity==-1">份 (*分配数量不限)</span>
                            <span v-else>(*分配数量最多为{{item.shengyuQuantity}}份)</span>
                        </el-form-item>
                        <el-form-item label="库存总量">
                            <el-input v-model="item.max" style="width:265px;" readonly></el-input>
                            <span>份</span>
                        </el-form-item>
                        <el-form-item label="一级佣金">
                            <el-input v-model="item.commisionValue1" style="width:265px;"></el-input>
                            <span>%</span>
                        </el-form-item>
                        <el-form-item label="二级佣金">
                            <el-input v-model="item.commisionValue2" style="width:265px;"></el-input>
                            <span>%</span>
                        </el-form-item>
                        <el-form-item label="交强险一级佣金" v-if="item.classType==1">
                            <el-input v-model="item.vehicleCommisionValue1" style="width:265px;"></el-input>
                            <span>%</span>
                        </el-form-item>
                        <el-form-item label="交强险二级佣金" v-if="item.classType==1">
                            <el-input v-model="item.vehicleCommisionValue2" style="width:265px;"></el-input>
                            <span>%</span>
                        </el-form-item>
                        <el-form-item label="上架时间">
                            <el-date-picker v-model="createTime[index]" type="datetime" placeholder="请输入上架时间" style="width:265px;" :editable="false">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="下架时间">
                            <el-date-picker v-model="lastLoginTime[index]" type="datetime" placeholder="请输入下架时间" style="width:265px;" :editable="false">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="支付方式">
                            <el-checkbox-group v-model="checkList[index]">
                                <el-checkbox :label="item.paymentName" v-for="(item,index) in paymentList" v-bind:key="index"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-form>
                    <el-form :model="item" label-width="156px" v-show="!isshow">
                        <el-form-item label="当前库存">
                            <span>{{item.domainQuantity}}份</span>
                        </el-form-item>
                        <el-form-item label="分配数量">
                            <span>{{item.updateQuantity}}份</span>
                        </el-form-item>
                        <el-form-item label="库存总量">
                            <span>{{item.max}}份</span>
                        </el-form-item>
                        <el-form-item label="一级佣金">
                            <span>{{item.commisionValue1}}%</span>
                        </el-form-item>
                        <el-form-item label="二级佣金">
                            <span>{{item.commisionValue2}}%</span>
                        </el-form-item>
                        <el-form-item label="交强险一级佣金" v-if="item.classType==1">
                            <span>{{item.vehicleCommisionValue1}}%</span>
                        </el-form-item>
                        <el-form-item label="交强险二级佣金" v-if="item.classType==1">
                            <span>{{item.vehicleCommisionValue2}}%</span>
                        </el-form-item>
                        <el-form-item label="上架时间">
                            <span>{{createTime[index] |  time}}</span>
                        </el-form-item>
                        <el-form-item label="下架时间">
                            <span>{{lastLoginTime[index] | time}}</span>
                        </el-form-item>
                        <el-form-item label="支付方式">
                            <span v-for="(item,indexs) in checkList[index]" v-bind:key="indexs" style="margin-right:5px;">{{item}}</span>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="btn">
                <input type="button" value="下一步" class="ui-btn-blue" @click="submitForm" v-show="isshow">
                <input type="button" value="返回" class="ui-btn-grey" @click="goBack" v-show="isshow">
                <input type="button" value="完成" class="ui-btn-blue" v-show="!isshow" @click="submit">
                <input type="button" value="返回修改" class="ui-btn-grey" @click="isshow=true" v-show="!isshow">
            </div>
        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import '@res/css/shelvesDetails.less';
    import config from '@api/config';
    import {
        trim
    } from '@src/utils/util';
    export default {
        data() {
            return {
                query: {
                    url: 'channelProduct/selectUpProduct',
                    domainIds: this.$route.query.domainIds,
                    productIds: this.$route.query.productIds
                },
                domainList: [],
                productsPoList: [],
                paymentList: [],
                checkList: [],
                isshow: true,
                createTime: [],
                lastLoginTime: [],
                now: new Date().getTime(),
                maxQuantity: [],
            }
        },
        computed: {},
        created() {
            this.search();
        },
        mounted() {},
        methods: {
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
            submit() {
                let _this = this;
                let domainIds = "";
                let domainProductsVoList = [];
                for (let i = 0; i < this.domainList.length; i++) {
                    domainIds += this.domainList[i].domainId + ";";
                }
                domainIds = domainIds.substring(0, domainIds.length - 1);
                for (let i = 0; i < this.productsPoList.length; i++) {
                    let obj = {};
                    obj.commisionFirst = this.productsPoList[i].commisionValue1;
                    obj.commisionSecond = this.productsPoList[i].commisionValue2;
                    obj.domainQuantity = this.productsPoList[i].updateQuantity;
                    obj.effTimestr = this.format(this.createTime[i]);
                    obj.expTimestr = this.format(this.lastLoginTime[i]);
                    obj.maxQuantity = this.productsPoList[i].max;
                    obj.productId = this.productsPoList[i].productId;
                    obj.vehicleCommisionValue1 = this.productsPoList[i].vehicleCommisionValue1;
                    obj.vehicleCommisionValue2 = this.productsPoList[i].vehicleCommisionValue2;
                    let arr = this.checkList[i];
                    let result = ''
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] == '连连支付') {
                            result += 30 + ";"
                            console.log(result)
                        }
                        if (arr[i] == '支付宝支付') {
                            result += 10 + ";"
                        }
                        if (arr[i] == '微信支付') {
                            result += 20 + ";"
                        }
                    }
                    result = result.substring(0, result.length - 1);
                    obj.paymentTypeStr = result;
                    domainProductsVoList.push(obj);

                }
                let params = {
                    url: 'channelProduct/addDomainProduct',
                    domainIds: domainIds,
                    domainProductsVoList: domainProductsVoList
                }
                config(params).then(response => {
                    if (response.respCode === '000000') {
                        this.$alert('您新增合作产品的请求已提交!', '提示', {
                            confirmButtonText: '确定',
                            callback: function () {
                                _this.$router.push({
                                    path: "/channelmanager/channelinformanager",
                                })
                            }
                        });
                    } else {
                        this.$message({
                            message: response.respMsg,
                            type: 'warning'
                        })
                    }
                })
            },
            total(i) {
                let reg = /^([1-9]\d*|[0]{1,1})$/;
                if (reg.test(this.productsPoList[i].updateQuantity)) {
                    let val = parseInt(this.productsPoList[i].updateQuantity) + parseInt(
                        this.productsPoList[i].domainQuantity);
                    this.$set(this.productsPoList[i], 'max', val)
                } else {
                    let val = parseInt(this.productsPoList[i].domainQuantity);
                    this.$set(this.productsPoList[i], 'max', val)
                }
            },
            goBack() {
                this.$router.go(-1);
            },
            submitForm() {
                for (let i = 0; i < this.productsPoList.length; i++) {
                    let first = this.productsPoList[i].updateQuantity;
                    let sec = this.productsPoList[i].commisionValue1;
                    let thr = this.productsPoList[i].commisionValue2;
                    let max = this.productsPoList[i].maxQuantity;
                    let type = this.productsPoList[i].classType;
                    let four = this.productsPoList[i].vehicleCommisionValue1;
                    let five = this.productsPoList[i].vehicleCommisionValue2;
                    let sub = this.createTime[i];
                    let sum = this.lastLoginTime[i];
                    let reg = /^([1-9]\d*|[0]{1,1})$/;
                    let reg1 = /^100$|^(\d|[1-9]\d)$/;
                    if (first == undefined || first == "") {
                        this.$message({
                            message: '分配数量不能为空！',
                            type: 'warning'
                        })
                        return false
                    }
                    if (!reg.test(first)) {
                        this.$message({
                            message: '分配数量只能是大于等于零的正整数！',
                            type: 'warning'
                        })
                        return false
                    }
                    if (max != -1) {
                        let s = this.productsPoList[i].shengyuQuantity
                        if (first > s) {
                            this.$message({
                                message: '分配数量不能大于最先预计的最大数',
                                type: 'warning'
                            })
                            return false
                        }
                    }
                    if (sec == undefined || sec === "") {
                        this.$message({
                            message: '一级佣金不能为空',
                            type: 'warning'
                        })
                        return false
                    }
                    if (!reg1.test(sec)) {
                        this.$message({
                            message: '一级佣金只能是0到100的正整数，包括0和100！',
                            type: 'warning'
                        })
                        return false
                    }
                    if (thr == undefined || thr === "") {
                        this.$message({
                            message: '二级佣金不能为空',
                            type: 'warning'
                        })
                        return false
                    }
                    if (!reg1.test(thr)) {
                        this.$message({
                            message: '二级佣金只能是0到100的正整数，包括0和100！',
                            type: 'warning'
                        })
                        return false
                    }
                    if (type == 1) {
                        if (four == undefined || four === "") {
                            this.$message({
                                message: '交强险一级佣金不能为空',
                                type: 'warning'
                            })
                            return false
                        }
                        if (!reg1.test(four)) {
                            this.$message({
                                message: '交强险一级佣金只能是0到100的正整数，包括0和100！',
                                type: 'warning'
                            })
                            return false
                        }
                        if (five == undefined || five === "") {
                            this.$message({
                                message: '交强险二级佣金不能为空',
                                type: 'warning'
                            })
                            return false
                        }
                        if (!reg1.test(five)) {
                            this.$message({
                                message: '交强险二级佣金只能是0到100的正整数，包括0和100！',
                                type: 'warning'
                            })
                            return false
                        }
                    }
                    if (sub == "") {
                        this.$message({
                            message: '上架时间不能为空！',
                            type: 'warning'
                        })
                        return false
                    }
                    if (sum == "") {
                        this.$message({
                            message: '下架时间不能为空！',
                            type: 'warning'
                        })
                        return false
                    }
                    if (this.now > new Date(sub).getTime()) {
                        console.log(this.now)
                        console.log(new Date(sub).getTime())
                        this.$message({
                            message: '上架时间不能小于当天时间！',
                            type: 'warning'
                        })
                        return false
                    }
                    if (new Date(sub).getTime() > new Date(sum).getTime()) {
                        this.$message({
                            message: '下架时间不能小于上架时间！',
                            type: 'warning'
                        })
                        return false
                    }
                    if (this.checkList[i].length == 0) {
                        this.$message({
                            message: '支付方式不能为空！',
                            type: 'warning'
                        })
                        return false
                    }
                }

                this.isshow = false;
            },

            //获取列表
            search() {
                config(this.query).then(response => {
                    if (response.respCode === '000000') {
                        this.domainList = response.data.domainList;
                        this.productsPoList = response.data.productsPoList;
                        this.productsPoList1 = response.data.productsPoList;
                        this.paymentList = response.data.paymentList;
                        for (let i = 0; i < this.productsPoList.length; i++) {
                            let obj = this.productsPoList[i];
                            this.$set(obj, 'max', this.productsPoList[i].domainQuantity)
                            this.createTime.push('');
                            this.lastLoginTime.push('');
                            this.checkList.push([]);
                        }
                        console.log(this.productsPoList)
                    }
                })
            }


        },
        filters: {
            time: function (val) {
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
    .ui-info-main {
        border: 1px solid #e4e9eb;
        border-radius: 5px;
    }

    .ui-info-tit {
        margin-left: 18px;
        height: 43px;
        line-height: 43px;
        font-size: 14px;
        color: #3498da;
        font-weight: bold;
    }

    .ui-info-list {
        padding-left: 74px;
        border-top: 1px solid #f3f5f6;
        margin: 18px;
        margin-top: 0;
        margin-bottom: 0;
        color: #768399;
        font-size: 14px;
        border-bottom: 1px solid #f3f5f6;
        background: #f9fafa;
        height: 47px;
    }

    .ui-info-item {
        color: #768399;
        font-weight: bold;
        float: left;
        line-height: 47px;
        margin-right: 12px;
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