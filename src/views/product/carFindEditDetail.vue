<template>
    <div class="app-container calendar-list-container">
        <el-tabs v-model="tabsName" type="card" @tab-click="handleClick">
            <el-tab-pane label="用户信息" name="first">
                <div class="filter-container">
                    <h3 class="title">产品投保信息</h3>
                    <div class="filter-container">
                        <el-form label-width="150px" :model="userInfoData" :rules="rules" ref="userInfo" class="credit-aplly-form">
                            <el-form-item prop="productName" label="产品名称:" required>
                                <el-input v-model="userInfoData.productName" style="width:320;">
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="productFeature" label="产品亮点1:" required>
                                <el-input v-model="userInfoData.productFeature" style="width:320;">
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="perferWords" label="产品亮点2:" required>
                                <el-input v-model="userInfoData.perferWords" style="width:320;">
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="productLogo" label="产品图片:" required>
                                <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:paramName="'userInfoData.productLogo'"></uploadImg>
                            </el-form-item>
                            <el-form-item prop="productTagUrls" label="产品标签:" required>
                                <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:paramName="'userInfoData.productTagUrls'"></uploadImg>
                            </el-form-item>
                            <el-form-item prop="insurerId" label="承保公司:" required>
                                <el-select clearable style="width:320px" class="filter-item" v-model="userInfoData.insurerId" placeholder="请选择">
                                    <el-option v-for="item in poList" :key="item.insurerId" :label="item.insurerName" :value="item.insurerId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="classId" label="保险类别:" required>
                                <!-- <el-select clearable style="width:160px" class="filter-item" v-model="selectClassId" placeholder="保险父类" @change="selectChange">
                                        <el-option v-for="item in classList" :key="item.classId" :label="item.className" :value="item.classId">
                                        </el-option>
                                    </el-select>
                                    <el-select clearable style="width:160px" class="filter-item" v-model="userInfoData.classId" placeholder="保险子类">
                                        <el-option v-for="item in classList1" :key="item.classId" :label="item.className" :value="item.classId">
                                        </el-option>
                                    </el-select> -->
                                <el-cascader expand-trigger="hover" :options="classList" v-model="userInfoData.classIdList" @change="handleChange">
                                </el-cascader>
                            </el-form-item>
                            <el-form-item label="产品有效期:" required>
                                <el-date-picker prop="effTime" v-model="userInfoData.effTime" type="date" placeholder="起始时间" :editable="false" @change="dateChange">
                                </el-date-picker>至
                                <el-date-picker prop="expTime" v-model="userInfoData.expTime" type="date" placeholder="结束时间" :editable="false" @change="dateChange">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item prop="baselineQuantity" label="产品基准销量:" required>
                                <el-input style="width:320px;" v-model="userInfoData.baselineQuantity"></el-input>
                            </el-form-item>
                            <el-form-item label="订单允许支付时间:" required>
                                <el-input prop="payTime" style="width:100px;" v-model="userInfoData.payTime"></el-input>
                                <el-select prop="payTimeUnit" clearable style="width:100px" class="filter-item" v-model="userInfoData.payTimeUnit" placeholder="单位">
                                    <el-option v-for="item in payTimeUnitStatus" :key="item.code" :label="item.text" :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="commisionValue1" label="商业险一级佣金:" required>
                                <el-input style="width:320px;" v-model.number="userInfoData.commisionValue1"></el-input>%
                            </el-form-item>
                            <el-form-item prop="commisionValue2" label="商业险二级佣金:" required>
                                <el-input style="width:320px;" v-model.number="userInfoData.commisionValue2"></el-input>%
                            </el-form-item>
                            <el-form-item prop="vehicleCommisionValue1" label="交强险一级佣金:" required>
                                <el-input style="width:320px;" v-model.number="userInfoData.vehicleCommisionValue1"></el-input>%
                            </el-form-item>
                            <el-form-item prop="vehicleCommisionValue2" label="交强险二级佣金:" required>
                                <el-input style="width:320px;" v-model.number="userInfoData.vehicleCommisionValue2"></el-input>%
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
                        </el-form>
                    </div>

                </div>
                <div class="filter-container" style="height:100px;line-height:100px;">
                    <el-button @click="Commit()" size="small" type="primary">
                        保存并提交
                    </el-button>
                    <el-button @click="dialogVisible = true" size="small" type="primary">
                        取消
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
                            <el-button type="primary" style="margin-left:50px;" @click="addCarProductPrice">新增</el-button>
                        </div>
                        <div class="filter-container" style="overflow-x:auto;">
                            <div class="filter-container">
                                <div class="planList" v-for="(item, index) in productPlansList" :key="index">
                                    <div class="right_tip">
                                        <span style="margin-right:50px;">{{item.planName}}</span>
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
                </div>
                <!--  保障计划新增-->
                <el-dialog title="保障计划新增" :visible.sync="dialogFormVisible">
                    <div class="filter-container">
                        <span>计划名称</span>
                        <el-input style="width:200px;margin-left:50px;" v-model="carClassName"></el-input>
                    </div>
                    <div v-for="(item,index) in carInsItemList" :key="index" style="margin-bottom:10px;margin-top:10px;">
                        <el-row>
                            <el-col :span="3" :offset="1">
                                <el-checkbox v-model="item.trueSts">{{item.name}}</el-checkbox>
                            </el-col>
                            <el-col :span="2" :offset="1" v-if="item.trueSts">
                                <el-checkbox v-model="item.hasFranchise">不计免赔</el-checkbox>
                            </el-col>
                            <el-col :span="2" :offset="1" v-if="!item.trueSts">
                                <el-checkbox v-model="item.trueSts" disabled>不计免赔</el-checkbox>
                            </el-col>
                            <el-col :span="3" :offset="1" v-if="item.trueSts">
                                <el-select clearable style="width:200px" class="filter-item" placeholder="" v-model="item.amountKey">
                                    <el-option v-for="list in item.amountList" :key="list.key" :value="list.key" :label="list.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="3" :offset="1" v-if="!item.trueSts">
                                <el-select clearable style="width:200px" class="filter-item" placeholder="" v-model="item.amountKey" disabled>
                                    <el-option v-for="list in item.amountList" :key="list.key" :value="list.key" :label="list.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="AddSave">保存</el-button>
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                    </div>
                </el-dialog>
                <!-- 保障计划编辑 -->
                <el-dialog title="保障计划编辑" :visible.sync="dialogFormVisible1">
                    <div class="filter-container">
                        <span>计划名称</span>
                        <el-input style="width:200px;margin-left:50px;" v-model="carInsItemListEdit.planName"></el-input>
                    </div>
                    <div v-for="(item,index) in carInsItemListEdit.planBenefitsList" :key="index" style="margin-bottom:10px;margin-top:10px;">
                        <el-row>
                            <el-col :span="3" :offset="1">
                                <el-checkbox v-model="item.trueSts">{{item.name}}</el-checkbox>
                            </el-col>
                            <el-col :span="2" :offset="1">
                                <el-checkbox v-model="item.hasFranchise">不计免赔</el-checkbox>
                            </el-col>
                            <!-- <el-col :span="2" :offset="1" v-if="!item.trueSts">
                                    <el-checkbox v-model="item.trueSts" disabled>不计免赔</el-checkbox>
                                </el-col> -->
                            <el-col :span="3" :offset="1" v-if="item.trueSts">
                                <el-select clearable style="width:200px" class="filter-item" placeholder="" v-model="item.amountKey">
                                    <el-option v-for="list in item.amountList" :key="list.key" :value="list.key" :label="list.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="3" :offset="1" v-if="!item.trueSts">
                                <el-select clearable style="width:200px" class="filter-item" placeholder="" v-model="item.amountKey" disabled>
                                    <el-option v-for="list in item.amountList" :key="list.key" :value="list.key" :label="list.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="AddSaveEdit">保存</el-button>
                        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                    </div>
                </el-dialog>
                <div class="filter-container" style="height:100px;line-height:100px;">
                    <el-button type="primary" @click="allSave">保存</el-button>
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
import upload from '@components/upload';
import { baseURL } from '@api/base.js';
export default {
    components: {
        uploadImg,
        upload
    },
    data() {
        return {
            tabsName: 'first',
            dataList: [],
            imageUrl: require('@res/img/background.jpg'),
            loading: true,
            total: '',
            pickTimeStart: '',
            pickTimeEnd: '',
            userInfoList: { params: { url: 'product/car/findProductPage', productId: this.$route.query.productId } },
            selectAmountStatus: [{ code: 1, text: '0-1元' }, { code: 2, text: '1-10元' }, { code: 3, text: '10-50元' }, { code: 4, text: '50-100元' }, { code: 5, text: '100元及以上' }, { code: 10, text: '自定义' }],//用户状态下拉框
            userLevelStatus: [{ code: 10, text: 'C端' }, { code: 20, text: 'B端' }, { code: 11, text: '业务人员' }],//等级下拉框
            userInfoData: {},
            productId: this.$route.query.productId,
            domainStatus: '',//注册渠道下拉框
            sexStatus: [{ code: -1, text: '认证失败' }, { code: 1, text: '认证成功' }, { code: 0, text: '未认证' }],
            realNameStatus: [{ code: -1, text: '认证失败' }, { code: 1, text: '认证成功' }, { code: 0, text: '未认证' }],//实名认证状态
            idenTypeStatus: [{ code: 1, text: '身份证' }, { code: 2, text: '军官证' }, { code: 3, text: '护照' }, { code: 4, text: '驾驶证' }, { code: 5, text: '港澳台通行证' }, { code: 6, text: '回乡证' }],
            userAccounts: {},  //资产信息,
            listQuery: { params: { url: 'ordermanager/findOrderList', page: 1, size: 10, tradeId: '', selectAmount: '', orderSts: '', domainId: '', productName: '', tradeAgent: '', beginDate: '', endDate: '', userId: '' } },
            orderList: [], //订单列表
            dialogVisible: false,
            dialogFormVisible: false,
            dialogFormVisible1: false,
            carProductTPriceList: { params: { url: 'product/carProductTPrice', productId: this.$route.query.productId } },
            productPlansList: [],
            carInsItemList: [], //新增时所有保障计划信息
            carInsItemList1: [], //编辑时所有保障计划信息
            payTimeUnitStatus: [{ code: 1, text: '天' }, { code: 2, text: '小时' }, { code: 3, text: '分钟' }],
            classList: [], //保险类别下拉菜单父类
            classList1: [], //保险类别下拉菜单子类
            selectClassId: null,
            poList: [],
            editIndex: '',
            // 表单验证
            rules: {
                productName: [
                    { required: true, message: '产品名称不能为空', trigger: 'change' },
                ],
                productFeature: [
                    { required: true, message: '产品亮点1不能为空', trigger: 'blur' }
                ],
                perferWords: [
                    { required: true, message: '产品亮点2不能为空', trigger: 'change' }
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
                    { required: true, message: '时间不能为空', trigger: 'change' }
                ],
                expTime: [
                    { required: true, message: '时间不能为空', trigger: 'change' }
                ],
                baselineQuantity: [
                    { required: true, message: '产品基准销量不能为空' }
                ],
                payTime: [
                    { required: true, message: '时间不能为空', trigger: 'change' }
                ],
                payTimeUnit: [
                    { required: true, message: '单位不能为空', trigger: 'change' }
                ],
                commisionValue1: [
                    { required: true, message: '商业险一级佣金不能为空' },
                    { type: 'number', message: '商业险一级佣金必须为数字值' }
                ],
                commisionValue2: [
                    { required: true, message: '商业险二级佣金不能为空' },
                    { type: 'number', message: '商业险二级佣金必须为数字值' }
                ],
                vehicleCommisionValue1: [
                    { required: true, message: '交强险一级佣金不能为空' },
                    { type: 'number', message: '交强险一级佣金必须为数字值' }
                ],
                vehicleCommisionValue2: [
                    { required: true, message: '交强险二级佣金不能为空' },
                    { type: 'number', message: '交强险二级佣金必须为数字值' }
                ],
                commisionValue2: [
                    { required: true, message: '商业险二级佣金不能为空' },
                    { type: 'number', message: '商业险二级佣金必须为数字值' }
                ],
                insuranceTerms: [
                    { required: true, message: '保险条款不能为空' }
                ]
            },
            itemIsShow: false,
            itemKey: '',
            carClassName: '',
            carInsItemListEdit: { planName: '', planBenefitsList: [] },
            // 上传pdf
            showUpload: false,
            otherParams: {
                token: 'fileToken',
                name: 'file'
            },
            uploadURL: baseURL() + 'upload/fileUpload?filePath=product',
            message: null,
        };
    },
    created() {
        this.handleClick();

    },
    computed: {
    },
    methods: {
        /*时间选择器默认事件*/
        dateChange() {
            if (this.pickTimeStart === "") {
                this.listQuery.params.beginDate = "";
            } else {
                this.listQuery.params.beginDate = parseTime(this.pickTimeStart, '{y}-{m}-{d}');
            }
            if (this.pickTimeEnd === "") {
                this.listQuery.params.endDate = "";
            } else {
                this.listQuery.params.endDate = parseTime(this.pickTimeEnd, '{y}-{m}-{d}');
            }
        },
        //用户信息获取
        getUserInfo() {
            config(this.userInfoList.params).then(response => {
                if (response.respCode === '000000') {
                    this.userInfoData = response.data.productList[0];
                    console.log(this.userInfoData.classIdList);
                } else {

                }
            }).catch(err => {

            })
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
            this.userInfoData.effTime = parseTime(this.userInfoData.effTime, '{y}-{m}-{d}');
            this.userInfoData.expTime = parseTime(this.userInfoData.expTime, '{y}-{m}-{d}');
            console.log(this.userInfoData.classList)
            config(
                {
                    url: 'product/addCarProductMsg',
                    baselineQuantity: this.userInfoData.baselineQuantity,
                    classId: this.userInfoData.classIdList[1],
                    commisionValue1: this.userInfoData.commisionValue1,
                    commisionValue2: this.userInfoData.commisionValue2,
                    effTime: this.userInfoData.effTime,
                    expTime: this.userInfoData.expTime,
                    insurerId: this.userInfoData.insurerId,
                    payTime: this.userInfoData.payTime,
                    payTimeUnit: this.userInfoData.payTimeUnit,
                    perferWords: this.userInfoData.perferWords,
                    productFeature: this.userInfoData.productFeature,
                    productLogo: this.userInfoData.productLogo,
                    productName: this.userInfoData.productName,
                    productTagUrls: this.userInfoData.productTagUrls,
                    vehicleCommisionValue1: this.userInfoData.vehicleCommisionValue1,
                    vehicleCommisionValue2: this.userInfoData.vehicleCommisionValue2
                }).then(response => {
                    if (response.respCode === '000000') {
                        this.$message({
                            message: response.respMsg,
                            type: 'success'
                        });
                        // this.getUserInfo();
                        // this.resetForm('userInfo');
                        this.tabsName = 'second';
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
            console.log(params);
            if ('userInfoData.productLogo' == params[1]) {
                this.userInfoData.productLogo = params[0];
            } else {
                this.userInfoData.productTagUrls = params[0];
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
            this.getCarInsItemEnum();
            this.carClassName = '';
        },
        //车险 所有 保障计划查询
        getCarInsItemEnum() {
            let obj = {
                url: 'product/getCarInsItemEnum'
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.carInsItemList = response.data.carInsItemList;
                } else {

                }
            }).catch(err => {

            })
        },
        // //父类下拉框改变时触发
        // selectChange() {
        //     console.log(this.selectClassId);
        //     let obj = {
        //         url: 'product/param/findProductClasses',
        //         parentId: this.selectClassId
        //     }
        //     config(obj).then(response => {
        //         if (response.respCode === '000000') {
        //             this.classList1 = response.data;
        //         }
        //     }).catch(err => {

        //     })
        // },
        //承保公司下拉菜单
        getCompanyList() {
            let obj = {
                url: 'insurer/findAll',
                parentId: 0,
                insurerType: 20
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
            let obj = {
                planName: this.carClassName,
                planBenefitsList: []
            }
            this.carInsItemList.forEach((item, index) => {
                if (item.trueSts) {
                    let franchiseFlag = null;
                    if (!item.hasFranchise) {
                        franchiseFlag = -1;
                    }
                    if (item.hasFranchise && item.amountKey === 0) {
                        franchiseFlag = 0;
                    }
                    if (item.hasFranchise && item.amountKey != 0 && item.amountKey != null) {
                        franchiseFlag = 1;
                    }
                    let obj1 = {
                        benefitCode: item.code,
                        benefitName: item.name,
                        className: item.className,
                        franchiseFlag: franchiseFlag,
                        insuredAmount: item.amountKey === null ? item.defaultValue : item.amountKey
                    }
                    obj.planBenefitsList.push(obj1);
                }
            })

            console.log(this.productPlansList);
            console.log(this.productPlansList.push(obj));
            //this.productPlansList = this.productPlansList.push(obj);
            this.dialogFormVisible = false;
        },
        //编辑保障计划保存
        AddSaveEdit() {
            console.log(this.productPlansList[this.editIndex]);
            let obj = {
                planName: this.productPlansList[this.editIndex].planName,
                planBenefitsList: []
            }   
            let that = this;
            //this.carInsItemListEdit.planBenefitsList.slice(0,this.productPlansList[this.editIndex].planBenefitsList.length-1);
            this.carInsItemListEdit.planBenefitsList.forEach((item, index) => {
                if (item.trueSts===true) {
                    let franchiseFlag = null;
                    if (!item.hasFranchise) {
                        franchiseFlag = -1;
                    }
                    if (item.hasFranchise && item.amountKey === 0) {
                        franchiseFlag = 0;
                    }
                    if (item.hasFranchise && item.amountKey != 0 && item.amountKey != null) {
                        franchiseFlag = 1;
                    }
                    let obj1 = {
                        benefitCode: item.code,
                        benefitName: item.name,
                        className: item.className,
                        franchiseFlag: franchiseFlag,
                        insuredAmount: item.amountKey === null ? item.defaultValue : item.amountKey
                    }
                    obj.planBenefitsList.push(obj1);
                    console.log(index)
                }
            })
            this.productPlansList[this.editIndex]= obj;
            //console.log(this.carInsItemListEdit)
            console.log(obj);
            // console.log(this.productPlansList.push(obj));
            //this.productPlansList = this.productPlansList.push(obj);
            this.dialogFormVisible1 = false;
        },
        //保障计划保存
        allSave() {
            let obj = {
                url: 'product/addCarProductPrice',
                productId: this.productId,
                productPlansVoList: this.productPlansList
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.$message({
                        message: response.respMsg,
                        type: 'success'
                    });
                    this.$router.push({ path: '/product/carFindListView' });
                } else {
                    this.$message.error(response.respMsg);
                }
            }).catch(err => {

            })
        },
        //计划编辑
        carInsTtemEdit(index) {
            console.log(index);
            this.editIndex = index;
            this.dialogFormVisible1 = true;
            console.log(this.carInsItemList1);
            let obj = {
                url: 'product/getCarInsItemEnum'
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.carInsItemListEdit.planName = this.productPlansList[index].planName;
                    //this.carInsItemListEdit.planBenefitsList=this.carInsItemList1;
                    console.log(this.productPlansList[index].planBenefitsList);
                    this.carInsItemListEdit.planBenefitsList = response.data.carInsItemList;
                    let that = this;
                    that.productPlansList[index].planBenefitsList.forEach((list, index) => {
                        that.carInsItemListEdit.planBenefitsList.forEach((item, index) => {
                            if (item) {
                                if (item.name === list.benefitName) {
                                    item.trueSts = true;
                                    item.code = list.benefitCode;
                                    item.className = list.className;
                                    item.franchiseFlag = list.franchiseFlag;
                                    item.hasFranchise = list.franchiseFlag;
                                    if (item.hasFranchise === 1) {
                                        item.hasFranchise = true;
                                    } else {
                                        item.hasFranchise = false;
                                    }
                                    item.amountKey = list.insuredAmount;
                                    console.log(item);
                                } else {

                                }
                            }
                        })
                    })

                } else {

                }
            }).catch(err => {
            })
        },
        //保险类别下拉菜单
        getClassList() {
            let obj = {
                url: 'product/param/findProductClasses',
                parentId: 0,
                classType: 1
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
        //
        toggleShowUpload() {
            this.showUpload = !this.showUpload;
        },
        uploadSuccess(data, field, keys) {
            if (data.respCode === '000000') {

                this.userInfoData.insuranceTerms = data.data;
                console.log(this.userInfoData.params.insuranceTerms);
                this.$message.success('上传成功');
            } else {
                this.$message.error('上传失败');
            }
            this.showUpload = false;
        },
        uploadFail(status, field, keys) {
            this.$message.error('上传失败');
            this.showUpload = false;
        },
        confirm() {
        },
        //层级选择器事件
        handleChange(value) {
            console.log(value);
        },
        //tab切换事件
        handleClick() {
            if (this.tabsName == 'first') {
                this.getClassList();
                this.getUserInfo();
                this.getCompanyList();
            }
            if (this.tabsName == 'second') {
                this.getCarProductTPrice();
            }
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

