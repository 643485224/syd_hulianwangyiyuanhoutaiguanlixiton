<template>
  <div>
    <Button type="primary" icon="md-add" @click="addHospitalInf">新增</Button>
    <Table stripe :columns="columns1" :data="data1" class="margin30"></Table>
    <Page :total="total" class="margin30" :current="1" @on-change="chagesPage($event)"/>
    <Modal v-model="isTshi" title="温馨提示！" @on-ok="ok" @on-cancel="cancel">
      <p>确定要删除本条记录吗？</p>
    </Modal>
  </div>
</template>
<script>
import { hospitalInfo,deletehospitalInfo } from "@/utils/DataInteraction";
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
                      this.editHospitalInf(params.index);
                    },
                  },
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.removeHospitalData(params.index);
                    },
                  },
                },
                "删除"
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
      hospitalInfo({ page: i, limit: 10 }).then((res) => {
        this.data1 = res.data;
        this.total = res.total;
      });
    },
    removeHospitalData(index) {
      this.isTshi = true;
      this.indexInfo = index;
    },
    addHospitalInf() {
      this.$router.push("/home/addhospital");
    },
    editHospitalInf(index) {
      this.$router.push({ path: "/home/edithospital", query: {data1:this.data1[index]} });
    },
    ok() {
      deletehospitalInfo({id:this.data1[this.indexInfo].id}).then((res)=>{
        this.data1.splice(this.indexInfo, 1);
        this.$Message.info("已删除");
      })
    },
    cancel() {
      this.isTshi = false;
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