<template>
  <div class="addForm">
    <h3 class="title">修改科室信息</h3>
    <Form :model="formItem" :label-width="80">
      <FormItem label="科室id">
        <Input v-model="formItem.id" disabled></Input>
      </FormItem>
      <FormItem label="科室名称">
        <Input v-model="formItem.deptName"></Input>
      </FormItem>
      <FormItem label="科室类别">
        <Input v-model="formItem.deptClass"></Input>
      </FormItem>
      <FormItem label="二级科室">
        <Input v-model="formItem.isEndPoint"></Input>
      </FormItem>
      <FormItem label="科室编号">
        <Input v-model="formItem.deptId"></Input>
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
import { updatedepartment } from "@/utils/DataInteraction";
export default {
  data() {
    return {
      formItem: {
        id: "",
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
      updatedepartment(this.formItem).then((res) => {
        this.$Message.info("修改成功");
        this.$router.go(-1);
      });
    },
    goToBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.formItem = this.$route.query.data1;
  },
};
</script>
<style scoped>
.title {
  margin-bottom: 30px;
}
</style>