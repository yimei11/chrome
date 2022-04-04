const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {      // 代理
      "/api": {
        target: "http://127.0.0.3:3000",
        changeOrigin: true,   // 允许跨域
        pathRewrite: {
          "/api": ""
        }
      }
    }
  }
});
