<template>
  <view class="container">
    <view class="chain-num">
      <view>团队有效人数：{{chainEffectiveNum}}</view>
      <view>团队无效人数：{{chainInvalidNum}}</view>
    </view>
    <view class="item-content">
      <view class="friend-item" v-for="(item, index) in list" :key="index">
          <!-- <img src="/static/user/friend.jpg"/> -->
          <image class="user-icon-pic" src="/static/user/friend.jpg"></image>
          <view class="friend-text">
              <view class="friend-text-name">{{item.name}}</view>
              <view class="friend-text-phone">手机号：{{item.phone}}</view>
          </view>
          <view class="friend-text-status">
              <view class="tag1" v-if="item.isEffect">有效会员</view>
              <view class="tag2" v-else>无效会员</view>
          </view>
          <view class="team_num">{{item.teamCount}}</view>
      </view>
    </view>
    <!-- 空白页 -->
		<empty v-if="list.length === 0"></empty>
  </view>
</template>

<script>
import ApiClinet from "@/services/api-clinet";
import ApiConfig from "@/config/api.config";
import empty from "@/components/empty";
export default {
  components: {
    empty
  },
  data() {
    return {
      list: [
      ],
      chainEffectiveNum: null,
      chainInvalidNum: null,
    };
  },
  onLoad() {
    this.memberChildList();
  },
  methods: {
    memberChildList(){
      ApiClinet.get(ApiConfig.APP_BASE_API.memberChildList).then((res) => {
        if (res.data.code == '200') {
            this.chainEffectiveNum = res.data.data.chainEffectiveNum;
            this.chainInvalidNum = res.data.data.chainInvalidNum;
            this.list = res.data.data.childList || [];
        }
      })
    }
  },
};
</script>

<style lang='scss'>
page {
  background: #F6F6F6;
}
.container {
  position: relative;
  width: 100vw;
  height: 90vh;
  padding: 0 24upx 0 24upx;
  .chain-num{
    padding: 24upx 0;
    position: fixed;
    background: #F6F6F6;
    width:100%;
    z-index: 200;
    font-size:30upx;
    display: flex;
    view{
      flex:1;
    }
  }
  .item-content{
    padding-top:100upx;
  }
  .friend-item{
    height:146upx;
    width:100%;
    display: flex;
    background-color:#fff;
    border-radius:16upx;
    padding: 0 20upx;
    margin-bottom: 20upx;
    align-items: center;
    .user-icon-pic{
        width:80upx;
        height:80upx;
        border-radius: 80upx;
        margin-right:20upx;
    }
    .friend-text{
        // margin-right:10upx;
        .friend-text-name{
            font-size:30upx;
            color:#333333;
        }
        .friend-text-phone{
            font-size: 24upx;
            color:#666666;
        }
    }
    .friend-text-status{
        height:50%;
        font-size:20upx;
        .tag1{
            background-color: rgba(255, 104, 166, 1);
            border-radius: 0px 8px 0px 8px;
            padding: 4upx 8upx;
            color:#fff;
        }
        .tag2{
            background-color: rgba(230, 230, 230, 1);
            border-radius: 0px 8px 0px 8px;
            padding: 4upx 8upx;
            color:#999999;
        }
    }
    .team_num{
      text-align: right;
      flex:1;
    }
  }
}

</style>
