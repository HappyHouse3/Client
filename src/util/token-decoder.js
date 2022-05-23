import jwt_decode from "jwt-decode";

export default {
  decoder(token) {
    return jwt_decode.decode(token, "cos", (algorithm = "HS512"));
  },
};
