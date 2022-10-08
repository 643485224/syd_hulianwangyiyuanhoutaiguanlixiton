<template>
  <div>
    <Button style="margin-right: 10px" @click="goToBack">返回</Button>
    <Button type="primary" icon="md-add" @click="addData">新增</Button>
    <Table stripe :columns="columns1" :data="data1" class="margin30"></Table>
    <Page :total="total" class="margin30" :current="1" @on-change="chagesPage($event)"/>
    <Modal v-model="isTshi" title="温馨提示！" @on-ok="ok" @on-cancel="cancel">
      <p>确定要删除本条记录吗？</p>
    </Modal>
  </div>
</template>
<script>
import { departmentInfo,deletedepartment } from "@/utils/DataInteraction";
import {hospitalId} from "../common.js"
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
                      this.editData(params.index);
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
                      this.removeData(params.index);
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
    this.getData(1);
  },
  methods: {
    getData(i) {
      departmentInfo({id: hospitalId, page: i, limit: 10 }).then((res) => {
        this.data1 = res.data;
        this.total = res.total;
      });
    },
    removeData(index) {
      this.isTshi = true;
      this.indexInfo = index;
    },
    addData() {
      this.$router.push("/home/adddepartment");
    },
    editData(index) {
      this.$router.push({ path: "/home/editdepartment", query: {data1:this.data1[index]} });
    },
    ok() {
      deletedepartment({id:this.data1[this.indexInfo].id}).then((res)=>{
        this.data1.splice(this.indexInfo, 1);
        this.$Message.info("已删除");
      })
    },
    cancel() {
      this.isTshi = false;
    },
    goToBack(){
        this.$router.go(-1)
    },
    chagesPage(e){
        console.log(e)
        this.getData(e);
    }
  },
};
</script>
<style scoped>
.margin30 {
  margin-top: 30px;
}
</style>