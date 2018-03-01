<template>
    <div>
        <div class="www-page cooperation">
            <div style="padding-bottom:20px;">
                产品ID：
                <el-input v-model="query.productId" :maxlength=30 style="width:200px;margin-bottom:10px;margin-right:10px;" placeholder="产品ID"></el-input>
                保险名称：
                <el-input v-model="query.productName" :maxlength=30 style="width:200px;margin-bottom:10px;margin-right:10px;" placeholder="保险名称"></el-input>
                承保公司：
                <el-select v-model="query.insurerId" placeholder="全部">
                    <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                公司类型：
                <el-select v-model="query.insurerType" placeholder="全部">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                上下架时间:
                <el-date-picker v-model="createTime" type="date" placeholder="开始时间" style="width:200px;margin-bottom:10px;margin-right:2px;"
                    :editable="false">
                </el-date-picker>至
                <el-date-picker v-model="lastLoginTime" type="date" placeholder="结束时间" style="width:200px;margin-bottom:10px;margin-left:2px;"
                    :editable="false">
                </el-date-picker>
                <el-button type="primary" v-waves icon="search" @click="search" style="margin-left:0px;">查询</el-button>
                <el-button v-waves @click="reset" icon="setting">重置</el-button>
                <ul style="margin-top:10px;">
                    <li>渠道ID:<span style="margin:0 3px;">{{ domainPo.domainId}}</span>渠道名称：<span style="color: rgb(0, 0, 255);margin:0 3px;">{{domainPo.domainName}}
                    </span>合作时间:
                        <span style="margin:0 3px;">{{domainPo.effTime | format}}</span>至<span style="margin:0 3px;">{{domainPo.expTime | format}}</span>总计合作产品:
                        <span style="color: rgb(255, 0, 0);">{{totalItems}}个</span>
                        <button class="search-btn" @click="goproductioneditorDetail">新增合作产品</button>
                    </li>
                </ul>
            </div>
            <div>
                <el-table :data="data.domainProductsPoList" v-loading="listLoading" fit border highlight-current-row stripe style="width: 100%"
                    :default-sort="{prop:query.order,order:query.dir === 'desc' ? 'descending' : 'ascending'}" @sort-change="sort">
                    <el-table-column label="序号" width="100" align="center">
                        <template scope="scope">
                            <span>{{(query.page-1)*query.size + parseInt(scope.$index) + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="产品ID" align="center" width="140" prop="productId"> </el-table-column>
                    <el-table-column prop="productName" label="保险名称" align="center" width="260">
                        <template scope="scope">
                            <span style="color:#3498da;cursor:pointer;" @click="go(scope.row.classType,scope.row.productId)">{{scope.row.productName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="承保公司 " width="140" align="center" prop="insurerName"></el-table-column>
                    <el-table-column label="公司类型" width="140" align="center" prop="insurerType">
                        <template scope="scope">
                            <span>{{scope.row.insurerType | type}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="maxQuantity" label="总库存" width="140" align="center" sortable="custom"></el-table-column>
                    <el-table-column label="当前库存 " width="160" align="center" sortable="custom" prop="currentQuantity">
                        <template scope="scope">
                            <span>{{scope.row.maxQuantity-scope.row.totalQuantity}}</span>
                        </template>
                    </el-table-column>
                    </el-table-column>
                    <el-table-column prop="domainStatus" label="渠道产品状态 " width="160" align="center">
                        <template scope="scope">
                            <span style="color:#3498da;cursor:pointer;" v-if="scope.row.sts==10&&scope.row.domainStatus==1" @click=" goDetails(domainPo.domainId,scope.row.productId,query.order,query.dir)">还未生效</span>
                            <span style="color:#3498da;cursor:pointer;" v-else-if="scope.row.sts==10&&scope.row.domainStatus==2" @click="goDetails(domainPo.domainId,scope.row.productId,query.order,query.dir)">正常</span>
                            <span style="color:#3498da;cursor:pointer;" v-else-if="scope.row.sts==10&&scope.row.domainStatus==3" @click="goDetails(domainPo.domainId,scope.row.productId,query.order,query.dir)">已过有效期</span>
                            <span style="color:#3498da;cursor:pointer;" v-else @click="goDetails(domainPo.domainId,scope.row.productId,query.order,query.dir)">已下架</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="一级佣金 " width="140" align="center">
                        <template scope="scope">
                            <span v-if="scope.row.commisionValue1">{{scope.row.commisionValue1}}%</span>
                            <span v-else>无</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="二级佣金" width="140" align="center">
                        <template scope="scope">
                            <span v-if="scope.row.commisionValue2">{{scope.row.commisionValue2}}%</span>
                            <span v-else>无</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="domainSts" label="上架时间" width="200" align="center">
                        <template scope="scope">
                            <span>{{scope.row.effTime | time}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="下架时间 " width="200" align="center">
                        <template scope="scope">
                            <span>{{scope.row.expTime | time}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-if="data.totalItems" class="pagination-container" style="padding:10px 0;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="query.page"
                    :page-sizes="[10,20,30,50]" :page-size="query.size" layout="total, sizes, prev, pager, next, jumper" :total="data.totalItems">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import '@res/css/wjq/style.less';
    import '@res/css/cooperationDetails.less'
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
                option: [{
                        value: '',
                        label: '全部'
                    }],
                options: [{
                        value: '',
                        label: '全部'
                    }, {
                        value: 10,
                        label: '个险'
                    }, {
                        value: 20,
                        label: '车险'
                    },
                    {
                        value: 21,
                        label: '车险分期'
                    }
                ],
                query: {
                    url: 'channelProduct/findDomainProduct',
                    page: 1,
                    size: 10,
                    domainId: this.$route.query.domainId,
                    productId: '',
                    productName: '',
                    effTimestr: null,
                    expTimestr: null,
                    insurerType: '',
                    insurerId: '',
                    order: this.$route.query.order ? this.$route.query.order : 'maxQuantity',
                    dir: this.$route.query.dir ? this.$route.query.dir : 'desc' // desc ：降序；asc：升序
                },
                data: {
                    domainProductsPoList: [],
                    totalItems: 0
                },
                domainPo: '',
                totalItems: '',
                insurersPoList: [],
                params: {
                    url: 'channelProduct/domainProductView',
                    domainId: this.$route.query.domainId,
                }
            }
        },
        computed: {},
        created() {
            this.Insuredlist();
            this.search(1);
        },
        mounted() {},
        methods: {
            format(time) {
                let Stime = new Date(time);
                let year = Stime.getFullYear();
                let month = Stime.getMonth() + 1;
                let date = Stime.getDate();
                let result = year + '-' + (month >= 10 ? month : '0' + month) + '-' + (date >= 10 ? date : '0' + date);
                return result
            },
            sort(column) {
                console.log(column.prop)
                this.query.order = column.prop; //排序字段；
                this.query.dir = column.order === 'descending' ? 'desc' : 'asc'; //升降序
                this.search(1);
            },
            Insuredlist() {
                config(this.params).then(response => {
                    if (response.respCode === '000000') {
                        this.domainPo = response.data.domainPo;
                        this.totalItems = response.data.totalItems;
                        this.insurersPoList = response.data.insurersPoList;
                        
                        for (let i = 0; i < this.insurersPoList.length; i++) {
                            let obj = {
                                value: this.insurersPoList[i].insurerId,
                                label: this.insurersPoList[i].insurerName
                            }
                           this.option.push(obj);
                           }
                        
                    }
                })
            },
           go(type,productId) {
                if (type == 2) {
                    this.$router.push({
                        path: "/product/personInsuranceProDetail",
                        query: {
                            productId: productId
                        }
                    });
                } else if (type == 1) {
                    this.$router.push({
                        path: "/product/carFindListDetail?",
                        query: {
                            productId: productId
                        }
                    });
                }
            },
            goproductioneditorDetail() {
                this.$router.push({
                    path: "/channelmanager/productsDetails",
                    query: {
                        domainId: this.domainPo.domainId,
                        domainName: this.domainPo.domainName,
                        effTime: this.format(this.domainPo.effTime),
                        expTime: this.format(this.domainPo.expTime)
                    }
                });
            },
            goDetails(domainId, productId, order, dir) {
                this.$router.push({
                    path: "/channelmanager/managementdetails",
                    query: {
                        domainId: domainId,
                        productId: productId,
                        order: order,
                        dir: dir
                    }
                });
            },
            changeQuery(cur) {
                if (cur && typeof cur === 'number') {
                    this.query.page = cur;
                }
                if (this.createTime !== '') {
                    this.query.effTimestr = this.format(this.createTime);
                } else {
                    this.query.effTimestr = null
                }
                if (this.lastLoginTime !== '') {
                    this.query.expTimestr = this.format(this.lastLoginTime);
                } else {
                    this.query.expTimestr = null
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
                this.query.productId = '';
                this.query.productName = '';
                this.createTime = '';
                this.lastLoginTime = '';
                this.query.insurerType = '';
                this.query.insurerId = '';
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
            type: function (val) {
                if (val == 10) {
                    return '个险'
                } else if (val == 20) {
                    return '车险'
                } else if (val == 21) {
                    return '车险分期'
                } else {
                    return ''
                }
            },
            state: function (val) {
                if (val == 1) {
                    return '还未生效'
                } else if (val == 2) {
                    return '正常'
                } else if (val == 3) {
                    return '已过有效期'
                } else {
                    return '已下架'
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
                    date : '0' + date) + ' ' + (hour >= 10 ? hour : '0' + hour) + ':' + (minute >= 10 ? minute :
                    '0' + minute) + ':' + (second >= 10 ? second : '0' + second)
                return result
            },
            format: function (val) {
                let Stime = new Date(val);
                let year = Stime.getFullYear();
                let month = Stime.getMonth() + 1;
                let date = Stime.getDate();
                let result = year + '-' + (month >= 10 ? month : '0' + month) + '-' + (date >= 10 ? date : '0' +
                    date);
                return result
            }
        }
    }
</script>
<style lang="less" scoped>
    .search-btn {
        margin: 10px 0;
        display: inline-block;
        margin-right: 10px;
        padding: 0px 29px;
        height: 30px;
        line-height: 30px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: bold;
        border: 0;
        color: #768399;
        background-color: #f0f0f0;
        outline: none;
        cursor: pointer;
    }

    .search-btn:hover {
        background-color: #e2e2e3;
    }
</style>