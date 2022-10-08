<template>
  <div class="addForm">
    <h3 class="title">新增科室信息</h3>
    <Form :model="formItem" :label-width="80">
      <FormItem label="科室名称">
        <Input
          v-model="formItem.deptName"
          placeholder="请输入科室名称"
        ></Input>
      </FormItem>
      <FormItem label="科室类别">
        <Input v-model="formItem.deptClass" placeholder="请输入科室类别"></Input>
      </FormItem>
      <FormItem label="二级科室">
        <Input
          v-model="formItem.isEndPoint"
          placeholder="请输入二级科室"
        ></Input>
      </FormItem>
      <FormItem label="科室编号">
        <Input
          v-model="formItem.deptId"
          placeholder="请输入科室编号"
        ></Input>
      </FormItem>
      <FormItem label="所属医院id">
        <Input v-model="formItem.hospitalId" disabled></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="submitHospital">提交</Button>
        <Button style="margin-left: 8px" @click="goToBack">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { adddepartment } from "@/utils/DataInteraction";
import {hospitalId} from "../common.js"
export default {
  data() {
    return {
      formItem: {
        deptName: "",
        deptClass: "",
        isEndPoint: "",
        deptId: "",
        hospitalId: 0,
      },
    };
  },
  methods: {
    submitHospital() {
      console.log(this.formItem);
      adddepartment(this.formItem).then((res) => {
        this.$Message.info("添加成功");
        this.$router.go(-1);
      });
    },
    goToBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.formItem.hospitalId=hospitalId
  },
};
</script>
<style scoped>
.title {
  margin-bottom: 30px;
}
</style>