<template>
    <div class="Bigbox">
        <div class='leftNav'>
            <ul class='listBox'>
                <li :key="index" v-for="(item,index) in listInfo" class='list'>
                    <div v-on:click='statusFlag(item,listInfo)' :class="{activeDiv:item.status}">
                        <!--<img :src="item.img" :alt="item.name" :title="item.name">-->
                        <span>{{item.name}}</span>
                        <img :src="item.status?arrowTop:arrow" :alt="item.name" :title="item.name">
                    </div>
                    <ul class="listBoxTwo" v-if="item.status">
                        <li :key="indexs" v-for="(items,indexs) in item.list" class='listTwo'>
                            <router-link :to="(items.hash)">
                                <span>{{items.nameTwo}}</span>
                            </router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <mainCon class="rightCon">
            <topNav></topNav>
            <router-view></router-view>
        </mainCon>
    </div>
</template>
<script>
    import mainCon from "./main.vue";
    import topNav from '@src/topNav';
    export default {
        components: {
            mainCon,
            topNav
        },
        data() {
            return {
                item: require('@res/img/item.png'),
                arrow: require('@res/img/arrow.png'),
                arrowTop: require('@res/img/arrow2.png'),
                listInfo: [{
                        img: require('@res/img/item.png'),
                        name: '营销策略管理',
                        hash: '/operationManage/marketingStrategy/priceFix',
                        status: false,
                        list: [{
                                hash: '/operationManage/marketingStrategy/priceFix',
                                nameTwo: '定价管理'
                            },
                            {
                                hash: '/operationManage/marketingStrategy/specialSubject',
                                nameTwo: '专题管理'
                            },
                            {
                                hash: '/operationManage/marketingStrategy/flashSale',
                                nameTwo: '限时抢购管理'
                            },
                            {
                                hash: '/operationManage/marketingStrategy/commissionStrategy',
                                nameTwo: '佣金策略管理'
                            }
                        ]
                    },
                    {
                        img: require('@res/img/item.png'),
                        name: '广告位管理',
                        hash: '/operationManage/adsense/position',
                        status: false,
                        list: [{
                                hash: '/operationManage/adsense/position',
                                nameTwo: '位置管理'
                            },
                            {
                                hash: '/operationManage/adsense/content',
                                nameTwo: '内容管理'
                            }
                        ]
                    },
                    {
                        img: require('@res/img/item.png'),
                        name: '运营参数管理',
                        hash: '/operationManage/parameters/recommendationCoefficient',
                        status: false,
                        list: [{
                                hash: '/operationManage/parameters/recommendationCoefficient',
                                nameTwo: '推荐系数'
                            },
                            {
                                hash: '/operationManage/parameters/productLabel',
                                nameTwo: '产品标签'
                            }
                        ]
                    },
                    {
                        img: require('@res/img/item.png'),
                        name: '优惠券管理',
                        hash: '/operationManage/coupon/management',
                        status: false,
                        list: [{
                                hash: '/operationManage/coupon/management',
                                nameTwo: '优惠券管理'
                            },
                            {
                                hash: '/operationManage/coupon/activity',
                                nameTwo: '优惠劵活动管理'
                            },
                            {
                                hash: '/operationManage/coupon/giftInsurance',
                                nameTwo: '赠险管理'
                            }
                        ]
                    },
                     {
                        img: require('@res/img/item.png'),
                        name: '车险分期管理',
                        hash: '/operationManage/car/Quotationlist',
                        status: false,
                        list: [{
                                hash: '/operationManage/car/Quotationlist',
                                nameTwo: '报价列表'
                            },
                            {
                                hash: '/operationManage/car/Staginglist',
                                nameTwo: '分期订单列表'
                            },
                            {
                                hash: '/operationManage/car/Fulllist',
                                nameTwo: '全款订单列表'
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            clickHandler() {
                alert(Date.now())
            },
            statusFlag: function (item, listInfo) {
                let status = !item.status;
                for (let list in listInfo) {
                    listInfo[list].status = false;
                }
                item.status = status;
            }
        }
    }
</script>