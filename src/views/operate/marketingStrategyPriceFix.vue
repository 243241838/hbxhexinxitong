<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span>定价策略ID:</span>
            <el-input v-model="listQuery.params.priceId" placeholder="" style="width:200px;margin-right:10px;margin-bottom:10px;"></el-input>
            <span>保险名称:</span>
            <el-input v-model="listQuery.params.productName" placeholder="" style="width:200px;margin-right:10px;margin-bottom:10px;"></el-input>
            <span>保费范围:</span>
                <el-select v-model="listQuery.params.premiumRange" placeholder="请选择" style="margin-right:10px;margin-bottom:10px;">
                    <el-option v-for="item in premiumArr" :key="item.value"  :label="item.label"  :value="item.value">
                    </el-option>
                </el-select>
            <span>折扣范围:</span>
            <el-input v-model="listQuery.params.discountStr" placeholder="" style="width:200px;margin-bottom:10px;"></el-input>
            至
            <el-input v-model="listQuery.params.discountEnd" placeholder="" style="width:200px;margin-bottom:10px;"></el-input>%

            <span>上架渠道:</span>
                <el-select v-model="listQuery.params.domainId" placeholder="请选择" style="margin-right:10px;margin-bottom:10px;">
                    <el-option v-for="item in domainArr" :key="item.value"  :label="item.label"  :value="item.value">
                    </el-option>
                </el-select>
            <span>促销状态:</span>
                <el-select v-model="listQuery.params.domainStatus" placeholder="请选择" style="margin-right:10px;margin-bottom:10px;">
                    <el-option v-for="item in domainStatusArr" :key="item.value"  :label="item.label"  :value="item.value">
                    </el-option>
                </el-select>
            <span>促销时间:</span>
            <el-date-picker v-model="listQuery.params.effTimestr" type="date" placeholder="起始时间" :editable="false" @change="dateChange" style="margin-right:10px;margin-bottom:10px;">
            </el-date-picker>至
            <el-date-picker v-model="listQuery.params.expTimestr" type="date" placeholder="结束时间" :editable="false" @change="dateChange" style="margin-left:10px;margin-bottom:10px;">
            </el-date-picker>
            <span>审核状态:</span>
            <el-select v-model="listQuery.params.exsts" placeholder="请选择">
                <el-option v-for="item in exstsArr" :key="item.value"  :label="item.label"  :value="item.value">
                </el-option>
            </el-select>
            <el-button class="filter-item"  type="primary" v-waves icon="search" @click="getList">搜索</el-button>
            <el-button class="filter-item" @click="reset" icon="setting">重置</el-button>
        </div>
        <div class="filter-container">
            <el-table :data="dataList" v-loading="listLoading" border fit highlight-current-row style="width: 100%" @current-change="handleCurrentChange">
                <el-table-column align="center" label="序号" width="100">
                    <template scope="scope">
                        <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center"  prop="priceId" label="定价策略ID">
                </el-table-column>

                <el-table-column align="center" prop="productName" label="保险名称">
                </el-table-column>

                <el-table-column align="center" prop="minPremium" label="保费金额(元)">
                </el-table-column>

                <el-table-column align="center" prop="domainName" label="上架渠道">
                </el-table-column>

                <el-table-column align="center" prop="discountRate" label="折扣比例(%)">
                </el-table-column>

                <el-table-column align="center" prop="auditSts" label="审核状态">
                </el-table-column>

                <el-table-column align="center" prop="effTime" label="开始时间">
                </el-table-column>

            </el-table>
        </div>
        <div v-show="total" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="listQuery.params.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.params.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import '@res/css/wjq/style.less';
import config from '@api/config';
import { parseTime } from '@filters/index.js';
import { trim } from '@src/utils/util';

export default {
    data() {
        return {
            listLoading: true,
            premiumArr:[{value:'',label:'全部'},{value:'0-1',label:'0-1元'},{value:'1-10',label:'1-10元'},{value:'10-50',label:'10-50元'},{value:'50-100元',label:'50-100元'},{value:'100-1000000元',label:'100元及以上'},{value:'-1',label:'自定义'}],
            domainArr:[{value:'',label:'全部'},{value:'10',label:'Android'},{value:'20',label:'IOS'},{value:'30',label:'WAP'},{value:'101',label:'链钱'},{value:'4442',label:'虫师'}],
            domainStatusArr:[{value:'',label:'全部'},{value:'1',label:'促销未开始'},{value:'2',label:'促销中'},{value:'3',label:'促销已结束'}],
            exstsArr:[{value:'',label:'全部'},{value:'1',label:'待审核'},{value:'2',label:'审核未通过'},{value:'3',label:'审核通过'}],
            listQuery: { params: { url: '/operate/findMarkPriceList.do', page: 1, size: 10, priceId: '',
                productName:'',premiumRange:'',discountStr:'',discountEnd:'',domainId:'',domainStatus:'',effTimestr:'',
                expTimestr:'',exsts:'',discountRatestr:'',minPremium:'',minPremium:''} },
            total: 0,
            dataList:  []
        }
    },
    computed: {
    },
    created() {
        this.getList();
    },
    mounted() {

    },
    methods: {
        /*时间选择器默认事件*/
        dateChange() {

        },
        //重置
        reset() {
            this.listQuery.params = { url: '/operate/findMarkPriceList.do', page: 1, size: 10, priceId: '',
                productName:'',premiumRange:'',discountStr:'',discountEnd:'',domainId:'',domainStatus:'',effTimestr:'',
                expTimestr:'',exsts:'',discountRatestr:'',minPremium:'',minPremium:''} ;
        },
        //表格默认时间
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        handleSizeChange(val) {
            this.listQuery.params.size = val;
            this.getList();
        },
        handleCurrentPageChange(val) {
            this.listQuery.params.page = val;
            this.getList();
        },
        /*搜索列表信息*/
        getList() {
            config(this.listQuery.params).then(response => {
                if (response.respCode === '000000') {
                    this.total = response.data.total;
                    this.listLoading = false;
                    this.dataList = response.data.userList;
                }

            }).catch(err => {
                this.listLoading = true;
                this.dataList = null;
            })
        }
    },
    filters: {
    }
}
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