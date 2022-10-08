<template>
  <div class="addForm">
    <h3 class="title">修改医生信息</h3>
    <Form :model="formItem" :label-width="80">
      <FormItem label="医生Id">
        <Input v-model="formItem.id" disabled></Input>
      </FormItem>
      <FormItem label="医生职称代码">
        <Input v-model="formItem.doctorTitleCode"></Input>
      </FormItem>
      <FormItem label="医生名称">
        <Input v-model="formItem.doctorName"></Input>
      </FormItem>
      <FormItem label="科室编号">
        <Input v-model="formItem.deptId"></Input>
      </FormItem>
      <FormItem label="医生职称">
        <Input v-model="formItem.doctorTitle"></Input>
      </FormItem>
      <FormItem label="医生职照">
        <Input @on-change="showImg($event)"  type="file"></Input>
        <img :src="imgUrl"> 
      </FormItem>
      <FormItem>
        <Button type="primary" @click="submitHospital">提交</Button>
        <Button style="margin-left: 8px" @click="goToBack">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { updatedoctor } from "@/utils/DataInteraction";
export default {
  data() {
    return {
      formItem: {
        id: "",
        doctorTitleCode: "",
        doctorName: "",
        deptId: "",
        doctorTitle: "",
        photo:'',
      },
      imgUrl:''
    };
  },
  methods: {
    submitHospital() {
      let photo=this.imgUrl
      photo=photo.slice(22,photo.length-1)
      this.formItem.photo=photo
      console.log(this.formItem);
      updatedoctor(this.formItem).then((res) => {
        this.$Message.info("修改成功");
        this.$router.go(-1);
      });
    },
    goToBack() {
      this.$router.go(-1);
    },
    showImg(e) {
      let that = this;//改变this指向
      let files = e.target.files[0];//图片文件名
      if (!e || !window.FileReader) return; // 看是否支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(files); // 关键一步，在这里转换的
      reader.onloadend = function () {
        that.imgUrl = this.result;//赋值
      }
      
    }
  },
  mounted() {
    this.formItem = this.$route.query.data1;
    this.imgUrl='data:image/png;base64,' +this.$route.query.data1.photo
  },
};
</script>
<style scoped>
.title {
  margin-bottom: 30px;
}
</style>