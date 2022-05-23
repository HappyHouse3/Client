import jwt_decode from "jwt-decode";

export default {
  token: sessionStorage.getItem("access-token"),
  getRoleType() {
    return jwt_decode(this.token).roleType;
  },
  isAdmin() {
    console.log("프린트 롤타입");
    console.log(jwt_decode(this.token).roleType);
    let roleList = jwt_decode(this.token).roleType;
    return roleList.filter((item) => item == "ROLE_ADMIN").length != 0;
  },
};
