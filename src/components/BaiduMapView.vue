<template>
  <button
    type="button"
    class="styled-button"
    v-if="!polygon.isDrawing"
    @click="polygon.toggle"
  >
    添加区域
  </button>
  <button
    type="button"
    class="styled-button"
    v-else="polygon.isDrawing"
    @click="polygon.toggle"
  >
    关闭添加
  </button>
  <button
    type="button"
    :class="{ 'styled-button': true, active: isDeleteAreaActive }"
    @click="deleteArea"
  >
    删除区域
  </button>

  <div class="map-wrapper">
    <div class="map-item">
      <BMap
        :center="{ lng: 120.0267003252203, lat: 31.784177543847555 }"
        :zoom="16"
        enable-scroll-wheel-zoom
        @initd="handleInitd"
      >
      </BMap>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaiduMapView",
};
</script>

<script setup>
import { ref, onMounted } from "vue";
import { BMap } from "vue3-baidu-map-gl";
import postal from "../../api/postal";

let polygon = ref({
  instance: null,
  isDrawing: false,
  toggle() {
    let _polygon = polygon.value;
    _polygon.isDrawing
      ? _polygon.instance.closeAll()
      : _polygon.instance.open();
    _polygon.isDrawing = !_polygon.isDrawing;
  },
});

let overlayers = ref([]);

let isDeleteAreaActive = ref(false);

function deleteArea() {
  isDeleteAreaActive.value = !isDeleteAreaActive.value;
}
function addArea(name, points, color) {
  var obj = {};
  obj.name = name;
  obj.points = points;
  obj.color = color;
  return obj;
}

// 地图初始化
function handleInitd({ map }) {
  import("bmap-draw").then(({ DrawScene, PolygonDraw, OperateEventType }) => {
    const scene = new DrawScene(map);
    // 监听 CLICK 事件
    scene.addEventListener(OperateEventType.COMPLETE, (event) => {
      let pointArray = event.target.overlay._userPoints;
      let newOverlay = event.target.overlay;
      overlayers.value.push(newOverlay);
      // 选择面
      newOverlay.addEventListener("click", (e) => {
        var res = newOverlay.toString() + "被单击!";
        if (isDeleteAreaActive.value) {
          map.removeOverlay(e.target);
        }
        alert(res);
      });
      newOverlay.addEventListener("mouseover", (e) => {
        newOverlay.setFillColor("#6f6cd8");
      });
      newOverlay.addEventListener("mouseout", (e) => {
        newOverlay.setFillColor("#fff");
      });
      var newPointsArray = [];
      pointArray.forEach((element) => {
        newPointsArray.push({
          lng: element.latLng.lng,
          lat: element.latLng.lat,
        });
      });

      let newArea = {
        areaPosition: JSON.stringify(newPointsArray),
        markColor: "#877efb",
      };
      postal.addMap(newArea);
    });
    // 多边形绘制
    polygon.value.instance = new PolygonDraw(scene, {
      isOpen: false,
      labelOptions: {
        borderRadius: "2px",
        background: "#b5d3fb",
        border: "1px solid #b5d3fb",
        color: "#333",
        fontSize: "12px",
        letterSpacing: "0",
        padding: "5px",
      },
      baseOpts: {
        fillColor: "#fff",
        strokeWeight: 5,
        strokeOpacity: 1,
      },
    });
    // 绘制面
    overlayers.value.forEach((overlay) => {
      map.addOverlay(overlay);
      overlay.addEventListener("click", (e) => {
        var res = e.target._config.polygonName + "被单击!";
        // 删除覆盖面
        if (isDeleteAreaActive.value) {
          map.removeOverlay(e.target._config.polygonName);
        }
        alert(res);
      });
      overlay.addEventListener("mouseover", (e) => {
        overlay.setFillColor("#6f6cd8");
      });
      overlay.addEventListener("mouseout", (e) => {
        overlay.setFillColor("#fff");
      });
    });
  });
}

// 预加载区域 从数据库中获取预存数据
const loadMap = () => {
  postal.loadMap().then((res) => {
    res.data.forEach((area) => {
      // console.log(area.areaPosition);
      const pointsArray = JSON.parse(area.areaPosition);
      var overlay = [];
      pointsArray.forEach((point) => {
        overlay.push(new BMapGL.Point(point.lng, point.lat));
      });
      var polygon = new BMapGL.Polygon(overlay, {
        strokeColor: area.markColor,
        strokeWeight: 5,
        strokeOpacity: 1,
        polygonName: area.areaName,
      });
      overlayers.value.push(polygon);
    });
  });
};
onMounted(() => {
  loadMap();
});
</script>

<style scoped>
.map-wrapper {
  width: 100%;
  height: 80vh;
}
.styled-button {
  background-color: #e0e0e0; /* 初始淡色背景 */
  border: none;
  color: black;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.styled-button.active {
  background-color: #4caf50; /* 选中时的深色背景 */
  color: white;
}
</style>
