import AppConfig from "./app.config";

const {BASE_URL, ANDROID_URL} = AppConfig;

export default {
    BASE_URL,
    ANDROID_URL,
    // WebSocket
    WEB_SOCKET_URL: "ws://localhost:4000",

    // 第三方接口
    OPEN_API: {},

    //基础API
    APP_BASE_API: {

       /**猫超API --注册首页*** */
       register:`${ANDROID_URL}/api/app/member/register`, //注册
       code:`${ANDROID_URL}/api/common/code`, //获取验证码
       login:`${ANDROID_URL}/api/app/member/login`, //登陆
       logout:`${ANDROID_URL}/api/app/member/logout`, //登出
       editPwd:`${ANDROID_URL}/api/app/member/pwd`, //重置密码
       editPwdPay:`${ANDROID_URL}/api/app/member/pwd/pay`, //重置支付密码
       //首页商品
       productList:`${ANDROID_URL}/api/app/product/list`, //商城->商品列表
       bannerList:`${ANDROID_URL}/api/app/banner/list`, //banner列表
       //    bannerList:`/api/common/code`, // H5跨域问题解决
       //会员---个人中心
       member:`${ANDROID_URL}/api/app/member`, //获取当前用户
       memberChildList:`${ANDROID_URL}/api/app/member/child/list`, //获取当前用户团队
       memberDetail:`${ANDROID_URL}/api/app/member/detail`, //获取当前用户详情
       userExist:`${ANDROID_URL}/api/app/member/id/card/exist`, //检查当前用户是否认证
       payExist:`${ANDROID_URL}/api/app/member/pwd/pay/exist`, //是否设置支付密码
       realAuth:`${ANDROID_URL}/api/app/member/real/auth`, //实名认证
       receiveAccount:`${ANDROID_URL}/api/app/member/receive/account`, //设置收款账号 
       settingInfo:`${ANDROID_URL}/api/app/member/setting/info`, //设置用户信息

       /**消息中心--公告* */
       noticeDetail:`${ANDROID_URL}/api/app/notice/detail`, //获取公告详情
       noticeList:`${ANDROID_URL}/api/app/notice/list`, //公告列表
       noticeMsg:`${ANDROID_URL}/api/app/notice/msg`, //消息红点 && 消息读取
       
       /***商品订单页面** */
       recordGoodList:`${ANDROID_URL}/api/app/record/product/list`, //商品订单列表
       recordGoodBuy:`${ANDROID_URL}/api/app/record/product`, //商品购买
       recordGoodCancel:`${ANDROID_URL}/api/app/record/product/cancel`, //取消订单
       recordGoodPay:`${ANDROID_URL}/api/app/record/product/pay`, //商品支付
       recordGoodRefund:`${ANDROID_URL}/api/app/record/product/refund`, //商品订单列表
       
       /**收货** */
       address:`${ANDROID_URL}/api/sys/receive/address`, //默认收货地址 && 添加 && 编辑 && 删除
       addressList:`${ANDROID_URL}/api/sys/receive/address/list`, //收货地址列表

       /**版本管理* */
       versionLast:`${ANDROID_URL}/api/app/version/last`, //获取版本

       /**抢购订单** */
       recordBuyList:`${ANDROID_URL}/api/app/record/buy/list`, //获取 养殖 记录列表
       catFoodList:`${ANDROID_URL}/api/app/record/cat/food/list`, //获取 猫粮 记录列表
       exchangeList:`${ANDROID_URL}/api/app/record/exchange/list`, //获取 兑换 记录列表
       rechargeList:`${ANDROID_URL}/api/app/record/recharge/list`, //获取 充值 记录列表
       reserveList:`${ANDROID_URL}/api/app/record/reserve/list`, //获取 预约 记录列表
       rewardList:`${ANDROID_URL}/api/app/record/reward/list`, //获取 收益 记录列表
       transferList:`${ANDROID_URL}/api/app/record/transfer/list`, //获取 转账 记录列表
       winList:`${ANDROID_URL}/api/app/record/win/list`, //获取 中奖 记录列表
       withdrawList:`${ANDROID_URL}/api/app/record/withdraw/list`, //获 提现 记录列表
       
       /***资产** */
       asset:`${ANDROID_URL}/api/app/asset`, //获取当前用户资产 && 提现用户资产
       assetExchange:`${ANDROID_URL}/api/app/asset/exchange`, //兑换
       assetReserve:`${ANDROID_URL}/api/app/asset/reserve`, //预约
       assetTransfer:`${ANDROID_URL}/api/app/asset/transfer`, //转赠











        /***没用的api*** */
		PARAMETER:`${ANDROID_URL}/app/parameter/code`,
        CUSTOM: `${ANDROID_URL}/baseUser/custom`,
        LOGIN_URL: `${ANDROID_URL}/baseUser/login`, //登陆
        GET_MENUS: `${ANDROID_URL}/menu/codes`, //权限
        ROLE_MENUS_TREE: `${ANDROID_URL}/menu/authority/roleMenusTree`, //菜单
        PRODUCTION: `${ANDROID_URL}/productionplan/custom`,
        DICT: `${ANDROID_URL}/dict/value/value`,//数据字典
        VERSIONUPDATE: `${ANDROID_URL}/tsAppUpdate/versionUpdate`,//热更新
		CHANGELANGUAGE: `${ANDROID_URL}/baseUser/updateLanguage`,//切换语言
		GET_CLICK: `${ANDROID_URL}/click`,//操作日志
        //扫码
        PRO_WORK_BYBARCODE: `${ANDROID_URL}/ttWorkorder/android/findDataByBarCode`,
        //库存查询
        PRO_WORK_WAREHOUSELIST: `${ANDROID_URL}/app/stock/page`,
        PRO_WORK_WAREHOUSELIST_NEW: `${ANDROID_URL}/app/stock/priorityQRCode`,


        //收货列表
        TAKEDELIVERY_LIST: `${ANDROID_URL}/app/inOrder/page`,
        TAKEDELIVERY_infoId: `${ANDROID_URL}/app/inOrder/id`,
        // 收货接口
        TAKEDELIVERY_RECEIVE: `${ANDROID_URL}/app/inOrder/receive`,
        // 收货上架接口
        TAKEDELIVERY_RECEIVESHELF: `${ANDROID_URL}/app/inOrder/receiveShelf`,
        //收货列表详情
        TAKEDELIVERY_DETAILS: `${ANDROID_URL}/app/inOrder/list`,
        TAKEDELIVERY_NO_BARCODE: `${ANDROID_URL}/stockinBarcode/noBarcode`,
		

        //批量收货
        BULKRECEIPT_LIST: `${ANDROID_URL}/app/inOrder/receive/temp/page`,
        //批量收货待收货二维码查询
        BULKRECEIPT_CODESEARCH: `${ANDROID_URL}/app/inOrder/receive/barcode/page`,
        //批量收货
        BULKRECEIPT_RECEIVE: `${ANDROID_URL}/app/inOrder/receive/barcode/batch`,
        //批量收货上架
        BULKRECEIPT_RECEIVE_SELF: `${ANDROID_URL}/app/inOrder/receiveSelf/barcode/batch`,
        //批量收货删除
        BULKRECEIPT_DELETE: `${ANDROID_URL}/app/inOrder/delete`,

        // TOKEN_VALIDATE: `${BASE_URL}/user/token/validate`, //token验证

        //   USER_INFO: `${BASE_URL}/user/info`, //获取用户信息
        //   SAVE_USER_PHONE: `${BASE_URL}/user/save_phone`, //保存手机号
        //   SAVE_USER_DEVICE: `${BASE_URL}/user/save_device`, //保存用户设备信息
        // 物料
        GetMaterialList: `${ANDROID_URL}/app/material/page`,
        MaterialListPage: `${ANDROID_URL}/material/page`,
        // 供应商
        GetSupplierList: `${ANDROID_URL}/app/supplier/page`,
        // 质检方案
        GetQualityList: `${ANDROID_URL}/app/test/page`,
        // 工厂
        GetPlantList: `${ANDROID_URL}/app/plant/list`,
        // 仓库
        Storage: `${ANDROID_URL}/app/warehouse/list`,
        WAREHOUSE_FIND: `${ANDROID_URL}/warehouse/find`,
        WAREHOUSE_MOVE_FIND: `${ANDROID_URL}/warehouse/move/find`,
        // 默认入库状态
        DefaultLibraryState: `${ANDROID_URL}/app/materialstatus/list`,
        DefaultLibraryStatePage: `${ANDROID_URL}/materialstatus/page`,
        // 限制客户
        LimitCustomer: `${ANDROID_URL}/customer/page`,
        // 加入-收货单
        AddReceivingNote: `${ANDROID_URL}/app/inOrderTemp/add`,
        // 加入-收货单
        INORDERADD: `${ANDROID_URL}/app/inOrder/add`,
        // 删除待上架接口
        INORDERDELETE: `${ANDROID_URL}/app/inOrder/delete`,
        // 购物车数据
        CartData: `${ANDROID_URL}/app/inOrderTemp/list`,
        // 收货-收货单
        AddCart: `${ANDROID_URL}/app/inOrderTemp/receive`,
        // 收货并上架-收货单
        AddAndReceiveCart: `${ANDROID_URL}/app/inOrderTemp/receiveShelf`,
        // 删除购物车数据
        RmCart: `${ANDROID_URL}/app/inOrderTemp/delete`,
        // 入库确认查询
        ConfirmWareHouseList: `${ANDROID_URL}/app/stockin/page`,
        // 入库库位查询
        ConfirmWareHouseLocation: `${ANDROID_URL}/stockin/recommendedLocations`,
        // 入库确认明细
        ConfirmWareHouseDetail: `${ANDROID_URL}/app/stockin/list`,
        // 完成上架并继续
        DoMore: `${ANDROID_URL}/app/stockin/confirm`,
        // 批量入库
        DoMoreList: `${ANDROID_URL}/app/stockin/confirm/batch`,
        // 生产批号查询
        LotnoMore: `${ANDROID_URL}/app/lotno/list`,

        // 投料出库
        FeedWarehouseOut: `${ANDROID_URL}/app/stockput/page`,
        // 投料出库明细
        FeedWarehouseOutDetail: `${ANDROID_URL}/app/stockput/id`,
        // 投料出库明细源二维码
        BarcoeListFeed: `${ANDROID_URL}/app/barcoe/list`,
        // 投料出库明细源二维码New
        BarcoeListNewFeed: `${ANDROID_URL}/app/stockput/barcoe/list`,
        // 投料出库明细子表
        FeedWarehouseOutList: `${ANDROID_URL}/app/stockput/list`,
        // 投料出库明细子表 加入
        FeedWarehouseOutListAdd: `${ANDROID_URL}/app/stockput/add`,
        // 投料出库明细子表 删除
        FeedWarehouseOutListDelete: `${ANDROID_URL}/app/stockput/delete`,
        // 工序字表
        FeedWarehouseOrderInpt: `${ANDROID_URL}/app/workorderInput/page`,
        // 出库确认
        FeedWarehouseConfirm: `${ANDROID_URL}/app/stockput/confirm`,

        CUSTOM: `${ANDROID_URL}/baseUser/custom`,
        LOGIN_URL: `${ANDROID_URL}/baseUser/login`, //登陆
        PRODUCTION: `${ANDROID_URL}/productionplan/custom`,

        //扫码
        PRO_WORK_BYBARCODE: `${ANDROID_URL}/ttWorkorder/android/findDataByBarCode`,
        //库存查询
        PRO_WORK_WAREHOUSELIST: `${ANDROID_URL}/app/stock/page`,
        //源二维码
        PRO_WORK_WAREHOUSE_BARCOE_LIST: `${ANDROID_URL}/app/barcoe/list`,
        //源二维码新
        PRO_WORK_WAREHOUSE_BARCOE_NEW_LIST: `${ANDROID_URL}/app/stockout/barcoe/list`,
        //加入二维码
        PRO_WORK_WAREHOUSE_BARCOE_ADD: `${ANDROID_URL}/app/stockout/add`,


        //出库确认查询
        DELIVERT_CONFIRMATION_QIERY: `${ANDROID_URL}/app/stockout/page`,
        //出库单据
        DELIVERT_CONFIRMATION_LIST: `${ANDROID_URL}/app/stockout/list`,
        //出库单个查询
        DELIVERT_CONFIRMATION_id: `${ANDROID_URL}/app/stockout/id`,

        // 出库删除
        DELIVERT_CONFIRMATION_DELETE: `${ANDROID_URL}/app/stockout/delete`,
        // 出库 拣货并返回
        DELIVERT_CONFIRMATION_DONE: `${ANDROID_URL}/app/stockout/confirm`,
        //批量出库
        DO_MORE_OUT: `${ANDROID_URL}/app/stockout/confirm/batch`,

        //移库详情查询
        MOVE_THE_STOREHOUSE_MOVE_ID: `${ANDROID_URL}/app/move/id`,
        // 移库分页查询接口
        MOVE_THE_STOREHOUSE_MOVE_PAGE: `${ANDROID_URL}/app/move/page`,
        // 移库源二维码
        MOVE_THE_STOREHOUSE_BARCOE_LIST: `${ANDROID_URL}/app/barcoe/list`,
        // 移库源二维码New
        MOVE_THE_STOREHOUSE_BARCOE_NEW_LIST: `${ANDROID_URL}/app/move/barcoe/list`,
        // 移库加入
        MOVE_THE_STOREHOUSE_MOVE_ADD: `${ANDROID_URL}/app/move/add`,
        // 移库加入
        MOVE_THE_STOREHOUSE_MOVE_LIST: `${ANDROID_URL}/app/move/list`,
        // 移库完成
        MOVE_THE_STOREHOUSE_MOVE_CONFIRM: `${ANDROID_URL}/app/move/confirm`,
        // 移库删除
        MOVE_THE_STOREHOUSE_MOVE_DELETE: `${ANDROID_URL}/app/move/delete`,


        //物料状态详情查询
        MATERIAL_STATUS_ID: `${ANDROID_URL}/app/status/id`,
        // 物料状态分页查询接口
        MATERIAL_STATUS_PAGE: `${ANDROID_URL}/app/status/page`,
        // 物料状态变更加入
        MATERIAL_STATUS_ADD: `${ANDROID_URL}/app/status/add`,
        // 物料状态源二维码
        MATERIAL_STATUS_BARCOE_LIST: `${ANDROID_URL}/app/barcoe/list`,
        // 物料状态源二维码New
        MATERIAL_STATUS_BARCOE_NEW_LIST: `${ANDROID_URL}/app/status/barcoe/list`,
        // 物料状态变更子表list查询
        MATERIAL_STATUS_STATUS_LIST: `${ANDROID_URL}/app/status/list`,
        // 物料状态下拉接口：
        MATERIAL_STATUS_MATERIALSTATUS_LIST: `${ANDROID_URL}/app/materialstatus/list`,
        // 完成变更并继续和完成变更并返回：
        MATERIAL_STATUS_STATUS_CONFIRM: `${ANDROID_URL}/app/status/confirm`,
        // 物料状态删除：
        MATERIAL_STATUS_STATUS_DELETE: `${ANDROID_URL}/app/status/delete`,

		// 限制客户变更
		MATERIAL_CUSTOMER_CHANGE_ID:`${ANDROID_URL}/app/customer/id`,
		MATERIAL_CUSTOMER_CHANGE_PAGE:`${ANDROID_URL}/app/customer/findPage`,
		MATERIAL_CUSTOMER_CHANGE_BARCODE:`${ANDROID_URL}/app/customer/barcoe/list`,
		MATERIAL_CUSTOMER_CHANGE_CONFIRM:`${ANDROID_URL}/app/customer/confirm`,
        MATERIAL_CUSTOMER_CHANGE_CONFIRM_BATCH:`${ANDROID_URL}/app/customer/batchConfirm`,

        // 随机盘点
        RANDOM_INVENTORY_QUERY: `${ANDROID_URL}/app/stock/page`,
        RANDOM_INVENTORY_QUERY_NEW: `${ANDROID_URL}/app/stock/inventoryQuery`,
        RANDOM_INVENTORY_QUERY_NEW_FS: `${ANDROID_URL}/app/stock/inventoryQueryFs`,
        //随机盘点明细
        RANDOM_INVENTORY_DETAILS: `${ANDROID_URL}/app/stock/detail`,
        RANDOM_INVENTORY_DETAILS_NEW: `${ANDROID_URL}/app/stock/inventoryDetail`,
        //校验
        RANDOM_INVENTORY_CHECKCODE: `${ANDROID_URL}/app/stock/inventoryCheck`,
        RANDOM_INVENTORY_CHECKCODE_FS: `${ANDROID_URL}/app/stock/inventoryCheckFS`,
        //明细确认
        RANDOM_INVENTORY_DETAILS_CONFIRM: `${ANDROID_URL}/app/stock/confirm`,
        RANDOM_INVENTORY_DETAILS_CONFIRM_NEW: `${ANDROID_URL}/app/stock/inventoryConfirm`,
        RANDOM_INVENTORY_DETAILS_CONFIRM_NEW_FS: `${ANDROID_URL}/app/stock/inventoryConfirmFS`,

        // TOKEN_VALIDATE: `${BASE_URL}/user/token/validate`, //token验证

        //   USER_INFO: `${BASE_URL}/user/info`, //获取用户信息
        //   SAVE_USER_PHONE: `${BASE_URL}/user/save_phone`, //保存手机号
        //   SAVE_USER_DEVICE: `${BASE_URL}/user/save_device`, //保存用户设备信息

        //生产报工
        PRODUCTION_REPORT_BY_BARCODE: `${ANDROID_URL}/app/workorder/findWorkorderByBarcode`,
        PRODUCTION_REPORT_BY_PLANNO: `${ANDROID_URL}/app/workorder/findWorkorderByPlanNo`,
        PRODUCTION_REPORT_DETAIL: `${ANDROID_URL}/app/workorder/detail`,
        PRODUCTION_REPORT_USER_PAGE: `${ANDROID_URL}/app/user/page`,
        PRODUCTION_REPORT_TMTEAM_PAGE: `${ANDROID_URL}/app/tmTeam/page`,
        PRODUCTION_REPORT_TEAM_STAFF_PAGE: `${ANDROID_URL}/team/staff/page`,
        PRODUCTION_REPORT_WAITREPORT: `${ANDROID_URL}/app/workorder/waitReport`,
        PRODUCTION_REPORT_REPORT: `${ANDROID_URL}/app/workorder/report`,
        PRODUCTION_REPORT_TMDEFECT_PAGE: `${ANDROID_URL}/app/tmDefect/page`,
        PRODUCTION_REPORT_WORKORDER_WORKREPORTED: `${ANDROID_URL}/app/workorder/workReported`,
		PRODUCTION_REPORT_RETURN_LIST: `${ANDROID_URL}/app/getWorkOrderInputByOrderId`,
		PRODUCTION_REPORT_RETURN: `${ANDROID_URL}/ttWorkorderReturnApi/workorderReturnConfirm`,
        PRODUCTION_REPORT_MEMO_REPEAT: `${ANDROID_URL}/digitalSignageApi/report/memo/repeat`,

        // 生产任务
        PRODUCTION_TASK_BARCODE: `${ANDROID_URL}/app/woReport/page`,
        PRODUCTION_TASK_DETAIL: `${ANDROID_URL}/app/woReport/output/detail`,
        PRODUCTION_TASK_INPUTS: `${ANDROID_URL}/app/woReport/verification`,
        PRODUCTION_TASK_INPUTS_SUBMIT: `${ANDROID_URL}/app/woReport/input/feed`,
        PRODUCTION_TASK_INPUTS_BARCODE: `${ANDROID_URL}/app/woReport/input/barcode`,
        PRODUCTION_TASK_BARCODE_FIND: `${ANDROID_URL}/ttWorkorderInput/barcode/find`,
        PRODUCTION_TASK_UPSTEAMS: `${ANDROID_URL}/app/woReport/validated/upsteams`,
        PRODUCTION_TASK_UPSTEAMS_SUBMIT: `${ANDROID_URL}/app/woReport/bind/upsteams`,
        PRODUCTION_TASK_UPSTEAMS_CANCLE: `${ANDROID_URL}/app/woReport/cancel/upsteams`,
        PRODUCTION_TASK_REPORT_RECORD: `${ANDROID_URL}/app/woReport/report/page`,
        PRODUCTION_TASK_EQUIPMENT: `${ANDROID_URL}/app/woReport/validated/equipment`,
        PRODUCTION_TASK_EQUIPMENT_BIND: `${ANDROID_URL}/app/woReport/bind/equipment`,
		PRODUCTION_TASK_EQUIPMENT_CANCEL: `${ANDROID_URL}/app/woReport/cancel/equipment`,
        PRODUCTION_TASK_START: `${ANDROID_URL}/app/woReport/start`,
        PRODUCTION_TASK_FIRSTTEST_QUERY: `${ANDROID_URL}/app/woReport/validated/firstInspection`,
        PRODUCTION_TASK_FIRSTTEST_SUBMIT: `${ANDROID_URL}/app/woReport/save/firstInspection`,
        PRODUCTION_TASK_ENDTEST_QUERY: `${ANDROID_URL}/app/woReport/validated/finalInspection`,
        PRODUCTION_TASK_ENDTEST_SUBMIT: `${ANDROID_URL}/app/woReport/save/finalInspection`,
        PRODUCTION_TASK_PARAMS_QUERY: `${ANDROID_URL}/app/woReport/validated/params`,
        PRODUCTION_TASK_PARAMS_SUBMIT: `${ANDROID_URL}/app/woReport/save/params`,
        PRODUCTION_TASK_REPORT: `${ANDROID_URL}/app/woReport/report`,
        PRODUCTION_TASK_MATERIAL_TESTPALN: `${ANDROID_URL}/app/material/testplan/page`,
        PRODUCTION_APPROVAL_QUERY: `${ANDROID_URL}/app/woReport/approval/page`,
        PRODUCTION_APPROVAL_SUBMIT: `${ANDROID_URL}/app/woReport/approval/confirm`,
        PRODUCTION_APPROVAL_REJECT: `${ANDROID_URL}/app/woReport/approval/reject`,
        PRODUCTION_NOGOOD_QUERY: `${ANDROID_URL}/app/woReport/nogood/page`,
        PRODUCTION_NOGOOD_SUBMIT: `${ANDROID_URL}/app/woReport/nogood/confirm`,
		PRODUCTION_NOGOOD_REPORT: `${ANDROID_URL}/app/woReport/nogood/report`,
        PRODUCTION_NOGOOD_RECORD: `${ANDROID_URL}/app/woReport/unqualified/page`,
        PRODUCTION_EQUIPMENT_LIST: `${ANDROID_URL}/app/equipment/page`,
        PRODUCTION_EQUIPMENT_LIST_NEW: `${ANDROID_URL}/app/equipment/repair/page`,
        PRODUCTION_WORK_REPORT_LIST: `${ANDROID_URL}/app/woReport/report/record/page`,
		PRODUCTION_WORKORDER_NUMBER: `${ANDROID_URL}/app/workorder/numberOfWorkReport`,
		PRODUCTION_WORKORDER_REVOKE:`${ANDROID_URL}/ttWorkorderReport/cancel`,
		PRODUCTION_WORKORDER_SEQ:`${ANDROID_URL}/app/woReport/workorder/seq`,
		PRODUCTION_WORKORDER_DTL:`${ANDROID_URL}/app/woReport/planout/salesorder/dtl`,
		PRODUCTION_WORKORDER_PACKAGE:`${ANDROID_URL}/tmProductPackaging/defaultPackaging`,
		PRODUCTION_WORKORDER_TAKING:`${ANDROID_URL}/ttWorkorder/woReport/`,


        //设备维修查询
        DEVICE_REPAIR_QUERY: `${ANDROID_URL}/app/equipment/repair`,
        DEVICE_REPAIR_FIND: `${ANDROID_URL}/app/equipment/repair/find`,
        DEVICE_REPAIR_DETAIL_FIND: `${ANDROID_URL}/app/equipment/detailed/find`,
        DEVICE_REPAIR_APPLY: `${ANDROID_URL}/app/equipment/repair/mpinsert`,
        DEVICE_REPAIR_SUB: `${ANDROID_URL}/app/equipment/repair/update`,
        DEVICE_REPAIR_COMMIT: `${ANDROID_URL}/app/equipment/repair/commit`,

        //故障描述
        EQUIP_FAULT_DESC_PAGE: `${ANDROID_URL}/tmEquipmentFaultDesc/page`,
        //处理方式
        EQUIP_DEAL_METHOD_PAGE: `${ANDROID_URL}/tmEquipmentDealMethod/page`,
        //原因分析
        EQUIP_CAUSE_ANALYSIS_PAGE: `${ANDROID_URL}/tmEquipmentCauseAnalysis/page`,

        //设备保养查询
        DEVICE_MAINTAIN_QUERY: `${ANDROID_URL}/app/equipment/maint`,
        DEVICE_MAINTAIN_SUB: `${ANDROID_URL}/app/equipment/maint/commit`,
        DEVICE_MAINTAIN_DETAIL: `${ANDROID_URL}/app/equipment/maint/detail`,
        // 设备领用归还
        DEVICE_RECIEVE_BACK: `${ANDROID_URL}/app/equipmentCollection/page`,
        DEVICE_RECIEVE_SUBMIT: `${ANDROID_URL}/app/equipmentCollection/add`,
        // 设备标定
        DEVICE_SIGN_QUERY: `${ANDROID_URL}/app/equipment/life`,
        DEVICE_SIGN_SUBMIT: `${ANDROID_URL}/app/equipment/life/commit`,
        //设备点检
        DEVICE_SPOT_CHECK:`${ANDROID_URL}/app/equipment/maint/check`,
        //质检任务
        QUALITY_BUSINESS_DO: `${ANDROID_URL}/app/testplan/page`,               //执行
        QUALITY_BUSINESS_CREAT: `${ANDROID_URL}/app/testplan/commit`,           //创建
        QUALITY_BUSINESS_TARGET: `${ANDROID_URL}/app/testplan/target`,           //检验拉取
        QUALITY_BUSINESS_DETAIL: `${ANDROID_URL}/app/tmTestplan/detail`,       //明细
		QUALITY_BUSINESS_DETAILLASTDATA: `${ANDROID_URL}/app/tmTestplan/detailLastData`,//明细
        QUALITY_BUSINESS_END: `${ANDROID_URL}/app/materialstatus/page`,        //结束
        QUALITY_BUSINESS_SUB: `${ANDROID_URL}/app/testplan/dtl/commit`,        //提交
        QUALITY_BUSINESS_SELECT: `${ANDROID_URL}/app/testplan/select`,        //查询仓库
        QUALITY_BUSINESS_COFIRM: `${ANDROID_URL}/app/testplan/confirm`,        //查询仓库
        QUALITY_BUSINESS_TMDETAIL: `${ANDROID_URL}/app/testplan/detail`,
        QUALITY_BUSINESS_MATERIAL: `${ANDROID_URL}/ttTestitemMaterial/page`,
        MATERIAL_NO_QUERT: `${ANDROID_URL}/app/materialHandover/findListByMaterialNo`, //物料交接
        MATERIAL_NO_RECORD: `${ANDROID_URL}/app/materialHandover/find`,//物料交接
        MATERIAL_NO_RECIEVE: `${ANDROID_URL}/app/materialHandover/receive`, //物料交接
        QUALITY_BARCODE_QUERY: `${ANDROID_URL}/app/testplan/findMaterial`, //二维码查询
        QUALITY_BARCODE_COMMIT: `${ANDROID_URL}/app/testplan/scanCode`, //提交按钮
        SEARCH_STATION: `${ANDROID_URL}/app/collectionList`,//andon呼叫工位查询
        SEARCH_HELP_TYPE: `${ANDROID_URL}/app/findAll`,//andon呼叫查询求援类型
        SEARCH_UNCALLING: `${ANDROID_URL}/app/find`,//andon呼叫查询待处理的呼叫数据
        SEARCH_CALLING_DETAIL:`${ANDROID_URL}/app/detail`,//andon呼叫查询待处理的呼叫数据详情
        SEARCH_CALLING:`${ANDROID_URL}/app/call`,//andon呼叫
        RESCUE_INIT: `${ANDROID_URL}/app/approval/andon/custom`,//`${ANDROID_URL}/app/deal/andon/custom`, //andon救援处理初始化查询
        CUR_FIND:`${ANDROID_URL}/app/cur/find`,
        ANDON_CALL_CANCEL:`${ANDROID_URL}/app/cancel`,////andon救援处理取消
        ANDON_CALL_HANDLE:`${ANDROID_URL}/app/approvalPassed`,////andon救援处理审核
        SEARCH_ALL_STATION:`${ANDROID_URL}/uloc/android/find`,
        SEARCH_ONCE_STATION:`${ANDROID_URL}/app/call/last`,
        //审批流
        APPROVAL_RECORD_START:`${ANDROID_URL}/app/baseApprovalRecord/start`, ///andon发起审批-发起接口
        APPROVAL_RECORD_READ_STATUS:`${ANDROID_URL}/app/baseApprovalRecord/readStatus`, ///andon发起审批-已读接口
        APPROVAL_RECORD_GETONE:`${ANDROID_URL}/app/baseApprovalRecord/getOne`, ///andon发起审批-详情接口
        APPROVAL_RECORD_AUDIT:`${ANDROID_URL}/app/baseApprovalRecord/audit`, ///andon发起审批-审核接口
        APPROVAL_RECORD_MANDATORY_INVALID:`${ANDROID_URL}/app/baseApprovalRecord/mandatoryInvalid`, ///andon发起审批-作废接口
        APPROVAL_RECORD_USER_PAGE:`${ANDROID_URL}/baseApproval/userPage`, ///andon发起审批-转移人
        APPROVAL_RECORD_USER_CHANGE:`${ANDROID_URL}/app/baseApprovalRecord/change`, ///andon发起审批-转移人确认

        APPROVAL_RECORD_QUERY:`${ANDROID_URL}/app/approval/andon/query`, ///andon发起审批-呼叫求援查询
        APPROVAL_RECORD_RECEIVE: `${ANDROID_URL}/app/baseApprovalRecord/receive`, ///andon发起审批-接收任务
        APPROVAL_RECORD_PROCESSCONFIG: `${ANDROID_URL}/app/baseApprovalRecord/processConfig`, ///andon发起审批-变量表单
        APPROVAL_RECORD_GETELEMENT: `${ANDROID_URL}/app/base/getElement`, ///andon发起审批-变量表单
        /**end** */
        UNQUALITY_REVIEW_QUERY:`${ANDROID_URL}/app/woReport/unqualifiedApproval/page`,//不合格评审首页查询
        UNQUALITY_REVIEW_DETAIL:`${ANDROID_URL}/app/woReport/unqualifiedApproval/detail`,//不合格评审详情
        UNQUALITY_REVIEW_TRANSFORM:`${ANDROID_URL}/app/woReport/unqualifiedApproval/change`,//不合格评审变更审批人
        UNQUALITY_REVIEW_APPROVAL:`${ANDROID_URL}/app/woReport/unqualifiedApproval/approval`,//不合格评审审批
        MATERIAL_QUERY_TESTPLAN:`${ANDROID_URL}/app/testplan/material/page`,//根据可适用物料查询质检方案
		QUALITY_BUSINESS_LAST_SELECTED:`${ANDROID_URL}/app/testplan/lastTestitem`,//查询最近一次创建的质检任务
		// 线边库
		STOCK_PRE_PAGE:`${ANDROID_URL}/app/stockPre/page`,
		STOCK_PRE_NEW_PAGE:`${ANDROID_URL}/app/stockPre/newPage`,
		STOCK_PRE_DETAIL:`${ANDROID_URL}/app/stockPre/detail`,
		STOCK_PRE_NEW_DETAIL:`${ANDROID_URL}/app/stockPre/newDetail`,
		STOCK_PRE_CODES:`${ANDROID_URL}/app/stockPre/barcodes`,
		STOCK_PRE_STOCKS:`${ANDROID_URL}/app/stockPre/stocks`,
		STOCK_PRE_NEW_STOCKS:`${ANDROID_URL}/app/stockPre/newStocks`,
		STOCK_PRE_ADD:`${ANDROID_URL}/app/stockPre/add`,
		STOCK_PRE_CONFIRM:`${ANDROID_URL}/app/stockPre/confirm`,
		STOCK_PRE_NEW_CONFIRM:`${ANDROID_URL}/app/stockPre/newConfirm`,
		STOCK_PUT_DELETE:`${ANDROID_URL}/app/stockput/delete`,
		STOCK_PUT_AUTO:`${ANDROID_URL}/app/stockPre/barcode/auto`,
		STOCK_PUT_NEW_AUTO:`${ANDROID_URL}/app/stockPre/barcode/newAuto`,
		//待发区备料
		//查询
		DELIVERY_PLAN_PAGE:`${ANDROID_URL}/app/deliveryplan/page`,
		DELIVERY_PLAN_BARCODE_PAGE:`${ANDROID_URL}/app/deliveryplan/barcode/page`,
		DELIVERY_PLAN_CHECK:`${ANDROID_URL}/app/deliveryplan/checkBarcode`,
		DELIVERY_PLAN_DETAIL:`${ANDROID_URL}/app/deliveryplan/detail`, // 详情
		DELIVERY_PLAN_DETAIL_QUERY:`${ANDROID_URL}/app/deliveryplan/queryPlanAndPreDtl`, // 详情
		DELIVERY_PLAN_CODES:`${ANDROID_URL}/app/deliveryplan/barcodes`, // 加入
		DELIVERY_PLAN_CODE_LIST:`${ANDROID_URL}/app/deliveryplan/queryTempBarcode`, // 加入
		DELIVERY_PLAN_SCAN_CODE:`${ANDROID_URL}/app/deliveryplan/queryStockByBarcode`, // 加入
		DELIVERY_PLAN_STOCKS:`${ANDROID_URL}/app/deliveryplan/stocks`, // 可用库存条码查询
		DELIVERY_PLAN_ADD:`${ANDROID_URL}/app/deliveryplan/add`,
		DELIVERY_PLAN_BATCHADD:`${ANDROID_URL}/app/deliveryplan/batchAdd`,
		DELIVERY_PLAN_CONFIRM:`${ANDROID_URL}/app/deliveryplan/confirm`,
		DELIVERY_PLAN_BATCHCONFIRM:`${ANDROID_URL}/app/deliveryplan/batchConfirm`,
		DELIVERY_PLAN_AUTO:`${ANDROID_URL}/app/deliveryplan/barcode/auto`,
		AUTH_DICT_CATA_PAGE:`${ANDROID_URL}/tsDataRole/authDictData/page`,
		WAREHOUSE_LOCATION_FIND:`${ANDROID_URL}/warehouse/location/find`,
		WAREHOUSE_LOCATION_MOVE_FIND:`${ANDROID_URL}/warehouse/location/move/find`,
		WAREHOUSE_AREA_FIND:`${ANDROID_URL}/warehouse/area/find`,
		// 模板选择
		PRINT_TEMPLATE:`${ANDROID_URL}/app/printTemplate/custom`,
        //入库退库
		STOCKIN_FINDSTOCKIN:`${ANDROID_URL}/app/stockin/findstockin`,
		//入库退库详情
		STOCKIN_DETAIL:`${ANDROID_URL}/app/stockin/detail`,
		//入库退库确认
		STOCKIN_RETURNCONFIRM:`${ANDROID_URL}/app/stockin/returnconfirm`,
		//出库退库
		STOCKOUT_FINDSTOCKIN:`${ANDROID_URL}/app/stockout/findstockout`,
		//出库退库详情
		STOCKOUT_DETAIL:`${ANDROID_URL}/app/stockout/detail`,
		//出库退库确认
		STOCKOUT_RETURNCONFIRM:`${ANDROID_URL}/app/stockout/returnconfirm `,
		// 车间
		WORKSHOP_FIND:`${ANDROID_URL}/workshop/find`,
		// 产线
		LINE_FIND:`${ANDROID_URL}/line/find`,

		//报检
		CHECK_STOCK_PAGE:`${ANDROID_URL}/app/testplan/checkStock/page`,
		CHECK_STOCK_CONFIRM:`${ANDROID_URL}/app/testplan/checkStock/confirm`,


        // 盘点计划
        INVENTORY_PLAN_PAGE: `${ANDROID_URL}/app/inventoryPlan/page`,
        INVENTORY_PLAN_DTL: `${ANDROID_URL}/app/inventoryPlan/dtl`,
        INVENTORY_PLAN_HANDLE: `${ANDROID_URL}/app/inventoryPlan/handle`,

		// 委外备料
		OUTSOURC_PREPAREMATERIALFIND:`${ANDROID_URL}/app/outsourc/prepareMaterialFind`,
		OUTSOURC_PREPAREMATERIALDETAIL:`${ANDROID_URL}/app/outsourc/prepareMaterialDetail`,
		OUTSOURC_FINDSTOCKBYBARCODE:`${ANDROID_URL}/app/outsourc/findStockByBarcode`,
		OUTSOURC_ADD:`${ANDROID_URL}/app/outsourc/add`,
		OUTSOURC_BARCODEDELETE:`${ANDROID_URL}/app/outsourc/barCodeDelete `,
		OUTSOURC_BARCODELIST:`${ANDROID_URL}/app/outsourc/barCodeList`,
		OUTSOURC_MOVEOROUTSTOCKCONFIRM:`${ANDROID_URL}/app/outsourc/moveOrOutStockConfirm`,
		OUTSOURC_PICKINGFIND:`${ANDROID_URL}/app/outsourc/pickingFind`,
		OUTSOURC_PICKINGDETAIL:`${ANDROID_URL}/app/outsourc/pickingDetail`,
		OUTSOURC_PICKINGMATERIALBYBARCODE:`${ANDROID_URL}/app/outsourc/pickingMaterialByBarcode`,
		OUTSOURC_PICKINGMATERIALSUBMIT:`${ANDROID_URL}/app/outsourc/pickingMaterialSubmit`,
		OUTSOURC_PICKINGMATERIAL_AUTO:`${ANDROID_URL}/app/outsourc/barcode/auto`,

		// 二维码
		BARCDOE_SPLIT_PAGE:`${ANDROID_URL}/app/stockBarcodes/page`,
		BARCDOE_SPLIT_CONFIRM:`${ANDROID_URL}/app/stockBarcode/split`,
		BARCDOE_MERGE_CONFIRM:`${ANDROID_URL}/app/stockBarcode/merge`,
		// 嵌套二维码
		BARCDOE_QRCODE_NESTING:`${ANDROID_URL}/app/stockBarcodes/page`,
		BARCDOE_QRCODE_NESTED_TWO_POSITION:`${ANDROID_URL}/tsDataRole/collectionList`,
		BARCDOE_QRCODE_CONTINUOUS_NESTING:`${ANDROID_URL}/app/stockBarcode/nest`,
		// 工单任务包装
		TTWORKORDEREXCUTE:`${ANDROID_URL}/ttWorkorder/woReport/`,
		TMPRODUCTPACKAGING:`${ANDROID_URL}/tmProductPackaging/`,
		// 网络打印机
		WIFI_PRINGER_DEFAULT:`${ANDROID_URL}/tmPrinterSetting/getUserDeaultPrinter`,
		WIFI_PRINGER_LIST:`${ANDROID_URL}/tmPrinterSetting/page`,
		WIFI_PRINGER_SET_DEFAULT:`${ANDROID_URL}/tmPrinterSetting/saveUserDeaultPrinter`,
		WIFI_PRINGER_CANCEL_DEFAULT:`${ANDROID_URL}/tmPrinterSetting/clearUserDeaultPrinter`,
		WIFI_PRINGER_INFO:`${ANDROID_URL}/tsPrinttemplate/printInfo`,
		// 组托管理
		GROUP_SUPPORT_STOCKS:`${ANDROID_URL}/app/groupSupport/stocks`,
		GROUP_SUPPORT_CONFIRM:`${ANDROID_URL}/app/groupSupport/confirm`,
		// 整托入库
		GROUP_SUPPORT_INSTORE:`${ANDROID_URL}/app/groupSupport/stockin/confirm/batch`,
		// 整托移库
		GROUP_SUPPORT_MOVESTORE:`${ANDROID_URL}/app/groupSupport/move/confirm`,
		// 生产组托
		GROUP_SUPPORT_PRODUCE_PAGE:`${ANDROID_URL}/app/groupSupport/report/page`,
		GROUP_SUPPORT_PRODUCE_CONFIRM:`${ANDROID_URL}/app/groupSupport/report/instock`,
        TTNEWSREAD_APP_PULL:`${ANDROID_URL}/ttNewsRead/app/pull`,
		SELECT_PUBLISH:`${ANDROID_URL}/app/systemNews/selectPublish`,
		SYSTEM_NEWS_DETAIL:`${ANDROID_URL}/ttSystemNews/detail`,
		NOTICE_NEWS_DETAIL:`${ANDROID_URL}/ttNoticeFile/detail`,
        TTNEWSREAD_SINGLE:`${ANDROID_URL}/ttNewsRead/updateNewsStatus/single`,
        TTNEWSREAD_ALL:`${ANDROID_URL}/app/news/updateNewsStatus/allRead`,
        TTNEWSREAD_APP_TASK:`${ANDROID_URL}/ttNewsRead/app/task/pull`,
		
		//调拨出
		MOVEOUT_PAGE:`${ANDROID_URL}/app/moveOut/page`,
		MOVEOUT_DETAIL:`${ANDROID_URL}/app/moveOut/detail`,
		MOVEOUT_BARCODE_FIND:`${ANDROID_URL}/app/moveOut/barcode/find`,
		MOVEOUT_BARCODE_ADD_LISD:`${ANDROID_URL}/app/moveOut/barcodes`,
		MOVEOUT_BARCODE_DELETE:`${ANDROID_URL}/ttTradeBarcodeTemp/delete`,
		MOVEOUT_BARCODE_ADD:`${ANDROID_URL}/app/moveOut/add`,
		MOVEOUT_BARCODE_CONFIRM:`${ANDROID_URL}/app/moveOut/confirm`,
		MOVEOUT_AUTO_MATCH:`${ANDROID_URL}/app/moveOut/auto`,
		// 形态转换
		TRANSFROM_PAGE:`${ANDROID_URL}/app/simpleMachining/page`,
		TRANSFROM_DETAIL:`${ANDROID_URL}/app/simpleMachining/detail`,
		TRANSFROM_BARCODE_FIND:`${ANDROID_URL}/app/simpleMachining/barcode/find`,
		TRANSFROM_BARCODE_ADD:`${ANDROID_URL}/app/simpleMachining/add`,
		TRANSFROM_AUTO_MATCH:`${ANDROID_URL}/app/simpleMachining/auto`,
		TRANSFROM_BARCODE_LIST:`${ANDROID_URL}/app/simpleMachining/barcodes`,
		TRANSFROM_BARCODE_DELETE:`${ANDROID_URL}/ttTradeBarcodeTemp/delete`,
		TRANSFROM_CONFIRM:`${ANDROID_URL}/app/simpleMachining/confirm`,
		//出库任务订单
		OUTORDER_PAGE:`${ANDROID_URL}/app/outorder/task/page`,
		OUTORDER_DETAIL:`${ANDROID_URL}/ttOutorderDtl/detail`,
		OUTORDER_BARCODE_FIND:`${ANDROID_URL}/ttTradeBarcodeTemp/outorder/barcode/find`,
		OUTORDER_BARCODE_ADD_LIST:`${ANDROID_URL}/ttTradeBarcodeTemp/outorder/barcode/list`,
		OUTORDER_BARCODE_DELETE:`${ANDROID_URL}/ttTradeBarcodeTemp/delete`,
		OUTORDER_BARCODE_ADD:`${ANDROID_URL}/ttTradeBarcodeTemp/outorder/barcode/add`,
		OUTORDER_BARCODE_AUTO:`${ANDROID_URL}/ttTradeBarcodeTemp/outorder/barcode/auto`,
		OUTORDER_BARCODE_CONFIRM:`${ANDROID_URL}/ttTradeBarcodeTemp/outorder/barcode/confirm`,
		
		// 出库退库打印
		OUTSTOCK_LABEL_PRINT:`${ANDROID_URL}/stockinBarcode/getStockinBarcodeByParams`,
		
		//工装出库
		 TOOLING_TASK_PAGE:`${ANDROID_URL}/app/tooling/task/page`,
		 TOOLING_TASK_DETAIL:`${ANDROID_URL}/ttOutorderDtl/detail`,
		 TOOLING_TASK_BARCODE:`${ANDROID_URL}/ttTradeBarcodeTemp/tooling/barcode/find`,
		 TOOLING_TASK_AUTO:`${ANDROID_URL}/ttTradeBarcodeTemp/tooling/auto`,
		 TOOLING_BARCODE_ADD:`${ANDROID_URL}/ttTradeBarcodeTemp/tooling/add`,
		 TOOLING_BARCODE_LIST:`${ANDROID_URL}/ttTradeBarcodeTemp/tooling/barcodes`,
		 TOOLING_BARCODE_DELETE:`${ANDROID_URL}/ttTradeBarcodeTemp/delete`,
		 TOOLING_TASK_CONFIRM:`${ANDROID_URL}/ttTradeBarcodeTemp/tooling/confirm`,
		 // 工装上机
		 TOOLING_BIND_PAGE:`${ANDROID_URL}/app/toolmould/equipment/page`,
		 TOOLING_HAVED_BIND:`${ANDROID_URL}/equipment/page`,
		 TOOLING_BIND:`${ANDROID_URL}/app/toolmould/binding`,
		 TOOLING_UNBIND:`${ANDROID_URL}/app/toolmould/cancel`,
		 
		 CHECK_STOCKPUT_BATCHNO_LASTEST:`${ANDROID_URL}/app/stockput/check`,
		 
		// 批量快速出库
		BATCH_QUICK_OUT_TEMP:`${ANDROID_URL}/app/stockput/batch/list`,
		BATCH_QUICK_OUT_QUERY:`${ANDROID_URL}/stockBarcode/barcodeChange/page`,
		BATCH_QUICK_OUT_ADD:`${ANDROID_URL}/app/stockput/batch/add`,
		BATCH_QUICK_OUT_DELETE:`${ANDROID_URL}/ttTradeBarcodeTemp/delete`,
		BATCH_QUICK_OUT_CONFIRM:`${ANDROID_URL}/app/stockput/batch/confirm`,
		
		//批量入库
		BATCH_INSTORE_CONFIRM:`${ANDROID_URL}/app/stockin/confirm/barcode/batch`,
		
		//报工记录打印数据
		REPORT_RECORD_PRINT_DATA:`${ANDROID_URL}/ttWorkorderReport/workorderReport/print`,
		
		// 装车
		ENTRUCK_RECORD:`${ANDROID_URL}/app/loading/barcode/list`,
		ENTRUCK_BARCODE:`${ANDROID_URL}/app/loading/barcode/deliveryplan`,
		ENTRUCK_BARCODE_ADD:`${ANDROID_URL}/app/loading/barcode/add`,
		ENTRUCK_DELETE:`${ANDROID_URL}/ttTradeBarcodeTemp/delete`,
		ENTRUCK_CONFIRM:`${ANDROID_URL}/app/loading/comfirm`,
		ENTRUCK_LOADINGSTYLE:`${ANDROID_URL}/app/loading/barcode/lastLoadingStyle`,
		ENTRUCK_CARRIER:`${ANDROID_URL}/app/carrier`,
		
		//批量移库确认
		TRADE_MOVE_CONFIRM:`${ANDROID_URL}/app/trade/move/confirm`,
		// 系统配置查询
		SYSTEM_PARAMETER:`${ANDROID_URL}/baseEnterSystemParameter/parameter/code`,
        SYSTEM_USE_MONITOR_DATE: `${ANDROID_URL}/systemUseMonitor/workStartAndEndDate`,

		
		//高级搜索-收货仓库
		WAREHOUSE_PAGEAPP:`${ANDROID_URL}/warehouse/pageApp`,
		
		//高级搜索-供应商
		SUPPLIER_PAGEAPP:`${ANDROID_URL}/supplier/pageApp`,
		
		//高级搜索-入库业务类型
		DICT_PAGEAPP:`${ANDROID_URL}/app/inOrder/inOrderType`,
		
		//高级搜索-筛选set
		SETQUERYAPP:`${ANDROID_URL}/app/viewCondition/setQueryApp`,
		
		//高级搜索-筛选get
		GETQUERYAPP:`${ANDROID_URL}/app/viewCondition/getQueryApp`,
		
		//高级搜索-排序set
		SETSORTAPP:`${ANDROID_URL}/app/viewCondition/setSortApp`,
		
		//高级搜索-排序get
		GETSORTAPP:`${ANDROID_URL}/app/viewCondition/getSortApp`,
		
		//工位级联查询
		collectionListUlocNoPlant:`${ANDROID_URL}/tsDataRole/collectionListRemovePlant`,
		
		// 巡线拉动查询
		SCAN_LINE:`${ANDROID_URL}/app/pull/scanLine/find`,
		// 巡线拉动查询
		SCAN_LINE_CONFIRM:`${ANDROID_URL}/app/pull/scanLine/confirm`,
		HISTORY_OPERATION:`${ANDROID_URL}/baseUser/history/operation`,
		PULL_SCANLINE:`${ANDROID_URL}/app/pull/scanLine/moveOut/page`,
		
		// 巡线拉动调拨
		PULL_MOVEOUT_PAGE:`${ANDROID_URL}/app/pull/scanLine/moveOut/page`,
		PULL_MOVEOUT_BARCODE_CONFIRM:`${ANDROID_URL}/app/pull/scanLine/moveOut/confirm`,
		
		//巡线拉动出库订单
		PULL_OUTORDER_PAGE:`${ANDROID_URL}/app/pull/scanLine/outorder/task/page`,
		
		//我发起的
		ANDON_SELFLAUNCH:`${ANDROID_URL}/app/andon/selfLaunch`,
		
		// 批量调拨
		BATCH_TRANSFER_QUERY_BARCODE:`${ANDROID_URL}/app/moveOut/batch/queryBarcode`,
		BATCH_TRANSFER_CONFIRM:`${ANDROID_URL}/app/moveOut/batch/confirm`,
		// 余料
		SURPLUS_MATERIAL:`${ANDROID_URL}/app/woReport/handover/page`,
		SURPLUS_MATERIAL_CONFIRM:`${ANDROID_URL}/app/woReport/surplus/confirm`,
    
        //出库记录查询
        TSDATAROLE_AUTH_PAGE:`${ANDROID_URL}/tsDataRole/authDictData/page`,
        TTSTOCKOUT_RECORD_PAGE:`${ANDROID_URL}/app/ttStockout/record/page`,
		
		//二维码拆分
		CODE_SPLIT_NEW_CODE:`${ANDROID_URL}/app/stockBarcode/newBarcode`,
		// 报工记录
		REPORT_RECORD_MERGE:`${ANDROID_URL}/app/woReport/report/merge`,
		REPORT_RECORD_MERGE_LIST:`${ANDROID_URL}/app/woReport/report/merge/page`,
		REPORT_RECORD_MERGE_CANCLE:`${ANDROID_URL}/app/woReport/report/merge/cancel`,
		INVENTORY_USAGE_PAGE:`${ANDROID_URL}/app/stock/remove/occupy/page`,
		INVENTORY_USAGE_CANCEL:`${ANDROID_URL}/app/stock/remove/occupy/confirm`,
		SAMPLE_NUMBER_SELECT:`${ANDROID_URL}/ttTestitem/sampleNumberSelect`
    },
    //首页模块
    APP_HOME_API: {
        INDEX: `${BASE_URL}/index`, //获取首页数据
    },
};
