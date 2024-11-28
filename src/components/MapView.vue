<template>
  <div>
    <div class="map-console">
      <div ref="mapRef" class="map-window"></div>
      <div class="console-panel">
        <h3>添加多边形</h3>
        <div>
          <div class="menu-choice">
            <button
              @click="switchType('manual')"
              :class="{ active: selectedType === 'manual' }"
            >
              手动输入
            </button>
            <input type="file"
              @click="triggerFileInput('excel')"
              :class="{ active: selectedType === 'excel' }"
            >
              Excel导入
            </input>
          </div>

          <div
            v-for="(point, index) in points"
            :key="index"
            class="coordinate-input"
          >
            <input
              type="number"
              v-model.number="point.lng"
              placeholder="经度"
              step="0.000001"
            />
            <input
              type="number"
              v-model.number="point.lat"
              placeholder="纬度"
              step="0.000001"
            />
            <button
              :class="{ active: selectIndex === index }"
              @click="bindPoint(index)"
            >
              点选
            </button>
          </div>
          <button @click="addRow">增加行</button>
          <button @click="addPolygonFromInput">添加多边形</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  var map = new BMapGL.Map('container');
var point = new BMapGL.Point(116.404, 39.915);
map.centerAndZoom(point, 15);
map.enableScrollWheelZoom(true);

// 绘制点
var marker = new BMapGL.Marker(point);
map.addOverlay(marker);

// 绘制面
var polygon = new BMapGL.Polygon([
    new BMapGL.Point(116.387112, 39.920977),
    new BMapGL.Point(116.385243, 39.913063),
    new BMapGL.Point(116.394226, 39.917988),
    new BMapGL.Point(116.401772, 39.921364),
    new BMapGL.Point(116.41248, 39.927893)
], {
    strokeColor: 'blue',
    strokeWeight: 2,
    strokeOpacity: 0.5
});
map.addOverlay(polygon);

// 绘制线
var polyline = new BMapGL.Polyline([
    new BMapGL.Point(116.399, 39.910),
    new BMapGL.Point(116.405, 39.920),
    new BMapGL.Point(116.423493, 39.907445)
], {
    strokeColor: 'blue',
    strokeWeight: 2,
    strokeOpacity: 0.5
});
map.addOverlay(polyline);

// 绘制圆
var circle = new BMapGL.Circle(new BMapGL.Point(116.404, 39.915), 500, {
    strokeColor: 'blue',
    strokeWeight: 2,
    strokeOpacity: 0.5
});
map.addOverlay(circle);

// 批量绑定事件
var clickEvts = ['click', 'dblclick', 'rightclick'];
var moveEvts = ['mouseover', 'mouseout'];
var overlays = [marker, polyline, polygon, circle];

for (let i = 0; i < clickEvts.length; i++) {
    const event = clickEvts[i];
    for (let j = 0; j < overlays.length; j++) {
        const overlay = overlays[j];
        overlay.addEventListener(event, e => {
            switch (event) {
                case 'click':
                    var res = overlay.toString() +  '被单击!';
                    break;
                case 'dbclick':
                    var res = overlay.toString() + '被双击!';
                    break;
                case 'rightclick':
                    var res = overlay.toString() + '被右击!';
            }
            alert(res);
        });
    }
}
for (let i = 0; i < moveEvts.length; i++) {
    const event = moveEvts[i];
    for (let j = 1; j < overlays.length; j++) {
        const overlay = overlays[j];
        overlay.addEventListener(event, e => {
            switch (event) {
                case 'mouseover':
                    overlay.setFillColor('#6f6cd8')
                    break;
                case 'mouseout':
                    overlay.setFillColor('#fff');
                    break;
            }
        });
    }
}
}


</script>

<style scoped>
.map-window {
  width: 80%;
  height: 450px;
  position: relative;
}

.map-console {
  display: flex;
}

.console-panel {
  margin-left: 20px;
}

.coordinate-input {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

input[type="number"] {
  width: 100px;
}

button.active {
  background-color: #4caf50; /* 选中时的背景颜色 */
  color: white;
}

.menu-choice {
  display: flex;
}

.menu-choice button {
  margin: auto;
}

.menu-choice button .active {
  background-color: #4caf50;
  color: white;
}
</style>
