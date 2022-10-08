<template>
  <div class="addForm">
    <h3 class="title">新增医生信息</h3>
    <Form :model="formItem" :label-width="80">
      <FormItem label="医生职称代码 ">
        <Input
          v-model="formItem.doctorTitleCode"
          placeholder="请输入医生职称代码"
        ></Input>
      </FormItem>
      <FormItem label="医生名称">
        <Input
          v-model="formItem.doctorName"
          placeholder="请输入医生名称"
        ></Input>
      </FormItem>
      <FormItem label="科室编号">
        <Input v-model="formItem.deptId" placeholder="请输入科室编号"></Input>
      </FormItem>
      <FormItem label="医生职称">
        <Input
          v-model="formItem.doctorTitle"
          placeholder="请输入医生职称"
        ></Input>
      </FormItem>
      <FormItem label="医生照片">
        <Input @on-change="showImg($event)"  type="file"></Input>
        <img :src="imgUrl" alt="" srcset="">
      </FormItem>
      <FormItem>
        <Button type="primary" @click="submitHospital">提交</Button>
        <Button style="margin-left: 8px" @click="goToBack">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { adddoctor } from "@/utils/DataInteraction";
import { hospitalId } from "../common.js";
export default {
  data() {
    return {
      formItem: {
        doctorTitleCode: "",
        doctorName: "",
        deptId: "",
        doctorTitle: "",
        photo: 0,
      },
      imgUrl:''
    };
  },
  methods: {
    submitHospital() {
      let photo=this.imgUrl
      photo=photo.slice(22,photo.length-1)
      this.formItem.photo=photo
      console.log(photo)
      console.log(this.formItem.photo)
      adddoctor(this.formItem).then((res) => {
        this.$Message.info("添加成功");
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
    this.formItem.hospitalId = hospitalId;
  },
};
</script>
<style scoped>
.title {
  margin-bottom: 30px;
}
</style>