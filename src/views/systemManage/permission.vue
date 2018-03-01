<template>
    <div class="ggg_user">
        <h2>操作员信息</h2>
        <div class="text" v-show="!isEdit">
            <el-form label-position="center" label-width="100px" class="noborder">
                <el-form-item label="操作员ID">
                    <span class="el-input" v-text="form.userId"></span>
                </el-form-item>
                <el-form-item label="操作员姓名">
                     <span class="el-input" v-text="form.userName"></span>
                </el-form-item>
                <el-form-item label="所属角色">
                    <span class="el-input" v-text="form.enabledStr" ></span>
                </el-form-item>
            </el-form>
            <el-form class="form" :model="form" :inline="true" label-position="center" label-width="100px">
                 <el-form-item label="授权资源" >
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                </el-form-item>
                 <el-form-item label="" label-width="0">
                     <!--<el-table :data="list" border fit>-->
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <table class="userTable" border="1" style="display:inline-block">
                                <tr>
                                    <td>产品</td>
                                    <td>
                                        <template v-for="item in td1">
                                            <el-form-item >
                                                <span class="el-input" v-text="item.itemName"></span>
                                            </el-form-item><br>
                                        </template>
                                    </td>
                                    <td>
                                        <template v-for="item in td1">
                                            <el-form-item >
                                                    <el-checkbox  :checked="item.auditUsers && item.auditStep == 1 ? true : false" :label="item.itemId + '_1'">初级复审</el-checkbox>
                                            </el-form-item><br>
                                        </template>
                                    </td>
                                    <td>
                                       <template v-for="(item, index) in td1">
                                             <el-form-item >
                                                <el-checkbox  v-if="item.lastStep == 2" :checked="item.auditUsers && item.auditStep == 2 ? true : false" :label="item.itemId + _2" >一级复审</el-checkbox>
                                                <div v-else style="width:79px;height:36px;"></div>
                                             </el-form-item><br>
                                       </template>
                                    </td>
                                </tr>
                                <tr>
                                    <td>渠道</td>
                                    <td>
                                        <template v-for="item in td2">
                                            <el-form-item >
                                                <span class="el-input" v-text="item.itemName"></span>
                                            </el-form-item><br>
                                        </template>
                                    </td>
                                    <td>
                                        <template v-for="item in td2">
                                            <el-form-item >
                                                    <el-checkbox  :checked="item.auditUsers && item.auditStep == 1 ? true : false" :label="item.itemId + '_1'">初级复审</el-checkbox>
                                            </el-form-item><br>
                                        </template>
                                    </td>
                                    <td>
                                       <template v-for="(item, index) in td2">
                                             <el-form-item >
                                                <el-checkbox  v-if="item.lastStep == 2" :checked="item.auditUsers && item.auditStep == 2 ? true : false" :label="item.itemId + _2" >一级复审</el-checkbox>
                                                <div v-else style="width:79px;height:36px;"></div>
                                             </el-form-item><br>
                                       </template>
                                    </td>
                                </tr>
                                <tr>
                                    <td>运营</td>
                                     <td>
                                        <template v-for="item in td3">
                                            <el-form-item >
                                                <span class="el-input" v-text="item.itemName"></span>
                                            </el-form-item><br>
                                        </template>
                                    </td>
                                    <td>
                                        <template v-for="item in td3">
                                            <el-form-item >
                                                    <el-checkbox  :checked="item.auditUsers && item.auditStep == 1 ? true : false" :label="item.itemId + '_1'">初级复审</el-checkbox>
                                            </el-form-item><br>
                                        </template>
                                    </td>
                                    <td>
                                       <template v-for="(item, index) in td3">
                                             <el-form-item >
                                                <el-checkbox  v-if="item.lastStep == 2" :checked="item.auditUsers && item.auditStep == 2 ? true : false" :label="item.itemId + '_2'" >一级复审</el-checkbox>
                                                <div v-else style="width:79px;height:36px;"></div>
                                             </el-form-item><br>
                                       </template>
                                    </td>
                                </tr>
                                <tr>
                                    <td>理赔</td>
                                     <td>
                                        <template v-for="item in td4">
                                            <el-form-item >
                                                <span class="el-input" v-text="item.itemName"></span>
                                            </el-form-item><br>
                                        </template>
                                    </td>
                                    <td>
                                        <template v-for="item in td4">
                                            <el-form-item >
                                                    <el-checkbox  :checked="item.auditUsers && item.auditStep == 1 ? true : false" :label="item.itemId + '_1'">初级复审</el-checkbox>
                                            </el-form-item><br>
                                        </template>
                                    </td>
                                    <td>
                                       <template v-for="(item, index) in td4">
                                             <el-form-item >
                                                <el-checkbox  v-if="item.lastStep == 2" :checked="item.auditUsers && item.auditStep == 2 ? true : false" :label="item.itemId + '_2'" >一级复审</el-checkbox>
                                                <div v-else style="width:79px;height:36px;"></div>
                                             </el-form-item><br>
                                       </template>
                                    </td>
                                </tr>
                                <tr>
                                    <td>用户</td>
                                     <td>
                                        <template v-for="item in td5">
                                            <el-form-item >
                                                <span class="el-input" v-text="item.itemName"></span>
                                            </el-form-item><br>
                                        </template>
                                    </td>
                                    <td>
                                        <template v-for="item in td5">
                                            <el-form-item >
                                                    <el-checkbox  :checked="item.auditUsers && item.auditStep == 1 ? true : false" :label="item.itemId + '_1'">初级复审</el-checkbox>
                                            </el-form-item><br>
                                        </template>
                                    </td>
                                    <td>
                                       <template v-for="(item, index) in td5">
                                             <el-form-item >
                                                <el-checkbox  v-if="item.lastStep == 2" :checked="item.auditUsers && item.auditStep == 2 ? true : false" :label="item.itemId + _2" >一级复审</el-checkbox>
                                                <div v-else style="width:79px;height:36px;"></div>
                                             </el-form-item><br>
                                       </template>
                                    </td>
                                </tr>
                        </table>
                 </el-checkbox-group>
                    <!--</el-table>-->
                </el-form-item>
            </el-form>
            <el-form label-position="center" label-width="100px" style="padding-left:200px;">
                <el-form-item>
                    <el-button v-waves  type="primary"@click="submitData()">确定</el-button>
                    <el-button v-waves @click="$router.go(-1)">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import '@res/css/wjq/style.less';
import config from '@api/config';
import { downloadExecl } from '@api/excel.js';
import { parseTime } from '@filters/index.js';
import { trim } from '@src/utils/util';
import {validate } from '@src/utils/gxfCommin';
export default {
    data() {
        var letter = (rule, value, callback)=> {  
            if (!validate.validatAlphabets(value)) {
                callback(new Error('请输入字母'));
                return false;
            }
            callback();
        }
        return {
            listLoading: false,
            form: {
                type: ''
            },
            isEdit: false,
            list: [
                {aa: 'aa'}
            ],
            td1: [],
            td2: [],
            td3: [],
            td4: [],
            td5: [],
            rules: {
            },
            AllOptions: [], //全部
            checkedCities: [], //点击的复选
            checkAll: false, //全选状态
            isIndeterminate: false //indeterminate 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果

            
        }
    },
    computed: {
    },
    created() {
        this.getDate(); //获取数据
    },
    mounted() {
    },
    methods: {
        //点击全选按钮
        handleCheckAllChange(val) {
            //判断全选按钮是否选中
            if (val.srcElement.checked) {
                this.checkedCities = this.AllOptions;
            } else {
                this.checkedCities = [];
            }
            // this.checkedCities = val ? this.AllOptions : []; //demo上的 不能用
            this.isIndeterminate = false;
        },
        //点击单个复选
        handleCheckedCitiesChange(value) {
            this.checkAll = value.length === this.AllOptions.length;
            this.isIndeterminate = value.length > 0 && value.length < this.AllOptions.length;
            
        },
        //获取数据
        getDate () {
            let obj = {
                url: 'operator/auditRules',
                userId: this.$route.query.userId ? this.$route.query.userId : ''
            }
            config(obj).then(response => {
                console.log(response)
                if (response.respCode === '000000') {
                    let output = response.data;
                    this.form = output.user;
                    for (let i = 0; i < output.auditItemsList.length; i++) {
                        let item = output.auditItemsList[i];
                        if (item.lastStep == 1 && item.itemClass != 50) {
                            this.AllOptions.push(item.itemId + '_1')
                        }
                        if (item.lastStep == 2 && item.itemClass != 50) {
                            this.AllOptions.push(item.itemId + '_2')
                        }
                        if (item.itemClass == 10) {
                            this.td1.push(item)
                        }
                        if (item.itemClass == 20) {
                            this.td2.push(item)
                        }
                        if (item.itemClass == 30) {
                            this.td3.push(item)
                        }
                        if (item.itemClass == 40) {
                            this.td4.push(item)
                        }
                        if (item.itemClass == 60) {
                            this.td5.push(item)
                        }
                        // console.log
                        //进入默认全选状态
                        setTimeout(() => {
                             this.checkAll = this.checkedCities.length === this.AllOptions.length
                             this.isIndeterminate = this.checkedCities.length > 0 && this.checkedCities.length < this.AllOptions.length;
                        })
                    }
                } else {
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        //提交配置信息
        submitData () {
             let obj = {
                url: 'operator/submitAuditRules',
                userId: this.form.userId,
                itemIds: this.checkedCities
             }
             if (this.checkedCities.length == 0 ) {
                  this.message('warning', '请勾选授权资源');
                  return false;
             }
             console.log(obj)
             config(obj).then(response => {
                console.log(response)
                if (response.respCode === '000000') {
                    this.message('success', response.respMsg);
                    this.$router.go(-1);
                } else {
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                console.log(err)
            })
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
        }
    }
}
</script>
<style lang="less" scoped>
    h2{
        margin-left: 18px;
        line-height: 43px;
        font-size: 14px;
        color: #3498da;
        font-weight: bold;
    }
    .text{
        padding-left:100px;
    }
    .form table{
        width:auto;
        min-width: 10px;
        border:0;
    }
    .userTable td{
        padding: 20px;
    }
</style>