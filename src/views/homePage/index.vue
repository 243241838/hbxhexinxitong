<template>
  <div class="app-container calendar-list-container">
    <div class="filterCon">
      <h2 class="title1">今日信息</h2>
    </div>
    <div class="filtercontainer">
      <div class="textLeft">
        <div class="todayPaymentAmount">{{dataList.todayPaymentAmount}}元</div>
        <div class="todayPayment">放款金额</div>
      </div>
      <div class="textRight">
        <div class="todayPaymentAmount">
          <div class="todayPaymentSuccessCnt">{{dataList.todayPaymentSuccessCnt}}笔</div>
          <div class="PaymentSuccessCnt">借款成功</div>
        </div>
        <div class="oldNEW">
          <div class="oldnewCON">新客户：{{dataList.todayPaymentSuccessNewCustomerCnt}}笔</div>
          <div class="oldnewCON">老客户：{{dataList.todayPaymentSuccessOldCustomerCnt}}笔</div>
        </div>
      </div>
    </div>
    <div class="filtercontainer2">
      <div class="dataBox">
        <div class="dataBox-top">{{dataList.todayRegistCnt}}人</div>
        <div class="dataBox-bottom">新增注册用户</div>
      </div>
      <div class="dataBox1">
        <div class="dataBox-left">
          <div class="leftTop">{{dataList. todayAuthenticationApplyCnt}}人</div>
          <div class="leftBottom">授信申请</div>
        </div>
        <div class="dataBox-right">
          <div>已拒绝：{{dataList.todayAuthenticationApplyRefusedCnt}}</div>
          <div>待审批：{{dataList.todayAuthenticationApplyAuditingCnt}}</div>
          <div>已审批：{{dataList.todayAuthenticationApplyApprovedCnt}}</div>
        </div>
      </div>
      <div class="dataBox">
        <div class="dataBox-top">{{dataList.todayLendOrderCnt}}笔</div>
        <div class="dataBox-bottom">订单生成</div>
      </div>
      <div class="dataBox">
        <div class="dataBox-top" v-if="dataList.todayTurnoverRateOfNewCustomers">{{dataList.todayTurnoverRateOfNewCustomers}}%</div>
        <div class="dataBox-top" v-else>0</div>
        <div class="dataBox-bottom">新客转化率</div>
      </div>
      <div class="dataBox">
        <div class="dataBox-top" v-if="dataList.todayCreditRating">{{dataList.todayCreditRating}}%</div>
        <div class="dataBox-top" v-else>0</div>
        <div class="dataBox-bottom">授信通过率</div>
      </div>
    </div>
    <div class="filter-container">
      <h2 class="title2">历史汇总</h2>
    </div>
    <div class="filter-container2">
      <div class="dataBox">
        <div class="dataBox-top">{{dataList.totalRepaymentLendOrderCnt}}笔</div>
        <div class="dataBox-bottom">当前在借笔数</div>
      </div>
      <div class="dataBox">
        <div class="dataBox-top">{{dataList.totalRepaymentLendOrderAmount}}元</div>
        <div class="dataBox-bottom">当前在借金额</div>
      </div>
      <div class="dataBox">
        <div class="dataBox-top">{{dataList.totalOverdueLendOrderCnt}}笔</div>
        <div class="dataBox-bottom">当前逾期笔数</div>
      </div>
      <div class="dataBox">
        <div class="dataBox-top">{{dataList.totalOverduePrincipalAmount}}元</div>
        <div class="dataBox-bottom">当前逾期本金</div>
      </div>
      <div class="dataBox">
        <div class="dataBox-top">{{dataList.totalPaymentAmount}}元</div>
        <div class="dataBox-bottom">总放款金额</div>
      </div>
      <div class="dataBox">
        <div class="dataBox-top">{{dataList.totalRefundAmount}}元</div>
        <div class="dataBox-bottom">总还款金额</div>
      </div>
    </div>
  </div>
</template>


<script>
import ajax from '@api/config';
export default {
  data() {
    return {
      dataList: [{
      }],
      params: {
        url: 'index'
      },
      timer: null
    }
  },
  created() {
    this.getDataList();
  },
  mounted () {
  },
  methods: {
    getDataList() {
      ajax(this.params).then(response => {
        this.dataList = response.data;
        if (!this.dataList.todayPaymentAmount) {
          this.dataList.todayPaymentAmount = 0;
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

.app-container .filterCon {
  margin-top: 20px;
  width: 100%;
  height: 30px;
}

.app-container .filtercontainer {
  margin-top: 20px;
  width: 100%;
  height: 150px;
}

.app-container .filtercontainer .textLeft {
  float: left;
  width: 50%;
  box-sizing: border-box;
  border-right: 1px solid #5197D5;
  height: 100%;
}

.app-container .filtercontainer .textLeft .todayPaymentAmount {
  text-align: center;
  font-weight: 800;
  font-size: 30px;
  margin-top: 30px;
}

.app-container .filtercontainer .textLeft .todayPayment {
  text-align: center;
}

.app-container .filtercontainer .textRight {
  float: right;
  width: 50%;
  box-sizing: border-box;
  height: 100%;
}

.app-container .filtercontainer .textRight .todayPaymentAmount {
  float: left;
  width: 60%;
  height: 100%;
}

.app-container .filtercontainer .textRight .oldNEW {
  float: right;
  width: 40%;
  height: 100%;
  margin-top: 30px;
}

.app-container .filtercontainer .textRight .todayPaymentAmount .todayPaymentSuccessCnt {
  text-align: center;
  font-weight: 800;
  font-size: 30px;
  margin-top: 30px;
}

.app-container .filtercontainer .textRight .todayPaymentAmount .PaymentSuccessCnt {
  text-align: center;
}

.app-container .filterCon .title1 {
  color: #fff;
  background: #5197D5;
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: #fff;
}

.app-container .filterCon .title2 {
  color: #fff;
  background: #5197D5;
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: #fff;
}

.app-container .filtercontainer2 {
  height: 80px;
  margin-top: 20px;
  width: 100%;
}

.app-container .filtercontainer2 .dataBox {
  height: 80px;
  background-color: #5197D5;
  float: left;
  margin-right: 50px;
  color: #fff;
}

.app-container .filtercontainer2 .dataBox .dataBox-top {
  text-align: center;
  padding: 10px;
  font-size: 18px;
  font-weight: 600;
}

.app-container .filtercontainer2 .dataBox .dataBox-bottom {
  text-align: center;
  padding: 0 10px 10px 10px;
}

.app-container .filtercontainer2 .dataBox1 {
  height: 80px;
  background-color: #5197D5;
  float: left;
  width: 300px;
  margin-right: 50px;
  color: #fff;
}

.app-container .filtercontainer2 .dataBox1 .dataBox-left {
  height: 100%;
  width: 50%;
  float: left;
  text-align: center;
}

.app-container .filtercontainer2 .dataBox1 .dataBox-left .leftTop {
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-top: 10px;
}

.app-container .filtercontainer2 .dataBox1 .dataBox-left .leftBottom {
  text-align: center;
  margin-top: 10px;
}

.app-container .filtercontainer2 .dataBox1 .dataBox-right {
  height: 100%;
  width: 50%;
  float: left;
}

.app-container .filter-container .title2{
  color: #fff;
  background: #5197D5;
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin-top: 50px;
}
.app-container .filter-container2{
  margin-top: 50px;
  width: 100%;
}
.app-container .filter-container2 .dataBox{
  height: 100px;
  background-color: #5197D5;
  float: left;
  margin-right: 50px;
  color: #fff;
}

.app-container .filter-container2 .dataBox .dataBox-top{
  text-align: center;
  padding: 10px;
  font-size: 18px;
  font-weight: 600;
}

.app-container .filter-container2 .dataBox .dataBox-bottom{
  text-align: center;
  padding: 0 10px 10px 10px;
}
</style>
