<template>
    <div class="app-container">
        <div class="filter-container">
            <el-row>
                <el-col :span="20" :offset="1">
                    <el-form label-width="150px" class="credit-aplly-form">
                        <el-row style="padding:10px 0px;">
                            <el-col :span="3" align="right">
                                参数名称:
                            </el-col>
                            <el-col :span="7" style="margin-left:100px;">
                                产品标签
                            </el-col>
                        </el-row>
                        <el-row style="position:relative">
                            <el-col :span="3" align="right" style="margin-top:14px;">
                                参数值:
                            </el-col>
                            <el-col :span="16" style="margin-left:100px;">
                                <div v-for="item in tagRecordsArr" style="float:left">
                                    <div class="el-badge item on" v-if="item.tagId">
                                        <input  v-model="item.tagName" />
                                        <transition name="el-zoom-in-center" >
                                            <sup @click="deleteLabel(item.tagId)" class="rounde">
                                                X
                                            </sup>
                                        </transition>
                                    </div>
                                    <div v-if="!item.tagId" style="positon:absolute; left:0px; top:80px;">
                                        <input v-model="item.tagName"  style="width:80px; height:30px; margin-top:10px; margin-right:40px;text-align:center; "/>
                                    </div>
                                </div>
                                <div style="float:left;border:1px dashed red;text-align:center; width:26px;height:26px; color:red;margin-top:10px;margin-right:5px;">
                                    <i class="el-icon-plus" @click="addEmptyLabel()" style="margin-top:6px;"></i>
                                </div>
                                <div style="float:left;border:1px dashed green ;text-align:center; width:26px;height:26px; color:green ;margin-top:10px;">
                                    <i class="el-icon-minus" @click="deleteEmptyLabel()" style="margin-top:6px;"></i>
                                </div>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-col>
            </el-row>
            <el-row style="padding-top:20px;">
                <el-col :span="24" align="center">
                    <el-button type="primary" @click="commit()">确 定</el-button>
                    <el-button type="primary" @click="backParent()">取 消</el-button>
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

    export default {
        data() {
            return {
                tagRecordsArr: [],
                EditForm: {
                    domainProductsMap: null
                }
            }
        },
        created() {
            this.getDetail();
        },
        methods: {
            getDetail() {
                let obj = {
                    url: '/operateParam/lableList'
                };
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                        if (response.data.tagRecords && response.data.tagRecords.length > 0) {
                            this.tagRecordsArr = response.data.tagRecords;
                        }
                    }
                }).catch(err => {})
            },
            deleteLabel(id) {
                let obj = {
                    url: '/operateParam/deletelable',
                    tagId: id
                };
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                        for (var i = 0; i < this.tagRecordsArr.length; i++) {
                            if (this.tagRecordsArr[i].tagId && this.tagRecordsArr[i].tagId == id) {
                                this.tagRecordsArr.splice(i, 1);
                            }
                        }
                        this.$message.success(response.respMsg)
                    } else {
                        this.$message.error(response.respMsg)
                    }
                }).catch(err => {})
            },
            addEmptyLabel() {
                this.tagRecordsArr.push({
                    tagName: '',
                });
            },
            deleteEmptyLabel() {
                if (this.tagRecordsArr.length > 0) {
                    if (!this.tagRecordsArr[this.tagRecordsArr.length - 1].tagId) {
                        this.tagRecordsArr.splice(this.tagRecordsArr.length - 1, 1);
                    }
                }
            },
            backParent() {
                this.$router.go(-1)
            },
            commit() {
                this.EditForm.domainProductsMap = new Object();
                for (var i = 0; i < this.tagRecordsArr.length; i++) {
                    if (this.tagRecordsArr[i].tagId) {
                        this.EditForm.domainProductsMap[i] = {
                            tagName: this.tagRecordsArr[i].tagName,
                            tagId: this.tagRecordsArr[i].tagId
                        };
                    } else {
                        this.EditForm.domainProductsMap[i] = {
                            tagName: this.tagRecordsArr[i].tagName,
                        };
                    }
                }
                this.EditForm.url = 'operateParam/addOrUpdateLable';
                config(this.EditForm).then(response => {
                    this.getDetail();
                    if (response.respCode === '000000') {
                        this.$message.success(response.respMsg)
                    } else {
                        this.$message.error(response.respMsg)
                    }
                }).catch(err => {

                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .item {
        margin-top: 10px;
        margin-right: 40px;
    }

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

    .rounde {
        position:absolute;
        display: inline-block;
        cursor: pointer;
        width: 20px;
        height: 20px;
        line-height:20px;
        text-align:center;
        color: #ffffff;
        background: red;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        -o-border-radius: 50%;
        border-radius: 50%;
        left:68px;
        top:-8px;
    }
    .on>input{
        width:80px;height: 30px;text-align:center;position:relative;
    }
</style>