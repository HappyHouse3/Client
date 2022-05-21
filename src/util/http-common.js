import axios from "axios";

// axios 객체 생성
export default axios.create({
  // baseURL: "http://localhost:9999/api",
  baseURL: "http://220.81.18.197:9999/api",
  headers: {
    "Content-type": "application/json",
  },
});
