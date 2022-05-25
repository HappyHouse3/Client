import axios from "axios";

// axios 객체 생성
export default axios.create({
  baseURL: "https://dapi.kakao.com/v2/local/search",
  headers: {
    Authorization: "KakaoAK 6192592825fac8bebe29a0b5132db1f4",
    "Content-type": "application/json",
  },
});
