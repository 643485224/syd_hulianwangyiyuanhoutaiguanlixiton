import {
    APIClientService
} from './apiService'
import {
    loginAjax,
    hospitalAjax,
    AddhospitalAjax,
    updatehospitalAjax,
    departmentAjax,
    deletehospitalAjax,
    updatedepartmentAjax,
    adddepartmentAjax,
    deletedepartmentAjax,
    doctorAjax,
    updatedoctorAjax,
    adddoctorAjax,
    deletedoctorAjax,
    RegisterBusinessAjax,
    SubscribeBusinessAjax,
    OutpaitentPayAjax,
    vacanciesPayAjax,
    hospitalizationAjax,
    OutpaitentPayFunAjax,
    hospitalizationRefundAjax,
    OutpaitentRefundAjax,
    nucleinAjax,
    refundAjax,
    refundhospitalizedAjax,
    queryAllUserAccountAjax,
    addUserAccountAjax,
    updateUserAccountAjax,
    deleteUserAccountAjax,
    queryAllVisitCardAjax,
    doPrePayInHospitalAjax
} from './http'

export const login = (param) => {
    return APIClientService.REQUESTPOST(loginAjax, param)
}
//医院
export const hospitalInfo = (param) => {
    return APIClientService.REQUESTPOST(hospitalAjax, param)
}

export const AddhospitalInfo = (param) => {
    return APIClientService.REQUESTPOST(AddhospitalAjax, param)
}

export const upadtehospitalInfo = (param) => {
    return APIClientService.REQUESTPOST(updatehospitalAjax, param)
}

export const deletehospitalInfo = (param) => {
    return APIClientService.REQUESTPOST(deletehospitalAjax, param)
}
//科室
export const departmentInfo = (param) => {
    return APIClientService.REQUESTPOST(departmentAjax, param)
}

export const deletedepartment = (param) => {
    return APIClientService.REQUESTPOST(deletedepartmentAjax, param)
}

export const updatedepartment = (param) => {
    return APIClientService.REQUESTPOST(updatedepartmentAjax, param)
}

export const adddepartment = (param) => {
    return APIClientService.REQUESTPOST(adddepartmentAjax, param)
}

//医生
export const doctorInfo = (param) => {
    return APIClientService.REQUESTPOST(doctorAjax, param)
}

export const deletedoctor = (param) => {
    return APIClientService.REQUESTPOST(deletedoctorAjax, param)
}

export const updatedoctor = (param) => {
    return APIClientService.REQUESTPOST(updatedoctorAjax, param)
}

export const adddoctor = (param) => {
    return APIClientService.REQUESTPOST(adddoctorAjax, param)
}

//当日挂号
export const RegisterBusiness = (param) => {
    return APIClientService.REQUESTPOST(RegisterBusinessAjax, param)
}

//预约挂号
export const SubscribeBusiness = (param) => {
    return APIClientService.REQUESTPOST(SubscribeBusinessAjax, param)
}

//预约挂号
export const OutpaitentPay = (param) => {
    return APIClientService.REQUESTPOST(OutpaitentPayAjax, param)
}

//预约挂号
export const vacanciesPay = (param) => {
    return APIClientService.REQUESTPOST(vacanciesPayAjax, param)
}

//核酸管理
export const nuclein = (param) => {
    return APIClientService.REQUESTPOST(nucleinAjax, param)
}

//住院充值查询
export const hospitalization = (param) => {
    return APIClientService.REQUESTPOST(hospitalizationAjax, param)
}

//住院退款查询
export const hospitalizationRefund = (param) => {
    return APIClientService.REQUESTPOST(hospitalizationRefundAjax, param)
}

//门诊充值查询
export const OutpaitentPayFun = (param) => {
    return APIClientService.REQUESTPOST(OutpaitentPayFunAjax, param)
}

//门诊退款查询
export const OutpaitentRefund = (param) => {
    return APIClientService.REQUESTPOST(OutpaitentRefundAjax, param)
}

//门诊订单微信退款
export const refundFun = (param) => {
    return APIClientService.REQUESTPOST(refundAjax, param)
}

//住院订单微信退款
export const refundhospitalized = (param) => {
    return APIClientService.REQUESTPOST(refundhospitalizedAjax, param)
}

// 住院服务
// ---------------------------住院服务-start------------------------------
// 住院预充值管理-住院预充值管理
export const doPrePayInHospital = (param) => {
    return APIClientService.REQUESTPOST(doPrePayInHospitalAjax, param)
}
// ---------------------------住院服务-end------------------------------

// 个人中心
// ---------------------------个人中心-start------------------------------
// 用户管理-查询全部用户信息
export const queryAllUserAccount = (param) => {
    return APIClientService.REQUESTPOST(queryAllUserAccountAjax, param)
}
// 就诊卡管理-查询全部就诊卡信息
export const queryAllVisitCard = (param) => {
    return APIClientService.REQUESTPOST(queryAllVisitCardAjax, param)
}
// ---------------------------个人中心-end------------------------------