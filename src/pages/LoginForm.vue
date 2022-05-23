<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">로그인</h4>
        <p class="category">로그인 정보를 입력하세요</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-70">
            <md-field>
              <label>아이디</label>
              <md-input v-model="userid" type="text"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-70">
            <md-field>
              <label>비밀번호</label>
              <md-input v-model="password" type="text"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" @click="onSubmit"
              >로그인</md-button
            >
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import axios from "axios";
export default {
  name: "login-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      userid: null,
      password: null,
    };
  },

  methods: {
    onSubmit(event) {
      event.preventDefault();
      console.log("click!");

      let err = true;
      let msg = "";
      !this.userid && ((msg = "아이디를 입력해주세요"), (err = false));

      if (!err) alert(msg);
      else {
        this.registMember();
      }
    },
    registMember() {
      axios
        .post(`http://220.81.18.197:9999/login`, {
          userId: this.userid,
          password: this.password,
        })
        .then(({ data }) => {
          console.log(data);
          alert("로그인 성공했습니다.");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style></style>
