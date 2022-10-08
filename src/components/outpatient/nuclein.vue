<template>
    <div>

        <Table stripe :columns="columns1" :data="data1"></Table>
        <Page :total="total" class="margin30" :current="1" @on-change="chagesPage($event)" />
    </div>
</template>
<script>
import { nuclein } from "@/utils/DataInteraction";
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
                    title: "预约日期",
                    key: "date",
                },
                {
                    title: "项目编号",
                    key: "itemCode",
                },
                {
                    title: "开单科室编号",
                    key: "billingDeptId",
                },
                {
                    title: "开单科室名称",
                    key: "billingDeptName",
                },
                {
                    title: "检验科室编号",
                    key: "executeDeptId",
                },
                {
                    title: "检验科室名称",
                    key: "executeDeptName",
                },
                {
                    title: "项目名称",
                    key: "itemName",
                },
                {
                    title: "数量",
                    key: "quantity",
                },
                {
                    title: "单价",
                    key: "itemPrice",
                },
                {
                    title: "总额",
                    key: "cost",
                },
            ],
            data1: [],
            total: 0,
            istk: false,
            indexInfo: 0,
        };
    },
    mounted() {
        this.getHospitalData(1);
    },
    methods: {
        getHospitalData(i) {
            nuclein({ id: hospitalId, page: i, limit: 10 }).then((res) => {
                this.data1 = res.data;
                this.total = res.total;
            });
        },
        chagesPage(e) {
            this.getHospitalData(e)
        },

    },
};
</script>
<style scoped>
.margin30 {
    margin: 30px auto;
}
</style>