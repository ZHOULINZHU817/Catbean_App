<template>
  <view class="content">
    <view class="navbar">
      <view
        v-for="(item, index) in navList"
        :key="index"
        class="nav-item"
        :class="{ current: tabCurrentIndex === index }"
        @click="tabClick(index)"
      >
        {{ item.text }}
      </view>
    </view>

    <swiper
      :current="tabCurrentIndex"
      class="swiper-box"
      duration="300"
      @change="changeTab"
    >
      <swiper-item
        class="tab-content"
        v-for="(tabItem, tabIndex) in navList"
        :key="tabIndex"
      >
        <scroll-view
          class="list-scroll-content"
          scroll-y
          @scrolltolower="loadData"
        >
          <!-- 空白页 -->
          <empty
            v-if="tabItem.loaded === true && tabItem.orderList.length === 0"
          ></empty>

          <!-- 订单列表 -->
          <view class="item-content">
            <view
              v-for="(item, index) in tabItem.orderList"
              :key="index"
              class="order-item"
            >
              <view class="i-top b-b">
                <text class="time"
                  ><text>订单编号：</text>{{ item.oderCode }}</text
                >
                <text class="state" :style="{ color: item.stateTipColor }">{{
                  item.stateTip
                }}</text>
                <!-- <text 
								v-if="item.state===9" 
								class="del-btn yticon icon-iconfontshanchu1"
								@click="deleteOrder(index)"
							></text> -->
              </view>
              <view class="goods-box-single">
                <image
                  class="goods-img"
                  :src="item.image"
                  mode="aspectFill"
                ></image>
                <view class="centre">
                  <text class="title">{{ item.title }}</text>
                </view>
                <view class="right">
                  <text class="price">{{ item.price }}</text>
                  <text class="attr-box">x {{ item.number }}</text>
                </view>
              </view>

              <view class="price-box">
                <view class="num">商品金额：</view>
                <view class="price">179<text>.5</text></view>
              </view>
			  <view v-if="item.expressNumber" class="price-box">
                <view class="num">快递单号：</view>
                <view>{{item.expressNumber}}</view>
              </view>
              <view class="action-box b-t" v-if="item.state == 1">
                <button class="action-btn" @click="cancelOrder(item)">
                  取消订单
                </button>
                <button class="action-btn recom">立即支付</button>
              </view>
			  <view class="action-box b-t" v-if="item.state == 2">
                <button class="action-btn" @click="cancelOrder(item)">
                  申请退款
                </button>
                <button class="action-btn recom">确认收货</button>
              </view>
			  <view class="action-box b-t" v-if="item.state == 3">
                <button class="action-btn" @click="deleteOrder(index)">
                  删除订单
                </button>
              </view>
            </view>
          </view>

          <uni-load-more :status="tabItem.loadingType"></uni-load-more>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template> 

<script>
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
import empty from "@/components/empty";
import Json from "@/Json";
export default {
  components: {
    uniLoadMore,
    empty,
  },
  data() {
    return {
      tabCurrentIndex: 0,
      orderListNew: [
        {
          state: 1,
          title: "古黛妃 短袖t恤女 春夏装2019新款韩版宽松",
          price: 179.5,
          image:
            "https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg",
          number: 1,
          oderCode: "123678900432144",
          expressNumber: null,
        },
        {
          state: 2,
          title: "古黛妃 短袖t恤女 春夏装2019新款韩版宽松",
          price: 179.5,
          image:
            "https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg",
          number: 1,
          oderCode: "123678900432144",
          expressNumber: "SF68329465396",
        },
        {
          state: 3,
          title: "古黛妃 短袖t恤女 春夏装2019新款韩版宽松",
          price: 179.5,
          image:
            "https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg",
          number: 1,
          oderCode: "123678900432144",
          expressNumber: "SF68329465396",
        },
      ],
      navList: [
        {
          state: 0,
          text: "全部",
          loadingType: "more",
          orderList: [],
        },
        {
          state: 1,
          text: "待付款",
          loadingType: "more",
          orderList: [],
        },
        {
          state: 2,
          text: "待收货",
          loadingType: "more",
          orderList: [],
        },
        {
          state: 3,
          text: "待评价",
          loadingType: "more",
          orderList: [],
        },
        // {
        // 	state: 4,
        // 	text: '售后',
        // 	loadingType: 'more',
        // 	orderList: []
        // }
      ],
    };
  },

  onLoad(options) {
    /**
     * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
     * 替换onLoad下代码即可
     */
    this.tabCurrentIndex = +options.state;
    // #ifndef MP
    this.loadData();
    // #endif
    // #ifdef MP
    if (options.state == 0) {
      this.loadData();
    }
    // #endif
  },

  methods: {
    //获取订单列表
    loadData(source) {
      //这里是将订单挂载到tab列表下
      let index = this.tabCurrentIndex;
      let navItem = this.navList[index];
      let state = navItem.state;

      if (source === "tabChange" && navItem.loaded === true) {
        //tab切换只有第一次需要加载数据
        return;
      }
      if (navItem.loadingType === "loading") {
        //防止重复加载
        return;
      }

      navItem.loadingType = "loading";

      setTimeout(() => {
        let orderList = this.orderListNew.filter((item) => {
          //添加不同状态下订单的表现形式
          item = Object.assign(item, this.orderStateExp(item.state));
          //演示数据所以自己进行状态筛选
          if (state === 0) {
            //0为全部订单
            return item;
          }
          return item.state === state;
        });
		navItem.orderList = [];
        orderList.forEach((item) => {
          navItem.orderList.push(item);
        });
        //loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
        this.$set(navItem, "loaded", true);

        //判断是否还有数据， 有改为 more， 没有改为noMore
        navItem.loadingType = "more";
      }, 600);
    },

    //swiper 切换
    changeTab(e) {
      this.tabCurrentIndex = e.target.current;
      this.loadData("tabChange");
    },
    //顶部tab点击
    tabClick(index) {
      this.tabCurrentIndex = index;
    },
    //删除订单
    deleteOrder(index) {
      uni.showLoading({
        title: "请稍后",
      });
      setTimeout(() => {
        this.navList[this.tabCurrentIndex].orderList.splice(index, 1);
        uni.hideLoading();
      }, 600);
    },
    //取消订单
    cancelOrder(item) {
      uni.showLoading({
        title: "请稍后",
      });
      setTimeout(() => {
        let { stateTip, stateTipColor } = this.orderStateExp(9);
        item = Object.assign(item, {
          state: 9,
          stateTip,
          stateTipColor,
        });

        //取消订单后删除待付款中该项
        let list = this.navList[1].orderList;
        let index = list.findIndex((val) => val.id === item.id);
        index !== -1 && list.splice(index, 1);

        uni.hideLoading();
      }, 600);
    },

    //订单状态文字和颜色
    orderStateExp(state) {
      let stateTip = "",
        stateTipColor = "#FF478C";
      switch (+state) {
        case 1:
          stateTip = "待支付";
          break;
        case 2:
          stateTip = "待发货";
          break;
        case 3:
          stateTip = "已完成";
          stateTipColor = "#666666";
          break;
      }
      return { stateTip, stateTipColor };
    },
  },
};
</script>

<style lang="scss">
page,
.content {
  background: $page-color-base;
  height: 100%;
}

.swiper-box {
  height: calc(100% - 40px);
}
.list-scroll-content {
  height: 100%;
}

.navbar {
  display: flex;
  height: 40px;
  padding: 0 5px;
  background: #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
  position: relative;
  z-index: 10;
  .nav-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 15px;
    color: $font-color-dark;
    position: relative;
    &.current {
      color: $base-color;
      &:after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 44px;
        height: 0;
        border-bottom: 2px solid $base-color;
      }
    }
  }
}

.uni-swiper-item {
  height: auto;
}
.item-content{
	padding: 24upx;
}
.order-item {
  display: flex;
  flex-direction: column;
  padding: 24upx;
  background: #fff;
  border-radius: 16upx;
  margin-bottom: 20upx;
  .i-top {
    display: flex;
    align-items: center;
    height: 80upx;
    position: relative;
    .time {
      flex: 1;
      color: #000000;
      font-size: 28upx;
      text {
        font-weight: 700;
      }
    }
    .state {
		font-size:28upx;
    }
    .del-btn {
      padding: 10upx 0 10upx 36upx;
      font-size: $font-lg;
      color: $font-color-light;
      position: relative;
      &:after {
        content: "";
        width: 0;
        height: 30upx;
        border-left: 1px solid $border-color-dark;
        position: absolute;
        left: 20upx;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  /* 单条商品 */
  .goods-box-single {
    display: flex;
    padding: 20upx 0;
    .goods-img {
      display: block;
      width: 180upx;
      height: 180upx;
	  border-radius: 12upx;
    }
    .centre {
      width: 50%;
	  margin-left: 20upx;
      .title {
        font-size: 28upx;
        color: #000000;
        line-height: 30upx;
      }
    }
    .right {
      width: 120upx;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      text-align: right;
      .attr-box {
        font-size: 22upx;
        color: #999999;
        // padding: 10upx 12upx;
      }
      .price {
        font-size: 26upx;
        color: #000000;
        // &:before {
        //   content: "￥";
        //   font-size: $font-sm;
        //   margin: 0 2upx 0 8upx;
        // }
      }
    }
  }

  .price-box {
    display: flex;
    align-items: baseline;
    padding: 20upx 0;
    font-size: 26upx;
    color: #666666;
    .num {
     flex:1;
	 font-weight: 700;
    }
    .price {
      font-size: 28upx;
      color: #000000;
	  font-weight: 700;
	  text{
		font-size: 24upx;
	  }
    //   &:before {
    //     content: "￥";
    //     font-size: $font-sm;
    //     margin: 0 2upx 0 8upx;
    //   }
    }
  }
  .action-box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100upx;
    position: relative;
    // padding-right: 30upx;
  }
  .action-btn {
    width: 148upx;
    height: 58upx;
    margin: 0;
    margin-left: 24upx;
    padding: 0;
    text-align: center;
    line-height: 60upx;
    font-size: 26upx;
    color: #333333;
    background: #fff;
    border-radius: 100px;
	border-color:#DBDBDB;
    &:after {
      border-radius: 100px;
    }
    &.recom {
      background-image: linear-gradient(90deg,rgba(255, 104, 166, 1) 0,rgba(255, 71, 140, 1) 100%);
      color: #ffffff;
      &:after {
        border:none;
      }
    }
  }
}

/* load-more */
.uni-load-more {
  display: flex;
  flex-direction: row;
  height: 80upx;
  align-items: center;
  justify-content: center;
}

.uni-load-more__text {
  font-size: 28upx;
  color: #999;
}

.uni-load-more__img {
  height: 24px;
  width: 24px;
  margin-right: 10px;
}

.uni-load-more__img > view {
  position: absolute;
}

.uni-load-more__img > view view {
  width: 6px;
  height: 2px;
  border-top-left-radius: 1px;
  border-bottom-left-radius: 1px;
  background: #999;
  position: absolute;
  opacity: 0.2;
  transform-origin: 50%;
  animation: load 1.56s ease infinite;
}

.uni-load-more__img > view view:nth-child(1) {
  transform: rotate(90deg);
  top: 2px;
  left: 9px;
}

.uni-load-more__img > view view:nth-child(2) {
  transform: rotate(180deg);
  top: 11px;
  right: 0;
}

.uni-load-more__img > view view:nth-child(3) {
  transform: rotate(270deg);
  bottom: 2px;
  left: 9px;
}

.uni-load-more__img > view view:nth-child(4) {
  top: 11px;
  left: 0;
}

.load1,
.load2,
.load3 {
  height: 24px;
  width: 24px;
}

.load2 {
  transform: rotate(30deg);
}

.load3 {
  transform: rotate(60deg);
}

.load1 view:nth-child(1) {
  animation-delay: 0s;
}

.load2 view:nth-child(1) {
  animation-delay: 0.13s;
}

.load3 view:nth-child(1) {
  animation-delay: 0.26s;
}

.load1 view:nth-child(2) {
  animation-delay: 0.39s;
}

.load2 view:nth-child(2) {
  animation-delay: 0.52s;
}

.load3 view:nth-child(2) {
  animation-delay: 0.65s;
}

.load1 view:nth-child(3) {
  animation-delay: 0.78s;
}

.load2 view:nth-child(3) {
  animation-delay: 0.91s;
}

.load3 view:nth-child(3) {
  animation-delay: 1.04s;
}

.load1 view:nth-child(4) {
  animation-delay: 1.17s;
}

.load2 view:nth-child(4) {
  animation-delay: 1.3s;
}

.load3 view:nth-child(4) {
  animation-delay: 1.43s;
}

@-webkit-keyframes load {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0.2;
  }
}
</style>
