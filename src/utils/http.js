import {
    httpcs,
    httpcs2
} from './requestUrl'
//登录
export const loginAjax = httpcs + '/login'
//医院管理增删改查
export const hospitalAjax = httpcs + '/queryAllHospital'
export const AddhospitalAjax = httpcs + '/addHospital'
export const updatehospitalAjax = httpcs + '/updateHospital'
export const deletehospitalAjax = httpcs + '/deleteHospital'

//科室管理增删改查
export const departmentAjax = httpcs + '/queryAllDept'
export const updatedepartmentAjax = httpcs + '/updateDept'
export const adddepartmentAjax = httpcs + '/addDept'
export const deletedepartmentAjax = httpcs + '/deleteDept'

//医生管理增删改查
export const doctorAjax = httpcs + '/queryAllDoctor'
export const updatedoctorAjax = httpcs + '/updateDoctor'
export const adddoctorAjax = httpcs + '/addDoctor'
export const deletedoctorAjax = httpcs + '/deleteDoctor'

//门诊服务
//当日挂号
export const RegisterBusinessAjax = httpcs + '/getRegisterRecord'

//预约挂号
export const SubscribeBusinessAjax = httpcs + '/getPreRegisterRecord'

// 门缴费管理
export const OutpaitentPayAjax = httpcs + '/getPayRecordList'

// 余额充值管理
export const vacanciesPayAjax = httpcs + '/getClinicChargeRecordList'

//  核酸管理
export const nucleinAjax = httpcs + '/orderNucleic'


//住院预充值查询
export const hospitalizationAjax = httpcs + '/queryNoWxRefundJournalhospitalized'

// 住院已退查询
export const hospitalizationRefundAjax = httpcs + '/queryWxRefundJournalhospitalized'

// 门诊已缴费
export const OutpaitentPayFunAjax = httpcs + '/queryNoWxRefundournal'


// 门诊已退查询
export const OutpaitentRefundAjax = httpcs + '/queryWxRefundournal'

// 门诊订单微信退款
export const refundAjax = httpcs2 + '/refund'

// 住院订单微信退款
export const refundhospitalizedAjax = httpcs2 + '/refundhospitalized'

// 住院服务
// ---------------------------住院服务-start------------------------------
// 住院预充值管理-住院预充值管理
export const doPrePayInHospitalAjax = httpcs + '/doPrePayInHospital'
// ---------------------------住院服务-end------------------------------

// 个人中心
// ---------------------------个人中心-start------------------------------
// 用户管理-查询全部用户信息
export const queryAllUserAccountAjax = httpcs + '/queryAllUserAccount'

// 用户管理-新增用户信息
export const addUserAccountAjax = httpcs + '/addUserAccount'

// 用户管理-修改用户信息
export const updateUserAccountAjax = httpcs + '/updateUserAccount'

// 用户管理-删除用户信息
export const deleteUserAccountAjax = httpcs + '/deleteUserAccount'

// 就诊卡管理-查询全部就诊卡信息
export const queryAllVisitCardAjax = httpcs + '/queryAllVisitCard'
// ---------------------------个人中心-end------------------------------