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

                        <el-row style="padding-top: 10px">
                            <el-col :span="3" align="center"  >
                                活动时间:
                            </el-col>
                            <el-col :span="21">
                                <el-form-item prop="effTimeStr" >
                                    <el-date-picker size="small" v-model="redForm.effTimeStr" type="datetime" :disabled="notExpTmpDisabled" placeholder="选择日期" >
                                    </el-date-picker>
                                </el-form-item>
                                -
                                <el-form-item prop="expTimeStr" >
                                    <el-date-picker size="small" v-model="redForm.expTimeStr" type="datetime"  :disabled="notExpTmpDisabled"  placeholder="选择日期" >
                                    </el-date-picker>
                                </el-form-item>
                                <el-checkbox v-model="notExpTmp">长期</el-checkbox>
                            </el-col>
                        </el-row>
                    </el-form>

                    <el-form  class="credit-aplly-form" ref="redGiftForm" :model="output" :rules="redRules" :inline="initInline">
                        <el-row>
                            <el-col :span="3" align="center"  >
                                选择活动红包
                            </el-col>
                            <el-col :span="7">
                                <el-form-item>
                                    <el-button type="primary" icon="plus" size="small" @click="redPacketViewFlag=true">选择红包</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <template>
                            <el-row v-show="output.redPacketData.length!=0"
                                    v-for="(item,topIndex) in output.redPacketData"
                                    :key="item.couponId"  >
                                <el-row>
                                    <table cellspacing="0" cellpadding="0" border="1" class="el-table__header" style="width: 960px;">
                                        <tr>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_14 is-leaf">
                                                <div class="cell">红包ID</div></th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_15 is-leaf">
                                                <div class="cell">红包名称</div></th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_16 is-leaf">
                                                <div class="cell">红包金额(元)</div></th>
                                            <th colspan="1" rowspan="1" class="el-table_1_column_17 is-leaf">
                                                <div class="cell">红包满减限制</div></th>
                                        </tr>
                                        <tr class="el-table__row">
                                            <td class="el-table_1_column_14">
                                                <div class="cell">{{item.couponId}}</div>
                                            </td>
                                            <td class="el-table_1_column_15">
                                                <div class="cell">{{item.couponName}}</div>
                                            </td>
                                            <td class="el-table_1_column_19">
                                                <div class="cell">{{item.couponMaxValue/100}}</div>
                                            </td>
                                            <td class="el-table_1_column_19">
                                                <div class="cell">{{item.offUpto}}</div>
                                            </td>
                                        </tr>
                                    </table>
                                </el-row>
                                <el-row style="padding-top: 10px">
                                    <el-col :span="4" align="center"  >
                                        红包总数量
                                    </el-col>
                                    <el-col :span="15">
                                        <el-form-item  :prop="'redPacketData['+topIndex+'].totalAmount'"
                                                       :rules="[{validator: validAmount, trigger: 'blur,change'}]">
                                            <el-input v-model="item.totalAmount"
                                                      :disabled="item.totalAmountDisabled" style="width:300px"></el-input>
                                        </el-form-item>

                                        <el-checkbox v-model="item.totalAmountNotLimitTmp"
                                                     @change.native="checkIsLongTerm(topIndex,$event)">无限制</el-checkbox>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="4" align="center"  >
                                        红包名称
                                    </el-col>
                                    <el-col :span="15">
                                        <el-form-item  :prop="'redPacketData['+topIndex+'].promotionCouponName'"
                                                       :rules="[{required: true, message: '红包名称不能为空', trigger: 'blur'}]">
                                            <el-input v-model="item.promotionCouponName" style="width:300px"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="4" align="center"  >
                                        红包备注信息
                                    </el-col>
                                    <el-col :span="15">
                                        <el-input v-model="item.couponDesc" style="width:300px"></el-input>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="4" align="center"  >
                                        每人最多发放个数:
                                    </el-col>
                                    <el-col :span="15">
                                        <el-form-item  :prop="'redPacketData['+topIndex+'].userAmount'"
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
                                            <el-form-item  :prop="'redPacketData['+topIndex+'].effDateStr'"
                                                           :rules="[{required: true,type:'date' ,message: '日期不能为空', trigger: 'change'}]">
                                                    <el-date-picker  size="small" v-model="item.effDateStr" type="datetime" placeholder="选择日期" >
                                                    </el-date-picker>
                                            </el-form-item>
                                             -
                                            <el-form-item  :prop="'redPacketData['+topIndex+'].expDateStr'"
                                                           :rules="[{required: true,type:'date' ,message: '日期不能为空', trigger: 'change'}]">
                                                    <el-date-picker size="small" v-model="item.expDateStr" type="datetime"  placeholder="选择日期" >
                                                </el-date-picker>
                                            </el-form-item>
                                        </span>

                                        <span v-if="item.periodType==5">
                                            <el-form-item  :prop="'redPacketData['+topIndex+'].periodValue'"
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
                                    <el-col :span="4" align="center"  >
                                        <el-button type="primary" @click="delCoup(item.couponId)">删 除</el-button>
                                    </el-col>
                                </el-row>
                            </el-row>
                        </template>


                        <el-row>
                            <el-col :span="3" align="center"  >
                                红包使用范围
                            </el-col>
                            <el-col :span="7">
                                <el-form-item>
                                    <el-select v-model="redForm.productUseLimit" >
                                        <el-option v-for="item in productUseLimitArr" :key="item.value"  :label="item.label"  :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row v-show="productUseLimitShow" style="padding-top: 10px">
                            <el-col :span="3" align="center"  >
                                选择使用分类
                            </el-col>
                            <el-col :span="21">
                                <el-checkbox-group
                                        v-model="promotionProductTypeArr">

                                    <el-row v-for="(classInfo,index) in productClassesArr" :key="classInfo.classId"
                                            style="padding: 5px">
                                        <el-col :span="3">
                                            {{classInfo.className}}
                                        </el-col>
                                        <el-col :span="21">
                                            <el-checkbox v-for="child in classInfo.children"
                                                         :label="child.classId" :key="child.classId">
                                                {{child.className}}
                                            </el-checkbox>
                                        </el-col>
                                    </el-row>
                                </el-checkbox-group>
                            </el-col>
                        </el-row>

                        <el-row v-show="!productUseLimitShow">
                            <el-col :span="3" align="center"  >
                                关联产品
                            </el-col>
                            <el-col :span="7">
                                <el-button type="primary" icon="plus" size="small" @click="productChooseViewFlag = true">点击选择</el-button>
                            </el-col>
                        </el-row>
                        <el-row v-show="productsResponsesData.length!=0" v-for="item in productsResponsesData" :key="item.productId">
                            <el-row>
                                <table cellspacing="0" cellpadding="0" border="1" class="el-table__header" style="width: 960px;">
                                    <tr>
                                        <th colspan="1" rowspan="1" class="el-table_1_column_14 is-leaf">
                                            <div class="cell">产品ID</div></th>
                                        <th colspan="1" rowspan="1" class="el-table_1_column_15 is-leaf">
                                            <div class="cell">保险名称</div></th>
                                        <th colspan="1" rowspan="1" class="el-table_1_column_16 is-leaf">
                                            <div class="cell">承保公司</div></th>
                                        <th colspan="1" rowspan="1" class="el-table_1_column_19 is-leaf">
                                            <div class="cell">保险类别</div></th>
                                        <th colspan="1" rowspan="1" class="el-table_1_column_20 is-leaf">
                                            <div class="cell">当前库存</div></th>
                                        <th colspan="1" rowspan="1" class="el-table_1_column_18 is-leaf">
                                            <div class="cell">保费金额(元)</div></th>
                                    </tr>
                                    <tr class="el-table__row">
                                        <td class="el-table_1_column_14">
                                            <div class="cell">{{item.productId}}</div>
                                        </td>
                                        <td class="el-table_1_column_15">
                                            <div class="cell">{{item.productName}}</div></td>
                                        <td class="el-table_1_column_16">
                                            <div class="cell">{{item.insurerName}}</div></td>
                                        <td class="el-table_1_column_17">
                                            <div class="cell">
                                                {{item.productSource==1?'自研':(item.productSource==2?'保险公司':'其他')}}
                                            </div>
                                        </td>
                                        <td class="el-table_1_column_18">
                                            <div class="cell">
                                                {{item.maxQuantity==-1?'不限':(item.maxQuantity-item.totalQuantity)}}
                                            </div>
                                        </td>
                                        <td class="el-table_1_column_19">
                                            <div class="cell"> {{item.minPremium/100+'-'+item.maxPremium/100}}</div>
                                        </td>
                                    </tr>
                                </table>
                            </el-row>
                            <el-row>
                                <el-col :span="4" align="center"  >
                                    <el-button type="primary" @click="delProduct(item.productId)">删 除</el-button>
                                </el-col>
                            </el-row>
                        </el-row>
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
                    <el-dialog :visible.sync="redPacketViewFlag" :modal-append-to-body="false"  v-bind:size="'large'">
                        <redPacketChooseWin v-on:child-geiIds="chooseRedPacket"
                                            v-on:child-cancle="redPacketViewFlag=false"
                                            v-bind:selectType="'multiple'"
                        ></redPacketChooseWin>
                    </el-dialog>
                </el-col>
            </el-row>

            <el-dialog :visible.sync="productChooseViewFlag" :modal-append-to-body="false"  v-bind:size="'large'">
                <specialProductChooseWin v-on:child-geiIds="chooseProdIds" v-on:child-cancle="productChooseViewFlag=false"
                                         v-bind:selectType="'multiple'"
                ></specialProductChooseWin>
            </el-dialog>

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
    import redPacketChooseWin from "./redPacketChooseWin.vue";
    import Vue from 'vue';
    import specialProductChooseWin from "./specialProductChooseWin.vue";
    import userChooseWin from "./userChooseWin.vue";

    export default {
        components: {
            uploadImg,
            redPacketChooseWin,
            specialProductChooseWin,
            userChooseWin
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
                initInline:true,
                promotionTypeArr:static_data.RedPromotionTypeArr,
                productUseLimitArr:static_data.productUseLimitArr,
                promotionChannelsArr:[],
                couponUserTypeArr:static_data.couponUserTypeArr,
                promotionTypeClassArr:static_data.promotionTypeClassArr,
                output:{
                    redPacketData:[]
                },
                periodValueArr:static_data.periodValueArr,
                redPacketViewFlag:false,
                userViewFlag:false,
                promotionChannelsTmpArr:[],// 临时变量
                notExpTmp:false,
                notExpTmpDisabled:false,
                redForm: {
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
                    promotionProductType:'',
                    productUseLimit:1,
                    promotionProductId:'',
                    promotionUserId:'' //客户的id
                },
                productUseLimitShow:true,
                productClassesArr:[],
                promotionProductTypeArr:[],
                productsResponsesData:[],
                userResponsesData:[],
                productChooseViewFlag:false,
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
            this.acqProductClassesList();
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
            acqProductClassesList(){
                let obj = {
                    url: '/product/param/findProductClassesList'
                }
                config(obj).then(response => {
                    if (response.respCode == '000000') {
                        this.productClassesArr = response.data.productClassesList;
                    } else {
                        this.$message.error(response.respMsg)
                    }
                }).catch(err => {

                })
            },
            chooseRedPacket(redGiftInsuranceRow){
                var that = this;
                var checkMap = new Map() ;
                that.output.redPacketData.forEach(function(v) {
                    checkMap.set(v.couponId,'xxx');
                });

                redGiftInsuranceRow.forEach(function(v) {
                    if(!checkMap.has(v.couponId)){
                        that.output.redPacketData.push(v);
                        that.$set(that.output.redPacketData[that.output.redPacketData.length-1],'periodType',5);
                        that.$set(that.output.redPacketData[that.output.redPacketData.length-1],'totalAmountNotLimitTmp',false);
                        that.$set(that.output.redPacketData[that.output.redPacketData.length-1],'totalAmount','');
                        that.$set(that.output.redPacketData[that.output.redPacketData.length-1],'totalAmountDisabled',false);

                        that.$set(that.output.redPacketData[that.output.redPacketData.length-1],'effDateStr', null);
                        that.$set(that.output.redPacketData[that.output.redPacketData.length-1],'expDateStr',null);
                        that.$set(that.output.redPacketData[that.output.redPacketData.length-1],'periodValue2',1);
                        that.$set(that.output.redPacketData[that.output.redPacketData.length-1],'couponDesc','');
                    }
                });
                this.redPacketViewFlag = false;
            },
            delCoup(id){ //删除
                this.$confirm('确定删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    for(var i=0;i<this.output.redPacketData.length;i++){
                        if(this.output.redPacketData[i].couponId==id){
                            this.output.redPacketData.splice(i,1);
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
            backParent(){
                this.$router.push({ path: '/operationManage/coupon/activity'})
            },
            commit () {
                if(this.productUseLimitShow){ //
                    if(this.promotionProductTypeArr.length==0){
                        this.$message.error('使用分类不能为空!')
                        return;
                    }
                }else{
                    if(this.productsResponsesData.length==0){
                        this.$message.error('活动产品不能为空!')
                        return;
                    }
                }

                if(this.redForm.userType==99&&this.userResponsesData.length==0){
                    this.$message.error('关联用户不能为空!')
                    return;
                }


                var redGiftFormFlag = false;
                this.$refs['redGiftForm'].validate((valid) => {
                    if(valid){
                        redGiftFormFlag = true;
                    }else{
                        redGiftFormFlag = false ;
                    }
                });

                var redFormFlag = false;
                this.$refs['redForm'].validate((valid) => {
                    if(valid){
                        redFormFlag = true;
                    }else{
                        redFormFlag = false ;
                    }
                });

                if(!redGiftFormFlag||!redFormFlag){
                    return ;
                }


                var that = this;
                //时间转换
                this.redForm.effTimeStr = util.changeDate(this.redForm.effTimeStr,"datetime");
                this.redForm.expTimeStr = util.changeDate(this.redForm.expTimeStr,"datetime");
                this.redForm.promotionChannels = this.promotionChannelsTmpArr.join(',');
                this.redForm.promotionProductType =  this.promotionProductTypeArr.join(',');

                that.redForm.promotionProductId = "";
                this.productsResponsesData.forEach(function (vi) {
                    that.redForm.promotionProductId +=((that.redForm.promotionProductId.length==0?'':',')+vi.productId);
                });
                that.redForm.promotionUserId = "";
                this.userResponsesData.forEach(function (vi) {
                    that.redForm.promotionUserId +=((that.redForm.promotionUserId.length==0?'':',')+vi.userId);
                });

                this.redForm.notExp=(this.notExpTmp?"1":"");
                this.redForm.productCoupondsMap = new Object();

                this.output.redPacketData.forEach(function (vi) {
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
                            promotionCouponName:vi.promotionCouponName,
                            totalAmount:vi.totalAmount,
                            totalAmountNotLimit:vi.totalAmountNotLimit,
                            userAmount:vi.userAmount,
                            couponDesc:vi.couponDesc,

                        };
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
            },
            acqImgUrl(params){
                if('promotionLogo'==params[1]){
                    this.redForm.promotionLogo = params[0]
                }
            },
            checkIsLongTerm(indSor,ev){
                if(ev.target.checked){
                    this.$refs['redGiftForm'].fields.forEach(function (field) {
                        if(field.prop.endsWith('['+indSor+'].totalAmount')){
                            field.resetField();
                        }
                    });

                    this.output.redPacketData[indSor].totalAmount = '';
                    this.output.redPacketData[indSor].totalAmountDisabled = true;
                }else{
                    this.output.redPacketData[indSor].totalAmountDisabled = false;
                }
            },
            chooseProdIds(productRow){
                var that = this;
                var checkMap = new Map() ;
                that.productsResponsesData.forEach(function(v) {
                    checkMap.set(v.productId,'xxx');
                });
                productRow.forEach(function(v) {
                    if(!checkMap.has(v.productId)){
                        v.commisionValue1 ='';
                        v.commisionValue2 ='';
                        that.productsResponsesData.push(v);
                    }
                });

                this.productChooseViewFlag = false;
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
            delProduct(id){ //删除
                this.$confirm('确定删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    for(var i=0;i<this.productsResponsesData.length;i++){
                        if(this.productsResponsesData[i].productId==id){
                            this.productsResponsesData.splice(i,1);
                        }
                    }
                }).catch(() => {
                });
            },
            validAmount(rule,value,callback){
                var field = rule.field;
                if(field&&!isNaN(field.replace('redPacketData[','').replace('].totalAmount',''))){
                    if(!this.output.redPacketData[field.replace('redPacketData[','').replace('].totalAmount','')*1]
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
            },
            'redForm.productUseLimit'(curVal, oldVal){
                if(curVal==1){
                    this.productUseLimitShow = true;
                    this.productsResponsesData = [];
                }else{
                    this.productUseLimitShow = false;
                    this.promotionProductTypeArr = [];
                };
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