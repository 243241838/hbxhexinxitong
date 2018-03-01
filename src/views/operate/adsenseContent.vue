<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span>广告类型:</span>
            <el-select v-model="listQuery.params.resourceType" placeholder="广告类型" style="margin-right:10px;margin-bottom:10px;">
                <el-option v-for="item in resourceTypeArr" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <span>展示平台:</span>
            <el-select v-model="listQuery.params.deviceType" placeholder="展示平台" style="margin-right:10px;margin-bottom:10px;">
                <el-option v-for="item in deviceTypeArr" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <span>展示时间:</span>
            <el-date-picker v-model="listQuery.params.effTimeStr" type="date" placeholder="起始时间" :editable="false" style="margin-right:10px;margin-bottom:10px;">
            </el-date-picker>至
            <el-date-picker v-model="listQuery.params.expTimeStr" type="date" placeholder="结束时间" :editable="false" style="margin-left:10px;margin-bottom:10px;margin-right:10px;">
            </el-date-picker>
            <el-button class="filter-item" type="primary" v-waves icon="search" @click="getList">搜索</el-button>
            <el-button class="filter-item"  @click="reset"  icon="setting">重置</el-button>
        </div>
        <div>
            <el-button type="primary" icon="plus" size="small" @click="addAdsenseContent()">新增</el-button>
         </div>
        <div style="width:1665px;overflow:hidden;margin-top:20px;" >
            <el-table :data="dataList" v-loading="listLoading" border fit highlight-current-row  stripe @current-change="handleCurrentChange" style="overflow-x: auto;
    overflow-y: hidden;" :default-sort="{prop: listQuery.params.order,order:listQuery.params.dir === 'desc' ? 'descending' : 'ascending'}"   @sort-change="sort">
                <el-table-column align="center" label="序号" width="100">
                    <template scope="scope">
                        <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="ID" width="120" prop="resourceId" sortable="custom">
                    <template scope="scope">
                        <a href="javascript:void(0);" @click="editAdsenseContent(scope.row.resourceId)" style="color:#3498da;cursor:pointer;">{{scope.row.resourceId}}</a>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="类型" width="100">
                    <template scope="scope">
                        <span v-for="item in resourceTypeArr" v-show="item.value == scope.row.resourceType ">
                                {{item.label}}
                        </span>
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="resourceLabel" label="终端" width="100">
                </el-table-column>

                <el-table-column align="center" prop="resourceValue" label="内容" width="400">
                    <template scope="scope">
                        <span :title="scope.row.resourceValue">{{scope.row.resourceValue.length>45?
                            (scope.row.resourceValue.substring(0,45)+'...'):scope.row.resourceValue}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="resourceUrl" label="链接地址" width="300">
                </el-table-column>

                <el-table-column align="center" prop="hostId" label="活动产品" width="140">
                </el-table-column>

                <el-table-column align="center" prop="sortCode" label="排序码" width="120">
                </el-table-column>

                <el-table-column align="center" label="状态" width="100">
                    <template scope="scope">
                        <span v-for="item in resourceStsArr" v-show="item.value == scope.row.sts ">
                                {{item.label}}
                        </span>
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="effTimeStr" label="开始时间" width="200" sortable="custom">
                </el-table-column>

                <el-table-column align="center" prop="expTimeStr" label="结束时间" width="200" sortable="custom">
                </el-table-column>

            </el-table>
        </div>
        <div v-show="total" class="pagination-container" style="padding:10px 0px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="listQuery.params.page"
                :page-sizes="[10,20,30, 50]" :page-size="listQuery.params.size" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import config from '@api/config';
    import * as static_data from '@utils/static_data.js';
    import * as util from '@src/utils/util';
    export default {
        data() {
            return {
                listLoading: true,
                resourceTypeArr: static_data.resourceTypeArr,
                deviceTypeArr: static_data.deviceTypeArr,
                listQuery: {
                    params: {
                        url: '/advert/findBannerList',
                        page: 1,
                        size: 10,
                        resourceType: null,
                        deviceType: null,
                        effTimeStr: null,
                        expTimeStr: null,
                        order: 'resourceId',
                        dir: 'desc'
                    }
                },
                total: 0,
                dataList: [],
                resourceStsArr: static_data.resourceStsArr
            }
        },
        created() {
            this.getList();
        },
        methods: {
              sort(column) {
               if(column.prop=='effTimeStr'){
                    this.listQuery.params.order='effTime'
                }else if(column.prop=='expTimeStr'){
                   this.listQuery.params.order='expTime'
                }else{
                    this.listQuery.params.order = column.prop
                }
                
                this.listQuery.params.dir = column.order === 'descending' ? 'desc' : 'asc'; //升降序
                this.listQuery.params.page = 1;
                this.getList();
            },
            /*时间选择器默认事件*/
            //重置
            reset() {
                this.listQuery.params = {
                    url: '/advert/findBannerList',
                    page: 1,
                    size: 10,
                    resourceType: '',
                    deviceType: '',
                    effTimeStr: null,
                    expTimeStr: null,
                    order: 'resourceId',
                    dir: 'desc'
                };
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
            addAdsenseContent() {
                this.$router.push({
                    path: '/operationManage/adsense/content/add'
                })
            },
            editAdsenseContent(id) {
                this.$router.push({
                    path: '/operationManage/adsense/content/edit',
                    query: {
                        id: id
                    }
                })
            },
            /*搜索列表信息*/
            getList() {
                this.listQuery.params.effTimeStr = util.changeDate(this.listQuery.params.effTimeStr);
                this.listQuery.params.expTimeStr = util.changeDate(this.listQuery.params.expTimeStr);
                config(this.listQuery.params).then(response => {
                    if (response.respCode === '000000') {
                        this.total = response.data.total;
                        this.listLoading = false;
                        this.dataList = response.data.recordList;
                    }

                }).catch(err => {
                    this.listLoading = true;
                    this.dataList = null;
                })
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