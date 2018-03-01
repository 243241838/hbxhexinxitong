<template>
    <div class="app-container">
        <div class="filter-container">
            <el-row>
                <el-col :span="20" :offset="1">
                    <el-form label-width="150px" class="credit-aplly-form">
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                抢购策略ID：
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input v-model="EditForm.specialId" style="width:265px;" readonly="readonly"></el-input>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                抢购策略名称:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input v-model="EditForm.specialName" style="width:265px;"></el-input>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                上架渠道:
                            </el-col>
                            <el-col :span="16" style="margin-left:10px;position:relative;">
                                <el-checkbox style="margin-top:8px;" v-model="all" @change="change">所有渠道</el-checkbox>
                                <el-checkbox-group v-model="EditForm.domainIds" style="position:relative;left:100px;top:-20px;width:300px;">
                                    <el-checkbox v-for="(item,index) in domainIdArr" :key="item.value" :label="item.value" :name="item.label" v-bind:style="{ marginLeft: index==0||index%4==0?left=0:left=15+'px', marginBottom:'5px' }"
                                        v-bind:disabled="disabledInput">
                                        {{item.label}}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                折扣率:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input v-model="EditForm.discountRate" style="width:265px;"></el-input>
                                <span>%</span>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                超量后购买方式:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-select v-model="EditForm.overbuyType" placeholder="请选择" style="width:265px;">
                                    <el-option v-for="item in overbuyTypeArr" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:4px;">
                                专题时间:
                            </el-col>
                            <el-col :span="16" style="margin-left:10px;">
                                <el-date-picker size="small" v-model="EditForm.effTimestr" type="datetime" placeholder="开始时间">
                                </el-date-picker> 至
                                <el-date-picker size="small" v-model="EditForm.expTimestr" type="datetime" placeholder="结束时间">
                                </el-date-picker>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                关联产品:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-button type="primary" icon="plus" size="small" @click="chooseProduct()" style="margin-top:6px;">选择</el-button>
                            </el-col>
                        </el-row>
                        <el-row v-show="productsResponsesData.length!=0">
                            <el-table :data="productsResponsesData" style="width: 100%">
                                <el-table-column type="index" label="序号" width="100" align="center">
                                </el-table-column>
                                <el-table-column prop="name" label="操作" width="100" align="center">
                                    <template scope="scope">
                                        <a href="javascript:void(0);" @click="delPro(scope.row.productId)">删除</a>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="productId" label="产品ID" align="center" width="120">
                                </el-table-column>
                                <el-table-column prop="productName" label="保险名称" align="center" width="160">
                                </el-table-column>
                                <el-table-column prop="insurerName" label="承保公司" align="center" width="160">
                                </el-table-column>
                                <el-table-column prop="className" label="保险类别" align="center" width="160">
                                </el-table-column>

                                <el-table-column label="当前库存" align="center" width="140">
                                    <template scope="scope">
                                        <span>{{scope.row.maxQuantity==-1?'不限':scope.row.maxQuantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="buyQuota" label="每人可购最大数" align="center" width="200">
                                </el-table-column>

                                <el-table-column label="保险金额(元)" align="center" width="160">
                                    <template scope="scope">
                                        <span>{{scope.row.minPremium/100+'-'+scope.row.maxPremium/100}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="关联产品排序" align="center" width="160">
                                    <template scope="scope">
                                        <el-input v-model="scope.row.code" style="padding:5px 0px;" placeholder="请输入数字" :maxlength=9></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="限时抢购数量" align="center" width="160">
                                    <template scope="scope">
                                        <el-input v-model="scope.row.productAmount" style="padding:5px 0px;"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="每人限购数量" align="center" width="160">
                                    <template scope="scope">
                                        <el-input v-model="scope.row.buyNum" style="padding:5px 0px;"></el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-row>
                    </el-form>

                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" align="center" style="padding-top:20px;">
                    <el-button type="primary" @click="commit()">保存</el-button>
                    <el-button type="primary" @click="backParent()">取 消</el-button>
                </el-col>
            </el-row>

            <el-dialog :visible.sync="productChooseViewFlag" :modal-append-to-body="false" v-bind:size="'large'">
                <productChooseWin v-on:child-geiIds="chooseProdIds" v-on:child-cancle="productChooseViewFlag=false" v-bind:selectType="productChooseSelectType"></productChooseWin>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import config from '@api/config';
    // import ElRow from "element-ui/packages/row/src/row";
    import * as util from '@src/utils/util';
    import * as static_data from '@utils/static_data.js';
    import productChooseWin from "./productChooseWin.vue";

    export default {
        components: {
            // ElRow,
            productChooseWin
        },
        data() {
            return {
                left: 15,
                all: false,
                disabledInput: false,
                domainIdArr: [],
                overbuyTypeArr: static_data.overbuyTypeArr,
                EditForm: {
                    discountRate: '',
                    domainIds: [],
                    effTimestr: '',
                    expTimestr: '',
                    overbuyType: '',
                    specialName: '',
                    specialProductsMap: null,
                    specialId: this.$route.query.id
                },
                productChooseViewFlag: false,
                productChooseSelectType: 'multiple',
                productsResponsesData: []
            }
        },
        created() {
            this.acqDomainIds();
            this.getDetail();
        },
        methods: {
            change() {
                if (this.all) {
                    this.disabledInput = true;
                } else {
                    this.disabledInput = false;

                }


            },
            acqDomainIds() {
                let obj = {
                    url: '/channel/menuList'
                }
                config(obj).then(response => {
                    if (response.respCode == '000000') {
                        for (var i = 0; i < response.data.domainsPoList.length; i++) {
                            this.domainIdArr.push({
                                value: response.data.domainsPoList[i].domainId.toString(),
                                label: response.data.domainsPoList[i].domainName,
                            });
                        }
                    } else {
                        this.$message.error(response.respMsg)
                    }

                }).catch(err => {

                })
            },
            getDetail() {
                let obj = {
                    url: 'operate/getFlashSaleInfo',
                    specialId: this.$route.query.id,
                };
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                        this.EditForm.discountRate = response.data.discountRate;
                        this.EditForm.domainIds = response.data.configDomains.substr(1, response.data.configDomains
                            .length - 2).split(',');
                        if (this.EditForm.domainIds.length == 1 && this.EditForm.domainIds[0] == 0) {
                            this.all = true;
                            this.disabledInput = true;
                            this.EditForm.domainIds = [];
                            for (let i = 0; i < this.domainIdArr.length; i++) {
                                this.EditForm.domainIds.push(this.domainIdArr[i].value)
                            }
                        }
                        this.EditForm.effTimestr = response.data.effTimestr;
                        this.EditForm.expTimestr = response.data.expTimestr;
                        this.EditForm.overbuyType = response.data.overbuyType;
                        this.EditForm.specialName = response.data.specialName;

                        if (response.data.spList && response.data.spList.length > 0) {
                            for (var i = 0; i < response.data.spList.length; i++) {
                                this.productsResponsesData = this.productsResponsesData.concat({
                                    productId: response.data.spList[i].productId,
                                    productName: response.data.spList[i].productName,
                                    insurerName: response.data.spList[i].insurerName,
                                    className: response.data.spList[i].className,
                                    maxQuantity: response.data.spList[i].maxQuantity,
                                    buyQuota: response.data.spList[i].buyQuota,
                                    minPremium: response.data.spList[i].minPremium,
                                    maxPremium: response.data.spList[i].maxPremium,
                                    code: response.data.spList[i].sortCode,
                                    productAmount: response.data.spList[i].productAmount,
                                    buyNum: response.data.spList[i].buyNum
                                });
                            }
                        }
                    }
                }).catch(err => {

                })
            },
            chooseProduct() { //弹出选择产品选项
                this.productChooseViewFlag = true;
            },
            chooseProdIds(productRow) {
                var that = this;
                var checkMap = new Map();
                that.productsResponsesData.forEach(function (v) {
                    checkMap.set(v.productId, 'xxx');
                });
                productRow.forEach(function (v) {
                    if (!checkMap.has(v.productId)) {
                        that.productsResponsesData.push(v);
                    }
                });

                this.productChooseViewFlag = false;
            },
            delPro(id) { //删除
                this.$confirm('确定删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    for (var i = 0; i < this.productsResponsesData.length; i++) {
                        if (this.productsResponsesData[i].productId == id) {
                            this.productsResponsesData.splice(i, 1);
                        }
                    }
                }).catch(() => {});
            },
            backParent() {
                this.$router.push({
                    path: '/operationManage/marketingStrategy/flashSale'
                })
            },
            commit() {
                let reg = /^100$|^(\d|[1-9]\d)$/;
                let reg1 = /^[1-9]\d*$/;
                let start = "";
                let end = "";
                if (this.EditForm.specialName == "") {
                    this.$message({
                        type: 'warning',
                        message: '抢购策略名称不能为空'
                    });
                    return false
                }
                if (this.EditForm.domainIds.length == 0) {
                    this.$message({
                        type: 'warning',
                        message: '上架渠道不能为空'
                    });
                    return false
                }
                if (this.EditForm.discountRate == "") {
                    this.$message({
                        type: 'warning',
                        message: '折扣率不能为空'
                    });
                    return false
                }
                if (!reg.test(this.EditForm.discountRate)) {
                    this.$message({
                        type: 'warning',
                        message: '折扣率只能是0到100的整数包括0和100'
                    });
                    return false
                }
                if (typeof (this.EditForm.effTimestr) == 'string') {
                    start = new Date(this.EditForm.effTimestr.replace(/'-'/g, '/')).getTime();

                } else {
                    start = new Date(this.EditForm.effTimestr).getTime();
                }
                if (typeof (this.EditForm.expTimestr) == 'string') {
                    end = new Date(this.EditForm.expTimestr.replace(/'-'/g, '/')).getTime();

                } else {
                    end = new Date(this.EditForm.expTimestr).getTime();
                }
                if (start > end) {
                    this.$message({
                        type: 'warning',
                        message: '结束时间不能小于开始时间'
                    });
                    return false
                }
                if (this.productsResponsesData.length == 0) {
                    this.$message({
                        type: 'warning',
                        message: '关联产品不能为空'
                    });
                    return false
                }

                for (let i = 0; i < this.productsResponsesData.length; i++) {
                    if (this.productsResponsesData[i].code == null) {
                        this.$message({
                            type: 'warning',
                            message: '关联产品排序不能为空'
                        });
                        return false
                    }
                }
                for (let i = 0; i < this.productsResponsesData.length; i++) {
                    if (this.productsResponsesData[i].productAmount == null) {
                        this.$message({
                            type: 'warning',
                            message: '限时抢购数量不能为空'
                        });
                        return false
                    }
                }
                for (let i = 0; i < this.productsResponsesData.length; i++) {
                    if (this.productsResponsesData[i].buyNum == null) {
                        this.$message({
                            type: 'warning',
                            message: '每人限购数量不能为空'
                        });
                        return false
                    }
                }
                for (let i = 0; i < this.productsResponsesData.length; i++) {
                    if (!reg1.test(this.productsResponsesData[i].code)) {
                        this.$message({
                            type: 'warning',
                            message: '关联产品排序必须是大于零的正整数'
                        });
                        return false
                    }
                }
                for (let i = 0; i < this.productsResponsesData.length; i++) {
                    if (!reg1.test(this.productsResponsesData[i].productAmount)) {
                        this.$message({
                            type: 'warning',
                            message: '限时抢购数量必须是大于零的正整数'
                        });
                        return false
                    }
                }
                for (let i = 0; i < this.productsResponsesData.length; i++) {
                    if (!reg1.test(this.productsResponsesData[i].buyNum)) {
                        this.$message({
                            type: 'warning',
                            message: '每人限购数量必须是大于零的正整数'
                        });
                        return false
                    }
                }
                for (let i = 0; i < this.productsResponsesData.length; i++) {
                    if (this.productsResponsesData[i].buyNum > this.productsResponsesData[i].buyQuota) {
                        this.$message({
                            type: 'warning',
                            message: '每人限购数量不能大于每人可购最大数 '
                        });
                        return false
                    }
                }
                this.EditForm.specialProductsMap = new Object();
                if (this.productsResponsesData.length > 0) {
                    for (var i = 0; i < this.productsResponsesData.length; i++) {
                        this.EditForm.specialProductsMap[this.productsResponsesData[i].productId] = {
                            productId: this.productsResponsesData[i].productId,
                            sortCode: this.productsResponsesData[i].code,
                            buyQuota: this.productsResponsesData[i].buyNum,
                            productAmount: this.productsResponsesData[i].productAmount
                        };
                    }
                }
                //时间转换
                this.EditForm.effTimestr = util.changeDate(this.EditForm.effTimestr, 'datetime');
                this.EditForm.expTimestr = util.changeDate(this.EditForm.expTimestr, 'datetime');
                this.EditForm.url = 'operate/updateFalshSpecial';
                this.$confirm('确定提交吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    config( this.EditForm).then(response => {
                        if (response.respCode === '000000') {
                            this.$message.success(response.respMsg)
                            setTimeout(() => {
                                this.$router.push({
                                    path: "/operationManage/marketingStrategy/flashSale",
                                });

                            }, 2000);
                        } else {
                            this.$message.error(response.respMsg)
                        }
                    }).catch(err => {

                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消提交'
                    });
                });
            }
        }
    }
</script>
<style lang="less" scoped>
    .app-container {
        position: relative;
        margin: 10px 10px 0 10px;
    }

    .app-container .filter-container {
        margin-top: 20px;
    }

    .app-container .filter-container .rightData {
        margin-right: 100px;
    }

    .www-v-button {
        position: absolute;
        left: 500px;
        z-index: 1;
    }
</style>