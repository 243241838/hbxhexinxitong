<template>
    <div>
        <div class="www-page">
            <div style="padding-bottom:20px;">
                赠险ID：
                <el-input v-model="query.couponId" :maxlength=30 style="width:200px;margin-bottom:10px;margin-right:10px;" placeholder="赠险ID"></el-input>
                赠险产品名称：
                <el-input v-model="query.couponName" :maxlength=30 style="width:200px;margin-bottom:10px;margin-right:10px;" placeholder="赠险产品名称"></el-input>
                赠险份数：
                <el-select v-model="query.quantity">
                    <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value" placeholder="全部">
                    </el-option>
                </el-select>
                <el-input v-model="start" :maxlength=30 style="width:200px;margin-bottom:10px;" v-show="query.quantity==4"></el-input>
                <span v-show="query.quantity==4">至</span>
                <el-input v-model="end" :maxlength=30 style="width:200px;margin-bottom:10px;margin-left:6px;margin-right:10px;" v-show="query.quantity==4"></el-input>
                赠险状态：
                <el-select v-model="query.timests">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                赠险时间：
                <el-date-picker v-model="createTime" type="date" placeholder="开始日期" style="width:200px;margin-bottom:10px;margin-right:2px;"
                    :editable="false">
                </el-date-picker>至
                <el-date-picker v-model="lastLoginTime" type="date" placeholder="结束日期" style="width:200px;margin-bottom:10px;margin-left:2px;"
                    :editable="false">
                </el-date-picker>
                <el-button type="primary" v-waves icon="search" @click="search" style="margin-bottom:10px;">查询</el-button>
                <el-button v-waves @click="reset" icon="setting" style="margin-bottom:10px;">重置</el-button>
                <div>
                    <el-button class="dash-add-btn" icon="plus" @click="add">新增赠险</el-button>
                </div>
            </div>
            <div>
                <el-table :data="data.couponsRecordList" v-loading="listLoading" fit border highlight-current-row stripe style="width: 100%">
                    <el-table-column label="序号" width="100" align="center">
                        <template scope="scope">
                            <span>{{(query.page-1)*query.size + parseInt(scope.$index) + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="160">
                        <template scope="scope">
                            <span style="color:#3498da;cursor:pointer;" @click="goDetail(scope.row.couponId)">编辑</span>
                            <span style="color:#3498da;cursor:pointer;" @click="remove(scope.row.couponId)">作废</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="couponId" label="赠险ID " align="center" width="120"></el-table-column>
                    <el-table-column label="赠险产品名称" align="center" prop="couponName"></el-table-column>
                    <el-table-column label="保险名称" align="center" prop="productName"></el-table-column>
                    <el-table-column label="赠险图片" width="140" align="center">
                        <template scope="scope">
                            <img :src="scope.row.productLogo" style="width:40px;height:40px;padding:5px 0px;"  v-if="scope.row.productLogo"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="赠险份数 " width="160" align="center" prop="maxQuantity"></el-table-column>
                    <el-table-column label="赠险开始时间 " align="center" prop="effTimestr"></el-table-column>
                    <el-table-column label="赠险结束时间 " align="center" prop="expTimestr"> </el-table-column>
                    <el-table-column label="赠险状态 " align="center" width="160">
                        <template scope="scope">
                            <span>{{scope.row | state}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div v-if="data.totalCount" class="pagination-container" style="padding:10px 0;">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="query.page"
                        :page-sizes="[10,20,30,50]" :page-size="query.size" layout="total, sizes, prev, pager, next, jumper"
                        :total="data.totalCount">
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
                createTime: '',
                lastLoginTime: '',
                start: '',
                end: '',
                option: [{
                        value: 0,
                        label: '全部'
                    }, {
                        value: 1,
                        label: '1000-4999'
                    }, {
                        value: 2,
                        label: '5000-9999'
                    },
                    {
                        value: 3,
                        label: '10000-19999'
                    },
                    {
                        value: 4,
                        label: '自定义'
                    }
                ],
                options: [{
                    value: null,
                    label: '全部'
                }, {
                    value: 1,
                    label: '未开始'
                }, {
                    value: 2,
                    label: '进行中'
                }, {
                    value: 3,
                    label: '已作废'
                }],
                query: {
                    url: 'coupons/findCouponsList',
                    page: 1,
                    size: 10,
                    couponClass: 3,
                    couponId: '',
                    couponName: '',
                    dir: 'desc',
                    order: 'couponId',
                    timests: 2,
                    effTimestr: null,
                    expTimestr: null,
                    quantity: 0,
                    minGiveQuantity: '',
                    maxGiveQuantity: ''
                },
                data: {
                    couponsRecordList: [],
                    totalCount: 0
                },
                multipleSelection: []
            }
        },
        computed: {},
        created() {
            this.search(1);
        },
        mounted() {},
        methods: {
            add() {
                this.$router.push({
                    path: "/operationManage/coupon/giftInsurance/add",
                });
            },
            goDetail(couponId) {
                this.$router.push({
                    path: "/operationManage/coupon/giftInsurance/edit",
                    query: {
                        couponId: couponId
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
                if (this.createTime !== '') {
                    this.query.effTimestr = this.format(this.createTime);
                } else {
                    this.query.effTimestr = null;
                }
                if (this.lastLoginTime !== '') {
                    this.query.expTimestr = this.format(this.lastLoginTime);
                } else {
                    this.query.expTimestr = null;
                }
                if (this.query.quantity == 1 || this.query.quantity == 2 || this.query.quantity == 3) {
                    let arr = this.option[this.query.quantity].label.split('-');
                    this.query.minGiveQuantity = arr[0];
                    this.query.maxGiveQuantity = arr[1];
                }
                if (this.query.quantity == 4) {
                    this.query.minGiveQuantity = this.start;
                    this.query.maxGiveQuantity = this.end;
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
                this.query.couponClass = 3;
                this.query.couponId = '';
                this.query.couponName = '';
                this.query.dir = 'desc';
                this.query.order = 'couponId';
                this.query.timests = 2;
                this.query.effTimestr = null;
                this.query.expTimestr = null;
                this.query.quantity = 0;
                this.query.minGiveQuantity = '';
                this.query.maxGiveQuantity = '';
                this.createTime = '';
                this.lastLoginTime = '';
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
            remove(couponId) {
                this.$confirm('确定要作废吗', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    config({
                        url: 'coupons/deleteProductCoupons',
                        couponId: couponId
                    }).then(response => {
                        if (response.respCode === '000000') {
                            this.$message({
                                type: 'success',
                                message: response.respMsg
                            });
                            this.search();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消作废'
                    });
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }

        },
        filters: {
            state: function (val) {
                let now = new Date().getTime();
                let start1 = val.effTimestr.replace(/-/g, '/');
                let start = new Date(start1).getTime();
                let end1 = val.expTimestr.replace(/-/g, '/');
                let end = new Date(end1).getTime();
                if (now < start && val.sts != -10) {
                    return '未开始'
                } else if (now > end || val.sts == -10) {
                    return '已作废'
                } else {
                    return '进行中'
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .dash-add-btn {
        position: relative;
        display: inline-block;
        padding: 5px 30px 5px 44px;
        color: #768399;
        font-weight: bold;
        font-size: 14px;
        border: 1px dashed #d9dcdd;
        border-radius: 3px;
    }
</style>