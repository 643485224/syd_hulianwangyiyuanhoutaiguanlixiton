<template>
    <div>
        <Table stripe :columns="columns1" :data="data1"></Table>
        <Page :total="total" class="margin30" :current="1" @on-change="chagesPage($event)" />
        <Modal v-model="isTshi" title="退款金额" @on-ok="ok" @on-cancel="cancel">
            <Input v-model="tkje" placeholder="请输入退款金额" style="width: 300px" @on-change="changeMount()" />
            <p v-if="isTrue">您输入的金额大于订单金额，请重新输入</p>
        </Modal>
    </div>
</template>
<script>
import { OutpaitentPayFun, refundFun } from "@/utils/DataInteraction";
import { hospitalId } from "../common.js"
export default {
    data() {
        return {
            columns1: [
                {
                    title: "科室ID",
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
                },
                {
                    title: "操作",
                    key: "action",
                    width: 150,
                    align: "center",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small",
                                    },
                                    style: {
                                        marginRight: "5px",
                                    },
                                    on: {
                                        click: () => {
                                            this.refund(params.index);
                                        },
                                    },
                                },
                                "退款"
                            ),
                        ]);
                    },
                },
            ],
            data1: [],
            total: 0,
            isTshi: false,
            indexInfo: 0,
            tkje: 0,
            isTrue:false,
        };
    },
    mounted() {
        this.getHospitalData(1);
    },
    methods: {
        getHospitalData(i) {
            OutpaitentPayFun({ id: hospitalId, page: i, limit: 10 }).then((res) => {
                this.data1 = res.data;
                this.total = res.total;
            });
        },
        chagesPage(e) {
            this.getHospitalData(e)
        },
        refund(index) {
            this.isTshi = true;
            this.indexInfo = index;

        },
        ok() {
            if (this.tkje > this.data1[this.indexInfo].total_fee) {
                this.isTrue=true;
                this.isTshi = true;
                this.tkje=0
            } else {
                refundFun({ out_trade_no: this.data1[this.indexInfo].out_trade_no, total_fee: this.data1[this.indexInfo].total_fee, refund_fee: this.tkje }).then((res) => {
                    this.data1.splice(this.indexInfo, 1);
                    this.$Message.info("已退款");
                });
            }

        },
        cancel() {
            this.isTshi = false;
        },
        changeMount() {
            if (this.tkje>this.data1[this.indexInfo].total_fee) {
                this.isTrue=true;
            }else{
                this.isTrue=false;
            }
        }
    },
};
</script>
<style scoped>
.margin30 {
    margin: 30px auto;
}
</style>