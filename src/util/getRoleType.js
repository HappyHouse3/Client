import jwt_decode from "jwt-decode";

export default {
  getRoleType(token) {
    return jwt_decode(token).roleType;
  },
  isAdmin() {
    return jwt_decode(token).roleType.find("ROLE_ADMIN") !== undefined;
  },
};
