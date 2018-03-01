<template>
    <div class="app-container">
        <div class="filter-container">
            <el-row>
                <el-col :span="20" :offset="1">
                    <el-form label-width="150px" class="credit-aplly-form">
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                ID:
                            </el-col>
                            <el-col style="margin-left:10px;margin-top:8px;" :span="7">
                                <span>{{EditForm. resourceId}}</span>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                展示内容名称:
                            </el-col>
                            <el-col v-show="isshow" style="margin-left:10px;margin-top:8px;" :span="7">
                                <span>{{EditForm.resourceName}}</span>
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;" v-show="!isshow">
                                <el-input v-model="EditForm.resourceName" style="width:265px;"></el-input>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                展示内容描述:
                            </el-col>
                            <el-col v-show="isshow" style="margin-left:10px;margin-top:8px;" :span="7">
                                <span>{{EditForm.resourceDesc}}</span>
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;" v-show="!isshow">
                                <el-input v-model="EditForm.resourceDesc" style="width:265px;"></el-input>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">

                            <el-col :span="3" align="right" style="margin-top:8px;">
                                类型:
                            </el-col>
                            <el-col v-show="isshow" style="margin-left:10px;margin-top:8px;" :span="7">
                                <span>{{EditForm.resourceType |  type}}</span>
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;" v-show="!isshow">
                                <el-select v-model="EditForm.resourceType" style="width:142px;">
                                    <el-option v-for="item in resourceTypeArr" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                终端类型:
                            </el-col>
                            <el-col v-show="isshow" style="margin-left:10px;margin-top:8px;" :span="7">
                                <span>{{EditForm.deviceType |  channel}}</span>
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;" v-show="!isshow">
                                <el-select v-model="EditForm.deviceType" style="width:142px;">
                                    <el-option v-for="item in deviceTypeArr" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                排序:
                            </el-col>
                            <el-col v-show="isshow" style="margin-left:10px;margin-top:8px;" :span="7">
                                <span>{{EditForm.sortCode}}</span>
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;" v-show="!isshow">
                                <el-input v-model="EditForm.sortCode" style="width:265px;"></el-input>
                            </el-col>
                        </el-row>


                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                图片(视频):
                            </el-col>
                            <el-col style="margin-left:10px;margin-top:8px;" :span="2">
                                <img :src="EditForm.resourceValue" width="120" height="120" v-show="EditForm.resourceValue" />
                            </el-col>
                            <el-col :span="7" v-show="!isshow" style="margin-top:10px;margin-left:36px;">
                                <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:paramName="'resourceValue'" style="width:120px;" ref="img1" v-bind:tip="''"></uploadImg>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                发现模块图片:
                            </el-col>
                            <el-col style="margin-left:10px;margin-top:8px;" :span="2">
                                <img :src="EditForm.resourceValue1" width="120" height="120" v-show="EditForm. resourceValue1" />
                            </el-col>
                            <el-col :span="7" v-show="!isshow" style="margin-top:10px;margin-left:36px;">
                                <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:paramName="'resourceValue1'" ref="img2" style="width:120px;" v-bind:tip="''"></uploadImg>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                链接地址:
                            </el-col>
                            <el-col v-show="isshow" style="margin-left:10px;margin-top:8px;" :span="7">
                                <span>{{EditForm.resourceUrl}}</span>
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;" v-show="!isshow">
                                <el-input v-model="EditForm.resourceUrl" style="width:265px;"></el-input>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                活动产品:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;" v-show="!isshow">
                                <el-button type="primary" icon="plus" size="small" @click="chooseProduct()" style="margin-top:6px;">选择</el-button>
                            </el-col>
                        </el-row>
                        <el-row v-show="productsResponsesData.length!=0" style="margin-bottom:22px;">
                            <el-table :data="productsResponsesData" style="width: 100%">
                                <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
                                <el-table-column prop="name" label="操作" width="120" align="center">
                                    <template scope="scope">
                                        <a href="javascript:void(0);" @click="delPro(scope.row.productId)">删除</a>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="productId" label="产品ID" align="center" width="140">
                                </el-table-column>
                                <el-table-column prop="productName" label="保险名称" width="180" align="center">
                                </el-table-column>
                                <el-table-column prop="insurerName" label="承保公司" width="180" align="center">
                                </el-table-column>
                                <el-table-column prop="className" label="保险类别" align="center" width="180">
                                </el-table-column>

                                <el-table-column label="当前库存" width="180" align="center">
                                    <template scope="scope">
                                        <span>{{scope.row.maxQuantity==-1?'不限':scope.row.maxQuantity}}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="minPremium" label="保险金额(元)" align="center" width="180">
                                </el-table-column>
                                <el-table-column prop="commisionValue1" label="一级佣金" width="180" align="center">
                                </el-table-column>

                                <el-table-column prop="commisionValue2" label="二级佣金" align="center" width="180">
                                </el-table-column>
                            </el-table>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:4px;">
                                开始时间:
                            </el-col>
                            <el-col v-show="isshow" style="margin-left:10px;margin-top:4px;" :span="7">
                                <span>{{EditForm.effTimeStr}}</span>
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;" v-show="!isshow">
                                <el-date-picker size="small" v-model="EditForm.effTimeStr" type="datetime" placeholder="选择日期">
                                </el-date-picker>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:4px;">
                                结束时间:
                            </el-col>
                            <el-col v-show="isshow" style="margin-left:10px;margin-top:4px;" :span="7">
                                <span>{{EditForm.expTimeStr}}</span>
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;" v-show="!isshow">
                                <el-date-picker size="small" v-model="EditForm.expTimeStr" type="datetime" placeholder="选择日期">
                                </el-date-picker>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="right" style="margin-top:8px;">
                                状态:
                            </el-col>
                            <el-col v-show="isshow" style="margin-left:10px;margin-top:8px;" :span="7">
                                <span>{{EditForm.sts | state}}</span>
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;" v-show="!isshow">
                                <el-select v-model="EditForm.sts" style="width:142px;">
                                    <el-option v-for="item in  deviceType" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" align="center">
                    <el-button type="primary" @click="commit()" v-show="!isshow">保存</el-button>
                    <el-button type="primary" @click="isshow=false" v-show="isshow">编辑</el-button>
                    <el-button type="primary" @click="goBack">返回</el-button>

                </el-col>
            </el-row>

            <el-dialog :visible.sync="productChooseViewFlag" :modal-append-to-body="false" v-bind:size="'large'">
                <productChooseWin v-on:child-geiIds="chooseProdIds" v-bind:selectType="'single'" v-on:child-cancle="productChooseViewFlag=false"></productChooseWin>
            </el-dialog>
            </el-col>
        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import config from '@api/config';
    import * as static_data from '@utils/static_data.js';
    import * as util from '@src/utils/util';
    import productChooseWin from "./productChooseWin.vue";
    import uploadImg from "@src/components/uploadImg";

    export default {
        components: {
            productChooseWin,
            uploadImg
        },
        data() {
            return {
                resourceTypeArr: static_data.resourceTypeArr,
                deviceTypeArr: static_data.deviceTypeArr,
                deviceType: static_data.deviceType,
                isshow: true,
                EditForm: {
                    resourceType: '',
                    resourceName: '',
                    resourceDesc: '',
                    deviceType: '',
                    sortCode: '',
                    resourceValue: '',
                    resourceValue1: '',
                    resourceUrl: '',
                    hostId: '',
                    effTimeStr: null,
                    expTimeStr: null,
                    resourceId: this.$route.query.id,
                    sts: ''
                },
                productChooseViewFlag: false,
                productsResponsesData: []
            }
        },
        created() {
            this.getDetail();
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            getDetail() {
                let obj = {
                    url: '/advert/getBannerInfo',
                    resourceId: this.$route.query.id
                }
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                        this.EditForm.resourceType = response.data.resourceType;
                        this.EditForm.resourceName = response.data.resourceName;
                        this.EditForm.resourceDesc = response.data.resourceDesc;
                        this.EditForm.deviceType = response.data.deviceType;
                        this.EditForm.sortCode = response.data.sortCode;
                        this.EditForm.resourceValue = response.data.resourceValue;
                        this.EditForm.resourceValue1 = response.data.resourceValue1;

                        // this.$refs.img1.setInitImg([{name: 'resourceValue',
                        //     url: this.EditForm.resourceValue}]);
                        // this.$refs.img2.setInitImg( [{name: 'resourceValue1',
                        //     url:this.EditForm.resourceValue1}])


                        this.EditForm.resourceUrl = response.data.resourceUrl;
                        this.EditForm.effTimeStr = response.data.effTimeStr;
                        this.EditForm.expTimeStr = response.data.expTimeStr;
                        this.EditForm.hostId = response.data.hostId;
                        this.EditForm.sts = response.data.sts;
                        if (response.data.productsRecords) {
                            for (var i = 0; i < response.data.productsRecords.length; i++) {
                                this.productsResponsesData = this.productsResponsesData.concat({
                                    productId: response.data.productsRecords[i].productId,
                                    productName: response.data.productsRecords[i].productName,
                                    insurerName: response.data.productsRecords[i].insurerName,
                                    className: response.data.productsRecords[i].className,
                                    maxQuantity: response.data.productsRecords[i].maxQuantity,
                                    minPremium: response.data.productsRecords[i].minPremium,
                                    commisionValue1: response.data.productsRecords[i].commisionValue1,
                                    commisionValue2: response.data.productsRecords[i].commisionValue2
                                });
                            }
                        }
                    }
                }).catch(err => {

                })
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
                }).catch(() => {

                });
            },
            chooseProduct() { //弹出选择产品选项
                this.productChooseViewFlag = true;
            },
            chooseProdIds(productRow) {
                this.EditForm.hostId = productRow[0].productId;
                this.productsResponsesData = productRow;
                this.productChooseViewFlag = false;
            },
            commit() {
                let first = "";
                let sec = "";
                if (this.EditForm.resourceName == "") {
                    this.$message({
                        type: 'warning',
                        message: '展示内容名称不能为空'
                    });
                    return false
                }
                if (this.EditForm.resourceDesc == "" || this.EditForm.resourceDesc == null) {
                    this.$message({
                        type: 'warning',
                        message: '展示内容描述不能为空'
                    });

                    return false
                }
                if (this.EditForm.sortCode === "") {
                    this.$message({
                        type: 'warning',
                        message: '排序不能为空'
                    });
                    return false
                }
                let reg1 = /^[1-9]\d*|0$/;
                if (!reg1.test(this.EditForm.sortCode)) {
                    this.$message({
                        type: 'warning',
                        message: '排序必须是大于等于零的整数'
                    });
                    return false
                }
                if (this.EditForm.resourceValue == "" || this.EditForm.resourceValue == null) {
                    this.$message({
                        type: 'warning',
                        message: '图片(视频)不能为空'
                    });
                    return false
                }
                if (this.EditForm.resourceValue1 == null || this.EditForm.resourceValue1 == "") {
                    this.$message({
                        type: 'warning',
                        message: '发现模块图片不能为空'
                    });
                    return false
                }
                if (typeof (this.EditForm.effTimeStr) == 'string') {
                    first = new Date(this.EditForm.effTimeStr.replace(/-/g, '/')).getTime()
                } else {
                    first = new Date(this.EditForm.effTimeStr).getTime()
                }
                if (typeof (this.EditForm.expTimeStr) == 'string') {
                    sec = new Date(this.EditForm.expTimeStr.replace(/-/g, '/')).getTime()
                } else {
                    sec = new Date(this.EditForm.expTimeStr).getTime()
                }
                if (first > sec) {
                    this.$message({
                        type: 'warning',
                        message: '结束日期必须大于或等于起始日期'
                    });
                    return false
                }
                this.EditForm.effTimeStr = util.changeDate(this.EditForm.effTimeStr, 'datetime');
                this.EditForm.expTimeStr = util.changeDate(this.EditForm.expTimeStr, 'datetime');

                this.EditForm.url = '/advert/updateBannerInfo';
                config(this.EditForm).then(response => {
                    if (response.respCode === '000000') {
                        this.$message.success(response.respMsg)
                        setTimeout(() => {
                            this.$router.push({
                                path: "/operationManage/adsense/content",
                            });

                        }, 2000);
                    } else {
                        this.$message.error(response.respMsg)
                    }
                }).catch(err => {})
            },
            acqImgUrl(params) {
                if ('resourceValue' == params[1]) {
                    this.EditForm.resourceValue = params[0]
                } else if ('resourceValue1' == params[1]) {
                    this.EditForm.resourceValue1 = params[0]
                }

            }
        },
        filters: {
            type: function (val) {
                if (val == 10) {
                    return '图片'
                } else if (val == 20) {
                    return '视频'
                }
            },
            channel: function (val) {
                if (val == 1) {
                    return '移动端'
                } else if (val == 2) {
                    return 'PC端'
                }
            },
            state: function (val) {
                if (val == 1) {
                    return '正常'
                } else if (val == -1) {
                    return '禁用'
                }
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