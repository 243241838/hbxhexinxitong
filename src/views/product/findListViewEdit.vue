<template>
    <div class="app-container calendar-list-container">
        <el-tabs v-model="tabsName" type="card" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first">
                <div class="filter-container">
                    <h3 class="title">产品投保信息</h3>
                    <div class="filter-container">
                        <el-form label-width="200px" :model="userInfoData" :rules="rules" ref="userInfo" class="credit-aplly-form">
                            <el-form-item prop="productName" label="产品名称:" required>
                                <el-input v-model="userInfoData.productName" style="width:320;">
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="productFeature" label="产品亮点1:" required>
                                <el-input v-model="userInfoData.productFeature" style="width:320px;">
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="perferWords" label="产品亮点2:" required>
                                <el-input v-model="userInfoData.perferWords" style="width:320px;">
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="productLogo" label="产品图片:" required>
                                <img :src="userInfoData.productLogo" alt="" v-if="userInfoData.productLogo" width="120" height="120">
                                <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:paramName="'userInfoData.productLogo'" :bodyWidth="200"></uploadImg>
                            </el-form-item>
                            <el-form-item prop="productTagUrls" label="产品标签:" required>
                                <img :src="userInfoData.productTagUrls" alt="" v-if="userInfoData.productTagUrls" width="120" height="120">
                                <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:paramName="'userInfoData.productTagUrls'"></uploadImg>
                            </el-form-item>
                            <el-form-item prop="insurerId" label="承保公司:" required>
                                <el-select clearable style="width:320px" class="filter-item" v-model="userInfoData.insurerId" placeholder="用户状态">
                                    <el-option v-for="item in poList" :key="item.insurerId" :label="item.insurerName" :value="item.insurerId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="classId" label="保险类别:" required>
                                <el-cascader expand-trigger="hover" :options="classList" v-model="userInfoData.classIdList" @change="handleChange">
                                </el-cascader>
                            </el-form-item>
                            <el-form-item label="总库存:" required>
                                <el-input v-model="userInfoData.maxQuantity" style="width:120px;" v-if="!checkboxSts">
                                </el-input>
                                <el-input style="width:120px;" disabled v-if="checkboxSts">
                                </el-input>
                                <el-checkbox v-model="checkboxSts">不限</el-checkbox>
                                <span>已分配库存</span>
                                <el-input v-model="userInfoData.totalQuantity" style="width:120px;">
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="baselineQuantity" label="产品基准销量:" required>
                                <el-input style="width:320px;" v-model="userInfoData.baselineQuantity"></el-input>
                            </el-form-item>
                            <el-form-item prop="commisionValue1" label="一级佣金:" required>
                                <el-input style="width:320px;" v-model.number="userInfoData.commisionValue1"></el-input>%
                            </el-form-item>
                            <el-form-item prop="commisionValue2" label="二级佣金:" required>
                                <el-input style="width:320px;" v-model.number="userInfoData.commisionValue2"></el-input>%
                            </el-form-item>
                            <el-form-item prop="pointAmount" label="积分设置:" required>
                                <el-input style="width:320px;" v-model="userInfoData.pointAmount"></el-input>
                            </el-form-item>
                            <el-form-item label="能否使用积分:" required>
                                <el-select prop="payTimeUnit" clearable style="width:200px" class="filter-item" v-model="userInfoData.payPointUsage" placeholder="单位">
                                    <el-option v-for="item in payPointStatus" :key="item.code" :label="item.text" :value="item.code">
                                    </el-option>
                                </el-select>
                                <el-input v-if="userInfoData.payPointUsage===0" style="width:220px;" v-model="userInfoData.payPointLimit" :disabled="true"></el-input>
                                <el-input v-else style="width:120px;" v-model="userInfoData.payPointLimit"></el-input>%
                            </el-form-item>
                            <el-form-item label="产品有效期:" required>
                                <el-date-picker prop="effTime" v-model="userInfoData.effTime" type="date" placeholder="起始时间" :editable="false" @change="dateChange('effTime')">
                                </el-date-picker>至
                                <el-date-picker prop="expTime" v-model="userInfoData.expTime" type="date" placeholder="结束时间" :editable="false" @change="dateChange('expTime')">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="生效方式:" required>
                                <el-select prop="payTimeUnit" clearable style="width:200px" class="filter-item" v-model="userInfoData.effectiveType" placeholder="生效方式">
                                    <el-option v-for="item in effectiveTypeSts" :key="item.code" :label="item.text" :value="item.code">
                                    </el-option>
                                </el-select>
                                <span v-if="userInfoData.effectiveType===10">
                                    <el-input style="width:120px;" v-model="userInfoData.insureWindow"></el-input>天</span>
                                <span v-if="userInfoData.effectiveType===99">
                                    <el-date-picker prop="effTime" v-model="userInfoData.startTime" type="date" placeholder="起始时间" :editable="false" @change="dateChange('startTime')">
                                    </el-date-picker>至
                                    <el-date-picker prop="expTime" v-model="userInfoData.endTime" type="date" placeholder="结束时间" :editable="false" @change="dateChange('endTime')">
                                    </el-date-picker>
                                    <el-input style="width:120px;" v-model="userInfoData.insureWindow"></el-input>天
                                </span>
                            </el-form-item>
                            <el-form-item label="用户可选起保时间:" required>
                                <el-input prop="payTime" style="width:100px;" v-model="userInfoData.endTimeNum"></el-input>
                                <el-select prop="payTimeUnit" clearable style="width:100px" class="filter-item" v-model="userInfoData.endTimeUnit" placeholder="">
                                    <el-option v-for="item in endTimeUnitStatus" :key="item.code" :label="item.text" :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="订单允许支付时间:" required>
                                <el-input prop="payTime" style="width:100px;" v-model="userInfoData.payTime"></el-input>
                                <el-select prop="payTimeUnit" clearable style="width:100px" class="filter-item" v-model="userInfoData.payTimeUnit" placeholder="单位">
                                    <el-option v-for="item in payTimeUnitStatus" :key="item.code" :label="item.text" :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="投被保人关系限制:" required>
                                <!-- relationshipLimit  userInfoData.relationshipLimit-->
                                <el-checkbox v-model="limitcheckboxSts">不限</el-checkbox>
                            </el-form-item>
                            <el-form-item label="" required v-if="limitcheckboxSts===false">
                                <el-checkbox-group v-model="checkList">
                                    <el-checkbox label="本人"></el-checkbox>
                                    <el-checkbox label="父母"></el-checkbox>
                                    <el-checkbox label="子女"></el-checkbox>
                                    <el-checkbox label="配偶"></el-checkbox>
                                    <el-checkbox label="其他亲属"></el-checkbox>
                                    <el-checkbox label="其他"></el-checkbox>
                                    <el-checkbox label="监护人"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="被保人性别限制：" required>
                                <el-select clearable style="width:100px" class="filter-item" v-model="userInfoData.genderLimit" placeholder="">
                                    <el-option v-for="item in genderLimitStatus" :key="item.code" :label="item.text" :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="最高职业类别：" required>
                                <el-select clearable style="width:100px" class="filter-item" v-model="userInfoData.occupationClass" placeholder="">
                                    <el-option v-for="item in codesValueStatus" :key="item.code" :label="item.text" :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="最多投保份数：" required>
                                <el-input v-model="userInfoData.buyQuota" style="width:120px;" v-if="!checkboxSts1">
                                </el-input>
                                <el-input style="width:120px;" disabled v-if="checkboxSts1">
                                </el-input>
                                <el-checkbox v-model="checkboxSts1">不限</el-checkbox>
                            </el-form-item>
                            <el-form-item prop="insuranceTerms" label="保险条款:" required>
                                <a :href="userInfoData.insuranceTerms" target="_Blank" v-if="userInfoData.insuranceTerms">{{userInfoData.insuranceTerms}}</a>
                                <el-button style="margin-left: 10px;" @click="toggleShowUpload" icon="upload">导入PDF</el-button>
                                <div style="display:inline-block;position:absolute;">
                                    <el-button style="margin-left: 10px;opacity:0;alpha(opacity=0);" icon="upload">导入Excel</el-button>
                                    <upload :url="uploadURL" :only-single="true" :value="showUpload" field="file" keys="0" max-size="5120" :params="otherParams" @uploadSuccess="uploadSuccess" @uploadFail="uploadFail">
                                    </upload>
                                </div>
                            </el-form-item>
                            <el-form-item prop="suitablePeople" label="适用人群" required>
                                <el-input style="width:220px;" v-model="userInfoData.suitablePeople"></el-input>
                            </el-form-item>
                            <el-form-item prop="insuredMinAge" label="投保年龄：" required>
                                <el-row>
                                    <el-col :span="4" align="center">
                                        <div v-for="(item ,index) in insuredMinAge" :key="index" style="margin-bottom:10px;">
                                            <el-input style="width:100px;" v-model="item.text"></el-input>
                                            <el-select clearable style="width:100px" class="filter-item" v-model="item.code" placeholder="">
                                                <el-option v-for="item in ageStatus" :key="item.code" :label="item.text" :value="item.code">
                                                </el-option>
                                            </el-select>
                                            至
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div v-for="(item ,index) in insuredMaxAge" :key="index" style="margin-bottom:10px;">
                                            <el-input style="width:100px;" v-model="item.text"></el-input>
                                            <el-select clearable style="width:100px" class="filter-item" v-model="item.code" placeholder="">
                                                <el-option v-for="item in ageStatus" :key="item.code" :label="item.text" :value="item.code">
                                                </el-option>
                                            </el-select>
                                            <el-button type="primary" icon="plus" v-if="insuredMaxAge.length-1===index" @click="ADD(index)"></el-button>
                                            <el-button type="primary" icon="minus" @click="DEL(index)"></el-button>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <!-- <div style="margin-bottom:20px;">editorNameList
                                                                        <template v-for="(item,index) in poListAry">
                                                                            <el-button :class="{'www-el-success': currentTab==index}" :plain="true" type="success" @click="tabChange(index)" :key="index">{{item.className}}</el-button>
                                                                        </template>
                                                                    </div> -->
                            <div v-for="(item,index) in poListAry" :key="index">
                                <el-form-item prop="productPrompt" :label="item.className+':'" style="margin-bottom:20px;width:60%;">
                                    <!-- <div style="display:none">{{weditorcurrentTab=index}}</div> -->
                                    <weditor ref="broadcast" v-bind:loanid="item.agreementContent" v-bind:editorName="'name' + index" v-on:listenWEditorChange="(value) => wEditorChange(value, index)"></weditor>
                                </el-form-item>
                            </div>
                            <el-form-item prop="productAdvantage" label="产品优势:" required>
                                <img :src="userInfoData.productLogo" alt="" v-if="userInfoData.productAdvantage" width="120" height="120">
                                <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:paramName="'userInfoData.productAdvantage'"></uploadImg>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div class="filter-container" style="height:100px;line-height:100px;">
                    <el-button @click="Commit()" size="small" type="primary">
                        保存并提交
                    </el-button>
                </div>
                <el-dialog title="提示" :visible.sync="dialogVisible" style="width:500px;">
                    <h4 style="text-align:center;">你填写的信息未保存，确定返回吗？</h4>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                        <el-button @click="cancel()">取 消</el-button>
                    </div>
                </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="保障信息" name="second">
                <div class="filter-container">
                    <h3 class="title">产品投保信息</h3>
                    <div class="filter-container">
                        <div>
                            <span>保障计划</span>
                            <el-button type="primary" style="margin-left:50px;" v-waves @click="addCarProductPrice">新增</el-button>
                        </div>
                        <div class="filter-container" style="overflow-x:auto;">
                            <div class="filter-container">
                                <div class="planList" v-for="(item, index) in productPlansList" :key="index">
                                    <div class="right_tip">
                                        <span style="margin-right:30px;">{{item.planName}}</span>
                                        <span style="margin-right:30px;">{{item.sortCode}}</span>
                                        <el-button type="primary" v-waves icon="edit" @click="carInsTtemEdit(index)"></el-button>
                                        <el-button type="primary" v-waves icon="delete" @click="assurancePlanDel(index)"></el-button>
                                    </div>
                                    <el-form label-width="200px" class="credit-aplly-form">
                                        <div v-for="(list, index) in item.planBenefitsList" :key="index">
                                            <el-form-item :label="list.benefitName">
                                                <span v-if="list.insuredAmount === '1'" style="margin-left:50px;">投保</span>
                                                <span v-else-if="list.insuredAmount === '0'" style="margin-left:50px;">不投保</span>
                                                <span v-else style="margin-left:50px;">{{list.insuredAmount}}</span>
                                            </el-form-item>
                                        </div>
                                    </el-form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="filter-container">
                        <el-form label-width="150px" class="credit-aplly-form">
                            <el-form-item prop="productName" label="结算价格比例:" required>
                                <el-input v-model="userInfoData.commissionsRate" style="width:160px;">
                                </el-input>%
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="filter-container">
                        <el-form label-width="150px" class="credit-aplly-form">
                            <el-form-item label="计价因子:" required>
                                <div v-for="(item,index) in priceElementList" :key="index">
                                    <span>
                                        <el-checkbox v-model="item.selectSts" @change="EleSelectChange">{{item.elementName}}</el-checkbox>
                                    </span>
                                    <span style="margin-left:50px;"></span>
                                    <el-checkbox-group v-model="item.selectNameList" style="display:inline-block;">
                                        <span v-for="(list,index) in item.children" :key="index">
                                            <el-checkbox :label="list.elementName">{{list.elementName}}</el-checkbox>
                                        </span>
                                    </el-checkbox-group>
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="filter-container">
                        <el-form label-width="150px" class="credit-aplly-form">
                            <el-form-item label="保障期限:" required>
                                <div v-for="(item,index) in userInfoData.guaranteePeriodList" :key="index" class="filter-container">
                                    <el-input v-model="item.guaranteeTime" style="width:160px;">
                                    </el-input>
                                    <el-select clearable style="width:100px" class="filter-item" v-model="item.guaranteeTimeUnit" placeholder="">
                                        <el-option v-for="item in ageStatus1" :key="item.code" :label="item.text" :value="item.code">
                                        </el-option>
                                    </el-select>
                                    <el-button type="primary" icon="plus" @click="guaranteeADD()" v-if="index===0"></el-button>
                                    <el-button type="primary" icon="delete" @click="guaranteeDel(index)" v-if="index!=0"></el-button>
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="filter-container">

                        <div>
                            <el-button type="primary" style="margin-left:50px;" @click="setInsurePrice" v-waves>保费配置</el-button>
                        </div>
                        <div class="filter-container" style="overflow-x:auto;">
                            <div class="filter-container">
                                <el-table :data="productPricesList" border fit highlight-current-row style="width: 100%" @current-change="handleCurrentChange">
                                    <el-table-column align="center" label="价格关键字">
                                        <template scope="scope">
                                            <span>{{scope.row.priceKeyword}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" label="结算价格">
                                        <template scope="scope">
                                            <el-input style="width:200px;" v-model="scope.row.settAmount"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" label="保费">
                                        <template scope="scope">
                                            <el-input style="width:200px;" v-model="scope.row.productPremium" @blur="inputBlur(scope.row.productPremium,scope.row.settAmount)"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" label="计划代码">
                                        <template scope="scope">
                                            <el-input style="width:200px;" v-model="scope.row.productCode"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" label="渠道产品代码">
                                        <template scope="scope">
                                            <el-input style="width:200px;" v-model="scope.row.domainPlanCode"></el-input>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="filter-container" style="height:100px;line-height:100px;">
                    <el-button type="primary" @click="allSave">保存</el-button>
                </div>
                <!-- 保障计划新增 -->
                <el-dialog title="保障计划" :visible.sync="dialogFormVisible">
                    <div class="filter-container">
                        <span style="margin-left:50px;">计划名称</span>
                        <el-input style="width:200px;" v-model="productPlansVoList.planName"></el-input>
                        <span style="margin-left:50px;">排序码</span>
                        <el-input style="width:200px;" v-model="productPlansVoList.sortCode"></el-input>
                        <el-button type="primary" icon="plus" @click="ADD1()"></el-button>
                    </div>
                    <div v-for="(item,index) in productPlansVoList.planBenefitsList" :key="index" style="margin-bottom:10px;margin-top:10px;border:1px solid #ccc;">
                        <div style="margin:10px;">
                            <span style="margin-left:50px;">保障名称</span>
                            <el-input style="width:200px;" v-model="item.benefitName"></el-input>
                            <span style="margin-left:50px;">保额</span>
                            <el-input style="width:200px;" v-model="item.insuredAmount"></el-input>
                        </div>
                        <div style="margin:10px;" :key="index">
                            <span style="margin-left:50px;">保障详情</span>
                            <el-input type="textarea" style="width:400px;" v-model="item.benefitDesc"></el-input>
                            <el-button type="primary" v-waves icon="delete" @click="deletePlan(index)"></el-button>
                        </div>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="AddSave">保存</el-button>
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                    </div>
                </el-dialog>
                <!-- 保障计划编辑 -->
                <el-dialog title="保障计划" :visible.sync="dialogFormVisible1">
                    <div class="filter-container">
                        <span style="margin-left:50px;">计划名称</span>
                        <el-input style="width:200px;" v-model="productPlansEditList.planName"></el-input>
                        <span style="margin-left:50px;">排序码</span>
                        <el-input style="width:200px;" v-model="productPlansEditList.sortCode"></el-input>
                        <el-button type="primary" icon="plus" @click="ADD2()"></el-button>
                    </div>
                    <div v-for="(item,index) in productPlansEditList.planBenefitsList" :key="index" style="margin-bottom:10px;margin-top:10px;border:1px solid #ccc;">
                        <div style="margin:10px;">
                            <span style="margin-left:50px;">保障名称</span>
                            <el-input style="width:200px;" v-model="item.benefitName"></el-input>
                            <span style="margin-left:50px;">保额</span>
                            <el-input style="width:200px;" v-model="item.insuredAmount"></el-input>
                        </div>
                        <div style="margin:10px;" :key="index">
                            <span style="margin-left:50px;">保障详情</span>
                            <el-input type="textarea" style="width:400px;" v-model="item.benefitDesc"></el-input>
                            <el-button type="primary" v-waves icon="delete" @click="deletePlan1(index)"></el-button>
                        </div>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="AddSaveEdit">保存</el-button>
                        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                    </div>
                </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="投保信息" name="third">
                <div class="filter-container">
                    <h3 class="title">产品投保信息</h3>
                    <div class="filter-container">
                        <el-form label-width="200px" class="credit-aplly-form">
                            <el-form-item prop="productName" label="被保险人数量:" required>
                                <el-input v-model="insuranceInfo.maxInsurant" style="width:160px;">
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="productName" label="是否支持退保:" required>
                                <el-select clearable style="width:160px" class="filter-item" v-model="insuranceInfo.refundFlag" placeholder="请选择">
                                    <el-option v-for="item in refundFlagSts" :key="item.code" :label="item.text" :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="productName" label="只允许身份证投保:" required>
                                <el-radio-group v-model="insuranceInfo.isIdentifyType">
                                    <el-radio :label="1">是</el-radio>
                                    <el-radio :label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item prop="productName" label="支持受益人自定义:" required>

                                <el-radio-group v-model="radioSts">
                                    <el-radio :label="true">是</el-radio>
                                    <el-radio :label="false">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item prop="productName" label="最多收益人数:" required v-if="radioSts">
                                <el-input v-model="insuranceInfo.beneficiaryNum" style="width:160px;">
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="productName" label="支持在线理赔:" required>
                                <el-radio-group v-model="insuranceInfo.claimOnline">
                                    <el-radio :label="1">是</el-radio>
                                    <el-radio :label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item prop="productName" label="是否支持电子保单:" required>
                                <el-radio-group v-model="insuranceInfo.supportPolicy">
                                    <el-radio :label="1">是</el-radio>
                                    <el-radio :label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="filter-container" v-for="(item,index) in classParamsList" :key="index">
                        <h3 class="title">{{item.paramClass}}</h3>
                        <el-form>
                            <el-form-item label="输入项名称：" required>
                                {{item.paramName}}
                            </el-form-item>
                            <el-form-item label="是否显示：" required>
                                <el-radio-group v-model="item.isShow">
                                    <el-radio :label="1">是</el-radio>
                                    <el-radio :label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="是否必填：" required>
                                <el-radio-group v-model="item.isRequired">
                                    <el-radio :label="1">是</el-radio>
                                    <el-radio :label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div class="filter-container" style="height:100px;line-height:100px;">
                    <el-button @click="insuranceInfoCommit()" size="small" type="primary">
                        保存并提交
                    </el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import '@res/css/wjq/style.less';
import config from '@api/config';
import { parseTime } from '@filters/index.js';
import uploadImg from "@src/components/uploadImg";
import weditor from "@src/components/WEditor";
import upload from '@components/upload';
import { baseURL } from '@api/base.js';
export default {
    components: {
        uploadImg,
        weditor,
        upload
    },
    data() {
        return {
            tabsName: 'first',
            dataList: [],
            imageUrl: require('@res/img/background.jpg'),
            loading: true,
            total: '',
            userInfoList: { params: { url: 'product/productDetail', productId: this.$route.query.productId } },
            userInfoData: {},
            productPricesList: [],
            productId: this.$route.query.productId,
            domainStatus: '',//注册渠道下拉框
            productPlansVoList: {
                planName: '',
                sortCode: '',
                planBenefitsList: [{
                    benefitDesc: '',
                    benefitName: '',
                    insuredAmount: ''
                }]
            },
            productPlansEditList: {
                // planName: '',
                // sortCode: '',
                // planBenefitsList: [{
                //     benefitDesc: '',
                //     benefitName: '',
                //     insuredAmount: ''
                // }]
            },
            insuredMaxAge: [],
            insuredMinAge: [],
            priceElementList: [],
            checkList: [],
            payPointStatus: [{ code: 0, text: '不允许积分抵扣' }, { code: 1, text: '按（支付价格）比例抵扣' }, { code: 2, text: '定额抵扣' }],
            ageStatus: [{ code: 1, text: '天' }, { code: 2, text: '周' }, { code: 3, text: '月' }, { code: 4, text: '周岁' }],
            ageStatus1: [{ code: '1', text: '天' }, { code: '2', text: '周' }, { code: '3', text: '月' }, { code: '4', text: '年' }],
            genderLimitStatus: [{ code: 2, text: '限女性' }, { code: 1, text: '限男性' }, { code: 0, text: '不限' }],
            codesValueStatus: [{ code: 1, text: '1' }, { code: 2, text: '2' }, { code: 3, text: '3' }, { code: 4, text: '4' }, { code: 5, text: '5' }, { code: 6, text: '6' }, { code: 7, text: '特别费率' }],
            sexStatus: [{ code: -1, text: '认证失败' }, { code: 1, text: '认证成功' }, { code: 0, text: '未认证' }],
            realNameStatus: [{ code: -1, text: '认证失败' }, { code: 1, text: '认证成功' }, { code: 0, text: '未认证' }],//实名认证状态
            idenTypeStatus: [{ code: 1, text: '身份证' }, { code: 2, text: '军官证' }, { code: 3, text: '护照' }, { code: 4, text: '驾驶证' }, { code: 5, text: '港澳台通行证' }, { code: 6, text: '回乡证' }],
            listQuery: { params: { url: 'ordermanager/findOrderList', page: 1, size: 10, tradeId: '', selectAmount: '', orderSts: '', domainId: '', productName: '', tradeAgent: '', beginDate: '', endDate: '', userId: '' } },
            orderList: [], //订单列表
            dialogVisible: false,
            dialogFormVisible: false,
            dialogFormVisible1: false,
            carProductTPriceList: { params: { url: 'product/productDetail', productId: this.$route.query.productId } },
            productPlansList: [],
            insuranceInfo: [], //投保信息
            carInsTtemList: [], //所有保障计划信息
            radioSts: false,
            payTimeUnitStatus: [{ code: 1, text: '天' }, { code: 2, text: '小时' }, { code: 3, text: '分钟' }],
            effectiveTypeSts: [{ code: 1, text: '即刻生效' }, { code: 2, text: '次日生效' }, { code: 3, text: '次月生效' }, { code: 10, text: '指定天数后生效' }, { code: 99, text: '指定时间生效' }],
            endTimeUnitStatus: [{ code: 1, text: '天' }, { code: 2, text: '周' }, { code: 3, text: '月' }, { code: 4, text: '年' }],
            refundFlagSts: [{ code: 0, text: '不允许退保' }, { code: 1, text: '保单生效前允许退保' }, { code: 2, text: '保单失效前允许退保' }],
            classList: [], //保险类别下拉菜单父类
            classList1: [], //保险类别下拉菜单子类
            options: null,
            arr:[],
            guaranteePeriodListStack: '',
            selectClassId: '',
            checkboxSts: false,
            checkboxSts1: false,
            limitcheckboxSts: false,
            poList: [],
            // 表单验证
            rules: {
                productName: [
                    { required: true, message: '产品名称不能为空' },
                ],
                productFeature: [
                    { required: true, message: '产品亮点1不能为空' }
                ],
                perferWords: [
                    { required: true, message: '产品亮点2不能为空' }
                ],
                productLogo: [
                    { required: true, message: '产品图片不能为空' }
                ],
                productTagUrls: [
                    { required: true, message: '产品标签不能为空' }
                ],
                insurerId: [
                    { required: true, message: '承保公司不能为空' }
                ],
                classId: [
                    { required: true, message: '保险类别不能为空' }
                ],
                effTime: [
                    { required: true, message: '时间不能为空' }
                ],
                expTime: [
                    { required: true, message: '时间不能为空' }
                ],
                baselineQuantity: [
                    { required: true, message: '产品基准销量不能为空' }
                ],
                suitablePeople: [
                    { required: true, message: '适用人群不能为空' }
                ],
                pointAmount: [
                    { required: true, message: '积分设置不能为空' }
                ],
                payTime: [
                    { required: true, message: '时间不能为空' }
                ],
                payTimeUnit: [
                    { required: true, message: '单位不能为空' }
                ],
                commisionValue1: [
                    { required: true, message: '商业险一级佣金不能为空' },
                    { type: 'number', message: '商业险一级佣金必须为数字值' }
                ],
                commisionValue2: [
                    { required: true, message: '商业险二级佣金不能为空' },
                    { type: 'number', message: '商业险二级佣金必须为数字值' }
                ],
                insuranceTerms: [
                    { required: true, message: '保险条款不能为空' }
                ],
                insuredMinAge: [
                    { required: true, message: '年龄不能为空' }
                ],
                productPrompt: [
                    { required: true, message: '健康告知(温馨提示)不能为空' }
                ],
                productStatement: [
                    { required: true, message: '投保须知不能为空' }
                ],
                claimsGuide: [
                    { required: true, message: '理赔流程不能为空' }
                ],
                productQa: [
                    { required: true, message: '产品问答不能为空' }
                ],
                productCase: [
                    { required: true, message: '案例分析不能为空' }
                ],
            },
            itemIsShow: false,
            itemKey: '',
            carClassName: '',
            // 上传pdf
            showUpload: false,
            otherParams: {
                token: 'fileToken',
                name: 'file'
            },
            uploadURL: baseURL() + 'upload/fileUpload?filePath=product',
            message: null,
            classParamsList: [],
            editorNameList: [],
            currentTab: 0,
            content: '',
            poListAry: [
                { agreementContent: '', className: '健康告知' },
                { agreementContent: "", className: '投保须知' },
                { agreementContent: "", className: '理赔流程' },
                { agreementContent: "", className: '产品问答' },
                { agreementContent: "", className: '案例分析' },
                { agreementContent: '', className: '产品详情' }],
            editIndex: ''//保障计划编辑索引
        };
    },
    created() {
    },
    mounted() {
        this.handleClick();
    },
    computed: {
    },
    methods: {
        /*时间选择器默认事件*/
        dateChange(value) {
            if (value) {


                if (value === 'effTime') {
                    this.userInfoData.effTime = parseTime(this.userInfoData.effTime, '{y}-{m}-{d}');
                    console.log(this.userInfoData.effTime)
                }
                if (value === 'expTime') {
                    this.userInfoData.expTime = parseTime(this.userInfoData.expTime, '{y}-{m}-{d}');
                }
                if (value === 'startTime') {
                    this.userInfoData.startTime = parseTime(this.userInfoData.startTime, '{y}-{m}-{d}');
                }
                if (value === 'endTime') {
                    this.userInfoData.endTime = parseTime(this.userInfoData.endTime, '{y}-{m}-{d}');
                }
            }
        },
        //用户信息获取
        getUserInfo() {
            config(this.userInfoList.params).then(response => {
                if (response.respCode === '000000') {
                    this.userInfoData = response.data.productPo;
                    if (!this.userInfoData.guaranteePeriodList) {
                        this.userInfoData.guaranteePeriodList = [{ guaranteeName: "1年", guaranteeTime: "1", guaranteeTimeUnit: "4" }];
                    }
                    if (this.userInfoData.endTimeUnit === 0) {
                        this.userInfoData.endTimeUnit = null;
                    }
                    let obj = [
                        { agreementContent: this.userInfoData.productPrompt, className: '健康告知' },
                        { agreementContent: this.userInfoData.productStatement, className: '投保须知' },
                        { agreementContent: this.userInfoData.claimsGuide, className: '理赔流程' },
                        { agreementContent: this.userInfoData.productQa, className: '产品问答' },
                        { agreementContent: this.userInfoData.productCase, className: '案例分析' },
                        { agreementContent: this.userInfoData.productDesc, className: '产品详情' }]
                    this.poListAry = obj;
                    console.log(this.poListAry);
                    let that = this;
                    this.userInfoData.maxAge.split(';').forEach((item, index) => {
                        if (item) {
                            let obj = {
                                text: item.split('_')[0],
                                code: item.split('_')[1]
                            }
                            that.insuredMaxAge.push(obj);
                        }
                    })
                    this.userInfoData.minAge.split(';').forEach((item, index) => {
                        if (item) {
                            let obj = {
                                text: item.split('_')[0],
                                code: item.split('_')[1]
                            }
                            that.insuredMinAge.push(obj);
                        }
                    })
                    if (this.userInfoData.relationshipLimit) {
                        this.limitcheckboxSts = false;
                    }
                    if (this.userInfoData.relationshipLimit === null || this.userInfoData.relationshipLimit === '') {
                        this.limitcheckboxSts = true;
                    }
                    // if(this.userInfoData.relationshipLimit){
                    //     this.limitcheckboxSts = false;
                    // }else{
                    //     this.limitcheckboxSts = true;
                    // }
                    this.productPricesList = response.data.productPricesList;
                    console.log(this.userInfoData.relationshipLimitList);
                    this.userInfoData.relationshipLimitList.forEach((item, index) => {

                        that.checkList += item.name + ',';
                    })

                    // console.log('aaaaa' + this.checkList);
                    // console.log(this.checkList.split(','));
                    if (this.userInfoData.maxQuantity === -1) {
                        this.checkboxSts = true;
                    } else {
                        this.checkboxSts = false;
                    }
                    if (this.userInfoData.buyQuota === 0) {
                        this.checkboxSts1 = true;
                    } else {
                        this.checkboxSts1 = false;
                    }
                    this.createEditor();
                    this.checkList = this.checkList ? this.checkList.split(',') : this.checkList;
                } else {

                }
            }).catch(err => {

            })
        },
        //保费配置
        setInsurePrice() {
            this.arr=[];
            if (!this.productPlansList) {
                this.$message.error('保障计划为空！');
                return false;
            }
            if (!this.userInfoData.guaranteePeriodList) {
                this.$message.error('保障期限为空！');
                return false;
            }
            console.log(this.userInfoData.guaranteePeriodList);
            this.priceElementList11();
            //let priceElementList1option = 
            let option = '';
            console.log(this.priceElementList1);
            let that = this;

            this.priceElementList1.forEach((item, index) => {
                console.log(item);
                let strOption = [];
                //that.priceElementList1.length
                
                item.option.split(',').forEach((list, index) => {
                    if (list) {
                        console.log(list);
                        strOption.push(list);
                    }
                })

                that.arr.push(strOption);

                //console.log(that.doExchange(that.arr));
            })

            let str = ''
            let obj = [];
            this.arr = this.doExchange(this.arr)
            this.productPlansList.forEach((item, index) => {
                if (item) {
                    that.arr.forEach((itm, index) => {
                        if (itm) {
                            str = item.planName + ';' + itm;
                            let str3 = ''
                            that.userInfoData.guaranteePeriodList.forEach((item1, index) => {
                                if (item1) {
                                    console.log(str)
                                    let obj1 = {
                                        domainPlanCode: "",
                                        priceKeyword: str+';'+ item1.guaranteeName,
                                        productCode: '',
                                        productPremium: '',
                                        settAmount: ''
                                    }
                                    obj.push(obj1)
                                }
                            })
                        }
                    })
                }
            })
            this.productPricesList = obj;
            //this.productPricesList = [];
        },
        doExchange(doubleArrays) {
            var len = doubleArrays.length;
            if (len >= 2) {
                var len1 = doubleArrays[0].length;
                var len2 = doubleArrays[1].length;
                var newlen = len1 * len2;
                var temp = new Array(newlen);
                var index = 0;
                for (var i = 0; i < len1; i++) {
                    for (var j = 0; j < len2; j++) {
                        temp[index] = doubleArrays[0][i]+','+doubleArrays[1][j];
                        index++;
                    }
                }
                var newArray = new Array(len - 1);
                for (var i = 2; i < len; i++) {
                    newArray[i - 1] = doubleArrays[i];
                }
                newArray[0] = temp;
                console.log(newArray)
                return this.doExchange(newArray);
            }
            else {
                return doubleArrays[0];
            }
        },
        //保费计算
        inputBlur(val1, val2) {
            if (!this.userInfoData.commissionsRate) {
                this.$message.error('没有结算价格比例！');
                return false;
            }
            if (val1 != '') {
                val1 = parseInt(val1);
                val2 = this.userInfoData.commissionsRate * val1 / 100;
                this.currentRow.settAmount = val2;
            }
        },
        priceElementList11() {
            let that = this;
            let obj3 = [];
            // this.priceElementList.forEach((item, index) => {
            //     //if(item.selectNameList){
            //     let objoption = '';
            //     let objdesc = '';
            //     let objdesc1 = '';
            //     item.selectNameList.forEach((item, index) => {
            //         objoption += item + ',';
            //         if (item === "0-18周岁") {
            //             objdesc+= '0_4-18_4' + ',';
            //         } else if (item === "0-80周岁") {
            //             objdesc+= '0_4-80_4' + ',';
            //         } else if (item === "81-90周岁") {
            //             objdesc+= '81_4-90_4' + ',';
            //         } else if (item === "营业车") {
            //             objdesc+= 'car_type_picc_1_1' + ',';
            //         } else if (item === "非营业车") {
            //             objdesc+= 'car_type_picc_1_2' + ',';
            //         } else {
            //         }

            //     })
            //     let obj = {
            //         name: item.elementName,
            //         option: objoption,
            //         desc: objdesc,
            //         code: item.elementCode
            //     }
            //     obj3.push(obj);
            //     //}
            // })

            this.priceElementList.forEach((item1, index) => {
                //if(item.selectNameList){

                item1.selectNameList.forEach((item, index) => {
                    if (item) {
                        let objoption = '';
                        let objdesc = '';
                        let objdesc1 = '';
                        that.priceElementList.forEach((list, index) => {

                            if (list.children) {

                                list.children.forEach((list, index) => {
                                    let str1 = '';
                                    let str2 = '';
                                    if (item === list.elementName) {
                                        str1 = str1 + list.elementDesc + ',';
                                        str2 = str2 + list.elementName + ',';
                                        // objdesc=objdesc +list.elementDesc + ',';
                                        // objoption=objoption+list.elementName + ',';
                                        objdesc = objdesc + str1;
                                        objoption = objoption + str2;
                                    }

                                })

                            }
                        })
                        let obj = {
                            name: item1.elementName,
                            option: objoption,
                            desc: objdesc,
                            code: item1.elementCode
                        }
                        obj3.push(obj);
                    }

                })
            })
            this.priceElementList1 = this.UniquePay(obj3);
            console.log(this.priceElementList1);
            let str1 = '';
            this.userInfoData.guaranteePeriodList.forEach((item, index) => {
                if (item.guaranteeTimeUnit === 1 || item.guaranteeTimeUnit === "1") {
                    str1 += item.guaranteeTime + '天' + '_' + item.guaranteeTime + '_' + item.guaranteeTimeUnit + ';';
                    item.guaranteeName = item.guaranteeTime + '天';
                } else if (item.guaranteeTimeUnit === 2 || item.guaranteeTimeUnit === '2') {
                    str1 += item.guaranteeTime + '周' + '_' + item.guaranteeTime + '_' + item.guaranteeTimeUnit + ';';
                    item.guaranteeName = item.guaranteeTime + '周';
                } else if (item.guaranteeTimeUnit === 3 || item.guaranteeTimeUnit === '3') {
                    str1 += item.guaranteeTime + '月' + '_' + item.guaranteeTime + '_' + item.guaranteeTimeUnit + ';';
                    item.guaranteeName = item.guaranteeTime + '月';
                } else if (item.guaranteeTimeUnit === '4' || item.guaranteeTimeUnit === 4) {
                    str1 += item.guaranteeTime + '年' + '_' + item.guaranteeTime + '_' + item.guaranteeTimeUnit + ';';
                    item.guaranteeName = item.guaranteeTime + '年';
                } else {
                }
            })
            this.guaranteePeriodListStack = str1;
            console.log(str1);
        },
        //数组去重
        UniquePay(obj3) {
            var payArr = [obj3[0]];
            for (var i = 1; i < obj3.length; i++) {
                var payItem = obj3[i];
                var repeat = false;

                for (var j = 0; j < payArr.length; j++) {
                    if (payItem.name == payArr[j].name) {
                        payArr[j].option = payArr[j].option + payItem.option;
                        payArr[j].desc = payArr[j].desc + payItem.desc;
                        repeat = true;
                        break;
                    }
                }
                if (!repeat) {
                    payArr.push(payItem);
                }
            }
            return payArr;
        },
        //保障期限新增
        guaranteeADD() {
            this.userInfoData.guaranteePeriodList.push({ guaranteeName: "", guaranteeTime: "", guaranteeTimeUnit: "" });
        },
        guaranteeDel(index) {
            this.userInfoData.guaranteePeriodList.splice(index, 1);
        },
        //计价因子list
        getElementList() {
            let obj = {
                url: 'product/priceElement/getByProductId',
                productId: this.productId
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.priceElementList = response.data.priceElementList;
                } else {

                }
            }).catch(err => {

            })
        },
        //删除新增的保障计划
        deletePlan(val) {
            console.log(this.productPlansVoList.planBenefitsList);
            this.productPlansVoList.planBenefitsList.splice(val, 1);
            console.log(val);
        },
        //删除编辑的保障计划
        deletePlan1(val) {
            this.productPlansEditList.planBenefitsList.splice(val, 1);
            console.log(val);
        },
        //保障计划新增新增
        ADD1() {
            let obj = {
                benefitDesc: '',
                benefitName: '',
                insuredAmount: ''
            }
            this.productPlansVoList.planBenefitsList.push(obj);
        },
        //保障计划编辑新增
        ADD2() {
            let obj = {
                benefitDesc: '',
                benefitName: '',
                insuredAmount: ''
            }
            this.productPlansEditList.planBenefitsList.push(obj);
        },
        //新增
        ADD(index) {
            let obj = {
                text: '',
                code: ''
            }
            this.insuredMaxAge.push(obj);
            this.insuredMinAge.push(obj);
        },
        //删除
        DEL(index) {
            this.insuredMaxAge.splice(index, 1);
            this.insuredMinAge.splice(index, 1);
        },
        //渠道下拉框菜单
        getList() {
            let obj = {
                url: 'channel/menuList'
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.domainStatus = response.data.domainsPoList;
                } else {

                }
            }).catch(err => {

            })
        },
        //编辑信息保存
        Commit() {
            console.log(this.poListAry)
            console.log(this.editorNameList)
            let max = '';
            let min = '';
            this.insuredMaxAge.forEach((item, index) => {
                max += item.text + '_' + item.code + ';';
            })
            this.insuredMinAge.forEach((item, index) => {
                min += item.text + '_' + item.code + ';';
            })
            //this.insuredMinAge = true;
            // this.userInfoData.maxAge=max;
            // this.userInfoData.minAge=min;

            let obj = ''
            this.checkList.forEach((item, index) => {
                if (item) {
                    //本人 父母 子女 配偶 其他亲属  其他 监护人
                    if (item === "本人") {
                        obj += '{"code":"01","name":"本人"},';
                    }
                    if (item === "父母") {
                        obj += '{"code":"02","name":"父母"},';
                    }
                    if (item === "子女") {
                        obj += '{"code":"03","name":"子女"},';
                    }
                    if (item === "配偶") {
                        obj += '{"code":"04","name":"配偶"},';
                    }
                    if (item === "其他亲属") {
                        obj += '{"code":"05","name":"其他亲属"},';
                    }
                    if (item === "其他") {
                        obj += '{"code":"07","name":"其他"},';
                    }
                    if (item === "监护人") {
                        obj += '{"code":"08","name":"监护人"},';
                    }
                }
            })
            if (obj) {
                obj = obj.substring(0, obj.length - 1);
            }
            obj = "[" + obj + "]";
            if (this.limitcheckboxSts === true) {
                obj = '';
            }
            console.log(this.checkboxSts)
            console.log(this.checkboxSts1)
            if (this.checkboxSts === true) {
                this.userInfoData.maxQuantity = -1;
            }
            if (this.checkboxSts1 === true) {
                this.userInfoData.buyQuota = 0;
            }

            // let F1 = this.userInfoData.insuredMinAge;
            // this.userInfoData.insuredMinAge = true;//为了通过校验
            // let isSuccess = true;
            // this.$refs['userInfo'].validate((valid) => {
            //     if (!valid) {
            //         isSuccess = false;
            //         return false;
            //     }
            // });
            // if (!isSuccess) {
            //     return false;
            // }
            // this.userInfoData.insuredMinAge = F1;
            //this.userInfoData.buyQuota===true?0:this.userInfoData.buyQuota;
            config(
                {
                    url: 'product/addProductMsg',
                    baselineQuantity: this.userInfoData.baselineQuantity,
                    classId: this.userInfoData.classIdList[1],
                    commisionValue1: this.userInfoData.commisionValue1,
                    commisionValue2: this.userInfoData.commisionValue2,
                    effTime: this.userInfoData.effTime,
                    payPointLimit: this.userInfoData.payPointLimit,
                    payPointUsage: this.userInfoData.payPointUsage,
                    expTime: this.userInfoData.expTime,
                    insurerId: this.userInfoData.insurerId,
                    payTime: this.userInfoData.payTime,
                    payTimeUnit: this.userInfoData.payTimeUnit,
                    perferWords: this.userInfoData.perferWords,
                    productFeature: this.userInfoData.productFeature,
                    productLogo: this.userInfoData.productLogo,
                    productName: this.userInfoData.productName,
                    productId: this.userInfoData.productId,
                    productTagUrls: this.userInfoData.productTagUrls,
                    productAdvantage: this.userInfoData.productAdvantage,
                    pointAmount: this.userInfoData.pointAmount,
                    effectiveType: this.userInfoData.effectiveType,
                    endTimeUnit: this.userInfoData.endTimeUnit,
                    insuranceTerms: this.userInfoData.insuranceTerms,
                    productPrompt: this.userInfoData.productPrompt,
                    productStatement: this.userInfoData.productStatement,
                    claimsGuide: this.userInfoData.claimsGuide,
                    productQa: this.userInfoData.productQa,
                    productCase: this.userInfoData.productCase,
                    productDesc: this.userInfoData.productDesc,
                    maxQuantity: this.userInfoData.maxQuantity,
                    relationshipLimit: obj,
                    endTime: this.userInfoData.endTime,
                    startTime: this.userInfoData.startTime,
                    insureWindow: this.userInfoData.insureWindow,
                    maxAge: max,
                    minAge: min,
                    genderLimit: this.userInfoData.genderLimit,
                    occupationClass: this.userInfoData.occupationClass,
                    buyQuota: this.userInfoData.buyQuota,
                    suitablePeople: this.userInfoData.suitablePeople
                }).then(response => {
                    if (response.respCode === '000000') {
                        this.$message({
                            message: response.respMsg,
                            type: 'success'
                        });
                        this.tabsName = 'second';
                        this.getCarProductTPrice();
                        this.getElementList();
                        // this.getUserInfo();
                        // this.resetForm('userInfo');
                    } else {
                        this.$message.error(response.respMsg);
                    }
                })
        },

        cancel() {
            this.$router.go(-1);
        },
        //重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //上传图片事件
        acqImgUrl(params) {
            if ('userInfoData.productLogo' == params[1]) {
                this.userInfoData.productLogo = params[0];
            } else if ('userInfoData.productAdvantage' == params[1]) {
                this.userInfoData.productAdvantage = params[0];
            } else if ('userInfoData.productTagUrls' == params[1]) {
                this.userInfoData.productTagUrls = params[0];
            } else {
            }
        },
        //订单信息查询
        findOrderList() {
            this.listQuery.params.userId = this.userId;
            config(this.listQuery.params).then(response => {
                if (response.respCode === '000000') {
                    this.orderList = response.data.orderInfoRecordList;
                    this.total = response.data.total;
                } else {

                }
            }).catch(err => {

            })
        },
        //获取车险产品 保障信息
        getCarProductTPrice() {
            config(this.carProductTPriceList.params).then(response => {
                if (response.respCode === '000000') {
                    this.productPlansList = response.data.productPlansList;
                    this.total = response.data.total;
                } else {

                }
            }).catch(err => {

            })
        },
        //新增/编辑 保障信息
        addCarProductPrice() {
            this.dialogFormVisible = true;
            this.productPlansVoList = {
                planName: '',
                sortCode: '',
                planBenefitsList: [{
                    benefitDesc: '',
                    benefitName: '',
                    insuredAmount: ''
                }]
            }
            //this.getCarInsItemEnum();
        },
        //车险 所有 保障计划查询
        getCarInsItemEnum() {
            let obj = {
                url: 'product/getCarInsItemEnum'
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.carInsTtemList = response.data.carInsItemList;
                } else {

                }
            }).catch(err => {

            })
        },
        //保障计划保存
        allSave() {
            let obj = {
                url: 'product/addProductPrice',
                productPlansList: this.productPlansList,
                productPricesList: this.productPricesList,
                productsVo: {
                    guaranteePeriod: this.guaranteePeriodListStack,
                    priceElements: JSON.stringify(this.priceElementList1),
                    productId: this.productId,
                    commissionsRate: this.userInfoData.commissionsRate
                }
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.$message({
                        message: response.respMsg,
                        type: 'success'
                    });
                    this.tabsName = 'third';
                    this.productTParam();
                } else {
                    this.$message.error(response.respMsg);
                }
            }).catch(err => {

            })
        },
        //父类下拉框改变时触发
        // selectChange() {
        //     console.log(this.selectClassId);
        //     let obj = {
        //         url: 'product/param/findProductClasses',
        //         parentId: this.selectClassId
        //     }
        //     config(obj).then(response => {
        //         if (response.respCode === '000000') {
        //             this.classList1 = response.data;
        //             if (response.data === '') {
        //                 this.userInfoData.classId = this.selectClassId;
        //             }
        //         }
        //     }).catch(err => {

        //     })
        // },
        //计价因子选择框改变
        EleSelectChange() {

        },
        //承保公司下拉菜单
        getCompanyList() {
            let obj = {
                url: 'insurer/findAll',
                parentId: 0,
                insurerType: 10
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.poList = response.data.insurersList;
                }
            }).catch(err => {

            })

        },
        //新增保障计划确定
        AddSave() {
            this.productPlansList.push(this.productPlansVoList)
            this.dialogFormVisible = false;
            this.productPlansVoList = [];
        },
        //编辑保障计划确定
        AddSaveEdit() {
            let index = this.editIndex;
            let that = this;
            // this.productPlansEditList.forEach((item,index)=>{
            //     
            //     if(item.planName===''&&item.sortCode===''){
            //         that.productPlansEditList.splice(index, 1);
            //     }
            // })
            this.productPlansList[index] = this.productPlansEditList;
            console.log(this.productPlansEditList);
            this.dialogFormVisible1 = false;
            this.productPlansEditList = [];
        },
        //投保信息查询
        productTParam() {
            let obj = {
                url: 'product/productTParam',
                productId: this.$route.query.productId
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.insuranceInfo = response.data.productPo;
                    this.classParamsList = response.data.classParamsList;
                    if (this.insuranceInfo.beneficiaryNum > 0) {
                        this.radioSts = true;
                    } else {
                        this.radioSts = false;
                    }
                }
            }).catch(err => {

            })
        },
        //投保信息保存
        insuranceInfoCommit() {
            if (this.radioSts === false) {
                this.insuranceInfo.beneficiaryNum = 0;
            }
            let obj = {
                url: 'product/addProductParam',
                maxInsurant: this.insuranceInfo.maxInsurant,
                refundFlag: this.insuranceInfo.refundFlag,
                beneficiaryNum: this.insuranceInfo.beneficiaryNum,
                isIdentifyType: this.insuranceInfo.isIdentifyType,
                claimOnline: this.insuranceInfo.claimOnline,
                supportPolicy: this.insuranceInfo.supportPolicy,
                productId: this.$route.query.productId,
                productParamsVoList: this.classParamsList
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.$message({
                        message: response.respMsg,
                        type: 'success'
                    });
                    this.$router.push({ path: '/product/findListView' });
                } else {
                    this.$message.error(response.respMsg);
                }
            }).catch(err => {

            })
        },
        //保险类别下拉菜单
        getClassList() {
            let obj = {
                url: 'product/param/findProductClasses',
                parentId: 0,
                classType: 2
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    response.data.forEach((item, index) => {
                        let obj = {
                            value: item.classId,
                            label: item.className,
                            children: []
                        }
                        if (item.children) {
                            item.children.forEach((list, index) => {
                                console.log(index)
                                let obj1 = {
                                    value: list.classId,
                                    label: list.className,
                                }
                                obj.children.push(obj1);
                            })
                        }
                        this.classList.push(obj);
                    })

                }
            }).catch(err => {

            })
        },
        //删除
        assurancePlanDel(index) {
            this.productPlansList.splice(index, 1);
            console.log(index);
        },
        carInsTtemEdit(index) {
            this.dialogFormVisible1 = true;
            this.editIndex = index;
            this.productPlansEditList = this.productPlansList[index];
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        // 改变每一页的条数
        handleSizeChange(val) {
            this.RegionalPo.params.size = val;
            this.getRegionalPo();
        },
        // 切换页码
        handleCurrentPageChange(val) {
            this.RegionalPo.params.page = val;
            this.getRegionalPo();
        },
        //tab切换事件
        handleClick() {
            if (this.tabsName === 'first') {
                this.getUserInfo();
                this.getClassList();
                this.getCompanyList();
            }
            if (this.tabsName === 'second') {
                this.getCarProductTPrice();
                this.getElementList();
            }
            if (this.tabsName === 'third') {
                this.productTParam();
            }
        },
        createEditor() {
            // this.poListAry = obj;
            // console.log(this.userInfoData.productPrompt);
            this.poListAry.forEach((item, index) => {
                // 初始化
                console.log(item);
                // this.content = this.poListAry[0].agreementContent;
                this.editorNameList.push('editorName__' + index);
                Array.prototype.slice.call(this.$refs.broadcast);
                this.$refs.broadcast[index].defaultValue(item.agreementContent)
                Array.prototype.slice.call(document.querySelectorAll('.w-e-text-container')).map(item => {
                    item.style.height = '200px';
                })
            })
        },
        //富文本编辑
        wEditorChange(html, index) {
            console.log(index)
            if (index === 0) {
                this.userInfoData.productPrompt = html;
            } else if (index === 1) {
                this.userInfoData.productStatement = html;
            } else if (index === 2) {
                this.userInfoData.claimsGuide = html;
            } else if (index === 3) {
                this.userInfoData.productQa = html;
            } else if (index === 4) {
                this.userInfoData.productCase = html;
            } else if (index === 5) {
                this.userInfoData.params.productDesc = html;
            } else {

            }
            this.content = html;
            console.log(this.content)
            console.log(this.poListAry)
        },
        defaultValue(value) {
            this.$nextTick(() => {
                this.editor.txt.html(value);
            })
        },
        // 切换tab
        tabChange(index) {
            alert(index);
            this.currentTab = index;
            console.log(this.currentTab);
            this.content = this.poList[index].agreementContent;
        },
        //上传pdf
        toggleShowUpload() {
            this.showUpload = !this.showUpload;
        },
        uploadSuccess(data, field, keys) {
            if (data.respCode === '000000') {
                this.userInfoData.insuranceTerms = data.data;
                console.log(this.userInfoData.insuranceTerms);
                this.$message.success('上传成功');
            } else {
                this.$message.error('上传失败');
            }
            this.showUpload = false;
            this.getClassList();
            this.getCompanyList();
        },
        uploadFail(status, field, keys) {
            this.$message.error('上传失败');
            this.showUpload = false;
        },
        confirm() {
        },
        handleChange(value) {
            console.log(value);
        }
    },
    filters: {
        //时间过滤
        timeFilter(val) {
            var date = new Date(val);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = (date.getDate() < 10 ? '0' + (date.getDate() + 1) : date.getDate() + 1) + ' ';
            let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return Y + M + D + h + m + s;
        },
        tradeStsFilter(value) {
            if (value === 18) {
                return '已支付待激活';
            } else if (value === 20) {
                return '已支付待发货';
            } else if (value === 25) {
                return '已激活待审核';
            } else if (value === 30) {
                return '发货中';
            } else if (value === 5) {
                return '已发货';
            } else if (value === 50) {
                return '已退款';
            } else if (value === -11) {
                return '已失效';
            } else if (value === -12) {
                return '已关闭';
            } else if (value === -13) {
                return '已删除';
            } else {
                return value;
            }
        },
        //生效方式1：即刻生效；2：次日生效；3：次月生效；10：指定天数后生效effectiveTypeSts:[{code:1,text:'即刻生效'},{code:2,text:'次日生效'},{code:3,text:'次月生效'},{code:4,text:'指定天数后生效'},]
        effectiveTypeFilter(value) {
            if (value === 1) {
                return '即刻生效';
            } else if (value === 2) {
                return '次日生效';
            } else if (value === 3) {
                return '次月生效';
            } else if (value === 10) {
                return '指定天数后生效';
            } else {
                return value;
            }
        }
    },
};
</script>
<style lang="less" scoped>
.app-container {
    margin: 10px 10px 0 10px;
}

.app-container .filter-container {
    margin-top: 20px;
}

.app-container .filter-container .title {
    margin-left: 18px;
    height: 43px;
    line-height: 43px;
    font-size: 14px;
    color: #3498da;
    font-weight: bold;
    border-bottom: 1px solid #e4e9eb;
}

.app-container .filter-container .rightData {
    margin-right: 100px;
}

.app-container .filter-container .planList {
    float: left;
    margin-left: 50px;
    border: 1px solid #ddd;
    padding: 10px 10px 10px 10px;
    border-radius: 5px;
}
</style>

