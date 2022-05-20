import axios from "axios";

// axios 객체 생성
export default axios.create({
  baseURL: "https://dapi.kakao.com/v2/local/search",
  headers: {
    Authorization: "KakaoAK c4ba1ba2c1e6e86282071c520d88e0a4",
    "Content-type": "application/json",
  },
});
