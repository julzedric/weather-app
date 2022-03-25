(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

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
    lat: '',
    lon: '',
    cities: [],
    currentForecast: [],
    dailyForecast: [],
    nearbyPlaces: [],
    nearbyQuery: '',
    weatherLoader: false,
    placesLoader: false,
    showIcons: true
  },
  methods: {
    selectCity: function selectCity(e) {
      this.selectedCity = e.target.value;
      this.lat = e.currentTarget.selectedOptions[0].getAttribute('data-lat');
      this.lon = e.currentTarget.selectedOptions[0].getAttribute('data-lon');
      this.loadCity();
    },
    clickCity: function clickCity(e) {
      this.showIcons = false;
      this.selectedCity = e.currentTarget.getAttribute('data-value');
      this.lat = e.currentTarget.getAttribute('data-lat');
      this.lon = e.currentTarget.getAttribute('data-lon');
      this.loadCity();
    },
    searchNearbyPlaces: function searchNearbyPlaces(e) {
      var _this = this;

      this.placesLoader = true;
      return axios.get("/api/city-nearby-places?lat=".concat(this.lat, "&lon=").concat(this.lon, "&query=").concat(this.nearbyQuery)).then(function (response) {
        _this.placesLoader = false;
        _this.nearbyPlaces = response.data;

        if (response.data.results.length == 0) {
          alert('no result found!');
        }
      })["catch"](function (error) {
        console.log(error);
      });
    },
    loadCity: function loadCity() {
      var _this2 = this;

      this.currentForecast = [];
      this.weatherLoader = true;

      if (this.selectedCity == '') {
        this.clearPage();
        this.weatherLoader = false;
        return;
      }

      this.nearbyPlaces = [];
      this.nearbyQuery = '';
      return axios.get("/api/city-forecast?lat=".concat(this.lat, "&lon=").concat(this.lon)).then(function (response) {
        var _response$data$curren = response.data.current,
            humidity = _response$data$curren.humidity,
            pressure = _response$data$curren.pressure,
            sunrise = _response$data$curren.sunrise,
            sunset = _response$data$curren.sunset,
            temp = _response$data$curren.temp,
            feels_like = _response$data$curren.feels_like,
            dt = _response$data$curren.dt,
            weather = _response$data$curren.weather;
        _this2.dailyForecast = [];
        _this2.weatherLoader = false;
        _this2.currentForecast = {
          humidity: "".concat(humidity, "%"),
          pressure: pressure,
          sunrise: moment_timezone__WEBPACK_IMPORTED_MODULE_0___default.a.unix(sunrise).tz(response.data.timezone).format('h:mm A'),
          sunset: moment_timezone__WEBPACK_IMPORTED_MODULE_0___default.a.unix(sunset).tz(response.data.timezone).format('h:mm A'),
          temp: temp,
          feels_like: feels_like,
          current_date: moment_timezone__WEBPACK_IMPORTED_MODULE_0___default.a.unix(dt).tz(response.data.timezone).format('ddd, MMM D'),
          current_time: moment_timezone__WEBPACK_IMPORTED_MODULE_0___default.a.unix(dt).tz(response.data.timezone).format('h:mm A'),
          icon: weather[0].icon,
          description: weather[0].description
        };
        response.data.daily.forEach(function (daily, i) {
          if (i < 6) {
            _this2.dailyForecast.push({
              day: moment_timezone__WEBPACK_IMPORTED_MODULE_0___default.a.unix(daily.dt).tz(response.data.timezone).format('ddd, MMM D'),
              dayTemp: daily.temp.day,
              nightTemp: daily.temp.night,
              dayFeelsLike: daily.feels_like.day,
              nightFeelsLike: daily.feels_like.night,
              icon: daily.weather[0].icon,
              description: daily.weather[0].description
            });
          }
        });
      })["catch"](function (error) {
        console.log(error);
      });
    },
    clearPage: function clearPage() {
      this.currentForecast = [];
      this.dailyForecast = [];
      this.nearbyPlaces = [];
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

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


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