<template>
    <div class="app-container calendar-list-container">
        <el-tabs v-model="tabsName" type="card" @tab-click="handleClick">
            <el-tab-pane label="用户信息" name="first">

            </el-tab-pane>
            <el-tab-pane label="资产信息" name="second">
                <!-- <div class="filter-container">
                            <h3>借记卡信息</h3>
                            <el-row>
                                <el-col :span="20" :offset="1">
                                    <el-form label-width="100px" class="credit-aplly-form" v-if="bankCardList[0]">
                                        <el-form-item label="姓名:">
                                            {{bankCardList[0].realName}}
                                        </el-form-item>
                                        <el-form-item label="开户银行:">
                                            {{bankCardList[0].bankName}}
                                        </el-form-item>
                                        <el-form-item label="卡号:">
                                            {{bankCardList[0].cardNo}}
                                        </el-form-item>
                                        <el-form-item label="身份证号:">
                                            {{bankCardList[0].idenNo}}
                                        </el-form-item>
                                        <el-form-item label="绑定时间:">
                                            {{bankCardList[0].createTime}}
                                        </el-form-item>
                                    </el-form>
                                    <el-form label-width="100px" class="credit-aplly-form" v-else>
                                        <el-form-item label="姓名:">
                                        </el-form-item>
                                        <el-form-item label="开户银行:">
                                        </el-form-item>
                                        <el-form-item label="卡号:">
                                        </el-form-item>
                                        <el-form-item label="身份证号:">
                                        </el-form-item>
                                        <el-form-item label="绑定时间:">
                                        </el-form-item>
                                    </el-form>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="filter-container">
                            <h3>信用卡信息</h3>
                            <el-row>
                                <el-col :span="20" :offset="1">
                                    <el-form label-width="100px" class="credit-aplly-form" v-if="bankCardList[1]">
                                        <el-form-item label="开户银行:">
                                            {{bankCardList[1].bankName}}
                                        </el-form-item>
                                        <el-form-item label="卡号:">
                                            {{bankCardList[1].cardNo}}
                                        </el-form-item>
                                        <el-form-item label="额度(元):">
                                            {{bankCardList[1].creditLimit}}
                                        </el-form-item>
                                        <el-form-item label="绑卡时间:">
                                            {{bankCardList[1].createTime}}
                                        </el-form-item>
                                    </el-form>
                                    <el-form label-width="100px" class="credit-aplly-form" v-else>
                                        <el-form-item label="开户银行:">
                                        </el-form-item>
                                        <el-form-item label="卡号:">
                                        </el-form-item>
                                        <el-form-item label="额度(元):">
                                        </el-form-item>
                                        <el-form-item label="绑卡时间:">
                                        </el-form-item>
                                    </el-form>
                                </el-col>
                            </el-row>
                        </div> -->
            </el-tab-pane>
            <el-tab-pane label="订单信息" name="third">
                <div class="filter-container">
                    VueKindEditor demo
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import '@res/css/wjq/style.less';
import config from '@api/config';
import { downloadExecl } from '@api/excel.js';
import { parseTime } from '@filters/index.js';
export default {
    data() {
        return {
            tabsName: 'first',
            dataList: [],
            imageUrl: require('@res/img/background.jpg'),
            loading: true,
            userInfoList: { params: { url: 'user/accountDetail', userId: this.$route.query.userId } }
        };
    },
    created() {
        this.handleClick();
    },
    computed: {
    },
    methods: {
        //用户信息获取
        getUserInfo() {
            config(this.userInfoList.params).then(response => {
                if (response.respCode === '000000') {
                    this.domainStatus = response.data.domainsPoList;
                } else {

                }
            }).catch(err => {

            })
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
        //获取风险联系人明细RiskContactDetailPo     
        getTravelRecordStatisticsPo() {
            config(this.TravelRecordStatisticsPo.params).then(response => {
                if (response.respCode === '000000') {
                    this.listUserTravelRecordStatisticsPo = response.data.listUserTravelRecordStatisticsPo;
                    this.total3 = response.data.userTravelRecordStatisticsTotalItems;
                }
            })
        },
        handleClick() {
            if (this.tabsName == 'first') {
                this.getUserInfo();
            }
            if (this.tabsName == 'second') {
            }
            if (this.tabsName == 'third') {
            }
        },
        onContentChange(val) {
            this.editorText = val
        },
        onContentChange2(val) {
            this.editorText2 = val
        },
        afterChange() {
        }
    },
    filters: {
        filterZhimaRiskListPo(value) {
            return value ? '是' : '否';
        },
        percentFilter(value) {
            if (!value) {
                return '0%'
            }
            return value * 100 + '%';
        },
        stateFilter(value) {
            if (value == 10) {
                return '待还款'
            } else if (value == 20) {
                return '还款成功'
            } else if (value == 30) {
                return '还款失败'
            } else if (value == 0) {
                return '还款处理中'
            } else {
                return value
            }
        },
        yesOrNo(value) {
            if (value == 0) {
                return 'no';
            } else if (value == 1) {
                return 'yes';
            }
            return value;
        },
        currentStatusFilter(value) {
            if (value === 0) {
                return "未结清";
            } else if (value === 1) {
                return '结清';
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

.app-container .filter-container .rightData {
    margin-right: 100px;
}
</style>

