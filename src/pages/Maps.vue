<template>
  <div>
    <div class="map_wrap float-right" style="width: 100%; height: 863px">
      <div id="map" style="width: 100%; height: 100%"></div>
      <div class="">
        <div
          class="inline-flex absolute top-5 left-5 z-40"
          style="
            position: absolute;
            left: 60px;
            top: 1.25rem;
            z-index: 40;
            border-radius: 0.25rem;
            cursor: pointer;
            background-color: transparent;
            border: none;
            width: 172px;
            left: 1.25rem;
          "
        >
          <select
            @change="changesido($event)"
            class="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
            style="
              --tw-border-opacity: 1;
              border-color: rgba(209, 213, 219, var(--tw-border-opacity));
              border-radius: 9999px;
              border-width: 1px;
              --tw-bg-opacity: 1;
              background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
              --tw-text-opacity: 1;
              color: rgba(75, 85, 99, var(--tw-text-opacity));
              height: 2.5rem;
              background-image: url(
                data:image/svg + xml,
                %3csvgxmlns='http://www.w3.org/2000/svg'fill='none'viewBox='0 0 20 20'%3e%3cpathstroke='%236b7280'stroke-linecap='round'stroke-linejoin='round'stroke-width='1.5'd='M6 8l4 4 4-4'/%3e%3c/svg%3e
              );
              background-position: right 0.5rem center;
              background-repeat: no-repeat;
              background-size: 1.5em 1.5em;
              padding-left: 0.75rem;
              padding-right: 1.5rem;
              width: 172px;
            "
          >
            <option>시/도</option>
            <option
              v-for="sido in sidoList"
              v-bind:key="sido.sidoCode"
              :value="sido.sidoCode"
            >
              {{ sido.sidoName }}
            </option>
          </select>
        </div>

        <div
          class="inline-flex absolute top-5 left-40 z-30 pl-10"
          style="
            position: absolute;
            left: 60px;
            top: 1.25rem;
            z-index: 40;
            border-radius: 0.25rem;
            cursor: pointer;
            background-color: transparent;
            border: none;
            left: 12rem;
            padding-left: 0.5rem;
            width: 172px;
          "
        >
          <select
            class="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
            @change="changegugun($event)"
            style="
              --tw-border-opacity: 1;
              border-color: rgba(209, 213, 219, var(--tw-border-opacity));
              border-radius: 9999px;
              border-width: 1px;
              --tw-bg-opacity: 1;
              background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
              --tw-text-opacity: 1;
              color: rgba(75, 85, 99, var(--tw-text-opacity));
              height: 2.5rem;
              width: 172px;
              background-position: right 0.5rem center;
              background-repeat: no-repeat;
              background-size: 1.5em 1.5em;
              padding-left: 0.75rem;
              padding-right: 1.5rem;
            "
          >
            <option>구/군</option>

            <option
              v-for="gugun in gugunList"
              v-bind:key="gugun.gugunCode"
              :value="gugun.gugunCode"
            >
              {{ gugun.gugunName }}
            </option>
          </select>
        </div>

        <div
          class="inline-flex absolute top-5 left-40 z-20 ml-40 pl-5"
          style="
            position: absolute;
            width: 178px;
            top: 1.25rem;
            z-index: 40;
            border-radius: 0.25rem;
            cursor: pointer;
            background-color: transparent;
            border: none;
            left: 22.7rem;
            padding-left: 1rem;
          "
        >
          <select
            class="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
            @change="changedong($event)"
            style="
              --tw-border-opacity: 1;
              border-color: rgba(209, 213, 219, var(--tw-border-opacity));
              border-radius: 9999px;
              border-width: 1px;
              --tw-bg-opacity: 1;
              background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
              --tw-text-opacity: 1;
              color: rgba(75, 85, 99, var(--tw-text-opacity));
              height: 2.5rem;
              background-image: url(
                data:image/svg + xml,
                %3csvgxmlns='http://www.w3.org/2000/svg'fill='none'viewBox='0 0 20 20'%3e%3cpathstroke='%236b7280'stroke-linecap='round'stroke-linejoin='round'stroke-width='1.5'd='M6 8l4 4 4-4'/%3e%3c/svg%3e
              );
              width: 178px;
              background-position: right 0.5rem center;
              background-repeat: no-repeat;
              background-size: 1.5em 1.5em;
              padding-left: 0.75rem;
              padding-right: 1.5rem;
            "
          >
            <option>동</option>
            <option
              v-for="dong in dongList"
              v-bind:key="dong.dongCode"
              :value="dong.dongCode"
            >
              {{ dong.dongName }}
            </option>
          </select>
        </div>
      </div>
      <!-- 지도타입 컨트롤 div 입니다 -->
      <div
        class="inline-flex custom_typecontrol radius_border"
        style="box-sizing: content-box !important"
      >
        <span
          id="btnRoadmap"
          class="selected_btn"
          @click="setMapType('roadmap')"
          >지도</span
        >
        <span id="btnSkyview" @click="setMapType('skyview')">스카이뷰</span>
      </div>
      <!-- 지도 확대, 축소 컨트롤 div 입니다 -->
      <div
        class="inline-flex custom_zoomcontrol radius_border"
        style="box-sizing: content-box !important"
      >
        <span @click="zoomIn"
          ><img
            src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
            alt="확대"
            style="box-sizing: content-box"
        /></span>
        <span @click="zoomOut"
          ><img
            src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
            alt="축소"
            style="box-sizing: content-box"
        /></span>
      </div>
      <div
        class="aptinfo"
        id="myDIV"
        style="
          position: fixed;
          top: 200px;
          margin-left: 20px;
          width: 400px;
          height: 600px;
          background-color: white;
          z-index: 50;
          border-radius: 0.9rem;
          overflow-y: scroll;
          display: none;
        "
      >
        <div style="display: flow-root; border-bottom: solid 1px black">
          <div style="float: left; margin: 5px 0 0 20px">
            <h4
              style="
                font-family: Y_Spotlight;
                text-align: center;
                padding-top: 6px;
                font-weight: bold;
              "
            >
              우리동네 아파트
            </h4>
          </div>
          <div style="float: right">
            <button
              @click="closeList"
              style="border: none; right: 10px; height: 30px; width: 30px"
            >
              <b-icon icon="x-lg"></b-icon>
            </button>
          </div>
        </div>
        <div v-if="aptList.length == 0">
          <img src="@/assets/img/noapt.jpg" />
        </div>
        <div
          style="
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(50%, auto));
          "
        >
          <div
            v-for="(item, index) in aptList"
            :key="index"
            style="
              margin-left: 20px;
              width: 165px;
              height: 165px;
              background-color: #545045;
              z-index: 50;
              border-radius: 1rem;
              margin: 15px;
              display: grid;
              justify-content: center;
            "
          >
            <p
              style="
                color: #ffcd4a;
                text-align: center;
                margin-top: 15px;
                font-weight: bold;
              "
            >
              {{ item.roadAddress }}
            </p>
            <h5
              style="
                color: white;
                text-align: center;
                font-weight: bold;
                margin: 0px;
                line-height: 80%;
                font-family: Y_Spotlight;
              "
            >
              {{ item.aptName }}
            </h5>

            <p
              style="
                color: white;
                text-align: center;
                cursor: pointer;
                line-height: 50%;
              "
              @click="getAptDeals(item.aptCode, item, { La })"
            >
              거래내역보기
            </p>
            <div style="display: flex; justify-content: center">
              <button
                type="button"
                class="btm_image"
                id="img_btn"
                style="
                  width: 40px;
                  height: 40px;
                  padding: 0px;
                  margin-right: 5px;
                  border: none;
                  outline: none;
                "
                @click="naverOpen(item.searchKeyword)"
              >
                <img src="../assets/img/naver.jpg" />
              </button>
              <button
                type="button"
                class="btm_image"
                id="img_btn"
                style="
                  width: 40px;
                  height: 40px;
                  padding: 0px;
                  margin-left: 5px;
                  border: none;
                  outline: none;
                "
                @click="youtubeOpen(item.searchKeyword)"
              >
                <img src="../assets/img/youtube.jpg" style="height: 100%" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="aptinfo"
        id="aptDIV"
        style="
          position: fixed;
          top: 230px;
          right: 20px;
          margin-left: 20px;
          width: 400px;
          height: 680px;
          background-color: white;
          z-index: 50;
          border-radius: 0.5rem;
          overflow-y: scroll;
          display: none;
        "
      >
        <div style="display: flow-root">
          <div style="float: left; margin: 5px 0 0 20px">
            <h4
              v-if="aptDeals.length > 0"
              style="text-align: center; padding-top: 6px; font-weight: bold"
            >
              {{ aptDeals[0].aptName }}
            </h4>
          </div>
          <div style="float: right">
            <button
              @click="closeAptList"
              style="border: none; right: 10px; height: 30px; width: 30px"
            >
              <b-icon icon="x-lg"></b-icon>
            </button>
          </div>
        </div>
        <div style="height: 92%">
          <b-card no-body style="height: 100%; border-bottom: none">
            <b-tabs pills card style="height: 100%">
              <b-tab title="거래내역" active style="height: 100%">
                <house-deal :aptDeals="aptDeals" />
              </b-tab>

              <b-tab title="인프라" style="height: 100%">
                <house-infra
                  :curHouseInfo="curHouseInfo"
                  :map="map"
                  @sendMarker="dispalyInfraMarker"
                />
              </b-tab>
              <b-tab title="리뷰" style="height: 100% !important">
                <house-review :curHouseInfo="curHouseInfo" />
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="container mx-auto sm:flex py-5 sm:py-10 mt-10 sm:mt-20">
    <router-view></router-view>
  </div> -->
</template>

<script>
import http from "@/util/http-common";

import HouseDeal from "./HouseInfo/HouseDeal.vue";
import HouseReview from "./HouseInfo/HouseReview.vue";
import HouseInfra from "./HouseInfo/HouseInfra.vue";

export default {
  data() {
    return {
      selectedsido: "",
      selectedgugun: "",
      selecteddong: "",
      apt_markers: [],
      markers_postion: [],
      alert: false,
      floatingflag: false,
      floatingflag2: false,
      sidoList: [],
      gugunList: [],
      dongList: [],
      aptList: [],
      aptDeals: [],
      curAptCode: null,
      curHouseInfo: null,
      infraMarkers: [],
      overlay: null,
    };
  },
  components: {
    HouseDeal,
    HouseReview,
    HouseInfra,
  },
  created() {
    http.get(`/map/sido`).then(({ data }) => {
      console.log(data);
      this.sidoList = data;
      console.log(this.sidoList);
    });
  },
  mounted() {
    console.log("check");
    window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
  },
  methods: {
    // ...mapActions([
    //   // "setSidoList",
    //   "setGugunList",
    //   "setDongList",
    //   "setHomeList",
    //   "setSubwayList",
    //   "setBusList",
    //   "setBicycleList",
    //   "setHospitalList",
    //   "setSchoolList",
    //   "setCafeList",
    //   "setConvenientList",
    //   "setKidList",
    // ]),
    // ...mapMutations(["SET_HOME", "SET_POSITION", "SET_REVIEW_HOMECODE"]),
    // ...mapActions(memberStore, ["addInterest", "removeInterest"]),

    naverOpen(searchKeyword) {
      window.open(
        `https://search.naver.com/search.naver?query=${searchKeyword}`,
        "_blank"
      );
    },
    youtubeOpen(searchKeyword) {
      window.open(
        `https://www.youtube.com/results?app=desktop&search_query=${searchKeyword}`,
        "_blank"
      );
    },
    changesido(event) {
      this.selectedsido = event.target.value;
      http.get(`/map/gugun/${event.target.value}`).then((response) => {
        this.gugunList = response.data;
      });
    },
    changegugun(event) {
      console.log(event.target.value);
      http.get(`/map/dong/${event.target.value}`).then((response) => {
        this.dongList = response.data;
      });
    },
    changedong(event) {
      console.log(event.target.value);
      http
        .get(`/map/apt/${event.target.value}`)
        .then((response) => {
          console.log("아파트 정보확인");
          console.log(response.data);
          this.aptList = response.data;
        })
        .then(() => {
          let totalLat = 0;
          let totalLng = 0;

          this.aptList.forEach(({ lng, lat }) => {
            totalLng += parseFloat(lng);
            totalLat += parseFloat(lat);
          });

          let avgLat = totalLat / this.aptList.length;
          let avgLng = totalLng / this.aptList.length;

          if (totalLat) {
            this.map.setCenter(new kakao.maps.LatLng(avgLat, avgLng));
            this.map.setLevel(5);
          }
        });
      var con = document.getElementById("myDIV");
      if (con.style.display == "none") {
        con.style.display = "block";
      }
    },
    closeList() {
      var con = document.getElementById("myDIV");
      if (con.style.display == "block") {
        con.style.display = "none";
      }
    },
    closeAptList() {
      var con = document.getElementById("aptDIV");
      if (con.style.display == "block") {
        con.style.display = "none";
      }
    },
    initMap() {
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      this.map = new kakao.maps.Map(container, options);
      //마커추가하려면 객체를 아래와 같이 하나 만든다.
    },
    buscontent(place) {
      var content =
        '<div class="info">' +
        '   <div class="title">' +
        place.id +
        " : " +
        place.station +
        "</div>" +
        "</div>";

      return content;
    },
    subwaycontent(place) {
      var content =
        '<div class="info">' +
        '   <div class="title">' +
        place.train +
        " : " +
        place.station +
        "</div>" +
        "</div>";

      return content;
    },
    bicyclecontent(place) {
      var content =
        '<div class="info">' +
        '   <div class="title">' +
        place.id +
        " : " +
        place.place +
        "</div>" +
        "</div>";

      return content;
    },
    convenientcontent(place) {
      var content =
        '<div class="info">' + '   <div class="title">' + place.place_name;
      "</div>" + "</div>";

      return content;
    },
    // addConvenienceMarker(places, type) {
    //   console.log(places);
    //   this.removeConvenientMarker();

    //   //아파트숫자 마커 등록
    //   for (const place of places) {
    //     let position = "";
    //     console.log(place);
    //     let imageSrc = "";
    //     let imageSize = "";
    //     let imageOption = "";
    //     let content = "";
    //     if (type == "SUB") {
    //       console.log("지하철뿌려주기");
    //       (imageSrc = require("@/assets/img/subwayicon.jpg")), // 마커 이미지 url, 스프라이트 이미지를 씁니다
    //         (imageSize = new kakao.maps.Size(25, 25)), // 마커 이미지의 크기
    //         (content = this.subwaycontent(place));
    //       position = new kakao.maps.LatLng(place.lat, place.lng);
    //     }
    //     if (type == "BUS") {
    //       console.log("버스뿌려주기");
    //       (imageSrc = require("@/assets/img/busicon.png")), // 마커 이미지 url, 스프라이트 이미지를 씁니다
    //         (imageSize = new kakao.maps.Size(25, 25)), // 마커 이미지의 크기
    //         (content = this.buscontent(place));
    //       position = new kakao.maps.LatLng(place.lat, place.lng);
    //     }
    //     if (type == "BIC") {
    //       console.log("자전거뿌려주기");
    //       (imageSrc = require("@/assets/img/bicycleicon.png")), // 마커 이미지 url, 스프라이트 이미지를 씁니다
    //         (imageSize = new kakao.maps.Size(25, 25)), // 마커 이미지의 크기
    //         (content = this.bicyclecontent(place));
    //       position = new kakao.maps.LatLng(place.lat, place.lng);
    //     }
    //     if (type == "HOS") {
    //       (imageSrc = require("@/assets/img/cart.png")), // 마커 이미지 url, 스프라이트 이미지를 씁니다
    //         (imageSize = new kakao.maps.Size(25, 25)), // 마커 이미지의 크기
    //         (content = this.convenientcontent(place));
    //       position = new kakao.maps.LatLng(place.y, place.x);
    //     }
    //     if (type == "SCH") {
    //       (imageSrc = require("@/assets/img/school.png")), // 마커 이미지 url, 스프라이트 이미지를 씁니다
    //         (imageSize = new kakao.maps.Size(25, 25)), // 마커 이미지의 크기
    //         (content = this.convenientcontent(place));
    //       position = new kakao.maps.LatLng(place.y, place.x);
    //     }
    //     if (type == "CAF") {
    //       (imageSrc = require("@/assets/img/cafe.png")), // 마커 이미지 url, 스프라이트 이미지를 씁니다
    //         (imageSize = new kakao.maps.Size(25, 25)), // 마커 이미지의 크기
    //         (content = this.convenientcontent(place));
    //       position = new kakao.maps.LatLng(place.y, place.x);
    //     }
    //     if (type == "KID") {
    //       (imageSrc = require("@/assets/img/kid.png")), // 마커 이미지 url, 스프라이트 이미지를 씁니다
    //         (imageSize = new kakao.maps.Size(25, 25)), // 마커 이미지의 크기
    //         (content = this.convenientcontent(place));
    //       position = new kakao.maps.LatLng(place.y, place.x);
    //     }
    //     if (type == "CON") {
    //       (imageSrc = require("@/assets/img/convenient.png")), // 마커 이미지 url, 스프라이트 이미지를 씁니다
    //         (imageSize = new kakao.maps.Size(25, 25)), // 마커 이미지의 크기
    //         (content = this.convenientcontent(place));
    //       position = new kakao.maps.LatLng(place.y, place.x);
    //     }
    //     marker = new kakao.maps.Marker({
    //       position: position, // 마커의 위치
    //       image: markerImage,
    //     });
    //     var markerImage = new kakao.maps.MarkerImage(
    //       imageSrc,
    //       imageSize,
    //       imageOption
    //     );
    //     var marker = new kakao.maps.Marker({
    //       position: position, // 마커의 위치
    //       image: markerImage,
    //     });
    //     // }

    //     console.log(marker.getPosition());
    //     marker.setMap(this.map); // 지도 위에 마커를 표출합니다
    //     this.convenient_markers.push(marker); // 배열에 생성된 마커를 추가합니다
    //     var map = this.map;

    //     (function (marker) {
    //       var infowindow = new kakao.maps.InfoWindow({ removable: true });
    //       kakao.maps.event.addListener(marker, "click", () => {
    //         //this.displayInfowindow(marker, title);
    //         infowindow.setContent(content);
    //         infowindow.setPosition(position);
    //         infowindow.setMap(map);
    //         // 커스텀 오버레이를 생성합니다
    //         mapCustomOverlay = new kakao.maps.CustomOverlay({
    //           position: marker.getPosition(),
    //           content: content,
    //           xAnchor: 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
    //           yAnchor: 1.5, // 커스텀 오버레이의 y축 위치입니다. 1에 가까울수록 위쪽에 위치합니다. 기본값은 0.5 입니다
    //         });
    //         // 커스텀 오버레이를 지도에 표시합니다
    //         mapCustomOverlay.setMap(map);
    //       });

    //       //클릭시
    //       // kakao.maps.event.addListener(marker, "click", function() {

    //       // });
    //     })(marker);
    //   }
    // },
    // async getPlaces(homes) {
    //   // 주소-좌표 변환 객체를 생성합니다
    //   var geocoder = new kakao.maps.services.Geocoder();
    //   console.log(this.map);
    //   console.log(homes.length);
    //   const positions = [];
    //   this.removeMarker();
    //   for (var home of homes) {
    //     const result = await this.searchAddress(geocoder, home);
    //     positions.push(result);
    //   }

    //   this.addAptMarker(positions, homes);
    // },
    // searchAddress(geocoder, home) {
    //   return new Promise((resolve, reject) => {
    //     console.log(home.dongName + " " + home.jibun);
    //     // 주소로 좌표를 검색합니다
    //     geocoder.addressSearch(
    //       home.dongName + " " + home.jibun,
    //       function (result, status) {
    //         // 정상적으로 검색이 완료됐으면
    //         if (status === kakao.maps.services.Status.OK) {
    //           resolve(new kakao.maps.LatLng(result[0].y, result[0].x));
    //         } else {
    //           reject(status);
    //         }
    //       }
    //     );
    //   });
    // },
    addScript() {
      console.log("addScript");
      const script = document.createElement("script"); /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=48b1ad81eacbc99b68fa5096b9e14825&libraries=services,clusterer,drawing";
      document.head.appendChild(script);
    },
    setMapType(maptype) {
      var roadmapControl = document.getElementById("btnRoadmap");
      var skyviewControl = document.getElementById("btnSkyview");
      if (maptype === "roadmap") {
        this.map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
        roadmapControl.className = "selected_btn";
        skyviewControl.className = "btn";
      } else {
        this.map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
        skyviewControl.className = "selected_btn";
        roadmapControl.className = "btn";
      }
    },
    // removeMarker() {
    //   for (var i = 0; i < this.apt_markers.length; i++) {
    //     this.apt_markers[i].setMap(null);
    //   }
    //   this.apt_markers = [];
    // },
    // removeConvenientMarker() {
    //   console.log("removeCheck");
    //   for (var i = 0; i < this.convenient_markers.length; i++) {
    //     this.convenient_markers[i].setMap(null);
    //   }
    //   this.convenient_markers = [];
    // },
    zoomIn() {
      this.map.setLevel(this.map.getLevel() - 1);
    },
    zoomOut() {
      this.map.setLevel(this.map.getLevel() + 1);
    },
    openfloating() {
      this.floatingflag = true;
    },
    closefloating() {
      this.floatingflag = false;
    },
    openfloating2() {
      this.floatingflag2 = true;
    },
    closefloating2() {
      this.floatingflag2 = false;
    },
    getAptDeals(aptCode, apt, marker) {
      this.curHouseInfo = apt;
      http
        .get(`/map/apt/${aptCode}/deal`)
        .then(({ data }) => {
          this.aptDeals = data;
        })
        .then(() => {
          var con = document.getElementById("aptDIV");
          if (con.style.display == "none") {
            con.style.display = "block";
          }
        })
        .catch((error) => {
          alert("데이터 로드 실패");
          console.log(error);
        });
      if (this.aptDeals.length > 0) {
        this.curAptCode = aptCode;
      }

      // 커스텀 오버레이
      let content = `<div class="wrap">
            <div class="info">
                <div class="title">
                    ${apt.aptName}
                </div>
                <div class="body">
                    <div class="desc">
                        <div class="ellipsis">${apt.searchKeyword}</div>
                    </div>
                </div>
            </div>
        </div>`;

      let ol = new kakao.maps.CustomOverlay({
        content: content,
        map: this.map,
        position: marker.getPosition(),
        zIndex: 40,
      });

      if (this.overlay) {
        this.overlay.setMap(null);
      }

      this.overlay = ol;

      console.log(this.overlay);

      this.overlay.setMap(this.map);

      this.curHouseInfo = apt;
      this.map.setLevel(4);
      this.map.setCenter(new kakao.maps.LatLng(apt.lat, apt.lng));
    },
    dispalyInfraMarker(markers) {
      console.log("인프라 마커 찍기 메서드 호출");
      this.infraMarkers.forEach((marker) => {
        marker.setMap(null);
      });

      this.infraMarkers = markers;

      this.infraMarkers.forEach((marker) => {
        console.log("인프라 마커 찍기");
        marker.setMap(this.map);
      });
    },
  },
  watch: {
    aptList: function () {
      let imageSize = new kakao.maps.Size(43, 48);
      let imageOption = {
        offset: new kakao.maps.Point(11, 28), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      };

      console.log("마커 찍기");
      this.apt_markers.forEach((marker) => {
        marker.setMap(null);
        console.log("마커 지우기");
      });

      this.apt_markers = [];

      this.aptList.forEach((apt) => {
        let imageSrc = require("@/assets/img/house_marker.png");

        let markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        let markerPosition = new kakao.maps.LatLng(apt.lat, apt.lng);
        let marker = new kakao.maps.Marker({
          position: markerPosition,
          clickable: true,
          image: markerImage,
        });

        marker.aptCode = apt.aptCode;

        // 마커에 이벤트 등록
        kakao.maps.event.addListener(marker, "click", () => {
          this.getAptDeals(marker.aptCode, apt, marker);
        });

        this.apt_markers.push(marker);
        marker.setMap(this.map);
        console.log("마커 포지션");
        console.log(marker.getPosition());
      });
    },
  },
};
</script>

<style>
.tab-content {
  height: 92% !important;
}
.nav-pills .nav-link.active {
  background-color: rgb(89 149 138) !important;
  color: rgb(255, 255, 255) !important;
}
.nav-link {
  color: rgb(0, 69, 28) !important;
}
.info {
  font-size: 12px;
  padding: 5px;
}
.info .title {
  font-weight: bold;
}
.custom_overlay_info {
  height: 130px;
  width: 271px;
  border-radius: 6px;
  margin-bottom: 12px;
  float: left;
  position: relative;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  background-color: #fff;
}
.custom_overlay_info:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.custom_overlay_info a {
  display: block;
  background: #d95050;
  background: #d95050 no-repeat right 14px center;
  text-decoration: none;
  color: #fff;
  padding: 12px 36px 12px 14px;
  font-size: 14px;
  border-radius: 6px 6px 0 0;
}
.custom_overlay_info a strong {
  background: url(http://www.w3.org/2000/svg) no-repeat;
}
.custom_overlay_info .desc {
  padding: 14px;
  position: relative;
  min-width: 190px;
  height: 56px;
}
.custom_overlay_info .address {
  font-size: 12px;
  color: #333;
  position: absolute;
  left: 80px;
  right: 14px;
  top: 24px;
  white-space: normal;
}
.custom_overlay_info:after {
  content: "";
  position: absolute;
  margin-left: -11px;
  left: 50%;
  bottom: -12px;
  width: 22px;
  height: 12px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png)
    no-repeat 0 bottom;
}
.map_wrap {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 800px;
}
.radius_border {
  border: 1px solid #919191;
  border-radius: 5px;
}
.custom_typecontrol {
  position: absolute;
  top: 10px;
  right: 10px;
  overflow: hidden;
  width: 130px;
  height: 30px;
  margin: 0;
  padding: 0;
  z-index: 1;
  font-size: 12px;
  font-family: "Malgun Gothic", "맑은 고딕", sans-serif;
}
.custom_typecontrol span {
  display: block;
  width: 65px;
  height: 30px;
  float: left;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.custom_typecontrol .btn {
  background: #fff;
  background: linear-gradient(#fff, #e6e6e6);
}
.custom_typecontrol .btn:hover {
  background: #f5f5f5;
  background: linear-gradient(#f5f5f5, #e3e3e3);
}
.custom_typecontrol .btn:active {
  background: #e6e6e6;
  background: linear-gradient(#e6e6e6, #fff);
}

.custom_typecontrol .selected_btn {
  color: #fff;
  background: #425470;
  background: linear-gradient(#425470, #5b6d8a);
}
.custom_typecontrol .selected_btn:hover {
  color: #fff;
}

.custom_zoomcontrol {
  position: absolute;
  top: 50px;
  right: 10px;
  width: 36px;
  height: 80px;
  overflow: hidden;
  z-index: 1;
  background-color: #f5f5f5;
}
.custom_zoomcontrol span {
  display: block;
  width: 36px;
  height: 40px;
  text-align: center;
  cursor: pointer;
}
.custom_zoomcontrol span img {
  width: 15px;
  height: 15px;
  padding: 12px 0;
  border: none;
}
.custom_zoomcontrol span:first-child {
  border-bottom: 1px solid #bfbfbf;
}

.wrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  line-height: 1.5;
}
.wrap * {
  padding: 0;
  margin: 0;
}
.wrap .info {
  width: 286px;
  height: 120px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}
.wrap .info:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.info .title {
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
}
.info .close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 17px;
  height: 17px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
}
.info .close:hover {
  cursor: pointer;
}
.info .body {
  position: relative;
  overflow: hidden;
}
.info .desc {
  position: relative;
  margin: 13px 0 0 90px;
  height: 75px;
}
.desc .ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.desc .jibun {
  font-size: 11px;
  color: #888;
  margin-top: -2px;
}
/* .info .img {
  position: absolute;
  top: 6px;
  left: 5px;
  width: 73px;
  height: 71px;
  border: 1px solid #ddd;
  color: #888;
  overflow: hidden;
} */
.info:after {
  content: "";
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: 0;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.info .link {
  color: #5085bb;
}
</style>
