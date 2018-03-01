<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <h3 class="title">账号信息</h3>
            <el-row>
                <el-col :span="10" :offset="1">
                    <div class="filter-container">
                        <el-form label-width="150px" class="credit-aplly-form">
                            <el-form-item label="用户名:" required>
                                <el-input v-model="listQuery.params.username" style="width:300px"></el-input>
                            </el-form-item>
                            <el-form-item label="等级:" required>
                                <el-select clearable style="width:300px" class="filter-item" v-model="listQuery.params.userLevel" placeholder="用户状态">
                                    <el-option v-for="item in userLevelStatus" :key="item.code" :label="item.text" :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="注册渠道:" required>
                                <el-select clearable style="width:300px" class="filter-item" v-model="listQuery.params.domainCode" placeholder="注册渠道">
                                    <el-option v-for="item in domainStatus" :key="item.domainId" :label="item.domainName" :value="item.domainId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="10" :offset="1">
                    <div class="filter-container">
                        <el-form label-width="100px" class="credit-aplly-form">
                            <el-form-item label="用户头像:" required>
                                <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:paramName="'listQuery.params.userLogo'"></uploadImg>
                                <!-- <img :src="listQuery.params.userLogo" alt="" v-if="listQuery.params.userLogo" style="width:120px;height:120px;">
                                    <span v-else>暂无图片</span> -->
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="filter-container">
            <h3 class="title">个人信息</h3>
            <el-row>
                <el-col :span="10" :offset="1">
                    <el-form label-width="150px" class="credit-aplly-form">
                        <el-form-item label="姓名:" required>
                            <el-input v-model="listQuery.params.realName" style="width:300px"></el-input>
                        </el-form-item>
                        <el-form-item label="性别:" required>
                            <el-select clearable style="width:300px" class="filter-item" v-model="listQuery.params.userGender" placeholder="性别">
                                <el-option v-for="item in sexStatus" :key="item.code" :label="item.text" :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="生日:" required>
                            <el-date-picker v-model="pickTimeStart" type="date" placeholder="起始时间" :editable="false" @change="dateChange" style="width:300px">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="邮箱:" required>
                            <el-input v-model="listQuery.params.email" style="width:300px"></el-input>
                        </el-form-item>
                        <el-form-item label="地址:" required>
                            <el-input v-model="listQuery.params.insurantAddress" style="width:300px"></el-input>
                        </el-form-item>
                        <el-form-item label="实名认证状态:" required>
                            <el-select clearable style="width:300px" class="filter-item" v-model="listQuery.params.realNameStatus" placeholder="实名认证状态">
                                <el-option v-for="item in realNameStatus" :key="item.code" :label="item.text" :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="证件类型:" required>
                            <el-select clearable style="width:300px" class="filter-item" v-model="listQuery.params.idenType" placeholder="证件类型">
                                <el-option v-for="item in idenTypeStatus" :key="item.code" :label="item.text" :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="证件号码:" required>
                            <el-input v-model="listQuery.params.idenNo" style="width:300px"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证正面照:" required>
                            <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:paramName="'listQuery.params.idenImg1'"></uploadImg>
                            <!-- <img :src="listQuery.params.idenImg1" alt="" v-if="listQuery.params.idenImg1" style="width:120px;height:120px;">
                            <span v-else>暂无图片</span> -->
                        </el-form-item>
                        <el-form-item label="身份证反面照:" required>
                            <uploadImg v-on:acqImgUrl="acqImgUrl" v-bind:paramName="'listQuery.params.idenImg2'"></uploadImg>
                        </el-form-item>
                    </el-form>
                </el-col>

            </el-row>
        </div>
        <div class="filter-container">
            <el-button @click="addUser" type="primary" size="small" style="margin-left:100px;">
                保存
            </el-button>
            <el-button @click="Cancel" type="primary" size="small">
                取消
            </el-button>
        </div>
    </div>
</template>
<script>
import '@res/css/wjq/style.less';
import config from '@api/config';
import { parseTime } from '@filters/index.js';
import uploadImg from "@src/components/uploadImg";
export default {
    components: {
        uploadImg
    },
    data() {
        return {
            dataList: [],
            pickTimeStart: '',
            selectAmountStatus: [{ code: 1, text: '0-1元' }, { code: 2, text: '1-10元' }, { code: 3, text: '10-50元' }, { code: 4, text: '50-100元' }, { code: 5, text: '100元及以上' }, { code: 10, text: '自定义' }],//用户状态下拉框
            userLevelStatus: [{ code: 10, text: 'C端' }, { code: 20, text: 'B端' }, { code: 11, text: '业务人员' }],//等级下拉框
            domainStatus: [],//注册渠道下拉框
            sexStatus: [{ code: 2, text: '女' }, { code: 1, text: '男' }, { code: '', text: '未知' }],
            realNameStatus: [{ code: -1, text: '认证失败' }, { code: 1, text: '认证成功' }, { code: 0, text: '未认证' }],//实名认证状态
            idenTypeStatus: [{ code: 1, text: '身份证' }, { code: 2, text: '军官证' }, { code: 3, text: '护照' }, { code: 4, text: '驾驶证' }, { code: 5, text: '港澳台通行证' }, { code: 6, text: '回乡证' }],
            userAccounts: {},  //资产信息,
            listQuery: { params: { url: 'user/addUser', page: 1, size: 10, username: '', userLevel: '', domainCode: '', userLogo: '', userRealName: '', userGender: '', userBirthday: '', email: '', realNameStatus: '', idenType: '', idenNo: '', idenImg1: '', idenImg2: '' } },
            orderList: [], //订单列表
            userBankCards: {},
            upReferrerList: [],
            downReferrerList: [],
            addDownReferrerList: [],
        };
    },
    created() {
        this.getList();
    },
    computed: {
    },
    methods: {
        /*时间选择器默认事件*/
        dateChange() {
            if (this.pickTimeStart === "") {
                this.listQuery.params.userBirthday = "";
            } else {
                this.listQuery.params.userBirthday = parseTime(this.pickTimeStart, '{y}-{m}-{d}');
            }
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
        //取消按钮
        Cancel() {
            this.$router.push({ path: '/user/toUserView' });
        },

        //删除下级客户
        addUser(val) {
            config(this.listQuery.params).then(response => {
                if (response.respCode === '000000') {
                    this.$message({
                        message: response.respMsg,
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: response.respMsg,
                        type: 'warning'
                    });
                }
            }).catch(err => {

            })
        },
        acqImgUrl(params) {
            console.log(params);
            if ('listQuery.params.userLogo' == params[1]) {
                this.listQuery.params.userLogo = params[0];
            } else if ('listQuery.params.idenImg1' == params[1]) {
                this.listQuery.params.idenImg1 = params[0];
            } else if ('listQuery.params.idenImg2' == params[1]){
                this.listQuery.params.idenImg2 = params[0];
            }
            console.log(this.listQuery);
        }
    },
    filters: {
        //性别过滤
        sexFilter(value) {
            if (value === 2) {
                return '女';
            } else if (value === 1) {
                return '男';
            } else {
                return '未知';
            }
        },
        //实名认证状态
        realNameStatusFilter(value) {
            if (value === 0) {
                return '未认证';
            } else if (value === -1) {
                return '认证失败';
            } else if (value === 1) {
                return '认证成功';
            } else {
                return value;
            }
        },
        tradeStsFilter(value) {
            if (value === '') {
                return '全部';
            } else if (value === 10) {
                return '已下单（待支付）';
            } else if (value === -11) {
                return '订单已失效';
            } else if (value === -12) {
                return '订单关闭';
            } else if (value === -13) {
                return '订单已删除';
            } else if (value === 18) {
                return '已支付待激活';
            } else if (value === 20) {
                return '已支付待发货';
            } else if (value === 21) {
                return '支付不足';
            } else if (value === 22) {
                return '支付超额';
            } else if (value === -20) {
                return '支付超时失败';
            } else if (value === -21) {
                return '支付不足超时失败';
            } else if (value === 25) {
                return '已激活待审核';
            } else if (value === 30) {
                return '发货中';
            } else if (value === 35) {
                return '已发货';
            } else if (value === -30) {
                return '未知原因发货失败';
            } else if (value === -31) {
                return '渠道余额不足发货失败';
            } else if (value === -32) {
                return '供应商余额不足发货失败';
            } else if (value === -33) {
                return '网络异常发货失败';
            } else if (value === 40) {
                return '全部核销';
            } else if (value === 41) {
                return '部分核销';
            } else if (value === 50) {
                return '全部退款申请';
            } else if (value === 51) {
                return '同意全部退款';
            } else if (value === -51) {
                return '拒绝全部退款';
            } else if (value === 55) {
                return '部分退款申请';
            } else if (value === 56) {
                return '同意部分退款';
            } else if (value === -56) {
                return '拒绝部分退款';
            } else {
                return value;
            }
        },
        //用户状态
        statusFilter(value) {
            if (value === 0) {
                return '正常';
            } else if (value === -1) {
                return '注销';
            } else if (value === -2) {
                return '冻结';
            } else {
                return value;
            }
        },
        //等级过滤
        userLevelFilter(value) {
            if (value === '10') {
                return 'C端';
            } else if (value === '20') {
                return 'B端';
            } else if (value === '11') {
                return '业务人员';
            } else {
                return value;
            }
        },
        //时间过滤
        timeFilter(val) {
            var date = new Date(val);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
            let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return Y + M + D + h + m + s;
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
}

.app-container .filter-container .rightData {
    margin-right: 100px;
}
</style>

