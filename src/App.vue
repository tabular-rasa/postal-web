<template>
  <BaiduMapView />
</template>

<script>
// import MapView from "./components/MapView.vue";
import BaiduMapView from "./components/BaiduMapView.vue";
export default {
  name: "App",
  components: {
    BaiduMapView,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
