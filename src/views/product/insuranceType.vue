<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span>关键字:</span>
            <el-input v-model="listQuery.params.codeName" placeholder="保障利益标题/保障内容" style="width:200px;margin-right: 50px;"></el-input>
            <el-button class="filter-item" style="margin-left: 50px;" type="primary" v-waves icon="search" @click="getApplyList">搜索</el-button>
             <el-button class="filter-item" style="margin-left: 50px;" @click="reset" type="primary" icon="reset">重置</el-button>
        </div>
        <!-- <div class="filter-container">
            <el-table :data="dataList" v-loading="listLoading" border fit highlight-current-row style="width: 100%" @current-change="handleCurrentChange">
                <el-table-column align="center" label="序号" width="100">
                    <template scope="scope">
                        <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="一级ID">
                    <template scope="scope">
                        {{scope.row.codeId}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="一级分类名称">
                    <template scope="scope">
                        {{scope.row.codeName}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="二级ID">
                    <template scope="scope">
                        {{scope.row.codeId1}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="二级分类名称">
                    <template scope="scope">
                        <span>{{scope.row.codeName1}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="三级ID">
                    <template scope="scope">
                        <span>{{scope.row.codeId2}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="三级分类名称">
                    <template scope="scope">
                        <span>{{scope.row.codeName2}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="职业类别">
                    <template scope="scope">
                        <span>{{scope.row.codesValue2}}</span>
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
        </el-dialog> -->
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
            listQuery: { params: { url: 'product/param/findJobList', page: 1, size: 10, codeName: '', codesValue: '' } },
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
    },
    mounted() {

    },
    methods: {
        //重置codeName: '', codesValue: ''
        reset() {
            this.listQuery.params.codeName = "";
            this.listQuery.params.codesValue = "";
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
                    this.dataList = response.data.occupationCodeList;
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