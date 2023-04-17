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
          @scrolltolower="getLoadData"
        >
          <!-- 空白页 -->
          <empty v-if="orderListNew.length === 0"></empty>

          <!-- 订单列表 -->
          <view class="item-content">
            <view
              v-for="(item, index) in orderListNew"
              :key="index"
              class="order-item"
              @click="goOrderDetail(item)"
            >
              <view class="i-top b-b">
                <text class="time"
                  ><text>订单编号：</text>{{ item.id }}</text
                >
                <text class="state" :style="{ color: orderStateExp(item.state).stateTipColor }">{{
                  orderStateExp(item.state).stateTip
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
                  :src="item.product && item.product.images"
                  mode="aspectFill"
                ></image>
                <view class="centre">
                  <text class="title">{{ item.product && item.product.name }}</text>
                </view>
                <view class="right">
                  <text class="price">{{ toStringHandle(item.product && item.product.price)}}</text>
                  <text class="attr-box">x {{ item.productNum }}</text>
                </view>
              </view>

              <view class="price-box">
                <view class="num">商品金额：</view>
                <view class="price">{{toStringHandle(item.totalPrice)}}</view>
              </view>
              <view v-if="item.logisticsNum" class="price-box">
                <view class="num">快递单号：</view>
                <view>{{ item.logisticsNum }}</view>
              </view>
              <view class="action-box b-t" v-if="item.state == 'init'">
                <button class="action-btn" @click="cancelOrder(item)">
                  取消订单
                </button>
                <button class="action-btn" @click="deleteOrder(item)">
                  删除订单
                </button>
                <button class="action-btn recom" @click="payOrder(item)">立即支付</button>
              </view>
              <view class="action-box b-t" v-if="item.state == 'paid'">
                <button class="action-btn" @click="deleteOrder(item)">
                  删除订单
                </button>
              </view>
               <view class="action-box b-t" v-if="item.state == 'send' || item.state == 'finish'">
                <button class="action-btn" @click="cancelOrder(item)">
                  取消订单
                </button>
                <button class="action-btn" @click="deleteOrder(item)">
                  删除订单
                </button>
              </view>
              <view class="action-box b-t" v-if="item.state == 'cancel'">
                <button class="action-btn" @click="deleteOrder(item)">
                  删除订单
                </button>
              </view>
            </view>
          </view>
          <view v-if="showTotal" class="showTotal">没有更多数据了~</view>
          <!-- <uni-load-more :status="tabItem.loadingType"></uni-load-more> -->
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template> 

<script>
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
import empty from "@/components/empty";
import { formatDate } from "@/utils/prototype/date";
let statusList = ["init", "paid", "send", "finish", "cancel"];
import ApiClinet from "@/services/api-clinet";
import ApiConfig from "@/config/api.config";
import AppConfig from "@/config/app.config";
import { toStringHandle } from "@/utils/price.js";
export default {
  components: {
    uniLoadMore,
    empty,
  },
  data() {
    return {
      tabCurrentIndex: 0,
      orderListNew: [],
      navList: [
        {
          state: 0,
          text: "待付款",
          loadingType: "more",
          orderList: [],
        },
        {
          state: 1,
          text: "已支付",
          loadingType: "more",
          orderList: [],
        },
        {
          state: 2,
          text: "已发货",
          loadingType: "more",
          orderList: [],
        },
        {
          state: 3,
          text: "已完成",
          loadingType: "more",
          orderList: [],
        },
        {
          state: 4,
          text: "已取消",
          loadingType: "more",
          orderList: [],
        },
      ],
      form: {
        state: "", //audit, finish, reject
        page: 0,
        size: 10,
      },
      showTotal: false,
    };
  },

  onLoad(options) {
    /**
     * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
     * 替换onLoad下代码即可
     */
    this.tabCurrentIndex = +options.state;
    this.form.state = statusList[options.state];
    this.loadData();
  },

  methods: {
     formatDate,
     toStringHandle,
    //获取订单列表
    loadData(source) {
      ApiClinet.get(ApiConfig.APP_BASE_API.recordGoodList, this.form).then((res) => {
        if (res.data.code == '200') {
            this.orderListNew = this.orderListNew.concat(res.data.data.records || []);
            this.total = Math.ceil(res.data.data.total / this.form.size);
        }
      })
    },

    //swiper 切换
    changeTab(e) {
      this.tabCurrentIndex = e.target.current;
      this.orderListNew = [];
      this.form.page = 0;
      this.form.state = statusList[this.tabCurrentIndex];
      this.loadData();
    },
    //顶部tab点击
    tabClick(index) {
      this.tabCurrentIndex = index;
    },
    //删除订单
    deleteOrder(item) {
      ApiClinet.delete(`${AppConfig.ANDROID_URL}/api/app/record/product/${item.id}`).then((res) => {
        if (res.data.code == '200') {
            this.orderListNew = [];
            this.form.page = 0;
            this.loadData();
        }else{
          this.$api.msg(res.data.msg)
        }
      })
    },
    //取消订单
    cancelOrder(item) {
      ApiClinet.post(`${ApiConfig.APP_BASE_API.recordGoodCancel}?id=${item.id}`).then((res) => {
        if (res.data.code == '200') {
            this.orderListNew = [];
            this.form.page = 0;
            this.loadData();
        }else{
          this.$api.msg(res.data.msg)
        }
      })
    },
    /**支付订单* */
    payOrder(item) {
      ApiClinet.post(`${ApiConfig.APP_BASE_API.recordGoodPay}?id=${item.id}`).then((res) => {
        if (res.data.code == '200') {
            this.orderListNew = [];
            this.form.page = 0;
            this.loadData();
        }else{
          this.$api.msg(res.data.msg)
        }
      })
    },
    //订单状态文字和颜色
    orderStateExp(state) {
      //["init", "paid", "send", "finish", "cancel"];
      let stateTip = "",
        stateTipColor = "#FF478C";
      switch (state) {
        case 'init':
          stateTip = "待支付";
          break;
        case 'paid':
          stateTip = "已支付";
          break;
        case 'send':
          stateTip = "已发货";
          break;
        case 'finish':
          stateTip = "已完成";
          stateTipColor = "#666666";
          break;
        case 'cancel':
          stateTip = "已取消";
          stateTipColor = "#666666";
          break;
      }
      return { stateTip, stateTipColor };
    },
    goOrderDetail(item){
      // uni.navigateTo({
      //   url: `/pages/order/orderDetail?id=${item.id}`
      // })
    },
    getLoadData(){
      if (this.form.page >= this.total) {
        this.showTotal=true//已经滑到底的提醒
        return false;
      }
      this.form.page ++;
      this.loadData()
    }
  },
  onReachBottom() {
    
  }
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
.item-content {
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
      font-size: 28upx;
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
      flex: 1;
      font-weight: 700;
    }
    .price {
      font-size: 28upx;
      color: #000000;
      font-weight: 700;
      text {
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
    border-color: #dbdbdb;
    &:after {
      border-radius: 100px;
    }
    &.recom {
      background-image: linear-gradient(
        90deg,
        rgba(255, 104, 166, 1) 0,
        rgba(255, 71, 140, 1) 100%
      );
      color: #ffffff;
      &:after {
        border: none;
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
.showTotal{
  text-align: center;
  line-height: 60upx;
  font-size:28upx;
  color:#999999;
}
</style>
