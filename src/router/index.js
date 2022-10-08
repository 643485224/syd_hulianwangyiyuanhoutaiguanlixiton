//1.导入Vue和VueRouter的包
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

import Home from '@/components/home.vue'
import Login from '@/components/login'

import Statistics from '@/components/statistics.vue'

import HospitalInfo from '@/components/hospitalInfo/hospitalInf'
import AddHospitalInfo from '@/components/hospitalInfo/addHospitalInf'
import EditHospitalInfo from '@/components/hospitalInfo/editHospitalInf'

import Choosehospital from '@/components/chooseHospital'
import Choosedepartment from '@/components/chooseDepartment'

import DepartmentInfo from '@/components/department/departmentInfo'
import AddDepartment from '@/components/department/addDepartment'
import editDepartment from '@/components/department/editDepartment'

import DoctorInfo from '@/components/doctor/doctorInfo'
import AddDoctorInfo from '@/components/doctor/addDoctor'
import EditDoctorInfo from '@/components/doctor/editDoctor'

import vacanciesPay from '@/components/outpatient/vacanciesPay'
import OutpaitentPay from '@/components/outpatient/outpaitentPay'
import RegisterBusiness from '@/components/outpatient/registerBusiness'
import SubscribeBusiness from '@/components/outpatient/subscribeBusiness'
import nuclein from '@/components/outpatient/nuclein'

import hospitalizationPay from '@/components/refund/hospitalizationPay'
import hospitalizationRefund from '@/components/refund/hospitalizationRefund'
import outpaitentPayFun from '@/components/refund/outpaitentPay'
import outpaitentRefund from '@/components/refund/outpaitentRefund'

import hospitalPreCharge from '@/components/inpatientManagement/hospitalPreCharge'
import hospitalizationRecords from '@/components/inpatientManagement/hospitalizationRecords'
import inpatientList from '@/components/inpatientManagement/inpatientList'
import userManagement from '@/components/personalCenter/userManagement'
import visitCardManagement from '@/components/personalCenter/visitCardManagement'
const routes = [{
        path: '/',
        name: '登录',
        component: Login, //路由名字
    },
    {
        path: '/home',
        name: '首页',
        component: Home, //路由名字
        meta: {
            title: '首页',
            path: 'home'
        },
        redirect: '/home/statistics',
        children: [{
                path: 'statistics',
                name: '统计',
                mate: {
                    title: '统计',
                    path: 'statistics'
                },
                component: Statistics
            },
            {
                path: 'hospital',
                name: '医院管理',
                mate: {
                    title: '医院管理',
                    path: 'hospital'
                },
                component: HospitalInfo
            },
            {
                path: 'addhospital',
                name: '添加医院',
                mate: {
                    title: '添加医院',
                    path: 'addhospital'
                },
                component: AddHospitalInfo
            },
            {
                path: 'edithospital',
                name: '修改医院',
                mate: {
                    title: '修改医院',
                    path: 'edithospital'
                },
                component: EditHospitalInfo
            },
            {
                path: 'choosehospital',
                name: '选择医院',
                mate: {
                    title: '选择医院',
                    path: 'choosehospital'
                },
                component: Choosehospital
            },
            {
                path: 'Choosedepartment',
                name: '选择科室',
                mate: {
                    title: '选择科室',
                    path: 'Choosedepartment'
                },
                component: Choosedepartment
            },
            {
                path: 'departmentInfo',
                name: '查询科室',
                mate: {
                    title: '查询科室',
                    path: 'departmentInfo'
                },
                component: DepartmentInfo
            },
            {
                path: 'adddepartment',
                name: '添加科室',
                mate: {
                    title: '添加科室',
                    path: 'adddepartment'
                },
                component: AddDepartment
            },
            {
                path: 'editdepartment',
                name: '修改科室',
                mate: {
                    title: '修改科室',
                    path: 'editdepartment'
                },
                component: editDepartment
            },
            {
                path: 'DoctorInfo',
                name: '查询医生',
                mate: {
                    title: '查询医生',
                    path: 'DoctorInfo'
                },
                component: DoctorInfo
            },
            {
                path: 'AddDoctorInfo',
                name: '添加医生',
                mate: {
                    title: '添加医生',
                    path: 'AddDoctorInfo'
                },
                component: AddDoctorInfo
            },
            {
                path: 'EditDoctorInfo',
                name: '修改医生',
                mate: {
                    title: '修改医生',
                    path: 'EditDoctorInfo'
                },
                component: EditDoctorInfo
            }, {
                path: 'vacanciesPay',
                name: ' 余额充值管理',
                mate: {
                    title: '余额充值管理',
                    path: 'vacanciesPay'
                },
                component: vacanciesPay
            }, {
                path: 'OutpaitentPay',
                name: '门诊缴费管理',
                mate: {
                    title: '门诊缴费管理',
                    path: 'OutpaitentPay'
                },
                component: OutpaitentPay
            },
            {
                path: 'RegisterBusiness',
                name: '挂号管理',
                mate: {
                    title: '挂号管理',
                    path: 'RegisterBusiness'
                },
                component: RegisterBusiness
            },
            {
                path: 'SubscribeBusiness',
                name: '预约挂号管理',
                mate: {
                    title: '预约挂号管理',
                    path: 'SubscribeBusiness'
                },
                component: SubscribeBusiness
            },
            {
                path: 'nuclein',
                name: '核酸管理',
                mate: {
                    title: '核酸管理',
                    path: 'nuclein'
                },
                component: nuclein
            },
            {
                path: 'hospitalizationPay',
                name: '住院充值',
                mate: {
                    title: '住院充值',
                    path: 'hospitalizationPay'
                },
                component: hospitalizationPay
            },
            {
                path: 'hospitalizationRefund',
                name: '住院退款',
                mate: {
                    title: '住院退款',
                    path: 'hospitalizationRefund'
                },
                component: hospitalizationRefund
            },
            {
                path: 'outpaitentPayFun',
                name: '门诊充值',
                mate: {
                    title: '门诊充值',
                    path: 'outpaitentPayFun'
                },
                component: outpaitentPayFun
            },
            {
                path: 'outpaitentRefund',
                name: '门诊退款',
                mate: {
                    title: '门诊退款',
                    path: 'outpaitentRefund'
                },
                component: outpaitentRefund
            },
            // 住院管理
            {
                path: 'hospitalPreCharge',
                name: '住院预充值管理',
                mate: {
                    title: '住院预充值管理',
                    path: 'hospitalPreCharge'
                },
                component: hospitalPreCharge
            },
            {
                path: 'hospitalizationRecords',
                name: '住院记录',
                mate: {
                    title: '住院记录',
                    path: 'hospitalizationRecords'
                },
                component: hospitalizationRecords
            },
            {
                path: 'inpatientList',
                name: '住院清单',
                mate: {
                    title: '住院清单',
                    path: 'inpatientList'
                },
                component: inpatientList
            },
            // 个人中心
            {
                path: 'userManagement',
                name: '用户管理',
                mate: {
                    title: '用户管理',
                    path: 'userManagement'
                },
                component: userManagement
            },
            {
                path: 'visitCardManagement',
                name: '就诊卡管理',
                mate: {
                    title: '就诊卡管理',
                    path: 'visitCardManagement'
                },
                component: visitCardManagement
            }
        ]
    }
]

//3.创建路由的实例对象
const router = new VueRouter({
    routes
})
//4.向外共享路由的实例对象


export default router