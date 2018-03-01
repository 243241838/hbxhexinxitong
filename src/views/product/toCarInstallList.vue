<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span>产品ID:</span>
            <el-input v-model="listQuery.params.productId" placeholder="产品ID" style="width:200px;margin-right: 50px;"></el-input>
            <span>保险名称:</span>
            <el-input v-model="listQuery.params.productName" placeholder="保险名称" style="width:200px;margin-right: 50px;"></el-input>
            <span>承保公司:</span>
            <el-select clearable style="width:150px" class="filter-item" v-model="listQuery.params.insurerId" placeholder="承保公司">
                <el-option v-for="item in codesValueStatus" :key="item.code" :label="item.text" :value="item.code">
                </el-option>
            </el-select>
            <span>产品状态:</span>
            <el-select clearable style="width:150px" class="filter-item" v-model="listQuery.params.sts1" placeholder="产品状态">
                <el-option v-for="item in codesValueStatus" :key="item.code" :label="item.text" :value="item.code">
                </el-option>
            </el-select>
        </div>
        <div class="filter-container">
            <el-button class="filter-item" style="margin-left: 50px;" type="primary" v-waves icon="plus" @click="getApplyList">新增</el-button>
            <el-button class="filter-item" style="margin-left: 50px;" type="primary" v-waves icon="search" @click="getApplyList">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 50px;" @click="reset" v-waves type="primary" icon="reset">重置</el-button>
        </div>
        <div class="filter-container">
            <el-table :data="dataList" v-loading="listLoading" border fit highlight-current-row style="width: 100%" @current-change="handleCurrentChange">
                <el-table-column align="center" label="序号" width="100">
                    <template scope="scope">
                        <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="快速操作">
                    <template scope="scope">
                    </template>
                </el-table-column>
                <el-table-column align="center" label="产品ID">
                    <template scope="scope">
                        {{scope.row.productId}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="保险名称">
                    <template scope="scope">
                        <span>{{scope.row.productName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="承保公司">
                    <template scope="scope">
                        <span>{{scope.row.insurerName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="保险类别">
                    <template scope="scope">
                        <span>{{scope.row.className}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="总销量">
                    <template scope="scope">
                        <span>{{scope.row.totalQuantity}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="套餐数量">
                    <template scope="scope">
                        <span>{{scope.row.planCounts}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="产品状态">
                    <template scope="scope">
                        <span>{{scope.row.sts1}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="total" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="listQuery.params.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.params.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import config from '@api/config';
import { downloadExecl } from '@api/excel.js';
import { parseTime } from '@filters/index.js';
import { trim } from '@src/utils/util';

export default {
    data() {
        return {
            listLoading: true,
            pickTimeStart: '',
            pickTimeEnd: '',
            listQuery: { params: { url: 'product/car/findProductPage', page: 1, size: 10, codeName: '', codesValue: '' } },
            current: 1, // 默认显示第一页
            total: 0,
            dataList: [],
            codesValueStatus: [{ code: 1, text: '1'}, { code: 2, text: '2'}, { code: 3, text: '3'}, { code: 4, text: '4'},{ code: 5, text: '5'}, { code: 6, text: '6'},{ code: 7, text: '特别费率'}],
            dialogVisible: false
        }
    },
    computed: {
    },
    created() {
        this.getApplyList();
        this.getList();
    },
    mounted() {

    },
    methods: {
        //重置codeName: '', codesValue: ''
        reset() {
            this.listQuery.params.codeName = "";
            this.listQuery.params.codesValue = "";
        },
        //承保公司下拉菜单
        getList() {
            let obj = {
                url: 'channelProduct/findUpDomainProduct'
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    //this.domainStatus = response.data.domainsPoList;
                }else{

                }
            }).catch(err => {

            })
        },
        //表格默认时间
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        handleSizeChange(val) {
            this.listQuery.params.size = val;
            this.getApplyList();
        },
        handleCurrentPageChange(val) {
            this.listQuery.params.page = val;
            this.getApplyList();
        },
        /*搜索列表信息*/
        getApplyList() {
            config(this.listQuery.params).then(response => {
                if (response.respCode === '000000') {
                    this.total = response.data.total;
                    this.listLoading = false;
                    this.dataList = response.data.productList;
                }

            }).catch(err => {
                this.listLoading = true;
                this.dataList = null;
            })
        },
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