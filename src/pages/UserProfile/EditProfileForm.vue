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
              <md-input v-model="password" type="password"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>거주 지역</label>

              <select v-model="city" style="margin: 50px 0px 20px 0px">
                <option
                  v-for="(item, idx) in cities"
                  :value="item.sidoCode"
                  :key="idx"
                  :selected="city === item.sidoCode"
                >
                  {{ item.sidoName }}
                </option>
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
              <md-input v-model="password" type="password"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>거주 지역</label>

              <select v-model="city" style="margin: 50px 0px 20px 0px">
                <option
                  v-for="(item, idx) in cities"
                  :value="item.sidoCode"
                  :key="idx"
                  :selected="city === item.sidoCode"
                >
                  {{ item.sidoName }}
                </option>
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
      cities: [],
    };
  },
  created() {
    this.token = sessionStorage.getItem("access-token");
    this.getRequestData();
    if (this.token) {
      this.initData(tokenDecoder.decode(this.token));
    }

    console.log(this.cities);
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
    getRequestData() {
      http
        .get(`/signup`)
        .then(({ data }) => {
          this.cities = data;
          this.$forceUpdate;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async registMember() {
      console.log({
        nickName: this.nickName,
        email: this.email,
        userId: this.userId,
        password: this.password,
        sidoCode: this.city,
      });
      await http
        .post(`/signup`, {
          nickName: this.nickName,
          email: this.email,
          userId: this.userId,
          password: this.password,
          sidoCode: this.city,
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
          sidoCode: this.city,
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
    async initData(payload) {
      console.log();
      this.userNo = payload.userNo;
      await http
        .get(`/user/${this.userNo}`)
        .then(({ data }) => {
          this.userId = data.userId;
          this.password = data.password;
          this.nickName = data.nickName;
          this.email = data.email;
          this.city = data.sidoCode;
          console.log("data");
          console.log(data);
          console.log(data.sidoCode);
          console.log(this.city);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style></style>
