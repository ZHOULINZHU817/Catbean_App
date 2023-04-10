import ApiClinet from "./api-clinet";
import ApiConfig from "../config/api.config";
import AppConfig from "../config/app.config";
import AuthService from "./auth.service";

const ApiService = {
	get(url, data, options) {
		return ApiClinet.get(url, data, options);
	},
	post(url, data, options) {
		return ApiClinet.post(url, data, options);
	},
	put(url, data, options) {
		return ApiClinet.put(url, data, options);
	},
	delete(url, data, options) {
		return ApiClinet.delete(url, data, options);
	},
};

export default ApiService;

// 用户管理服务
export const UserService = {
	// 用户登录
	login(params) {
		if (
			AppConfig.PROVIDER == "weixin" ||
			AppConfig.PROVIDER == "qq" ||
			AppConfig.PROVIDER == "toutiao"
		) {
			//微信或QQ登陆
			return new Promise((resolve, reject) => {
				uni.login({
					provider: AppConfig.PROVIDER,
					success: function (res) {
						uni.request({
							url: ApiConfig.APP_BASE_API.login,
							method: "POST",
							data: {
								code: res.code,
							},
							success: function (res) {
								if (res.statusCode == 200) {
									resolve(res);
								} else {
									reject(res);
								}
							},
						});
					},
				});
			}); 
		} else {
			//其他登陆方式
			return ApiClinet.post(ApiConfig.APP_BASE_API.login, params);
		}
	},



	getMenus(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.GET_MENUS, params);
	},
	getRoleMenusTree(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.ROLE_MENUS_TREE, params);
	}
};

//首页服务
export const HomeService = {
	//获取首页数据
	getIndex(params) {
		return ApiClinet.post(ApiConfig.APP_HOME_API.INDEX, params);
	},
};

//企业用户管理
export const AppCUSTOM = {
	customList(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.CUSTOM, params);
	},
	productionplan(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.PRODUCTION, params);
	}

};
//仓储物流
export const PRO_BUS_MANAGE = {
	//扫码
	quickReport(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.PRO_WORK_BYBARCODE, params);
	},
	//仓库查询
	warehouseList(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.PRO_WORK_WAREHOUSELIST, params);
	},
	//收货列表
	takeDeliveryList(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.TAKEDELIVERY_LIST, params);
	},
	//收货列表
	takeDeliveryInfo(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.TAKEDELIVERY_infoId, params);
	},
	//收货
	takeDeliveryReceive(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.TAKEDELIVERY_RECEIVE, params);
	},
	//收货上架
	takeDeliveryReceiveShelf(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.TAKEDELIVERY_RECEIVESHELF, params);
	},
	
	
	// 获取物料
	getMaterailList(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.GetMaterialList, params)
	},
	// 获取供应商
	getSupplierList(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.GetSupplierList, params)
	},
	// 获取工厂
	GetPlantList(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.GetPlantList, params)
	},
	// 获取质检方案
	GetQualityList(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.GetQualityList, params)
	},
	// 获取仓库
	getStorageList(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.Storage, params)
	},
	// 默认入库状态
	getDefaultStatus(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.DefaultLibraryState, params)
	},
	// 限制客户
	getLimitCustomer(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.LimitCustomer, params)
	},
	// 加入-收货单
	addRecevingNote(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.AddReceivingNote, params)
	},
	// 购物车数据
	getCartList(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.CartData, params)
	},
	// 删除购物车数据
	delCart(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.RmCart, params)
	},
	inorderADD(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.INORDERADD, params)
	},
	//删除待上架
	inorderDELETE(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.INORDERDELETE, params);
	},
	// 收货-收货单
	addCart(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.AddCart, params)
	},
	// 收货并上架-收货单
	addAndReceiveCart(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.AddAndReceiveCart, params)
	},
	//收货明细
	takeDeliveryDetails(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.TAKEDELIVERY_DETAILS, params);
	},
	// 入库确认查询
	confirmWarehouseList(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.ConfirmWareHouseList, params)
	},
	//入库确认明细
	confirmWarehouseDetail(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.ConfirmWareHouseDetail, params)
	},
	// 完成上架并继续
	doMore(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.DoMore, params)
	},
	// 批量入库
	doMoreList(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.DoMoreList, params,{loading:true})
	},
	// 生产批号查询
	lotnoMore(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.LotnoMore, params)
	},
	// 投料出库
	stockPut(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.FeedWarehouseOut, params)
	},
	// 投料出库明细 
	stockPutDetail(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.FeedWarehouseOutDetail, params)
	},
	// 投料出库明细字表
	stockPutDetailList(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.FeedWarehouseOutList, params)
	},
	// 投料出库明细字表 加入
	stockPutDetailListAdd(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.FeedWarehouseOutListAdd, params)
	},
	stockPutDetailListDelete(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.FeedWarehouseOutListDelete, params)
	},
	// 投料出库源二维码
	stockPutDetailBarcoeList(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.BarcoeListFeed, params)
	},
	// 投料出库源二维码New
	stockPutDetailBarcoeNewList(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.BarcoeListNewFeed, params)
	},
	// 工序子表
	stockPutOrderInput(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.FeedWarehouseOrderInpt, params)
	},
	// 出库确认
	stockPutConfirm(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.FeedWarehouseConfirm, params)
	},
	// 扫码收货
	scanCodAdd(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.SCAN_COD_ADD, params)
	},
	// 扫码收货并上架
	scanCodAddOn(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.SCAN_COD_ADD_ON, params)
	},
};
//出库
export const DELIVERT_CONFIRMATION = {
	
	//扫码
	quickReport(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.PRO_WORK_BYBARCODE, params);
	},
	//出库确认查询
	deliveryConfirmationQuery(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.DELIVERT_CONFIRMATION_QIERY, params);
	},
	// 拣货并返回
	doneAndReturn(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.DoneAndReutn, params)
	},
	//出库单据详情
	deliveryConfirmationList(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.DELIVERT_CONFIRMATION_LIST, params);
	},
	//出库单个查询
	deliveryConfirmationId(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.DELIVERT_CONFIRMATION_id, params);
	},
	deliveryConfirmationBarcoeList(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.PRO_WORK_WAREHOUSE_BARCOE_LIST, params);
	},
	deliveryConfirmationBarcoeNewList(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.PRO_WORK_WAREHOUSE_BARCOE_NEW_LIST, params);
	},
	deliveryConfirmationBarcoeAdd(params) {
		return ApiClinet.tpost(ApiConfig.APP_BASE_API.PRO_WORK_WAREHOUSE_BARCOE_ADD, params);
	},
	// 出库删除
	deliveryConfirmationDelete(params) {
		return ApiClinet.tpost(ApiConfig.APP_BASE_API.DELIVERT_CONFIRMATION_DELETE, params);
	},
	// 出库 拣货并返回
	deliveryConfirmationDone(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.DELIVERT_CONFIRMATION_DONE, params);
	},
	//批量出库
	doMoreList(params) {
		return ApiClinet.tpost(ApiConfig.APP_BASE_API.DO_MORE_OUT, params);
	},

	//移库详情查询
	moveTheStorehouseMoveId(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.MOVE_THE_STOREHOUSE_MOVE_ID, params);
	},
	//移库详情查询
	moveTheStorehouseMoveList(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.MOVE_THE_STOREHOUSE_MOVE_LIST, params);
	},
	//移库分页查询
	moveTheStorehouseMovePage(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.MOVE_THE_STOREHOUSE_MOVE_PAGE, params);
	},
	//移库二维码列表
	moveTheStorehouseBarcoeList(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.MOVE_THE_STOREHOUSE_BARCOE_LIST, params);
	},
	//移库二维码列表New
	moveTheStorehouseBarcoeNewList(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.MOVE_THE_STOREHOUSE_BARCOE_NEW_LIST, params);
	},
	//移库加入
	moveTheStorehouseMoveAdd(params) {
		return ApiClinet.tpost(ApiConfig.APP_BASE_API.MOVE_THE_STOREHOUSE_MOVE_ADD, params);
	},
	//移库完成
	moveTheStorehouseMoveConfirm(params) {
		return ApiClinet.tpost(ApiConfig.APP_BASE_API.MOVE_THE_STOREHOUSE_MOVE_CONFIRM, params);
	},
	//物料状态变更删除数据
	moveTheStorehouseMoveDelete(params) {
		return ApiClinet.tpost(ApiConfig.APP_BASE_API.MOVE_THE_STOREHOUSE_MOVE_DELETE, params);
	},

	//物料状态详情查询
	materialStatusId(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.MATERIAL_STATUS_ID, params);
	},
	//物料状态分页查询
	materialStatusPage(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.MATERIAL_STATUS_PAGE, params);
	},
	//物料状态二维码列表
	materialBarcoeList(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.MATERIAL_STATUS_BARCOE_LIST, params);
	},
	//物料状态二维码列表New
	materialBarcoeNewList(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.MATERIAL_STATUS_BARCOE_NEW_LIST, params);
	},
	//物料状态下拉接口
	materialMaterialstatusList(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.MATERIAL_STATUS_MATERIALSTATUS_LIST, params);
	},
	//物料状态下拉接口
	materialStatusList(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.MATERIAL_STATUS_STATUS_LIST, params);
	},
	//物料状态变更加入
	materialMaterialstatusAdd(params) {
		return ApiClinet.tpost(ApiConfig.APP_BASE_API.MATERIAL_STATUS_ADD, params);
	},
	//完成变更并继续和完成变更并返回
	materialStatusConfirm(params) {
		return ApiClinet.tpost(ApiConfig.APP_BASE_API.MATERIAL_STATUS_STATUS_CONFIRM, params);
	},
	//移库删除选中数据
	materialMaterialstatusDelete(params) {
		return ApiClinet.tpost(ApiConfig.APP_BASE_API.MATERIAL_STATUS_STATUS_DELETE, params);
	},

}

//随机盘点
export const RANDOM_INVENTORY={
	//扫码
	quickReport(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.PRO_WORK_BYBARCODE, params);
	},
	//随机盘点列表
	randomInventoryQuery(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.RANDOM_INVENTORY_QUERY, params);
	},
	//获取明细 
	randomInventoryDetail(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.RANDOM_INVENTORY_DETAILS, params);
	},
	//确认
	randomInventoryConfirm(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.RANDOM_INVENTORY_DETAILS_CONFIRM, params,{loading:true});
	},
}

//设备维修
export const DEVICE_REPAIR={

	deviceRepairQuery(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.DEVICE_REPAIR_QUERY, params);
	},
	deviceRepairFind(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.DEVICE_REPAIR_FIND, params);
	},
	deviceRepairDetail(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.DEVICE_REPAIR_DETAIL_FIND, params);
	},
	deviceRepairApply(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.DEVICE_REPAIR_APPLY, params);
	},
	deviceRepairCommit(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.DEVICE_REPAIR_COMMIT, params);
	},
	deviceRepairSub(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.DEVICE_REPAIR_SUB, params,{loading:true});
	},

}

//设备保养
export const DEVICE_MAINTAIN={
	
	deviceMaintainQuery(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.DEVICE_MAINTAIN_QUERY, params);
	},

	deviceMaintainSub(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.DEVICE_MAINTAIN_SUB, params);
	},

	deviceMaintainDetail(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.DEVICE_MAINTAIN_DETAIL, params);
	},

}


//质检任务
export const QUALITY_BUSINESS={
	barCodeQuery(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.QUALITY_BARCODE_QUERY, params);
	},
	qualityBarcodeCommit(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.QUALITY_BARCODE_COMMIT, params);
	},
	dict(params) {
		return ApiClinet.get(ApiConfig.APP_BASE_API.DICT, params);
	},
	qualityBusinessDo(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.QUALITY_BUSINESS_DO, params);
	},
	
	qualityBusinessCreat(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.QUALITY_BUSINESS_CREAT, params);
	},
	
	qualityBusinessTarget(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.QUALITY_BUSINESS_TARGET, params);
	},
	
	qualityBusinessDetail(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.QUALITY_BUSINESS_DETAIL, params);
	},
	
	qualityBusinessEnd(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.QUALITY_BUSINESS_END, params);
	},
	
	qualityBusinessSub(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.QUALITY_BUSINESS_SUB, params);
	},
	
	qualityBusinessCommit(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.QUALITY_BUSINESS_COMMIT, params);
	},
	qualityBusinessCofirm(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.QUALITY_BUSINESS_COFIRM, params);
	},
	qualityBusinessSelect(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.QUALITY_BUSINESS_SELECT, params);
	},
	materialQueryTestplan(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.MATERIAL_QUERY_TESTPLAN, params);
	},
	creatNcr(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.CREAT_NCR, params);
	},
	qualityBusinessCode(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.QUALITY_BUSINESS_CODE, params);
	},
	queryQRCode(params) {
		return ApiClinet.post(ApiConfig.APP_BASE_API.QUALITY_QR_CODE, params);
	},
}


//生产报工Production report
export const PRODUCTION_REPORT={
	productionReportByBarcode(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.PRODUCTION_REPORT_BY_BARCODE, params);
	},
	productionReportByPlanNo(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.PRODUCTION_REPORT_BY_PLANNO, params);
	},
	productionReportDetail(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.PRODUCTION_REPORT_DETAIL, params);
	},
	productionReportUserPage(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.PRODUCTION_REPORT_USER_PAGE, params);
	},
	productionReportTmteamPage(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.PRODUCTION_REPORT_TMTEAM_PAGE, params);
	},
	productionReportWaitReport(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.PRODUCTION_REPORT_WAITREPORT, params);
	},
	productionReportReport(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.PRODUCTION_REPORT_REPORT, params);
	},
	productionReportTmDefectPage(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.PRODUCTION_REPORT_TMDEFECT_PAGE, params);
	},
	productionReportWorkorderWorkReported(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.PRODUCTION_REPORT_WORKORDER_WORKREPORTED, params);
	},
	productionWorkReportRecordList(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.PRODUCTION_WORK_REPORT_LIST, params);
	},
	productionWorkEquReportRecordList(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.PRODUCTION_WORK_EQU_REPORT_LIST, params);
	},
}
//Andon呼叫
export const ANDON_CALLING={
	//查询工位
	search_station(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.SEARCH_STATION, params);

	},
	//查询求援类型
	searchHelpType(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.SEARCH_HELP_TYPE, params);
	},
	//查询待处理呼叫数据
	search_UnCalling(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.SEARCH_UNCALLING, params);
	},
	//查询呼叫数据详情
	searchCallDetail(params){

		return ApiClinet.post(ApiConfig.APP_BASE_API.SEARCH_CALLING_DETAIL, params);

	},
	//Andon呼叫
	searchCalling(params){

		return ApiClinet.post(ApiConfig.APP_BASE_API.SEARCH_CALLING, params);

	},
	//dndon救援处理
	resuceInit(params){

		return ApiClinet.post(ApiConfig.APP_BASE_API.RESCUE_INIT, params);
	},
	curFind(params){//
		return ApiClinet.post(ApiConfig.APP_BASE_API.CUR_FIND, params);
	},
	//andon救援处理取消
	callCancel(params){
		return ApiClinet.tpost(ApiConfig.APP_BASE_API.ANDON_CALL_CANCEL, params);
	},
	//andon救援处理审核
	callHandle(params){
		return ApiClinet.tpost(ApiConfig.APP_BASE_API.ANDON_CALL_HANDLE, params);
	},
	//查询所有工位

	callAllStation(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.SEARCH_ALL_STATION, params);
	},
	//查询上次呼叫工位
	callOnceStation(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.SEARCH_ONCE_STATION, params);
	},

	//发起审批
	launchApproval(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.APPROVAL_RECORD_START, params);
	},
	//发起审批-已读
	approvalReadStatus(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.APPROVAL_RECORD_READ_STATUS, params);
	},
	//发起审批-详情
	approvalGetOne(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.APPROVAL_RECORD_GETONE, params);
	},
	//发起审批-审核
	approvalAudit(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.APPROVAL_RECORD_AUDIT, params);
	},
	//发起审批-作废
	approvalMandatory(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.APPROVAL_RECORD_MANDATORY_INVALID, params);
	},
	//发起审批-转移审批人
	approvalUserPage(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.APPROVAL_RECORD_USER_PAGE, params);
	},
	//发起审批-转移确认
	approvalUserChange(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.APPROVAL_RECORD_USER_CHANGE, params);
	},
	//呼叫查询
	approvalUserQuery(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.APPROVAL_RECORD_QUERY, params);
	},
	//andon接收任务
	approvalUserReceive(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.APPROVAL_RECORD_RECEIVE, params);
	},
	approvalProcessConfig(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.APPROVAL_RECORD_PROCESSCONFIG, params);
	},
	approvalGetElement(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.APPROVAL_RECORD_GETELEMENT, params);
	},

}
//不合格评审
export const UNQUALITY_REVIEW={
	//不合格评审首页列表查询
	unqualityReviewQuery(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.UNQUALITY_REVIEW_QUERY, params);

	},
	//不合格评审详情
	unqualityReviewDetail(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.UNQUALITY_REVIEW_DETAIL, params);

	},
	//不合格评审变更审批人
	unqualityReviewTransform(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.UNQUALITY_REVIEW_TRANSFORM, params);

	},
	//不合格评审审批
	unqualityReviewApproval(params){
		return ApiClinet.post(ApiConfig.APP_BASE_API.UNQUALITY_REVIEW_APPROVAL, params);


	}



}