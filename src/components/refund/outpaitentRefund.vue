<template>
    <div>
        <Table stripe :columns="columns1" :data="data1"></Table>
        <Page :total="total" class="margin30" :current="1" @on-change="chagesPage($event)" />
    </div>
</template>
<script>
import { OutpaitentRefund } from "@/utils/DataInteraction";
import { hospitalId } from "../common.js"
export default {
    data() {
        return {
            columns1: [
                {
                    title: "ID",
                    key: "id"
                }, {
                    title: "公众账号ID",
                    key: "appid"
                }, {
                    title: "商户号",
                    key: "mch_id"
                }, {
                    title: "商户订单号",
                    key: "out_trade_no",
                }, {
                    title: "微信支付订单号",
                    key: "transaction_id",
                }, {
                    title: "付款银行(其他)",
                    key: "bank_type",
                }, {
                    title: "交易类型",
                    key: "trade_type",
                }, {
                    title: "订单金额",
                    key: "total_fee",
                }, {
                    title: "货币类型(人民币)",
                    key: "fee_type",
                }, {
                    title: "支付完成时间",
                    key: "time_end",
                }, {
                    title: "商家数据包",
                    key: "attach",
                }, {
                    title: "商品描述",
                    key: "body",
                }, {
                    title: "1支付订单2退款订单",
                    key: "tran_type",
                }, {
                    title: "1未退款，2部分退款，3全部退款",
                    key: "tran_status",
                },
                {
                    title: "状态",
                    key: "action",
                    width: 150,
                    align: "center",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    disabled: true,
                                    props: {
                                        type: "primary",
                                        size: "small",
                                    },
                                    style: {
                                        marginRight: "5px",
                                    },

                                },
                                "已退款"
                            ),
                        ]);
                    },
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
            OutpaitentRefund({ id: hospitalId, page: i, limit: 10 }).then((res) => {
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