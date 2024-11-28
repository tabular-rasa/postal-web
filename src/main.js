import { createApp } from "vue";
import App from "./App.vue";
import Vue3BaiduMapGL from "vue3-baidu-map-gl";
const app = createApp(App);
app.use(Vue3BaiduMapGL, {
  ak: "AyQ4ucXrNlAKYUdyUf0mRTcdCxNuBNNf",
});
app.mount("#app");
