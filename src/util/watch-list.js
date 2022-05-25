import http from "@/util/http-common";
import jwt_decode from "jwt-decode";

let token = sessionStorage.getItem("access-token");
let loginUserInfo = jwt_decode(this.token);
let userNo = loginUserInfo.userNo;

function getWatchList() {
  if (token) {
    http
      .get(`/user/${userNo}/watchlist`)
      .then(({ data }) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log("로그인 해주세요");
  }
}

function addWatchList(aptCode) {
  if (token) {
    http
      .post(`/user/${userNo}/watchlist`, {
        aptCode: this.aptCode,
      })
      .then(() => {
        console.log("왓치리스트 추가 성공");
      })
      .catch((error) => {
        console.log("왓치리스트 삭제 실패");
        console.log(error);
      });
  } else {
    console.log("로그인 해주세요");
  }
}

function deleteWatchList(watchListId) {
  if (token) {
    http
      .delete(`/user/${userNo}/watchlist/${watchListId}`)
      .then(() => {
        console.log("왓치리스트 삭제 성공");
      })
      .catch((error) => {
        console.log("왓치리스트 삭제 실패");
        console.log(error);
      });
  } else {
    console.log("로그인 해주세요");
  }
}

export default {
  http
        .post(`/qna/${boardid}/reply`, {
          content: this.replycontent,
          userNo: tokenDecoder.decode(this.token).userNo,
        })
        .then((response) => {
          console.log(response.data);
          console.log("댓글작성 성공");
        })
        .then(() => {
          http
            .get("/qna")
            .then((response) => {
              console.log(response.data);
              this.qnaList = response.data;
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
};
