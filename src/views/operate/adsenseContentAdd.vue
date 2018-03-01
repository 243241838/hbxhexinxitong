<template>
    <div class="app-container">
        <div class="filter-container">
            <el-row>
                <el-col :span="20" :offset="1">
                    <el-form label-width="150px" class="credit-aplly-form">
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                类型:
                            </el-col>
                            <el-col :span="7">
                                <el-select v-model="AddForm.resourceType">
                                    <el-option v-for="item in resourceTypeArr" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                展示内容名称:
                            </el-col>
                            <el-col :span="7">
                                <el-input v-model="AddForm.resourceName" style="width:300px;"></el-input>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                展示内容描述:
                            </el-col>
                            <el-col :span="7">
                                <el-input v-model="AddForm.resourceDesc" style="width:300px;"></el-input>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                终端类型:
                            </el-col>
                            <el-col :span="7">
                                <el-select v-model="AddForm.deviceType">
                                    <el-option v-for="item in deviceTypeArr" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                排序:
                            </el-col>
                            <el-col :span="7">
                                <el-input v-model="AddForm.sortCode" style="width:300px;"></el-input>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                图片(视频):
                            </el-col>
                            <el-col :span="7">
                                <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:paramName="'resourceValue'" v-bind:tip="''"  style="width:120px;"></uploadImg>
                            </el-col>
                        </el-row>

                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                发现模块图片:
                            </el-col>
                            <el-col :span="7">
                                <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:paramName="'resourceValue1'" v-bind:tip="''"  style="width:120px;"></uploadImg>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                链接地址:
                            </el-col>
                            <el-col :span="7">
                                <el-input v-model="AddForm.resourceUrl" style="width:300px;"></el-input>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                活动产品:
                            </el-col>
                            <el-col :span="7">
                                <el-button type="primary" icon="plus" size="small" @click="chooseProduct()">点击选择</el-button>
                            </el-col>
                        </el-row>
                        <el-row v-show="productsResponsesData.length!=0">
                            <el-table :data="productsResponsesData" style="width: 100%">
                                <el-table-column type="index" label="序号" width="100">
                                </el-table-column>
                                <el-table-column prop="name" label="操作" width="180">
                                    <template scope="scope">
                                        <a href="javascript:void(0);" @click="delPro(scope.row.productId)">删除</a>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="productId" label="产品ID">
                                </el-table-column>
                                <el-table-column prop="productName" label="保险名称" width="180">
                                </el-table-column>
                                <el-table-column prop="insurerName" label="承保公司" width="180">
                                </el-table-column>
                                <el-table-column prop="className" label="保险类别">
                                </el-table-column>

                                <el-table-column label="当前库存" width="180">
                                    <template scope="scope">
                                        <span>{{scope.row.maxQuantity==-1?'不限':scope.row.maxQuantity}}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="minPremium" label="保险金额(元)">
                                </el-table-column>
                                <el-table-column prop="commisionValue1" label="一级佣金" width="180">
                                </el-table-column>

                                <el-table-column prop="commisionValue2" label="二级佣金">
                                </el-table-column>
                            </el-table>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                开始时间:
                            </el-col>
                            <el-col :span="7">
                                <el-date-picker v-model="AddForm.effTimeStr" type="datetime" placeholder="选择日期" style="width:300px;">
                                </el-date-picker>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3" align="center" style="margin-top:8px;">
                                结束时间:
                            </el-col>
                            <el-col :span="7">
                                <el-date-picker v-model="AddForm.expTimeStr" type="datetime" placeholder="选择日期" style="width:300px;">
                                </el-date-picker>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" align="center">
                    <el-button type="primary" @click="commit()">确 定</el-button>
                    <el-button type="primary">取消</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" align="center">
                    <el-dialog :visible.sync="productChooseViewFlag" :modal-append-to-body="false" v-bind:size="'large'">
                        <productChooseWin v-on:child-geiIds="chooseProdIds" v-bind:selectType="'single'" v-on:child-cancle="productChooseViewFlag=false"></productChooseWin>
                    </el-dialog>
                </el-col>
            </el-row>
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
                AddForm: {
                    resourceType: '',
                    resourceName: '',
                    resourceDesc: '',
                    deviceType: '1',
                    sortCode: '',
                    resourceValue: '',
                    resourceValue1: '',
                    resourceUrl: '',
                    hostId: '',
                    effTimeStr: null,
                    expTimeStr: null
                },
                productChooseViewFlag: false,
                productsResponsesData: []
            }
        },
        methods: {
            reset() {
                this.AddForm = {
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
                    expTimeStr: null
                };
            },
            chooseProduct() { //弹出选择产品选项
                this.productChooseViewFlag = true;
            },
            chooseProdIds(productRow) {
                this.AddForm.hostId = productRow[0].productId;
                this.productsResponsesData = productRow;
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
                }).catch(() => {

                });
            },
            commit() {
              if (this.AddForm.resourceType == "") {
                    this.$message({
                        type: 'warning',
                        message: '类型不能为空'
                    });
                    return false
                }
                if (this.AddForm.resourceName == "") {
                    this.$message({
                        type: 'warning',
                        message: '展示内容名称不能为空'
                    });
                    return false
                }
                if (this.AddForm.resourceDesc == "" || this.AddForm.resourceDesc == null) {
                    this.$message({
                        type: 'warning',
                        message: '展示内容描述不能为空'
                    });

                    return false
                }
                if (this.AddForm.sortCode === "") {
                    this.$message({
                        type: 'warning',
                        message: '排序不能为空'
                    });
                    return false
                }
                let reg1 = /^([1-9]\d*|0)$/;
                if (!reg1.test(this.AddForm.sortCode)) {
                    this.$message({
                        type: 'warning',
                        message: '排序必须是大于等于零的整数'
                    });
                    return false
                }
                if (this.AddForm.resourceValue == "" || this.AddForm.resourceValue == null) {
                    this.$message({
                        type: 'warning',
                        message: '请上传图片(视频)'
                    });
                    return false
                }
                if (this.AddForm.resourceValue1 == null || this.AddForm.resourceValue1 == "") {
                    this.$message({
                        type: 'warning',
                        message: '请上传发现模块图片'
                    });
                    return false
                }
                console.log(this.AddForm.effTimeStr)
                if (this.AddForm.effTimeStr==""||this.AddForm.effTimeStr==null) {
                    console.log(1)
                    this.$message({
                        type: 'warning',
                        message: '开始时间不能为空'
                    });
                    return false
                }
                if (this.AddForm.expTimeStr ==""||this.AddForm.expTimeStr==null) {
                    this.$message({
                        type: 'warning',
                        message: '结束时间不能为空'
                    });
                    return false
                }
                if (new Date(this.AddForm.effTimeStr).getTime() > new Date(this.AddForm.expTimeStr).getTime()) {
                    this.$message({
                        type: 'warning',
                        message: '结束日期必须大于或等于起始日期'
                    });
                    return false
                }


                this.AddForm.effTimeStr = util.changeDate(this.AddForm.effTimeStr, 'datetime');
                this.AddForm.expTimeStr = util.changeDate(this.AddForm.expTimeStr, 'datetime');

                this.AddForm.url = '/advert/addBannerInfo';
                config(this.AddForm).then(response => {
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
                }).catch(err => {

                })
            },
            acqImgUrl(params) {
                console.log(params);
                if ('resourceValue' == params[1]) {
                    this.AddForm.resourceValue = params[0]
                } else if ('resourceValue1' == params[1]) {
                    this.AddForm.resourceValue1 = params[0]
                }
                console.log(this.AddForm);
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

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>