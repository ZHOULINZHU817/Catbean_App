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
          <view class="list-item-content">
                <view class="list-item" v-for="(item, index) in tabItem.orderList" :key="index">
                <view class="list-left">
                    <view class="list-item-title">{{item.title}}</view>
                    <view class="list-item-date">{{item.date}}</view>
                </view>
                <view class="list-right">
                    <view class="list-item-price">{{item.price}}</view>
                    <view :style="{color: statusDiv(item.status).stateTipColor}" class="list-item-status">{{statusDiv(item.status).statusName}}</view>
                    <view class="list-item-tips">{{item.content}}</view>
                </view>
            </view>
          </view>
          <!-- 空白页 -->
          <!-- <empty
            v-if="tabItem.loaded === true && tabItem.orderList.length === 0"
          ></empty> -->
          <empty
            v-if="tabItem.orderList.length === 0"
          ></empty>

          <uni-load-more :status="tabItem.loadingType"></uni-load-more>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template> 

<script>
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
import empty from "@/components/empty";
export default {
  components: {
    uniLoadMore,
    empty,
  },
  data() {
    return {
      tabCurrentIndex: 0,
      orderList:[
           {
              title: "平台购入",
              date: "2023-03-21 16:35:26",
              price: "+999",
              status: '1',
            },
            {
              title: "预约消耗",
              date: "2023-03-21 16:35:26",
              price: "-100",
              status: '2',
              content:"失败原因"
            },
            {
              title: "转赠给+19909876547",
              date: "2023-03-21 16:35:26",
              price: "-88",
              status: '3',
            },
            {
              title: "猫超订单",
              date: "2023-03-21 16:35:26",
              price: "-10",
              status: '1',
            },
            {
              title: "提现",
              date: "2023-03-21 16:35:26",
              price: "-99",
              status: '1',
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
          text: "审核中",
          loadingType: "more",
          orderList: [],
        },
        {
          state: 2,
          text: "已到账",
          loadingType: "more",
          orderList: [],
        },
        {
          state: 3,
          text: "审核失败",
          loadingType: "more",
          orderList: [],
        },
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
    this.loadData()
    // // #endif
    // // #ifdef MP
    if(options.state == 0){
    	this.loadData()
    }
    // #endif
  },

  methods: {
    //获取提现列表
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
        	let orderList = this.orderList.filter(item=>{
        		//演示数据所以自己进行状态筛选
        		if(state === 0){
        			//0为全部订单
        			return item;
        		}
        		return item.status == state
        	});
            
        	orderList.forEach(item=>{
        		navItem.orderList.push(item);
        	})
        	//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
        	this.$set(navItem, 'loaded', true);

        // 	//判断是否还有数据， 有改为 more， 没有改为noMore
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
    statusDiv(status){
        let statusName = '',
			stateTipColor = '';
        switch(status){
            case "1":
                statusName = "审核中";
                stateTipColor = '#FF8417';
                break;
            case "2":
                statusName = "已到账";
                break;
            case "3":
                statusName = "审核失败";
                stateTipColor = '#F71616';
                break;
        }
        return {statusName, stateTipColor}
    }
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
     padding: 24upx 24upx 0 24upx;
    .list-item-content{
        background: #fff;
        border-radius: 16upx;
        .list-item{
            display: flex;
            padding: 30upx 24upx;
            border-bottom: 1upx solid #f6f6f6;
            .list-left{
                flex:1;
                .list-item-title{
                    font-size:30upx;
                    color:#333333;
                    margin-bottom: 15upx;
                }
                .list-item-date{
                    font-size:24upx;
                    color:#999999;
                }
            }
            .list-right{
                text-align: right;
                .list-item-price{
                    font-size:32upx;
                    color:#333333;
                    font-weight: 700;
                    margin-bottom: 15upx;
                }
                .list-item-status{
                    font-size:24upx;
                    color:#999999;
                }
                .list-item-tips{
                    font-size:20upx;
                    color:#999999;
                }
            }
        }
    }
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
