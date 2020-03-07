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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var types = __webpack_require__("tns-core-modules/utils/types");

var imageAssetModule = __webpack_require__("tns-core-modules/image-asset/image-asset");

var trace = __webpack_require__("tns-core-modules/trace/trace");

var UIImagePickerControllerDelegateImpl = function (_super) {
  __extends(UIImagePickerControllerDelegateImpl, _super);

  function UIImagePickerControllerDelegateImpl() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  UIImagePickerControllerDelegateImpl.new = function () {
    return _super.new.call(this);
  };

  UIImagePickerControllerDelegateImpl.prototype.initWithCallback = function (callback, errorCallback) {
    this._callback = callback;
    this._errorCallback = errorCallback;
    return this;
  };

  UIImagePickerControllerDelegateImpl.prototype.initWithCallbackAndOptions = function (callback, errorCallback, options) {
    this._callback = callback;
    this._errorCallback = errorCallback;

    if (options) {
      this._width = options.width;
      this._height = options.height;
      this._saveToGallery = options.saveToGallery;
      this._allowsEditing = options.allowsEditing;
      this._keepAspectRatio = types.isNullOrUndefined(options.keepAspectRatio) ? true : options.keepAspectRatio;
    }

    return this;
  };

  UIImagePickerControllerDelegateImpl.prototype.imagePickerControllerDidFinishPickingMediaWithInfo = function (picker, info) {
    var _this = this;

    if (info) {
      var currentDate_1 = new Date();
      var source = info.valueForKey(UIImagePickerControllerOriginalImage);

      if (this._allowsEditing) {
        source = info.valueForKey(UIImagePickerControllerEditedImage);
      }

      if (source) {
        var imageSource = __webpack_require__("../node_modules/@nativescript/core/image-source/image-source.js");

        var imageSourceResult_1 = imageSource.fromNativeSource(source);

        if (this._callback) {
          var imageAsset_1;

          if (this._saveToGallery) {
            PHPhotoLibrary.sharedPhotoLibrary().performChangesCompletionHandler(function () {
              PHAssetChangeRequest.creationRequestForAssetFromImage(imageSourceResult_1.ios);
            }, function (success, err) {
              if (success) {
                var fetchOptions = PHFetchOptions.alloc().init();
                var sortDescriptors = NSArray.arrayWithObject(NSSortDescriptor.sortDescriptorWithKeyAscending("creationDate", false));
                fetchOptions.sortDescriptors = sortDescriptors;
                fetchOptions.predicate = NSPredicate.predicateWithFormatArgumentArray("mediaType = %d", NSArray.arrayWithObject(1));
                var fetchResult = PHAsset.fetchAssetsWithOptions(fetchOptions);

                if (fetchResult.count > 0) {
                  var asset = fetchResult[0];
                  var dateDiff = asset.creationDate.valueOf() - currentDate_1.valueOf();

                  if (Math.abs(dateDiff) > 1000) {
                    console.warn("Image asset returned was created more than 1 second ago");
                  }

                  imageAsset_1 = new imageAssetModule.ImageAsset(asset);

                  _this.setImageAssetAndCallCallback(imageAsset_1);
                }
              } else {
                trace.write("An error ocurred while saving image to gallery: " + err, trace.categories.Error, trace.messageType.error);
              }
            });
          } else {
            imageAsset_1 = new imageAssetModule.ImageAsset(imageSourceResult_1.ios);
            this.setImageAssetAndCallCallback(imageAsset_1);
          }
        }
      }
    }

    picker.presentingViewController.dismissViewControllerAnimatedCompletion(true, null);
    listener = null;
  };

  UIImagePickerControllerDelegateImpl.prototype.setImageAssetAndCallCallback = function (imageAsset) {
    if (this._keepAspectRatio) {
      var pictureWidth = imageAsset.nativeImage ? imageAsset.nativeImage.size.width : imageAsset.ios.pixelWidth;
      var pictureHeight = imageAsset.nativeImage ? imageAsset.nativeImage.size.height : imageAsset.ios.pixelHeight;
      var isPictureLandscape = pictureWidth > pictureHeight;
      var areOptionsLandscape = this._width > this._height;

      if (isPictureLandscape !== areOptionsLandscape) {
        var oldWidth = this._width;
        this._width = this._height;
        this._height = oldWidth;
      }
    }

    imageAsset.options = {
      width: this._width,
      height: this._height,
      keepAspectRatio: this._keepAspectRatio
    };

    this._callback(imageAsset);
  };

  UIImagePickerControllerDelegateImpl.prototype.imagePickerControllerDidCancel = function (picker) {
    picker.presentingViewController.dismissViewControllerAnimatedCompletion(true, null);
    listener = null;

    this._errorCallback(new Error("cancelled"));
  };

  UIImagePickerControllerDelegateImpl.ObjCProtocols = [UIImagePickerControllerDelegate];
  return UIImagePickerControllerDelegateImpl;
}(NSObject);

var listener;

exports.takePicture = function (options) {
  return new Promise(function (resolve, reject) {
    listener = null;
    var imagePickerController = UIImagePickerController.new();
    var reqWidth = 0;
    var reqHeight = 0;
    var keepAspectRatio = true;
    var saveToGallery = true;
    var allowsEditing = false;

    if (options) {
      reqWidth = options.width || 0;
      reqHeight = options.height || reqWidth;
      keepAspectRatio = types.isNullOrUndefined(options.keepAspectRatio) ? keepAspectRatio : options.keepAspectRatio;
      saveToGallery = types.isNullOrUndefined(options.saveToGallery) ? saveToGallery : options.saveToGallery;
      allowsEditing = types.isNullOrUndefined(options.allowsEditing) ? allowsEditing : options.allowsEditing;
    }

    var authStatus = PHPhotoLibrary.authorizationStatus();

    if (authStatus !== 3) {
      saveToGallery = false;
    }

    if (reqWidth && reqHeight) {
      listener = UIImagePickerControllerDelegateImpl.new().initWithCallbackAndOptions(resolve, reject, {
        width: reqWidth,
        height: reqHeight,
        keepAspectRatio: keepAspectRatio,
        saveToGallery: saveToGallery,
        allowsEditing: allowsEditing
      });
    } else if (saveToGallery) {
      listener = UIImagePickerControllerDelegateImpl.new().initWithCallbackAndOptions(resolve, reject, {
        saveToGallery: saveToGallery,
        keepAspectRatio: keepAspectRatio,
        allowsEditing: allowsEditing
      });
    } else {
      listener = UIImagePickerControllerDelegateImpl.new().initWithCallback(resolve, reject);
    }

    imagePickerController.delegate = listener;
    var sourceType = 1;
    var mediaTypes = UIImagePickerController.availableMediaTypesForSourceType(sourceType);
    var imageMediaType = "public.image";

    if (mediaTypes && mediaTypes.containsObject(imageMediaType)) {
      var mediaTypesArray = new NSMutableArray({
        capacity: 1
      });
      mediaTypesArray.addObject(imageMediaType);
      imagePickerController.mediaTypes = mediaTypesArray;
      imagePickerController.sourceType = sourceType;
      imagePickerController.cameraDevice = options && options.cameraFacing === "front" ? 1 : 0;
      imagePickerController.allowsEditing = allowsEditing;
    }

    imagePickerController.modalPresentationStyle = 3;

    var frame = __webpack_require__("tns-core-modules/ui/frame");

    var topMostFrame = frame.topmost();

    if (topMostFrame) {
      var viewController = topMostFrame.currentPage && topMostFrame.currentPage.ios;

      if (viewController) {
        while (viewController.parentViewController) {
          viewController = viewController.parentViewController;
        }

        while (viewController.presentedViewController) {
          viewController = viewController.presentedViewController;
        }

        viewController.presentViewControllerAnimatedCompletion(imagePickerController, true, null);
      }
    }
  });
};

exports.isAvailable = function () {
  return UIImagePickerController.isSourceTypeAvailable(1);
};

exports.requestPermissions = function () {
  return new Promise(function (resolve, reject) {
    exports.requestPhotosPermissions().then(function () {
      exports.requestCameraPermissions().then(resolve, reject);
    }, reject);
  });
};

exports.requestPhotosPermissions = function () {
  return new Promise(function (resolve, reject) {
    var authStatus = PHPhotoLibrary.authorizationStatus();

    switch (authStatus) {
      case 0:
        {
          PHPhotoLibrary.requestAuthorization(function (auth) {
            if (auth === 3) {
              if (trace.isEnabled()) {
                trace.write("Application can access photo library assets.", trace.categories.Debug);
              }

              resolve();
            } else {
              reject();
            }
          });
          break;
        }

      case 3:
        {
          if (trace.isEnabled()) {
            trace.write("Application can access photo library assets.", trace.categories.Debug);
          }

          resolve();
          break;
        }

      case 1:
      case 2:
        {
          if (trace.isEnabled()) {
            trace.write("Application can not access photo library assets.", trace.categories.Debug);
          }

          reject();
          break;
        }
    }
  });
};

exports.requestCameraPermissions = function () {
  return new Promise(function (resolve, reject) {
    var cameraStatus = AVCaptureDevice.authorizationStatusForMediaType(AVMediaTypeVideo);

    switch (cameraStatus) {
      case 0:
        {
          AVCaptureDevice.requestAccessForMediaTypeCompletionHandler(AVMediaTypeVideo, function (granted) {
            if (granted) {
              resolve();
            } else {
              reject();
            }
          });
          break;
        }

      case 3:
        {
          resolve();
          break;
        }

      case 1:
      case 2:
        {
          if (trace.isEnabled()) {
            trace.write("Application can not access Camera assets.", trace.categories.Debug);
          }

          reject();
          break;
        }
    }
  });
};

/***/ }),

/***/ "./package.json":
/***/ (function(module) {

module.exports = JSON.parse("{\"android\":{\"v8Flags\":\"--expose_gc\",\"forceLog\":true,\"markingMode\":\"none\"},\"main\":\"app.js\",\"name\":\"tns-template-vue\",\"version\":\"3.2.0\"}");

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

/***/ "tns-core-modules/xml":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/xml");

/***/ })

},[["./app.js","runtime","vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY29tcG9uZW50cy9TbmFwSXQudnVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvU25hcEl0LnZ1ZT8wNWQyIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvU25hcEl0LnZ1ZT9iZDRlIiwid2VicGFjazovLy8uIHN5bmMgbm9ucmVjdXJzaXZlIF5cXC5cXC9hcHBcXC4oY3NzfHNjc3N8bGVzc3xzYXNzKSQiLCJ3ZWJwYWNrOi8vL1xcYl9bXFx3LV0qXFwuKXNjc3MpJCIsIndlYnBhY2s6Ly8vLi9hcHAuY3NzIiwid2VicGFjazovLy8uL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1NuYXBJdC52dWUiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9TbmFwSXQudnVlPzQ5OTEiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9TbmFwSXQudnVlP2UzNTIiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9TbmFwSXQudnVlPzVhZjIiLCJ3ZWJwYWNrOi8vLy4vbmF0aXZlc2NyaXB0LWNhbWVyYS9jYW1lcmEuY29tbW9uLmpzIiwid2VicGFjazovLy8uL25hdGl2ZXNjcmlwdC1jYW1lcmEvY2FtZXJhLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5hdGl2ZXNjcmlwdC1jYW1lcmFcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuYXRpdmVzY3JpcHQtdnVlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvYnVuZGxlLWVudHJ5LXBvaW50c1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2UtYXNzZXQvaW1hZ2UtYXNzZXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy90ZXh0L2Zvcm1hdHRlZC1zdHJpbmdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3RleHQvc3BhblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdHJhY2UvdHJhY2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2FjdGlvbi1iYXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2FjdGl2aXR5LWluZGljYXRvclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvYm9yZGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9ib3R0b20tbmF2aWdhdGlvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvYnV0dG9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9jb250ZW50LXZpZXdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlld1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGF0ZS1waWNrZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ZyYW1lXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9odG1sLXZpZXdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYWJlbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9hYnNvbHV0ZS1sYXlvdXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvZG9jay1sYXlvdXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvZmxleGJveC1sYXlvdXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvZ3JpZC1sYXlvdXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvbGF5b3V0LWJhc2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvc3RhY2stbGF5b3V0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3dyYXAtbGF5b3V0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXBpY2tlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC12aWV3XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wbGFjZWhvbGRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvcHJvZ3Jlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3Byb3h5LXZpZXctY29udGFpbmVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zY3JvbGwtdmlld1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2VhcmNoLWJhclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2VnbWVudGVkLWJhclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2xpZGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zdHlsaW5nL3N0eWxlLXNjb3BlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zd2l0Y2hcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RhYi1uYXZpZ2F0aW9uLWJhc2UvdGFiLWNvbnRlbnQtaXRlbVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGFiLW5hdmlnYXRpb24tYmFzZS90YWItc3RyaXBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RhYi1uYXZpZ2F0aW9uLWJhc2UvdGFiLXN0cmlwLWl0ZW1cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RhYi12aWV3XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS90YWJzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LWZpZWxkXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LXZpZXdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RpbWUtcGlja2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS93ZWItdmlld1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdXRpbHMvdHlwZXNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3htbFwiIl0sIm5hbWVzIjpbIlNuYXBJdCIsIlZ1ZSIsInRlbXBsYXRlIiwiY29tcG9uZW50cyIsIiRzdGFydCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiZ2V0QXNwZWN0U2FmZURpbWVuc2lvbnMiLCJzb3VyY2VXaWR0aCIsInNvdXJjZUhlaWdodCIsInJlcVdpZHRoIiwicmVxSGVpZ2h0Iiwid2lkdGhDb2VmIiwiaGVpZ2h0Q29lZiIsImFzcGVjdENvZWYiLCJ3aWR0aCIsIk1hdGgiLCJmbG9vciIsImhlaWdodCIsInR5cGVzIiwicmVxdWlyZSIsImltYWdlQXNzZXRNb2R1bGUiLCJ0cmFjZSIsIlVJSW1hZ2VQaWNrZXJDb250cm9sbGVyRGVsZWdhdGVJbXBsIiwiX3N1cGVyIiwiX19leHRlbmRzIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJuZXciLCJjYWxsIiwicHJvdG90eXBlIiwiaW5pdFdpdGhDYWxsYmFjayIsImNhbGxiYWNrIiwiZXJyb3JDYWxsYmFjayIsIl9jYWxsYmFjayIsIl9lcnJvckNhbGxiYWNrIiwiaW5pdFdpdGhDYWxsYmFja0FuZE9wdGlvbnMiLCJvcHRpb25zIiwiX3dpZHRoIiwiX2hlaWdodCIsIl9zYXZlVG9HYWxsZXJ5Iiwic2F2ZVRvR2FsbGVyeSIsIl9hbGxvd3NFZGl0aW5nIiwiYWxsb3dzRWRpdGluZyIsIl9rZWVwQXNwZWN0UmF0aW8iLCJpc051bGxPclVuZGVmaW5lZCIsImtlZXBBc3BlY3RSYXRpbyIsImltYWdlUGlja2VyQ29udHJvbGxlckRpZEZpbmlzaFBpY2tpbmdNZWRpYVdpdGhJbmZvIiwicGlja2VyIiwiaW5mbyIsIl90aGlzIiwiY3VycmVudERhdGVfMSIsIkRhdGUiLCJzb3VyY2UiLCJ2YWx1ZUZvcktleSIsIlVJSW1hZ2VQaWNrZXJDb250cm9sbGVyT3JpZ2luYWxJbWFnZSIsIlVJSW1hZ2VQaWNrZXJDb250cm9sbGVyRWRpdGVkSW1hZ2UiLCJpbWFnZVNvdXJjZSIsImltYWdlU291cmNlUmVzdWx0XzEiLCJmcm9tTmF0aXZlU291cmNlIiwiaW1hZ2VBc3NldF8xIiwiUEhQaG90b0xpYnJhcnkiLCJzaGFyZWRQaG90b0xpYnJhcnkiLCJwZXJmb3JtQ2hhbmdlc0NvbXBsZXRpb25IYW5kbGVyIiwiUEhBc3NldENoYW5nZVJlcXVlc3QiLCJjcmVhdGlvblJlcXVlc3RGb3JBc3NldEZyb21JbWFnZSIsImlvcyIsInN1Y2Nlc3MiLCJlcnIiLCJmZXRjaE9wdGlvbnMiLCJQSEZldGNoT3B0aW9ucyIsImFsbG9jIiwiaW5pdCIsInNvcnREZXNjcmlwdG9ycyIsIk5TQXJyYXkiLCJhcnJheVdpdGhPYmplY3QiLCJOU1NvcnREZXNjcmlwdG9yIiwic29ydERlc2NyaXB0b3JXaXRoS2V5QXNjZW5kaW5nIiwicHJlZGljYXRlIiwiTlNQcmVkaWNhdGUiLCJwcmVkaWNhdGVXaXRoRm9ybWF0QXJndW1lbnRBcnJheSIsImZldGNoUmVzdWx0IiwiUEhBc3NldCIsImZldGNoQXNzZXRzV2l0aE9wdGlvbnMiLCJjb3VudCIsImFzc2V0IiwiZGF0ZURpZmYiLCJjcmVhdGlvbkRhdGUiLCJ2YWx1ZU9mIiwiYWJzIiwiY29uc29sZSIsIndhcm4iLCJJbWFnZUFzc2V0Iiwic2V0SW1hZ2VBc3NldEFuZENhbGxDYWxsYmFjayIsIndyaXRlIiwiY2F0ZWdvcmllcyIsIkVycm9yIiwibWVzc2FnZVR5cGUiLCJlcnJvciIsInByZXNlbnRpbmdWaWV3Q29udHJvbGxlciIsImRpc21pc3NWaWV3Q29udHJvbGxlckFuaW1hdGVkQ29tcGxldGlvbiIsImxpc3RlbmVyIiwiaW1hZ2VBc3NldCIsInBpY3R1cmVXaWR0aCIsIm5hdGl2ZUltYWdlIiwic2l6ZSIsInBpeGVsV2lkdGgiLCJwaWN0dXJlSGVpZ2h0IiwicGl4ZWxIZWlnaHQiLCJpc1BpY3R1cmVMYW5kc2NhcGUiLCJhcmVPcHRpb25zTGFuZHNjYXBlIiwib2xkV2lkdGgiLCJpbWFnZVBpY2tlckNvbnRyb2xsZXJEaWRDYW5jZWwiLCJPYmpDUHJvdG9jb2xzIiwiVUlJbWFnZVBpY2tlckNvbnRyb2xsZXJEZWxlZ2F0ZSIsIk5TT2JqZWN0IiwidGFrZVBpY3R1cmUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImltYWdlUGlja2VyQ29udHJvbGxlciIsIlVJSW1hZ2VQaWNrZXJDb250cm9sbGVyIiwiYXV0aFN0YXR1cyIsImF1dGhvcml6YXRpb25TdGF0dXMiLCJkZWxlZ2F0ZSIsInNvdXJjZVR5cGUiLCJtZWRpYVR5cGVzIiwiYXZhaWxhYmxlTWVkaWFUeXBlc0ZvclNvdXJjZVR5cGUiLCJpbWFnZU1lZGlhVHlwZSIsImNvbnRhaW5zT2JqZWN0IiwibWVkaWFUeXBlc0FycmF5IiwiTlNNdXRhYmxlQXJyYXkiLCJjYXBhY2l0eSIsImFkZE9iamVjdCIsImNhbWVyYURldmljZSIsImNhbWVyYUZhY2luZyIsIm1vZGFsUHJlc2VudGF0aW9uU3R5bGUiLCJmcmFtZSIsInRvcE1vc3RGcmFtZSIsInRvcG1vc3QiLCJ2aWV3Q29udHJvbGxlciIsImN1cnJlbnRQYWdlIiwicGFyZW50Vmlld0NvbnRyb2xsZXIiLCJwcmVzZW50ZWRWaWV3Q29udHJvbGxlciIsInByZXNlbnRWaWV3Q29udHJvbGxlckFuaW1hdGVkQ29tcGxldGlvbiIsImlzQXZhaWxhYmxlIiwiaXNTb3VyY2VUeXBlQXZhaWxhYmxlIiwicmVxdWVzdFBlcm1pc3Npb25zIiwicmVxdWVzdFBob3Rvc1Blcm1pc3Npb25zIiwidGhlbiIsInJlcXVlc3RDYW1lcmFQZXJtaXNzaW9ucyIsInJlcXVlc3RBdXRob3JpemF0aW9uIiwiYXV0aCIsImlzRW5hYmxlZCIsIkRlYnVnIiwiY2FtZXJhU3RhdHVzIiwiQVZDYXB0dXJlRGV2aWNlIiwiYXV0aG9yaXphdGlvblN0YXR1c0Zvck1lZGlhVHlwZSIsIkFWTWVkaWFUeXBlVmlkZW8iLCJyZXF1ZXN0QWNjZXNzRm9yTWVkaWFUeXBlQ29tcGxldGlvbkhh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QSx1RDs7Ozs7OztBQ0FBLGtFOzs7Ozs7O0FDQUEsdUQ7Ozs7Ozs7QUNBQSw2RDs7Ozs7OztBQ0FBLDBEOzs7Ozs7O0FDQUEsNEQ7Ozs7Ozs7QUNBQSxzRDs7Ozs7OztBQ0FBLDBEOzs7Ozs7O0FDQUEsc0Q7Ozs7Ozs7QUNBQSxzRDs7Ozs7OztBQ0FBLHdFOzs7Ozs7O0FDQUEsb0U7Ozs7Ozs7QUNBQSx1RTs7Ozs7OztBQ0FBLG9FOzs7Ozs7O0FDQUEsb0U7Ozs7Ozs7QUNBQSxxRTs7Ozs7OztBQ0FBLG9FOzs7Ozs7O0FDQUEsNEQ7Ozs7Ozs7QUNBQSwwRDs7Ozs7OztBQ0FBLHFEOzs7Ozs7O0FDQUEsNEQ7Ozs7Ozs7QUNBQSx5RDs7Ozs7OztBQ0FBLHFFOzs7Ozs7O0FDQUEsNEQ7Ozs7Ozs7QUNBQSwyRDs7Ozs7OztBQ0FBLDhEOzs7Ozs7O0FDQUEsdUQ7Ozs7Ozs7QUNBQSxvRTs7Ozs7OztBQ0FBLHVEOzs7Ozs7O0FDQUEscUY7Ozs7Ozs7QUNBQSw4RTs7Ozs7OztBQ0FBLG1GOzs7Ozs7O0FDQUEseUQ7Ozs7Ozs7QUNBQSxxRDs7Ozs7OztBQ0FBLDJEOzs7Ozs7O0FDQUEsMEQ7Ozs7Ozs7QUNBQSw0RDs7Ozs7OztBQ0FBLHlEOzs7Ozs7O0FDQUEseUQ7Ozs7Ozs7QUNBQSxpRCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPFBhZ2U+XG4gICAgICAgIDxBY3Rpb25CYXIgdGl0bGU9XCJNb25zdGVyIGFuZCBIZXJvc1wiIC8+XG4gICAgICAgIDxTY3JvbGxWaWV3PlxuICAgICAgICAgICAgPFN0YWNrTGF5b3V0IGNsYXNzPVwiaG9tZS1wYW5lbFwiPlxuICAgICAgICAgICAgICAgIDwhLS1BZGQgeW91ciBwYWdlIGNvbnRlbnQgaGVyZS0tPlxuICAgICAgICAgICAgICAgIDxMYWJlbCB0ZXh0V3JhcD1cInRydWVcIiB0ZXh0PVwiUGxheSB3aXRoIE5hdGl2ZVNjcmlwdCFcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImgyIGRlc2NyaXB0aW9uLWxhYmVsXCIgLz5cbiAgICAgICAgICAgICAgICA8TGFiZWwgdGV4dFdyYXA9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgdGV4dD1cIldyaXRlIGNvZGUgaW4gdGhlIGVkaXRvciBvciBkcmFnIGFuZCBkcm9wIGNvbXBvbmVudHMgdG8gYnVpbGQgYSBOYXRpdmVTY3JpcHQgbW9iaWxlIGFwcGxpY2F0aW9uLlwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaDIgZGVzY3JpcHRpb24tbGFiZWxcIiAvPlxuICAgICAgICAgICAgICAgIDxMYWJlbCB0ZXh0V3JhcD1cInRydWVcIiB0ZXh0PVwiPEltYWdlIHNyYz1cIlxuICAgICAgICAgICAgICAgICAgICBodHRwczovL3BsYXkubmF0aXZlc2NyaXB0Lm9yZy9kaXN0L2Fzc2V0cy9pbWcvTmF0aXZlU2NyaXB0X2xvZ28ucG5nXCIgLz5cbiAgICAgICAgICAgICAgICBTY2FuIHRoZSBRUiBjb2RlIHdpdGggeW91ciBtb2JpbGUgZGV2aWNlIGFuZCB3YXRjaCB0aGUgY2hhbmdlc1xuICAgICAgICAgICAgICAgIHN5bmMgbGl2ZSB3aGlsZSB5b3UgcGxheSB3aXRoIHRoZSBjb2RlLlwiIGNsYXNzPVwiaDJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbi1sYWJlbFwiIC8+XG4gICAgICAgICAgICAgICAgPEltYWdlIDpzcmM9XCJjYW1lcmFJbWFnZVwiIGlkPVwiaW1hZ2VcIiBzdHJldGNoPVwiYXNwZWN0Rml0XCJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luPVwiMTBcIiAvPlxuICAgICAgICAgICAgICAgIDxUZXh0VmlldyByb3c9XCIyXCIgOnRleHQ9XCJsYWJlbFRleHRcIiBlZGl0YWJsZT1cImZhbHNlXCI+XG4gICAgICAgICAgICAgICAgPC9UZXh0Vmlldz5cbiAgICAgICAgICAgICAgICA8QnV0dG9uIHJvdz1cIjNcIiB0ZXh0PVwiVGFrZSBQaWN0dXJlXCIgQHRhcD1cIm9uVGFrZVBpY3R1cmVUYXBcIlxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nPVwiMTBcIiAvPlxuICAgICAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICAgICAgPC9TY3JvbGxWaWV3PlxuICAgIDwvUGFnZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IHtcbiAgICAgICAgdGFrZVBpY3R1cmUsXG4gICAgICAgIHJlcXVlc3RQZXJtaXNzaW9uc1xuICAgIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1jYW1lcmFcIjtcblxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2FtZXJhSW1hZ2U6IFwiaHR0cHM6Ly9wbGF5Lm5hdGl2ZXNjcmlwdC5vcmcvZGlzdC9hc3NldHMvaW1nL05hdGl2ZVNjcmlwdF9sb2dvLnBuZ1wiLFxuICAgICAgICAgICAgICAgIGxhYmVsVGV4dDogXCJUZXN0XCJcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIG9uVGFrZVBpY3R1cmVUYXA6IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgICAgICAgICBsZXQgcGFnZSA9IGFyZ3Mub2JqZWN0LnBhZ2U7XG4gICAgICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHJlcXVlc3RQZXJtaXNzaW9ucygpLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRha2VQaWN0dXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogdGhhdC53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoYXQuaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtlZXBBc3BlY3RSYXRpbzogdGhhdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAua2VlcEFzcGVjdFJhdGlvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVUb0dhbGxlcnk6IHRoYXQuc2F2ZVRvR2FsbGVyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGxvd3NFZGl0aW5nOiB0aGF0LmFsbG93c0VkaXRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VBc3NldCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2FtZXJhSW1hZ2UgPSBpbWFnZUFzc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZUFzc2V0LmdldEltYWdlQXN5bmMoZnVuY3Rpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVJbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3R1YWxXaWR0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0dWFsSGVpZ2h0ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZUFzc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFuZHJvaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnQgZGVuc2l0eSBvZiB0aGUgc2NyZWVuIChkcGkpIGFuZCBkaXZpZGUgaXQgYnkgdGhlIGRlZmF1bHQgb25lIHRvIGdldCB0aGUgc2NhbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZUltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREZW5zaXR5KCkgL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmRyb2lkLnV0aWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLkRpc3BsYXlNZXRyaWNzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ERU5TSVRZX0RFRkFVTFQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0dWFsV2lkdGggPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVJbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0V2lkdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3R1YWxIZWlnaHQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVJbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0SGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlSW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNjYWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbFdpZHRoID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlSW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNpemUud2lkdGggKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3R1YWxIZWlnaHQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVJbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2l6ZS5oZWlnaHQgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubGFiZWxUZXh0ID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgRGlzcGxheWVkIFNpemU6ICR7YWN0dWFsV2lkdGh9eCR7YWN0dWFsSGVpZ2h0fSB3aXRoIHNjYWxlICR7c2NhbGV9XFxuYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYEltYWdlIFNpemU6ICR7TWF0aC5yb3VuZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3R1YWxXaWR0aCAvIHNjYWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfXgke01hdGgucm91bmQoYWN0dWFsSGVpZ2h0IC8gc2NhbGUpfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgJHtsYWJlbFRleHR9YFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoYXQuJG5hdmlnYXRlVG8oQ29uZmlybSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNhcHR1cmVkSW1hZ2U6IGltYWdlQXNzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLT4gXCIgKyBlcnJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoKSA9PiBhbGVydChcInBlcm1pc3Npb25zIHJlamVjdGVkXCIpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbiAgICAuaG9tZS1wYW5lbCB7XG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7XG4gICAgICAgIGZvbnQtc2l6ZTogMjA7XG4gICAgICAgIG1hcmdpbjogMTU7XG4gICAgfVxuXG4gICAgLmRlc2NyaXB0aW9uLWxhYmVsIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTU7XG4gICAgfVxuPC9zdHlsZT4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi5ob21lLXBhbmVsW2RhdGEtdi0xYjRhYjkzMF0ge1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyO1xcbiAgICBmb250LXNpemU6IDIwO1xcbiAgICBtYXJnaW46IDE1O1xcbn1cXG4uZGVzY3JpcHRpb24tbGFiZWxbZGF0YS12LTFiNGFiOTMwXSB7XFxuICAgIG1hcmdpbi1ib3R0b206IDE1O1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cbiAgICBjb25zdCBhcHBsaWNhdGlvbiA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCIpO1xuICAgIHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3N0eWxpbmcvc3R5bGUtc2NvcGVcIik7XG5cbiAgICBpZiAodHlwZW9mIGV4cG9ydHMuZm9yRWFjaCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGV4cG9ydHMuZm9yRWFjaChjc3NFeHBvcnQgPT4ge1xuICAgICAgICAgICAgaWYgKGNzc0V4cG9ydC5sZW5ndGggPiAxICYmIGNzc0V4cG9ydFsxXSkge1xuICAgICAgICAgICAgICAgIC8vIGFwcGx5aW5nIHRoZSBzZWNvbmQgaXRlbSBvZiB0aGUgZXhwb3J0IGFzIGl0IGNvbnRhaW5zIHRoZSBjc3MgY29udGVudHNcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbi5hZGRDc3MoY3NzRXhwb3J0WzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuO1xuICAgIGlmIChtb2R1bGUuaG90KSB7XG4gICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG4gICAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZSgoKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwuaG1yUmVmcmVzaCh7IHR5cGU6ICdzdHlsZScsIHBhdGg6ICcuL2NvbXBvbmVudHMvU25hcEl0LnZ1ZScgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcIlBhZ2VcIixcbiAgICBbXG4gICAgICBfYyhcIkFjdGlvbkJhclwiLCB7IGF0dHJzOiB7IHRpdGxlOiBcIk1vbnN0ZXIgYW5kIEhlcm9zXCIgfSB9KSxcbiAgICAgIF9jKFxuICAgICAgICBcIlNjcm9sbFZpZXdcIixcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJTdGFja0xheW91dFwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJob21lLXBhbmVsXCIgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaDIgZGVzY3JpcHRpb24tbGFiZWxcIixcbiAgICAgICAgICAgICAgICBhdHRyczogeyB0ZXh0V3JhcDogXCJ0cnVlXCIsIHRleHQ6IFwiUGxheSB3aXRoIE5hdGl2ZVNjcmlwdCFcIiB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJoMiBkZXNjcmlwdGlvbi1sYWJlbFwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICB0ZXh0V3JhcDogXCJ0cnVlXCIsXG4gICAgICAgICAgICAgICAgICB0ZXh0OlxuICAgICAgICAgICAgICAgICAgICBcIldyaXRlIGNvZGUgaW4gdGhlIGVkaXRvciBvciBkcmFnIGFuZCBkcm9wIGNvbXBvbmVudHMgdG8gYnVpbGQgYSBOYXRpdmVTY3JpcHQgbW9iaWxlIGFwcGxpY2F0aW9uLlwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICcvL3BsYXkubmF0aXZlc2NyaXB0Lm9yZy9kaXN0L2Fzc2V0cy9pbWcvTmF0aXZlU2NyaXB0X2xvZ28ucG5nXCIgLz5cXG4gICAgICAgICAgICBTY2FuIHRoZSBRUiBjb2RlIHdpdGggeW91ciBtb2JpbGUgZGV2aWNlIGFuZCB3YXRjaCB0aGUgY2hhbmdlc1xcbiAgICAgICAgICAgIHN5bmMgbGl2ZSB3aGlsZSB5b3UgcGxheSB3aXRoIHRoZSBjb2RlLlwiIGNsYXNzPVwiaDJcXG4gICAgICAgICAgICBkZXNjcmlwdGlvbi1sYWJlbFwiIC8+XFxuICAgICAgICAgICAgJ1xuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgc3JjOiBfdm0uY2FtZXJhSW1hZ2UsXG4gICAgICAgICAgICAgICAgICBpZDogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgc3RyZXRjaDogXCJhc3BlY3RGaXRcIixcbiAgICAgICAgICAgICAgICAgIG1hcmdpbjogXCIxMFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2MoXCJUZXh0Vmlld1wiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgcm93OiBcIjJcIiwgdGV4dDogX3ZtLmxhYmVsVGV4dCwgZWRpdGFibGU6IFwiZmFsc2VcIiB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIkJ1dHRvblwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgcm93OiBcIjNcIiwgdGV4dDogXCJUYWtlIFBpY3R1cmVcIiwgcGFkZGluZzogXCIxMFwiIH0sXG4gICAgICAgICAgICAgICAgb246IHsgdGFwOiBfdm0ub25UYWtlUGljdHVyZVRhcCB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIG1hcCA9IHtcblx0XCIuL2FwcC5jc3NcIjogXCIuL2FwcC5jc3NcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi8gc3luYyBeXFxcXC5cXFxcL2FwcFxcXFwuKGNzc3xzY3NzfGxlc3N8c2FzcykkXCI7IiwidmFyIG1hcCA9IHtcblx0XCIuL2FwcC5jc3NcIjogXCIuL2FwcC5jc3NcIixcblx0XCIuL2FwcC5qc1wiOiBcIi4vYXBwLmpzXCIsXG5cdFwiLi9uYXRpdmVzY3JpcHQtY2FtZXJhL2NhbWVyYS5jb21tb24uanNcIjogXCIuL25hdGl2ZXNjcmlwdC1jYW1lcmEvY2FtZXJhLmNvbW1vbi5qc1wiLFxuXHRcIi4vbmF0aXZlc2NyaXB0LWNhbWVyYS9jYW1lcmEuanNcIjogXCIuL25hdGl2ZXNjcmlwdC1jYW1lcmEvY2FtZXJhLmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vIHN5bmMgcmVjdXJzaXZlICg/PCFcXFxcYkFwcF9SZXNvdXJjZXNcXFxcYi4qKSg/PCFcXFxcLlxcXFwvXFxcXGJ0ZXN0c1xcXFxiXFxcXC8uKj8pXFxcXC4oeG1sfGNzc3xqc3woPzwhXFxcXC5kXFxcXC4pdHN8KD88IVxcXFxiX1tcXFxcdy1dKlxcXFwuKXNjc3MpJFwiOyIsImdsb2JhbC5yZWdpc3Rlck1vZHVsZShcIn5AbmF0aXZlc2NyaXB0L3RoZW1lL2Nzcy9jb3JlLmNzc1wiLCAoKSA9PiByZXF1aXJlKFwiIW5hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9jc3MyanNvbi1sb2FkZXI/dXNlRm9ySW1wb3J0cyFAbmF0aXZlc2NyaXB0L3RoZW1lL2Nzcy9jb3JlLmNzc1wiKSk7XG5nbG9iYWwucmVnaXN0ZXJNb2R1bGUoXCJAbmF0aXZlc2NyaXB0L3RoZW1lL2Nzcy9jb3JlLmNzc1wiLCAoKSA9PiByZXF1aXJlKFwiIW5hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9jc3MyanNvbi1sb2FkZXI/dXNlRm9ySW1wb3J0cyFAbmF0aXZlc2NyaXB0L3RoZW1lL2Nzcy9jb3JlLmNzc1wiKSk7XG5nbG9iYWwucmVnaXN0ZXJNb2R1bGUoXCJ+QG5hdGl2ZXNjcmlwdC90aGVtZS9jc3Mvc2t5LmNzc1wiLCAoKSA9PiByZXF1aXJlKFwiIW5hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9jc3MyanNvbi1sb2FkZXI/dXNlRm9ySW1wb3J0cyFAbmF0aXZlc2NyaXB0L3RoZW1lL2Nzcy9za3kuY3NzXCIpKTtcbmdsb2JhbC5yZWdpc3Rlck1vZHVsZShcIkBuYXRpdmVzY3JpcHQvdGhlbWUvY3NzL3NreS5jc3NcIiwgKCkgPT4gcmVxdWlyZShcIiFuYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svY3NzMmpzb24tbG9hZGVyP3VzZUZvckltcG9ydHMhQG5hdGl2ZXNjcmlwdC90aGVtZS9jc3Mvc2t5LmNzc1wiKSk7bW9kdWxlLmV4cG9ydHMgPSB7XCJ0eXBlXCI6XCJzdHlsZXNoZWV0XCIsXCJzdHlsZXNoZWV0XCI6e1wicnVsZXNcIjpbe1widHlwZVwiOlwiaW1wb3J0XCIsXCJpbXBvcnRcIjpcIid+QG5hdGl2ZXNjcmlwdC90aGVtZS9jc3MvY29yZS5jc3MnXCJ9LHtcInR5cGVcIjpcImltcG9ydFwiLFwiaW1wb3J0XCI6XCInfkBuYXRpdmVzY3JpcHQvdGhlbWUvY3NzL3NreS5jc3MnXCJ9LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIi5idG5cIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJmb250LXNpemVcIixcInZhbHVlXCI6XCIxOFwifV19XSxcInBhcnNpbmdFcnJvcnNcIjpbXX19OztcbiAgICBpZiAobW9kdWxlLmhvdCkge1xuICAgICAgICBtb2R1bGUuaG90LmFjY2VwdCgpO1xuICAgICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoKCkgPT4ge1xuICAgICAgICAgICAgZ2xvYmFsLmhtclJlZnJlc2goeyB0eXBlOiAnc3R5bGUnLCBwYXRoOiAnLi9hcHAuY3NzJyB9KTtcbiAgICAgICAgfSlcbiAgICB9XG4iLCJpbXBvcnQgVnVlIGZyb20gXCJuYXRpdmVzY3JpcHQtdnVlXCI7XG5cbmltcG9ydCBTbmFwSXQgZnJvbSBcIi4vY29tcG9uZW50cy9TbmFwSXRcIjtcblxuLy8gVW5jb21tbWVudCB0aGUgZm9sbG93aW5nIHRvIHNlZSBOYXRpdmVTY3JpcHQtVnVlIG91dHB1dCBsb2dzXG4vLyBWdWUuY29uZmlnLnNpbGVudCA9IGZhbHNlO1xuXG5uZXcgVnVlKHtcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPEZyYW1lPlxuICAgICAgICAgICAgPFNuYXBJdCAvPlxuICAgICAgICA8L0ZyYW1lPmAsXG5cbiAgY29tcG9uZW50czoge1xuICAgIFNuYXBJdFxuICB9XG59KS4kc3RhcnQoKTtcbiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vU25hcEl0LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xYjRhYjkzMCZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9TbmFwSXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9TbmFwSXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL1NuYXBJdC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0xYjRhYjkzMCZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiMWI0YWI5MzBcIixcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVXNlcnMvbXdlaXNoZWltZXIvRGV2ZWxvcG1lbnQvSGVyb2VzL21vbnN0ZXJzLWFuZC1oZXJvZXMvbW9iaWxlLWFwcC9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCcxYjRhYjkzMCcpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCcxYjRhYjkzMCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCcxYjRhYjkzMCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vU25hcEl0LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xYjRhYjkzMCZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCcxYjRhYjkzMCcsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiY29tcG9uZW50cy9TbmFwSXQudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1NuYXBJdC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9TbmFwSXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL3N0eWxlLWhvdC1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9hcHBseS1jc3MtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTMtMiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9TbmFwSXQudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MWI0YWI5MzAmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9zdHlsZS1ob3QtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svYXBwbHktY3NzLWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0zLTIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vU25hcEl0LnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTFiNGFiOTMwJnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1NuYXBJdC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MWI0YWI5MzAmc2NvcGVkPXRydWUmXCIiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGdldEFzcGVjdFNhZmVEaW1lbnNpb25zKHNvdXJjZVdpZHRoLCBzb3VyY2VIZWlnaHQsIHJlcVdpZHRoLCByZXFIZWlnaHQpIHtcbiAgICB2YXIgd2lkdGhDb2VmID0gc291cmNlV2lkdGggLyByZXFXaWR0aDtcbiAgICB2YXIgaGVpZ2h0Q29lZiA9IHNvdXJjZUhlaWdodCAvIHJlcUhlaWdodDtcbiAgICB2YXIgYXNwZWN0Q29lZiA9IHdpZHRoQ29lZiA+IGhlaWdodENvZWYgPyB3aWR0aENvZWYgOiBoZWlnaHRDb2VmO1xuICAgIHJldHVybiB7XG4gICAgICAgIHdpZHRoOiBNYXRoLmZsb29yKHNvdXJjZVdpZHRoIC8gYXNwZWN0Q29lZiksXG4gICAgICAgIGhlaWdodDogTWF0aC5mbG9vcihzb3VyY2VIZWlnaHQgLyBhc3BlY3RDb2VmKVxuICAgIH07XG59XG5leHBvcnRzLmdldEFzcGVjdFNhZmVEaW1lbnNpb25zID0gZ2V0QXNwZWN0U2FmZURpbWVuc2lvbnM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jYW1lcmEuY29tbW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHR5cGVzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdXRpbHMvdHlwZXNcIik7XG52YXIgaW1hZ2VBc3NldE1vZHVsZSA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2ltYWdlLWFzc2V0L2ltYWdlLWFzc2V0XCIpO1xudmFyIHRyYWNlID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdHJhY2UvdHJhY2VcIik7XG52YXIgVUlJbWFnZVBpY2tlckNvbnRyb2xsZXJEZWxlZ2F0ZUltcGwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhVSUltYWdlUGlja2VyQ29udHJvbGxlckRlbGVnYXRlSW1wbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBVSUltYWdlUGlja2VyQ29udHJvbGxlckRlbGVnYXRlSW1wbCgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBVSUltYWdlUGlja2VyQ29udHJvbGxlckRlbGVnYXRlSW1wbC5uZXcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIubmV3LmNhbGwodGhpcyk7XG4gICAgfTtcbiAgICBVSUltYWdlUGlja2VyQ29udHJvbGxlckRlbGVnYXRlSW1wbC5wcm90b3R5cGUuaW5pdFdpdGhDYWxsYmFjayA9IGZ1bmN0aW9uIChjYWxsYmFjaywgZXJyb3JDYWxsYmFjaykge1xuICAgICAgICB0aGlzLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLl9lcnJvckNhbGxiYWNrID0gZXJyb3JDYWxsYmFjaztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBVSUltYWdlUGlja2VyQ29udHJvbGxlckRlbGVnYXRlSW1wbC5wcm90b3R5cGUuaW5pdFdpdGhDYWxsYmFja0FuZE9wdGlvbnMgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgdGhpcy5fZXJyb3JDYWxsYmFjayA9IGVycm9yQ2FsbGJhY2s7XG4gICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLl93aWR0aCA9IG9wdGlvbnMud2lkdGg7XG4gICAgICAgICAgICB0aGlzLl9oZWlnaHQgPSBvcHRpb25zLmhlaWdodDtcbiAgICAgICAgICAgIHRoaXMuX3NhdmVUb0dhbGxlcnkgPSBvcHRpb25zLnNhdmVUb0dhbGxlcnk7XG4gICAgICAgICAgICB0aGlzLl9hbGxvd3NFZGl0aW5nID0gb3B0aW9ucy5hbGxvd3NFZGl0aW5nO1xuICAgICAgICAgICAgdGhpcy5fa2VlcEFzcGVjdFJhdGlvID0gdHlwZXMuaXNOdWxsT3JVbmRlZmluZWQob3B0aW9ucy5rZWVwQXNwZWN0UmF0aW8pID8gdHJ1ZSA6IG9wdGlvbnMua2VlcEFzcGVjdFJhdGlvO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgVUlJbWFnZVBpY2tlckNvbnRyb2xsZXJEZWxlZ2F0ZUltcGwucHJvdG90eXBlLmltYWdlUGlja2VyQ29udHJvbGxlckRpZEZpbmlzaFBpY2tpbmdNZWRpYVdpdGhJbmZvID0gZnVuY3Rpb24gKHBpY2tlciwgaW5mbykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoaW5mbykge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnREYXRlXzEgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGluZm8udmFsdWVGb3JLZXkoVUlJbWFnZVBpY2tlckNvbnRyb2xsZXJPcmlnaW5hbEltYWdlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9hbGxvd3NFZGl0aW5nKSB7XG4gICAgICAgICAgICAgICAgc291cmNlID0gaW5mby52YWx1ZUZvcktleShVSUltYWdlUGlja2VyQ29udHJvbGxlckVkaXRlZEltYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW1hZ2VTb3VyY2UgPSByZXF1aXJlKFwiaW1hZ2Utc291cmNlXCIpO1xuICAgICAgICAgICAgICAgIHZhciBpbWFnZVNvdXJjZVJlc3VsdF8xID0gaW1hZ2VTb3VyY2UuZnJvbU5hdGl2ZVNvdXJjZShzb3VyY2UpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW1hZ2VBc3NldF8xO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2F2ZVRvR2FsbGVyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgUEhQaG90b0xpYnJhcnkuc2hhcmVkUGhvdG9MaWJyYXJ5KCkucGVyZm9ybUNoYW5nZXNDb21wbGV0aW9uSGFuZGxlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUEhBc3NldENoYW5nZVJlcXVlc3QuY3JlYXRpb25SZXF1ZXN0Rm9yQXNzZXRGcm9tSW1hZ2UoaW1hZ2VTb3VyY2VSZXN1bHRfMS5pb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHN1Y2Nlc3MsIGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmZXRjaE9wdGlvbnMgPSBQSEZldGNoT3B0aW9ucy5hbGxvYygpLmluaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNvcnREZXNjcmlwdG9ycyA9IE5TQXJyYXkuYXJyYXlXaXRoT2JqZWN0KE5TU29ydERlc2NyaXB0b3Iuc29ydERlc2NyaXB0b3JXaXRoS2V5QXNjZW5kaW5nKFwiY3JlYXRpb25EYXRlXCIsIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoT3B0aW9ucy5zb3J0RGVzY3JpcHRvcnMgPSBzb3J0RGVzY3JpcHRvcnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoT3B0aW9ucy5wcmVkaWNhdGUgPSBOU1ByZWRpY2F0ZS5wcmVkaWNhdGVXaXRoRm9ybWF0QXJndW1lbnRBcnJheShcIm1lZGlhVHlwZSA9ICVkXCIsIE5TQXJyYXkuYXJyYXlXaXRoT2JqZWN0KDEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZldGNoUmVzdWx0ID0gUEhBc3NldC5mZXRjaEFzc2V0c1dpdGhPcHRpb25zKGZldGNoT3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmZXRjaFJlc3VsdC5jb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NldCA9IGZldGNoUmVzdWx0WzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGVEaWZmID0gYXNzZXQuY3JlYXRpb25EYXRlLnZhbHVlT2YoKSAtIGN1cnJlbnREYXRlXzEudmFsdWVPZigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRhdGVEaWZmKSA+IDEwMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJJbWFnZSBhc3NldCByZXR1cm5lZCB3YXMgY3JlYXRlZCBtb3JlIHRoYW4gMSBzZWNvbmQgYWdvXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VBc3NldF8xID0gbmV3IGltYWdlQXNzZXRNb2R1bGUuSW1hZ2VBc3NldChhc3NldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXRJbWFnZUFzc2V0QW5kQ2FsbENhbGxiYWNrKGltYWdlQXNzZXRfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNlLndyaXRlKFwiQW4gZXJyb3Igb2N1cnJlZCB3aGlsZSBzYXZpbmcgaW1hZ2UgdG8gZ2FsbGVyeTogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyLCB0cmFjZS5jYXRlZ29yaWVzLkVycm9yLCB0cmFjZS5tZXNzYWdlVHlwZS5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZUFzc2V0XzEgPSBuZXcgaW1hZ2VBc3NldE1vZHVsZS5JbWFnZUFzc2V0KGltYWdlU291cmNlUmVzdWx0XzEuaW9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0SW1hZ2VBc3NldEFuZENhbGxDYWxsYmFjayhpbWFnZUFzc2V0XzEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHBpY2tlci5wcmVzZW50aW5nVmlld0NvbnRyb2xsZXIuZGlzbWlzc1ZpZXdDb250cm9sbGVyQW5pbWF0ZWRDb21wbGV0aW9uKHRydWUsIG51bGwpO1xuICAgICAgICBsaXN0ZW5lciA9IG51bGw7XG4gICAgfTtcbiAgICBVSUltYWdlUGlja2VyQ29udHJvbGxlckRlbGVnYXRlSW1wbC5wcm90b3R5cGUuc2V0SW1hZ2VBc3NldEFuZENhbGxDYWxsYmFjayA9IGZ1bmN0aW9uIChpbWFnZUFzc2V0KSB7XG4gICAgICAgIGlmICh0aGlzLl9rZWVwQXNwZWN0UmF0aW8pIHtcbiAgICAgICAgICAgIHZhciBwaWN0dXJlV2lkdGggPSBpbWFnZUFzc2V0Lm5hdGl2ZUltYWdlID8gaW1hZ2VBc3NldC5uYXRpdmVJbWFnZS5zaXplLndpZHRoIDogaW1hZ2VBc3NldC5pb3MucGl4ZWxXaWR0aDtcbiAgICAgICAgICAgIHZhciBwaWN0dXJlSGVpZ2h0ID0gaW1hZ2VBc3NldC5uYXRpdmVJbWFnZSA/IGltYWdlQXNzZXQubmF0aXZlSW1hZ2Uuc2l6ZS5oZWlnaHQgOiBpbWFnZUFzc2V0Lmlvcy5waXhlbEhlaWdodDtcbiAgICAgICAgICAgIHZhciBpc1BpY3R1cmVMYW5kc2NhcGUgPSBwaWN0dXJlV2lkdGggPiBwaWN0dXJlSGVpZ2h0O1xuICAgICAgICAgICAgdmFyIGFyZU9wdGlvbnNMYW5kc2NhcGUgPSB0aGlzLl93aWR0aCA+IHRoaXMuX2hlaWdodDtcbiAgICAgICAgICAgIGlmIChpc1BpY3R1cmVMYW5kc2NhcGUgIT09IGFyZU9wdGlvbnNMYW5kc2NhcGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgb2xkV2lkdGggPSB0aGlzLl93aWR0aDtcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCA9IHRoaXMuX2hlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLl9oZWlnaHQgPSBvbGRXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpbWFnZUFzc2V0Lm9wdGlvbnMgPSB7XG4gICAgICAgICAgICB3aWR0aDogdGhpcy5fd2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuX2hlaWdodCxcbiAgICAgICAgICAgIGtlZXBBc3BlY3RSYXRpbzogdGhpcy5fa2VlcEFzcGVjdFJhdGlvXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrKGltYWdlQXNzZXQpO1xuICAgIH07XG4gICAgVUlJbWFnZVBpY2tlckNvbnRyb2xsZXJEZWxlZ2F0ZUltcGwucHJvdG90eXBlLmltYWdlUGlja2VyQ29udHJvbGxlckRpZENhbmNlbCA9IGZ1bmN0aW9uIChwaWNrZXIpIHtcbiAgICAgICAgcGlja2VyLnByZXNlbnRpbmdWaWV3Q29udHJvbGxlci5kaXNtaXNzVmlld0NvbnRyb2xsZXJBbmltYXRlZENvbXBsZXRpb24odHJ1ZSwgbnVsbCk7XG4gICAgICAgIGxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZXJyb3JDYWxsYmFjayhuZXcgRXJyb3IoXCJjYW5jZWxsZWRcIikpO1xuICAgIH07XG4gICAgVUlJbWFnZVBpY2tlckNvbnRyb2xsZXJEZWxlZ2F0ZUltcGwuT2JqQ1Byb3RvY29scyA9IFtVSUltYWdlUGlja2VyQ29udHJvbGxlckRlbGVnYXRlXTtcbiAgICByZXR1cm4gVUlJbWFnZVBpY2tlckNvbnRyb2xsZXJEZWxlZ2F0ZUltcGw7XG59KE5TT2JqZWN0KSk7XG52YXIgbGlzdGVuZXI7XG5leHBvcnRzLnRha2VQaWN0dXJlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBsaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIHZhciBpbWFnZVBpY2tlckNvbnRyb2xsZXIgPSBVSUltYWdlUGlja2VyQ29udHJvbGxlci5uZXcoKTtcbiAgICAgICAgdmFyIHJlcVdpZHRoID0gMDtcbiAgICAgICAgdmFyIHJlcUhlaWdodCA9IDA7XG4gICAgICAgIHZhciBrZWVwQXNwZWN0UmF0aW8gPSB0cnVlO1xuICAgICAgICB2YXIgc2F2ZVRvR2FsbGVyeSA9IHRydWU7XG4gICAgICAgIHZhciBhbGxvd3NFZGl0aW5nID0gZmFsc2U7XG4gICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICByZXFXaWR0aCA9IG9wdGlvbnMud2lkdGggfHwgMDtcbiAgICAgICAgICAgIHJlcUhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0IHx8IHJlcVdpZHRoO1xuICAgICAgICAgICAga2VlcEFzcGVjdFJhdGlvID0gdHlwZXMuaXNOdWxsT3JVbmRlZmluZWQob3B0aW9ucy5rZWVwQXNwZWN0UmF0aW8pID8ga2VlcEFzcGVjdFJhdGlvIDogb3B0aW9ucy5rZWVwQXNwZWN0UmF0aW87XG4gICAgICAgICAgICBzYXZlVG9HYWxsZXJ5ID0gdHlwZXMuaXNOdWxsT3JVbmRlZmluZWQob3B0aW9ucy5zYXZlVG9HYWxsZXJ5KSA/IHNhdmVUb0dhbGxlcnkgOiBvcHRpb25zLnNhdmVUb0dhbGxlcnk7XG4gICAgICAgICAgICBhbGxvd3NFZGl0aW5nID0gdHlwZXMuaXNOdWxsT3JVbmRlZmluZWQob3B0aW9ucy5hbGxvd3NFZGl0aW5nKSA/IGFsbG93c0VkaXRpbmcgOiBvcHRpb25zLmFsbG93c0VkaXRpbmc7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGF1dGhTdGF0dXMgPSBQSFBob3RvTGlicmFyeS5hdXRob3JpemF0aW9uU3RhdHVzKCk7XG4gICAgICAgIGlmIChhdXRoU3RhdHVzICE9PSAzKSB7XG4gICAgICAgICAgICBzYXZlVG9HYWxsZXJ5ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcVdpZHRoICYmIHJlcUhlaWdodCkge1xuICAgICAgICAgICAgbGlzdGVuZXIgPSBVSUltYWdlUGlja2VyQ29udHJvbGxlckRlbGVnYXRlSW1wbC5uZXcoKS5pbml0V2l0aENhbGxiYWNrQW5kT3B0aW9ucyhyZXNvbHZlLCByZWplY3QsIHsgd2lkdGg6IHJlcVdpZHRoLCBoZWlnaHQ6IHJlcUhlaWdodCwga2VlcEFzcGVjdFJhdGlvOiBrZWVwQXNwZWN0UmF0aW8sIHNhdmVUb0dhbGxlcnk6IHNhdmVUb0dhbGxlcnksIGFsbG93c0VkaXRpbmc6IGFsbG93c0VkaXRpbmcgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2F2ZVRvR2FsbGVyeSkge1xuICAgICAgICAgICAgbGlzdGVuZXIgPSBVSUltYWdlUGlja2VyQ29udHJvbGxlckRlbGVnYXRlSW1wbC5uZXcoKS5pbml0V2l0aENhbGxiYWNrQW5kT3B0aW9ucyhyZXNvbHZlLCByZWplY3QsIHsgc2F2ZVRvR2FsbGVyeTogc2F2ZVRvR2FsbGVyeSwga2VlcEFzcGVjdFJhdGlvOiBrZWVwQXNwZWN0UmF0aW8sIGFsbG93c0VkaXRpbmc6IGFsbG93c0VkaXRpbmcgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsaXN0ZW5lciA9IFVJSW1hZ2VQaWNrZXJDb250cm9sbGVyRGVsZWdhdGVJbXBsLm5ldygpLmluaXRXaXRoQ2FsbGJhY2socmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfVxuICAgICAgICBpbWFnZVBpY2tlckNvbnRyb2xsZXIuZGVsZWdhdGUgPSBsaXN0ZW5lcjtcbiAgICAgICAgdmFyIHNvdXJjZVR5cGUgPSAxO1xuICAgICAgICB2YXIgbWVkaWFUeXBlcyA9IFVJSW1hZ2VQaWNrZXJDb250cm9sbGVyLmF2YWlsYWJsZU1lZGlhVHlwZXNGb3JTb3VyY2VUeXBlKHNvdXJjZVR5cGUpO1xuICAgICAgICB2YXIgaW1hZ2VNZWRpYVR5cGUgPSBcInB1YmxpYy5pbWFnZVwiO1xuICAgICAgICBpZiAobWVkaWFUeXBlcyAmJiBtZWRpYVR5cGVzLmNvbnRhaW5zT2JqZWN0KGltYWdlTWVkaWFUeXBlKSkge1xuICAgICAgICAgICAgdmFyIG1lZGlhVHlwZXNBcnJheSA9IG5ldyBOU011dGFibGVBcnJheSh7IGNhcGFjaXR5OiAxIH0pO1xuICAgICAgICAgICAgbWVkaWFUeXBlc0FycmF5LmFkZE9iamVjdChpbWFnZU1lZGlhVHlwZSk7XG4gICAgICAgICAgICBpbWFnZVBpY2tlckNvbnRyb2xsZXIubWVkaWFUeXBlcyA9IG1lZGlhVHlwZXNBcnJheTtcbiAgICAgICAgICAgIGltYWdlUGlja2VyQ29udHJvbGxlci5zb3VyY2VUeXBlID0gc291cmNlVHlwZTtcbiAgICAgICAgICAgIGltYWdlUGlja2VyQ29udHJvbGxlci5jYW1lcmFEZXZpY2UgPSBvcHRpb25zICYmIG9wdGlvbnMuY2FtZXJhRmFjaW5nID09PSBcImZyb250XCIgP1xuICAgICAgICAgICAgICAgIDEgOiAwO1xuICAgICAgICAgICAgaW1hZ2VQaWNrZXJDb250cm9sbGVyLmFsbG93c0VkaXRpbmcgPSBhbGxvd3NFZGl0aW5nO1xuICAgICAgICB9XG4gICAgICAgIGltYWdlUGlja2VyQ29udHJvbGxlci5tb2RhbFByZXNlbnRhdGlvblN0eWxlID0gMztcbiAgICAgICAgdmFyIGZyYW1lID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIik7XG4gICAgICAgIHZhciB0b3BNb3N0RnJhbWUgPSBmcmFtZS50b3Btb3N0KCk7XG4gICAgICAgIGlmICh0b3BNb3N0RnJhbWUpIHtcbiAgICAgICAgICAgIHZhciB2aWV3Q29udHJvbGxlciA9IHRvcE1vc3RGcmFtZS5jdXJyZW50UGFnZSAmJiB0b3BNb3N0RnJhbWUuY3VycmVudFBhZ2UuaW9zO1xuICAgICAgICAgICAgaWYgKHZpZXdDb250cm9sbGVyKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHZpZXdDb250cm9sbGVyLnBhcmVudFZpZXdDb250cm9sbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXdDb250cm9sbGVyID0gdmlld0NvbnRyb2xsZXIucGFyZW50Vmlld0NvbnRyb2xsZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdoaWxlICh2aWV3Q29udHJvbGxlci5wcmVzZW50ZWRWaWV3Q29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgICAgICB2aWV3Q29udHJvbGxlciA9IHZpZXdDb250cm9sbGVyLnByZXNlbnRlZFZpZXdDb250cm9sbGVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2aWV3Q29udHJvbGxlci5wcmVzZW50Vmlld0NvbnRyb2xsZXJBbmltYXRlZENvbXBsZXRpb24oaW1hZ2VQaWNrZXJDb250cm9sbGVyLCB0cnVlLCBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufTtcbmV4cG9ydHMuaXNBdmFpbGFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFVJSW1hZ2VQaWNrZXJDb250cm9sbGVyLmlzU291cmNlVHlwZUF2YWlsYWJsZSgxKTtcbn07XG5leHBvcnRzLnJlcXVlc3RQZXJtaXNzaW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBleHBvcnRzLnJlcXVlc3RQaG90b3NQZXJtaXNzaW9ucygpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZXhwb3J0cy5yZXF1ZXN0Q2FtZXJhUGVybWlzc2lvbnMoKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgfSk7XG59O1xuZXhwb3J0cy5yZXF1ZXN0UGhvdG9zUGVybWlzc2lvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIGF1dGhTdGF0dXMgPSBQSFBob3RvTGlicmFyeS5hdXRob3JpemF0aW9uU3RhdHVzKCk7XG4gICAgICAgIHN3aXRjaCAoYXV0aFN0YXR1cykge1xuICAgICAgICAgICAgY2FzZSAwOiB7XG4gICAgICAgICAgICAgICAgUEhQaG90b0xpYnJhcnkucmVxdWVzdEF1dGhvcml6YXRpb24oZnVuY3Rpb24gKGF1dGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF1dGggPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmFjZS5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNlLndyaXRlKFwiQXBwbGljYXRpb24gY2FuIGFjY2VzcyBwaG90byBsaWJyYXJ5IGFzc2V0cy5cIiwgdHJhY2UuY2F0ZWdvcmllcy5EZWJ1Zyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAzOiB7XG4gICAgICAgICAgICAgICAgaWYgKHRyYWNlLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYWNlLndyaXRlKFwiQXBwbGljYXRpb24gY2FuIGFjY2VzcyBwaG90byBsaWJyYXJ5IGFzc2V0cy5cIiwgdHJhY2UuY2F0ZWdvcmllcy5EZWJ1Zyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNhc2UgMjoge1xuICAgICAgICAgICAgICAgIGlmICh0cmFjZS5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0cmFjZS53cml0ZShcIkFwcGxpY2F0aW9uIGNhbiBub3QgYWNjZXNzIHBob3RvIGxpYnJhcnkgYXNzZXRzLlwiLCB0cmFjZS5jYXRlZ29yaWVzLkRlYnVnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5leHBvcnRzLnJlcXVlc3RDYW1lcmFQZXJtaXNzaW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgY2FtZXJhU3RhdHVzID0gQVZDYXB0dXJlRGV2aWNlLmF1dGhvcml6YXRpb25TdGF0dXNGb3JNZWRpYVR5cGUoQVZNZWRpYVR5cGVWaWRlbyk7XG4gICAgICAgIHN3aXRjaCAoY2FtZXJhU3RhdHVzKSB7XG4gICAgICAgICAgICBjYXNlIDA6IHtcbiAgICAgICAgICAgICAgICBBVkNhcHR1cmVEZXZpY2UucmVxdWVzdEFjY2Vzc0Zvck1lZGlhVHlwZUNvbXBsZXRpb25IYW5kbGVyKEFWTWVkaWFUeXBlVmlkZW8sIGZ1bmN0aW9uIChncmFudGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChncmFudGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAzOiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY2FzZSAyOiB7XG4gICAgICAgICAgICAgICAgaWYgKHRyYWNlLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYWNlLndyaXRlKFwiQXBwbGljYXRpb24gY2FuIG5vdCBhY2Nlc3MgQ2FtZXJhIGFzc2V0cy5cIiwgdHJhY2UuY2F0ZWdvcmllcy5EZWJ1Zyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2FtZXJhLmlvcy5qcy5tYXAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtY2FtZXJhXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC12dWVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2J1bmRsZS1lbnRyeS1wb2ludHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2ltYWdlLWFzc2V0L2ltYWdlLWFzc2V0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy90ZXh0L2Zvcm1hdHRlZC1zdHJpbmdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy90ZXh0L3NwYW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy90cmFjZS90cmFjZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2FjdGlvbi1iYXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9hY3Rpdml0eS1pbmRpY2F0b3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9ib3JkZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9ib3R0b20tbmF2aWdhdGlvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2J1dHRvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvbnRlbnQtdmlld1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlld1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RhdGUtcGlja2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9odG1sLXZpZXdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xhYmVsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9hYnNvbHV0ZS1sYXlvdXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2RvY2stbGF5b3V0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9mbGV4Ym94LWxheW91dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvZ3JpZC1sYXlvdXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2xheW91dC1iYXNlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3dyYXAtbGF5b3V0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC1waWNrZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXZpZXdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvcGxhY2Vob2xkZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9wcm9ncmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3Byb3h5LXZpZXctY29udGFpbmVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvc2Nyb2xsLXZpZXdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9zZWFyY2gtYmFyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvc2VnbWVudGVkLWJhclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NsaWRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3N0eWxpbmcvc3R5bGUtc2NvcGVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9zd2l0Y2hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS90YWItbmF2aWdhdGlvbi1iYXNlL3RhYi1jb250ZW50LWl0ZW1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS90YWItbmF2aWdhdGlvbi1iYXNlL3RhYi1zdHJpcFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RhYi1uYXZpZ2F0aW9uLWJhc2UvdGFiLXN0cmlwLWl0ZW1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS90YWItdmlld1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RhYnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LWZpZWxkXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvdGV4dC12aWV3XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvdGltZS1waWNrZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS93ZWItdmlld1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3V0aWxzL3R5cGVzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMveG1sXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=