<template>
    <div class="app-container">
        <div class="filter-container">
            <el-row>
                <el-col :span="20" :offset="1" >
                    <el-form label-width="150px" class="credit-aplly-form">
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3"  align="right" style="margin-top:8px;" >
                                佣金策略ID:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input v-model=" this.$route.query.id" style="width:265px;"  readonly="readonly"></el-input>
                          </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3"  align="right" style="margin-top:8px;" >
                                佣金策略名称:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-input v-model="EditForm.configName" style="width:265px;"></el-input>
                          </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="3" align="right" style="margin-top:8px;" >
                                上架渠道:
                            </el-col>
                            <el-col :span="16"  style="margin-left:10px;position:relative;">
                                <el-checkbox style="margin-top:8px;" v-model="all" @change="change">所有渠道</el-checkbox>
                                <el-checkbox-group v-model="EditForm.domainIds" style="position:relative;left:100px;top:-20px;width:300px;">
                                    <el-checkbox v-for="(item,index) in domainIdArr" :key="item.value"  :label="item.value" v-bind:style="{ marginLeft: index==0||index%4==0?left=0:left=15+'px', marginBottom:'5px' }" :disabled="disabled">
                                        {{item.label}}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3"  align="right" style="margin-top:4px;" >
                                起止时间:
                            </el-col>
                            <el-col :span="16" style="margin-left:10px;">
                                <el-date-picker size="small" v-model="EditForm.effTimestr" type="date" placeholder="选择日期" style="margin-right:4px;">
                                </el-date-picker>至
                                <el-date-picker size="small" v-model="EditForm.expTimestr" type="date" placeholder="选择日期" style="margin-left:4px;">
                                </el-date-picker>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:22px;">
                            <el-col :span="3"  align="right" style="margin-top:8px;"  >
                                关联产品:
                            </el-col>
                            <el-col :span="7" style="margin-left:10px;">
                                <el-button type="primary" icon="plus" size="small" @click="chooseProduct()" style="margin-top:6px;">选择</el-button>
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
                                            <div class="cell">保险公司</div></th>
                                        <th colspan="1" rowspan="1" class="el-table_1_column_17 is-leaf">
                                            <div class="cell">产品总量</div></th>
                                        <th colspan="1" rowspan="1" class="el-table_1_column_18 is-leaf">
                                            <div class="cell">保费金额(元)</div></th>
                                        <th colspan="1" rowspan="1" class="el-table_1_column_19 is-leaf">
                                            <div class="cell">保险类别</div></th>
                                        <th colspan="1" rowspan="1" class="el-table_1_column_20 is-leaf">
                                            <div class="cell">操作</div></th>
                                        <th class="gutter" style="width: 0px;"></th>
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
                                                <span data-v-f840b7d2="">{{item.maxQuantity==-1?'不限':item.maxQuantity}}</span>
                                            </div>
                                        </td>
                                        <td class="el-table_1_column_18">
                                            <div class="cell">
                                                <span data-v-f840b7d2="">{{item.minPremium/100+'-'+item.maxPremium/100}}</span>
                                            </div>
                                        </td>
                                        <td class="el-table_1_column_19">
                                            <div class="cell">{{item.className}}</div></td>
                                        <td class="el-table_1_column_20">
                                            <div class="cell"> <a @click="delPro(item.productId)" href="javascript:void(0);">删除</a></div>
                                        </td>
                                    </tr>
                                </table>
                            </el-row>
                            <el-row style="padding:10px 0px;">
                                <el-col :span="4" align="right" style="margin-top:8px;" >
                                    一级分销费率:
                                </el-col>
                                <el-col :span="5" style="margin-left:10px;">
                                    <el-input v-model="item.commisionValue1" style="width:80px;"></el-input>
                                    <span>%</span>
                                </el-col>

                                <el-col :span="4" align="right" style="margin-top:8px;">
                                    二级分销费率:
                                </el-col>
                                <el-col :span="5" style="margin-left:10px;">
                                    <el-input v-model="item.commisionValue2" style="width:80px;"></el-input>
                                    <span>%</span>
                                </el-col>
                            </el-row>
                        </el-row>
                    </el-form>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24" align="center"  >
                    <el-button type="primary" @click="commit()">保存</el-button>
                    <el-button type="primary" @click="backParent()">返回</el-button>
                </el-col>
            </el-row>

            <el-dialog :visible.sync="productChooseViewFlag" :modal-append-to-body="false"  v-bind:size="'large'">
                <productChooseWin v-on:child-geiIds="chooseProdIds" v-on:child-cancle="productChooseViewFlag=false"
                                  v-bind:selectType="productChooseSelectType"
                ></productChooseWin>
            </el-dialog>

        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import config from '@api/config';
    import * as util from '@src/utils/util';
    import * as  static_data from '@utils/static_data.js';
    import productChooseWin from "./productChooseWin.vue";
    // import ElRow from "element-ui/packages/row/src/row";

    export default {
        components: {
            // ElRow,
            productChooseWin
        },
        data() {
            return {
                domainIdArr:[],
                all:false,
                left:15,
                disabled:false,
                EditForm: {
                    configName :'',
                    effTimestr:'',
                    expTimestr:'',
                    domainIds:[],
                    commisionProductsMap:null,
                    configId:this.$route.query.id
                },
                productChooseViewFlag:false,
                productChooseSelectType:'multiple',
                productsResponsesData:[]
            }
        },
        created() {
            this.acqDomainIds();
            this.getDetail();
        },
        methods: {
            change(){
               if (this.all) {
                    this.disabled = true
                    this.EditForm.domainIds = [];
                    for (let i = 0; i < this.domainIdArr.length; i++) {
                        this.EditForm.domainIds.push(this.domainIdArr[i].value)
                    }
                } else {
                    this.disabled = false;
                    this.EditForm.domainIds = [];
                }
            },
            acqDomainIds(){
                let obj = {
                    url: '/channel/menuList'
                }
                config(obj).then(response => {
                    if (response.respCode == '000000') {
                        for(var i=0;i<response.data.domainsPoList.length;i++) {
                            this.domainIdArr.push({
                                value:response.data.domainsPoList[i].domainId.toString(),
                                label:response.data.domainsPoList[i].domainName
                            });
                        }
                    } else {
                        this.$message.error(response.respMsg)
                    }

                }).catch(err => {

                })
            },
            getDetail () {
                let obj = {
                    url: '/operate/getEditCommisionConfigById',
                    configId: this.$route.query.id*1,
                };
                config(obj).then(response => {
                   if (response.respCode === '000000') {

                        this.EditForm.configName = response.data.configName;
                        this.EditForm.effTimestr= response.data.effDateStr;
                        this.EditForm.expTimestr= response.data.expDateStr;
                        this.EditForm.domainIds= response.data.configDomains.split(',');
                        console.log(this.EditForm.domainIds)
                        this.EditForm.specialProductsMap= response.data.configName;
                        if(response.data.productsList&&response.data.productsList.length>0){
                            for(var i=0;i<response.data.productsList.length;i++){
                                this.productsResponsesData =  this.productsResponsesData.concat({
                                    productId:response.data.productsList[i].productId,
                                    productName:response.data.productsList[i].productName,
                                    insurerName:response.data.productsList[i].insurerName,
                                    className:response.data.productsList[i].className,
                                    maxQuantity:response.data.productsList[i].maxQuantity,
                                    minPremium:response.data.productsList[i].minPremium,
                                    maxPremium:response.data.productsList[i].maxPremium,
                                    commisionValue1:response.data.productsList[i].commisionValue1,
                                    commisionValue2:response.data.productsList[i].commisionValue2,
                                    classType:response.data.productsList[i].classType
                                });
                            }
                        }
                    }
                }).catch(err => {

                })
            },
            chooseProduct(){ //弹出选择产品选项
                this.productChooseViewFlag = true;
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
            delPro(id){ //删除
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
            backParent(){
                this.$router.push({ path: '/operationManage/marketingStrategy/commissionStrategy'})
            },
            commit () {
                let first="";
                let sec="";
                 if (this.EditForm.configName == "") {
                    this.$message({
                        type: 'warning',
                        message: '佣金策略名称不能为空'
                    });
                    return false
                }
                 console.log(this.EditForm.domainIds.length)
                if (parseInt(this.EditForm.domainIds.length)==0) {
                    console.log(this.EditForm.domainIds.length)
                    this.$message({
                        type: 'warning',
                        message: '上架渠道不能为空'
                    });
                    return false
                }
                
               if (typeof (this.EditForm.effTimestr) == 'string') {
                    first = new Date(this.EditForm.effTimestr.replace(/-/g, '/')).getTime()
                   } else {
                    first = new Date(this.EditForm.effTimestr).getTime()
                }
                if (typeof (this.EditForm.expTimestr) == 'string') {
                    sec = new Date(this.EditForm.expTimestr.replace(/-/g, '/')).getTime()
                } else {
                    sec = new Date(this.EditForm.expTimestr).getTime()
                }
                if (first > sec) {
                    this.$message({
                        type: 'warning',
                        message: '结束日期必须大于或等于起始日期'
                    });
                    return false
                }
                if (this.productsResponsesData == "") {
                    this.$message({
                        type: 'warning',
                        message: '关联产品不能为空'
                    });
                    return false
                }
                let reg = /^((\d|[1-9]\d)|100)$/;
                for (let i = 0; i < this.productsResponsesData.length; i++) {
                 
                    if (parseInt(this.productsResponsesData[i].commisionValue1.length)!=0) {
                          if (!reg.test(this.productsResponsesData[i].commisionValue1)) {
                            this.$message({
                                type: 'warning',
                                message: '一级分销费率只能是0到100的整数，包括0和100'
                            });
                            return false
                        }
                    }
                   if (parseInt(this.productsResponsesData[i].commisionValue2.length)!=0) {
                        if (!reg.test(this.productsResponsesData[i].commisionValue2)) {
                            this.$message({
                                type: 'warning',
                                message: '二级分销费率只能是0到100的整数，包括0和100'
                            });
                            return false
                        }
                    }

                }
                   

                
                this.EditForm.commisionProductsMap = new Object();
                if(this.productsResponsesData.length>0){
                    for(var i=0;i<this.productsResponsesData.length;i++){
                        this.EditForm.commisionProductsMap[this.productsResponsesData[i].productId]=
                            {
                                productId:this.productsResponsesData[i].productId,
                                classType:this.productsResponsesData[i].classType,
                                commisionValue1:this.productsResponsesData[i].commisionValue1,
                                commisionValue2:this.productsResponsesData[i].commisionValue2
                            };
                    }
                }
                //时间转换
                this.EditForm.effTimestr = util.changeDate(this.EditForm.effTimestr);
                this.EditForm.expTimestr = util.changeDate(this.EditForm.expTimestr);

                this.EditForm.url =  '/operate/updateCommision';
                config(this.EditForm).then(response => {
                    if (response.respCode === '000000') {
                        this.$message.success(response.respMsg)
                         setTimeout(() => {
                                this.$router.push({
                                     path: "/operationManage/marketingStrategy/commissionStrategy",
                                 });

                            }, 2000);
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
</style>