<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span>展示位ID:</span>
            <el-input v-model="listQuery.params.posId" placeholder="展示位ID" style="width:200px;margin-right:10px;margin-bottom:10px;"></el-input>
            <span>展示名称:</span>
            <el-input v-model="listQuery.params.posName" placeholder="展示名称" style="width:200px;margin-right:10px;margin-bottom:10px;"></el-input>
            <el-button class="filter-item" type="primary" v-waves icon="search" @click="getList">搜索</el-button>
            <el-button class="filter-item" @click="reset" v-waves   icon="setting">重置</el-button>
        </div>
       <div class="filter-container">
            <el-table :data="dataList" v-loading="listLoading" border fit highlight-current-row stripe style="width: 100%" @current-change="handleCurrentChange">
                <el-table-column align="center" label="序号" width="100">
                    <template scope="scope">
                        <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="posId" label="展示位ID">
                </el-table-column>

                <el-table-column align="center" prop="posName" label="展示位名称">
                </el-table-column>

                <el-table-column align="center" label="位置描述">
                    <template scope="scope">
                        <span v-for="item in posTypeArr"  v-show="item.value == scope.row.posType " >
                                {{item.label}}
                        </span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="展示位位置">
                    <template scope="scope">
                        <el-button @click="preview(scope.row.posId)" type="text" size="small">
                            预览
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="total" class="pagination-container" style="padding:10px 0px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="listQuery.params.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.params.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import config from '@api/config';
    import * as  static_data from '@utils/static_data.js';

    export default {
        data() {
            return {
                listLoading: true,
                listQuery: { params: { url: '/advert/findPositionList', page: 1, size: 10, posId: '',posName:'' } },
                total: 0,
                dataList:  [],
                posTypeArr:static_data.posTypeArr
            }
        },
        computed: {
        },
        created() {
            this.getList();
        },
        methods: {
            //重置
            reset() {
                this.listQuery.params ={ url: '/advert/findPositionList', page: 1, size: 10, posId: '',posName:'' }
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
                        this.dataList = response.data.positionsRecords;
                    }

                }).catch(err => {
                    this.listLoading = true;
                    this.dataList = null;
                })
            },
            preview(id){
                console.log(id);
            }
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