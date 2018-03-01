<template>
    <div class="ggg_user">
            <div>
                <p class="head"><span v-text="time"></span><span v-text="output.productName"></span>在各分销渠道的销售金额明细如下：</p>
                <el-table :data="output.tradeCountRecordsAdminPoList" border>
                    <el-table-column align="center" label="序号" width="100px">
                            <template scope="scope">
                                <span>{{parseInt(scope.$index) + 1}}</span>
                            </template>
                    </el-table-column>
                    <el-table-column align="center" label="分销渠道">
                            <template scope="scope">
                                <span>{{scope.row.domainName}}</span>
                            </template>
                    </el-table-column>
                     <el-table-column align="center" label="销售量(单) " v-if="number == 2">
                            <template scope="scope">
                                <span>{{scope.row.insureCount}}</span>
                            </template>
                    </el-table-column>
                    <el-table-column align="center" label="销售金额（元）" v-if="number == 3">
                            <template scope="scope">
                                <span>{{scope.row.payAmount | formatMoney}}</span>
                            </template>
                    </el-table-column>
                </el-table>
            </div>
            <div style="padding: 20px; text-align:center;">
                <el-button v-waves  @click="go_back()" >返回</el-button>
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
            output: '', //总数据
            time: '', //时间
            number: '',
           tableDate: []
        }
    },
    computed: {
    },
    created() {
        this.number = this.$route.query.number;
        console.log(this.number)
        this.getData(); //获取详情
    },
    mounted() {
    },
    methods: {
         //获取详情
        getData () {
            let date = this.$route.query.date;
            if (!this.$route.query.date) {
                 date = ''
            } else {
                date = JSON.parse(this.$route.query.date);
            } 
            this.time = date.tradeDate;
            console.log(date)
            let obj = {
                  url: 'trademanager/channelTradeCountDetail',
                  productId: date.productId,
                  beginDate: date.tradeDate,
                  endDate: date.tradeDate
            }
            // console.log(obj)
            config(obj).then(response => {
                if (response.respCode === '000000') {
                   let output = response.data;
                   if (!output) {
                       return false;
                   }
                   this.output = output;
                   console.log(response.data)
                } else {
                    this.message('warning', response.respMsg)
                }
            }).catch(err => {
                console.log(err);
            })
        },
        go_back () {
            this.$router.go(-1)
        },
        //请求提示
        message (sts, text) {
            this.$message({
                message: text,
                type: sts
            });
        }
    },
    filters: {
        //金钱
        formatMoney (val) {
             if (!val) {
                return '0.00';
            } else {
                return (val/100).toFixed(2);
            }
        },
        //时间过滤
        timeFilter (val) {
           if (!val) {
               return '';
           } else {
               var date = new Date(val);
               let Y = date.getFullYear() + '-';
               let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
               let D = date.getDate() + ' ';
               let h = date.getHours() + ':';
               let m = (date.getMinutes()< 10 ? '0' + date.getMinutes() : date.getMinutes())+ ':';
               let s = date.getSeconds();
               return Y + M + D + h + m + s;
           }
        },
        //转换时间为天-小时-分-秒
        formatDuring (mss) {
            if (!mss) {
                return '';
            } else {
                var days = parseInt(mss / (1000 * 60 * 60 * 24));
                var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = (mss % (1000 * 60)) / 1000;
                return days + '天' + hours + '小时' + minutes + '分' + seconds + '秒' 
            }      
       }
    }
}
</script>
<style lang="less" scoped>
.head{
    color: #768399;
    font-weight:400px;
    font-size: 12px;
    line-height: 16px;
    margin-bottom:10px;
    margin-left:10px;
}
.head span:nth-child(2){
    color:red;
    margin-left:6px;
}
</style>