<template>
    <div>
        <div class="www-page">
            <div style="padding-bottom:20px;">
                产品ID：
                <el-input v-model="query.productId" :maxlength=30 style="width:200px;margin-bottom:10px;margin-right:10px;" placeholder="产品ID"></el-input>
                保险名称：
                <el-input v-model="query.productName" :maxlength=30 style="width:200px;margin-bottom:10px;margin-right:10px;" placeholder="保险名称"></el-input>
                承保公司:
                <el-select v-model="query.insurerId" placeholder="全部">
                    <el-option v-for="item in insurersList" :key="item.insurerId" :label="item.insurerName" :value="item.insurerId" placeholder="全部">
                    </el-option>
                </el-select>
                产品状态：
                <el-select v-model="query.sts" placeholder="全部">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button v-waves @click="reset" icon="setting">重置</el-button>
                <el-button type="primary" v-waves icon="search" @click="search">查询</el-button>
                <div style="margin-top:10px;">
                    截止<span style="margin-left:4px;">{{start}}</span> 累计车险产品总数为：
                    <span style="color: rgb(255, 0, 0);">{{data.total}}个</span>
                </div>
                 <el-button class="dash-add-btn" icon="plus"  @click="go()">新增</el-button>
            </div>
            <div>
                <el-table :data="data.productsPoList" v-loading="listLoading" fit border highlight-current-row stripe style="width: 100%"
                    :default-sort="{prop:query.order,order:query.dir === 'desc' ? 'descending' : 'ascending'}" @sort-change="sort">
                    <el-table-column label="序号" width="100" align="center">
                        <template scope="scope">
                            <span>{{(query.page-1)*query.size + parseInt(scope.$index) + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="快速操作" align="center" width="140">
                        <template scope="scope">
                            <span style="color:rgb(32, 160, 255);cursor:pointer;">[复制]</span>
                            <span style="color:rgb(32, 160, 255);cursor:pointer;" @click="editor(scope.row.productId)">[编辑]</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="productId" label="产品ID" align="center" width="140"></el-table-column>
                    <el-table-column label="保险名称" width="260" align="center" prop="productName">
                        <template scope="scope">
                            <span style="color:rgb(32, 160, 255);cursor:pointer;" @click="goDetail(scope.row.productId)">{{scope.row.productName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="承保公司" width="260" align="center" prop="insurerName"> </el-table-column>
                    <el-table-column prop="className" label="保险类别" align="center"></el-table-column>
                    <el-table-column prop="totalQuantity" label="总销量" align="center" sortable="custom"></el-table-column>
                    <el-table-column prop="planCounts" label="套餐数量" width="200" align="center">
                        <template scope="scope">
                            <span v-if="scope.row.planCounts==-1">不限</span>
                            <span v-else>{{scope.row.planCounts}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="产品状态 " width="200" align="center" prop="productSts">
                        <template scope="scope">
                            <span v-if="scope.row.productSts==10">有效</span>
                            <span v-if="scope.row.productSts==-10">禁用</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div v-if="data.total" class="pagination-container" style="padding:10px 0;">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="query.page"
                        :page-sizes="[10,20,30,50]" :page-size="query.size" layout="total, sizes, prev, pager, next, jumper"
                        :total="data.total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import config from '@api/config';
    import {
        trim
    } from '@src/utils/util';
    export default {
        data() {
            return {
                listLoading: false,
                start:'',
                insurersList: [{
                    insurerId: '',
                    insurerName: '全部'
                }],
                options: [{
                    value: '',
                    label: '全部'
                }, {
                    value: 10,
                    label: '有效'
                }, {
                    value: -10,
                    label: '禁用'
                }],
                query: {
                    url: 'product/carInstall/findProductPage',
                    page: 1,
                    size: 10,
                    productId: '',
                    productName: '',
                    insurerId: '',
                    sts: '',
                    order: 'totalQuantity',
                    dir: 'desc',
                },
                data: {
                    productsPoList: [],
                    total: 0
                },
                params: {
                    url: 'insurer/findAll',
                    insurerType: 21,
                   }
            }
        },
        computed: {},
        created() {
            this.search();
            this.getList();
            this.start=this.format(new Date());
        },
        mounted() {},
        methods: {
            go(){
                this.$router.push({
                    path: "/product/caraddDetail",
                    
                });
            },
            sort(column) {
                this.query.order = column.prop; //排序字段；
                this.query.dir = column.order === 'descending' ? 'desc' : 'asc'; //升降序
                this.search(1);
            },
            getList() {
                config(this.params).then(response => {
                    if (response.respCode === '000000') {
                        for (let i = 0; i < response.data.insurersList.length; i++) {
                            let obj = {
                                insurerId: response.data.insurersList[i].insurerId,
                                insurerName: response.data.insurersList[i].insurerName
                            }

                            this.insurersList.push(obj)
                        }

                    }
                })
            },
            editor(productId) {
                this.$router.push({
                    path: "/product/carproductinformation",
                    query: {
                        productId:productId
                    }
                });
            },
            goDetail(productId) {
                this.$router.push({
                    path: "/product/carInsurancedetails",
                    query: {
                        productId: productId
                    }
                });
            },
            format(time) {
                let Stime = new Date(time);
                let year = Stime.getFullYear();
                let month = Stime.getMonth() + 1;
                let date = Stime.getDate();
                let result = year + '-' + (month >= 10 ? month : '0' + month) + '-' + (date >= 10 ? date : '0' + date);
                return result
            },
            changeQuery(cur) {
                if (cur && typeof cur === 'number') {
                    this.query.page = cur;
                }
            },
            //获取列表
            search(cur) {
                this.changeQuery(cur);
                this.listLoading = true;
                config(this.query).then(response => {
                    this.listLoading = false;
                    if (response.respCode === '000000') {
                        this.data = response.data;
                    }
                })
            },
            // 重置搜索框
            reset() {
                this.query.productId = "";
                this.query.productName = "";
                this.query.insurerId = "";
                this.query.sts = "";
            },
            // 改变每一页的条数
            handleSizeChange(val) {
                this.query.size = val;
                this.search();
            },
            // 切换页码
            handleCurrentPageChange(val) {
                this.search(val);
            },

        },
        filters: {
            classification: function (val) {
                if (val == 10) {
                    return '理赔中'
                } else if (val == -20) {
                    return '理赔失败'
                } else if (val == 30) {
                    return '已理赔待打款'
                } else if (val == 40) {
                    return '已理赔已打款'
                }
            },
            time: function (val) {
                let datatime = new Date(val);
                let year = datatime.getFullYear();
                let month = datatime.getMonth();
                let date = datatime.getDate();
                let hour = datatime.getHours();
                let minute = datatime.getMinutes();
                let second = datatime.getSeconds();
                let result = year + '-' + ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) + '-' + (date >= 10 ?
                        date : '0' + date) + ' ' + (hour >= 10 ? hour : '0' + hour) + ':' +
                    (minute >= 10 ? minute : '0' + minute) + ":" + (second >= 10 ? second : '0' + second);
                return result
            }
        }
    }
</script>
<style lang="less" scoped>
    .dash-add-btn {
        display: inline-block;
        margin-top: 10px ;
        padding: 5px 30px 5px 44px;
        color: #768399;
        font-weight: bold;
        font-size: 14px;
        border: 1px dashed #d9dcdd;
        border-radius: 3px;
    }
</style>