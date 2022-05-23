<template>
  <form v-if="token">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">나의 정보</h4>
        <p class="category">수정할 정보를 입력하세요</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>닉네임</label>
              <md-input v-model="nickName" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>이메일</label>
              <md-input v-model="email" type="email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>아이디</label>
              <md-input v-model="userId" type="text" readonly></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>비밀번호</label>
              <md-input v-model="password" type="text"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>거주 지역</label>

              <select v-model="city" style="margin: 50px 0px 20px 0px">
                <option>서울특별시</option>
                <option>부산광역시</option>
                <option>대구광역시</option>
                <option>인천광역시</option>
                <option>광주광역시</option>
                <option>대전광역시</option>
                <option>울산광역시</option>
                <option>세종특별자치시</option>
                <option>경기도</option>
                <option>강원도</option>
                <option>충청북도</option>
                <option>충청남도</option>
                <option>전라북도</option>
                <option>전라남도</option>
                <option>경상북도</option>
                <option>경상남도</option>
                <option>제주특별자치도</option>
              </select>
            </md-field>
          </div>

          <div class="md-layout-item md-size-100 text-right">
            <md-button
              class="md-raised md-success"
              style="margin-right: 20px"
              @click="withDrawal"
              >회원탈퇴</md-button
            >
            <md-button class="md-raised md-success" @click="onSubmit2"
              >정보수정</md-button
            >
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
  <form v-else>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">회원가입</h4>
        <p class="category">회원가입 폼을 입력하세요</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>닉네임</label>
              <md-input v-model="nickName" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>이메일</label>
              <md-input v-model="email" type="email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>아이디</label>
              <md-input v-model="userId" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>비밀번호</label>
              <md-input v-model="password" type="text"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>거주 지역</label>

              <select v-model="city" style="margin: 50px 0px 20px 0px">
                <option>서울특별시</option>
                <option>부산광역시</option>
                <option>대구광역시</option>
                <option>인천광역시</option>
                <option>광주광역시</option>
                <option>대전광역시</option>
                <option>울산광역시</option>
                <option>세종특별자치시</option>
                <option>경기도</option>
                <option>강원도</option>
                <option>충청북도</option>
                <option>충청남도</option>
                <option>전라북도</option>
                <option>전라남도</option>
                <option>경상북도</option>
                <option>경상남도</option>
                <option>제주특별자치도</option>
              </select>
            </md-field>
          </div>

          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" @click="onSubmit"
              >회원가입</md-button
            >
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import http from "@/util/http-common";
import tokenDecoder from "@/util/token-decoder";
export default {
  name: "edit-profile-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      userNo: null,
      userId: null,
      password: null,
      nickName: null,
      email: null,
      city: null,
      token: null,
    };
  },
  created() {
    this.token = sessionStorage.getItem("access-token");
    this.initData(tokenDecoder.decode(this.token));
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      console.log("click!");

      let err = true;
      let msg = "";
      !this.nickName && ((msg = "작성자 입력해주세요"), (err = false));

      if (!err) alert(msg);
      else {
        this.registMember();
      }
    },
    onSubmit2(event) {
      event.preventDefault();
      console.log("click!");

      let err = true;
      let msg = "";
      !this.password && ((msg = "비밀번호를 입력해주세요"), (err = false));

      if (!err) alert(msg);
      else {
        this.updateMember();
      }
    },
    withDrawal() {
      http
        .delete(`/user/${this.userNo}`)
        .then(({ data }) => {
          sessionStorage.removeItem("access-token");
          alert("회원 탈퇴가 완료되었습니다.");
          location.href = "/";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    registMember() {
      http
        .post(`/signup`, {
          nickName: this.nickName,
          email: this.email,
          userId: this.userId,
          password: this.password,
          sidoName: this.city,
        })
        .then(({ data }) => {
          alert("등록이 완료되었습니다.");
          location.href = "./login";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateMember() {
      http
        .put(`/user/${this.userNo}`, {
          nickName: this.nickName,
          email: this.email,
          password: this.password,
          sidoName: this.city,
        })
        .then(({ data }) => {
          sessionStorage.setItem("access-token", data.token);
          alert("수정이 완료되었습니다.");
          location.href = "./user";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    initData(payload) {
      this.userNo = payload.userNo;
      http
        .get(`/user/${this.userNo}`)
        .then(({ data }) => {
          this.userId = data.userId;
          this.password = data.password;
          this.nickName = data.nickName;
          this.email = data.email;
          this.city = data.sidoName;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style></style>
