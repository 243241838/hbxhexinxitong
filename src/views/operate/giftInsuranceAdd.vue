<template>
    <div class="app-container">
        <div class="filter-container">
            <el-row>
                <el-col :span="20" :offset="1" >
                    <el-form  class="credit-aplly-form" ref="redForm" :model="redForm" :rules="rules" :inline="initInline">
                        <el-row>
                            <el-col :span="3" align="center"  >
                                活动名称
                            </el-col>
                            <el-col :span="7">
                                <el-form-item prop="promotionName"
                                              :rules="[{required: true, message: '活动名称不能为空', trigger: 'blur'}]">
                                    <el-input v-model="redForm.promotionName"></el-input>
                                </el-form-item>
                            </el-col>

                        </el-row>
                        <el-row>
                            <el-col :span="3" align="center"  >
                                活动介绍
                            </el-col>
                            <el-col :span="7">
                                <el-form-item>
                                    <el-input v-model="redForm.promotionIntro"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="3" align="center"  >
                                活动类型
                            </el-col>
                            <el-col :span="7">
                                <el-form-item>
                                    <el-select v-model="redForm.promotionType" >
                                        <el-option v-for="item in promotionTypeArr" :key="item.value"  :label="item.label"  :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="3" align="center"  >
                                活动适用渠道(不选表示不限):
                            </el-col>
                            <el-col :span="7">
                                <el-form-item>
                                    <el-checkbox-group v-model="promotionChannelsTmpArr">
                                        <el-checkbox v-for="item in promotionChannelsArr" :key="item.value"  :label="item.value" >
                                            {{item.label}}
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="3" align="center"  >
                                活动配图:
                            </el-col>
                            <el-col :span="7">
                                <el-form-item>
                                    <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:paramName="'promotionLogo'"></uploadImg>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="3" align="center"  >
                                活动适用用户:
                            </el-col>
                            <el-col :span="7">
                                <el-form-item>
                                    <el-select v-model="redForm.userType" >
                                        <el-option v-for="item in couponUserTypeArr" :key="item.value"  :label="item.label"  :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row v-show="redForm.userType==99" >
                            <el-col :span="3" align="center"  >
                                选择用户
                            </el-col>
                            <el-col :span="7">
                                <el-form-item>
                                    <el-button type="primary" icon="plus" size="small" @click="userViewFlag=true">选择用户</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row v-show="userResponsesData.length!=0">
                            <el-table :data="userResponsesData" style="width: 100%">
                                <el-table-column prop="userId" label="用户ID" align="center" width="120">
                                </el-table-column>
                                <el-table-column prop="username" label="用户名" align="center" width="160">
                                </el-table-column>
                                <el-table-column prop="userNickName" label="昵称" align="center" width="160">
                                </el-table-column>
                                <el-table-column  label="等级" align="center" width="160">
                                    <template scope="scope">
                                        <span>{{scope.row.userLevel==10?'C端':(scope.row.userLevel==20?'B端':'')}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column  label="性别" align="center" width="200">
                                    <template scope="scope">
                                        <span>{{scope.row.userGender==1?'男':(scope.row.userLevel==2?'女':'保密')}}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="name" label="操作" width="100" align="center">
                                    <template scope="scope">
                                        <a href="javascript:void(0);" @click="delUserPro(scope.row.userId)">删除</a>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-row>


                        <el-row>
                            <el-col :span="3" align="center"  >
                                活动时间:
                            </el-col>
                            <el-col :span="21">
                                <el-form-item prop="effTimeStr" >
                                    <el-date-picker size="small" v-model="redForm.effTimeStr" type="datetime"
                                                    :disabled="notExpTmpDisabled" placeholder="选择日期" >
                                    </el-date-picker>
                                </el-form-item>
                                -
                                <el-form-item prop="expTimeStr" >
                                    <el-date-picker size="small" v-model="redForm.expTimeStr" type="datetime"
                                                    :disabled="notExpTmpDisabled"  placeholder="选择日期" prop="expTimeStr">
                                    </el-date-picker>
                                </el-form-item>
                                <el-checkbox v-model="notExpTmp">长期</el-checkbox>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-form  class="credit-aplly-form" ref="redGiftForm" :model="output" :rules="redRules" :inline="initInline">
                        <el-row>
                            <el-col :span="3" align="center"  >
                                选择活动赠险
                            </el-col>
                            <el-col :span="7">
                                <el-form-item prop="productCoupondsMap" >
                                    <el-button type="primary" icon="plus" size="small" @click="redGiftInsuranceViewFlag=true">选择赠险</el-button>

                                    <div class="el-form-item__error" v-show="output.redGiftInsuranceData.length==0&&!productExists">
                                        请输入赠险产品</div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <template>
                            <el-row v-show="output.redGiftInsuranceData.length!=0"
                                    v-for="(item,topIndex) in output.redGiftInsuranceData"
                                    :key="item.couponId"  >
                                <el-row>
                                    <table cellspacing="0" cellpadding="0" border="1" class="el-table__header" style="width: 960px;">
                                        <tr>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_14 is-leaf">
                                                <div class="cell">赠险ID</div></th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_15 is-leaf">
                                                <div class="cell">保险名称</div></th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_16 is-leaf">
                                                <div class="cell">赠险图片</div></th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_17 is-leaf">
                                                <div class="cell">赠险开始时间</div></th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_18 is-leaf">
                                                <div class="cell">赠险结束时间</div></th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_19 is-leaf">
                                                <div class="cell">赠险状态</div></th>
                                        </tr>
                                        <tr class="el-table__row">
                                            <td class="el-table_1_column_14">
                                                <div class="cell">{{item.couponId}}</div>
                                            </td>
                                            <td class="el-table_1_column_15">
                                                <div class="cell">{{item.couponName}}</div></td>
                                            <td class="el-table_1_column_16">
                                                <img :src="item.productLogo" width="50px" height="50px"/>
                                            </td>
                                            <td class="el-table_1_column_17">
                                                <div class="cell">
                                                    {{item.effTimestr}}
                                                </div>
                                            </td>
                                            <td class="el-table_1_column_18">
                                                <div class="cell">
                                                    {{item.expTimestr}}
                                                </div>
                                            </td>
                                            <td class="el-table_1_column_19">
                                                <div class="cell">{{item.sts}}</div>
                                            </td>
                                        </tr>
                                    </table>
                                </el-row>

                                <el-row style="padding-top: 8px">
                                    <el-col :span="4" align="center"  >
                                        赠险总数量
                                    </el-col>
                                    <el-col :span="15">
                                        <el-form-item  :prop="'redGiftInsuranceData['+topIndex+'].totalAmount'"
                                                       :rules="[{validator: validAmount, trigger: 'blur,change'}]">
                                            <el-input v-model="item.totalAmount" :disabled="item.totalAmountDisabled" style="width:300px">
                                            </el-input>
                                        </el-form-item>
                                        <el-checkbox v-model="item.totalAmountNotLimitTmp"
                                                     @change.native="checkIsLongTerm(topIndex,$event)">无限制</el-checkbox>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="4" align="center"  >
                                        每人最多发放个数
                                    </el-col>
                                    <el-col :span="15">
                                        <el-form-item  :prop="'redGiftInsuranceData['+topIndex+'].userAmount'"
                                                       :rules="[{required: true, message: '个数不能为空', trigger: 'blur'}]">
                                            <el-input v-model="item.userAmount" style="width:300px"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="4" align="center"  >
                                        赠险有效期类型
                                    </el-col>
                                    <el-col :span="20">

                                        <el-select v-model="item.periodType" >
                                            <el-option v-for="itemChild in promotionTypeClassArr" :key="itemChild.value"
                                                       :label="itemChild.label"  :value="itemChild.value">
                                            </el-option>
                                        </el-select>

                                        <span v-if="item.periodType==10">
                                             <el-form-item  :prop="'redGiftInsuranceData['+topIndex+'].effDateStr'"
                                                            :rules="[{required: true,type:'date' ,message: '日期不能为空', trigger: 'change'}]">
                                                <el-date-picker  size="small" v-model="item.effDateStr" type="datetime" placeholder="选择日期" >
                                                </el-date-picker>
                                             </el-form-item>
                                             -
                                            <el-form-item  :prop="'redGiftInsuranceData['+topIndex+'].expDateStr'"
                                                           :rules="[{required: true,type:'date', message: '日期不能为空', trigger: 'change'}]">
                                                <el-date-picker size="small" v-model="item.expDateStr" type="datetime"  placeholder="选择日期" >
                                                </el-date-picker>
                                            </el-form-item>
                                        </span>

                                        <span v-if="item.periodType==5">
                                            <el-form-item  :prop="'redGiftInsuranceData['+topIndex+'].periodValue'"
                                                           :rules="[{required: true, message: '使用期限不能为空', trigger: 'blur'}]">
                                                <el-input v-model="item.periodValue" style="width:300px"></el-input>
                                            </el-form-item>

                                            <el-select v-model="item.periodValue2" >
                                                <el-option v-for="itemChild in periodValueArr" :key="itemChild.value"
                                                           :label="itemChild.label"  :value="itemChild.value">
                                                </el-option>
                                            </el-select>
                                        </span>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="3" align="center"  >
                                        &nbsp;
                                    </el-col>
                                    <el-col  align="left"  >
                                        <el-button type="primary" @click="delPro(item.couponId)">删 除</el-button>
                                    </el-col>
                                </el-row>

                            </el-row>
                        </template>
                    </el-form>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" align="center"  >
                    <el-button type="primary" @click="commit()">确 定</el-button>
                    <el-button type="primary" @click="backParent()">取 消</el-button>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24" align="center"  >
                    <el-dialog :visible.sync="redGiftInsuranceViewFlag" :modal-append-to-body="false"  v-bind:size="'large'">
                        <giftInsuranceChooseWin v-on:child-geiIds="chooseRedGiftInsurance"
                                                v-on:child-cancle="redGiftInsuranceViewFlag=false"
                                                v-bind:selectType="'multiple'"
                        ></giftInsuranceChooseWin>
                    </el-dialog>
                </el-col>
            </el-row>

            <el-dialog :visible.sync="userViewFlag" :modal-append-to-body="false"  v-bind:size="'large'">
                <userChooseWin v-on:child-geiIds="chooseUsers" v-on:child-cancle="userViewFlag=false"
                               v-bind:selectType="'multiple'"
                ></userChooseWin>
            </el-dialog>

        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import config from '@api/config';
    import * as util from '@src/utils/util';
    import * as  static_data from '@utils/static_data.js';
    import uploadImg from "@src/components/uploadImg";
    import giftInsuranceChooseWin from "./giftInsuranceChooseWin.vue";
    import Vue from 'vue';
    import userChooseWin from "./userChooseWin.vue";

    export default {
        components: {
            uploadImg,giftInsuranceChooseWin,userChooseWin
        },
        data() {
            var checkEmpty = (rule, value, callback) => {
                if(!this.notExpTmp){ //如果不是长期
                    if (value === '') {
                        callback(new Error('请输入日期'));
                    }else{
                        callback();
                    }
                }else{
                    callback();
                }
            };
            return {
                productExists:true,
                initInline:true,
                promotionTypeArr:static_data.RedPromotionTypeArr,
                promotionChannelsArr:[],
                couponUserTypeArr:static_data.couponUserTypeArr,
                promotionTypeClassArr:static_data.promotionTypeClassArr,
                output:{
                    redGiftInsuranceData:[]
                },
                periodValueArr:static_data.periodValueArr,
                redGiftInsuranceViewFlag:false,
                userViewFlag:false,
                userResponsesData:[],
                promotionChannelsTmpArr:[0],// 临时变量
                notExpTmp:false,
                notExpTmpDisabled:false,
                redForm: {
                    isGift:'1',
                    promotionName:'',
                    promotionIntro:'',
                    promotionType:'10',
                    promotionChannels:'',
                    promotionLogo:'',
                    userType:0,
                    effTimeStr:'',
                    expTimeStr:'',
                    productCoupondsMap:null,
                    notExp:'',
                    promotionUserId:'' //客户的id
                },
                rules:{
                    effTimeStr: [
                        { validator: checkEmpty, trigger: 'change' }
                    ],
                    expTimeStr: [
                        { validator: checkEmpty, trigger: 'change' }
                    ]
                },
                redRules:{
                }
            };
        },
        created() {
            this.acqPromotionChannels();
        },
        methods: {
            acqPromotionChannels(){
                let obj = {
                    url: '/channel/menuList'
                }
                config(obj).then(response => {
                    if (response.respCode == '000000') {
                        var initData =[];
                        for(var i=0;i<response.data.domainsPoList.length;i++) {
                            initData.push({
                                value:response.data.domainsPoList[i].domainId.toString(),
                                label:response.data.domainsPoList[i].domainName
                            });
                        }
                        this.promotionChannelsArr = initData;
                    } else {
                        this.$message.error(response.respMsg)
                    }
                }).catch(err => {

                })
            },
            chooseRedGiftInsurance(redGiftInsuranceRow){
                var that = this;
                console.log(redGiftInsuranceRow+'=========');
                var checkMap = new Map() ;
                that.output.redGiftInsuranceData.forEach(function(v) {
                    checkMap.set(v.couponId,'xxx');
                });


                var nowDate = new Date();
                redGiftInsuranceRow.forEach(function(v) {
                    if(!checkMap.has(v.couponId)){
                        that.output.redGiftInsuranceData.push(v);
                        that.$set(that.output.redGiftInsuranceData[that.output.redGiftInsuranceData.length-1],'periodType',5);
                        that.$set(that.output.redGiftInsuranceData[that.output.redGiftInsuranceData.length-1],'totalAmountNotLimitTmp',false);
                        that.$set(that.output.redGiftInsuranceData[that.output.redGiftInsuranceData.length-1],'totalAmount','');
                        that.$set(that.output.redGiftInsuranceData[that.output.redGiftInsuranceData.length-1],'totalAmountDisabled',false);

                        that.$set(that.output.redGiftInsuranceData[that.output.redGiftInsuranceData.length-1],'effDateStr', null);
                        that.$set(that.output.redGiftInsuranceData[that.output.redGiftInsuranceData.length-1],'expDateStr',null);
                        that.$set(that.output.redGiftInsuranceData[that.output.redGiftInsuranceData.length-1],'periodValue2',1);

                        var startArray =  v.effTimestr.split("-");
                        var endArray = v.expTimestr.split("-");
                        var startDt = new Date(startArray[0], startArray[1]*1-1, startArray[2].substring(0,2));
                        var endDt = new Date(endArray[0], endArray[1]*1-1, endArray[2].substring(0,2));

                        var str = '';
                        if(v.sts == 10){
                            if(nowDate<startDt){
                                str = '未开始';
                            }else if(nowDate > endDt){
                                str = '已结束';
                            }else{
                                str = '进行中';
                            }

                        } else {
                            str = '已作废';
                        }
                        v.sts =str;
                    }
                });
                this.redGiftInsuranceViewFlag = false;
            },
            delPro(id){ //删除
                this.$confirm('确定删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    for(var i=0;i<this.output.redGiftInsuranceData.length;i++){
                        if(this.output.redGiftInsuranceData[i].couponId==id){
                            this.output.redGiftInsuranceData.splice(i,1);
                        }
                    }
                }).catch(() => {
                });
            },
            delUserPro(id){
                this.$confirm('确定删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    for(var i=0;i<this.userResponsesData.length;i++){
                        console.log(this.userResponsesData[i].userId,id,'===========');
                        if(this.userResponsesData[i].userId==id){
                            this.userResponsesData.splice(i,1);
                        }
                    }
                }).catch(() => {
                });
            },
            chooseUsers(userRows){
                var that = this;
                var checkMap = new Map() ;
                that.userResponsesData.forEach(function(v) {
                    checkMap.set(v.userId,'xxx');
                });
                userRows.forEach(function(v) {
                    if(!checkMap.has(v.userId)){
                        that.userResponsesData.push(v);
                    }
                });

                this.userViewFlag = false;
            },
            backParent(){
                this.$router.push({ path: '/operationManage/coupon/activity'})
            },
            commit () {
                if(this.output.redGiftInsuranceData.length==0){
                    this.productExists = false;
                }else{
                    this.productExists = true;
                }

                var redGiftFormFlag = false;
                this.$refs['redGiftForm'].validate((valid) => {
                    if(valid){
                        redGiftFormFlag = true;
                    }else{
                        redGiftFormFlag = false ;
                    }
                });

                if(this.redForm.userType==99&&this.userResponsesData.length==0){
                    this.$message.error('关联用户不能为空!')
                    return;
                }

                this.$refs['redForm'].validate((valid) => {
                    if (valid&&redGiftFormFlag) { //两个都通过了，可以入表
                        //时间转换
                        this.redForm.effTimeStr = util.changeDate(this.redForm.effTimeStr,"datetime");
                        this.redForm.expTimeStr = util.changeDate(this.redForm.expTimeStr,"datetime");
                        this.redForm.promotionChannels = this.promotionChannelsTmpArr.join(',');
                        this.redForm.notExp=(this.notExpTmp?"1":"");
                        this.redForm.productCoupondsMap = new Object();

                        var that = this;
                        this.output.redGiftInsuranceData.forEach(function (vi) {
                            vi.totalAmountNotLimit =(vi.totalAmountNotLimitTmp?'1':'0');
                            vi.effDateStr = util.changeDate(vi.effDateStr,"datetime");
                            vi.expDateStr = util.changeDate(vi.expDateStr,"datetime");

                            if(vi.periodType==10){
                                vi.periodValue = '';
                                vi.periodValue2='';
                            }else{
                                vi.effDateStr = '';
                                vi.expDateStr='';
                            }
                            that.redForm.productCoupondsMap[vi.couponId]=
                                {
                                    couponId:vi.couponId,
                                    effDateStr:vi.effDateStr,
                                    expDateStr:vi.expDateStr,
                                    periodType:vi.periodType,
                                    periodValue:vi.periodValue,
                                    periodValue2:vi.periodValue2,
                                    promotionCouponName:vi.couponName,
                                    totalAmount:vi.totalAmount,
                                    totalAmountNotLimit:vi.totalAmountNotLimit,
                                    userAmount:vi.userAmount
                                };
                        });


                        that.redForm.promotionUserId = "";
                        this.userResponsesData.forEach(function (vi) {
                            that.redForm.promotionUserId +=((that.redForm.promotionUserId.length==0?'':',')+vi.userId);
                        });

                        this.redForm.url =  '/coupons/couponsaddInfo';
                        config(this.redForm).then(response => {
                            if (response.respCode === '000000') {
                                this.$message.success(response.respMsg)
                            } else {
                                this.$message.error(response.respMsg)
                            }
                        }).catch(err => {
                        })
                    }
                })
            },
            acqImgUrl(params){
                if('promotionLogo'==params[1]){
                    this.redForm.promotionLogo = params[0]
                }
            },
            checkIsLongTerm(indSor,ev){
                if(ev.target.checked){
                    //点击时间 ,如果点击了无限制的话，那么就不需要对总数量进行校验
                    this.$refs['redGiftForm'].fields.forEach(function (field) {
                        if(field.prop.endsWith('['+indSor+'].totalAmount')){
                            field.resetField();
                        }
                    });
                    this.output.redGiftInsuranceData[indSor].totalAmount = '';
                    this.output.redGiftInsuranceData[indSor].totalAmountDisabled = true;
                }else{
                    this.output.redGiftInsuranceData[indSor].totalAmountDisabled = false;
                }
            },
            validAmount(rule,value,callback,source,options){
                var field = rule.field;
                if(field&&!isNaN(field.replace('redGiftInsuranceData[','').replace('].totalAmount',''))){
                    if(!this.output.redGiftInsuranceData[field.replace('redGiftInsuranceData[','').replace('].totalAmount','')*1]
                            .totalAmountNotLimitTmp){
                        if (value == '') {
                            callback(new Error('请输入值'));
                        }else{
                            callback();
                        }
                    }else{
                        callback();
                    }
                }
                callback();
            }
        },
        watch: {
            notExpTmp(curVal, oldVal){
                if(curVal){
                    this.notExpTmpDisabled =true;
                    this.redForm.effTimeStr='';
                    this.redForm.expTimeStr='';
                }else{
                    this.notExpTmpDisabled =false;
                }
            }
        }
    };
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
    .www-v-button{
        position:absolute;
        left: 500px;
        z-index:1;
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