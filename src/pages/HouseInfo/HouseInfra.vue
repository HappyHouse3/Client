<template>
  <b-container class="py-2" style="display: block">
    <b-card
      border-variant="$gray-700"
      header-bg-variant="$gray-700"
      header-border-variant="$gray-700"
      header-text-variant="black"
      header="인프라 지수"
      align="center"
      class="mb-4"
    >
      <b-card-text>
        <h1 class="font-weight-bold m-0">{{ avgScore }}</h1>
        <b-form-rating
          v-model="avgScore"
          readonly
          no-border
          variant="warning"
          inline
          size="lg"
          class="p-0 bg-transparent"
        ></b-form-rating>
      </b-card-text>
    </b-card>
    <b-row class="px-3 pb-3" align-h="end">
      <b-button @click="allOpen" size="sm" variant="secondary" pill>{{
        openStr
      }}</b-button>
    </b-row>
    <b-card
      no-body
      class="mb-3"
      v-for="(item, index) in categoryScore"
      :key="index"
    >
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle="'collapse-' + index" variant="light"
          ><b-row class="px-2" align-v="center">
            <b-col class="text-left p-0" style="margin-right: 15px">
              <h6 class="mb-0 pl-2 font-weight-bolder text-left">
                <b-icon :icon="icon[index]"></b-icon>
                {{ category[index] }}
              </h6>
            </b-col>
            <b-col class="text-right p-0">
              <b-form-rating
                id="rating-readonly"
                :value="item"
                readonly
                no-border
                variant="warning"
                inline
                size="sm"
                class="p-0 bg-transparent"
              ></b-form-rating>
            </b-col> </b-row
        ></b-button>
      </b-card-header>
      <b-collapse
        :id="'collapse-' + index"
        :visible="visible[index]"
        role="tabpanel"
      >
        <b-card-body>
          <b-row class="px-2">
            <h6
              v-if="selectCategory(index).length == 0"
              class="p-0 my-1 mx-auto"
              style="color: dimgrey"
            >
              <b-icon-emoji-expressionless></b-icon-emoji-expressionless>
              근처에서 {{ category[index] }}시설을 찾지 못했습니다.
            </h6>
            <h6
              class="p-0 my-1"
              style="color: dimgrey"
              v-for="(item, idx) in selectCategory(index)"
              :key="idx"
            >
              <b-badge variant="light" style="color: red; font-size: 0.5rem"
                >{{ item.distance }}m</b-badge
              >거리에
              <b-badge
                variant="light"
                style="color: green; font-size: 0.5rem"
                >{{ item.place_name }}</b-badge
              >이(가) 있어요
            </h6>
          </b-row>
        </b-card-body>
      </b-collapse>
    </b-card>
  </b-container>
</template>
<script>
import axios from "axios";

const API_URL = "https://dapi.kakao.com/v2/local/search/category.json";
const API_KEY = "6192592825fac8bebe29a0b5132db1f4";
export default {
  props: {
    curHouseInfo: {
      default: null,
    },
    map: {
      map: Map,
      default: "",
    },
  },
  data() {
    return {
      radius: 500,
      visible: [false, false, false, false, false, false],
      category: ["편의", "교육", "교통", "의료", "카페", "문화"],
      categoryScore: [1, 1, 1, 1, 1, 1],
      allVisible: false,
      openStr: "모두 펼치기",
      icon: [
        "cart",
        "book",
        "stoplights",
        "clipboard-plus",
        "cup",
        "controller",
      ],
      conveniences: [],
      educations: [],
      traffics: [],
      medicals: [],
      cafes: [],
      cultures: [],
      payload: null,
      avgScore: 0,
    };
  },
  watch: {
    curHouseInfo: function () {
      this.category_score = [0, 0, 0, 0, 0, 0];
      console.log("현재 houseInfo");
      console.log(this.curHouseInfo);
      // api 넘겨줄 객체 초기화
      let x = this.curHouseInfo.lng;
      let y = this.curHouseInfo.lat;
      let radius = 1000;
      this.payload = {
        x,
        y,
        radius,
      };
      console.log(this.payload);
      this.initAllCategory(this.payload);
    },
  },
  computed: {
    selectCategoryScore: function () {
      return this.temp323;
    },
  },
  methods: {
    temp323: function (idx) {
      return this.categoryScore[idx];
    },
    selectCategory(idx) {
      switch (idx) {
        case 0:
          return this.conveniences;
        case 1:
          return this.educations;
        case 2:
          return this.traffics;
        case 3:
          return this.medicals;
        case 4:
          return this.cafes;
        case 5:
          return this.cultures;
      }
    },
    async initAllCategory() {
      this.initConvenience(this.payload);
      this.initEducation(this.payload);
      this.initTraffic(this.payload);
      this.initMedical(this.payload);
      this.initCafe(this.payload);
      await this.initCulture(this.payload);
      let totalScore = this.categoryScore.reduce((acc, cur) => {
        return acc + cur;
      }, 0);
      this.avgScore = Math.ceil((totalScore / 6) * 10) / 10;
      this.sortCategorys();
      this.$forceUpdate();
    },
    sortCategorys() {
      this.conveniences.sort((a, b) => a.distance - b.distance);
      this.educations.sort((a, b) => a.distance - b.distance);
      this.traffics.sort((a, b) => a.distance - b.distance);
      this.medicals.sort((a, b) => a.distance - b.distance);
      this.cafes.sort((a, b) => a.distance - b.distance);
      this.cultures.sort((a, b) => a.distance - b.distance);
    },
    initConvenience(payload) {
      return axios
        .all([getConv(payload), getMart(payload)])
        .then(
          axios.spread((res1, res2) => {
            console.log("[편의점]의 수 : " + res1.data.documents.length);
            console.log("[대형마트]의 수 : " + res2.data.documents.length);
            let idx = calidx("CONVENIENCE", {
              a: res1.data.documents.length,
              adist: getDistance(
                res1.data.documents.length,
                res1.data.documents[0]
              ),
              b: res2.data.documents.length,
              bdist: getDistance(
                res2.data.documents.length,
                res2.data.documents[0]
              ),
            });
            this.categoryScore[0] = idx;
            this.conveniences = Object.assign(
              res1.data.documents,
              res2.data.documents
            );
          })
        )
        .catch((err) => {
          console.error(err);
        });
    },
    initEducation(payload) {
      return axios
        .all([getSchool(payload), getPSchool(payload)])
        .then(
          axios.spread((res1, res2) => {
            console.log("[학교]의 수 : " + res1.data.documents.length);
            console.log("[학원]의 수 : " + res2.data.documents.length);
            let idx = calidx("EDUCATION", {
              a: res1.data.documents.length,
              adist: getDistance(
                res1.data.documents.length,
                res1.data.documents[0]
              ),
              b: res2.data.documents.length,
              bdist: getDistance(
                res2.data.documents.length,
                res2.data.documents[0]
              ),
            });
            this.categoryScore[1] = idx;
            this.educations = Object.assign(
              res1.data.documents,
              res2.data.documents
            );
          })
        )
        .catch((err) => {
          console.error(err);
        });
    },
    initTraffic(payload) {
      return getMetro(payload)
        .then((res) => {
          console.log("[지하철]의 수 : " + res.data.documents.length);
          let idx = calidx("TRAFFIC", {
            a: res.data.documents.length,
            adist: getDistance(
              res.data.documents.length,
              res.data.documents[0]
            ),
          });
          this.categoryScore[2] = idx;
          this.traffics = res.data.documents;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    initMedical(payload) {
      return axios
        .all([getHospital(payload), getDrugstore(payload)])
        .then(
          axios.spread((res1, res2) => {
            console.log("[병원]의 수 : " + res1.data.documents.length);
            console.log("[약국]의 수 : " + res2.data.documents.length);
            let idx = calidx("MEDICAL", {
              a: res1.data.documents.length,
              adist: getDistance(
                res1.data.documents.length,
                res1.data.documents[0]
              ),
              b: res2.data.documents.length,
              bdist: getDistance(
                res2.data.documents.length,
                res2.data.documents[0]
              ),
            });

            this.categoryScore[3] = idx;
            this.medicals = Object.assign(
              res1.data.documents,
              res2.data.documents
            );
          })
        )
        .catch((err) => {
          console.log(err);
        });
    },
    initCafe(payload) {
      return getCafe(payload)
        .then((res) => {
          console.log("[카페]의 수 : " + res.data.documents.length);
          let idx = calidx("CAFE", {
            a: res.data.documents.length,
            adist: getDistance(
              res.data.documents.length,
              res.data.documents[0]
            ),
          });
          this.categoryScore[4] = idx;
          this.cafes = res.data.documents;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async initCulture(payload) {
      return await getCulture(payload)
        .then((res) => {
          console.log("[문화시설]의 수 : " + res.data.documents.length);
          let idx = calidx("CULTURE", {
            a: res.data.documents.length,
            adist: getDistance(
              res.data.documents.length,
              res.data.documents[0]
            ),
          });
          this.categoryScore[5] = idx;
          this.cultures = res.data.documents;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    allOpen() {
      if (this.allVisible)
        this.visible = [false, false, false, false, false, false];
      else this.visible = [true, true, true, true, true, true];
      this.openStr = this.allVisible ? "모두 펼치기" : "모두 접기";
      this.allVisible = !this.allVisible;
    },
    makeMarker() {
      let imageSize = new kakao.maps.Size(27, 28);
      let imageOption = {
        spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
        spriteOrigin: new kakao.maps.Point(46, order * 36), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new kakao.maps.Point(11, 28), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      };

      let tempMarkers = [];

      // 마트 편의점
      this.conveniences.forEach((element) => {
        let imageSrc = require("@/assets/img/mart.png");

        let markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        let markerPosition = new kakao.maps.LatLng(element.y, element.x);

        let marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        tempMarkers.push(marker);
      });

      // 교육
      this.educations.forEach((element) => {
        let imageSrc = require("@/assets/img/education.png");

        let markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        let markerPosition = new kakao.maps.LatLng(element.y, element.x);

        let marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        tempMarkers.push(marker);
      });

      this.traffics.forEach((element) => {
        let imageSrc = require("@/assets/img/subwayicon.png");

        let markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        let markerPosition = new kakao.maps.LatLng(element.y, element.x);

        let marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        tempMarkers.push(marker);
      });

      this.medicals.forEach((element) => {
        let imageSrc = require("@/assets/img/cart.png");

        let markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        let markerPosition = new kakao.maps.LatLng(element.y, element.x);

        let marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        tempMarkers.push(marker);
      });

      this.cafes.forEach((element) => {
        let imageSrc = require("@/assets/img/cafe.png");

        let markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        let markerPosition = new kakao.maps.LatLng(element.y, element.x);

        let marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        tempMarkers.push(marker);
      });

      this.cultures.forEach((element) => {
        let imageSrc = require("@/assets/img/culture-icon.png");

        let markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        let markerPosition = new kakao.maps.LatLng(element.y, element.x);

        let marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        tempMarkers.push(marker);
      });

      this.$emit("sendMarker", tempMarkers);
    },
  },
};
function getConv(payload) {
  return axios.get(API_URL, {
    headers: { Authorization: `KakaoAK ${API_KEY}` },
    params: {
      category_group_code: "CS2",
      x: payload.x,
      y: payload.y,
      radius: payload.radius,
      size: 5,
      sort: "distance",
    },
  });
}
function getMart(payload) {
  return axios.get(API_URL, {
    headers: { Authorization: `KakaoAK ${API_KEY}` },
    params: {
      category_group_code: "MT1",
      x: payload.x,
      y: payload.y,
      radius: payload.radius,
      size: 5,
      sort: "distance",
    },
  });
}
function getSchool(payload) {
  return axios.get(API_URL, {
    headers: { Authorization: `KakaoAK ${API_KEY}` },
    params: {
      category_group_code: "SC4",
      x: payload.x,
      y: payload.y,
      radius: payload.radius,
      size: 5,
      sort: "distance",
    },
  });
}
function getPSchool(payload) {
  return axios.get(API_URL, {
    headers: { Authorization: `KakaoAK ${API_KEY}` },
    params: {
      category_group_code: "AC5",
      x: payload.x,
      y: payload.y,
      radius: payload.radius,
      size: 5,
      sort: "distance",
    },
  });
}
function getMetro(payload) {
  return axios.get(API_URL, {
    headers: { Authorization: `KakaoAK ${API_KEY}` },
    params: {
      category_group_code: "SW8",
      x: payload.x,
      y: payload.y,
      radius: payload.radius,
      size: 5,
      sort: "distance",
    },
  });
}
function getCulture(payload) {
  return axios.get(API_URL, {
    headers: { Authorization: `KakaoAK ${API_KEY}` },
    params: {
      category_group_code: "CT1",
      x: payload.x,
      y: payload.y,
      radius: payload.radius,
      size: 5,
      sort: "distance",
    },
  });
}
function getCafe(payload) {
  return axios.get(API_URL, {
    headers: { Authorization: `KakaoAK ${API_KEY}` },
    params: {
      category_group_code: "CE7",
      x: payload.x,
      y: payload.y,
      radius: payload.radius,
      size: 5,
      sort: "distance",
    },
  });
}
function getHospital(payload) {
  return axios.get(API_URL, {
    headers: { Authorization: `KakaoAK ${API_KEY}` },
    params: {
      category_group_code: "HP8",
      x: payload.x,
      y: payload.y,
      radius: payload.radius,
      size: 5,
      sort: "distance",
    },
  });
}
function getDrugstore(payload) {
  return axios.get(API_URL, {
    headers: { Authorization: `KakaoAK ${API_KEY}` },
    params: {
      category_group_code: "PM9",
      x: payload.x,
      y: payload.y,
      radius: payload.radius,
      size: 5,
      sort: "distance",
    },
  });
}
function getDistance(cnt, doc) {
  if (cnt == 0) return 1000;
  else return doc.distance;
}

function calidx(category, info) {
  let cal = 0.0;
  switch (category) {
    case "CONVENIENCE":
      if (info.a >= 1) {
        cal += 2;
        if (info.adist <= 500) cal += 0.5;
        if (info.a >= 3) cal += 0.5;
      }
      if (info.b >= 1) {
        cal += 2;
      }
      return cal;
    case "EDUCATION":
      if (info.a >= 1) {
        cal += 3;
        if (info.adist <= 500) cal += 1;
        else if (info.adist <= 700) cal += 0.5;
      }
      if (info.b >= 1) {
        cal += 1;
      }
      return cal;
    case "TRAFFIC":
      if (info.a > 1) {
        cal += 3;
        if (info.adist <= 500) cal += 2;
        else if (info.adist <= 700) cal += 1;
        else if (info.adist <= 900) cal += 0.5;
      } else cal += 0;
      return cal;
    case "MEDICAL":
      if (info.a >= 1) {
        cal += 2;
      } else if (info.a >= 2) {
        cal += 3;
      }
      if (info.b >= 1) {
        cal += 2;
      }
      return cal;
    case "CAFE":
      if (info.a >= 1) {
        cal += 2;
        if (info.a >= 3) cal += 1;
        if (info.adist <= 500) cal += 2;
        else if (info.adist <= 700) cal += 1;
        else if (info.adist <= 900) cal += 0.5;
      }
      return cal;
    case "CULTURE":
      if (info.a >= 1) cal += 2;
      cal += info.a;
      return cal >= 5 ? 5 : cal;
  }
}
</script>
