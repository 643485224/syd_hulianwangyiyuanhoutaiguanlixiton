<template>
  <div>
    <Table stripe :columns="columns1" :data="data1" class="margin30"></Table>
    <Page :total="total" class="margin30" :current="1" @on-change="chagesPage($event)" />
  </div>
</template>
<script>
import { departmentInfo } from "@/utils/DataInteraction";
import {pathTo,hospitalId,departmentId} from "./common.js"
export default {
  data() {
    return {
      columns1: [
        {
          title: "科室ID",
          key: "id",
        },
        {
          title: "科室名称",
          key: "deptName",
        },
        {
          title: "科室类别",
          key: "deptClass",
        },
        {
          title: "是否有子节点",
          key: "isEndPoint",
        },
        {
          title: "科室编号",
          key: "deptId",
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
    };
  },
  mounted() {
    this.getHospitalData(1);
  },
  methods: {
    getHospitalData(i) {
        console.log(i)
      departmentInfo({ id: hospitalId, page: i, limit: 10  }).then((res) => {
        this.data1 = res.data;
        this.total = res.total;
      });
    },
    chooseHospitalInf(index){
        departmentId=this.data1[index].id
        console.log(pathTo)
        var pathTos="/home/" + pathTo;
        console.log(hospitalId)
        this.$router.push(pathTos);
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