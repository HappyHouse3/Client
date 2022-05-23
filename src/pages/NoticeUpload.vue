<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">공지사항 글쓰기</h4>
            <p class="category">공지사항 글을 작성해주세요.</p>
          </md-card-header>
          <md-card-content style="display: table-caption">
            <form>
              <input
                id="subject"
                type="text"
                required
                placeholder="제목을 입력하세요"
                v-model="title"
              />

              <textarea
                id="content"
                placeholder="내용을 입력하세요"
                rows="10"
                max-rows="15"
                v-model="content"
              ></textarea>

              <button
                type="submit"
                variant="primary"
                class="m-1"
                @click="onSubmit"
              >
                글작성
              </button>
              <button type="reset" variant="danger" class="m-1">취소</button>
            </form>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/util/http-common";
import tokenDecoder from "@/util/token-decoder";

export default {
  data() {
    return {
      title: null,
      content: null,
      userId: null,
      token: null,
    };
  },
  created() {
    this.token = sessionStorage.getItem("access-token");
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      console.log("click!");

      let err = true;
      let msg = "";
      !this.title && ((msg = "제목을 입력해주세요"), (err = false));
      !this.content && ((msg = "내용을 입력해주세요"), (err = false));

      if (!err) alert(msg);
      else {
        this.uploadNotice();
      }
    },
    uploadNotice() {
      http
        .post(`/notice`, {
          content: this.content,
          title: this.title,
          userNo: tokenDecoder.decode(this.token).userNo,
        })
        .then(({ data }) => {
          alert("공지사항 등록이 완료되었습니다.");
          location.href = "../notice";
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
