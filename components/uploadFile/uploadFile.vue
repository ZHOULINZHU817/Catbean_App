<template>
    <div class="upimgs">
        <div class="photo-uplaod">
            <div class="core">
                <div class="li" v-for="(item,index) in filelist" :key="index">
                    <div class="pic" v-if="isImage(item.path)">
                        <img class="img" :src="item.path" @click.stop="prviewImage(item,index)"  />
                        <div class="delete" @click="delImg(index)" v-if="!disabled">×</div>
                    </div>
					<div class="pic" v-else>
					    <text class="img iconfont" @click.stop="previewVideo(item.path)" v-if="fileType(item.path) == 'icon-shipin'" :class="fileType(item.path)"></text>
					    <text class="img iconfont" v-else :class="fileType(item.path)"></text>
					    <div class="delete" @click="delImg(index)" v-if="!disabled">×</div>
					</div>
                </div>
                <div class="li button_li" v-if="!disabled && (param.num == -1 || param.num > filelist.length)">
                    <div class="cover">
                        <img v-if="param.defaultposter" class="defaultposter" :src="param.defaultposter" mode="aspectFit" />
                        <div class="poster" v-else>
                            <img class="add" src="@/static/user/photo.jpg" />
                            <span>{{param.label}}</span>
                        </div>
                    </div>
                    <div class="upload-button" @click="chooseFile()"></div>
                    <div class="progress" v-if="progress != 0">上传中{{progress}}%</div>
                </div>
            </div>
        </div>
		<!-- <uni-popup ref="popup" type="bottom">
			<view class="media-type">
				<view class="item image" @click="chooseFileType('image')">
					<text class="iconfont icon-bg-picture"></text>
					<text>图片</text>
				</view>
				<view class="item video" @click="chooseFileType('video')">
					<text class="iconfont icon-shipin"></text>
					<text>视频</text>
				</view>
			</view>
		</uni-popup> -->
	</div>
</template>

<script>
	// import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import ApiClinet from "@/services/api-clinet";
	export default {
		name: 'UploadImage',
		data: function() {
			return {
				imagesType:['png','jpg','jpeg','gif'],
				filelist: [],
				progress: 0,
				param: {
					label: "点击添加图片",
					defaultposter: "",
					num: 1,
					size:2,
					video:{
						size:100
					},
					ext: ['pdf', 'doc', 'docx']
				},
				inited:false,
				mediaTypes:[
					"image","video"
				]
			}
		},
		components:{
			// uniPopup
		},
		model:{
			prop:"value",
			event:"change"
		},
		computed:{
			isImage(){
				return (item)=>{
					let index = item.lastIndexOf(".");
					let type = item.slice(index+1);
					return this.imagesType.includes(type)
				}
			},
			fileType(){
				return (item)=>{
					let className = 'icon-24gf-fileText';
					let index = item.lastIndexOf(".");
					let type = item.slice(index+1);
					if(type == 'mp4'){
						className = "icon-shipin"
					}
					return className;
				}
			}
		},
		props: {
			params: {
				type: Object,
				default: function() {
					return {
						
					}
				}
			},
			value:{
				type:[Array,String],
				default(){
					return []
				}
			},
			disabled:{
				type:Boolean,
				default:false
			},
			submitType:{
				type:String,
				default:"array"
			},
			mediaType:{
				type:String,
				default:"image"
			},
		},
		watch: {
			value:{
				handler(newVal){
					if(!this.inited && newVal){
						var list = newVal;
						if(typeof list == 'string'){
							list = JSON.parse(list);
						}
						var arr = list.map((item)=>{
							var json = {};
							if(typeof item == "string"){
								item = item.split("|");
							}
							json.filename =  item[0];
							json.path = item[1];
							return json;
						})
						this.filelist = arr;
						if(list.length>0){
							this.inited = true;
						}
					}
				},
				immediate:true
			},
			params:{
				handler(newValue) {
					this.param  = {
						...this.param,
						...newValue
					};
				},
				immediate:true
			}
		},
		methods: {
			chooseFile(){
				// if(this.mediaType && this.mediaTypes.includes(this.mediaType)){
				// 	this.chooseMedia({type:this.mediaType})
				// }else if(this.mediaType == 'all'){
				// 	this.$refs["popup"].open();
				// }
				this.chooseFileType('image')
			},
			chooseFileType(type){
				if(this.param[type] && this.param[type].size){
					this.param.size = this.param[type].size;
				}
				this.chooseMedia({type:type});
				// this.$refs["popup"].close();
			},
			chooseMedia: function({type}) {
				var that = this;
				if (this.param.num != 0) {
					if (this.filelist.length >= Math.abs(this.param.num)) {
						uni.showToast({
							title: '只能上传' + Math.abs(this.param.num) + "个",
							icon: "none"
						})
						return false;
					}
				}
				ApiClinet.fileUpLoad({
					type: type,
					size: this.param.size,
					progress: function(res) {
						that.progress = res;
					}
				}).then((res)=>{
					if (this.param.num != 1) {
						this.filelist.push({
							path:res.path,
							filename:res.filename
						});
					} else {
						this.filelist = [{
							path:res.path,
							filename:res.filename
						}];
					}
					this.onSuccess(this.filelist);
					this.progress = 0;
				}).catch(()=>{
					this.progress = 0;
				})
			},
			onSuccess(filelist){
				var result = [];
				filelist.map((item)=>{
					var json = [];
					json[0] = item.filename || "文件";
					json[1] = item.path;
					result.push(json.join("|"));
				})
				if(this.submitType == 'string'){
					if(result.length == 0){
						this.$emit("change","");
					}else{
						this.$emit("change",JSON.stringify(result));
					}
				}else{
					this.$emit("change",result);
				}
				this.inited = true;
			},
			delImg: function(index) {
				this.filelist.splice(index, 1);
				this.onSuccess(this.filelist);
			},
			clear:function(){
				this.filelist.splice(0);
				this.onSuccess(this.filelist);
			},
			//预览
			prviewImage(img, index) {
				let urls = []
				this.filelist.forEach(i => {
					urls.push(i.path)
				})
				uni.previewImage({
					urls: urls,
					current: index
				});
			},
			previewVideo(src){
				uni.navigateTo({
					url:"/pages/videoPlayer/index?src="+src
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.upimgs {
    overflow: visible;
    width: 100%;
    height: 100%;
}

.photo-uplaod {
    overflow: visible;
    width: 100%;
    height: 100%;
}

.photo-uplaod .core {
    overflow: visible;
    position: relative;
	margin-right:-20rpx;
}

.photo-uplaod .core:after {
    display: table;
    content: "";
    clear: both;
    font-size: 0;
}

.photo-uplaod .core .li {
    float: left;
    margin-bottom: 20rpx;
    height: 180upx;
    width: 180upx;
	box-sizing: border-box;
	/* padding-right:20rpx; */
    overflow: hidden;
    position: relative;
	border: 1upx dashed #979797;
}

.photo-uplaod .core .pic {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: visible;
    border-radius: 5px;
	overflow: hidden;
}

.photo-uplaod .delete {
    position: absolute;
    width: 34rpx;
    height: 34rpx;
    top: 0;
    right: 0;
    z-index: 4;
    background-color: rgba(0, 0, 0, 0.5);
    border-bottom-left-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
}

.photo-uplaod .delete .del {
    display: block;
    width: 100%;
    height: 100%;
}

.photo-uplaod .core .pic .img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.photo-uplaod .core .pic .iconfont{
	font-size:30px;
	display:flex;
	align-items: center;
	justify-content: center;
	background-color: #f5f5f5;
}

.photo-uplaod .core .upload-button {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 2;
}

.photo-uplaod .core .upload-button input[type="file"] {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    left: 0;
    top: 0;
}

.photo-uplaod .core .cover {
    position: relative;
    width: 100%;
    height: 100%;
    /* background-color: #f5f5f5; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.photo-uplaod .core .cover .poster {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.photo-uplaod .core .cover .add {
    position: relative;
    width: 56rpx;
    height: 42rpx;
}

.photo-uplaod .core .cover .defaultposter {
    display: block;
    width: 100%;
    height: 100%;
}

.photo-uplaod .core .cover .vline {
    display: block;
    width: 2px;
    height: 50rpx;
    background-color: #777;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -25rpx;
    margin-left: -1px;
}

.photo-uplaod .core .cover .hline {
    display: block;
    width:50rpx;
    height: 2px;
    background-color: #777;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -1px;
    margin-left: -25rpx;
}

.photo-uplaod .core .cover span {
    font-size: 12px;
    color: #999;
    margin-top: 20rpx;
}

.custom-size .core {
    width: 100%;
    height: 100%;
}

.custom-size .core .li {
    width: 100%;
    height: 100%;
}

.photo-uplaod .progress {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #fff;
}
.media-type{
	display:flex;
	justify-content: space-evenly;
	background-color: #fff;
	padding:20px 0;
}
.media-type .item{
	display:flex;
	flex-direction: column;
	align-items: center;
	font-size:14px;
}
.media-type .item .iconfont{
	font-size:30px;
	display:block;
	height:50px;
	width:50px;
	display:flex;
	align-items: center;
	justify-content: center;
}
.media-type .image .iconfont{
	font-size:28px;
}
</style>
