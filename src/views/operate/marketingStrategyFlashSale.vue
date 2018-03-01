<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span>限时抢购ID:</span>
            <el-input v-model="listQuery.params.specialId" placeholder="限时抢购ID" style="width:200px;margin-right:10px;margin-bottom:10px;"></el-input>
            <span>限时抢购名称:</span>
            <el-input v-model="listQuery.params.specialName" placeholder="限时抢购名称" style="width:200px;margin-right:10px;margin-bottom:10px;"></el-input>
            <span>促销状态:</span>
            <el-select v-model="listQuery.params.timeSts" placeholder="请选择"  style="margin-right:10px;margin-bottom:10px;">
                <el-option v-for="item in timeStsArr" :key="item.value"  :label="item.label"  :value="item.value">
                </el-option>
            </el-select>
            <span> 特价时间:</span>
                <el-date-picker v-model="listQuery.params.effTimestr" type="date" placeholder="起始时间" :editable="false"  style="margin-right:10px;margin-bottom:10px;" >
                </el-date-picker>至
                <el-date-picker v-model="listQuery.params.expTimestr" type="date" placeholder="结束时间" :editable="false"  style="margin-left:10px;margin-right:10px;margin-bottom:10px;">
                </el-date-picker>
                <span>折扣率:</span>
            <el-input v-model="listQuery.params.minRate" placeholder="" style="width:200px;margin-right:10px;margin-bottom:10px;" placeholder="最小值"></el-input>
                至
            <el-input v-model="listQuery.params.maxRate" placeholder="" style="width:200px;margin-bottom:10px; margin-left:10px;" placeholder="最大值"></el-input>
            <span style="margin-right:10px;">%</span>
            <el-button class="filter-item"  type="primary" v-waves icon="search" @click="getList">搜索</el-button>
            <el-button class="filter-item"  @click="reset"   v-waves  icon="setting">重置</el-button>
        </div>
        <div>
            
                <el-button type="primary" icon="plus" size="small" @click="add()">新增</el-button>
           
        </div>
        <div class="filter-container">
            <el-table :data="dataList" v-loading="listLoading" border fit highlight-current-row  stripe style="width: 100%" :default-sort="{prop: listQuery.params.order,order:listQuery.params.dir === 'desc' ? 'descending' : 'ascending'}"   @sort-change="sort">
                <el-table-column align="center" label="序号" width="100">
                    <template scope="scope">
                        <span>{{(listQuery.params.page-1)*listQuery.params.size+parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center"  prop="priceId" label="操作">
                    <template scope="scope">
                        <el-button @click="edit(scope.row.specialId)" type="text" size="small">
                            编辑
                        </el-button>

                        <el-button  v-show="scope.row.onOffLine!=''" @click="onOffLine(scope.row.specialId,(scope.row.onOffLine=='下线'?-10:10))" type="text" size="small">
                            {{scope.row.onOffLine}}
                        </el-button>
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="specialId" label="抢购策略ID" width="160" sortable="custom">
                </el-table-column>

                <el-table-column align="center" prop="specialName" label="抢购名称">
                </el-table-column>

                <el-table-column align="center" prop="configDomainNames"  label="上架渠道">
                </el-table-column>

                <el-table-column align="center" prop="discountRate" label="折扣率（%）" width="160">
                </el-table-column>

                <el-table-column align="center" prop="productCount" label="关联产品数量" width="180">
                </el-table-column>

                <el-table-column align="center" prop="effTimestr" label="开始时间" sortable="custom">
                </el-table-column>

                <el-table-column align="center" prop="expTimestr" label="结束时间" sortable="custom">
                </el-table-column>

                <el-table-column align="center" prop="domainStatus" label="促销状态"  width="160">
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
    import * as util from '@src/utils/util';
    import * as  static_data from '@utils/static_data.js';

    export default {
        data() {
            return {
                listLoading: true,
                timeStsArr:[{value:'',label:'全部'}].concat(static_data.timestsArr),
                domainIdArr:[],
                listQuery: { params: { url: '/operate/findSpecialList', page: 1, size: 10, specialId: '',
                    specialName:'',timeSts:'2',effTimestr:null,expTimestr:null,minRate:'',maxRate:'',specialType:30,   dir: 'desc',
                        order: 'specialId'} },
                total: 0,
                dataList:  []
            }
        },
        created() {
            this.acqDomainIds();
            this.getList();
        },
        methods: {
            sort(column) {
                if(column.prop=='effTimestr'){
                    this.listQuery.params.order='effTime'
                }
                else if(column.prop=='expTimestr'){
                    this.listQuery.params.order='expTime'
                }else{
                     this.listQuery.params.order = column.prop
                }
                //this.listQuery.params.order = column.prop; //排序字段；
                this.listQuery.params.dir = column.order === 'descending' ? 'desc' : 'asc'; //升降序
                this.listQuery.params.page = 1;
                this.getList();
            },
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
            add(){
                this.$router.push({ path: '/operationManage/marketingStrategy/flashSale/add'})
            },
            //重置
            reset() {
                this.listQuery.params = { url: '/operate/findSpecialList', page: 1, size: 10, specialId: '',
                    specialName:'',timeSts:'2',effTimestr:null,expTimestr:null,minRate:'',maxRate:'',specialType:30} ;
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
                        this.total = response.data.totalCount;
                        this.listLoading = false;
                        this.dataList = response.data.specialRecords;

                        var date = new Date();
                        for(var i=0;i<this.dataList.length;i++){
                            var startArray =  this.dataList[i].effTimestr.split("-");
                            var endArray =  this.dataList[i].expTimestr.split("-");
                            var startDt = new Date(startArray[0], startArray[1]*1-1, startArray[2].substring(0,2));
                            var endDt = new Date(endArray[0], endArray[1]*1-1, endArray[2].substring(0,2));


                            if(this.dataList[i].domainStatus==-10 && date <= endDt){
                                this.dataList[i].onOffLine='上线';
                            }else if(this.dataList[i].domainStatus==10 && date <= endDt){
                                this.dataList[i].onOffLine='下线';
                            }else{
                                this.dataList[i].onOffLine='';
                            }

                            if(date<startDt && this.dataList[i].domainStatus != -10){
                                this.dataList[i].domainStatus = '未开始';
                            }else if(date > endDt || this.dataList[i].domainStatus == -10){
                                this.dataList[i].domainStatus = '已结束';
                            }else{
                                this.dataList[i].domainStatus = '进行中';
                            }

                            this.dataList[i].configDomainNames = '';
                            this.dataList[i].domainId = this.dataList[i].domainId.split(',');
                            if(this.dataList[i].domainId&&this.dataList[i].domainId.length>0){
                                for(var ii=0,iLen=this.dataList[i].domainId.length;ii<iLen;ii++){
                                    for(var j=0,jLen=this.domainIdArr.length
                                        ;this.dataList[i].domainId[ii]&&j<jLen;j++){
                                        if(this.dataList[i].domainId[ii]==this.domainIdArr[j].value){
                                            this.dataList[i].configDomainNames+=(this.domainIdArr[j].label+",")
                                        }
                                    }
                                }
                                this.dataList[i].configDomainNames = this.dataList[i]
                                    .configDomainNames.substring(0,this.dataList[i].configDomainNames.length-1)
                            }
                        }
                    }
                }).catch(err => {
                    this.listLoading = true;
                    this.dataList = null;
                })
            },
            edit(id){
                this.$router.push({ path: '/operationManage/marketingStrategy/flashSale/edit',query: { id: id } })
            },
            onOffLine(id,sts){
                if(sts!=10&&sts!=-10){
                    return;
                }
                let obj = {
                    url: 'operate/updateSpecialSts',
                    specialId: id,
                    sts:sts
                }
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                        if(sts==10){
                            this.$message.success('上线成功');
                        }else if(sts==-10){
                            this.$message.success('下线成功');
                        }
                        this.getList();
                    }else{
                        this.$message.success(response.respMsg);
                    }
                }).catch(err => {

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