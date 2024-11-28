import axios from "axios";

export default {
  // 加载区域
  loadMap: () => {
    return axios
      .request({
        url: "api/postal/getAreas",
        method: "get",
      })
      .then((res) => {
        return res.data;
      });
  },
  addMap: (data) => {
    return axios
      .request({
        url: "api/postal/addArea",
        method: "post",
        data: data,
      })
      .then((res) => {
        return res.data;
      });
  },
};
