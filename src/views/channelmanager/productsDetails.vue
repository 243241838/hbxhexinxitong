<template>
    <div>
        <div class="www-page">
            <div style="padding-bottom:20px;">
                产品ID：
                <el-input v-model="query.productId" :maxlength=30 style="width:200px;margin-bottom:10px;margin-right:10px;" placeholder="产品ID"></el-input>
                保险名称：
                <el-input v-model="query.productName" :maxlength=30 style="width:200px;margin-bottom:10px;margin-right:10px;" placeholder="保险名称"></el-input>
                保费范围：
                <el-select v-model="query.bettemoney" placeholder="全部" style="margin-bottom:10px;margin-right:10px;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-input v-model="query.minProducePrice" :maxlength=30 style="width:200px;margin-bottom:10px;margin-right:2px;" placeholder="保费范围最小值"
                    v-show="query.bettemoney==6"></el-input>
                <span v-show="query.bettemoney==6">至</span>
                <el-input v-model="query.maxProducePrice" :maxlength=30 style="width:200px;margin-bottom:10px;margin-left:2px;margin-right:10px;"
                    placeholder="保费范围最大值" v-show="query.bettemoney==6"></el-input>
                公司类型：
                <el-select v-model="query.insurerType" placeholder="全部" style="width:200px;margin-bottom:10px;margin-right:10px;">
                    <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                承保公司：
                <el-select v-model="query.insurerId" placeholder="全部" style="width:200px;margin-bottom:10px;margin-right:10px;">
                    <el-option v-for="item in option1" :key="item.insurerId" :label="item.insurerName" :value="item.insurerId">
                    </el-option>
                </el-select>
                保险类别：
                <el-select v-model="query.classId" placeholder="全部" style="width:200px;margin-bottom:10px;margin-right:10px;">
                    <el-option v-for="item in option2" :key="item.classId" :label="item.className" :value="item.classId">
                    </el-option>
                </el-select>
                上架状态：
                <el-select v-model="query.domainStatus" placeholder="全部" style="width:200px;margin-bottom:10px;margin-right:10px;">
                    <el-option v-for="item in option3" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" v-waves icon="search" @click="validationQuery">查询</el-button>
                <el-button v-waves @click="reset" icon="setting">重置</el-button>
                <ul>
                    <li v-for="(item,index) in domainList" style="margin-bottom:14px;" v-bind:key="index">渠道ID:<span style="margin:0 3px;">{{item.domainId}}</span>渠道名称：<span style="color: rgb(0, 0, 255);margin:0 3px;">{{item.domainName}}</span>合作时间:
                        <span style="margin:0 3px;">{{item.effTimestr}}</span>至<span style="margin:0 3px;">{{item.expTimestr}}</span></li>
                </ul>
            </div>
            <div>
                <el-table :data="data.productsPoList" v-loading="listLoading" fit border highlight-current-row stripe style="width: 100%"
                    @selection-change="handleSelectionChange" :default-sort="{prop:query.order,order:query.dir === 'desc' ? 'descending' : 'ascending'}"
                    @sort-change="sort">
                    <el-table-column type="selection" width="100" align="center"></el-table-column>
                    <el-table-column label="序号" width="100" align="center">
                        <template scope="scope">
                            <span>{{(query.page-1)*query.size + parseInt(scope.$index) + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="产品ID" align="center" width="160" prop="productId"></el-table-column>
                    <el-table-column prop="productName" label="保险名称" align="center" width="220"> </el-table-column>
                    <el-table-column label="承保公司" align="center" prop="insurerName"></el-table-column>
                    <el-table-column label="公司类型" align="center">
                        <template scope="scope">
                            <span>{{scope.row.insurerType| type}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="className" label="保险类别" align="center"></el-table-column>
                    <el-table-column prop="maxQuantity" label="总库存" align="center">
                        <template scope="scope">
                            <span>{{scope.row.maxQuantity | inventory}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="剩余库存" align="center" sortable="custom" prop="maxQuantity">
                        <template scope="scope">
                            <span v-if="scope.row.maxQuantity==-1">不限</span>
                            <span v-else>{{scope.row.shengyuQuantity}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="保费金额（元）" align="center" width="200" sortable="custom" prop="maxPremium">
                        <template scope="scope">
                            <span>{{(scope.row.minPremium/100).toFixed(2)}}</span>
                            <span v-if="scope.row.maxPremium!=scope.row.minPremium">-{{(scope.row.maxPremium/100).toFixed(2)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="上架状态" align="center">
                        <template scope="scope">
                            <span>{{scope.row.domainStatus |  state}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div v-if="data.totalItems" class="pagination-container" style="padding:10px 0;">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="query.page"
                        :page-sizes="[10,20,30,50]" :page-size="query.size" layout="total, sizes, prev, pager, next, jumper"
                        :total="data.totalItems">
                    </el-pagination>
                </div>
                <button class="search-btn" @click="choose">确定选择</button>
                <button class="search-btn" @click="goDetail">返回</button>
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
                createTime: '',
                lastLoginTime: '',
                options: [{
                        value: 0,
                        label: '全部'
                    }, {
                        value: 1,
                        label: '0-1元'
                    }, {
                        value: 2,
                        label: '1-10元'
                    }, {
                        value: 3,
                        label: '10-50元'
                    }, {
                        value: 4,
                        label: '50-100元'
                    }, {
                        value: 5,
                        label: '100元及以上'
                    },
                    {
                        value: 6,
                        label: '自定义'
                    }
                ],
                option: [{
                    value: '',
                    label: '全部'
                }, {
                    value: 10,
                    label: '个险'
                }, {
                    value: 20,
                    label: '车险'
                }, {
                    value: 21,
                    label: '车险分期'
                }],
                option3: [{
                    value: '',
                    label: '全部'
                }, {
                    value: 1,
                    label: '已下架'
                }, {
                    value: 2,
                    label: '未上架'
                }, {
                    value: 3,
                    label: '其他'
                }],
                option1: [{
                    insurerId: null,
                    insurerName: '全部'
                }],
                option2: [{
                    classId: null,
                    className: '全部'
                }],
                query: {
                    url: 'channelProduct/findOperateProduct',
                    domainIds: this.$route.query.domainIds||this.$route.query.domainId,
                    page: 1,
                    size: 10,
                    bettemoney: 0,
                    dir: 'desc',
                    order: 'maxPremium'
                    // productId: '',
                    // productName: '',
                    //bettemoney: 0,
                    // minProducePrice: '',
                    // maxProducePrice: '',
                    // insurerType: '',
                    // insurerId: '',
                    // classId: '',
                    // domainStatus: ''
                },
                data: {
                    productsPoList: [],
                    totalItems: 0
                },
                drop: {
                    url: 'channelProduct/findUpDomainProduct',
                    domainIds: this.$route.query.domainIds||this.$route.query.domainId
                },
                multipleSelection: [],
                domainList: []
            }
        },
        computed: {},
        created() {
            this.getList()
            this.search();
        },
        mounted() {},
        methods: {
             changeQuery(cur) {
                if (cur && typeof cur === 'number') {
                    this.query.page = cur;
             }},
            sort(column) {
                this.query.order = column.prop; //排序字段；
                this.query.dir = column.order === 'descending' ? 'desc' : 'asc'; //升降序
                this.search(1);
            },
            //请求下拉框数据
            getList() {
                config(this.drop).then(response => {
                    if (response.respCode === '000000') {
                        this.domainList = response.data.domainList;
                        for (let i = 0; i < this.domainList.length; i++) {

                        }
                        let arr = response.data.insurersPoList;
                        let arr1 = response.data.productClassesPoList;
                        if (arr.length > 0) {
                            for (let i = 0; i < arr.length; i++) {
                                let obj = {
                                    insurerId: arr[i].insurerId,
                                    insurerName: arr[i].insurerName
                                }
                                this.option1.push(obj);
                            }
                        }
                        if (arr1.length > 0) {
                            for (let i = 0; i < arr1.length; i++) {
                                let obj = {
                                    classId: arr1[i].classId,
                                    className: arr1[i].className
                                }
                                this.option2.push(obj);
                            }
                        }
                    }
                })
            },
            goproduct() {
                let domainIds = '';
                let productIds = '';
                console.log(this.multipleSelection)
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    productIds += this.multipleSelection[i].productId + ";";
                }
                for (let j = 0; j < this.domainList.length; j++) {
                    domainIds += this.domainList[j].domainId + ";";
                }
                domainIds = domainIds.substring(0, domainIds.length - 1);
                productIds = productIds.substring(0, productIds.length - 1);
                this.$router.push({
                    path: "/channelmanager/shelvesDetails",
                    query: {
                        domainIds: domainIds,
                        productIds: productIds
                    }
                });
            },
            goDetail(detailId) {
                this.$router.push({
                    path: "/channelmanager/channelinformanager",
                });
            },
            //保费范围验证
            validationQuery() {
                if (this.query.bettemoney == 6) {
                    let reg = /^\d+(\.\d+)?$/;
                    if (this.query.minProducePrice) {
                        if (!reg.test(this.query.minProducePrice)) {
                            this.$message({
                                message: '只能是大于等于零的数字',
                                type: 'warning'
                            })
                            return false
                        }
                    }
                    if (this.query.maxProducePrice) {
                        if (!reg.test(this.query.maxProducePrice)) {
                            this.$message({
                                message: '只能是大于等于零的数字',
                                type: 'warning'
                            })
                            return false
                        }
                    }
                    if (!(this.maxProducePrice > this.minProducePrice) && this.query.maxProducePrice && this.query.minProducePrice) {
                        this.$message({
                            message: '后面的数字要大于前面的数字',
                            type: 'warning'
                        })
                        return false
                    }
                }
                this.search()

            },
            //获取列表
            search(cur) {
                this.changeQuery(cur) 
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
                this.query.productId = '',
                    this.query.productName = '',
                    this.query.bettemoney = '',
                    this.query.minProducePrice = '',
                    this.query.maxProducePrice = '',
                    this.query.insurerType = '',
                    this.query.insurerId = '',
                    this.query.classId = '',
                    this.query.domainStatus = ''
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
            //复选框选择
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            choose() {
                if (this.multipleSelection.length == 0) {
                    this.$alert('请勾选需要上架的产品!', '提示', {
                        confirmButtonText: '确定',
                    });
                } else {
                    this.$confirm('确定要上架已选产品吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'info'
                    }).then(() => {
                        this.goproduct();
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消上架'
                        });
                    });
                }
            }
        },
        filters: {
            type: function (val) {
                if (val == "") {
                    return '全部'
                } else if (val == 10) {
                    return '个险'
                } else if (val == 20) {
                    return '车险'
                } else if (val == 21) {
                    return '车险分期'
                }
            },
            state: function (val) {
                if (val == 1) {
                    return '已下架'
                } else if (val == 2) {
                    return '未上架'
                } else {
                    return '其他'
                }
            },
            inventory: function (val) {
                if (val == -1) {
                    return '不限'
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .search-btn {
        display: inline-block;
        margin-right: 10px;
        margin-top: 10px;
        padding: 0px 29px;
        height: 30px;
        line-height: 30px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: bold;
        border: 0;
        color: #768399;
        background-color: #f0f0f0;
        cursor: pointer;
        outline: none;
    }
</style>