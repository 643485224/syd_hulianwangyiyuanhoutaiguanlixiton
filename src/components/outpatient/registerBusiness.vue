<template>
  <div>

    <Table stripe :columns="columns1" :data="data1"></Table>
    <Page :total="total" class="margin30" :current="1" @on-change="chagesPage($event)" />
  </div>
</template>
<script>
import { RegisterBusiness } from "@/utils/DataInteraction";
import { hospitalId } from "../common.js"
export default {
  data() {
    return {
      columns1: [
        {
          title: "挂号ID",
          key: "id",
        },
        {
          title: "创建时间",
          key: "createDate",
        },
        {
          title: "修改时间",
          key: "modifyDate",
        },
        {
          title: "医院名称",
          key: "hispitalname",
        },
        {
          title: "操作员编号",
          key: "hisUserId",
        },
        {
          title: "患者姓名",
          key: "patientName",
        },
        {
          title: "卡号",
          key: "hisCardNo",
        },
        {
          title: "卡类型",
          key: "hisCardType",
        },
        {
          title: "患者id",
          key: "patientId",
        },
        {
          title: "科室id",
          key: "deptId",
        },
        {
          title: "医生id",
          key: "doctorId",
        },
        {
          title: "锁号流水号",
          key: "resourcesLockId",
        },
        {
          title: "门诊排班记录标识",
          key: "scheduleItemCode",
        },
        {
          title: "号源标识",
          key: "seqCode",
        },
        {
          title: "服务时间",
          key: "serviceDate",
        },
        {
          title: "金额",
          key: "amount",
        },
        {
          title: "账户",
          key: "bankNo",
        },
        {
          title: "开户行",
          key: "openBank",
        },
        {
          title: "订单号",
          key: "orderNo",
        },
        {
          title: "交易渠道",
          key: "payChannel",
        },
        {
          title: "交易方式,支付/退款",
          key: "payMethod",
        },
        {
          title: "交易时间",
          key: "payTime",
        }
      ],
      data1: [],
      total: 0,
      isTshi: false,
      indexInfo: 0,
    };
  },
  mounted() {
    this.getHospitalData(1);
  },
  methods: {
    getHospitalData(i) {
      RegisterBusiness({ id: hospitalId, page: i, limit: 10 }).then((res) => {
        this.data1 = res.data;
        this.total = res.total;
      });
    },
    chagesPage(e) {
      this.getHospitalData(e)
    }
  },
};
</script>
<style scoped>
.margin30 {
  margin: 30px auto;
}
</style>