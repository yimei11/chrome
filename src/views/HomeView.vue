<template>
  <div class="home">
    <div class="box">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="input"
      ></el-input>
      <div class="list">
        <dl v-for="(item, index) in datas" :key="index">
          <dt>{{ index }}</dt>
          <dd v-for="(i, n) in item" :key="n">
            {{ i }} <i class="el-icon-error" @click="del(n, index)"></i>
          </dd>
          <i class="el-icon-circle-plus" @click="add"></i>
        </dl>
      </div>
      <el-button type="text" @click="open">点击打开 Message Box</el-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import instance from "../api/index.js";

export default {
  name: "HomeView",
  data() {
    return {
      input: "",
      datas: null,
    };
  },
  methods: {
    async getdata() {
      let { data } = await instance.get("/classify");
      this.datas = data;
    },
    // 删除按钮
    async del(i, n) {
      let { data } = await instance.delete("/classify/" + i, {
        data: { value: n },
      });
      // console.log(data);
      this.datas = data;
    },
    // 添加
    add() {},
    open() {
      this.$prompt("请输入邮箱", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern:
          /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: "邮箱格式不正确",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的邮箱是:" + value,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
  },
  created() {
    this.getdata();
  },
};
</script>
<style scoped>
.box {
  width: 1200px;
  margin: 100px auto;
  padding: 30px;
  box-sizing: border-box;
}
.el-input {
  width: 600px;
}
.list {
  width: 100%;
  border: 1px solid #ccc;
  margin-top: 20px;
  padding: 0 20px;
  box-sizing: border-box;
}
.list dl {
  display: flex;
  align-items: center;
  margin: 10px 0 5px;
  position: relative;
}
.list dl > i {
  position: absolute;
  right: 0;
}
.list dl dt {
  width: 50px;
  margin-right: 10px;
  color: turquoise;
}
.list dl dd {
  width: 90px;
  margin-right: 20px;
  text-align: left;
  position: relative;
}
.list dl dd i {
  position: absolute;
  top: -5px;
  right: 15px;
  color: red;
  display: none;
}
.list dl dd:hover i {
  display: block;
}
</style>
