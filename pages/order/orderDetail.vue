<template>
  <view class="order-detail">
    <!-- 订单组件 -->
    <view>
      <!-- <orderItem :orderObj="orderObj" :isOrderList="false" @callback="callback"></orderItem> -->
    </view>
    <view class="g-item">
        <image :src="orderObj.product && orderObj.product.images"></image>
        <view class="right">
          <text class="title clamp"
            >{{ orderObj.product && orderObj.product.name }}-{{ orderObj.product && orderObj.product.detail }}</text
          >
        </view>
        <view class="price-box">
          <view class="price">￥{{ toStringHandle(orderObj.product && orderObj.product.price) }}</view>
          <view class="number">x {{  orderObj.product && orderObj.product.productNum }}</view>
        </view>
    </view>
    <view class="order-status">
      <view class="flex margin-b-10">
        <view>订单编号：</view>
        <view class="flex1">{{ orderObj.id || "--" }}</view>
      </view>
      <view class="flex margin-b-10">
        <view>下单时间：</view>
        <view class="flex1" v-if="orderObj.createTime">{{
          formatDate(orderObj.createTime)
        }}</view>
      </view>
      <view class="flex margin-b-10">
        <view>支付时间：</view>
        <view class="flex1">{{
          orderObj.payTime && formatDate(orderObj.paidTime)
        }}</view>
      </view>
       <view class="flex">
        <view>支付方式：</view>
        <view class="flex1">猫豆</view>
      </view>
      <view class="flex">
        <view>配送方式：</view>
        <view class="flex1">快递</view>
      </view>
    </view>
    <view class="receiving flex" v-if="JSON.parse(orderObj.receiveAddress)">
      <view class="yticon icon-dizhi"></view>
      <view class="flex1 margin-l-10">
        <view class="margin-b-10"
          >{{ JSON.parse(orderObj.receiveAddress).receiver }} {{ JSON.parse(orderObj.receiveAddress).phone }}</view
        >
        <view class="address-color">{{ JSON.parse(orderObj.receiveAddress).address }}</view>
      </view>
    </view>
    <view class="order-price">
      <view class="flex margin-b-10">
        <view class="light-color">商品金额</view>
        <view class="flex1 text-right"
          >￥{{ toStringHandle(orderObj.totalPrice) }}</view
        >
      </view>
      <view class="flex">
        <view class="margin-auto">实付款：</view>
        <view class="goodspirce"
          >￥{{ toStringHandle(orderObj.totalPrice) }}</view
        >
      </view>
    </view>
  </view>
</template>

<script>
import ApiClinet from "@/services/api-clinet";
import ApiConfig from "@/config/api.config";
import AppConfig from "@/config/app.config";
import { toStringHandle } from "@/utils/price.js";
import { formatDate } from "@/utils/prototype/date.js";
export default {
  components: {
    // orderItem
  },
  data() {
    return {
      orderObj: {},
      formatDate: formatDate,
      toStringHandle: toStringHandle,
    };
  },
  onLoad(options) {
    this.id = options && options.id;
  },
  onShow() {
    this.getOrderDetail();
  },
  methods: {
    //获取订单详情
    getOrderDetail() {
      this.orderObj = {
        id: "1645807052649398272",
        payType: "cat_food",
        price: 1,
        productNum: 1,
        totalPrice: 1,
        logisticsNum: null,
        logisticsName: null,
        logisticsCode: null,
        receiveAddress:
          '{"address":"北京北京市大兴区北京北京市大兴区11123弄","area":"大兴区","city":"北京市","first":true,"id":1,"member":{"authStatus":"approved","avatar":"http://mc.hongfeigg.com/api/resource/image/banner/c700f7d709ce4fed9b9dbf8ac6e1b9f6.png","createTime":1681036049000,"id":5,"idNo":"411522199808127658","inviteCode":"U6PPNJ","isValid":false,"name":"周先生","nickName":"zhou","phone":"13673548656","pid":1,"pwd":"123456","qq":"1334963156@qq.com","status":"normal","uuid":"mcd0","wechatNo":"13787655678"},"phone":"13673548656","province":"北京","receiver":"zhou","updateTime":1681225658000}',
        state: "paid",
        refundReason: null,
        paidTime: 1681226485000,
        product: {
          id: 1,
          name: "商品名称",
          price: 1.22,
          stock: 1,
          images:
            "http://mc.hongfeigg.com/api/resource/image/banner/5e2ec1ae8ba549fbbd12272287ec04bf.png",
          spec: "红色",
          status: "online",
          sortIndex: 1,
          detail: "介绍",
        },
        member: {
          id: 5,
          phone: "13673548656",
          nickName: "zhou",
          avatar:
            "http://mc.hongfeigg.com/api/resource/image/banner/c700f7d709ce4fed9b9dbf8ac6e1b9f6.png",
          wechatNo: "13787655678",
          qq: "1334963156@qq.com",
          name: "周先生",
          idNo: "411522199808127658",
          bank: null,
          cardNo: null,
          alipayNo: null,
          wechatUrl: null,
          alipayUrl: null,
          inviteCode: "U6PPNJ",
          status: "normal",
          isValid: false,
          authStatus: "approved",
          vip: null,
          createTime: 1681036049000,
        },
        createTime: 1681225954000,
      };
      ApiClinet.get(
        `${AppConfig.ANDROID_URL}/api/app/record/product?id=${this.id}`
      ).then((res) => {
        if (res.data.code == "200") {
        }
      });
    },
  },
};
</script>

<style lang='scss'>
page {
  background: $page-color-base;
  padding-bottom: 160upx;
}
.order-detail {
  .order-logistics {
    height: 80upx;
    background-color: #fff;
    align-items: center;
    margin: 20upx 0;
    padding: 0 20upx;
    font-size: 24upx;
    .order-logistics-text {
      color: $font-color-light;
      margin-left: 10upx;
    }
  }
  .order-service {
    margin: 20upx 0;
    background-color: #fff;
    height: 80upx;
    align-items: center;
    justify-content: center;
    font-size: 26upx;
    color: $font-color-dark;
  }
  /***订单编号 */
  .order-status {
    padding: 30upx 20upx;
    color: $font-color-light;
    font-size: 26upx;
    background-color: #fff;
    line-height: 50upx;
  }
  /**收货 */
  .receiving {
    padding: 30upx 20upx;
    background-color: #fff;
    margin: 20upx 0 0 0;
    font-size: 26upx;
    align-items: center;
    .address-color {
      color: $font-color-light;
    }
  }
  /***商品金额 */
  .order-price {
    margin: 20upx 0 0 0;
    padding: 30upx 20upx;
    background-color: #fff;
    font-size: 26upx;
    .margin-auto {
      margin-left: auto;
    }
  }
}
.g-item {
  display: flex;
  // margin: 20upx 30upx;
  padding: 24upx;
  background: #fff;
  border-radius: 16upx;
  image {
    flex-shrink: 0;
    display: block;
    width: 180upx;
    height: 180upx;
    border-radius: 16upx;
  }

  .right {
    width: 50%;
    padding-left: 24upx;
    overflow: hidden;
  }

  .title {
    font-size: 28upx;
    color: #000000;
  }

  .price-box {
    font-size: 28upx;
    color: #333333;
    flex: 1;
    text-align: right;
    .price {
      margin-bottom: 4upx;
    }
    .number {
      font-size: 24upx;
      color: #999999;
    }
  }

  .step-box {
    position: relative;
  }
}
</style>
