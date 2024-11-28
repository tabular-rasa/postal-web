const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 就是下面的配置搞上就行了

  publicPath: "/",
  devServer: {
    proxy: {
      "/api": {
        // /api表示拦截以/api开头的请求
        target: "http://127.0.0.1:8060", //跨域的域名
        changeOrigin: true, //是否开启跨域
        pathRewrite: {
          //重写路径
          "^/api": "", //把/api变为空字符
        },

      },
    },
    port: 8070,
  },
});
