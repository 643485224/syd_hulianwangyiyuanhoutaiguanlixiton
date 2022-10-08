<template>
  <div>
    <Table stripe :columns="columns1" :data="data1" class="margin30"></Table>
    <Page :total="total" class="margin30" :current="1" @on-change="chagesPage($event)"/>
  </div>
</template>
<script>
import { hospitalInfo } from "@/utils/DataInteraction";
import {pathTo,hospitalId} from "./common.js"
export default {
  data() {
    return {
      columns1: [
        {
          title: "医院ID",
          key: "id",
        },
        {
          title: "医院编号",
          key: "hospitalId",
        },
        {
          title: "医院名称",
          key: "hospitalName",
        },
        {
          title: "医院简介",
          key: "shortName",
        },
        {
          title: "医院别名",
          key: "otherName",
        },
        {
          title: "医院位置",
          key: "location",
        },
        {
          title: "Action",
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
                      this.chooseHospitalInf(params.index);
                    },
                  },
                },
                "选择"
              ),
            ]);
          },
        },
      ],
      data1: [],
      total: 0,
      isTshi: false,
      indexInfo: 0,
      current:1,
    };
  },
  mounted() {
    this.getHospitalData(1);
  },
  methods: {
    getHospitalData(i) {
      hospitalInfo({ page: i, limit: 10 }).then((res) => {
        this.data1 = res.data;
        this.total = res.total;
      });
    },
    chooseHospitalInf(index){
        pathTo=this.$route.query.data1.address
        hospitalId=this.data1[index].id
        if(this.$route.query.data1.name=='医生管理'){
          this.$router.push("/home/Choosedepartment");
        }else{
            var pathTos="/home/" + pathTo;
            this.$router.push(pathTos);
        }

    },
    chagesPage(e){
      this.getHospitalData(e)
    }
  },
};
</script>
<style scoped>
.margin30 {
  margin-top: 30px;
}
</style>