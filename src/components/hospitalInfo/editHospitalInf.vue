<template>
  <div class="addForm">
    <h3 class="title">修改医院信息</h3>
    <Form :model="formItem" :label-width="80">
      <FormItem label="医院ID">
        <Input v-model="formItem.id" disabled></Input>
      </FormItem>
      <FormItem label="医院编号">
        <Input v-model="formItem.hospitalId" placeholder="请输入医院编号"></Input>
      </FormItem>
      <FormItem label="医院位置">
        <Input v-model="formItem.location" placeholder="请输入医院位置"></Input>
      </FormItem>
      <FormItem label="医院名称">
        <Input
          v-model="formItem.hospitalName"
          placeholder="请输入医院名称"
        ></Input>
      </FormItem>
      <FormItem label="医院别名">
        <Input
          v-model="formItem.otherName"
          placeholder="请输入医院别名"
        ></Input>
      </FormItem>
      <FormItem label="医院简介">
        <Input
          v-model="formItem.shortName"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          placeholder="请输入医院简介"
        ></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="submitHospital">提交</Button>
        <Button style="margin-left: 8px" @click="goToBack">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import {upadtehospitalInfo} from '@/utils/DataInteraction'
export default {
  data() {
    return {
      formItem: {
        hospitalId: "",
        location: "",
        hospitalName: "",
        otherName: "",
        shortName: "",
      },
    };
  },
  methods:{
    submitHospital(){
        console.log(this.formItem)
        upadtehospitalInfo(this.formItem).then((res)=>{
            this.$Message.info("修改成功");
            this.$router.go(-1)
        })
    },
    goToBack(){
        this.$router.go(-1)
    },
  },
  mounted(){
    this.formItem=this.$route.query.data1
  }
};
</script>
<style scoped>
.title{
    margin-bottom: 30px;
}
</style>