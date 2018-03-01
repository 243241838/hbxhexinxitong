<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <span>人保车险 已开通业务地区</span>
            <el-button class="filter-item" style="margin-left: 200px;" @click="Save" type="primary" icon="reset">保存</el-button>
            <el-button class="filter-item" style="margin-left: 50px;" @click="Cancel" type="primary" icon="reset">取消</el-button>
        </div>
        <div v-for="(item,index) in dataList " :key='index' style="margin-bottom: 10px;">
            <el-checkbox :label="item.areaName" v-model="item.selectedSts" @change="handleCheckAllChange(index)">{{item.areaName}}</el-checkbox>
            <img :src="item.trueSts===true?arrowTop:arrow" :alt="item.name" :title="item.name" @click="item.trueSts=!item.trueSts">
            <span v-if="item.selectedSts===true">
            <span style="margin-left:100px;">商业险一级分润:
                <el-input v-model="item.commisionValue1" placeholder="" style="width:50px;height:26px;"></el-input>%</span>
            <span style="margin-left:20px;">商业险二级分润:
                <el-input v-model="item.commisionValue2" placeholder="" style="width:50px;height:26px;"></el-input>%</span>
            <span style="margin-left:20px;">交强险一级分润:
                <el-input v-model="item.vehicleCommisionValue1" placeholder="" style="width:50px;height:26px;"></el-input>%</span>
            <span style="margin-left:20px;">交强险二级分润:
                <el-input v-model="item.vehicleCommisionValue2" placeholder="" style="width:50px;height:26px;"></el-input>%</span>
            </span>
            <!-- <el-checkbox-group v-model="item.children" @change="handleCheckedCitiesChange(index)" > -->
            <!-- <div v-if="item.selectedSts===true"> -->
            <div class="checkbox-group" v-for="(city,index) in item.children" :key="index" v-if="item.trueSts===true">
                <!-- :label="city.areaName"  :key="city.areaId"-->
                <!-- {{city.selectedSts}} -->
                <el-checkbox v-model="city.selectedSts" @change="city.selectedSts===true?item.selectedSts=true:''">{{city.areaName}}</el-checkbox>
                <span v-if="city.selectedSts===true">
                <span style="margin-left:100px;">商业险一级分润:
                    <el-input v-model="city.commisionValue1" placeholder="" style="width:50px;height:26px;"></el-input>%</span>
                <span style="margin-left:20px;">商业险二级分润:
                    <el-input v-model="city.commisionValue2" placeholder="" style="width:50px;height:26px;"></el-input>%</span>
                <span style="margin-left:20px;">交强险一级分润:
                    <el-input v-model="city.vehicleCommisionValue1" placeholder="" style="width:50px;height:26px;"></el-input>%</span>
                <span style="margin-left:20px;">交强险二级分润:
                    <el-input v-model="city.vehicleCommisionValue2" placeholder="" style="width:50px;height:26px;"></el-input>%</span>
                </span>
            </div>
            <!-- </div> -->
            <!-- </el-checkbox-group> -->

        </div>
    </div>
</template>
<script>
import '@res/css/wjq/style.less';
import config from '@api/config';
import { downloadExecl } from '@api/excel.js';
import { parseTime } from '@filters/index.js';
import { trim } from '@src/utils/util';

export default {
    data() {
        return {
            item: require('@res/img/item.png'),
            arrow: require('@res/img/arrow.png'),
            arrowTop: require('@res/img/arrow2.png'),
            listLoading: true,
            pickTimeStart: '',
            pickTimeEnd: '',
            listQuery: { params: { url: 'insurer/insurerarea', insurerId: this.$route.query.insurerId } },
            current: 1, // 默认显示第一页
            total: 0,
            dataList: [],
            codesValueStatus: [{ code: 1, text: '1' }, { code: 2, text: '2' }, { code: 3, text: '3' }, { code: 4, text: '4' }, { code: 5, text: '5' }, { code: 6, text: '6' }, { code: 7, text: '特别费率' }],
            dialogVisible: false,
            checkAll: false,
            isIndeterminate: true
        }
    },
    computed: {
    },
    created() {
        this.listQuery.params.insurerId = this.$route.query.insurerId;
        this.getApplyList();
    },
    mounted() {
        console.log(this.$route);
    },
    methods: {
        /*搜索列表信息*/
        getApplyList() {
            config(this.listQuery.params).then(response => {
                if (response.respCode === '000000') {
                    this.listLoading = false;
                    this.dataList = response.data.areaList;
                }

            }).catch(err => {
                this.listLoading = true;
                this.dataList = null;
            })
        },
        Save() {
            let insurerAreaList = [];
            let that = this;
            this.dataList.forEach((item,index)=>{
                if(item.selectedSts===true){
                    insurerAreaList.push({
                        areaId:item.areaId,
                        commisionValue1:item.commisionValue1,
                        commisionValue2:item.commisionValue2,
                        vehicleCommisionValue1:item.vehicleCommisionValue1,
                        vehicleCommisionValue2:item.vehicleCommisionValue2
                    })
                    
                }else{

                }
                item.children.forEach((list,index)=>{
                    if(list.selectedSts===true){
                    insurerAreaList.push({
                        areaId:list.areaId,
                        commisionValue1:list.commisionValue1,
                        commisionValue2:list.commisionValue2,
                        vehicleCommisionValue1:list.vehicleCommisionValue1,
                        vehicleCommisionValue2:list.vehicleCommisionValue2
                    })
                    
                }else{

                }
                })
            })
            let obj = {
                url: 'insurer/addInsurerArea',
                insurerId:this.$route.query.insurerId,
                insurerAreaList:insurerAreaList
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.$message({
                        message: response.respMsg,
                        type: 'success'
                    });
                    this.$router.push({ path: '/product/toInsurerCompany'})
                }else{
                    this.$message.error(response.respMsg);
                }
            }).catch(err => {

            })
        },
        Cancel() {
            this.$router.go(-1);
        },
        handleCheckAllChange(val) {
            console.log(val);
            // this.checkedCities = val ? this.dataList : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            console.log(value);
            // let checkedCount = value.length;
            // this.checkAll = checkedCount;
            // this.isIndeterminate = checkedCount > 0 && checkedCount < this.dataList.length;
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

.checkbox-group {
    padding-left: 50px;
    margin-bottom: 20px;
    margin-top: 10px;
}

img {
    margin-top: 19px;
    margin-right: 12px;
    width: 13px;
    height: 8px;
}
</style>