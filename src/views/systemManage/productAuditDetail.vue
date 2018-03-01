<template>
    <div class="ggg_user">
         <h2>专题基本详情</h2>
          <div class="text">
              <!--个险新增-->
                <el-form label-position="center" label-width="130px" class="noborder" v-if="data.itemId == 1">
                    <el-form-item label="产品ID">
                        <span class="el-input" >
                            <span v-text="output.productsPo.productId"></span>
                        </span>
                    </el-form-item>
                    <el-form-item label="产品名称">
                        <span class="el-input">
                            <span v-text="output.productsPo.productName"></span>
                        </span>
                    </el-form-item>
                    <el-form-item label="产品亮点1">
                        <span class="el-input">
                            <span v-text="output.productsPo.productFeature"></span>
                        </span>
                    </el-form-item>
                    <el-form-item label="产品亮点2">
                        <span class="el-input" >
                            <span v-text="output.productsPo.perferWords"></span>
                        </span>
                    </el-form-item>
                    <el-form-item label="产品配图">
                        <span class="el-input">
                            <img v-show="output.productsPo.productLogo"  :src="output.productsPo.productLogo" alt="">
                        </span>
                    </el-form-item>
                    <el-form-item label="产品标签">
                        <img  v-show="output.productsPo.productTagUrls"  :src="output.productsPo.productTagUrls" alt="">
                    </el-form-item>
                    <el-form-item label="承保公司">
                        <span class="el-input" >
                            <span v-text="output.insurerName"></span>
                        </span>
                    </el-form-item>
                    <el-form-item label="结算机构">
                        <span class="el-input" v-text=""></span>
                    </el-form-item>
                    <el-form-item label="保险类别">
                        <span class="el-input" >
                            <span v-text="output.className2 + '-' + output.className"></span>
                        </span>
                    </el-form-item>
                    <el-form-item label="总库存">
                        <el-col :span="2">
                            <span class="el-input" >
                                <span v-text="output.productsPo.maxQuantity"></span>
                            </span>
                        </el-col>
                        <el-col :span="2">
                             <el-form-item label="已分配库存">
                                <span class="el-input" >
                                    <span v-text="output.productsPo.addQuantity"></span>
                                </span>
                             </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="一级佣金">
                        <el-col :span="4">
                            <span class="el-input" >
                                <span v-text="output.productsPo.commisionValue1 + '%'"></span>
                            </span>
                        </el-col>
                        <el-col :span="4">
                             <el-form-item label="二级佣金">
                                <span class="el-input" >
                                    <span v-text="output.productsPo.commisionValue2 + '%'"></span>
                                </span>
                             </el-form-item>
                        </el-col>
                    </el-form-item>
                     <el-form-item label="积分设置">
                        <span class="el-input" >
                            <span v-show="output.productsPo.pointUsage == 0">不返还</span>
                            <span v-show="output.productsPo.pointUsage == 1">{{output.productsPo.pointAmount}}%</span>
                            <span v-show="output.productsPo.pointUsage != 0 && output.productsPo.pointUsage !=1">{{output.productsPo.pointAmount}}分</span>
                            <span style="margin-left:50px;">投保该产品后可获得积分</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="能否使用积分">
                        <span class="el-input">
                            <span v-show="output.productsPo.payPointUsage == 0">不允许</span>
                            <span v-show="output.productsPo.payPointUsage == 1">{{output.productsPo.payPointLimit}}%</span>
                            <span v-show="output.productsPo.payPointUsage != 0 && output.productsPo.payPointUsage !=1">{{output.productsPo.payPointLimit}}分</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="产品有效期">
                        <span class="el-input" >
                            <span v-text="output.productsPo.effTimeStr + ' 至 ' + output.productsPo.expTimeStr"></span>
                        </span>
                    </el-form-item>
                    <el-form-item label="生效方式">
                        <!--即刻生效：1；次日生效：2；次月生效：3；？天后生效：10（和insureWindow一起用）；指定日期生效：99（与startTime2和endTime2一起用）-->
                        <span class="el-input">
                                <span  v-show="output.productsPo.effectiveType == 1">即刻生效</span>
                                <span v-show="output.productsPo.effectiveType == 2">次日生效</span>
                                <span v-show="output.productsPo.effectiveType == 3">次月生效</span>
                                <span v-show="output.productsPo.effectiveType == 10">{{output.productsPo.insureWindow}}天后生效</span>
                                <span v-show="output.productsPo.effectiveType == 99">
                                    <span>{{output.productsPo.startTime2}}至{{output.productsPo.endTime2}}之间生效</span>
                                </span>
                        </span>
                    </el-form-item>
                    <el-form-item label="用户可选起保时间">
                        <span class="el-input" v-show="output.productsPo.endTimeUnit == 0">{{output.productsPo.endTimeNum}}无</span>
                        <span class="el-input" v-show="output.productsPo.endTimeUnit == 1">{{output.productsPo.endTimeNum}}天</span>
                        <span class="el-input" v-show="output.productsPo.endTimeUnit == 2">{{output.productsPo.endTimeNum}}周</span>
                        <span class="el-input" v-show="output.productsPo.endTimeUnit == 3">{{output.productsPo.endTimeNum}}月</span>
                        <span class="el-input" v-show="output.productsPo.endTimeUnit == 4">{{output.productsPo.endTimeNum}}年</span>
                    </el-form-item>
                    <el-form-item label="订单允许支付时间">
                        <span class="el-input" v-show="output.productsPo.payTimeUnit == 1">{{output.productsPo.payTime}}天</span>
                        <span class="el-input" v-show="output.productsPo.payTimeUnit == 2">{{output.productsPo.payTime}}小时</span>
                        <span class="el-input" v-show="output.productsPo.payTimeUnit == 3">{{output.productsPo.payTime}}分</span>
                    </el-form-item>
                    <el-form-item label="投保年龄">
                        <span class="el-input" v-if="output.productsPo.ageStr == 1">不限</span>
                        <span class="el-input" v-if ="output.productsPo.ageStr != 1">
                            <span v-for="item in output.productsPo.ageStrList" v-text="item"></span>
                        </span>
                    </el-form-item>
                    <el-form-item label="被投保人性别限制">
                        <span class="el-input" v-show="output.productsPo.genderLimit == 0">不限</span>
                        <span class="el-input" v-show="output.productsPo.genderLimit == 1">男</span>
                        <span class="el-input" v-show="output.productsPo.genderLimit == 2">女</span>
                    </el-form-item>
                    <el-form-item label="最高职业类别">
                        <span class="el-input" v-show="output.productsPo.occupationClass == 9">不限</span>
                        <span class="el-input" v-show="output.productsPo.occupationClass == 0">不需要指定</span>
                        <span class="el-input" v-show="output.productsPo.occupationClass != 0 && output.productsPo.occupationClass != 9">{{output.productsPo.occupationClass}}</span>
                    </el-form-item>
                    <el-form-item label="最多投保份数">
                        <span class="el-input" v-if ="output.productsPo.buyQuota == 0">不限</span>
                         <span class="el-input" v-else>{{output.productsPo.buyQuota}}</span>
                    </el-form-item>
                    <el-form-item label="适用人群">
                        <span class="el-input" v-text="output.productsPo.suitablePeople"></span>
                    </el-form-item>
                    <el-form-item label="保险条款">
                        <span class="el-input" v-for ="item in output.productsPo.productsMap" v-html="item.insuranceTerms3"></span>
                    </el-form-item>
                    <el-form-item label="温馨提示">
                        <span class="el-input" v-html="output.productsPo.productPrompt"></span>
                    </el-form-item>
                    <el-form-item label="投保须知">
                        <span class="el-input" v-html="output.productsPo.productStatement"></span>
                    </el-form-item>
                    <el-form-item label="理赔流程">
                        <span class="el-input" v-html="output.productsPo.claimsGuide"></span>
                    </el-form-item>
                    <el-form-item label="产品问答">
                        <span class="el-input" v-html="output.productsPo.productQa"></span>
                    </el-form-item>
                    <el-form-item label="案例分析">
                        <span class="el-input" v-html="output.productsPo.productCase"></span>
                    </el-form-item>
                    <el-form-item label="产品优势">
                        <img v-show="output.productsPo.productAdvantage" :src="output.productsPo.productAdvantage" alt="">
                    </el-form-item>
                    <el-form-item label="产品详情">
                        <span class="el-input" v-html="output.productsPo.productDesc"></span>
                    </el-form-item>
                </el-form>
                <!--个险编辑-->
                 <el-form label-position="center" label-width="130px" class="noborder" v-if="data.itemId == 13">
                    <el-form-item label="产品ID">
                        <span class="el-input" >
                            <span v-text="output.productsPo.productId"></span>
                        </span>
                    </el-form-item>
                    <el-form-item label="产品名称">
                        <span class="el-input">
                            <span v-text="output.productsPo.productName"></span>
                            <span class="red"> => {{output.editProductsPo.productName}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="产品亮点1">
                        <span class="el-input">
                            <span v-text="output.productsPo.productFeature"></span>
                            <span class="red"> => {{output.editProductsPo.productFeature}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="产品亮点2">
                        <span class="el-input" >
                            <span v-text="output.productsPo.perferWords"></span>
                            <span class="red"> => {{output.editProductsPo.perferWords}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="产品配图">
                        <span class="el-input">
                            <img v-show="output.productsPo.productLogo"  :src="output.productsPo.productLogo" alt="">
                            <span class="red" style="position:relative;top:-60px;"> => </span>
                            <img v-show="output.editProductsPo.productLogo"  :src="output.editProductsPo.productLogo" alt="">
                        </span>
                    </el-form-item>
                    <el-form-item label="产品标签">
                        <img  v-show="output.productsPo.productTagUrls"  :src="output.productsPo.productTagUrls" alt="">
                        <span class="red" style="position:relative;top:-60px;"> => </span>
                        <img v-show="output.editProductsPo.productTagUrls"  :src="output.editProductsPo.productTagUrls" alt="">
                    </el-form-item>
                    <el-form-item label="承保公司">
                        <span class="el-input" >
                            <span v-text="output.insurerName"></span>
                            <span class="red"> => {{output.editInsurerName}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="结算机构">
                        <span class="el-input" v-text=""></span>
                    </el-form-item>
                    <el-form-item label="保险类别">
                        <span class="el-input" >
                            <span v-text="output.className2 + '-' + output.className"></span>
                            <span class="red"> => {{output.editClassName2}}-{{output.editClassName}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="总库存">
                        <el-col :span="2">
                            <span class="el-input" >
                                <span v-text="output.productsPo.maxQuantity"></span>
                                <span class="red"> => {{output.editProductsPo.maxQuantity}}</span>
                            </span>
                        </el-col>
                        <el-col :span="2">
                             <el-form-item label="已分配库存">
                                <span class="el-input" >
                                    <span v-text="output.productsPo.addQuantity"></span>
                                    <span class="red"> => {{output.editProductsPo.addQuantity}}</span>
                                </span>
                             </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="一级佣金">
                        <el-col :span="4">
                            <span class="el-input" >
                                <span v-text="output.productsPo.commisionValue1 + '%'"></span>
                                <span class="red"> => {{output.editProductsPo.commisionValue1 + '%'}}</span>
                            </span>
                        </el-col>
                        <el-col :span="4">
                             <el-form-item label="二级佣金">
                                <span class="el-input" >
                                    <span v-text="output.productsPo.commisionValue2 + '%'"></span>
                                    <span class="red"> => {{output.editProductsPo.commisionValue2 + '%'}}</span>
                                </span>
                             </el-form-item>
                        </el-col>
                    </el-form-item>
                     <el-form-item label="积分设置">
                        <span class="el-input" >
                            <span v-show="output.productsPo.pointUsage == 0">不返还</span>
                            <span v-show="output.productsPo.pointUsage == 1">{{output.productsPo.pointAmount}}%</span>
                            <span v-show="output.productsPo.pointUsage != 0 && output.productsPo.pointUsage !=1">{{output.productsPo.pointAmount}}分</span>
                            <span class="red"> =>
                                <span v-show="output.editProductsPo.pointUsage == 0">不返还</span>
                                <span v-show="output.editProductsPo.pointUsage == 1">{{output.editProductsPo.pointAmount}}%</span>
                                <span v-show="output.editProductsPo.pointUsage != 0 && output.editProductsPo.pointUsage !=1">{{output.productsPo.pointAmount}}分</span>
                            </span>
                            <span style="margin-left:50px;">投保该产品后可获得积分</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="能否使用积分">
                        <span class="el-input">
                            <span v-show="output.productsPo.payPointUsage == 0">不允许</span>
                            <span v-show="output.productsPo.payPointUsage == 1">{{output.productsPo.payPointLimit}}%</span>
                            <span v-show="output.productsPo.payPointUsage != 0 && output.productsPo.payPointUsage !=1">{{output.productsPo.payPointLimit}}分</span>
                            <span class="red"> =>
                                <span v-show="output.editProductsPo.payPointUsage == 0">不允许</span>
                                <span v-show="output.editProductsPo.payPointUsage == 1">{{output.editProductsPo.payPointLimit}}%</span>
                                <span v-show="output.editProductsPo.payPointUsage != 0 && output.editProductsPo.payPointUsage !=1">{{output.editProductsPo.payPointLimit}}分</span>                
                            </span>
                        </span>
                    </el-form-item>
                    <el-form-item label="产品有效期">
                        <span class="el-input" >
                            <span v-text="output.productsPo.effTimeStr + ' 至 ' + output.productsPo.expTimeStr"></span>
                            <span class="red"> => {{output.editProductsPo.effTimeStr + ' 至 ' + output.editProductsPo.expTimeStr}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="生效方式">
                        <!--即刻生效：1；次日生效：2；次月生效：3；？天后生效：10（和insureWindow一起用）；指定日期生效：99（与startTime2和endTime2一起用）-->
                        <span class="el-input">
                                <span  v-show="output.productsPo.effectiveType == 1">即刻生效</span>
                                <span v-show="output.productsPo.effectiveType == 2">次日生效</span>
                                <span v-show="output.productsPo.effectiveType == 3">次月生效</span>
                                <span v-show="output.productsPo.effectiveType == 10">{{output.productsPo.insureWindow}}天后生效</span>
                                <span v-show="output.productsPo.effectiveType == 99">
                                    <span>{{output.productsPo.startTime2}}至{{output.productsPo.endTime2}}之间生效</span>
                                </span>
                                <span class="red"> =>
                                    <span  v-show="output.editProductsPo.effectiveType == 1">即刻生效</span>
                                    <span v-show="output.editProductsPo.effectiveType == 2">次日生效</span>
                                    <span v-show="output.editProductsPo.effectiveType == 3">次月生效</span>
                                    <span v-show="output.editProductsPo.effectiveType == 10">{{output.editProductsPo.insureWindow}}天后生效</span>
                                    <span v-show="output.editProductsPo.effectiveType == 99">
                                        <span>{{output.editProductsPo.startTime2}}至{{output.editProductsPo.endTime2}}之间生效</span>
                                    </span>
                                </span>
                        </span>
                    </el-form-item>
                    <el-form-item label="用户可选起保时间">
                        <span class="el-input">
                            <span v-show="output.productsPo.endTimeUnit == 0">{{output.productsPo.endTimeNum}}无</span>
                            <span v-show="output.productsPo.endTimeUnit == 1">{{output.productsPo.endTimeNum}}天</span>
                            <span v-show="output.productsPo.endTimeUnit == 2">{{output.productsPo.endTimeNum}}周</span>
                            <span v-show="output.productsPo.endTimeUnit == 3">{{output.productsPo.endTimeNum}}月</span>
                            <span v-show="output.productsPo.endTimeUnit == 4">{{output.productsPo.endTimeNum}}年</span>
                            <span class="red"> =>
                                    <span v-show="output.editProductsPo.endTimeUnit == 0">{{output.editProductsPo.endTimeNum}}无</span>
                                    <span v-show="output.editProductsPo.endTimeUnit == 1">{{output.editProductsPo.endTimeNum}}天</span>
                                    <span v-show="output.editProductsPo.endTimeUnit == 2">{{output.editProductsPo.endTimeNum}}周</span>
                                    <span v-show="output.editProductsPo.endTimeUnit == 3">{{output.editProductsPo.endTimeNum}}月</span>
                                    <span v-show="output.editProductsPo.endTimeUnit == 4">{{output.editProductsPo.endTimeNum}}年</span>
                            </span>
                        </span>
                    </el-form-item>
                    <el-form-item label="订单允许支付时间">
                        <span class="el-input">
                                <span v-show="output.productsPo.payTimeUnit == 1">{{output.productsPo.payTime}}天</span>
                                <span v-show="output.productsPo.payTimeUnit == 2">{{output.productsPo.payTime}}小时</span>
                                <span v-show="output.productsPo.payTimeUnit == 3">{{output.productsPo.payTime}}分</span>
                                <span class="red"> =>
                                    <span v-show="output.editProductsPo.payTimeUnit == 1">{{output.editProductsPo.payTime}}天</span>
                                    <span v-show="output.editProductsPo.payTimeUnit == 2">{{output.editProductsPo.payTime}}小时</span>
                                    <span v-show="output.editProductsPo.payTimeUnit == 3">{{output.editProductsPo.payTime}}分</span>
                                </span>
                        </span>
                    </el-form-item>
                    <el-form-item label="投保年龄">
                        <span  class="el-input" >
                                <span v-if="output.productsPo.ageStr == 1">不限</span>
                                <span v-if ="output.productsPo.ageStr != 1">
                                    <span v-for="item in output.productsPo.ageStrList" v-text="item"></span>
                                </span>
                                <span class="red"> =>
                                     <span v-if="output.editProductsPo.ageStr == 1">不限</span>
                                     <span v-if ="output.editProductsPo.ageStr != 1">
                                        <span v-for="item in output.editProductsPo.ageStrList" v-text="item"></span>
                                     </span>
                                </span>
                        </span>
                    </el-form-item>
                    <el-form-item label="被投保人性别限制">
                        <span class="el-input">
                            <span v-show="output.productsPo.genderLimit == 0">不限</span>
                            <span v-show="output.productsPo.genderLimit == 1">男</span>
                            <span v-show="output.productsPo.genderLimit == 2">女</span>
                            <span class="red">
                                <span v-show="output.editProductsPo.genderLimit == 0">不限</span>
                                <span v-show="output.editProductsPo.genderLimit == 1">男</span>
                                <span v-show="output.editProductsPo.genderLimit == 2">女</span>
                            </span>
                        </span>
                    </el-form-item>
                    <el-form-item label="最高职业类别">
                        <span class="el-input">
                            <span v-show="output.productsPo.occupationClass == 9">不限</span>
                            <span v-show="output.productsPo.occupationClass == 0">不需要指定</span>
                            <span v-show="output.productsPo.occupationClass != 0 && output.productsPo.occupationClass != 9">{{output.productsPo.occupationClass}}</span>
                            <span class="red"> =>
                                <span v-show="output.editProductsPo.occupationClass == 9">不限</span>
                                <span v-show="output.editProductsPo.occupationClass == 0">不需要指定</span>
                                <span v-show="output.editProductsPo.occupationClass != 0 && output.editProductsPo.occupationClass != 9">{{output.editProductsPo.occupationClass}}</span>
                            </span>
                        </span>
                    </el-form-item>
                    <el-form-item label="最多投保份数">
                         <span class="el-input">
                              <span v-if ="output.productsPo.buyQuota == 0">不限</span>
                              <span v-else>{{output.productsPo.buyQuota}}</span>
                              <span class="red"> =>
                                  <span v-if ="output.editProductsPo.buyQuota == 0">不限</span>
                                  <span v-else>{{output.editProductsPo.buyQuota}}</span>
                              </span>
                         </span>
                    </el-form-item>
                    <el-form-item label="适用人群">
                        <span  class="el-input">
                            <span v-text="output.productsPo.suitablePeople"></span>
                            <span class="red"> =>
                                <span v-text="output.editProductsPo.suitablePeople"></span>
                            </span>
                        </span>
                    </el-form-item>
                    <el-form-item label="保险条款">
                        <span class="el-input" v-for ="item in output.productsPo.productsMap" v-html="item.insuranceTerms3"></span>
                        <span class="el-input red"> => </span>
                        <span class="el-input red" v-for ="item in output.editProductsPo.productsMap" v-html="item.insuranceTerms3"></span>
                    </el-form-item>
                    <el-form-item label="温馨提示">
                        <span class="el-input" >
                            <span v-html="output.productsPo.productPrompt"></span>
                            <span class="red"> => {{output.editProductsPo.productPrompt}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="投保须知">
                        <span class="el-input" v-html="output.productsPo.productStatement"></span>
                        <span class="el-input red"> => </span>
                        <span class="el-input red" v-html="output.editProductsPo.productStatement"></span>
                    </el-form-item>
                    <el-form-item label="理赔流程">
                        <span class="el-input" >
                            <span v-html="output.productsPo.claimsGuide"></span>
                            <span class="red"> => {{output.editProductsPo.claimsGuide}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="产品问答">
                        <span class="el-input" >
                            <span v-html="output.productsPo.productQa"></span>
                            <span class="red" v-html="' => ' + output.editProductsPo.productQa"></span>
                        </span>
                    </el-form-item>
                    <el-form-item label="案例分析">
                        <span class="el-input" >
                            <span v-html="output.productsPo.productCase"></span>
                            <span class="red" v-html="' => ' + output.editProductsPo.productCase"></span>
                        </span>
                    </el-form-item>
                    <el-form-item label="产品优势">
                        <img v-show="output.productsPo.productAdvantage" :src="output.productsPo.productAdvantage" alt="">
                        <span  v-show="output.editProductsPo.productAdvantage" class="red" style="position:relative;top:-60px;"> => </span>
                        <img v-show="output.editProductsPo.productAdvantage"  :src="output.editProductsPo.productAdvantage" alt="">
                    </el-form-item>
                    <el-form-item label="产品详情">
                        <span class="el-input" >
                            <span v-html="output.productsPo.productDesc"></span>
                            <span class="red" v-html="' => ' + output.editProductsPo.productDesc"></span>
                        </span>
                    </el-form-item>
                </el-form>
                <!--车险新增-->
                 <el-form label-position="center" label-width="130px" class="noborder" v-if="data.itemId == 15">
                    <el-form-item label="产品ID">
                        <span class="el-input" >
                            <span v-text="output.productsPo.productId"></span>
                        </span>
                    </el-form-item>
                    <el-form-item label="产品名称">
                        <span class="el-input">
                            <span v-text="output.productsPo.productName"></span>
                        </span>
                    </el-form-item>
                    <el-form-item label="产品亮点1">
                        <span class="el-input">
                            <span v-text="output.productsPo.productFeature"></span>
                        </span>
                    </el-form-item>
                    <el-form-item label="产品亮点2">
                        <span class="el-input" >
                            <span v-text="output.productsPo.perferWords"></span>
                        </span>
                    </el-form-item>
                    <el-form-item label="产品配图">
                        <span class="el-input">
                            <img v-show="output.productsPo.productLogo"  :src="output.productsPo.productLogo" alt="">
                        </span>
                    </el-form-item>
                    <el-form-item label="产品标签">
                        <img  v-show="output.productsPo.productTagUrls"  :src="output.productsPo.productTagUrls" alt="">
                    </el-form-item>
                    <el-form-item label="承保公司">
                        <span class="el-input" >
                            <span v-text="output.insurerName"></span>
                        </span>
                    </el-form-item>
                    <el-form-item label="结算机构">
                        <span class="el-input" v-text=""></span>
                    </el-form-item>
                    <el-form-item label="保险类别">
                        <span class="el-input" >
                            <span v-text="output.oneLevelClassName"></span><span> - </span><span v-text="output.twoLevelClassName"></span>
                        </span>
                    </el-form-item>
                    <el-form-item label="产品有效期">
                        <span class="el-input" >
                            <span v-text="output.productsPo.effTimeStr + ' 至 ' + output.productsPo.expTimeStr"></span>
                        </span>
                    </el-form-item>
                    <el-form-item label="订单允许支付时间">
                        <span class="el-input" v-show="output.productsPo.payTimeUnit == 1">{{output.productsPo.payTime}}天</span>
                        <span class="el-input" v-show="output.productsPo.payTimeUnit == 2">{{output.productsPo.payTime}}小时</span>
                        <span class="el-input" v-show="output.productsPo.payTimeUnit == 3">{{output.productsPo.payTime}}分</span>
                    </el-form-item>
                    <el-form-item label="商业险一级佣金">
                        <span class="el-input" >
                            <span v-text="output.productsPo.commisionValue1"></span>%
                        </span>
                    </el-form-item>
                    <el-form-item label="商业险二级佣金">
                        <span class="el-input" >
                            <span v-text="output.productsPo.commisionValue2"></span>%
                        </span>
                    </el-form-item>
                    <el-form-item label="交强险一级佣金">
                        <span class="el-input" >
                            <span v-text="output.productsPo.vehicleCommisionValue1"></span>%
                        </span>
                    </el-form-item>
                    <el-form-item label="交强险二级佣金">
                        <span class="el-input" >
                            <span v-text="output.productsPo.vehicleCommisionValue2"></span>%
                        </span>
                    </el-form-item>
                    <el-form-item label="保险条款">
                        <span class="el-input" v-for ="item in output.productsPo.productsMap" v-html="item.insuranceTerms3"></span>
                    </el-form-item>
                    <el-form-item label="温馨提示">
                        <span class="el-input" v-html="output.productsPo.productPrompt"></span>
                    </el-form-item>
                </el-form>
                <!--车险新增-->
                 <el-form label-position="center" label-width="130px" class="noborder" v-if="data.itemId == 16">
                    <el-form-item label="产品ID">
                        <span class="el-input" >
                            <span v-text="output.productsPo.productId"></span>
                        </span>
                    </el-form-item>
                    <el-form-item label="产品名称">
                        <span class="el-input">
                            <span v-text="output.productsPo.productName"></span>
                            <span class="red"> => {{output.productsPoEdit.productName}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="产品亮点1">
                        <span class="el-input">
                            <span v-text="output.productsPo.productFeature"></span>
                            <span class="red"> => {{output.productsPoEdit.productFeature}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="产品亮点2">
                        <span class="el-input" >
                            <span v-text="output.productsPo.perferWords"></span>
                            <span class="red"> => {{output.productsPoEdit.perferWords}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="产品配图">
                        <span class="el-input">
                            <img v-show="output.productsPo.productLogo"  :src="output.productsPo.productLogo" alt="">
                            <span class="red" style="position:relative;top:-60px;"> => </span>
                            <img v-show="output.productsPoEdit.productLogo"  :src="output.productsPoEdit.productLogo" alt="">
                        </span>
                    </el-form-item>
                    <el-form-item label="产品标签">
                        <img  v-show="output.productsPo.productTagUrls"  :src="output.productsPo.productTagUrls" alt="">
                        <span class="red" style="position:relative;top:-60px;" v-show="output.productsPoEdit.productTagUrls"> => </span>
                        <img v-show="output.productsPoEdit.productTagUrls"  :src="output.productsPoEdit.productTagUrls" alt="">
                    </el-form-item>
                    <el-form-item label="承保公司">
                        <span class="el-input" >
                            <span v-text="output.insurerName"></span>
                            <span class="red"> => {{output.insurerNameEdit}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="结算机构">
                        <span class="el-input" v-text=""></span>
                    </el-form-item>
                    <el-form-item label="保险类别">
                        <span class="el-input" >
                            <span v-text="output.oneLevelClassName"></span><span> - </span><span v-text="output.twoLevelClassName"></span>
                            <span class="red"> => {{output.oneLevelClassNameEdit}} - {{output.twoLevelClassNameEdit}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="产品有效期">
                        <span class="el-input" >
                            <span v-text="output.productsPo.effTimeStr + ' 至 ' + output.productsPo.expTimeStr"></span>
                            <span class="red"> => </span>
                            <span class="red" v-text="output.productsPoEdit.effTimeStr + ' 至 ' + output.productsPoEdit.expTimeStr"></span>
                        </span>
                    </el-form-item>
                    <el-form-item label="订单允许支付时间">
                        <span class="el-input">
                            <span v-show="output.productsPo.payTimeUnit == 1">{{output.productsPo.payTime}}天</span>
                            <span v-show="output.productsPo.payTimeUnit == 2">{{output.productsPo.payTime}}小时</span>
                            <span v-show="output.productsPo.payTimeUnit == 3">{{output.productsPo.payTime}}分</span>
                            <span class="red"> =>
                                <span v-show="output.productsPoEdit.payTimeUnit == 1">{{output.productsPoEdit.payTime}}天</span>
                                <span v-show="output.productsPoEdit.payTimeUnit == 2">{{output.productsPoEdit.payTime}}小时</span>
                                <span v-show="output.productsPoEdit.payTimeUnit == 3">{{output.productsPoEdit.payTime}}分</span>
                            </span>
                        </span>
                    </el-form-item>
                    <el-form-item label="商业险一级佣金">
                        <span class="el-input" >
                            <span v-text="output.productsPo.commisionValue1"></span>%
                            <span class="red"> => {{output.productsPoEdit.commisionValue1}}%</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="商业险二级佣金">
                        <span class="el-input" >
                            <span v-text="output.productsPo.commisionValue2"></span>%
                            <span class="red"> => {{output.productsPoEdit.commisionValue2}}%</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="交强险一级佣金">
                        <span class="el-input" >
                            <span v-text="output.productsPo.vehicleCommisionValue1"></span>%
                            <span class="red"> => {{output.productsPoEdit.vehicleCommisionValue1}}%</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="交强险二级佣金">
                        <span class="el-input" >
                            <span v-text="output.productsPo.vehicleCommisionValue2"></span>%
                            <span class="red"> => {{output.productsPoEdit.vehicleCommisionValue2}}%</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="保险条款">
                        <span class="el-input" v-for ="item in output.productsPo.productsMap" v-html="item.insuranceTerms3"></span>
                        <span class="red"> => </span>
                        <span class="el-input" v-for ="item in output.productsPoEdit.productsMap" v-html="item.insuranceTerms3"></span>
                    </el-form-item>
                    <el-form-item label="温馨提示">
                        <span class="el-input" v-html="output.productsPo.productPrompt"></span>
                        <span class="el-input red"> => {{output.productsPoEdit.productPrompt}}</span>
                    </el-form-item>
                </el-form>
          </div>
         <h2>保障信息</h2>
          <div class="text1">
              <!--个险新增-->
              <el-form label-position="center" label-width="130px" class="noborder form" v-if="data.itemId == 1">
                   <el-form-item label="保障计划">
                        <div class="el-input" v-if="output.planBenefitsList">
                             <table class="userTable" border="1" style="display:inline-block">
                                 <tr>
                                     <td>计划名称</td>
                                     <td>计划内容</td>
                                     <td>保额</td>
                                 </tr>
                                 <tr v-for="item in output.planBenefitsList" >
                                     <td v-text="item.planName"></td>
                                     <td v-text="item.benefitName"></td>
                                     <td v-text="item.insuredAmount"></td>
                                 </tr>
                             </table>
                        </div>
                    </el-form-item>
                    <el-form-item label="计价因子" >
                        <div class="el-input" v-if="output.priceElementsPoList">
                            <table class="userTable" border="1" style="display:inline-block">
                                 <tr>
                                     <td>计价因子名称</td>
                                     <td>计价因子</td>
                                 </tr>
                                 <tr v-for="item in output.priceElementsPoList">
                                     <td v-text="item.name"></td>
                                     <td>{{item.option | formatPricingFactors}}</td>
                                 </tr>
                             </table>
                        </div>
                    </el-form-item>
                    <el-form-item label="保障期限" >
                        <div class="el-input">
                            <span v-for="item in output.periodsList" v-text="item"></span>
                        </div>
                    </el-form-item>
                    <el-form-item label="保障配置情况" >
                        <div class="el-input" v-if="output.productPricePoList">
                             <table class="userTable" border="1" style="display:inline-block">
                                 <tr>
                                     <td>计价名称</td>
                                     <td>计价因子</td>
                                     <td>保障期限</td>
                                     <td>核算价格</td>
                                     <td>保费</td>
                                     <td>计划代码</td>
                                     <td>渠道产品代码</td>
                                 </tr>
                                 <tr v-for="item in output.productPricePoList">
                                     <td v-text="item.planName"></td>
                                     <td v-text="item.priceElement"></td>
                                     <td v-text="item.guaranteePeriod"></td>
                                     <td>{{item.settAmount ? item.settAmount/100 + '元' : ''}}</td>
                                     <td>{{item.productPremium ? item.productPremium/100 + '元' : ''}}</td>
                                     <td v-text="item.productCode"></td>
                                     <td v-text="item.domainPlanCode"></td>
                                 </tr>
                             </table>
                        </div>
                    </el-form-item>
            </el-form>
            <!--个险编辑-->
            <el-form label-position="center" label-width="130px" class="noborder form" v-if="data.itemId == 13">
                   <el-form-item label="保障计划">
                        <div class="el-input" v-if="output.productsPo.productPlanPoList">
                             <table class="userTable" border="1">
                                 <tr>
                                     <td>计划名称</td>
                                     <td>计划内容</td>
                                     <td>保额</td>
                                 </tr>
                                 <template v-for="item in output.productsPo.productPlanPoList">
                                    <tr v-for="itm in item.planBenefitsList" v-if="item.planBenefitsList && item.planBenefitsList.length > 0">
                                        <td v-text="itm.planName"></td>
                                        <td v-text="itm.benefitName"></td>
                                        <td v-text="itm.insuredAmount"></td>
                                    </tr>
                                </template>
                             </table>
                             <span class="el-input red"> => </span>
                             <table class="userTable red" border="1">
                                 <tr>
                                     <td>计划名称</td>
                                     <td>计划内容</td>
                                     <td>保额</td>
                                 </tr>
                                 <template v-for="item in output.editProductsPo.productPlanPoList">
                                    <tr v-for="itm in item.planBenefitsList" v-if="item.planBenefitsList && item.planBenefitsList.length > 0">
                                        <td v-text="itm.planName"></td>
                                        <td v-text="itm.benefitName"></td>
                                        <td v-text="itm.insuredAmount"></td>
                                    </tr>
                                </template>
                             </table>
                        </div>
                    </el-form-item>
                    <el-form-item label="计价因子" >
                        <div class="el-input">
                            <table class="userTable" border="1"  v-if="output.priceElementsPoList">
                                 <tr>
                                     <td>计价因子名称</td>
                                     <td>计价因子</td>
                                 </tr>
                                 <tr v-for="item in output.priceElementsPoList">
                                     <td v-text="item.name"></td>
                                     <td>{{item.option | formatPricingFactors}}</td>
                                 </tr>
                             </table>
                             <span class="el-input red"> => </span>
                             <table class="userTable red" border="1" v-if="output.editPriceElementsPoList">
                                 <tr>
                                     <td>计价因子名称</td>
                                     <td>计价因子</td>
                                 </tr>
                                 <tr v-for="item in output.editPriceElementsPoList">
                                     <td v-text="item.name"></td>
                                     <td>{{item.option | formatPricingFactors}}</td>
                                 </tr>
                             </table>
                        </div>
                    </el-form-item>
                    <el-form-item label="保障期限" >
                        <div class="el-input">
                             <span v-for="item in output.periodsList" v-text="item"></span>
                             <span class="red"> => </span>
                             <span class="red" v-for="item in output.editPeriodsList" v-text="item"></span>
                        </div>
                    </el-form-item>
                    <el-form-item label="保障配置情况" >
                        <div class="el-input" >
                             <table class="userTable" border="1" v-if="output.productPricePoList">
                                 <tr>
                                     <td>计价名称</td>
                                     <td>计价因子</td>
                                     <td>保障期限</td>
                                     <td>核算价格</td>
                                     <td>保费</td>
                                     <td>计划代码</td>
                                     <td>渠道产品代码</td>
                                 </tr>
                                 <tr v-for="item in output.productPricePoList">
                                     <td v-text="item.planName"></td>
                                     <td v-text="item.priceElement"></td>
                                     <td v-text="item.guaranteePeriod"></td>
                                     <td>{{item.settAmount ? item.settAmount/100 + '元' : ''}}</td>
                                     <td>{{item.productPremium ? item.productPremium/100 + '元' : ''}}</td>
                                     <td v-text="item.productCode"></td>
                                     <td v-text="item.domainPlanCode"></td>
                                 </tr>
                             </table>
                             <span class="el-input red" v-if="output.editProductPricePoList"> => </span>
                              <table class="userTable red" border="1" v-if="output.editProductPricePoList">
                                 <tr>
                                     <td>计价名称</td>
                                     <td>计价因子</td>
                                     <td>保障期限</td>
                                     <td>核算价格</td>
                                     <td>保费</td>
                                     <td>计划代码</td>
                                     <td>渠道产品代码</td>
                                 </tr>
                                 <tr v-for="item in output.editProductPricePoList">
                                     <td v-text="item.planName"></td>
                                     <td v-text="item.priceElement"></td>
                                     <td v-text="item.guaranteePeriod"></td>
                                     <td>{{item.settAmount ? item.settAmount/100 + '元' : ''}}</td>
                                     <td>{{item.productPremium ? item.productPremium/100 + '元' : ''}}</td>
                                     <td v-text="item.productCode"></td>
                                     <td v-text="item.domainPlanCode"></td>
                                 </tr>
                             </table>
                        </div>
                    </el-form-item>
            </el-form>
            <!--车险新增-->
            <el-form label-position="center" label-width="130px" class="noborder form" v-if="data.itemId == 15">
                   <el-form-item label="保障计划">
                        <div class="el-input" v-if="output.planBenefitsList">
                             <table class="userTable" border="1">
                                 <tr>
                                     <td>计划名称</td>
                                     <td>保障利益名称</td>
                                     <td>是否不计免赔</td>
                                     <td>保额</td>
                                     <td>保障利益分类名称</td>
                                 </tr>
                                 <tr v-for="item in output.planBenefitsList" v-if="output.planBenefitsList && output.planBenefitsList.length > 0">
                                    <td v-text="item.planName"></td>
                                    <td v-text="item.benefitName"></td>
                                    <td>
                                        <el-checkbox :checked="item.franchiseFlag == 1 ? true : false" disabled>不计免赔</el-checkbox>
                                    </td>
                                     <td v-text="item.insuredAmount"></td>
                                    <td v-text="item.className"></td>
                                 </tr>
                             </table>
                        </div>
                    </el-form-item>
            </el-form>
             <!--车险编辑-->
            <el-form label-position="center" label-width="130px" class="noborder form" v-if="data.itemId == 16">
                   <el-form-item label="保障计划">
                        <div class="el-input">
                             <table class="userTable" border="1">
                                 <tr>
                                     <td>计划名称</td>
                                     <td>保障利益名称</td>
                                     <td>是否不计免赔</td>
                                     <td>保额</td>
                                     <td>保障利益分类名称</td>
                                 </tr>
                                 <template v-for="item in output.productsPo.productPlanPoList">
                                    <tr v-for="itm in item.planBenefitsList" v-if="item.planBenefitsList">
                                        <td v-text="item.planName"></td>
                                        <td v-text="itm.benefitName"></td>
                                        <td>
                                            <el-checkbox :checked="itm.franchiseFlag == 1 ? true : false" disabled>不计免赔</el-checkbox>
                                        </td>
                                        <td v-text="itm.insuredAmount"></td>
                                        <td v-text="itm.className"></td>
                                    </tr>
                                 </template>
                             </table>
                             <span class="red"> => </span>
                             <table class="userTable red" border="1">
                                 <tr>
                                     <td>计划名称</td>
                                     <td>保障利益名称</td>
                                     <td>是否不计免赔</td>
                                     <td>保额</td>
                                     <td>保障利益分类名称</td>
                                 </tr>
                                 <template v-for="item in output.productsPoEdit.productPlanPoList">
                                    <tr v-for="itm in item.planBenefitsList" v-if="item.planBenefitsList">
                                        <td v-text="item.planName"></td>
                                        <td v-text="itm.benefitName"></td>
                                        <td>
                                            <el-checkbox :checked="itm.franchiseFlag == 1 ? true : false" disabled>不计免赔</el-checkbox>
                                        </td>
                                        <td v-text="itm.insuredAmount"></td>
                                        <td v-text="itm.className"></td>
                                    </tr>
                                 </template>
                             </table>
                        </div>
                    </el-form-item>
            </el-form>
          </div>
          <h2 v-if="data.itemId == 1 || data.itemId == 13">投保信息</h2>
          <div class="text">
             <el-form  label-position="center" label-width="130px" class="noborder form" v-if="data.itemId == 1">
                    <el-form-item label="是否支持退保">
                        <!--不允许退保：0；保单生效前允许退保：1；保单失效前允许退保：其他-->
                        <span class="el-input" v-show="output.productsPo.refundFlag == 0">不支持退保</span>
                        <span class="el-input" v-show="output.productsPo.refundFlag == 1">保单生效前允许退保</span>
                        <span class="el-input" v-show="output.productsPo.refundFlag != 1 && output.productsPo.refundFlag != 0">保单失效前允许退保</span>
                    </el-form-item>
                    <el-form-item label="只允许身份证投保">
                        <span class="el-input" v-if="output.productsPo.isIdentifyType == 1">是</span>
                        <span class="el-input" v-else>否</span>
                    </el-form-item>
                    <el-form-item label="支持受益人自定义">
                        <span class="el-input" v-if="output.productsPo.beneficiaryNum == 0">不允许</span>
                        <span class="el-input" v-else>允许</span>
                    </el-form-item>
                    <el-form-item label="支持在线理赔">
                        <span class="el-input" v-if="output.productsPo.claimOnline == 1">允许</span>
                        <span class="el-input" v-else>不允许</span>
                    </el-form-item>
                    <el-form-item label="是否支持电子保单">
                        <span class="el-input" v-if="output.productsPo.supportPolicy == 1">支持</span>
                        <span class="el-input" v-else>不支持</span>
                    </el-form-item>
                    <el-form-item label="投保人信息">
                        <div class="el-input">
                             <table class="userTable" border="1" style="display:inline-block">
                                 <tr>
                                     <td>输入项名称</td>
                                     <td>是否显示</td>
                                     <td>是否必填</td>
                                 </tr>
                                 <tr v-for="item in output.productParamsPoList" v-if="item.classParam.paramClass == '投保人信息'">
                                     <td v-text="item.classParam.paramName"></td>
                                     <td>是</td>
                                     <td>
                                         <span v-show="item.classParam.isRequired == 0">否</span>
                                         <span v-show="item.classParam.isRequired == 1">是</span>
                                     </td>
                                 </tr>
                             </table>
                        </div>
                    </el-form-item>
                    <el-form-item label="被保险人信息">
                        <div class="el-input">
                             <table class="userTable" border="1" style="display:inline-block">
                                 <tr>
                                     <td>输入项名称</td>
                                     <td>是否显示</td>
                                     <td>是否必填</td>
                                 </tr>
                                 <tr v-for="item in output.productParamsPoList" v-if="item.classParam.paramClass == '被保人信息'">
                                     <td v-text="item.classParam.paramName"></td>
                                     <td>是</td>
                                     <td>
                                         <span v-show="item.classParam.isRequired == 0">否</span>
                                         <span v-show="item.classParam.isRequired == 1">是</span>
                                     </td>
                                 </tr>
                             </table>
                        </div>
                    </el-form-item>
                     <el-form-item label="其他信息">
                         <div class="el-input">
                             <table class="userTable" border="1" style="display:inline-block">
                                 <tr>
                                     <td>输入项名称</td>
                                     <td>是否显示</td>
                                     <td>是否必填</td>
                                 </tr>
                                 <tr v-for="item in output.productParamsPoList" v-if="item.classParam.paramClass == '其他信息'">
                                     <td v-text="item.classParam.paramName"></td>
                                     <td>是</td>
                                     <td>
                                        <span v-show="item.classParam.isRequired == 0">否</span>
                                         <span v-show="item.classParam.isRequired == 1">是</span>
                                     </td>
                                 </tr>
                             </table>
                        </div>
                    </el-form-item>
             </el-form>
             <el-form  label-position="center" label-width="130px" class="noborder form" v-if="data.itemId == 13">
                    <el-form-item label="是否支持退保">
                        <!--不允许退保：0；保单生效前允许退保：1；保单失效前允许退保：其他-->
                        <span class="el-input">
                            <span v-show="output.productsPo.refundFlag == 0">不支持退保</span>
                            <span v-show="output.productsPo.refundFlag == 1">保单生效前允许退保</span>
                            <span v-show="output.productsPo.refundFlag != 1 && output.productsPo.refundFlag != 0">保单失效前允许退保</span>
                            <span class="red"> =>
                                <span v-show="output.editProductsPo.refundFlag == 0">不支持退保</span>
                                <span v-show="output.editProductsPo.refundFlag == 1">保单生效前允许退保</span>
                                <span v-show="output.editProductsPo.refundFlag != 1 && output.editProductsPo.refundFlag != 0">保单失效前允许退保</span>
                            </span>
                        </span>
                    </el-form-item>
                    <el-form-item label="只允许身份证投保">
                        <span class="el-input" >
                            <span v-if="output.productsPo.isIdentifyType == 1">是</span>
                            <span v-else>否</span>
                            <span class="red"> => {{output.editProductsPo.isIdentifyType == 1 ? '是' : '否'}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="支持受益人自定义">
                        <span class="el-input">
                            <span  v-if="output.productsPo.beneficiaryNum == 0">不允许</span>
                            <span v-else>允许</span>
                            <span class="red" > => {{output.editProductsPo.beneficiaryNum == 0 ? '不允许' : '允许'}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="支持在线理赔">
                        <span class="el-input" >
                            <span v-if="output.productsPo.claimOnline == 1">允许</span>
                            <span v-else>不允许</span>
                            <span class="red"> => {{output.editProductsPo.claimOnline == 1 ? '允许' : '不允许'}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="是否支持电子保单">
                        <span class="el-input" >
                            <span v-if="output.productsPo.supportPolicy == 1">支持</span>
                            <span v-else>不支持</span>
                            <span class="red"> =>  {{output.editProductsPo.supportPolicy == 0 ? '支持' : '不支持'}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="投保人信息">
                        <el-col :span="8">
                            <table class="userTable" border="1">
                                <tr>
                                    <td>输入项名称</td>
                                    <td>是否显示</td>
                                    <td>是否必填</td>
                                </tr>
                                <tr v-for="item in output.productParamsPoList" v-if="item.classParam.paramClass == '投保人信息'">
                                    <td v-text="item.classParam.paramName"></td>
                                    <td>是</td>
                                    <td>
                                        <span v-show="item.classParam.isRequired == 0">否</span>
                                        <span v-show="item.classParam.isRequired == 1">是</span>
                                    </td>
                                </tr>
                            </table>
                        </el-col>
                        <el-col :span="2" class="red">=></el-col>
                         <el-col :span="10">
                            <table class="userTable red" border="1" >
                                <tr>
                                    <td>输入项名称</td>
                                    <td>是否显示</td>
                                    <td>是否必填</td>
                                </tr>
                                <tr v-for="item in output.editProductParamsPoList	" v-if="item.classParam.paramClass == '投保人信息'">
                                    <td v-text="item.classParam.paramName"></td>
                                    <td>是</td>
                                    <td>
                                        <span v-show="item.classParam.isRequired == 0">否</span>
                                        <span v-show="item.classParam.isRequired == 1">是</span>
                                    </td>
                                </tr>
                            </table>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="被保险人信息">
                        <div class="el-input">
                            <el-col :span="8">
                                <table class="userTable" border="1">
                                    <tr>
                                        <td>输入项名称</td>
                                        <td>是否显示</td>
                                        <td>是否必填</td>
                                    </tr>
                                    <tr v-for="item in output.productParamsPoList" v-if="item.classParam.paramClass == '被保人信息'">
                                        <td v-text="item.classParam.paramName"></td>
                                        <td>是</td>
                                        <td>
                                            <span v-show="item.classParam.isRequired == 0">否</span>
                                            <span v-show="item.classParam.isRequired == 1">是</span>
                                        </td>
                                    </tr>
                                </table>
                            </el-col>
                            <el-col :span="2" class="red">=></el-col>
                            <el-col :span="10">
                                <table class="userTable red" border="1">
                                    <tr>
                                        <td>输入项名称</td>
                                        <td>是否显示</td>
                                        <td>是否必填</td>
                                    </tr>
                                    <tr v-for="item in output.editProductParamsPoList	" v-if="item.classParam.paramClass == '被保人信息'">
                                        <td v-text="item.classParam.paramName"></td>
                                        <td>是</td>
                                        <td>
                                            <span v-show="item.classParam.isRequired == 0">否</span>
                                            <span v-show="item.classParam.isRequired == 1">是</span>
                                        </td>
                                    </tr>
                                </table>
                            </el-col>
                        </div>
                    </el-form-item>
                     <el-form-item label="其他信息">
                         <div class="el-input">
                             <el-col :span="8">
                                <table class="userTable" border="1" style="display:inline-block">
                                    <tr>
                                        <td>输入项名称</td>
                                        <td>是否显示</td>
                                        <td>是否必填</td>
                                    </tr>
                                    <tr v-for="item in output.productParamsPoList" v-if="item.classParam.paramClass == '其他信息'">
                                        <td v-text="item.classParam.paramName"></td>
                                        <td>是</td>
                                        <td>
                                            <span v-show="item.classParam.isRequired == 0">否</span>
                                            <span v-show="item.classParam.isRequired == 1">是</span>
                                        </td>
                                    </tr>
                                </table>
                            </el-col>
                            <el-col :span="2" class="red">=></el-col>
                            <el-col :span="10">
                                <table class="userTable red" border="1">
                                    <tr>
                                        <td>输入项名称</td>
                                        <td>是否显示</td>
                                        <td>是否必填</td>
                                    </tr>
                                    <tr v-for="item in output.editProductParamsPoList	" v-if="item.classParam.paramClass == '其他信息'">
                                        <td v-text="item.classParam.paramName"></td>
                                        <td>是</td>
                                        <td>
                                            <span v-show="item.classParam.isRequired == 0">否</span>
                                            <span v-show="item.classParam.isRequired == 1">是</span>
                                        </td>
                                    </tr>
                                </table>
                             </el-col>
                        </div>
                    </el-form-item>
             </el-form>
          </div>
          <h2>审核信息</h2>
          <div class="text1">
                 <el-table :data="dataList" ref="table" v-loading="listLoading" border fit highlight-current-row>
                    <el-table-column align="center" label="序号" width="100">
                        <template scope="scope">
                            <span>{{(params.page-1)*params.size+parseInt(scope.$index) + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="审核结果">
                        <template scope="scope">
                            <span v-show="scope.row.auditSts == 0">待审核</span>
                            <span v-show="scope.row.auditSts == 1">审核通过</span>
                            <span v-show="scope.row.auditSts == -1">审核未通过</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="审核不通过原因">
                        <template scope="scope">
                            <span>{{scope.row.auditComment}}</span>
                        </template>
                    </el-table-column>
                     <el-table-column align="center" label="审核员">
                        <template scope="scope">
                            <span>{{scope.row.auditNickname}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="审核时间">
                        <template scope="scope">
                            <span>{{scope.row.auditTime1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作员">
                        <template scope="scope">
                            <span>{{scope.row.reqNickname}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="提交时间">
                        <template scope="scope">
                            <span>{{scope.row.reqTime1}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="padding:20px 0;">
                    <div v-show="total" class="pagination-container" style="display:inline-block">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="params.page" :page-sizes="[10]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
                        </el-pagination>
                    </div>
                </div>
          </div>
          <h2 v-if="data.auditSts == 0">本次审核意见</h2>
          <div v-if="data.auditSts == 0" class="text1">
               <el-form ref="formData" :model="form" :rules="rules" label-position="center" label-width="50px" class="noborder" >
                     <el-form-item label="" prop="auditSts">
                        <el-radio-group v-model="form.auditSts" style="padding-top:10px;">
                            <el-radio label="1">审核通过</el-radio>
                            <el-radio label="-1">审核不通过</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="" prop="auditComment" v-if="form.auditSts == -1">
                        <el-input type="textarea" :rows="5" style="width:700px;" placeholder="审核不通过理由" v-model="form.auditComment"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button v-waves  type="primary"@click="submitData('formData')">提交</el-button>
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

export default {
    data() {
        return {
            listLoading: false,
            data: '', //上个页面的数据
            output: {
                productsPo: '', //详情（个险车险）
                editProductsPo: '', //编辑后的详情
                productsPoEdit: '', //车险编辑
                planBenefitsList: [], //保障计划
                priceElementsPoList: [], //计价因子
                productParamsPoList: [], //
            },
            params: {
                url: 'productaudit/findproductauditlog',
                page: 1,
                size: 10,
                bizId: '' //专题id
            },
            dataList: [],
            total: 0, //总条数
            form: { //审核未审核
                auditSts: '',
                auditComment: ''
            },
            rules: {
                auditSts: [
                    { required: true, message: '请选择审核意见', trigger: 'change' }
                ],
                auditComment: [
                    { required: true, message: '请填写审核不通过理由', trigger: 'change' },
                    { min:1, max: 200, message: '长度1-200', trigger: 'change' }
                ]
            }
        }
    },
    computed: {
    },
    created() {
        this.data = JSON.parse(this.$route.query.data);
        this.params.bizId = this.data.bizId; //审核id
        // console.log(this.data.itemId)
        this.getData();
    },
    mounted() {
    },
    methods: {
        /*获取数据*/
        getData () {
            this.listLoading = true; //加载动作
            let obj = {
                 url: 'productaudit/findAuditInfo',
                 auditId: this.data.auditId
            }
            // debugger;
            config(obj).then(response => {
                console.log(response)
                if (response.respCode === '000000') {
                    this.output = response.data;
                    this.getList(); //审核表格
                } else {
                    this.listLoading =false; //加载动作
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                this.listLoading =false; //加载动作
            })
        },
         /*审核表格借口*/
        getList () {
            // console.log(this.params)
            config(this.params).then(response => {
                // console.log(response)
                if (response.respCode === '000000') {
                    this.total = response.data.total; //总条数赋值
                    this.dataList = response.data.logPoList;
                } else {
                    this.message('warning', response.respMsg)
                }
                this.listLoading =false; //加载动作
            }).catch(err => {
                this.listLoading =false; //加载动作
            })
        },
        //调整每页几条
        handleSizeChange(val) {
            // this.params.size = val;
            // this.params.page = 1;
            // this.subForm();
        },
        //翻页
        handleCurrentPageChange (val) {
            this.params.page = val; //第几页赋值
            this.getList();
        },
        //提交
        submitData (formName) {
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    let obj = {
                        url: 'productaudit/dealProductAudit',
                        auditComment: this.form.auditComment,
                        auditId: this.output.auditId,
                        auditSts: this.form.auditSts,
                        productId: this.data.productId
                    }
                    config(obj).then(response => {
                        console.log(response)
                        if (response.respCode === '000000') {
                            this.message('success', response.respMsg);
                            debugger;
                            this.$router.go(-1)
                        } else {
                            this.message('warning', response.respMsg)
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
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
        },
        //过滤计价因子
        formatPricingFactors(val) {
            if (!val) {
                return '';
            } else {
                return val.replace(/,/g, '  ');
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
        /*width:300px;*/
    }
    .text1{
        padding-left:50px;
    }
    .text img{
        width:120px;
        height:120px;
    }
    .red{
        color:red;
    }
    .form table{
        width:auto;
        min-width: 10px;
        border:0;
    }
    .userTable td{
        padding: 20px;
        text-align: center;
    }
</style>