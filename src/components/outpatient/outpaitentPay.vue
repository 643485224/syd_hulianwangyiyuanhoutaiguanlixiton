<template>
    <div>

        <Table stripe :columns="columns1" :data="data1"></Table>
        <Page :total="total" class="margin30" :current="1" @on-change="chagesPage($event)" />
    </div>
</template>
<script>
import { OutpaitentPay } from "@/utils/DataInteraction";
import { hospitalId } from "../common.js"
export default {
    data() {
        return {
            columns1: [
                {
                    title: "科室ID",
                    key: "id",
                },
                {
                    title: "医院名称",
                    key: "hispitalname",
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
                    title: "外联缴费id",
                    key: "payid",
                },
                {
                    title: "处方金额",
                    key: "prescriptionAmount",
                },

                {
                    title: "处方号",
                    key: "prescriptionNo"
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
            OutpaitentPay({ id: hospitalId, page: i, limit: 10 }).then((res) => {
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