(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/cities/Index.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/cities/Index.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment-timezone */ "./node_modules/moment-timezone/index.js");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  data: {
    selectedCity: '',
    cities: [],
    cityForecast: [],
    cityPlaces: []
  },
  methods: {
    selectCity: function selectCity(e) {
      var _this = this;

      this.selectedCity = e.target.value;
      var lat = e.currentTarget.selectedOptions[0].getAttribute('data-lat');

      var _long = e.currentTarget.selectedOptions[0].getAttribute('data-lon');

      if (this.city == '') {
        return;
      }

      this.cityPlaces = [];
      return axios.get("/api/city-forecast?lat=".concat(lat, "&lon=").concat(_long)).then(function (response) {
        var _response$data$curren = response.data.current,
            humidity = _response$data$curren.humidity,
            pressure = _response$data$curren.pressure,
            sunrise = _response$data$curren.sunrise,
            sunset = _response$data$curren.sunset,
            temp = _response$data$curren.temp,
            feels_like = _response$data$curren.feels_like,
            dt = _response$data$curren.dt;
        _this.cityForecast = {
          humidity: "".concat(humidity, "%"),
          pressure: pressure,
          sunrise: moment_timezone__WEBPACK_IMPORTED_MODULE_0___default.a.unix(sunrise).tz("America/Los_Angeles").format('hh:mm a'),
          sunset: moment_timezone__WEBPACK_IMPORTED_MODULE_0___default.a.unix(sunset).format('hh:mm a'),
          temp: temp,
          feels_like: feels_like,
          dt: moment_timezone__WEBPACK_IMPORTED_MODULE_0___default.a.unix(dt).local().format('dddd, MMMM Do, YYYY h:mm:ss A')
        };
      })["catch"](function (error) {
        console.log(error);
      });
    },
    searchCityPlaces: function searchCityPlaces(e) {
      var _this2 = this;

      if (this.selectedCity == '') {
        return;
      }

      return axios.get("/api/city-nearby-places?city=".concat(this.selectedCity)).then(function (response) {
        _this2.cityPlaces = response.data;
      })["catch"](function (error) {
        console.log(error);
      });
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    axios.get('/api/cities').then(function (response) {
      _this3.cities = response.data;
    })["catch"](function (error) {
      console.log(error);
    });
  }
});

/***/ }),

/***/ "./resources/js/src/cities/Index.vue":
/*!*******************************************!*\
  !*** ./resources/js/src/cities/Index.vue ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js& */ "./resources/js/src/cities/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/cities/Index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/cities/Index.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./resources/js/src/cities/Index.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/cities/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ })

}]);