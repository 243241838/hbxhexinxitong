<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span>活动规则ID/名称:</span>
            <el-input v-model="listQuery.params.promotionName" placeholder="活动规则ID/名称" style="width:200px;margin-right:10px;margin-bottom:10px;"></el-input>
            <span>活动类型:</span>
            <el-select v-model="listQuery.params.promotionType" placeholder="请选择" style="margin-right:10px;margin-bottom:10px;">
                <el-option v-for="item in promotionTypeArr" :key="item.value"  :label="item.label"  :value="item.value">
                </el-option>
            </el-select>

            <span>活动渠道:</span>
            <el-select v-model="listQuery.params.promotionChannels" placeholder="请选择" style="margin-right:10px;margin-bottom:10px;">
                <el-option v-for="item in domainIdArr" :key="item.value"  :label="item.label"  :value="item.value">
                </el-option>
            </el-select>
            <span>活动适用用户:</span>
            <el-select v-model="listQuery.params.userType" placeholder="请选择" style="margin-right:10px;margin-bottom:10px;">
                <el-option v-for="item in couponUserTypeArr" :key="item.value"  :label="item.label"  :value="item.value">
                </el-option>
            </el-select>
            <span>活动状态:</span>
            <el-select v-model="listQuery.params.domainStatus" placeholder="请选择" style="margin-right:10px;margin-bottom:10px;">
                <el-option v-for="item in timestsArr" :key="item.value"  :label="item.label"  :value="item.value">
                </el-option>
            </el-select>
            <span>专题时间:</span>
            <el-date-picker v-model="listQuery.params.effTimestr" type="date" placeholder="起始时间" :editable="false" style="margin-right:10px;margin-bottom:10px;">
            </el-date-picker>至
            <el-date-picker v-model="listQuery.params.expTimestr" type="date" placeholder="结束时间" :editable="false" style="margin-left:10px;margin-bottom:10px;">
            </el-date-picker>
           <el-button class="filter-item"  type="primary" v-waves icon="search" @click="getList">搜索</el-button>
            <el-button class="filter-item"  @click="reset"  icon="setting">重置</el-button>
        </div>
        <div>
            <div style="padding-top:10px;">
                <el-button type="primary" icon="plus" size="small" @click="add()">新增</el-button>
            </div>
        </div>
        <div class="filter-container">
            <el-table :data="dataList" v-loading="listLoading" border fit highlight-current-row stripe style="width: 100%" >
                <el-table-column align="center" label="序号" width="100">
                    <template scope="scope">
                        <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="操作" width="100">
                    <template scope="scope">
                        <el-button @click="edit(scope.row.promotionId)" type="text" size="small">
                            编辑
                        </el-button>
                        <el-button  v-show="scope.row.sts==1" @click="offLine(scope.row.promotionId)" type="text" size="small">
                             下线
                        </el-button>
                    </template>
                </el-table-column>

                <el-table-column align="center"  prop="promotionId" label="活动规则ID" width="160">
                </el-table-column>

                <el-table-column align="center" prop="promotionName" label="活动名称">
                </el-table-column>

                <el-table-column align="center"  label="活动类型" width="160">
                    <template scope="scope">
                        <span v-for="item in promotionTypeArr"  v-show="item.value == scope.row.promotionType " >
                                {{item.label}}
                        </span>
                    </template>
                </el-table-column>

                <el-table-column align="center"  label="活动适用用户" width="160">
                    <template scope="scope">
                        <span v-for="item in couponUserTypeArr"  v-show="item.value == scope.row.userType " >
                                {{item.label}}
                        </span>
                    </template>
                </el-table-column>

                <el-table-column align="center"    label="活动时间" >
                    <template scope="scope">
                                {{scope.row.effTimestr+'至'+scope.row.expTimestr}}
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="domainStatus" label="活动状态" width="160">
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
    import * as util from '@src/utils/util';
    import * as  static_data from '@utils/static_data.js';

    export default {
        data() {
            return {
                listLoading: true,
                promotionTypeArr:[{value:'',label:'全部'}].concat(static_data.promotionTypeArr),
                domainIdArr:[{value:'',label:'全部'}],
                couponUserTypeArr:[{value:'',label:'不限'}].concat(static_data.couponUserTypeArr),
                timestsArr:[{value:'',label:'全部'}].concat(static_data.timestsArr),
                listQuery: { params: { url: '/coupons/findactivitylist', page: 1, size: 10, promotionName: '',
                    promotionType:'',promotionChannels:'',userType:'',domainStatus:'',effTimestr:null,expTimestr:null
                        } },
                total: 0,
                dataList: []
            }
        },
        created() {
            this.acqDomainIds();
            this.getList();
        },
        methods: {
            acqDomainIds(){
                let obj = {
                    url: '/channel/menuList'
                }
                config(obj).then(response => {
                    if (response.respCode == '000000') {
                        for(var i=0;i<response.data.domainsPoList.length;i++) {
                            this.domainIdArr.push({
                                value:response.data.domainsPoList[i].domainId.toString(),
                                label:response.data.domainsPoList[i].domainName
                            });
                        }
                    } else {
                        this.$message.error(response.respMsg)
                    }

                }).catch(err => {

                })
            },
            //重置
            reset() {
                this.listQuery.params =  { url: '/coupons/findactivitylist', page: 1, size: 10, promotionName: '',
                    promotionType:'',promotionChannels:'',userType:'',domainStatus:'',effTimestr:null,expTimestr:null};
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
                this.listQuery.params.effTimestr = util.changeDate(this.listQuery.params.effTimestr);
                this.listQuery.params.expTimestr = util.changeDate(this.listQuery.params.expTimestr);

                config(this.listQuery.params).then(response => {
                    if (response.respCode === '000000') {
                        this.total = response.data.totalCount;
                        this.dataList = response.data.promotionsRecords;
                        var date = new Date();
                        for(var i=0;i<this.dataList.length;i++){
                            var startArray =  this.dataList[i].effTimestr.split("-");
                            var endArray =  this.dataList[i].expTimestr.split("-");
                            var startDt = new Date(startArray[0], startArray[1]*1-1, startArray[2].substring(0,2));
                            var endDt = new Date(endArray[0], endArray[1]*1-1, endArray[2].substring(0,2));

                            var str = '';
                            if(date<startDt && this.dataList[i].sts == 1){
                                str = '未开始';
                            }else if(date > endDt || this.dataList[i].sts == -1 || this.dataList[i].sts == 0){
                                str = '已结束';
                            }else{
                                str = '进行中';
                            }
                            this.dataList[i].domainStatus = str;
                        }

                        this.listLoading = false;
                    }
                }).catch(err => {
                    this.listLoading = true;
                    this.dataList = null;
                })
            },
            edit(id){
                this.$router.push({ path: '/operationManage/coupon/activity/edit',query: { id: id } })
            },
            add(){
                this.$router.push({ path: '/operationManage/coupon/activity/add'})
            },
            offLine(promotionId){
                let obj = {
                    url: 'coupons/offLinePromotion',
                    promotionId: promotionId
                }
                config(obj).then(response => {
                    if(response.respCode === '000000') {
                        this.$message.success(response.respMsg);
                        this.getList();
                    }else{
                        this.$message.success(response.respMsg);
                    }
                }).catch(err => {

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