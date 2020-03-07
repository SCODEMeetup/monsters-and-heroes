require("./runtime.js");require("./vendor.js");module.exports =
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["bundle"],{

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/SnapIt.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nativescript_camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("nativescript-camera");
/* harmony import */ var nativescript_camera__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nativescript_camera__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      cameraImage: "https://play.nativescript.org/dist/assets/img/NativeScript_logo.png",
      labelText: "Test"
    };
  },

  methods: {
    onTakePictureTap: function onTakePictureTap(args) {
      var page = args.object.page;
      var that = this;
      Object(nativescript_camera__WEBPACK_IMPORTED_MODULE_0__["requestPermissions"])().then(() => {
        Object(nativescript_camera__WEBPACK_IMPORTED_MODULE_0__["takePicture"])({
          width: that.width,
          height: that.height,
          keepAspectRatio: that.keepAspectRatio,
          saveToGallery: that.saveToGallery,
          allowsEditing: that.allowsEditing
        }).then(imageAsset => {
          that.cameraImage = imageAsset;
          imageAsset.getImageAsync(function (nativeImage) {
            var scale = 1;
            var actualWidth = 0;
            var actualHeight = 0;

            if (imageAsset.android) {
              // get the current density of the screen (dpi) and divide it by the default one to get the scale
              scale = nativeImage.getDensity() / android.util.DisplayMetrics.DENSITY_DEFAULT;
              actualWidth = nativeImage.getWidth();
              actualHeight = nativeImage.getHeight();
            } else {
              scale = nativeImage.scale;
              actualWidth = nativeImage.size.width * scale;
              actualHeight = nativeImage.size.height * scale;
            }

            that.labelText = "Displayed Size: ".concat(actualWidth, "x").concat(actualHeight, " with scale ").concat(scale, "\n") + "Image Size: ".concat(Math.round(actualWidth / scale), "x").concat(Math.round(actualHeight / scale));
            console.log("".concat(labelText)); // that.$navigateTo(Confirm, {
            //     props: {
            //         capturedImage: imageAsset
            //     }
            // })
          });
        }, err => {
          console.log("Error -> " + err.message);
        });
      }, () => alert("permissions rejected"));
    }
  }
});

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/SnapIt.vue?vue&type=style&index=0&id=1b4ab930&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.home-panel[data-v-1b4ab930] {\n    vertical-align: center;\n    font-size: 20;\n    margin: 15;\n}\n.description-label[data-v-1b4ab930] {\n    margin-bottom: 15;\n}\n", ""]);

// exports

    const application = __webpack_require__("tns-core-modules/application");
    __webpack_require__("tns-core-modules/ui/styling/style-scope");

    if (typeof exports.forEach === "function") {
        exports.forEach(cssExport => {
            if (cssExport.length > 1 && cssExport[1]) {
                // applying the second item of the export as it contains the css contents
                application.addCss(cssExport[1]);
            }
        });
    }
;
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './components/SnapIt.vue' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/SnapIt.vue?vue&type=template&id=1b4ab930&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Page",
    [
      _c("ActionBar", { attrs: { title: "Monster and Heros" } }),
      _c(
        "ScrollView",
        [
          _c(
            "StackLayout",
            { staticClass: "home-panel" },
            [
              _c("Label", {
                staticClass: "h2 description-label",
                attrs: { textWrap: "true", text: "Play with NativeScript!" }
              }),
              _c("Label", {
                staticClass: "h2 description-label",
                attrs: {
                  textWrap: "true",
                  text:
                    "Write code in the editor or drag and drop components to build a NativeScript mobile application."
                }
              }),
              _vm._v(
                '//play.nativescript.org/dist/assets/img/NativeScript_logo.png" />\n            Scan the QR code with your mobile device and watch the changes\n            sync live while you play with the code." class="h2\n            description-label" />\n            '
              ),
              _c("Image", {
                attrs: {
                  src: _vm.cameraImage,
                  id: "image",
                  stretch: "aspectFit",
                  margin: "10"
                }
              }),
              _c("TextView", {
                attrs: { row: "2", text: _vm.labelText, editable: "false" }
              }),
              _c("Button", {
                attrs: { row: "3", text: "Take Picture", padding: "10" },
                on: { tap: _vm.onTakePictureTap }
              })
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./ sync ^\\.\\/app\\.(css|scss|less|sass)$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app.css": "./app.css"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./ sync ^\\.\\/app\\.(css|scss|less|sass)$";

/***/ }),

/***/ "./ sync recursive (?<!\\bApp_Resources\\b.*)(?<!\\.\\/\\btests\\b\\/.*?)\\.(xml|css|js|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app.css": "./app.css",
	"./app.js": "./app.js",
	"./nativescript-camera/camera.common.js": "./nativescript-camera/camera.common.js",
	"./nativescript-camera/camera.js": "./nativescript-camera/camera.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./ sync recursive (?<!\\bApp_Resources\\b.*)(?<!\\.\\/\\btests\\b\\/.*?)\\.(xml|css|js|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$";

/***/ }),

/***/ "./app.css":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {global.registerModule("~@nativescript/theme/css/core.css", () => __webpack_require__("../node_modules/nativescript-dev-webpack/css2json-loader.js?useForImports!../node_modules/@nativescript/theme/css/core.css"));
global.registerModule("@nativescript/theme/css/core.css", () => __webpack_require__("../node_modules/nativescript-dev-webpack/css2json-loader.js?useForImports!../node_modules/@nativescript/theme/css/core.css"));
global.registerModule("~@nativescript/theme/css/sky.css", () => __webpack_require__("../node_modules/nativescript-dev-webpack/css2json-loader.js?useForImports!../node_modules/@nativescript/theme/css/sky.css"));
global.registerModule("@nativescript/theme/css/sky.css", () => __webpack_require__("../node_modules/nativescript-dev-webpack/css2json-loader.js?useForImports!../node_modules/@nativescript/theme/css/sky.css"));module.exports = {"type":"stylesheet","stylesheet":{"rules":[{"type":"import","import":"'~@nativescript/theme/css/core.css'"},{"type":"import","import":"'~@nativescript/theme/css/sky.css'"},{"type":"rule","selectors":[".btn"],"declarations":[{"type":"declaration","property":"font-size","value":"18"}]}],"parsingErrors":[]}};;
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './app.css' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("nativescript-vue");
/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nativescript_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_SnapIt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/SnapIt.vue");

        let applicationCheckPlatform = __webpack_require__("tns-core-modules/application");
        if (applicationCheckPlatform.android && !global["__snapshot"]) {
            __webpack_require__("tns-core-modules/ui/frame");
__webpack_require__("tns-core-modules/ui/frame/activity");
        }

        
            __webpack_require__("../node_modules/nativescript-dev-webpack/load-application-css-regular.js")();
            
            
        if (true) {
            const hmrUpdate = __webpack_require__("../node_modules/nativescript-dev-webpack/hmr/index.js").hmrUpdate;
            global.__coreModulesLiveSync = global.__onLiveSync;

            global.__onLiveSync = function () {
                // handle hot updated on LiveSync
                hmrUpdate();
            };

            global.hmrRefresh = function({ type, path } = {}) {
                // the hot updates are applied, ask the modules to apply the changes
                setTimeout(() => {
                    global.__coreModulesLiveSync({ type, path });
                });
            };

            // handle hot updated on initial app start
            hmrUpdate();
        }
        
            const context = __webpack_require__("./ sync recursive (?<!\\bApp_Resources\\b.*)(?<!\\.\\/\\btests\\b\\/.*?)\\.(xml|css|js|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$");
            global.registerWebpackModules(context);
            if (true) {
                module.hot.accept(context.id, () => { 
                    console.log("HMR: Accept module '" + context.id + "' from '" + module.i + "'"); 
                });
            }
            
        __webpack_require__("tns-core-modules/bundle-entry-points");
        
 // Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

new nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a({
  template: "\n        <Frame>\n            <SnapIt />\n        </Frame>",
  components: {
    SnapIt: _components_SnapIt__WEBPACK_IMPORTED_MODULE_1__["default"]
  }
}).$start();
    
        
        
    
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./components/SnapIt.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SnapIt_vue_vue_type_template_id_1b4ab930_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/SnapIt.vue?vue&type=template&id=1b4ab930&scoped=true&");
/* harmony import */ var _SnapIt_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/SnapIt.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _SnapIt_vue_vue_type_style_index_0_id_1b4ab930_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/SnapIt.vue?vue&type=style&index=0&id=1b4ab930&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _SnapIt_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SnapIt_vue_vue_type_template_id_1b4ab930_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SnapIt_vue_vue_type_template_id_1b4ab930_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1b4ab930",
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!api.isRecorded('1b4ab930')) {
      api.createRecord('1b4ab930', component.options)
    } else {
      api.reload('1b4ab930', component.options)
    }
    module.hot.accept("./components/SnapIt.vue?vue&type=template&id=1b4ab930&scoped=true&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _SnapIt_vue_vue_type_template_id_1b4ab930_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/SnapIt.vue?vue&type=template&id=1b4ab930&scoped=true&");
(function () {
      api.rerender('1b4ab930', {
        render: _SnapIt_vue_vue_type_template_id_1b4ab930_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _SnapIt_vue_vue_type_template_id_1b4ab930_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))
  }
}
component.options.__file = "components/SnapIt.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/SnapIt.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SnapIt_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/SnapIt.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SnapIt_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/SnapIt.vue?vue&type=style&index=0&id=1b4ab930&scoped=true&lang=css&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SnapIt_vue_vue_type_style_index_0_id_1b4ab930_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/SnapIt.vue?vue&type=style&index=0&id=1b4ab930&scoped=true&lang=css&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SnapIt_vue_vue_type_style_index_0_id_1b4ab930_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SnapIt_vue_vue_type_style_index_0_id_1b4ab930_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SnapIt_vue_vue_type_style_index_0_id_1b4ab930_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SnapIt_vue_vue_type_style_index_0_id_1b4ab930_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SnapIt_vue_vue_type_style_index_0_id_1b4ab930_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./components/SnapIt.vue?vue&type=template&id=1b4ab930&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SnapIt_vue_vue_type_template_id_1b4ab930_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/SnapIt.vue?vue&type=template&id=1b4ab930&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SnapIt_vue_vue_type_template_id_1b4ab930_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SnapIt_vue_vue_type_template_id_1b4ab930_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./nativescript-camera/camera.common.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function getAspectSafeDimensions(sourceWidth, sourceHeight, reqWidth, reqHeight) {
  var widthCoef = sourceWidth / reqWidth;
  var heightCoef = sourceHeight / reqHeight;
  var aspectCoef = widthCoef > heightCoef ? widthCoef : heightCoef;
  return {
    width: Math.floor(sourceWidth / aspectCoef),
    height: Math.floor(sourceHeight / aspectCoef)
  };
}

exports.getAspectSafeDimensions = getAspectSafeDimensions;

/***/ }),

/***/ "./nativescript-camera/camera.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var applicationModule = __webpack_require__("tns-core-modules/application/application");

var imageAssetModule = __webpack_require__("tns-core-modules/image-asset/image-asset");

var trace = __webpack_require__("tns-core-modules/trace/trace");

var platform = __webpack_require__("tns-core-modules/platform/platform");

var permissions = __webpack_require__("../node_modules/nativescript-permissions/permissions.js");

var REQUEST_IMAGE_CAPTURE = 3453;

var useAndroidX = function useAndroidX() {
  return global.androidx && global.androidx.appcompat;
};

var FileProviderPackageName = useAndroidX() ? global.androidx.core.content : android.support.v4.content;

exports.takePicture = function (options) {
  return new Promise(function (resolve, reject) {
    try {
      if (!permissions.hasPermission(android.Manifest.permission.CAMERA)) {
        reject(new Error("Application does not have permissions to use Camera"));
        return;
      }

      var types = __webpack_require__("tns-core-modules/utils/types");

      var utils = __webpack_require__("tns-core-modules/utils/utils");

      var saveToGallery_1 = true;
      var reqWidth_1 = 0;
      var reqHeight_1 = 0;
      var shouldKeepAspectRatio_1 = true;
      var density = utils.layout.getDisplayDensity();

      if (options) {
        saveToGallery_1 = types.isNullOrUndefined(options.saveToGallery) ? saveToGallery_1 : options.saveToGallery;
        reqWidth_1 = options.width ? options.width * density : reqWidth_1;
        reqHeight_1 = options.height ? options.height * density : reqWidth_1;
        shouldKeepAspectRatio_1 = types.isNullOrUndefined(options.keepAspectRatio) ? shouldKeepAspectRatio_1 : options.keepAspectRatio;
      }

      if (!permissions.hasPermission(android.Manifest.permission.WRITE_EXTERNAL_STORAGE)) {
        saveToGallery_1 = false;
      }

      var takePictureIntent = new android.content.Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);
      var dateStamp = createDateTimeStamp();
      var picturePath_1;
      var nativeFile = void 0;
      var tempPictureUri = void 0;

      if (saveToGallery_1) {
        picturePath_1 = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DCIM).getAbsolutePath() + "/Camera/" + "NSIMG_" + dateStamp + ".jpg";
        nativeFile = new java.io.File(picturePath_1);
      } else {
        picturePath_1 = utils.ad.getApplicationContext().getExternalFilesDir(null).getAbsolutePath() + "/" + "NSIMG_" + dateStamp + ".jpg";
        nativeFile = new java.io.File(picturePath_1);
      }

      var sdkVersionInt = parseInt(platform.device.sdkVersion);

      if (sdkVersionInt >= 21) {
        tempPictureUri = FileProviderPackageName.FileProvider.getUriForFile(applicationModule.android.context, applicationModule.android.nativeApp.getPackageName() + ".provider", nativeFile);
      } else {
        tempPictureUri = android.net.Uri.fromFile(nativeFile);
      }

      takePictureIntent.putExtra(android.provider.MediaStore.EXTRA_OUTPUT, tempPictureUri);

      if (options && options.cameraFacing === "front") {
        takePictureIntent.putExtra("android.intent.extras.CAMERA_FACING", android.hardware.Camera.CameraInfo.CAMERA_FACING_FRONT);
      } else {
        takePictureIntent.putExtra("android.intent.extras.CAMERA_FACING", android.hardware.Camera.CameraInfo.CAMERA_FACING_BACK);
      }

      if (takePictureIntent.resolveActivity(utils.ad.getApplicationContext().getPackageManager()) != null) {
        var appModule_1 = __webpack_require__("tns-core-modules/application");

        appModule_1.android.off("activityResult");
        appModule_1.android.on("activityResult", function (args) {
          var requestCode = args.requestCode;
          var resultCode = args.resultCode;

          if (requestCode === REQUEST_IMAGE_CAPTURE && resultCode === android.app.Activity.RESULT_OK) {
            if (saveToGallery_1) {
              try {
                var callback = new android.media.MediaScannerConnection.OnScanCompletedListener({
                  onScanCompleted: function onScanCompleted(path, uri) {
                    if (trace.isEnabled()) {
                      trace.write("image from path " + path + " has been successfully scanned!", trace.categories.Debug);
                    }
                  }
                });
                android.media.MediaScannerConnection.scanFile(appModule_1.android.context, [picturePath_1], null, callback);
              } catch (ex) {
                if (trace.isEnabled()) {
                  trace.write("An error occurred while scanning file " + picturePath_1 + ": " + ex.message + "!", trace.categories.Debug);
                }
              }
            }

            var exif = new android.media.ExifInterface(picturePath_1);
            var orientation_1 = exif.getAttributeInt(android.media.ExifInterface.TAG_ORIENTATION, android.media.ExifInterface.ORIENTATION_NORMAL);

            if (orientation_1 === android.media.ExifInterface.ORIENTATION_ROTATE_90) {
              rotateBitmap(picturePath_1, 90);
            } else if (orientation_1 === android.media.ExifInterface.ORIENTATION_ROTATE_180) {
              rotateBitmap(picturePath_1, 180);
            } else if (orientation_1 === android.media.ExifInterface.ORIENTATION_ROTATE_270) {
              rotateBitmap(picturePath_1, 270);
            }

            if (shouldKeepAspectRatio_1) {
              var pictureWidth = exif.getAttributeInt(android.media.ExifInterface.TAG_IMAGE_WIDTH, 0);
              var pictureHeight = exif.getAttributeInt(android.media.ExifInterface.TAG_IMAGE_LENGTH, 0);
              var isPictureLandscape = pictureWidth > pictureHeight;
              var areOptionsLandscape = reqWidth_1 > reqHeight_1;

              if (isPictureLandscape !== areOptionsLandscape) {
                var oldReqWidth = reqWidth_1;
                reqWidth_1 = reqHeight_1;
                reqHeight_1 = oldReqWidth;
              }
            }

            var asset = new imageAssetModule.ImageAsset(picturePath_1);
            asset.options = {
              width: reqWidth_1,
              height: reqHeight_1,
              keepAspectRatio: shouldKeepAspectRatio_1
            };
            resolve(asset);
          } else if (resultCode === android.app.Activity.RESULT_CANCELED) {
            reject(new Error("cancelled"));
          }
        });
        appModule_1.android.foregroundActivity.startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
      }
    } catch (e) {
      if (reject) {
        reject(e);
      }
    }
  });
};

exports.isAvailable = function () {
  var utils = __webpack_require__("tns-core-modules/utils/utils");

  return utils.ad.getApplicationContext().getPackageManager().hasSystemFeature(android.content.pm.PackageManager.FEATURE_CAMERA);
};

exports.requestPermissions = function () {
  return permissions.requestPermissions([android.Manifest.permission.WRITE_EXTERNAL_STORAGE, android.Manifest.permission.CAMERA]);
};

exports.requestPhotosPermissions = function () {
  return permissions.requestPermissions([android.Manifest.permission.WRITE_EXTERNAL_STORAGE]);
};

exports.requestCameraPermissions = function () {
  return permissions.requestPermissions([android.Manifest.permission.CAMERA]);
};

var createDateTimeStamp = function createDateTimeStamp() {
  var result = "";
  var date = new Date();
  result = date.getFullYear().toString() + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()) + (date.getDate() < 10 ? "0" + date.getDate().toString() : date.getDate().toString()) + "_" + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString();
  return result;
};

var rotateBitmap = function rotateBitmap(picturePath, angle) {
  try {
    var matrix = new android.graphics.Matrix();
    matrix.postRotate(angle);
    var bmOptions = new android.graphics.BitmapFactory.Options();
    var oldBitmap = android.graphics.BitmapFactory.decodeFile(picturePath, bmOptions);
    var finalBitmap = android.graphics.Bitmap.createBitmap(oldBitmap, 0, 0, oldBitmap.getWidth(), oldBitmap.getHeight(), matrix, true);
    var out = new java.io.FileOutputStream(picturePath);
    finalBitmap.compress(android.graphics.Bitmap.CompressFormat.JPEG, 100, out);
    out.flush();
    out.close();
  } catch (ex) {
    if (trace.isEnabled()) {
      trace.write("An error occurred while rotating file " + picturePath + " (using the original one): " + ex.message + "!", trace.categories.Debug);
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "nativescript-camera":
/***/ (function(module, exports) {

module.exports = require("nativescript-camera");

/***/ }),

/***/ "nativescript-vue":
/***/ (function(module, exports) {

module.exports = require("nativescript-vue");

/***/ }),

/***/ "tns-core-modules/application":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/application");

/***/ }),

/***/ "tns-core-modules/application/application":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/application/application");

/***/ }),

/***/ "tns-core-modules/bundle-entry-points":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/bundle-entry-points");

/***/ }),

/***/ "tns-core-modules/data/observable-array":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/data/observable-array");

/***/ }),

/***/ "tns-core-modules/file-system":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/file-system");

/***/ }),

/***/ "tns-core-modules/image-asset/image-asset":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/image-asset/image-asset");

/***/ }),

/***/ "tns-core-modules/platform":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/platform");

/***/ }),

/***/ "tns-core-modules/platform/platform":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/platform/platform");

/***/ }),

/***/ "tns-core-modules/text/formatted-string":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/text/formatted-string");

/***/ }),

/***/ "tns-core-modules/text/span":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/text/span");

/***/ }),

/***/ "tns-core-modules/trace/trace":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/trace/trace");

/***/ }),

/***/ "tns-core-modules/ui/action-bar":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/action-bar");

/***/ }),

/***/ "tns-core-modules/ui/activity-indicator":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/activity-indicator");

/***/ }),

/***/ "tns-core-modules/ui/border":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/border");

/***/ }),

/***/ "tns-core-modules/ui/bottom-navigation":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/bottom-navigation");

/***/ }),

/***/ "tns-core-modules/ui/button":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/button");

/***/ }),

/***/ "tns-core-modules/ui/content-view":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/content-view");

/***/ }),

/***/ "tns-core-modules/ui/core/view":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/core/view");

/***/ }),

/***/ "tns-core-modules/ui/date-picker":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/date-picker");

/***/ }),

/***/ "tns-core-modules/ui/frame":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/frame");

/***/ }),

/***/ "tns-core-modules/ui/frame/activity":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/frame/activity");

/***/ }),

/***/ "tns-core-modules/ui/html-view":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/html-view");

/***/ }),

/***/ "tns-core-modules/ui/image":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/image");

/***/ }),

/***/ "tns-core-modules/ui/label":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/label");

/***/ }),

/***/ "tns-core-modules/ui/layouts/absolute-layout":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/layouts/absolute-layout");

/***/ }),

/***/ "tns-core-modules/ui/layouts/dock-layout":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/layouts/dock-layout");

/***/ }),

/***/ "tns-core-modules/ui/layouts/flexbox-layout":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/layouts/flexbox-layout");

/***/ }),

/***/ "tns-core-modules/ui/layouts/grid-layout":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/layouts/grid-layout");

/***/ }),

/***/ "tns-core-modules/ui/layouts/layout-base":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/layouts/layout-base");

/***/ }),

/***/ "tns-core-modules/ui/layouts/stack-layout":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/layouts/stack-layout");

/***/ }),

/***/ "tns-core-modules/ui/layouts/wrap-layout":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/layouts/wrap-layout");

/***/ }),

/***/ "tns-core-modules/ui/list-picker":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/list-picker");

/***/ }),

/***/ "tns-core-modules/ui/list-view":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/list-view");

/***/ }),

/***/ "tns-core-modules/ui/page":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/page");

/***/ }),

/***/ "tns-core-modules/ui/placeholder":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/placeholder");

/***/ }),

/***/ "tns-core-modules/ui/progress":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/progress");

/***/ }),

/***/ "tns-core-modules/ui/proxy-view-container":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/proxy-view-container");

/***/ }),

/***/ "tns-core-modules/ui/scroll-view":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/scroll-view");

/***/ }),

/***/ "tns-core-modules/ui/search-bar":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/search-bar");

/***/ }),

/***/ "tns-core-modules/ui/segmented-bar":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/segmented-bar");

/***/ }),

/***/ "tns-core-modules/ui/slider":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/slider");

/***/ }),

/***/ "tns-core-modules/ui/styling/style-scope":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/styling/style-scope");

/***/ }),

/***/ "tns-core-modules/ui/switch":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/switch");

/***/ }),

/***/ "tns-core-modules/ui/tab-navigation-base/tab-content-item":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/tab-navigation-base/tab-content-item");

/***/ }),

/***/ "tns-core-modules/ui/tab-navigation-base/tab-strip":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/tab-navigation-base/tab-strip");

/***/ }),

/***/ "tns-core-modules/ui/tab-navigation-base/tab-strip-item":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/tab-navigation-base/tab-strip-item");

/***/ }),

/***/ "tns-core-modules/ui/tab-view":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/tab-view");

/***/ }),

/***/ "tns-core-modules/ui/tabs":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/tabs");

/***/ }),

/***/ "tns-core-modules/ui/text-field":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/text-field");

/***/ }),

/***/ "tns-core-modules/ui/text-view":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/text-view");

/***/ }),

/***/ "tns-core-modules/ui/time-picker":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/time-picker");

/***/ }),

/***/ "tns-core-modules/ui/web-view":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/web-view");

/***/ }),

/***/ "tns-core-modules/utils/types":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/utils/types");

/***/ }),

/***/ "tns-core-modules/utils/utils":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/utils/utils");

/***/ }),

/***/ "tns-core-modules/xml":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/xml");

/***/ })

},[["./app.js","runtime","vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY29tcG9uZW50cy9TbmFwSXQudnVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvU25hcEl0LnZ1ZT8wNWQyIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvU25hcEl0LnZ1ZT9iZDRlIiwid2VicGFjazovLy8uIHN5bmMgbm9ucmVjdXJzaXZlIF5cXC5cXC9hcHBcXC4oY3NzfHNjc3N8bGVzc3xzYXNzKSQiLCJ3ZWJwYWNrOi8vL1xcYl9bXFx3LV0qXFwuKXNjc3MpJCIsIndlYnBhY2s6Ly8vLi9hcHAuY3NzIiwid2VicGFjazovLy8uL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1NuYXBJdC52dWUiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9TbmFwSXQudnVlPzQ5OTEiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9TbmFwSXQudnVlP2UzNTIiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9TbmFwSXQudnVlPzVhZjIiLCJ3ZWJwYWNrOi8vLy4vbmF0aXZlc2NyaXB0LWNhbWVyYS9jYW1lcmEuY29tbW9uLmpzIiwid2VicGFjazovLy8uL25hdGl2ZXNjcmlwdC1jYW1lcmEvY2FtZXJhLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5hdGl2ZXNjcmlwdC1jYW1lcmFcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuYXRpdmVzY3JpcHQtdnVlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24vYXBwbGljYXRpb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL2J1bmRsZS1lbnRyeS1wb2ludHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL2ltYWdlLWFzc2V0L2ltYWdlLWFzc2V0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm0vcGxhdGZvcm1cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3RleHQvZm9ybWF0dGVkLXN0cmluZ1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdGV4dC9zcGFuXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy90cmFjZS90cmFjZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvYWN0aW9uLWJhclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvYWN0aXZpdHktaW5kaWNhdG9yXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9ib3JkZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2JvdHRvbS1uYXZpZ2F0aW9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9idXR0b25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvbnRlbnQtdmlld1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kYXRlLXBpY2tlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ZyYW1lL2FjdGl2aXR5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9odG1sLXZpZXdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYWJlbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9hYnNvbHV0ZS1sYXlvdXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvZG9jay1sYXlvdXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvZmxleGJveC1sYXlvdXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvZ3JpZC1sYXlvdXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvbGF5b3V0LWJhc2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvc3RhY2stbGF5b3V0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3dyYXAtbGF5b3V0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXBpY2tlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC12aWV3XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wbGFjZWhvbGRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvcHJvZ3Jlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3Byb3h5LXZpZXctY29udGFpbmVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zY3JvbGwtdmlld1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2VhcmNoLWJhclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2VnbWVudGVkLWJhclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2xpZGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zdHlsaW5nL3N0eWxlLXNjb3BlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zd2l0Y2hcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RhYi1uYXZpZ2F0aW9uLWJhc2UvdGFiLWNvbnRlbnQtaXRlbVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGFiLW5hdmlnYXRpb24tYmFzZS90YWItc3RyaXBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RhYi1uYXZpZ2F0aW9uLWJhc2UvdGFiLXN0cmlwLWl0ZW1cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RhYi12aWV3XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS90YWJzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LWZpZWxkXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LXZpZXdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RpbWUtcGlja2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS93ZWItdmlld1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdXRpbHMvdHlwZXNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3V0aWxzL3V0aWxzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy94bWxcIiJdLCJuYW1lcyI6WyJTbmFwSXQiLCJ0ZW1wbGF0ZSIsIiRzdGFydCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiZ2V0QXNwZWN0U2FmZURpbWVuc2lvbnMiLCJzb3VyY2VXaWR0aCIsInNvdXJjZUhlaWdodCIsInJlcVdpZHRoIiwicmVxSGVpZ2h0Iiwid2lkdGhDb2VmIiwiaGVpZ2h0Q29lZiIsImFzcGVjdENvZWYiLCJ3aWR0aCIsIk1hdGgiLCJmbG9vciIsImhlaWdodCIsImFwcGxpY2F0aW9uTW9kdWxlIiwicmVxdWlyZSIsImltYWdlQXNzZXRNb2R1bGUiLCJ0cmFjZSIsInBsYXRmb3JtIiwicGVybWlzc2lvbnMiLCJSRVFVRVNUX0lNQUdFX0NBUFRVUkUiLCJ1c2VBbmRyb2lkWCIsImdsb2JhbCIsImFuZHJvaWR4IiwiYXBwY29tcGF0IiwiRmlsZVByb3ZpZGVyUGFja2FnZU5hbWUiLCJjb3JlIiwiY29udGVudCIsImFuZHJvaWQiLCJzdXBwb3J0IiwidjQiLCJ0YWtlUGljdHVyZSIsIm9wdGlvbnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImhhc1Blcm1pc3Npb24iLCJNYW5pZmVzdCIsInBlcm1pc3Npb24iLCJDQU1FUkEiLCJFcnJvciIsInR5cGVzIiwidXRpbHMiLCJzYXZlVG9HYWxsZXJ5XzEiLCJyZXFXaWR0aF8xIiwicmVxSGVpZ2h0XzEiLCJzaG91bGRLZWVwQXNwZWN0UmF0aW9fMSIsImRlbnNpdHkiLCJsYXlvdXQiLCJnZXREaXNwbGF5RGVuc2l0eSIsImlzTnVsbE9yVW5kZWZpbmVkIiwic2F2ZVRvR2FsbGVyeSIsImtlZXBBc3BlY3RSYXRpbyIsIldSSVRFX0VYVEVSTkFMX1NUT1JBR0UiLCJ0YWtlUGljdHVyZUludGVudCIsIkludGVudCIsInByb3ZpZGVyIiwiTWVkaWFTdG9yZSIsIkFDVElPTl9JTUFHRV9DQVBUVVJFIiwiZGF0ZVN0YW1wIiwiY3JlYXRlRGF0ZVRpbWVTdGFtcCIsInBpY3R1cmVQYXRoXzEiLCJuYXRpdmVGaWxlIiwidGVtcFBpY3R1cmVVcmkiLCJvcyIsIkVudmlyb25tZW50IiwiZ2V0RXh0ZXJuYWxTdG9yYWdlUHVibGljRGlyZWN0b3J5IiwiRElSRUNUT1JZX0RDSU0iLCJnZXRBYnNvbHV0ZVBhdGgiLCJqYXZhIiwiaW8iLCJGaWxlIiwiYWQiLCJnZXRBcHBsaWNhdGlvbkNvbnRleHQiLCJnZXRFeHRlcm5hbEZpbGVzRGlyIiwic2RrVmVyc2lvbkludCIsInBhcnNlSW50IiwiZGV2aWNlIiwic2RrVmVyc2lvbiIsIkZpbGVQcm92aWRlciIsImdldFVyaUZvckZpbGUiLCJjb250ZXh0IiwibmF0aXZlQXBwIiwiZ2V0UGFja2FnZU5hbWUiLCJuZXQiLCJVcmkiLCJmcm9tRmlsZSIsInB1dEV4dHJhIiwiRVhUUkFfT1VUUFVUIiwiY2FtZXJhRmFjaW5nIiwiaGFyZHdhcmUiLCJDYW1lcmEiLCJDYW1lcmFJbmZvIiwiQ0FNRVJBX0ZBQ0lOR19GUk9OVCIsIkNBTUVSQV9GQUNJTkdfQkFDSyIsInJlc29sdmVBY3Rpdml0eSIsImdldFBhY2thZ2VNYW5hZ2VyIiwiYXBwTW9kdWxlXzEiLCJvZmYiLCJvbiIsImFyZ3MiLCJyZXF1ZXN0Q29kZSIsInJlc3VsdENvZGUiLCJhcHAiLCJBY3Rpdml0eSIsIlJFU1VMVF9PSyIsImNhbGxiYWNrIiwibWVkaWEiLCJNZWRpYVNjYW5uZXJDb25uZWN0aW9uIiwiT25TY2FuQ29tcGxldGVkTGlzdGVuZXIiLCJvblNjYW5Db21wbGV0ZWQiLCJwYXRoIiwidXJpIiwiaXNFbmFibGVkIiwid3JpdGUiLCJjYXRlZ29yaWVzIiwiRGVidWciLCJzY2FuRmlsZSIsImV4IiwibWVzc2FnZSIsImV4aWYiLCJFeGlmSW50ZXJmYWNlIiwib3JpZW50YXRpb25fMSIsImdldEF0dHJpYnV0ZUludCIsIlRBR19PUklFTlRBVElPTiIsIk9SSUVOVEFUSU9OX05PUk1BTCIsIk9SSUVOVEFUSU9OX1JPVEFURV85MCIsInJvdGF0ZUJpdG1hcCIsIk9SSUVOVEFUSU9OX1JPVEFURV8xODAiLCJPUklFTlRBVElPTl9ST1RBVEVfMjcwIiwicGljdHVyZVdpZHRoIiwiVEFHX0lNQUdFX1dJRFRIIiwicGljdHVyZUhlaWdodCIsIlRBR19JTUFHRV9MRU5HVEgiLCJpc1BpY3R1cmVMYW5kc2NhcGUiLCJhcmVPcHRpb25zTGFuZHNjYXBlIiwib2xkUmVxV2lkdGgiLCJhc3NldCIsIkltYWdlQXNzZXQiLCJSRVNVTFRfQ0FOQ0VMRUQiLCJmb3JlZ3JvdW5kQWN0aXZpdHkiLCJzdGFydEFjdGl2aXR5Rm9yUmVzdWx0IiwiZSIsImlzQXZhaWxhYmxlIiwiaGFzU3lzdGVtRmVhdHVyZSIsInBtIiwiUGFja2FnZU1hbmFnZXIiLCJGRUFUVVJFX0NBTUVSQSIsInJlcXVlc3RQZXJtaXNzaW9ucyIsInJlcXVlc3RQaG90b3NQZXJtaXNzaW9ucyIsInJlcXVlc3RDYW1lcmFQZXJtaXNzaW9ucyIsInJlc3VsdCIsImRhdGUiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJ0b1N0cmluZyIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImdldFNlY29uZHMiLCJwaWN0dXJlUGF0aCIsImFuZ2xlIiwibWF0cml4IiwiZ3JhcGhpY3MiLCJNYXRyaXgiLCJwb3N0Um90YXRlIiwiYm1PcHRpb25zIiwiQml0bWFwRmFjdG9yeSIsIk9wdGlvbnMiLCJvbGRCaXRtYXAiLCJkZWNvZGVGaWxlIiwiZmluYWxCaXRtYXAiLCJCaXRtYXAiLCJjcmVhdGVCaXRtYXAiLCJnZXRXaWR0aCIsImdldEhlaWdodCIsIm91dCIsIkZpbGVPdXRwdXRTdHJlYW0iLCJjb21wcmVzcyIsIkNvbXByZXNzRm9ybWF0IiwiSlBFRyIsImZsdXNoIiwiY2xvc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0QkE7QUFLQTtBQUNBO0FBQ0E7QUFDQSx3RkFEQTtBQUVBO0FBRkE7QUFJQSxHQU5BOztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEZBQ0E7QUFDQTtBQUNBLDJCQURBO0FBRUEsNkJBRkE7QUFHQSxnQ0FDQSxlQUpBO0FBS0EsMkNBTEE7QUFNQTtBQU5BLFdBT0EsSUFQQSxDQVFBO0FBQ0E7QUFDQSw2Q0FDQSxXQURBLEVBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsMkJBQ0EsT0FEQSxFQUNBO0FBQ0E7QUFDQSxzQkFDQSxZQUNBLFVBREEsS0FFQSxhQUNBLGNBREEsQ0FFQSxlQUxBO0FBTUEsNEJBQ0EsWUFDQSxRQURBLEVBREE7QUFHQSw2QkFDQSxZQUNBLFNBREEsRUFEQTtBQUdBLGFBZkEsTUFlQTtBQUNBLHNCQUNBLFlBQ0EsS0FGQTtBQUdBLDRCQUNBLFlBQ0EsSUFEQSxDQUNBLEtBREEsR0FFQSxLQUhBO0FBSUEsNkJBQ0EsWUFDQSxJQURBLENBQ0EsTUFEQSxHQUVBLEtBSEE7QUFJQTs7QUFDQSw2QkFDQSw2SEFDQSxXQUNBLG1CQURBLENBREEsY0FHQSxnQ0FIQSxDQURBO0FBS0Esa0NBQ0EsU0FEQSxHQXJDQSxDQXlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0EvQ0E7QUFnREEsU0ExREEsRUEyREE7QUFDQSx3Q0FDQSxPQURBO0FBRUEsU0E5REE7QUFnRUEsT0FsRUEsRUFtRUEsbUNBbkVBO0FBcUVBO0FBekVBO0FBUEEsRzs7Ozs7OztBQ2pDQSx5RUFBMkIsbUJB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LHVEOzs7Ozs7O0FDQUEseUQ7Ozs7Ozs7QUNBQSwyRDs7Ozs7OztBQ0FBLG1FOzs7Ozs7O0FDQUEsdUQ7Ozs7Ozs7QUNBQSxrRTs7Ozs7OztBQ0FBLHVEOzs7Ozs7O0FDQUEsNkQ7Ozs7Ozs7QUNBQSwwRDs7Ozs7OztBQ0FBLDREOzs7Ozs7O0FDQUEsc0Q7Ozs7Ozs7QUNBQSwrRDs7Ozs7OztBQ0FBLDBEOzs7Ozs7O0FDQUEsc0Q7Ozs7Ozs7QUNBQSxzRDs7Ozs7OztBQ0FBLHdFOzs7Ozs7O0FDQUEsb0U7Ozs7Ozs7QUNBQSx1RTs7Ozs7OztBQ0FBLG9FOzs7Ozs7O0FDQUEsb0U7Ozs7Ozs7QUNBQSxxRTs7Ozs7OztBQ0FBLG9FOzs7Ozs7O0FDQUEsNEQ7Ozs7Ozs7QUNBQSwwRDs7Ozs7OztBQ0FBLHFEOzs7Ozs7O0FDQUEsNEQ7Ozs7Ozs7QUNBQSx5RDs7Ozs7OztBQ0FBLHFFOzs7Ozs7O0FDQUEsNEQ7Ozs7Ozs7QUNBQSwyRDs7Ozs7OztBQ0FBLDhEOzs7Ozs7O0FDQUEsdUQ7Ozs7Ozs7QUNBQSxvRTs7Ozs7OztBQ0FBLHVEOzs7Ozs7O0FDQUEscUY7Ozs7Ozs7QUNBQSw4RTs7Ozs7OztBQ0FBLG1GOzs7Ozs7O0FDQUEseUQ7Ozs7Ozs7QUNBQSxxRDs7Ozs7OztBQ0FBLDJEOzs7Ozs7O0FDQUEsMEQ7Ozs7Ozs7QUNBQSw0RDs7Ozs7OztBQ0FBLHlEOzs7Ozs7O0FDQUEseUQ7Ozs7Ozs7QUNBQSx5RDs7Ozs7OztBQ0FBLGlEIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgICA8UGFnZT5cbiAgICAgICAgPEFjdGlvbkJhciB0aXRsZT1cIk1vbnN0ZXIgYW5kIEhlcm9zXCIgLz5cbiAgICAgICAgPFNjcm9sbFZpZXc+XG4gICAgICAgICAgICA8U3RhY2tMYXlvdXQgY2xhc3M9XCJob21lLXBhbmVsXCI+XG4gICAgICAgICAgICAgICAgPCEtLUFkZCB5b3VyIHBhZ2UgY29udGVudCBoZXJlLS0+XG4gICAgICAgICAgICAgICAgPExhYmVsIHRleHRXcmFwPVwidHJ1ZVwiIHRleHQ9XCJQbGF5IHdpdGggTmF0aXZlU2NyaXB0IVwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaDIgZGVzY3JpcHRpb24tbGFiZWxcIiAvPlxuICAgICAgICAgICAgICAgIDxMYWJlbCB0ZXh0V3JhcD1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICB0ZXh0PVwiV3JpdGUgY29kZSBpbiB0aGUgZWRpdG9yIG9yIGRyYWcgYW5kIGRyb3AgY29tcG9uZW50cyB0byBidWlsZCBhIE5hdGl2ZVNjcmlwdCBtb2JpbGUgYXBwbGljYXRpb24uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJoMiBkZXNjcmlwdGlvbi1sYWJlbFwiIC8+XG4gICAgICAgICAgICAgICAgPExhYmVsIHRleHRXcmFwPVwidHJ1ZVwiIHRleHQ9XCI8SW1hZ2Ugc3JjPVwiXG4gICAgICAgICAgICAgICAgICAgIGh0dHBzOi8vcGxheS5uYXRpdmVzY3JpcHQub3JnL2Rpc3QvYXNzZXRzL2ltZy9OYXRpdmVTY3JpcHRfbG9nby5wbmdcIiAvPlxuICAgICAgICAgICAgICAgIFNjYW4gdGhlIFFSIGNvZGUgd2l0aCB5b3VyIG1vYmlsZSBkZXZpY2UgYW5kIHdhdGNoIHRoZSBjaGFuZ2VzXG4gICAgICAgICAgICAgICAgc3luYyBsaXZlIHdoaWxlIHlvdSBwbGF5IHdpdGggdGhlIGNvZGUuXCIgY2xhc3M9XCJoMlxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLWxhYmVsXCIgLz5cbiAgICAgICAgICAgICAgICA8SW1hZ2UgOnNyYz1cImNhbWVyYUltYWdlXCIgaWQ9XCJpbWFnZVwiIHN0cmV0Y2g9XCJhc3BlY3RGaXRcIlxuICAgICAgICAgICAgICAgICAgICBtYXJnaW49XCIxMFwiIC8+XG4gICAgICAgICAgICAgICAgPFRleHRWaWV3IHJvdz1cIjJcIiA6dGV4dD1cImxhYmVsVGV4dFwiIGVkaXRhYmxlPVwiZmFsc2VcIj5cbiAgICAgICAgICAgICAgICA8L1RleHRWaWV3PlxuICAgICAgICAgICAgICAgIDxCdXR0b24gcm93PVwiM1wiIHRleHQ9XCJUYWtlIFBpY3R1cmVcIiBAdGFwPVwib25UYWtlUGljdHVyZVRhcFwiXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc9XCIxMFwiIC8+XG4gICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuICAgICAgICA8L1Njcm9sbFZpZXc+XG4gICAgPC9QYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQge1xuICAgICAgICB0YWtlUGljdHVyZSxcbiAgICAgICAgcmVxdWVzdFBlcm1pc3Npb25zXG4gICAgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWNhbWVyYVwiO1xuXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjYW1lcmFJbWFnZTogXCJodHRwczovL3BsYXkubmF0aXZlc2NyaXB0Lm9yZy9kaXN0L2Fzc2V0cy9pbWcvTmF0aXZlU2NyaXB0X2xvZ28ucG5nXCIsXG4gICAgICAgICAgICAgICAgbGFiZWxUZXh0OiBcIlRlc3RcIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgb25UYWtlUGljdHVyZVRhcDogZnVuY3Rpb24oYXJncykge1xuICAgICAgICAgICAgICAgIGxldCBwYWdlID0gYXJncy5vYmplY3QucGFnZTtcbiAgICAgICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgcmVxdWVzdFBlcm1pc3Npb25zKCkudGhlbihcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFrZVBpY3R1cmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGF0LndpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogdGhhdC5oZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2VlcEFzcGVjdFJhdGlvOiB0aGF0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5rZWVwQXNwZWN0UmF0aW8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZVRvR2FsbGVyeTogdGhhdC5zYXZlVG9HYWxsZXJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbG93c0VkaXRpbmc6IHRoYXQuYWxsb3dzRWRpdGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZUFzc2V0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jYW1lcmFJbWFnZSA9IGltYWdlQXNzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlQXNzZXQuZ2V0SW1hZ2VBc3luYyhmdW5jdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZUltYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGUgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdHVhbFdpZHRoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3R1YWxIZWlnaHQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlQXNzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYW5kcm9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY3VycmVudCBkZW5zaXR5IG9mIHRoZSBzY3JlZW4gKGRwaSkgYW5kIGRpdmlkZSBpdCBieSB0aGUgZGVmYXVsdCBvbmUgdG8gZ2V0IHRoZSBzY2FsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlSW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldERlbnNpdHkoKSAvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZHJvaWQudXRpbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuRGlzcGxheU1ldHJpY3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLkRFTlNJVFlfREVGQVVMVDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3R1YWxXaWR0aCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZUltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRXaWR0aCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbEhlaWdodCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZUltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRIZWlnaHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVJbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2NhbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0dWFsV2lkdGggPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVJbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2l6ZS53aWR0aCAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbEhlaWdodCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZUltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zaXplLmhlaWdodCAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sYWJlbFRleHQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBEaXNwbGF5ZWQgU2l6ZTogJHthY3R1YWxXaWR0aH14JHthY3R1YWxIZWlnaHR9IHdpdGggc2NhbGUgJHtzY2FsZX1cXG5gICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgSW1hZ2UgU2l6ZTogJHtNYXRoLnJvdW5kKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbFdpZHRoIC8gc2NhbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9eCR7TWF0aC5yb3VuZChhY3R1YWxIZWlnaHQgLyBzY2FsZSl9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAke2xhYmVsVGV4dH1gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhhdC4kbmF2aWdhdGVUbyhDb25maXJtLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgY2FwdHVyZWRJbWFnZTogaW1hZ2VBc3NldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtPiBcIiArIGVyclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICgpID0+IGFsZXJ0KFwicGVybWlzc2lvbnMgcmVqZWN0ZWRcIilcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuICAgIC5ob21lLXBhbmVsIHtcbiAgICAgICAgdmVydGljYWwtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgZm9udC1zaXplOiAyMDtcbiAgICAgICAgbWFyZ2luOiAxNTtcbiAgICB9XG5cbiAgICAuZGVzY3JpcHRpb24tbGFiZWwge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAxNTtcbiAgICB9XG48L3N0eWxlPiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLmhvbWUtcGFuZWxbZGF0YS12LTFiNGFiOTMwXSB7XFxuICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7XFxuICAgIGZvbnQtc2l6ZTogMjA7XFxuICAgIG1hcmdpbjogMTU7XFxufVxcbi5kZXNjcmlwdGlvbi1sYWJlbFtkYXRhLXYtMWI0YWI5MzBdIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMTU7XFxufVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuICAgIGNvbnN0IGFwcGxpY2F0aW9uID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIik7XG4gICAgcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvc3R5bGluZy9zdHlsZS1zY29wZVwiKTtcblxuICAgIGlmICh0eXBlb2YgZXhwb3J0cy5mb3JFYWNoID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgZXhwb3J0cy5mb3JFYWNoKGNzc0V4cG9ydCA9PiB7XG4gICAgICAgICAgICBpZiAoY3NzRXhwb3J0Lmxlbmd0aCA+IDEgJiYgY3NzRXhwb3J0WzFdKSB7XG4gICAgICAgICAgICAgICAgLy8gYXBwbHlpbmcgdGhlIHNlY29uZCBpdGVtIG9mIHRoZSBleHBvcnQgYXMgaXQgY29udGFpbnMgdGhlIGNzcyBjb250ZW50c1xuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uLmFkZENzcyhjc3NFeHBvcnRbMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG47XG4gICAgaWYgKG1vZHVsZS5ob3QpIHtcbiAgICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoKTtcbiAgICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKCgpID0+IHtcbiAgICAgICAgICAgIGdsb2JhbC5obXJSZWZyZXNoKHsgdHlwZTogJ3N0eWxlJywgcGF0aDogJy4vY29tcG9uZW50cy9TbmFwSXQudnVlJyB9KTtcbiAgICAgICAgfSlcbiAgICB9XG4iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiUGFnZVwiLFxuICAgIFtcbiAgICAgIF9jKFwiQWN0aW9uQmFyXCIsIHsgYXR0cnM6IHsgdGl0bGU6IFwiTW9uc3RlciBhbmQgSGVyb3NcIiB9IH0pLFxuICAgICAgX2MoXG4gICAgICAgIFwiU2Nyb2xsVmlld1wiLFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImhvbWUtcGFuZWxcIiB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJoMiBkZXNjcmlwdGlvbi1sYWJlbFwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHRleHRXcmFwOiBcInRydWVcIiwgdGV4dDogXCJQbGF5IHdpdGggTmF0aXZlU2NyaXB0IVwiIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImgyIGRlc2NyaXB0aW9uLWxhYmVsXCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIHRleHRXcmFwOiBcInRydWVcIixcbiAgICAgICAgICAgICAgICAgIHRleHQ6XG4gICAgICAgICAgICAgICAgICAgIFwiV3JpdGUgY29kZSBpbiB0aGUgZWRpdG9yIG9yIGRyYWcgYW5kIGRyb3AgY29tcG9uZW50cyB0byBidWlsZCBhIE5hdGl2ZVNjcmlwdCBtb2JpbGUgYXBwbGljYXRpb24uXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgJy8vcGxheS5uYXRpdmVzY3JpcHQub3JnL2Rpc3QvYXNzZXRzL2ltZy9OYXRpdmVTY3JpcHRfbG9nby5wbmdcIiAvPlxcbiAgICAgICAgICAgIFNjYW4gdGhlIFFSIGNvZGUgd2l0aCB5b3VyIG1vYmlsZSBkZXZpY2UgYW5kIHdhdGNoIHRoZSBjaGFuZ2VzXFxuICAgICAgICAgICAgc3luYyBsaXZlIHdoaWxlIHlvdSBwbGF5IHdpdGggdGhlIGNvZGUuXCIgY2xhc3M9XCJoMlxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLWxhYmVsXCIgLz5cXG4gICAgICAgICAgICAnXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF9jKFwiSW1hZ2VcIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBzcmM6IF92bS5jYW1lcmFJbWFnZSxcbiAgICAgICAgICAgICAgICAgIGlkOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICBzdHJldGNoOiBcImFzcGVjdEZpdFwiLFxuICAgICAgICAgICAgICAgICAgbWFyZ2luOiBcIjEwXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIlRleHRWaWV3XCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczogeyByb3c6IFwiMlwiLCB0ZXh0OiBfdm0ubGFiZWxUZXh0LCBlZGl0YWJsZTogXCJmYWxzZVwiIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF9jKFwiQnV0dG9uXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczogeyByb3c6IFwiM1wiLCB0ZXh0OiBcIlRha2UgUGljdHVyZVwiLCBwYWRkaW5nOiBcIjEwXCIgfSxcbiAgICAgICAgICAgICAgICBvbjogeyB0YXA6IF92bS5vblRha2VQaWN0dXJlVGFwIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYXBwLmNzc1wiOiBcIi4vYXBwLmNzc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuLyBzeW5jIF5cXFxcLlxcXFwvYXBwXFxcXC4oY3NzfHNjc3N8bGVzc3xzYXNzKSRcIjsiLCJ2YXIgbWFwID0ge1xuXHRcIi4vYXBwLmNzc1wiOiBcIi4vYXBwLmNzc1wiLFxuXHRcIi4vYXBwLmpzXCI6IFwiLi9hcHAuanNcIixcblx0XCIuL25hdGl2ZXNjcmlwdC1jYW1lcmEvY2FtZXJhLmNvbW1vbi5qc1wiOiBcIi4vbmF0aXZlc2NyaXB0LWNhbWVyYS9jYW1lcmEuY29tbW9uLmpzXCIsXG5cdFwiLi9uYXRpdmVzY3JpcHQtY2FtZXJhL2NhbWVyYS5qc1wiOiBcIi4vbmF0aXZlc2NyaXB0LWNhbWVyYS9jYW1lcmEuanNcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi8gc3luYyByZWN1cnNpdmUgKD88IVxcXFxiQXBwX1Jlc291cmNlc1xcXFxiLiopKD88IVxcXFwuXFxcXC9cXFxcYnRlc3RzXFxcXGJcXFxcLy4qPylcXFxcLih4bWx8Y3NzfGpzfCg/PCFcXFxcLmRcXFxcLil0c3woPzwhXFxcXGJfW1xcXFx3LV0qXFxcXC4pc2NzcykkXCI7IiwiZ2xvYmFsLnJlZ2lzdGVyTW9kdWxlKFwifkBuYXRpdmVzY3JpcHQvdGhlbWUvY3NzL2NvcmUuY3NzXCIsICgpID0+IHJlcXVpcmUoXCIhbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL2NzczJqc29uLWxvYWRlcj91c2VGb3JJbXBvcnRzIUBuYXRpdmVzY3JpcHQvdGhlbWUvY3NzL2NvcmUuY3NzXCIpKTtcbmdsb2JhbC5yZWdpc3Rlck1vZHVsZShcIkBuYXRpdmVzY3JpcHQvdGhlbWUvY3NzL2NvcmUuY3NzXCIsICgpID0+IHJlcXVpcmUoXCIhbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL2NzczJqc29uLWxvYWRlcj91c2VGb3JJbXBvcnRzIUBuYXRpdmVzY3JpcHQvdGhlbWUvY3NzL2NvcmUuY3NzXCIpKTtcbmdsb2JhbC5yZWdpc3Rlck1vZHVsZShcIn5AbmF0aXZlc2NyaXB0L3RoZW1lL2Nzcy9za3kuY3NzXCIsICgpID0+IHJlcXVpcmUoXCIhbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL2NzczJqc29uLWxvYWRlcj91c2VGb3JJbXBvcnRzIUBuYXRpdmVzY3JpcHQvdGhlbWUvY3NzL3NreS5jc3NcIikpO1xuZ2xvYmFsLnJlZ2lzdGVyTW9kdWxlKFwiQG5hdGl2ZXNjcmlwdC90aGVtZS9jc3Mvc2t5LmNzc1wiLCAoKSA9PiByZXF1aXJlKFwiIW5hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9jc3MyanNvbi1sb2FkZXI/dXNlRm9ySW1wb3J0cyFAbmF0aXZlc2NyaXB0L3RoZW1lL2Nzcy9za3kuY3NzXCIpKTttb2R1bGUuZXhwb3J0cyA9IHtcInR5cGVcIjpcInN0eWxlc2hlZXRcIixcInN0eWxlc2hlZXRcIjp7XCJydWxlc1wiOlt7XCJ0eXBlXCI6XCJpbXBvcnRcIixcImltcG9ydFwiOlwiJ35AbmF0aXZlc2NyaXB0L3RoZW1lL2Nzcy9jb3JlLmNzcydcIn0se1widHlwZVwiOlwiaW1wb3J0XCIsXCJpbXBvcnRcIjpcIid+QG5hdGl2ZXNjcmlwdC90aGVtZS9jc3Mvc2t5LmNzcydcIn0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiLmJ0blwiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImZvbnQtc2l6ZVwiLFwidmFsdWVcIjpcIjE4XCJ9XX1dLFwicGFyc2luZ0Vycm9yc1wiOltdfX07O1xuICAgIGlmIChtb2R1bGUuaG90KSB7XG4gICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG4gICAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZSgoKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwuaG1yUmVmcmVzaCh7IHR5cGU6ICdzdHlsZScsIHBhdGg6ICcuL2FwcC5jc3MnIH0pO1xuICAgICAgICB9KVxuICAgIH1cbiIsImltcG9ydCBWdWUgZnJvbSBcIm5hdGl2ZXNjcmlwdC12dWVcIjtcblxuaW1wb3J0IFNuYXBJdCBmcm9tIFwiLi9jb21wb25lbnRzL1NuYXBJdFwiO1xuXG4vLyBVbmNvbW1tZW50IHRoZSBmb2xsb3dpbmcgdG8gc2VlIE5hdGl2ZVNjcmlwdC1WdWUgb3V0cHV0IGxvZ3Ncbi8vIFZ1ZS5jb25maWcuc2lsZW50ID0gZmFsc2U7XG5cbm5ldyBWdWUoe1xuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8RnJhbWU+XG4gICAgICAgICAgICA8U25hcEl0IC8+XG4gICAgICAgIDwvRnJhbWU+YCxcblxuICBjb21wb25lbnRzOiB7XG4gICAgU25hcEl0XG4gIH1cbn0pLiRzdGFydCgpO1xuIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9TbmFwSXQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTFiNGFiOTMwJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1NuYXBJdC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1NuYXBJdC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vU25hcEl0LnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTFiNGFiOTMwJnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCIxYjRhYjkzMFwiLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy9hbmRyZXdmcmFuay9Qcm9qZWN0cy9TYW5kYm94L21vbnN0ZXJzLWFuZC1oZXJvZXMvbW9iaWxlLWFwcC9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCcxYjRhYjkzMCcpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCcxYjRhYjkzMCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCcxYjRhYjkzMCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vU25hcEl0LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xYjRhYjkzMCZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCcxYjRhYjkzMCcsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiY29tcG9uZW50cy9TbmFwSXQudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1NuYXBJdC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9TbmFwSXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL3N0eWxlLWhvdC1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9hcHBseS1jc3MtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTMtMiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9TbmFwSXQudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MWI0YWI5MzAmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9zdHlsZS1ob3QtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svYXBwbHktY3NzLWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0zLTIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vU25hcEl0LnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTFiNGFiOTMwJnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1NuYXBJdC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MWI0YWI5MzAmc2NvcGVkPXRydWUmXCIiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGdldEFzcGVjdFNhZmVEaW1lbnNpb25zKHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQsIHJlcVdpZHRoLCByZXFIZWlnaHQpIHtcbiAgICB2YXIgd2lkdGhDb2VmID0gc291cmNlV2lkdGggLyByZXFXaWR0aDtcbiAgICB2YXIgaGVpZ2h0Q29lZiA9IHNvdXJjZUhlaWdodCAvIHJlcUhlaWdodDtcbiAgICB2YXIgYXNwZWN0Q29lZiA9IHdpZHRoQ29lZiA+IGhlaWdodENvZWYgPyB3aWR0aENvZWYgOiBoZWlnaHRDb2VmO1xuICAgIHJldHVybiB7XG4gICAgICAgIHdpZHRoOiBNYXRoLmZsb29yKHNvdXJjZVdpZHRoIC8gYXNwZWN0Q29lZiksXG4gICAgICAgIGhlaWdodDogTWF0aC5mbG9vcihzb3VyY2VIZWlnaHQgLyBhc3BlY3RDb2VmKVxuICAgIH07XG59XG5leHBvcnRzLmdldEFzcGVjdFNhZmVEaW1lbnNpb25zID0gZ2V0QXNwZWN0U2FmZURpbWVuc2lvbnM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jYW1lcmEuY29tbW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGFwcGxpY2F0aW9uTW9kdWxlID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24vYXBwbGljYXRpb25cIik7XG52YXIgaW1hZ2VBc3NldE1vZHVsZSA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2ltYWdlLWFzc2V0L2ltYWdlLWFzc2V0XCIpO1xudmFyIHRyYWNlID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdHJhY2UvdHJhY2VcIik7XG52YXIgcGxhdGZvcm0gPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybS9wbGF0Zm9ybVwiKTtcbnZhciBwZXJtaXNzaW9ucyA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGVybWlzc2lvbnNcIik7XG52YXIgUkVRVUVTVF9JTUFHRV9DQVBUVVJFID0gMzQ1MztcbnZhciB1c2VBbmRyb2lkWCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZ2xvYmFsLmFuZHJvaWR4ICYmIGdsb2JhbC5hbmRyb2lkeC5hcHBjb21wYXQ7XG59O1xudmFyIEZpbGVQcm92aWRlclBhY2thZ2VOYW1lID0gdXNlQW5kcm9pZFgoKSA/IGdsb2JhbC5hbmRyb2lkeC5jb3JlLmNvbnRlbnQgOiBhbmRyb2lkLnN1cHBvcnQudjQuY29udGVudDtcbmV4cG9ydHMudGFrZVBpY3R1cmUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXBlcm1pc3Npb25zLmhhc1Blcm1pc3Npb24oYW5kcm9pZC5NYW5pZmVzdC5wZXJtaXNzaW9uLkNBTUVSQSkpIHtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiQXBwbGljYXRpb24gZG9lcyBub3QgaGF2ZSBwZXJtaXNzaW9ucyB0byB1c2UgQ2FtZXJhXCIpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91dGlscy90eXBlc1wiKTtcbiAgICAgICAgICAgIHZhciB1dGlscyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3V0aWxzL3V0aWxzXCIpO1xuICAgICAgICAgICAgdmFyIHNhdmVUb0dhbGxlcnlfMSA9IHRydWU7XG4gICAgICAgICAgICB2YXIgcmVxV2lkdGhfMSA9IDA7XG4gICAgICAgICAgICB2YXIgcmVxSGVpZ2h0XzEgPSAwO1xuICAgICAgICAgICAgdmFyIHNob3VsZEtlZXBBc3BlY3RSYXRpb18xID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBkZW5zaXR5ID0gdXRpbHMubGF5b3V0LmdldERpc3BsYXlEZW5zaXR5KCk7XG4gICAgICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgICAgICAgIHNhdmVUb0dhbGxlcnlfMSA9IHR5cGVzLmlzTnVsbE9yVW5kZWZpbmVkKG9wdGlvbnMuc2F2ZVRvR2FsbGVyeSkgPyBzYXZlVG9HYWxsZXJ5XzEgOiBvcHRpb25zLnNhdmVUb0dhbGxlcnk7XG4gICAgICAgICAgICAgICAgcmVxV2lkdGhfMSA9IG9wdGlvbnMud2lkdGggPyBvcHRpb25zLndpZHRoICogZGVuc2l0eSA6IHJlcVdpZHRoXzE7XG4gICAgICAgICAgICAgICAgcmVxSGVpZ2h0XzEgPSBvcHRpb25zLmhlaWdodCA/IG9wdGlvbnMuaGVpZ2h0ICogZGVuc2l0eSA6IHJlcVdpZHRoXzE7XG4gICAgICAgICAgICAgICAgc2hvdWxkS2VlcEFzcGVjdFJhdGlvXzEgPSB0eXBlcy5pc051bGxPclVuZGVmaW5lZChvcHRpb25zLmtlZXBBc3BlY3RSYXRpbykgPyBzaG91bGRLZWVwQXNwZWN0UmF0aW9fMSA6IG9wdGlvbnMua2VlcEFzcGVjdFJhdGlvO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFwZXJtaXNzaW9ucy5oYXNQZXJtaXNzaW9uKGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5XUklURV9FWFRFUk5BTF9TVE9SQUdFKSkge1xuICAgICAgICAgICAgICAgIHNhdmVUb0dhbGxlcnlfMSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHRha2VQaWN0dXJlSW50ZW50ID0gbmV3IGFuZHJvaWQuY29udGVudC5JbnRlbnQoYW5kcm9pZC5wcm92aWRlci5NZWRpYVN0b3JlLkFDVElPTl9JTUFHRV9DQVBUVVJFKTtcbiAgICAgICAgICAgIHZhciBkYXRlU3RhbXAgPSBjcmVhdGVEYXRlVGltZVN0YW1wKCk7XG4gICAgICAgICAgICB2YXIgcGljdHVyZVBhdGhfMTtcbiAgICAgICAgICAgIHZhciBuYXRpdmVGaWxlID0gdm9pZCAwO1xuICAgICAgICAgICAgdmFyIHRlbXBQaWN0dXJlVXJpID0gdm9pZCAwO1xuICAgICAgICAgICAgaWYgKHNhdmVUb0dhbGxlcnlfMSkge1xuICAgICAgICAgICAgICAgIHBpY3R1cmVQYXRoXzEgPSBhbmRyb2lkLm9zLkVudmlyb25tZW50LmdldEV4dGVybmFsU3RvcmFnZVB1YmxpY0RpcmVjdG9yeShhbmRyb2lkLm9zLkVudmlyb25tZW50LkRJUkVDVE9SWV9EQ0lNKS5nZXRBYnNvbHV0ZVBhdGgoKSArIFwiL0NhbWVyYS9cIiArIFwiTlNJTUdfXCIgKyBkYXRlU3RhbXAgKyBcIi5qcGdcIjtcbiAgICAgICAgICAgICAgICBuYXRpdmVGaWxlID0gbmV3IGphdmEuaW8uRmlsZShwaWN0dXJlUGF0aF8xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHBpY3R1cmVQYXRoXzEgPSB1dGlscy5hZC5nZXRBcHBsaWNhdGlvbkNvbnRleHQoKS5nZXRFeHRlcm5hbEZpbGVzRGlyKG51bGwpLmdldEFic29sdXRlUGF0aCgpICsgXCIvXCIgKyBcIk5TSU1HX1wiICsgZGF0ZVN0YW1wICsgXCIuanBnXCI7XG4gICAgICAgICAgICAgICAgbmF0aXZlRmlsZSA9IG5ldyBqYXZhLmlvLkZpbGUocGljdHVyZVBhdGhfMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc2RrVmVyc2lvbkludCA9IHBhcnNlSW50KHBsYXRmb3JtLmRldmljZS5zZGtWZXJzaW9uKTtcbiAgICAgICAgICAgIGlmIChzZGtWZXJzaW9uSW50ID49IDIxKSB7XG4gICAgICAgICAgICAgICAgdGVtcFBpY3R1cmVVcmkgPSBGaWxlUHJvdmlkZXJQYWNrYWdlTmFtZS5GaWxlUHJvdmlkZXIuZ2V0VXJpRm9yRmlsZShhcHBsaWNhdGlvbk1vZHVsZS5hbmRyb2lkLmNvbnRleHQsIGFwcGxpY2F0aW9uTW9kdWxlLmFuZHJvaWQubmF0aXZlQXBwLmdldFBhY2thZ2VOYW1lKCkgKyBcIi5wcm92aWRlclwiLCBuYXRpdmVGaWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRlbXBQaWN0dXJlVXJpID0gYW5kcm9pZC5uZXQuVXJpLmZyb21GaWxlKG5hdGl2ZUZpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFrZVBpY3R1cmVJbnRlbnQucHV0RXh0cmEoYW5kcm9pZC5wcm92aWRlci5NZWRpYVN0b3JlLkVYVFJBX09VVFBVVCwgdGVtcFBpY3R1cmVVcmkpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5jYW1lcmFGYWNpbmcgPT09IFwiZnJvbnRcIikge1xuICAgICAgICAgICAgICAgIHRha2VQaWN0dXJlSW50ZW50LnB1dEV4dHJhKFwiYW5kcm9pZC5pbnRlbnQuZXh0cmFzLkNBTUVSQV9GQUNJTkdcIiwgYW5kcm9pZC5oYXJkd2FyZS5DYW1lcmEuQ2FtZXJhSW5mby5DQU1FUkFfRkFDSU5HX0ZST05UKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRha2VQaWN0dXJlSW50ZW50LnB1dEV4dHJhKFwiYW5kcm9pZC5pbnRlbnQuZXh0cmFzLkNBTUVSQV9GQUNJTkdcIiwgYW5kcm9pZC5oYXJkd2FyZS5DYW1lcmEuQ2FtZXJhSW5mby5DQU1FUkFfRkFDSU5HX0JBQ0spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRha2VQaWN0dXJlSW50ZW50LnJlc29sdmVBY3Rpdml0eSh1dGlscy5hZC5nZXRBcHBsaWNhdGlvbkNvbnRleHQoKS5nZXRQYWNrYWdlTWFuYWdlcigpKSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFwcE1vZHVsZV8xID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIik7XG4gICAgICAgICAgICAgICAgYXBwTW9kdWxlXzEuYW5kcm9pZC5vZmYoXCJhY3Rpdml0eVJlc3VsdFwiKTtcbiAgICAgICAgICAgICAgICBhcHBNb2R1bGVfMS5hbmRyb2lkLm9uKFwiYWN0aXZpdHlSZXN1bHRcIiwgZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcXVlc3RDb2RlID0gYXJncy5yZXF1ZXN0Q29kZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdENvZGUgPSBhcmdzLnJlc3VsdENvZGU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0Q29kZSA9PT0gUkVRVUVTVF9JTUFHRV9DQVBUVVJFICYmIHJlc3VsdENvZGUgPT09IGFuZHJvaWQuYXBwLkFjdGl2aXR5LlJFU1VMVF9PSykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNhdmVUb0dhbGxlcnlfMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IG5ldyBhbmRyb2lkLm1lZGlhLk1lZGlhU2Nhbm5lckNvbm5lY3Rpb24uT25TY2FuQ29tcGxldGVkTGlzdGVuZXIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TY2FuQ29tcGxldGVkOiBmdW5jdGlvbiAocGF0aCwgdXJpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyYWNlLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNlLndyaXRlKFwiaW1hZ2UgZnJvbSBwYXRoIFwiICsgcGF0aCArIFwiIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBzY2FubmVkIVwiLCB0cmFjZS5jYXRlZ29yaWVzLkRlYnVnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmRyb2lkLm1lZGlhLk1lZGlhU2Nhbm5lckNvbm5lY3Rpb24uc2NhbkZpbGUoYXBwTW9kdWxlXzEuYW5kcm9pZC5jb250ZXh0LCBbcGljdHVyZVBhdGhfMV0sIG51bGwsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmFjZS5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2Uud3JpdGUoXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBzY2FubmluZyBmaWxlIFwiICsgcGljdHVyZVBhdGhfMSArIFwiOiBcIiArIGV4Lm1lc3NhZ2UgKyBcIiFcIiwgdHJhY2UuY2F0ZWdvcmllcy5EZWJ1Zyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhpZiA9IG5ldyBhbmRyb2lkLm1lZGlhLkV4aWZJbnRlcmZhY2UocGljdHVyZVBhdGhfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3JpZW50YXRpb25fMSA9IGV4aWYuZ2V0QXR0cmlidXRlSW50KGFuZHJvaWQubWVkaWEuRXhpZkludGVyZmFjZS5UQUdfT1JJRU5UQVRJT04sIGFuZHJvaWQubWVkaWEuRXhpZkludGVyZmFjZS5PUklFTlRBVElPTl9OT1JNQUwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9yaWVudGF0aW9uXzEgPT09IGFuZHJvaWQubWVkaWEuRXhpZkludGVyZmFjZS5PUklFTlRBVElPTl9ST1RBVEVfOTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3RhdGVCaXRtYXAocGljdHVyZVBhdGhfMSwgOTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob3JpZW50YXRpb25fMSA9PT0gYW5kcm9pZC5tZWRpYS5FeGlmSW50ZXJmYWNlLk9SSUVOVEFUSU9OX1JPVEFURV8xODApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3RhdGVCaXRtYXAocGljdHVyZVBhdGhfMSwgMTgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9yaWVudGF0aW9uXzEgPT09IGFuZHJvaWQubWVkaWEuRXhpZkludGVyZmFjZS5PUklFTlRBVElPTl9ST1RBVEVfMjcwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm90YXRlQml0bWFwKHBpY3R1cmVQYXRoXzEsIDI3MCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hvdWxkS2VlcEFzcGVjdFJhdGlvXzEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGljdHVyZVdpZHRoID0gZXhpZi5nZXRBdHRyaWJ1dGVJbnQoYW5kcm9pZC5tZWRpYS5FeGlmSW50ZXJmYWNlLlRBR19JTUFHRV9XSURUSCwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBpY3R1cmVIZWlnaHQgPSBleGlmLmdldEF0dHJpYnV0ZUludChhbmRyb2lkLm1lZGlhLkV4aWZJbnRlcmZhY2UuVEFHX0lNQUdFX0xFTkdUSCwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzUGljdHVyZUxhbmRzY2FwZSA9IHBpY3R1cmVXaWR0aCA+IHBpY3R1cmVIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZU9wdGlvbnNMYW5kc2NhcGUgPSByZXFXaWR0aF8xID4gcmVxSGVpZ2h0XzE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzUGljdHVyZUxhbmRzY2FwZSAhPT0gYXJlT3B0aW9uc0xhbmRzY2FwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2xkUmVxV2lkdGggPSByZXFXaWR0aF8xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFXaWR0aF8xID0gcmVxSGVpZ2h0XzE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcUhlaWdodF8xID0gb2xkUmVxV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2V0ID0gbmV3IGltYWdlQXNzZXRNb2R1bGUuSW1hZ2VBc3NldChwaWN0dXJlUGF0aF8xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0Lm9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHJlcVdpZHRoXzEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiByZXFIZWlnaHRfMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZWVwQXNwZWN0UmF0aW86IHNob3VsZEtlZXBBc3BlY3RSYXRpb18xXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShhc3NldCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmVzdWx0Q29kZSA9PT0gYW5kcm9pZC5hcHAuQWN0aXZpdHkuUkVTVUxUX0NBTkNFTEVEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiY2FuY2VsbGVkXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGFwcE1vZHVsZV8xLmFuZHJvaWQuZm9yZWdyb3VuZEFjdGl2aXR5LnN0YXJ0QWN0aXZpdHlGb3JSZXN1bHQodGFrZVBpY3R1cmVJbnRlbnQsIFJFUVVFU1RfSU1BR0VfQ0FQVFVSRSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGlmIChyZWplY3QpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5leHBvcnRzLmlzQXZhaWxhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB1dGlscyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3V0aWxzL3V0aWxzXCIpO1xuICAgIHJldHVybiB1dGlscy5hZFxuICAgICAgICAuZ2V0QXBwbGljYXRpb25Db250ZXh0KClcbiAgICAgICAgLmdldFBhY2thZ2VNYW5hZ2VyKClcbiAgICAgICAgLmhhc1N5c3RlbUZlYXR1cmUoYW5kcm9pZC5jb250ZW50LnBtLlBhY2thZ2VNYW5hZ2VyLkZFQVRVUkVfQ0FNRVJBKTtcbn07XG5leHBvcnRzLnJlcXVlc3RQZXJtaXNzaW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcGVybWlzc2lvbnMucmVxdWVzdFBlcm1pc3Npb25zKFtcbiAgICAgICAgYW5kcm9pZC5NYW5pZmVzdC5wZXJtaXNzaW9uLldSSVRFX0VYVEVSTkFMX1NUT1JBR0UsXG4gICAgICAgIGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5DQU1FUkFcbiAgICBdKTtcbn07XG5leHBvcnRzLnJlcXVlc3RQaG90b3NQZXJtaXNzaW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcGVybWlzc2lvbnMucmVxdWVzdFBlcm1pc3Npb25zKFtcbiAgICAgICAgYW5kcm9pZC5NYW5pZmVzdC5wZXJtaXNzaW9uLldSSVRFX0VYVEVSTkFMX1NUT1JBR0UsXG4gICAgXSk7XG59O1xuZXhwb3J0cy5yZXF1ZXN0Q2FtZXJhUGVybWlzc2lvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHBlcm1pc3Npb25zLnJlcXVlc3RQZXJtaXNzaW9ucyhbXG4gICAgICAgIGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5DQU1FUkFcbiAgICBdKTtcbn07XG52YXIgY3JlYXRlRGF0ZVRpbWVTdGFtcCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0ID0gXCJcIjtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgcmVzdWx0ID0gZGF0ZS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCkgK1xuICAgICAgICAoKGRhdGUuZ2V0TW9udGgoKSArIDEpIDwgMTAgPyBcIjBcIiArIChkYXRlLmdldE1vbnRoKCkgKyAxKS50b1N0cmluZygpIDogKGRhdGUuZ2V0TW9udGgoKSArIDEpLnRvU3RyaW5nKCkpICtcbiAgICAgICAgKGRhdGUuZ2V0RGF0ZSgpIDwgMTAgPyBcIjBcIiArIGRhdGUuZ2V0RGF0ZSgpLnRvU3RyaW5nKCkgOiBkYXRlLmdldERhdGUoKS50b1N0cmluZygpKSArIFwiX1wiICtcbiAgICAgICAgZGF0ZS5nZXRIb3VycygpLnRvU3RyaW5nKCkgK1xuICAgICAgICBkYXRlLmdldE1pbnV0ZXMoKS50b1N0cmluZygpICtcbiAgICAgICAgZGF0ZS5nZXRTZWNvbmRzKCkudG9TdHJpbmcoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciByb3RhdGVCaXRtYXAgPSBmdW5jdGlvbiAocGljdHVyZVBhdGgsIGFuZ2xlKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIG1hdHJpeCA9IG5ldyBhbmRyb2lkLmdyYXBoaWNzLk1hdHJpeCgpO1xuICAgICAgICBtYXRyaXgucG9zdFJvdGF0ZShhbmdsZSk7XG4gICAgICAgIHZhciBibU9wdGlvbnMgPSBuZXcgYW5kcm9pZC5ncmFwaGljcy5CaXRtYXBGYWN0b3J5Lk9wdGlvbnMoKTtcbiAgICAgICAgdmFyIG9sZEJpdG1hcCA9IGFuZHJvaWQuZ3JhcGhpY3MuQml0bWFwRmFjdG9yeS5kZWNvZGVGaWxlKHBpY3R1cmVQYXRoLCBibU9wdGlvbnMpO1xuICAgICAgICB2YXIgZmluYWxCaXRtYXAgPSBhbmRyb2lkLmdyYXBoaWNzLkJpdG1hcC5jcmVhdGVCaXRtYXAob2xkQml0bWFwLCAwLCAwLCBvbGRCaXRtYXAuZ2V0V2lkdGgoKSwgb2xkQml0bWFwLmdldEhlaWdodCgpLCBtYXRyaXgsIHRydWUpO1xuICAgICAgICB2YXIgb3V0ID0gbmV3IGphdmEuaW8uRmlsZU91dHB1dFN0cmVhbShwaWN0dXJlUGF0aCk7XG4gICAgICAgIGZpbmFsQml0bWFwLmNvbXByZXNzKGFuZHJvaWQuZ3JhcGhpY3MuQml0bWFwLkNvbXByZXNzRm9ybWF0LkpQRUcsIDEwMCwgb3V0KTtcbiAgICAgICAgb3V0LmZsdXNoKCk7XG4gICAgICAgIG91dC5jbG9zZSgpO1xuICAgIH1cbiAgICBjYXRjaCAoZXgpIHtcbiAgICAgICAgaWYgKHRyYWNlLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0cmFjZS53cml0ZShcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIHJvdGF0aW5nIGZpbGUgXCIgKyBwaWN0dXJlUGF0aCArIFwiICh1c2luZyB0aGUgb3JpZ2luYWwgb25lKTogXCIgKyBleC5tZXNzYWdlICsgXCIhXCIsIHRyYWNlLmNhdGVnb3JpZXMuRGVidWcpO1xuICAgICAgICB9XG4gICAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNhbWVyYS5hbmRyb2lkLmpzLm1hcCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1jYW1lcmFcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXZ1ZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24vYXBwbGljYXRpb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9idW5kbGUtZW50cnktcG9pbnRzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1hc3NldC9pbWFnZS1hc3NldFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm0vcGxhdGZvcm1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy90ZXh0L2Zvcm1hdHRlZC1zdHJpbmdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy90ZXh0L3NwYW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy90cmFjZS90cmFjZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2FjdGlvbi1iYXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9hY3Rpdml0eS1pbmRpY2F0b3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9ib3JkZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9ib3R0b20tbmF2aWdhdGlvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2J1dHRvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvbnRlbnQtdmlld1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlld1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RhdGUtcGlja2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9mcmFtZS9hY3Rpdml0eVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2h0bWwtdmlld1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvbGFiZWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2Fic29sdXRlLWxheW91dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvZG9jay1sYXlvdXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2ZsZXhib3gtbGF5b3V0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9ncmlkLWxheW91dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvbGF5b3V0LWJhc2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvd3JhcC1sYXlvdXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXBpY2tlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3Qtdmlld1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9wbGFjZWhvbGRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3Byb2dyZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvcHJveHktdmlldy1jb250YWluZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9zY3JvbGwtdmlld1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlYXJjaC1iYXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9zZWdtZW50ZWQtYmFyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvc2xpZGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvc3R5bGluZy9zdHlsZS1zY29wZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3N3aXRjaFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RhYi1uYXZpZ2F0aW9uLWJhc2UvdGFiLWNvbnRlbnQtaXRlbVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RhYi1uYXZpZ2F0aW9uLWJhc2UvdGFiLXN0cmlwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvdGFiLW5hdmlnYXRpb24tYmFzZS90YWItc3RyaXAtaXRlbVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RhYi12aWV3XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvdGFic1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RleHQtZmllbGRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LXZpZXdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS90aW1lLXBpY2tlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3dlYi12aWV3XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdXRpbHMvdHlwZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91dGlscy91dGlsc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3htbFwiKTsiXSwic291cmNlUm9vdCI6IiJ9