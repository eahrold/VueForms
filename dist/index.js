(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("moment"), require("vue"), require("jquery"), require("bootstrap-daterangepicker"), require("dropzone"), require("vue-the-mask"), require("@tinymce/tinymce-vue"), require("simplemde"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "moment", "vue", "jquery", "bootstrap-daterangepicker", "dropzone", "vue-the-mask", "@tinymce/tinymce-vue", "simplemde"], factory);
	else if(typeof exports === 'object')
		exports["vue-forms"] = factory(require("lodash"), require("moment"), require("vue"), require("jquery"), require("bootstrap-daterangepicker"), require("dropzone"), require("vue-the-mask"), require("@tinymce/tinymce-vue"), require("simplemde"));
	else
		root["vue-forms"] = factory(root["lodash"], root["moment"], root["vue"], root["jquery"], root["bootstrap-daterangepicker"], root["dropzone"], root["vue-the-mask"], root["@tinymce/tinymce-vue"], root["simplemde"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_18__, __WEBPACK_EXTERNAL_MODULE_45__, __WEBPACK_EXTERNAL_MODULE_84__, __WEBPACK_EXTERNAL_MODULE_85__, __WEBPACK_EXTERNAL_MODULE_118__, __WEBPACK_EXTERNAL_MODULE_175__, __WEBPACK_EXTERNAL_MODULE_215__, __WEBPACK_EXTERNAL_MODULE_221__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 112);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
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
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(40), __webpack_require__(42), __webpack_require__(17), __webpack_require__(120), __webpack_require__(43), __webpack_require__(121), __webpack_require__(122), __webpack_require__(41), __webpack_require__(123), __webpack_require__(124)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./props'), require('./values'), require('./vf_uid'), require('./options'), require('./errors'), require('./dates'), require('./dropzone'), require('./styles'), require('./core'), require('./formData'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.props, global.values, global.vf_uid, global.options, global.errors, global.dates, global.dropzone, global.styles, global.core, global.formData);
    global.index = mod.exports;
  }
})(this, function (exports, _props, _values, _vf_uid, _options, _errors, _dates, _dropzone, _styles, _core, _formData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'props', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_props).default;
    }
  });
  Object.defineProperty(exports, 'values', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_values).default;
    }
  });
  Object.defineProperty(exports, 'vf_uid', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_vf_uid).default;
    }
  });
  Object.defineProperty(exports, 'options', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_options).default;
    }
  });
  Object.defineProperty(exports, 'errors', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_errors).default;
    }
  });
  Object.defineProperty(exports, 'dates', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_dates).default;
    }
  });
  Object.defineProperty(exports, 'dropzone', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_dropzone).default;
    }
  });
  Object.defineProperty(exports, 'styles', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_styles).default;
    }
  });
  Object.defineProperty(exports, 'core', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_core).default;
    }
  });
  Object.defineProperty(exports, 'formData', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_formData).default;
    }
  });

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(117)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(49)('wks');
var uid = __webpack_require__(50);
var Symbol = __webpack_require__(5).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var core = __webpack_require__(7);
var ctx = __webpack_require__(13);
var hide = __webpack_require__(10);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(11);
var createDesc = __webpack_require__(26);
module.exports = __webpack_require__(12) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(9);
var IE8_DOM_DEFINE = __webpack_require__(130);
var toPrimitive = __webpack_require__(131);
var dP = Object.defineProperty;

exports.f = __webpack_require__(12) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(24)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(20);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(134), __webpack_require__(27), __webpack_require__(135), __webpack_require__(136), __webpack_require__(137), __webpack_require__(138)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./States'), require('./Honorifics'), require('./CountryCodes'), require('./DateFormats'), require('./SupportedMimeTypes'), require('./SelectUtil'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.States, global.Honorifics, global.CountryCodes, global.DateFormats, global.SupportedMimeTypes, global.SelectUtil);
    global.index = mod.exports;
  }
})(this, function (exports, _States, _Honorifics, _CountryCodes, _DateFormats, _SupportedMimeTypes, _SelectUtil) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'states', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_States).default;
    }
  });
  Object.defineProperty(exports, 'honorifics', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_Honorifics).default;
    }
  });
  Object.defineProperty(exports, 'countryCodes', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_CountryCodes).default;
    }
  });
  Object.defineProperty(exports, 'dateFormats', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_DateFormats).default;
    }
  });
  Object.defineProperty(exports, 'fileTypes', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_SupportedMimeTypes).default;
    }
  });
  Object.defineProperty(exports, 'selectUtil', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_SelectUtil).default;
    }
  });

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.vf_uid = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        computed: {
            vf_uid: function vf_uid() {
                return this.makeVfUuid();
            }
        },

        methods: {
            makeVfUuid: function makeVfUuid() {
                return 'xxxxxxxx-xxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0;
                    /* eslint-disable eqeqeq */
                    var v = c == 'x' ? r : r & 0x3 | 0x8;
                    /* eslint-enable eqeqeq */
                    return v.toString(16);
                });
            }
        }
    };
});

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_18__;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(125), __esModule: true };

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(44);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
var document = __webpack_require__(5).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.Honorifics = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var prefixes = exports.prefixes = ['Dr', 'Miss', 'Mr', 'Mrs', 'Prof', 'Rev'];

    var suffixes = exports.suffixes = ['A.B', 'B.A.', 'B.E', 'B.F.A.', 'B.S.', 'B.Sc.', 'B.Tech.', 'D.Phil.', 'D.D.S.', 'Ed.D.', 'Eng.D.', 'Esq', 'Jr.', 'L.L.B', 'LL.D', 'LL.M', 'M.A.', 'M.B.A.', 'M.D.', 'M.Eng', 'M.F.A.', 'M.L.A.', 'M.S.', 'M.Sc.', 'Ph.D.', 'Sr.', 'III', 'IV'];

    exports.default = {
        prefixes: prefixes,
        suffixes: suffixes
    };
});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(48);
var defined = __webpack_require__(29);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(31);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(49)('keys');
var uid = __webpack_require__(50);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(29);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(149), __esModule: true };

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(11).f;
var has = __webpack_require__(21);
var TAG = __webpack_require__(6)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(20);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormFileGallery_vue__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormFileGallery_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormFileGallery_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormFileGallery_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormFileGallery_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7cdea0d4_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormFileGallery_vue__ = __webpack_require__(240);
function injectStyle (ssrContext) {
  __webpack_require__(238)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7cdea0d4"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormFileGallery_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7cdea0d4_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormFileGallery_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VueDropzone_vue__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VueDropzone_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VueDropzone_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VueDropzone_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VueDropzone_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0ac54d3a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_VueDropzone_vue__ = __webpack_require__(119);
function injectStyle (ssrContext) {
  __webpack_require__(113)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VueDropzone_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0ac54d3a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_VueDropzone_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(17), __webpack_require__(118)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../mixins/vf_uid'), require('dropzone'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.vf_uid, global.dropzone);
        global.VueDropzone = mod.exports;
    }
})(this, function (exports, _vf_uid, Dropzone) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _vf_uid2 = _interopRequireDefault(_vf_uid);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

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

    Dropzone.autoDiscover = false;

    exports.default = {
        mixins: [_vf_uid2.default],

        props: {
            value: {
                type: String
            },
            url: {
                type: String,
                required: true
            },
            clickable: {
                type: Boolean,
                default: true
            },
            acceptedFileTypes: {
                type: String
            },
            thumbnailHeight: {
                type: Number,
                default: 150
            },
            thumbnailWidth: {
                type: Number,
                default: 150
            },
            showRemoveLink: {
                type: Boolean,
                default: true
            },
            maxFileSizeInMb: {
                type: Number,
                default: 2
            },
            maxNumberOfFiles: {
                type: Number,
                default: 5
            },
            autoProcessQueue: {
                type: Boolean,
                default: true
            },
            useCustomDropzoneOptions: {
                type: Boolean,
                default: false
            },
            headers: {
                type: Object,
                default: function _default() {
                    return {};
                }
            },
            dropzoneOptions: {
                type: Object
            },
            existing: {
                type: [Object, Array]
            }
        },

        data: function data() {
            return {
                dropzone: null
            };
        },


        computed: {
            id: function id() {
                return this.makeVfUuid();
            },
            rootId: function rootId() {
                return this.$slots['button'] ? this.makeVfUuid() : this.id;
            },
            __dzOptoions: function __dzOptoions() {
                var opts = {
                    url: this.url,
                    accept: this.accept,
                    clickable: this.clickable,
                    headers: this.headers,
                    thumbnailWidth: this.thumbnailWidth,
                    thumbnailHeight: this.thumbnailHeight,
                    maxFiles: this.maxNumberOfFiles,
                    maxFilesize: this.maxFileSizeInMb,
                    dictRemoveFile: 'Remove',
                    addRemoveLinks: this.showRemoveLink,
                    acceptedFiles: this.acceptedFileTypes,
                    autoProcessQueue: this.autoProcessQueue,
                    dictDefaultMessage: '<i class="fa fa-2x fa-cloud-upload" aria-hidden="true"></i><br>Drop files here to upload'
                };

                if (this.$slots['button']) {
                    opts.previewTemplate = '<span hidden></span>';
                }
                return opts;
            }
        },

        mounted: function mounted() {
            var _this = this;

            this.$nextTick(function () {
                _this.loadDropzone();
                _this.preload();
            });
        },


        methods: {
            accept: function accept(file, done) {
                var _this2 = this;

                if (this.dropzone.files.length > this.maxNumberOfFiles) {
                    done('You cannon upload any more files');
                    setTimeout(function () {
                        _this2.dropzone.removeFile(file);
                    }, 5000);
                }
                done();
            },
            loadDropzone: function loadDropzone() {
                var _this4 = this;

                var element = document.getElementById(this.id);

                if (this.dropzone) {
                    this.dropzone.destroy();
                }

                // console.log("loading dz with max number of files", this.maxNumberOfFiles);
                if (!this.useCustomDropzoneOptions) {
                    this.dropzone = new Dropzone(element, this.__dzOptoions);
                } else {
                    this.dropzone = new Dropzone(element, this.dropzoneOptions);
                }

                // Handle the dropzone events
                var self = this;
                this.dropzone.on('addedfile', function (file) {
                    self.$emit('added', file);
                });

                this.dropzone.on('maxfilesexceeded', function (file) {
                    var _this3 = this;

                    setTimeout(function () {
                        _this3.removeFile(file);
                    }, 5000);
                });

                this.dropzone.on('removedfile', function (file) {
                    console.log('removed File');
                    self.$emit('removed', file);
                });

                this.dropzone.on('totaluploadprogress', function (progress, bytesTotal, bytesSent) {
                    _this4.$emit('progress', progress, bytesTotal, bytesSent);
                });

                this.dropzone.on('success', function (file, response) {
                    file.id = response.id;
                    self.$emit('success', response);
                });

                this.dropzone.on('error', function (file, error, xhr) {
                    var _this5 = this;

                    if (error.message) {
                        window.$(file.previewElement).find('.dz-error-message').text(error.message);
                    }

                    setTimeout(function () {
                        _this5.removeFile(file);
                    }, 5000);

                    self.$emit('error', file, error, xhr);
                });
            },
            _getPreloadImage: function _getPreloadImage(file) {
                var img = void 0;
                if (file.image) {
                    img = file.image.sm || file.image.default;
                    if (img) return img;
                }

                if (file.thumbnail) {
                    img = file.thumbnail.sm || file.thumbnail.default;
                    if (img) return img;
                }
            },
            preload: function preload() {
                var _this6 = this;

                if (!this.existing || !this.dropzone) {
                    return;
                }

                var add = function add(file) {
                    var mockFile = {
                        name: file.name || file.filename,
                        size: file.filesize,
                        id: file.id,
                        status: 'success',
                        processing: false
                    };

                    _this6.dropzone.emit('addedfile', mockFile);
                    _this6.dropzone.emit('thumbnail', mockFile, _this6._getPreloadImage(file));
                    _this6.dropzone.files.push(mockFile);

                    mockFile.previewElement.classList.add('dz-complete');
                };

                if (this.existing instanceof Array) {
                    for (var i = this.existing.length - 1; i >= 0; i--) {
                        add(this.existing[i]);
                    }
                } else {
                    add(this.existing);
                }
            }
        },

        events: {
            removeAllFiles: function removeAllFiles() {
                this.dropzone.removeAllFiles(true);
            },
            processQueue: function processQueue() {
                this.dropzone.processQueue();
            }
        }
    };
});

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3), __webpack_require__(17), __webpack_require__(41)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('lodash'), require('./vf_uid'), require('./styles'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.lodash, global.vf_uid, global.styles);
        global.props = mod.exports;
    }
})(this, function (exports, _lodash, _vf_uid, _styles) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _lodash2 = _interopRequireDefault(_lodash);

    var _vf_uid2 = _interopRequireDefault(_vf_uid);

    var _styles2 = _interopRequireDefault(_styles);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        mixins: [_vf_uid2.default, _styles2.default],
        props: {
            value: {
                required: true
            },

            property: {
                type: String,
                required: true
            },

            label: {
                type: [String, Boolean],
                default: ''
            },

            errors: {
                type: Object,
                required: false
            },

            disabled: {
                type: Boolean,
                default: false
            },

            required: {
                type: Boolean,
                default: false
            },

            rules: {
                type: [Array, Function, Boolean],
                default: function _default(value) {
                    return true;
                }
            },

            validation: {
                type: Object,
                required: false
            }
        },

        data: function data() {
            return {
                vfErrors: null
            };
        },
        mounted: function mounted() {
            if (this.$_vf_validator) {
                this.$_vf_validator.register(this.property, this.isValidIgnoringTouch);
            }
        },
        destroyed: function destroyed() {
            if (this.$_vf_validator) {
                this.$_vf_validator.unregister(this.property);
            }
        },


        watch: {
            isValidIgnoringTouch: function isValidIgnoringTouch(newVal) {
                if (this.$_vf_validator) {
                    this.$_vf_validator.update(this.property, newVal);
                }
            },
            validated: function validated(newVal) {
                this.$_checkValidated(newVal);
            },
            blurred: function blurred(newVal) {
                if (newVal === true) {
                    this.$_checkValidated(this.validated);
                }
            }
        },

        methods: {
            $_checkValidated: function $_checkValidated(validated) {
                if (_lodash2.default.isString(validated)) {
                    this.vfErrors = validated;
                } else if (validated === true) {
                    this.vfErrors = null;
                }
            }
        },

        computed: {
            $_vf_validator: function $_vf_validator() {
                return this.validation || this.$validation;
            },
            validated: function validated() {
                if (this.required === false && _lodash2.default.isEmpty(this.value)) return true;

                if (this.required === true && _lodash2.default.isEmpty(this.value) && !_lodash2.default.isNumber(this.value)) {
                    return _lodash2.default.startCase(this.property || 'This field') + ' is required';
                }

                if (_lodash2.default.isBoolean(this.rules)) {
                    return this.rules;
                } else if (_lodash2.default.isFunction(this.rules)) {
                    return this.rules(this.value);
                } else if (_lodash2.default.isArray(this.rules)) {
                    for (var i = this.rules.length - 1; i >= 0; i--) {
                        var rule = this.rules[i];
                        var isFunction = _lodash2.default.isFunction(rule);
                        if (!isFunction) {
                            console.error('[VueForms Validation] Rules array must only contain functions.');
                            return false;
                        }
                        var passes = rule(this.value);
                        if (passes !== true) {
                            return passes;
                        }
                    }
                }
                return true;
            },
            isValidIgnoringTouch: function isValidIgnoringTouch() {
                return this.validated === true;
            },
            isValid: function isValid() {
                if (!this.touched) return true;
                return this.isValidIgnoringTouch === true;
            },
            hideLabel: function hideLabel() {
                return this.label === false;
            },
            showLabel: function showLabel() {
                return !this.hideLabel;
            },
            aLabel: function aLabel() {
                if (this.hideLabel) return '';

                return (this.label || _lodash2.default.startCase(this.property || '')) + (this.required ? '*' : '');
            }
        }
    };
});

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.styles = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        props: {
            inputClass: {
                required: false
            },

            inputStyle: {
                required: false
            }
        }
    };
});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.values = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        data: function data() {
            return {
                aValue: this.value,
                vfPristine: this.value
            };
        },
        mounted: function mounted() {
            var _this = this;

            this.$nextTick(function () {
                if (_this.value !== _this.aValue) {
                    _this.aValue = _this.vfPristine = _this.value;
                }
            });
        },


        watch: {
            aValue: function aValue(change) {
                this.$emit('input', change);
                this.touched = true;
            },
            value: function value(change) {
                this.aValue = change;
            }
        },

        methods: {
            autocomplete: function autocomplete(event) {
                this.aValue = event.target.value;
            }
        }

    };
});

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('lodash'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.lodash);
        global.errors = mod.exports;
    }
})(this, function (exports, _lodash) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _lodash2 = _interopRequireDefault(_lodash);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        data: function data() {
            return {
                touched: false,
                blurred: false,
                focused: false
            };
        },


        computed: {
            formClass: function formClass() {
                return [{
                    'has-error': this.hasError,
                    'has-warning': !this.isValid
                }];
            },
            typeErrors: function typeErrors() {
                return _lodash2.default.get(this.errors, this.property, []);
            },
            hasError: function hasError() {
                return Boolean(this.errors && this.typeErrors.length);
            },
            displayErrors: function displayErrors() {
                return this.hasError || this.warning;
            },
            warning: function warning() {
                var message = _lodash2.default.get(this, 'vfErrors');
                if (_lodash2.default.isString(message)) {
                    return message;
                }
                return null;
            }
        },

        methods: {
            onFocus: function onFocus(event) {
                this.focused = true;
            },
            onBlur: function onBlur(event) {
                this.blurred = true;
            }
        },

        watch: {
            blurred: function blurred(newVal) {
                this.focused = !newVal;
            },
            focused: function focused(newVal) {
                this.blurred = !newVal;
            }
        }
    };
});

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(128), __esModule: true };

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_45__;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(139), __webpack_require__(34), __webpack_require__(45), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('babel-runtime/helpers/extends'), require('babel-runtime/core-js/promise'), require('vue'), require('lodash'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global._extends, global.promise, global.vue, global.lodash);
        global.vfalert = mod.exports;
    }
})(this, function (exports, _extends2, _promise, _vue, _lodash) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.statuses = exports.types = undefined;

    var _extends3 = _interopRequireDefault(_extends2);

    var _promise2 = _interopRequireDefault(_promise);

    var _vue2 = _interopRequireDefault(_vue);

    var _lodash2 = _interopRequireDefault(_lodash);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var types = exports.types = {
        TOAST: 'vfalert.TOAST',
        ALERT: 'vfalert.ALERT',
        CONFIRM: 'vfalert.CONFIRM'
    };

    var statuses = exports.statuses = {
        SUCCESS: 'success',
        INFO: 'info',
        WARNING: 'warning',
        DANGER: 'danger'
    };

    var methods = {
        toast: function toast(message, status, options) {
            var _ref = _lodash2.default.isObject(options) ? options : {},
                position = _ref.position,
                timeout = _ref.timeout;

            this.$emit(types.TOAST, message, { status: status, position: position, timeout: timeout });
        },
        alert: function alert(message, status, options) {
            var _ref2 = _lodash2.default.isObject(options) ? options : {},
                timeout = _ref2.timeout,
                errors = _ref2.errors;

            this.$emit(types.ALERT, message, { status: status, timeout: timeout, errors: errors });
        },
        success: function success(message, options) {
            return this.alert(message, statuses.SUCCESS, options);
        },
        info: function info(message, options) {
            return this.alert(message, statuses.INFO, options);
        },
        warning: function warning(message, options) {
            return this.alert(message, statuses.WARNING, options);
        },
        error: function error(message, options) {
            return this.alert(message, statuses.DANGER, options);
        },
        errorResponse: function errorResponse(response, fallback, xhr) {
            var data = _lodash2.default.get(response, 'data', response);

            var message = _lodash2.default.isString(response) ? response : _lodash2.default.get(data, 'message');
            if (!message && _lodash2.default.isObject(xhr)) {
                var status = xhr.status,
                    statusText = xhr.statusText;

                message = '<b class=\'text-danger\'>' + status + '</b> ' + statusText + '</br>' + fallback;
            }

            var errors = _lodash2.default.get(data, 'errors');
            return this.alert(message || fallback || 'Ooops... Something went wrong', statuses.DANGER, { errors: errors });
        },
        confirm: function confirm(message, status, options) {
            var _this = this;

            return new _promise2.default(function (resolve, reject) {
                _this.$emit(types.CONFIRM, message, (0, _extends3.default)({}, options, { status: status }), { resolve: resolve, reject: reject });
            });
        },
        hasFormAlert: function hasFormAlert() {
            return !!window.document.getElementById('vf-form-alert-panel');
        }
    };

    exports.default = new _vue2.default({ methods: methods });
});

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(144);
var enumBugKeys = __webpack_require__(51);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(22);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 50 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(151)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(53)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(54);
var $export = __webpack_require__(8);
var redefine = __webpack_require__(152);
var hide = __webpack_require__(10);
var has = __webpack_require__(21);
var Iterators = __webpack_require__(16);
var $iterCreate = __webpack_require__(153);
var setToStringTag = __webpack_require__(35);
var getPrototypeOf = __webpack_require__(156);
var ITERATOR = __webpack_require__(6)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(5).document;
module.exports = document && document.documentElement;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(22);
var TAG = __webpack_require__(6)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(9);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(16);
var ITERATOR = __webpack_require__(6)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(56);
var ITERATOR = __webpack_require__(6)('iterator');
var Iterators = __webpack_require__(16);
module.exports = __webpack_require__(7).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(9);
var aFunction = __webpack_require__(20);
var SPECIES = __webpack_require__(6)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(13);
var invoke = __webpack_require__(164);
var html = __webpack_require__(55);
var cel = __webpack_require__(25);
var global = __webpack_require__(5);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(22)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(9);
var isObject = __webpack_require__(14);
var newPromiseCapability = __webpack_require__(36);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(6)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./mixins'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.mixins);
        global.FormText = mod.exports;
    }
})(this, function (exports, _mixins) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        mixins: [_mixins.core],
        props: {
            type: {
                type: String,
                default: 'text'
            },

            lockable: {
                type: Boolean,
                default: false
            }
        },

        data: function data() {
            return {
                enabled: this.lockable === false
            };
        },


        computed: {
            showAddon: function showAddon() {
                return this.lockable || !!this.$slots.addon;
            },
            groupClass: function groupClass() {
                return {
                    'input-group': this.showAddon
                };
            },
            lockClass: function lockClass() {
                return this.enabled ? 'fa-unlock-alt' : 'fa-lock';
            }
        }

    };
});

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3), __webpack_require__(1), __webpack_require__(15)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('lodash'), require('./mixins'), require('./data_sources'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.lodash, global.mixins, global.data_sources);
        global.FormFile = mod.exports;
    }
})(this, function (exports, _lodash, _mixins, _data_sources) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _lodash2 = _interopRequireDefault(_lodash);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        name: 'FormFile',

        mixins: [_mixins.core],

        props: {
            multiple: {
                type: Boolean,
                default: false
            },

            accept: {
                type: [String, Array],
                default: function _default() {
                    return _data_sources.fileTypes.any;
                }
            },

            showAttached: {
                type: Boolean,
                default: true
            }
        },

        data: function data() {
            return {
                aValue: null
            };
        },


        computed: {
            pluralized: function pluralized() {
                if (this.multiple) {
                    return _lodash2.default.get(this.aValue, 'length') > 1 ? 'Files' : 'File';
                }
                return 'File';
            },
            _accept: function _accept() {
                if (_lodash2.default.isString(this.accept)) return this.accept;
                return this.accept.join(',');
            },
            currentFile: function currentFile() {
                var _this = this;

                if (!this.multiple) return this.fileToString(this.aValue);

                return _lodash2.default.map(this.aValue, function (file) {
                    return _this.fileToString(file);
                }).join(', ');
            },
            validated: function validated() {
                if (this.required) {
                    return !!this.aValue;
                }
                return true;
            }
        },

        mounted: function mounted() {
            var _this2 = this;

            this.$nextTick(function () {
                if (_this2.value) {
                    _this2.aValue = _this2.value;
                }
            });
        },


        methods: {
            fileToString: function fileToString(file) {
                if (_lodash2.default.isString(file)) return file;
                return _lodash2.default.get(file, 'name', _lodash2.default.get(file, 'path'));
            },
            processFile: function processFile(event) {
                console.log(event.target.files);
                if (this.multiple) {
                    this.aValue = event.target.files;
                } else {
                    this.aValue = event.target.files[0];
                }
            }
        }
    };
});

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(175), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('vue-the-mask'), require('./mixins'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.vueTheMask, global.mixins);
        global.FormTextMask = mod.exports;
    }
})(this, function (exports, _vueTheMask, _mixins) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        components: { TheMask: _vueTheMask.TheMask },
        mixins: [_mixins.core],

        props: {
            mask: {
                type: String,
                required: true
            },

            lockable: {
                type: Boolean,
                default: false
            }
        },

        data: function data() {
            return {
                enabled: this.lockable === false
            };
        },


        computed: {
            showAddon: function showAddon() {
                return this.lockable || !!this.$slots.addon;
            },
            groupClass: function groupClass() {
                return {
                    'input-group': this.showAddon
                };
            },
            lockClass: function lockClass() {
                return this.enabled ? 'fa-unlock-alt' : 'fa-lock';
            }
        }

    };
});

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./mixins'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.mixins);
        global.FormNumber = mod.exports;
    }
})(this, function (exports, _mixins) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        mixins: [_mixins.core],

        props: {
            min: {
                type: [Number, String],
                default: Number.MIN_VALUE
            },

            max: {
                type: [Number, String],
                default: Number.MAX_VALUE
            }
        }
    };
});

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./mixins'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.mixins);
        global.FormPassword = mod.exports;
    }
})(this, function (exports, _mixins) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        mixins: [_mixins.core],
        props: {
            disabled: {
                type: Boolean,
                default: false
            }
        }
    };
});

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./mixins'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.mixins);
        global.FormSlider = mod.exports;
    }
})(this, function (exports, _mixins) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        mixins: [_mixins.core],

        methods: {
            toggle: function toggle(event) {
                this.$emit('toggled', event.target.checked);
            }
        }
    };
});

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./mixins'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.mixins);
        global.FormCheckbox = mod.exports;
    }
})(this, function (exports, _mixins) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        mixins: [_mixins.core]
    };
});

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./mixins'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.mixins);
        global.FormSelect = mod.exports;
    }
})(this, function (exports, _mixins) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        mixins: [_mixins.core, _mixins.options],
        props: {}

    };
});

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(23), __webpack_require__(19), __webpack_require__(3), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('babel-runtime/helpers/defineProperty'), require('babel-runtime/core-js/json/stringify'), require('lodash'), require('./mixins'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.defineProperty, global.stringify, global.lodash, global.mixins);
        global.FormSelectMany = mod.exports;
    }
})(this, function (exports, _defineProperty2, _stringify, _lodash, _mixins) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _defineProperty3 = _interopRequireDefault(_defineProperty2);

    var _stringify2 = _interopRequireDefault(_stringify);

    var _lodash2 = _interopRequireDefault(_lodash);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        mixins: [_mixins.core, _mixins.options],
        props: {
            isSelected: {
                type: Function,
                required: false
            },

            search: {
                type: Boolean,
                default: true
            },

            textKey: {
                type: String,
                default: 'text'
            },

            required: {
                type: Boolean,
                default: false
            },

            options: {
                type: [Array, Object],
                required: false
            },

            multiple: {
                type: Boolean,
                default: false
            },

            nullable: {
                type: Boolean,
                default: true
            },

            placeholder: {
                type: String,
                default: 'Please Select...'
            },

            hilightClass: {
                type: String,
                default: 'text-success'
            },

            maxDisplayItems: {
                type: Number,
                default: 3
            }
        },

        data: function data() {
            return {
                aValue: this.value || this.$_defaultValue,
                searchString: ''
            };
        },


        computed: {
            $_inputType: function $_inputType() {
                return this.multiple ? 'checkbox' : 'radio';
            },
            $_defaultValue: function $_defaultValue() {
                return this.multiple ? [] : null;
            },
            $_filtered: function $_filtered() {
                if (_lodash2.default.isEmpty(this.searchString)) return this.options;

                var regex = new RegExp(this.searchString, 'i');
                return _lodash2.default.filter(this.options, function (opt) {
                    return (0, _stringify2.default)(opt).match(regex);
                });
            },
            selectedText: function selectedText() {
                var _this = this;

                if (!!this.$scopedSlots.selected) return;

                if (!_lodash2.default.isEmpty(this.aValue)) {
                    if (!this.multiple) {
                        if (this.optionsIsArrayOfObjects) {
                            return _lodash2.default.find(this.options, (0, _defineProperty3.default)({}, this.valueKey, this.aValue))[this.textKey];
                        }
                        if (_lodash2.default.isObject(this.aValue)) {
                            return _lodash2.default.get(this.aValue, this.textKey);
                        }
                        return '' + this.aValue;
                    } else {
                        var take = _lodash2.default.take(this.aValue, this.maxDisplayItems).map(function (item) {

                            if (_lodash2.default.isObject(item)) {
                                return item[_this.textKey];
                            }

                            if (!_lodash2.default.isObject(item)) {
                                if (_this.optionsIsArrayOfObjects) {
                                    return _lodash2.default.find(_this.options, (0, _defineProperty3.default)({}, _this.valueKey, item))[_this.textKey];
                                }
                                return item;
                            }

                            return _lodash2.default.get(_this.options, item);
                        });

                        if (this.aValue.length > take.length) {
                            take.push('(and ' + (this.aValue.length - take.length) + ' more...)');
                        }
                        return take.join(', ');
                    }
                }
                return this.placeholder;
            }
        },

        mounted: function mounted() {
            var _this2 = this;

            this.$nextTick(function () {
                if (_this2.value) {
                    _this2.aValue = _this2.value;
                }
            });
        },


        methods: {
            optLabelClass: function optLabelClass(opt, idx) {
                return (0, _defineProperty3.default)({}, this.hilightClass, this.$_isSelected(opt, idx));
            },
            optItemClass: function optItemClass(opt, idx) {
                return {
                    'selected': this.$_isSelected(opt, idx)
                };
            },
            optIndex: function optIndex(opt, idx) {
                var key = this.useKeyAsValue ? idx : opt;
                var index = _lodash2.default.indexOf(this.aValue, _lodash2.default.get(key, this.valueKey, key));

                return index;
            },
            $_isMultipleSelected: function $_isMultipleSelected(opt, idx) {
                return this.optIndex(opt, idx) !== -1;
            },
            $_isSingleSingleSelected: function $_isSingleSingleSelected(opt, idx) {
                var aValue = this.aValue,
                    valueKey = this.valueKey;

                var optVal = _lodash2.default.get(opt, this.valueKey, opt);
                return optVal === _lodash2.default.get(this.aValue, this.valueKey) || this.aValue === optVal;
            },
            $_isSelected: function $_isSelected(opt, idx) {
                if (this.isSelected) {
                    return this.isSelected(opt, this.aValue);
                }

                return this.multiple ? this.$_isMultipleSelected(opt, idx) : this.$_isSingleSingleSelected(opt, idx);
            }
        }

    };
});

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./mixins'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.mixins);
        global.FormRadioButton = mod.exports;
    }
})(this, function (exports, _mixins) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        mixins: [_mixins.core, _mixins.options],

        props: {
            inline: {
                type: Boolean,
                default: false
            }
        }
    };
});

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./mixins'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.mixins);
        global.FormCheckboxGroup = mod.exports;
    }
})(this, function (exports, _mixins) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        mixins: [_mixins.core, _mixins.options],

        props: {
            inline: {
                type: Boolean,
                default: false
            }
        }

    };
});

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./mixins'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.mixins);
        global.FormSegmentedControl = mod.exports;
    }
})(this, function (exports, _mixins) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        mixins: [_mixins.core, _mixins.options],

        props: {
            type: {
                type: String,
                default: 'primary'
            }
        },

        data: function data() {
            return {
                aValue: this.value || 0
            };
        }
    };
});

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(19), __webpack_require__(3), __webpack_require__(205)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('babel-runtime/core-js/json/stringify'), require('lodash'), require('vuedraggable'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.stringify, global.lodash, global.vuedraggable);
        global.FormOptionsLists = mod.exports;
    }
})(this, function (exports, _stringify, _lodash, _vuedraggable) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _stringify2 = _interopRequireDefault(_stringify);

    var _lodash2 = _interopRequireDefault(_lodash);

    var _vuedraggable2 = _interopRequireDefault(_vuedraggable);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        components: {
            'vue-draggable': _vuedraggable2.default
        },

        props: {
            label: {
                type: String,
                required: false
            },

            textKey: {
                type: String,
                required: false
            },

            valueKey: {
                type: String,
                required: false
            },

            searchable: {
                type: Boolean,
                default: true
            },

            value: {
                type: Array,
                required: true
            },

            options: {
                type: Array,
                required: true
            },

            badgeKey: {
                type: String,
                required: false
            },

            group: {
                type: String,
                default: 'group'
            }
        },

        data: function data() {
            return {
                aValue: null,
                aOptions: null,
                optSearch: null,
                editable: true,
                isDragging: false,
                delayedDragging: false
            };
        },


        computed: {
            showOptSearch: function showOptSearch() {
                return !_lodash2.default.isEmpty(this.optSearch) || !_lodash2.default.isEmpty(this.availableOptions) && this.availableOptions.length >= 5;
            },
            optionsListClass: function optionsListClass() {
                return {
                    'empty-drag-area': _lodash2.default.isEmpty(this.availableOptions)
                };
            },
            valueListClass: function valueListClass() {
                return {
                    'empty-drag-area': _lodash2.default.isEmpty(this.aValue)
                };
            },
            hasOptions: function hasOptions() {
                return !_lodash2.default.isEmpty(this.availableOptions);
            },
            availableOptions: function availableOptions() {
                var _this = this;

                var opts = _lodash2.default.differenceBy(this.aOptions, this.aValue, this.valueKey);
                if (!_lodash2.default.isEmpty(this.optSearch)) {
                    return _lodash2.default.filter(opts, function (opt) {
                        return (0, _stringify2.default)(opt).indexOf(_this.optSearch) !== -1;
                    });
                }
                return opts;
            },
            dragOptions: function dragOptions() {
                return {
                    animation: 0,
                    group: this.group,
                    disabled: !this.editable,
                    ghostClass: 'ghost'
                };
            }
        },

        watch: {
            aValue: function aValue(newValue) {
                this.$emit('input', newValue);
            },
            isDragging: function isDragging(newValue) {
                var _this2 = this;

                if (newValue) {
                    this.delayedDragging = true;
                    return;
                }
                this.$nextTick(function () {
                    _this2.delayedDragging = false;
                });
            }
        },

        mounted: function mounted() {
            this.aValue = this.value.map(function (entry, index) {
                return _lodash2.default.assign({}, entry, { order: index + 1, fixed: false });
            });

            this.aOptions = this.options.map(function (entry, index) {
                return _lodash2.default.assign({}, entry, { order: index + 1, fixed: false });
            });
        },


        methods: {
            fixElement: function fixElement(element) {
                this.$set(element, 'fixed', !element.fixed);
            },
            elementIcon: function elementIcon(element) {
                return element.fixed ? 'fa fa-lock' : 'fa fa-unlock-alt';
            },
            orderList: function orderList() {
                this.aValue = this.aValue.sort(function (one, two) {
                    return one.order - two.order;
                });
            },
            onMove: function onMove(_ref) {
                var relatedContext = _ref.relatedContext,
                    draggedContext = _ref.draggedContext;

                var relatedElement = relatedContext.element;
                var draggedElement = draggedContext.element;
                return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed;
            },
            elementDescription: function elementDescription(element) {
                if (this.textKey) {
                    return _lodash2.default.get(element, this.textKey, element.id);
                }
                return element.name || element.title || element.slug || element.id;
            }
        }
    };
});

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(19), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('babel-runtime/core-js/json/stringify'), require('lodash'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.stringify, global.lodash);
        global.FormOptionsListsScoped = mod.exports;
    }
})(this, function (exports, _stringify, _) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _stringify2 = _interopRequireDefault(_stringify);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {

        props: {
            label: {
                type: String,
                required: true
            },

            valueKey: {
                type: String,
                required: false
            },

            textKey: {
                type: String,
                required: false
            },

            searchable: {
                type: Boolean,
                default: true
            },

            value: {
                type: Array,
                required: true
            },

            options: {
                type: Array,
                required: true
            },

            badgeKey: {
                type: String,
                required: false
            },

            group: {
                type: String,
                default: 'group'
            }
        },

        data: function data() {
            return {
                aValue: null,
                aOptions: null,
                optSearch: null,
                editable: true,
                isDragging: false,
                delayedDragging: false
            };
        },


        computed: {
            showOptSearch: function showOptSearch() {
                return !_.isEmpty(this.optSearch) || !_.isEmpty(this.availableOptions) && this.availableOptions.length >= 5;
            },
            optionsListClass: function optionsListClass() {
                return {
                    'empty-drag-area': _.isEmpty(this.availableOptions)
                };
            },
            valueListClass: function valueListClass() {
                return {
                    'empty-drag-area': _.isEmpty(this.aValue)
                };
            },
            hasOptions: function hasOptions() {
                return !_.isEmpty(this.availableOptions);
            },
            availableOptions: function availableOptions() {
                var _this = this;

                var opts = _.differenceBy(this.aOptions, this.aValue, this.valueKey);
                if (!_.isEmpty(this.optSearch)) {
                    return _.filter(opts, function (opt) {
                        return (0, _stringify2.default)(opt).indexOf(_this.optSearch) !== -1;
                    });
                }
                return opts;
            },
            dragOptions: function dragOptions() {
                return {
                    animation: 0,
                    group: this.group,
                    disabled: !this.editable,
                    ghostClass: 'ghost'
                };
            }
        },

        watch: {
            aValue: {
                deep: true,
                handler: function handler(newValue) {
                    this.$emit('input', newValue);
                }
            },

            isDragging: function isDragging(newValue) {
                var _this2 = this;

                if (newValue) {
                    this.delayedDragging = true;
                    return;
                }
                this.$nextTick(function () {
                    _this2.delayedDragging = false;
                });
            }
        },

        mounted: function mounted() {
            this.aValue = this.value.map(function (entry, index) {
                return _.assign({}, entry, { order: index + 1, fixed: false });
            });
            this.aOptions = this.options;
        },


        methods: {
            orderList: function orderList() {
                this.aValue = this.aValue.sort(function (one, two) {
                    return one.order - two.order;
                });
            },
            onMove: function onMove(_ref) {
                var relatedContext = _ref.relatedContext,
                    draggedContext = _ref.draggedContext;

                var relatedElement = relatedContext.element;
                var draggedElement = draggedContext.element;
                return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed;
            },
            elementDescription: function elementDescription(element) {
                if (this.textKey) {
                    return _.get(element, this.textKey, element.id);
                }
                return element.name || element.title || element.slug || element.id;
            }
        }
    };
});

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./mixins'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.mixins);
        global.FormTextarea = mod.exports;
    }
})(this, function (exports, _mixins) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        mixins: [_mixins.core],

        props: {
            rows: {
                required: false,
                default: 3
            }
        }
    };
});

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3), __webpack_require__(215), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('lodash'), require('@tinymce/tinymce-vue'), require('./mixins'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.lodash, global.tinymceVue, global.mixins);
        global.FormTinymce = mod.exports;
    }
})(this, function (exports, _lodash, _tinymceVue, _mixins) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _lodash2 = _interopRequireDefault(_lodash);

    var _tinymceVue2 = _interopRequireDefault(_tinymceVue);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var imageTemplate = function imageTemplate(_ref) {
        var path = _ref.path,
            caption = _ref.caption,
            alt = _ref.alt,
            width = _ref.width,
            height = _ref.height,
            align = _ref.align;

        // const style = ''
        var attrs = _lodash2.default.reduce({ src: path, alt: alt, width: width, height: height, align: align }, function (result, value, key) {
            if (value) {
                result += [key] + '="' + value + '" ';
            }
            return result;
        }, '');
        var imgTemplate = '<img ' + attrs + ' />';

        if (_lodash2.default.isString(caption)) {
            return '<figure class="image">' + imgTemplate + '<figcaption><p>' + caption.replace(/(?:\r\n|\r|\n)/g, '<br />') + '</p></figcaption></figure>';
        }
        return imgTemplate;
    }; //
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
    //
    //
    //
    //


    var defaults = {
        height: 300,
        image_caption: true,
        image_advtab: true,

        remove_script_host: false,
        relative_urls: false,
        convert_urls: true
    };

    exports.default = {
        components: {
            'vue-tinymce': _tinymceVue2.default
        },

        mixins: [_mixins.core],

        props: {
            tinymceConfig: {
                type: Object,
                required: false
            },

            apiKey: {
                type: String,
                required: false
            }
        },
        data: function data() {
            return {
                showModal: false,
                editor: null
            };
        },


        computed: {
            _apiKey: function _apiKey() {
                return this.apiKey || _lodash2.default.get(this.$vfconfig, 'tinymce.apiKey');
            },
            init: function init() {
                var _this = this;

                if (this.tinymceConfig) return this.tinymceConfig;

                var init = {
                    setup: function setup(editor) {
                        /* eslint-disable vue/no-side-effects-in-computed-properties */
                        _this.editor = editor;
                        editor.addButton('vf_image_picker', {
                            text: 'Image Gallery',
                            icon: 'image',
                            tooltip: 'Insert Image',
                            onclick: _this.openFilePicker
                        });
                        /* eslint-enable vue/no-side-effects-in-computed-properties */
                    }
                };
                return _lodash2.default.assign(init, defaults, _lodash2.default.get(this.$vfconfig, 'tinymce.config', {}));
            }
        },

        methods: {
            closeFilePicker: function closeFilePicker() {
                this.showModal = false;
            },
            openFilePicker: function openFilePicker() {
                this.showModal = true;
            },
            chooseFile: function chooseFile(file) {
                var content = void 0;
                if (_lodash2.default.isObject(file)) {
                    content = file;
                } else if (_lodash2.default.isString(file)) {
                    content = { path: file };
                }
                this.editor.insertContent(imageTemplate(content));
                this.closeFilePicker();
            }
        }

    };
});

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(3), __webpack_require__(221)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./mixins'), require('lodash'), require('simplemde'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.mixins, global.lodash, global.simplemde);
        global.FormMarkdown = mod.exports;
    }
})(this, function (exports, _mixins, _lodash, SimpleMDE) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _lodash2 = _interopRequireDefault(_lodash);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        mixins: [_mixins.core],

        props: {
            showInfo: {
                type: Boolean,
                default: true
            }
        },

        data: function data() {
            return {
                aValue: this.value,
                simplemde: null
            };
        },


        watch: {
            value: function value(newValue, oldVal) {
                if (typeof newValue !== 'string') return;

                if (newValue !== this.simplemde.value()) {
                    this.simplemde.value(newValue);
                }
            }
        },

        mounted: function mounted() {
            var _this = this;

            var props = _lodash2.default.assign({}, this.options, {
                element: document.getElementById(this.vf_uid),
                forceSync: false,
                initialValue: this.value
            });

            var simplemde = this.simplemde = new SimpleMDE(props);
            simplemde.codemirror.on('change', function () {
                _this.$emit('input', simplemde.value());
            });
        }
    };
});

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".daterangepicker{position:absolute;color:inherit;background-color:#fff;border-radius:4px;width:278px;padding:4px;margin-top:1px;top:100px;left:20px}.daterangepicker:after,.daterangepicker:before{position:absolute;display:inline-block;border-bottom-color:rgba(0,0,0,.2);content:\"\"}.daterangepicker:before{top:-7px;border-right:7px solid transparent;border-left:7px solid transparent;border-bottom:7px solid #ccc}.daterangepicker:after{top:-6px;border-right:6px solid transparent;border-bottom:6px solid #fff;border-left:6px solid transparent}.daterangepicker.opensleft:before{right:9px}.daterangepicker.opensleft:after{right:10px}.daterangepicker.openscenter:after,.daterangepicker.openscenter:before{left:0;right:0;width:0;margin-left:auto;margin-right:auto}.daterangepicker.opensright:before{left:9px}.daterangepicker.opensright:after{left:10px}.daterangepicker.dropup{margin-top:-5px}.daterangepicker.dropup:before{top:auto;bottom:-7px;border-bottom:initial;border-top:7px solid #ccc}.daterangepicker.dropup:after{top:auto;bottom:-6px;border-bottom:initial;border-top:6px solid #fff}.daterangepicker.dropdown-menu{max-width:none;z-index:3001}.daterangepicker.single .calendar,.daterangepicker.single .ranges{float:none}.daterangepicker.show-calendar .calendar{display:block}.daterangepicker .calendar{display:none;max-width:270px;margin:4px}.daterangepicker .calendar.single .calendar-table{border:none}.daterangepicker .calendar td,.daterangepicker .calendar th{white-space:nowrap;text-align:center;min-width:32px}.daterangepicker .calendar-table{border:1px solid #fff;padding:4px;border-radius:4px;background-color:#fff}.daterangepicker table{width:100%;margin:0}.daterangepicker td,.daterangepicker th{text-align:center;width:20px;height:20px;border-radius:4px;border:1px solid transparent;white-space:nowrap;cursor:pointer}.daterangepicker td.available:hover,.daterangepicker th.available:hover{background-color:#eee;border-color:transparent;color:inherit}.daterangepicker td.week,.daterangepicker th.week{font-size:80%;color:#ccc}.daterangepicker td.off,.daterangepicker td.off.end-date,.daterangepicker td.off.in-range,.daterangepicker td.off.start-date{background-color:#fff;border-color:transparent;color:#999}.daterangepicker td.in-range{background-color:#ebf4f8;border-color:transparent;color:#000;border-radius:0}.daterangepicker td.start-date{border-radius:4px 0 0 4px}.daterangepicker td.end-date{border-radius:0 4px 4px 0}.daterangepicker td.start-date.end-date{border-radius:4px}.daterangepicker td.active,.daterangepicker td.active:hover{background-color:#357ebd;border-color:transparent;color:#fff}.daterangepicker th.month{width:auto}.daterangepicker option.disabled,.daterangepicker td.disabled{color:#999;cursor:not-allowed;text-decoration:line-through}.daterangepicker select.monthselect,.daterangepicker select.yearselect{font-size:12px;padding:1px;height:auto;margin:0;cursor:default}.daterangepicker select.monthselect{margin-right:2%;width:56%}.daterangepicker select.yearselect{width:40%}.daterangepicker select.ampmselect,.daterangepicker select.hourselect,.daterangepicker select.minuteselect,.daterangepicker select.secondselect{width:50px;margin-bottom:0}.daterangepicker .input-mini{border:1px solid #ccc;border-radius:4px;color:#555;height:30px;line-height:30px;display:block;vertical-align:middle;margin:0 0 5px;padding:0 6px 0 28px;width:100%}.daterangepicker .input-mini.active{border:1px solid #08c;border-radius:4px}.daterangepicker .daterangepicker_input{position:relative}.daterangepicker .daterangepicker_input i{position:absolute;left:8px;top:8px}.daterangepicker.rtl .input-mini{padding-right:28px;padding-left:6px}.daterangepicker.rtl .daterangepicker_input i{left:auto;right:8px}.daterangepicker .calendar-time{text-align:center;margin:5px auto;line-height:30px;position:relative;padding-left:28px}.daterangepicker .calendar-time select.disabled{color:#ccc;cursor:not-allowed}.ranges{font-size:11px;float:none;margin:4px;text-align:left}.ranges ul{list-style:none;margin:0 auto;padding:0;width:100%}.ranges li{font-size:13px;background-color:#f5f5f5;border:1px solid #f5f5f5;border-radius:4px;color:#08c;padding:3px 12px;margin-bottom:8px;cursor:pointer}.ranges li.active,.ranges li:hover{background-color:#08c;border:1px solid #08c;color:#fff}@media (min-width:564px){.daterangepicker{width:auto}.daterangepicker .ranges ul{width:160px}.daterangepicker.single .ranges ul{width:100%}.daterangepicker.single .calendar.left{clear:none}.daterangepicker.single.ltr .calendar,.daterangepicker.single.ltr .ranges{float:left}.daterangepicker.single.rtl .calendar,.daterangepicker.single.rtl .ranges{float:right}.daterangepicker.ltr{direction:ltr;text-align:left}.daterangepicker.ltr .calendar.left{clear:left;margin-right:0}.daterangepicker.ltr .calendar.left .calendar-table{border-right:none;border-top-right-radius:0;border-bottom-right-radius:0}.daterangepicker.ltr .calendar.right{margin-left:0}.daterangepicker.ltr .calendar.right .calendar-table{border-left:none;border-top-left-radius:0;border-bottom-left-radius:0}.daterangepicker.ltr .calendar.left .calendar-table,.daterangepicker.ltr .left .daterangepicker_input{padding-right:12px}.daterangepicker.ltr .calendar,.daterangepicker.ltr .ranges{float:left}.daterangepicker.rtl{direction:rtl;text-align:right}.daterangepicker.rtl .calendar.left{clear:right;margin-left:0}.daterangepicker.rtl .calendar.left .calendar-table{border-left:none;border-top-left-radius:0;border-bottom-left-radius:0}.daterangepicker.rtl .calendar.right{margin-right:0}.daterangepicker.rtl .calendar.right .calendar-table{border-right:none;border-top-right-radius:0;border-bottom-right-radius:0}.daterangepicker.rtl .calendar.left .calendar-table,.daterangepicker.rtl .left .daterangepicker_input{padding-left:12px}.daterangepicker.rtl .calendar,.daterangepicker.rtl .ranges{text-align:right;float:right}}@media (min-width:730px){.daterangepicker .ranges{width:auto}.daterangepicker.ltr .ranges{float:left}.daterangepicker.rtl .ranges{float:right}.daterangepicker .calendar.left{clear:none!important}}", ""]);

// exports


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(3), __webpack_require__(18), __webpack_require__(84), __webpack_require__(85)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./mixins'), require('lodash'), require('moment'), require('jquery'), require('bootstrap-daterangepicker'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.mixins, global.lodash, global.moment, global.jquery, global.bootstrapDaterangepicker);
        global.FormDateRange = mod.exports;
    }
})(this, function (exports, _mixins, _lodash, _moment, $) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _lodash2 = _interopRequireDefault(_lodash);

    var _moment2 = _interopRequireDefault(_moment);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        mixins: [_mixins.errors, _mixins.dates, _mixins.styles, _mixins.vf_uid],

        props: {
            properties: {
                type: Array,
                default: function _default() {
                    return [];
                }
            },

            label: {
                type: String
            },

            start: {
                type: String
            },

            end: {
                type: String
            },

            errors: {
                type: Object,
                required: false
            },

            rules: {
                type: [Array, Function, Boolean],
                default: true
            }
        },

        data: function data() {
            return {
                picker: null,
                rootPicker: null,
                range: null
            };
        },


        computed: {
            ranges: function ranges() {
                return {
                    'Today': [(0, _moment2.default)().toDate(), (0, _moment2.default)().toDate()],
                    'Yesterday': [(0, _moment2.default)().subtract(1, 'days').toDate(), (0, _moment2.default)().subtract(1, 'days').toDate()],
                    'Past week': [(0, _moment2.default)().subtract(1, 'week').toDate(), (0, _moment2.default)().toDate()],
                    'Past Month': [(0, _moment2.default)().subtract(1, 'months').toDate(), (0, _moment2.default)().toDate()],
                    'Past Year': [(0, _moment2.default)().subtract(1, 'years').toDate(), (0, _moment2.default)().toDate()]
                };
            },
            isValid: function isValid() {
                if (!this.required) return true;
                return !!this.start && (0, _moment2.default)(this.start).isValid() && !!this.end && (0, _moment2.default)(this.end).isValid();
            }
        },

        watch: {
            timePicker: function timePicker(change) {
                this.load();
                this.$_emitDates((0, _moment2.default)(this.start), (0, _moment2.default)(this.end));
            },
            start: function start(change) {
                this.updateStart((0, _moment2.default)(change));
                if (change === null) {
                    this.rootPicker.val('');
                }
            },
            end: function end(change) {
                this.updateEnd((0, _moment2.default)(change));
                if (change === null) {
                    this.rootPicker.val('');
                }
            }
        },

        mounted: function mounted() {
            var _this = this;

            this.$nextTick(function () {
                _this.load();
            });
        },


        methods: {
            $_emitDates: function $_emitDates(start, end) {
                this.$emit('update:start', this.$_makeFormattedDate(start));
                this.$emit('update:end', this.$_makeFormattedDate(end));
            },
            load: function load() {
                var _this2 = this;

                var options = {
                    locale: {
                        cancelLabel: 'Clear',
                        format: this.pickerLocaleFormat
                    },
                    autoUpdateInput: this.autoApply,
                    timePicker: this.timePicker,
                    timePickerIncrement: this.timePickerIncrement
                };

                if (this.showRanges) {
                    options.ranges = this.ranges;
                }

                var invalid = false;
                if (this.start) {
                    var startDate = (0, _moment2.default)(this.start);
                    if (startDate.isValid()) options.startDate = startDate;
                } else invalid = true;

                if (this.end) {
                    var endDate = (0, _moment2.default)(this.end);
                    if (endDate.isValid()) options.endDate = endDate;
                } else invalid = true;

                var config = _lodash2.default.assign({}, options, this.dateConfig);

                this.rootPicker = $('#' + this.vf_uid).daterangepicker(config, function (start, end, label) {
                    _this2.$_emitDates(start, end);
                }).on('cancel.daterangepicker', function (ev, picker) {
                    _this2.clear();
                }).on('apply.daterangepicker', function (ev, picker) {
                    _this2.$_emitDates(picker.startDate, picker.endDate);
                }).on('hide.daterangepicker', function (ev, picker) {
                    _this2.$_emitDates(picker.startDate, picker.endDate);
                });

                if (invalid) {
                    this.rootPicker.val('');
                }

                this.picker = this.rootPicker.data('daterangepicker');
            },
            clear: function clear() {
                this.$_emitDates(null, null);
                this.rootPicker.val('');
            }
        }
    };
});

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_84__;

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_85__;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(3), __webpack_require__(18), __webpack_require__(84), __webpack_require__(85)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./mixins'), require('lodash'), require('moment'), require('jquery'), require('bootstrap-daterangepicker'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.mixins, global.lodash, global.moment, global.jquery, global.bootstrapDaterangepicker);
        global.FormDate = mod.exports;
    }
})(this, function (exports, _mixins, _lodash, _moment, $) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _lodash2 = _interopRequireDefault(_lodash);

    var _moment2 = _interopRequireDefault(_moment);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        mixins: [_mixins.props, _mixins.errors, _mixins.dates, _mixins.vf_uid],

        data: function data() {
            return {
                picker: null
            };
        },


        watch: {
            timePicker: function timePicker() {
                this.load();
                this.$_emitDates((0, _moment2.default)(this.start));
            },
            value: function value(change) {
                this.updateStart((0, _moment2.default)(change));
            }
        },

        mounted: function mounted() {
            var _this = this;

            this.$nextTick(function () {
                _this.load();
            });
        },


        methods: {
            $_emitDates: function $_emitDates(moment) {
                this.$emit('input', this.$_makeFormattedDate(moment));
            },
            load: function load() {
                var _this2 = this;

                var options = {
                    locale: {
                        cancelLabel: 'Clear',
                        format: this.pickerLocaleFormat
                    },
                    autoUpdateInput: this.autoApply,
                    timePicker: this.timePicker,
                    timePickerIncrement: this.timePickerIncrement
                };

                var invalid = false;
                if (this.value) {
                    var startDate = (0, _moment2.default)(this.value);
                    if (startDate.isValid()) options.startDate = startDate;
                } else invalid = true;

                var config = _lodash2.default.assign({}, options, this.dateConfig);
                config.singleDatePicker = true;

                this.rootPicker = $('#' + this.vf_uid).daterangepicker(config, function (start, end, label) {
                    _this2.$_emitDates(start);
                }).on('cancel.daterangepicker', function (ev, picker) {
                    _this2.clear();
                }).on('apply.daterangepicker', function (ev, picker) {
                    _this2.$_emitDates(picker.startDate);
                }).on('hide.daterangepicker', function (ev, picker) {
                    _this2.$_emitDates(picker.startDate);
                });

                if (invalid) {
                    this.rootPicker.val('');
                }

                this.picker = this.rootPicker.data('daterangepicker');
            },
            clear: function clear() {
                this.$emit('input', null);
                this.rootPicker.val('');
            }
        }
    };
});

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./mixins'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.mixins);
        global.FormDropzone = mod.exports;
    }
})(this, function (exports, _mixins) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        mixins: [_mixins.dropzone]
    };
});

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./mixins'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.mixins);
        global.FormDropzoneButton = mod.exports;
    }
})(this, function (exports, _mixins) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        mixins: [_mixins.dropzone],

        props: {
            btnText: {
                type: String,
                default: 'Upload File'
            }
        }
    };
});

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3), __webpack_require__(1), __webpack_require__(37)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('lodash'), require('./mixins'), require('./FormFileGallery'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.lodash, global.mixins, global.FormFileGallery);
        global.FormFilePicker = mod.exports;
    }
})(this, function (exports, _lodash, _mixins, _FormFileGallery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _lodash2 = _interopRequireDefault(_lodash);

    var _FormFileGallery2 = _interopRequireDefault(_FormFileGallery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        components: {
            'form-file-gallery': _FormFileGallery2.default
        },
        mixins: [_mixins.core],

        props: {
            headers: {
                type: String,
                required: false
            },
            endpoint: {
                type: String,
                required: false
            },
            srcKey: {
                type: String,
                default: 'path'
            },
            btnText: {
                type: String,
                default: 'Choose a File'
            }
        },

        data: function data() {
            return {
                errorMsg: null,
                showModal: false,
                files: [],
                pagination: {}
            };
        },


        methods: {
            open: function open() {
                this.showModal = true;
            },
            isImage: function isImage(filename) {
                return _lodash2.default.isString(filename) && /\.(gif|jpe?g|tiff|png)$/i.test(filename);
            },
            choose: function choose(file) {
                if (_lodash2.default.isObject(file)) {
                    this.aValue = _lodash2.default.get(file, this.srcKey);
                } else if (_lodash2.default.isString(file)) {
                    this.aValue = file;
                }

                this.close();
            },
            close: function close() {
                this.showModal = false;
            }
        }
    };
});

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".fade-enter-active,.fade-leave-active{transition:opacity .5s}.fade-enter,.fade-leave-active{opacity:0}.alert-bounce-enter-active{animation:alert-bounce-in .5s}.alert-bounce-leave-active{animation:alert-bounce-in .5s reverse}@keyframes alert-bounce-in{0%{transform:scale(0)}50%{transform:scale(1.2)}to{transform:scale(1)}}", ""]);

// exports


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('lodash'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.lodash);
        global.FormFileGallery = mod.exports;
    }
})(this, function (exports, _lodash) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _lodash2 = _interopRequireDefault(_lodash);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {

        props: {
            headers: {
                type: Object,
                required: false
            },
            endpoint: {
                type: String,
                required: false
            },
            srcKey: {
                type: String,
                default: 'path'
            },
            addMeta: {
                type: Boolean,
                default: false
            }
        },

        data: function data() {
            return {
                errorMsg: null,
                files: [],
                pagination: {},
                selected: null,
                page: 1,
                limit: 20
            };
        },


        computed: {
            requestEndpoint: function requestEndpoint() {
                return this.endpoint || (this.$vfconfig ? this.$vfconfig.filesEndpoint() : null);
            },
            requestHeaders: function requestHeaders() {
                return this.headers || _lodash2.default.get(this.$vfconfig, 'headers', {});
            },
            pagedFiles: function pagedFiles() {
                return this.files.slice(this.offset, this.offset + this.limit);
            },
            offset: function offset() {
                return (this.page - 1) * this.limit;
            },
            hasNext: function hasNext() {
                var page = this.page,
                    limit = this.limit,
                    files = this.files;

                return (page + 1) * limit <= _lodash2.default.get(files, 'length', 0);
            },
            hasPrev: function hasPrev() {
                return this.page > 1;
            }
        },

        mounted: function mounted() {
            this.load();
        },


        methods: {
            isImage: function isImage(filename) {
                return _lodash2.default.isString(filename) && /\.(gif|jpe?g|tiff|png)$/i.test(filename);
            },
            fileSrc: function fileSrc(file) {
                if (_lodash2.default.isObject(file)) {
                    return _lodash2.default.get(file, this.srcKey);
                } else if (_lodash2.default.isString(file)) {
                    return file;
                }
            },
            choose: function choose(file, event) {
                if (this.addMeta) {
                    var size = {
                        width: event.target.naturalWidth,
                        height: event.target.naturalHeight,
                        constrain: true
                    };
                    var selected = this.selected = _lodash2.default.assign(size, file);
                    return selected;
                }
                this.complete(file);
            },
            complete: function complete(file) {
                this.$emit('choose', file);
                this.$emit('close');
            },
            pageNext: function pageNext() {
                var page = this.page;

                if (this.hasNext) {
                    this.page = page + 1;
                }
            },
            pagePrev: function pagePrev() {
                if (this.hasPrev) {
                    this.page = this.page - 1;
                }
            },
            load: function load() {
                var _this = this;

                if (!_lodash2.default.isEmpty(this.files)) return;

                var request = new XMLHttpRequest();
                request.onload = function (_ref) {
                    var target = _ref.target;

                    _this.files = JSON.parse(target.responseText);
                };
                request.onerror = function (_ref2) {
                    var target = _ref2.target;

                    _this.errorMsg = 'Error error loading files';
                };

                request.open('GET', this.requestEndpoint, true);
                _lodash2.default.each(this.requestHeaders, function (value, key) {
                    request.setRequestHeader(key, value);
                });
                request.send();
            }
        }
    };
});

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./mixins'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.mixins);
        global.FormFileEdit = mod.exports;
    }
})(this, function (exports, _mixins) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        mixins: [_mixins.core],

        props: {
            src: {
                type: String,
                required: true
            }
        },

        computed: {
            thumbStyle: function thumbStyle() {
                return {
                    width: '200px',
                    height: 200 * (this.aValue.height / this.aValue.width) + 'px' };
            },
            alignment: function alignment() {
                return [{ value: 'left', text: 'Left Aligned' }, { value: 'center', text: 'Center Aligned' }, { value: 'right', text: 'Right Aligned' }];
            }
        },

        methods: {
            selectAlignment: function selectAlignment(align) {
                if (this.aValue.align === align) align = 'default';
                this.$set(this.aValue, 'align', align);
            },
            updateWidth: function updateWidth(newVal) {
                if (this.aValue.constrain && newVal > 0) {
                    this.aValue.height = Math.round(this.aValue.height * (newVal / this.aValue.width));
                }
                this.aValue.width = Math.round(newVal);
            },
            updateHeight: function updateHeight(newVal) {
                if (this.aValue.constrain && newVal > 0) {
                    this.aValue.width = Math.round(this.aValue.width * (newVal / this.aValue.height));
                }
                this.aValue.height = Math.round(newVal);
            }
        }
    };
});

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./mixins'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.mixins);
        global.FormSeoData = mod.exports;
    }
})(this, function (exports, _mixins) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {

        mixins: [_mixins.props, _mixins.errors],

        data: function data() {
            return {
                aValue: {
                    meta_title: null,
                    meta_description: null,
                    meta_keywords: null,
                    og_title: null,
                    og_description: null
                }
            };
        },


        watch: {
            aValue: {
                handler: function handler(change) {
                    this.$emit('input', change);
                },
                deep: true
            }
        },

        mounted: function mounted() {
            var _this = this;

            this.$nextTick(function () {
                if (_this.value) {
                    _this.aValue = _this.value;
                }
            });
        }
    };
});

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1), __webpack_require__(95), __webpack_require__(251), __webpack_require__(98), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./mixins'), require('./FormStateSelect'), require('./FormCountrySelect'), require('./FormGooglePlaceLookup'), require('lodash'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.mixins, global.FormStateSelect, global.FormCountrySelect, global.FormGooglePlaceLookup, global.lodash);
        global.FormAddress = mod.exports;
    }
})(this, function (exports, _mixins, _FormStateSelect, _FormCountrySelect, _FormGooglePlaceLookup, _lodash) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _FormStateSelect2 = _interopRequireDefault(_FormStateSelect);

    var _FormCountrySelect2 = _interopRequireDefault(_FormCountrySelect);

    var _lodash2 = _interopRequireDefault(_lodash);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        components: {
            'form-state-select': _FormStateSelect2.default,
            'form-country-select': _FormCountrySelect2.default
        },
        mixins: [_mixins.core],

        props: {
            includeLookup: {
                type: Boolean,
                default: false
            },

            includeCoordinates: {
                type: Boolean,
                default: false
            },

            stateSelect: {
                type: Boolean,
                default: true
            }
        },

        data: function data() {
            return {
                aValue: { line_1: '', line_2: '', city: '', state: null, postal_code: '', country: null, lat: null, lng: null }
            };
        },


        computed: {
            showLookup: function showLookup() {
                if (this.includeLookup) {
                    var canShow = _lodash2.default.isFunction(_lodash2.default.get(window, 'google.maps.places.Autocomplete'));
                    if (!canShow) {
                        console.error(_FormGooglePlaceLookup.GOOGLE_PLACE_INSTALL_ERROR_MESSAGE);
                        return false;
                    }
                    return true;
                }
                return false;
            }
        },

        methods: {
            placeSelected: function placeSelected(address) {
                var line_1 = address.line_1,
                    city = address.city,
                    state = address.state,
                    postal_code = address.postal_code,
                    country = address.country,
                    lat = address.lat,
                    lng = address.lng;

                this.aValue = { line_1: line_1, city: city, state: state, postal_code: postal_code, country: country, lat: lat, lng: lng };
            }
        }
    };
});

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormStateSelect_vue__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormStateSelect_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormStateSelect_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormStateSelect_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormStateSelect_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3354580c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormStateSelect_vue__ = __webpack_require__(250);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormStateSelect_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3354580c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormStateSelect_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(15), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./data_sources'), require('./mixins'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.data_sources, global.mixins);
        global.FormStateSelect = mod.exports;
    }
})(this, function (exports, _data_sources, _mixins) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        mixins: [_mixins.core],

        data: function data() {
            return {
                options: _data_sources.states
            };
        }
    };
});

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(15), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./data_sources'), require('./mixins'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.data_sources, global.mixins);
        global.FormCountrySelect = mod.exports;
    }
})(this, function (exports, _data_sources, _mixins) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        mixins: [_mixins.core],

        data: function data() {
            return {
                options: _data_sources.countryCodes
            };
        }
    };
});

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormGooglePlaceLookup_vue__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormGooglePlaceLookup_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormGooglePlaceLookup_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormGooglePlaceLookup_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormGooglePlaceLookup_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0365c97f_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormGooglePlaceLookup_vue__ = __webpack_require__(255);
function injectStyle (ssrContext) {
  __webpack_require__(253)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0365c97f"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormGooglePlaceLookup_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0365c97f_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormGooglePlaceLookup_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('lodash'), require('./mixins'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.lodash, global.mixins);
        global.FormGooglePlaceLookup = mod.exports;
    }
})(this, function (exports, _lodash, _mixins) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.GOOGLE_PLACE_INSTALL_ERROR_MESSAGE = undefined;

    var _lodash2 = _interopRequireDefault(_lodash);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    /* eslint-disable no-useless-escape */
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


    var GOOGLE_PLACE_INSTALL_ERROR_MESSAGE = exports.GOOGLE_PLACE_INSTALL_ERROR_MESSAGE = '[VueForms] Google Places is not correctly installed. Make sure to include this script tag.\n\n<script src="//maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&libraries=places"></script>\n';
    /* eslint-enable no-useless-escape */

    var mapMapValues = function mapMapValues(place) {
        var address_components = place.address_components,
            formatted_address = place.formatted_address;


        var address = {};
        _lodash2.default.forEach(address_components, function (value) {
            var type = _lodash2.default.get(value, 'types.0');
            if (type) {
                address[type] = value.short_name;
            }
        });

        var line_1 = '';
        if (address.street_number) {
            line_1 = '' + address.street_number;
        }
        if (address.route) {
            line_1 += ' ' + address.route;
        }

        address.line_1 = line_1;

        address.city = address.locality;
        address.state = address.administrative_area_level_1;
        address.formatted_address = formatted_address;

        address.lat = place.geometry.location.lat();
        address.lng = place.geometry.location.lng();

        return _lodash2.default.pickBy(address, _lodash2.default.identity);
    };

    exports.default = {
        mixins: [_mixins.values],

        props: {
            types: {
                type: Array,
                default: function _default() {
                    return ['geocode', 'establishment'];
                }
            }
        },

        mounted: function mounted() {
            var _this = this;

            var MapsAutocomplete = _lodash2.default.get(window, 'google.maps.places.Autocomplete');
            if (!MapsAutocomplete) {
                console.error(GOOGLE_PLACE_INSTALL_ERROR_MESSAGE);
                return;
            }

            var autocomplete = new MapsAutocomplete(this.$el, { types: this.types });

            autocomplete.addListener('place_changed', function () {
                var place = autocomplete.getPlace();
                var address = mapMapValues(place);

                _this.$emit('input', address.formatted_address);
                _this.$emit('selected', address);
            });
        }
    };
});

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(27), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./data_sources/Honorifics'), require('./mixins'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Honorifics, global.mixins);
        global.FormNamePrefixSelect = mod.exports;
    }
})(this, function (exports, _Honorifics, _mixins) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        mixins: [_mixins.core],

        props: {
            width: {
                type: String,
                default: '100%'
            },

            label: {
                type: String,
                default: 'Prefix'
            },

            placeholder: {
                type: String,
                default: 'Choose...'
            }
        },

        data: function data() {
            return {
                options: _Honorifics.prefixes,
                aValue: null
            };
        }
    };
});

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(27), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./data_sources/Honorifics'), require('./mixins'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Honorifics, global.mixins);
        global.FormNameSuffixSelect = mod.exports;
    }
})(this, function (exports, _Honorifics, _mixins) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {

        mixins: [_mixins.core],

        props: {
            width: {
                type: String,
                default: '100%'
            },

            label: {
                type: String,
                default: 'Suffix'
            },

            placeholder: {
                type: String,
                default: 'Choose...'
            }
        },

        data: function data() {
            return {
                options: _Honorifics.suffixes,
                aValue: null
            };
        }
    };
});

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.FormPanel = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        props: {
            type: {
                type: String,
                default: 'default'
            }
        },

        computed: {
            panelClass: function panelClass() {
                return 'panel-' + this.type;
            },
            hasFooterSlot: function hasFooterSlot() {
                return !!this.$slots['footer'];
            },
            hasHeaderSlot: function hasHeaderSlot() {
                return !!this.$slots['heading'];
            }
        }
    };
});

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.FormGroup = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        props: {
            heading: {
                type: String,
                default: ''
            },

            collapsed: {
                type: Boolean,
                default: false
            },

            movable: {
                type: Boolean,
                default: false
            }
        },

        data: function data() {
            return {
                isCollapsed: this.collapsed
            };
        }
    };
});

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.FormSection = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        props: {
            heading: {
                type: String,
                required: false
            }
        }
    };
});

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.FormLoader = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        props: {
            loading: {
                type: Boolean,
                required: true
            }
        }
    };
});

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(34), __webpack_require__(3), __webpack_require__(1), __webpack_require__(46)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('babel-runtime/core-js/promise'), require('lodash'), require('./mixins'), require('./prototypes/vfalert'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.promise, global.lodash, global.mixins, global.vfalert);
        global.FormAlert = mod.exports;
    }
})(this, function (exports, _promise, _lodash, _mixins, _vfalert) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _promise2 = _interopRequireDefault(_promise);

    var _lodash2 = _interopRequireDefault(_lodash);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        mixins: [_mixins.vf_uid],

        props: {
            message: {
                type: String,
                required: ''
            },

            position: {
                type: String,
                default: 'top'
            },

            status: {
                type: String,
                default: _vfalert.statuses.SUCCESS
            },

            dismisses: {
                type: Boolean,
                default: true
            },

            timeout: {
                type: Number,
                default: 5000
            },

            animation: {
                type: String,
                default: 'alert-bounce'
            }
        },

        // ----------------------------------------------------------
        // Local State
        // -------------------------------------------------------
        data: function data() {
            return {
                messages: [],
                alert: null,
                count: 1000,
                alertTimer: null
            };
        },


        computed: {
            alertIconClass: function alertIconClass() {
                var status = _vfalert.statuses.SUCCESS;
                switch (_lodash2.default.get(this.alert, 'status')) {
                    case _vfalert.statuses.SUCCESS:
                        status = 'check-circle';
                        break;
                    case _vfalert.statuses.INFO:
                        status = 'info-circle';
                        break;
                    case _vfalert.statuses.WARNING:
                    case _vfalert.statuses.DANGER:
                        status = 'exclamation-triangle';
                        break;
                    default:
                        break;
                }
                return ['fa-' + status, 'text-' + this.alert.status];
            },
            flattenedAlertErrors: function flattenedAlertErrors() {
                var errors = _lodash2.default.flatten(_lodash2.default.values(_lodash2.default.get(this.alert, 'errors', {})));
                var left = errors.splice(5);
                if (left.length) {
                    return errors.concat('...and ' + left.length + ' more');
                }
                return errors;
            }
        },

        watch: {
            message: function message(aVal) {
                var _this = this;

                if (!_lodash2.default.isEmpty(aVal)) {
                    var message = {
                        hash: this.makeVfUuid(),
                        text: aVal
                    };

                    this.messages.unshift(message);

                    setTimeout(function () {
                        _this.dismissToast(message);
                    }, this.timeout);
                }
            }
        },

        // ----------------------------------------------------------
        // Events
        // -------------------------------------------------------
        created: function created() {
            this.alertTimer = null;
            this.toastTimer = null;
        },
        mounted: function mounted() {
            if (this.$vfalert && _lodash2.default.isFunction(this.$vfalert.$on)) {
                this.$vfalert.$on(_vfalert.types.ALERT, this.onAlert);
                this.$vfalert.$on(_vfalert.types.TOAST, this.onToast);
                this.$vfalert.$on(_vfalert.types.CONFIRM, this.onConfirm);
            }
        },
        beforeDestroy: function beforeDestroy() {
            if (this.$vfalert && _lodash2.default.isFunction(this.$vfalert.$off)) {
                this.$vfalert.$off(_vfalert.types.ALERT, this.onAlert);
                this.$vfalert.$off(_vfalert.types.TOAST, this.onToast);
                this.$vfalert.$off(_vfalert.types.CONFIRM, this.onConfirm);
            }
        },


        // ----------------------------------------------------------
        // Non-Reactive Properties
        // -------------------------------------------------------
        methods: {
            // ----------------------------------------------------------
            // Alert
            // -------------------------------------------------------
            closeAlert: function closeAlert() {
                if (!!this.alert && _lodash2.default.isFunction(this.alert.callback)) {
                    this.alert.callback(false);
                }
                this.alert = null;
                clearTimeout(this.alertTimer);
            },
            onConfirm: function onConfirm(message, options, _ref) {
                var _this2 = this;

                var resolve = _ref.resolve,
                    reject = _ref.reject;

                var _ref2 = _lodash2.default.isObject(options) ? options : {},
                    status = _ref2.status,
                    confirmText = _ref2.confirmText,
                    cancelText = _ref2.cancelText;

                return new _promise2.default(function (resolve, reject) {
                    _this2.alert = {
                        message: message,
                        status: status,
                        confirmText: confirmText,
                        cancelText: cancelText,
                        promise: { resolve: resolve, reject: reject }
                    };
                }).then(function (response) {
                    _this2.alert = null;
                    resolve(response);
                }).catch(function (response) {
                    _this2.alert = null;
                    reject(response);
                });
            },
            onAlert: function onAlert(text, options) {
                var _this3 = this;

                var _ref3 = _lodash2.default.isObject(options) ? options : {},
                    status = _ref3.status,
                    timeout = _ref3.timeout,
                    errors = _ref3.errors,
                    max = _ref3.max;

                var message = ('' + text).substring(0, max || 997);

                if (text.length !== message.length) {
                    message += '...';
                }

                clearTimeout(this.alertTimer);
                this.alert = {
                    message: message,
                    status: status,
                    errors: errors
                };
                if (_lodash2.default.isNumber(timeout)) {
                    this.alertTimer = setTimeout(function (t) {
                        return _this3.closeAlert();
                    }, timeout);
                }
                return false;
            },


            // ----------------------------------------------------------
            // Toast
            // -------------------------------------------------------
            toastClass: function toastClass(message) {
                var status = _lodash2.default.get(message, 'status', this.status);
                var position = _lodash2.default.get(message, 'position', this.position);
                console.log({ status: status, position: position });
                return ['alert-' + status, position];
            },
            onToast: function onToast(text, options) {
                var _this4 = this;

                var zIndex = this.count = this.count + 1;

                var _ref4 = _lodash2.default.isObject(options) ? options : {},
                    status = _ref4.status,
                    position = _ref4.position,
                    timeout = _ref4.timeout;

                var message = {
                    text: text,
                    zIndex: zIndex,
                    hash: this.makeVfUuid(),
                    status: status || this.status,
                    position: position || this.position
                };

                this.messages.unshift(message);
                if (timeout === false) return;

                setTimeout(function () {
                    _this4.dismissToast(message, true);
                }, timeout || this.timeout);

                return false;
            },
            dismissToast: function dismissToast(message, force) {
                if (this.dismisses || force === true) {
                    this.messages = _lodash2.default.filter(this.messages, function (msg) {
                        return msg.hash !== message.hash;
                    });
                    if (this.messages.length === 0) this.count = 1000; // Reset the count once everything is dismissed
                }
                this.$emit('dismissed', message.text);
            }
        }
    };
});

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.FormModal = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        props: {
            hideHeader: {
                type: Boolean,
                default: false
            },

            hideFooter: {
                type: Boolean,
                default: false
            }
        },

        data: function data() {
            return {
                default: document.body.style.display
            };
        },
        beforeDestroy: function beforeDestroy() {
            document.body.style.overflow = this.default;
        },
        mounted: function mounted() {
            document.body.style.overflow = 'hidden';
        }
    };
});

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.FormProgressBar = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        props: {
            progress: {
                type: [Number, String],
                required: true
            },

            max: {
                type: Number,
                default: 100
            },

            min: {
                type: Number,
                default: 0
            }
        },

        computed: {
            barStyle: function barStyle() {
                return 'width:' + this.progress + '%';
            }
        }
    };
});

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('lodash'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.lodash);
        global.FormErrors = mod.exports;
    }
})(this, function (exports, _lodash) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _lodash2 = _interopRequireDefault(_lodash);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        props: {
            property: {
                type: String,
                required: true
            },

            errors: {
                required: true
            },

            warning: {
                type: String,
                required: false
            }
        },

        computed: {
            typeErrors: function typeErrors() {
                return _lodash2.default.get(this.errors, this.property);
            },
            hasError: function hasError() {
                return Boolean(this.errors && !!this.typeErrors);
            },
            hasWarning: function hasWarning() {
                return _lodash2.default.isString(this.warning) && this.warning.length;
            }
        }
    };
});

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.FormSaveButton = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        props: {
            isDirty: {
                type: Boolean,
                default: false
            },

            saving: {
                type: Boolean,
                default: false
            },

            deletable: {
                type: Boolean,
                default: false
            },

            disabled: {
                type: Boolean,
                default: false
            },

            removing: {
                type: Boolean,
                default: false
            },

            label: {
                type: String,
                default: 'Save'
            },

            altLabel: {
                type: String,
                default: 'Saving...'
            },

            removeLabel: {
                type: String,
                default: 'Delete'
            },

            altRemoveLabel: {
                type: String,
                default: 'Deleting...'
            },

            confirmRemove: {
                type: Boolean,
                default: true
            },

            removeMessage: {
                type: String,
                default: 'Are you sure you want to delete this item?'
            },

            removeConfirmText: {
                type: String,
                default: 'Yes delete this'
            },

            removeCancelText: {
                type: String,
                default: 'No, I pressed the wrong button'
            }
        },

        data: function data() {
            return {
                exit: false
            };
        },


        methods: {
            save: function save() {
                this.$emit('save', this.exit);
            },
            remove: function remove() {
                var _this = this;

                if (this.confirmRemove === false) {
                    return this.$emit('remove');
                }

                var message = this.removeMessage;
                var confirmText = this.removeConfirmText;
                var cancelText = this.removeCancelText;

                if (this.$vfalert && this.$vfalert.hasFormAlert()) {
                    var buttons = {
                        confirmText: confirmText,
                        cancelText: cancelText
                    };
                    this.$vfalert.confirm(message, 'warning', buttons).then(function (status) {
                        _this.$emit('remove');
                    }).catch(function () {
                        _this.$vfalert.success('Cancelled. The item is safe.');
                    });
                    return;
                }

                if (confirm(message)) {
                    this.$emit('remove');
                }
            }
        }
    };
});

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(295), __webpack_require__(34), __webpack_require__(299), __webpack_require__(300), __webpack_require__(3), __webpack_require__(1), __webpack_require__(37)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('babel-runtime/core-js/array/from'), require('babel-runtime/core-js/promise'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('lodash'), require('./mixins'), require('./FormFileGallery'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.from, global.promise, global.classCallCheck, global.createClass, global.lodash, global.mixins, global.FormFileGallery);
        global.FormCkeditor = mod.exports;
    }
})(this, function (exports, _from, _promise, _classCallCheck2, _createClass2, _lodash, _mixins, _FormFileGallery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _from2 = _interopRequireDefault(_from);

    var _promise2 = _interopRequireDefault(_promise);

    var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

    var _createClass3 = _interopRequireDefault(_createClass2);

    var _lodash2 = _interopRequireDefault(_lodash);

    var _FormFileGallery2 = _interopRequireDefault(_FormFileGallery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var ClassicEditor = window.ClassicEditor; //
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


    var FileUploadAdapter = function () {
        function FileUploadAdapter(loader, _ref) {
            var endpoint = _ref.endpoint,
                headers = _ref.headers;
            (0, _classCallCheck3.default)(this, FileUploadAdapter);

            this.loader = loader;
            this.endpoint = endpoint;
            this.config = { headers: headers };
        }

        (0, _createClass3.default)(FileUploadAdapter, [{
            key: 'responseHandler',
            value: function responseHandler(_ref2) {
                var target = _ref2.target;

                var success = target.status === 200 || target.status === 201;
                try {
                    var json = JSON.parse(target.responseText);
                    return {
                        success: success,
                        default: json.data.src
                    };
                } catch (e) {
                    return {
                        success: success,
                        message: 'There was a problem uploading the file.'
                    };
                }
            }
        }, {
            key: 'errorHandler',
            value: function errorHandler(_ref3) {
                var target = _ref3.target;

                return {
                    success: false,
                    message: 'There was a problem uploading the file.'
                };
            }
        }, {
            key: 'upload',
            value: function upload() {
                var _this = this;

                var data = new FormData();
                data.append('file', this.loader.file);

                return new _promise2.default(function (resolve, reject) {
                    var XHR = new XMLHttpRequest();

                    // Set up our request
                    XHR.open('POST', _this.endpoint);

                    _lodash2.default.forOwn(_this.config.headers, function (value, key) {
                        XHR.setRequestHeader(key, value);
                    });

                    // Define what happens on successful data submission
                    XHR.addEventListener('load', function (event) {
                        var response = _this.responseHandler(event);

                        if (response.success) {
                            // console.log('Fulfilling', response)
                            return resolve(response);
                        }
                        return resolve(_this.loader.file);
                        // return reject(response.message)
                    });

                    // Define what happens in case of error
                    XHR.addEventListener('error', function (event) {
                        var response = _this.errorHandler(event);
                        reject(response);
                    });

                    // Send our FormData object; HTTP headers are set automatically
                    XHR.send(data);
                });
            }
        }, {
            key: 'abort',
            value: function abort() {
                //
            }
        }]);
        return FileUploadAdapter;
    }();

    exports.default = {
        components: {
            'form-file-gallery': _FormFileGallery2.default
        },

        mixins: [_mixins.vf_uid, _mixins.props, _mixins.errors],

        props: {
            cfg: {
                type: Object,
                required: false
            },
            rows: {
                type: Number,
                default: 5
            }
        },

        data: function data() {
            return {
                showModal: false,
                editor: null
            };
        },


        computed: {
            hasEditor: function hasEditor() {
                return !!ClassicEditor;
            },
            _headers: function _headers() {
                return this.headers || this.$vfconfig.headers;
            },
            _endpoint: function _endpoint() {
                return this.endpoint || this.$vfconfig.endpoints.upload;
            }
        },

        watch: {
            value: function value(newVal) {
                if (newVal !== this._last) {
                    this.editor.setData(newVal);
                }
            }
        },

        mounted: function mounted() {
            var _this2 = this;

            if (!this.hasEditor) {
                console.error('CKeditor Requires ClassicEditor to be installed');
                return;
            }

            var config = {
                toolbar: ['undo', 'imageUpload', 'redo', 'heading', 'bold', 'italic', 'blockquote', 'link', 'numberedlist', 'bulletedlist'],
                ckfinder: {
                    // eslint-disable-next-line max-len
                    // uploadUrl: 'http://pretend.com'
                },
                image: {
                    // You need to configure the image toolbar too, so it uses the new style buttons.
                    toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight', 'imageStyle:full', 'imageStyle:side'],

                    styles: [
                    // This option is equal to a situation where no style is applied.
                    'full', 'side', 'alignCenter',

                    // This represents an image aligned to left.
                    'alignLeft',

                    // This represents an image aligned to right.
                    'alignRight']
                }
            };

            ClassicEditor.create(document.getElementById(this.vf_uid), config).then(function (editor) {
                _this2.editor = editor;

                var toolbar = (0, _from2.default)(editor.ui.componentFactory.names());
                // console.log('[VF] CKeditor Config', {toolbar, plugins})

                editor.model.document.on('change', function (evt, data) {
                    // console.log("chage", {evt, data})
                    _this2.$emit('input', _this2._last = editor.getData());
                });

                editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
                    var config = {
                        'headers': _this2._headers,
                        'endpoint': _this2._endpoint
                    };
                    return new FileUploadAdapter(loader, config);
                };
            }).catch(function (error) {
                console.error("CKeditor Error", { error: error });
            });
        },
        created: function created() {
            this._last = null;
        },
        beforeDestroy: function beforeDestroy() {
            this.editor.destroy().catch(function (error) {
                console.log(error);
            });
        },


        methods: {
            closeFilePicker: function closeFilePicker() {
                this.showModal = false;
            },
            openFilePicker: function openFilePicker() {
                this.showModal = true;
            },
            chooseFile: function chooseFile(file) {
                var content = void 0;
                if (_lodash2.default.isObject(file)) {
                    content = file;
                } else if (_lodash2.default.isString(file)) {
                    content = { path: file };
                }

                var editor = this.editor;

                editor.model.change(function (writer) {
                    var imageElement = writer.createElement('image', {
                        src: content.path
                    });
                    // Insert the image in the current selection location.
                    editor.model.insertContent(imageElement, editor.model.document.selection);
                });

                this.closeFilePicker();
            }
        }
    };
});

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(38), __webpack_require__(1), __webpack_require__(126), __webpack_require__(15), __webpack_require__(170), __webpack_require__(172), __webpack_require__(174), __webpack_require__(177), __webpack_require__(179), __webpack_require__(181), __webpack_require__(185), __webpack_require__(187), __webpack_require__(189), __webpack_require__(193), __webpack_require__(195), __webpack_require__(197), __webpack_require__(202), __webpack_require__(208), __webpack_require__(212), __webpack_require__(214), __webpack_require__(217), __webpack_require__(292), __webpack_require__(223), __webpack_require__(227), __webpack_require__(231), __webpack_require__(233), __webpack_require__(235), __webpack_require__(242), __webpack_require__(37), __webpack_require__(247), __webpack_require__(249), __webpack_require__(95), __webpack_require__(257), __webpack_require__(259), __webpack_require__(98), __webpack_require__(261), __webpack_require__(263), __webpack_require__(265), __webpack_require__(269), __webpack_require__(273), __webpack_require__(277), __webpack_require__(282), __webpack_require__(284), __webpack_require__(288)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./vue/VueDropzone'), require('./mixins'), require('./prototypes'), require('./data_sources'), require('./FormText'), require('./FormFile'), require('./FormTextMask'), require('./FormNumber'), require('./FormPassword'), require('./FormSlider'), require('./FormCheckbox'), require('./FormSelect'), require('./FormSelectMany'), require('./FormRadioButton'), require('./FormCheckboxGroup'), require('./FormSegmentedControl'), require('./FormOptionsLists'), require('./FormOptionsListsScoped'), require('./FormTextarea'), require('./FormTinymce'), require('./FormMarkdown'), require('./FormCkeditor'), require('./FormDateRange'), require('./FormDate'), require('./FormDropzone'), require('./FormDropzoneButton'), require('./FormFilePicker'), require('./FormFileEdit'), require('./FormFileGallery'), require('./FormSeoData'), require('./FormAddress'), require('./FormStateSelect'), require('./FormNamePrefixSelect'), require('./FormNameSuffixSelect'), require('./FormGooglePlaceLookup'), require('./FormPanel'), require('./FormGroup'), require('./FormSection'), require('./FormLoader'), require('./FormAlert'), require('./FormModal'), require('./FormProgressBar'), require('./FormErrors'), require('./FormSaveButton'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.VueDropzone, global.mixins, global.prototypes, global.data_sources, global.FormText, global.FormFile, global.FormTextMask, global.FormNumber, global.FormPassword, global.FormSlider, global.FormCheckbox, global.FormSelect, global.FormSelectMany, global.FormRadioButton, global.FormCheckboxGroup, global.FormSegmentedControl, global.FormOptionsLists, global.FormOptionsListsScoped, global.FormTextarea, global.FormTinymce, global.FormMarkdown, global.FormCkeditor, global.FormDateRange, global.FormDate, global.FormDropzone, global.FormDropzoneButton, global.FormFilePicker, global.FormFileEdit, global.FormFileGallery, global.FormSeoData, global.FormAddress, global.FormStateSelect, global.FormNamePrefixSelect, global.FormNameSuffixSelect, global.FormGooglePlaceLookup, global.FormPanel, global.FormGroup, global.FormSection, global.FormLoader, global.FormAlert, global.FormModal, global.FormProgressBar, global.FormErrors, global.FormSaveButton);
        global.index = mod.exports;
    }
})(this, function (exports, _VueDropzone, _mixins, _prototypes, _data_sources, _FormText, _FormFile, _FormTextMask, _FormNumber, _FormPassword, _FormSlider, _FormCheckbox, _FormSelect, _FormSelectMany, _FormRadioButton, _FormCheckboxGroup, _FormSegmentedControl, _FormOptionsLists, _FormOptionsListsScoped, _FormTextarea, _FormTinymce, _FormMarkdown, _FormCkeditor, _FormDateRange, _FormDate, _FormDropzone, _FormDropzoneButton, _FormFilePicker, _FormFileEdit, _FormFileGallery, _FormSeoData, _FormAddress, _FormStateSelect, _FormNamePrefixSelect, _FormNameSuffixSelect, _FormGooglePlaceLookup, _FormPanel, _FormGroup, _FormSection, _FormLoader, _FormAlert, _FormModal, _FormProgressBar, _FormErrors, _FormSaveButton) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.fileTypes = exports.dateFormats = exports.vfconfig = exports.ValidationSyncMixin = exports.ValidatorStore = exports.formData = exports.vf_uid = exports.options = exports.dates = exports.errors = exports.props = exports.values = exports.core = exports.FormModal = exports.FormProgressBar = exports.FormSaveButton = exports.FormErrors = exports.FormLoader = exports.FormSeoData = exports.FormAddress = exports.FormSection = exports.FormGroup = exports.FormPanel = exports.FormFileGallery = exports.FormFileEdit = exports.FormFilePicker = exports.FormDropzoneButton = exports.FormDropzone = exports.FormDate = exports.FormDateRange = exports.FormOptionsListsScoped = exports.FormOptionsLists = exports.FormSegmentedControl = exports.FormCheckboxGroup = exports.FormRadioButton = exports.FormSelectMany = exports.FormSelect = exports.FormCheckbox = exports.FormSlider = exports.FormFile = exports.FormNumber = exports.FormPassword = exports.FormMarkdown = exports.FormTinymce = exports.FormTextarea = exports.FormTextMask = exports.FormText = exports.VueDropzone = exports.VueFormHelpers = exports.VueFormsCore = exports.VueForms = undefined;
    Object.defineProperty(exports, 'VueDropzone', {
        enumerable: true,
        get: function () {
            return _interopRequireDefault(_VueDropzone).default;
        }
    });

    var _FormText2 = _interopRequireDefault(_FormText);

    var _FormFile2 = _interopRequireDefault(_FormFile);

    var _FormTextMask2 = _interopRequireDefault(_FormTextMask);

    var _FormNumber2 = _interopRequireDefault(_FormNumber);

    var _FormPassword2 = _interopRequireDefault(_FormPassword);

    var _FormSlider2 = _interopRequireDefault(_FormSlider);

    var _FormCheckbox2 = _interopRequireDefault(_FormCheckbox);

    var _FormSelect2 = _interopRequireDefault(_FormSelect);

    var _FormSelectMany2 = _interopRequireDefault(_FormSelectMany);

    var _FormRadioButton2 = _interopRequireDefault(_FormRadioButton);

    var _FormCheckboxGroup2 = _interopRequireDefault(_FormCheckboxGroup);

    var _FormSegmentedControl2 = _interopRequireDefault(_FormSegmentedControl);

    var _FormOptionsLists2 = _interopRequireDefault(_FormOptionsLists);

    var _FormOptionsListsScoped2 = _interopRequireDefault(_FormOptionsListsScoped);

    var _FormTextarea2 = _interopRequireDefault(_FormTextarea);

    var _FormTinymce2 = _interopRequireDefault(_FormTinymce);

    var _FormMarkdown2 = _interopRequireDefault(_FormMarkdown);

    var _FormCkeditor2 = _interopRequireDefault(_FormCkeditor);

    var _FormDateRange2 = _interopRequireDefault(_FormDateRange);

    var _FormDate2 = _interopRequireDefault(_FormDate);

    var _FormDropzone2 = _interopRequireDefault(_FormDropzone);

    var _FormDropzoneButton2 = _interopRequireDefault(_FormDropzoneButton);

    var _FormFilePicker2 = _interopRequireDefault(_FormFilePicker);

    var _FormFileEdit2 = _interopRequireDefault(_FormFileEdit);

    var _FormFileGallery2 = _interopRequireDefault(_FormFileGallery);

    var _FormSeoData2 = _interopRequireDefault(_FormSeoData);

    var _FormAddress2 = _interopRequireDefault(_FormAddress);

    var _FormStateSelect2 = _interopRequireDefault(_FormStateSelect);

    var _FormNamePrefixSelect2 = _interopRequireDefault(_FormNamePrefixSelect);

    var _FormNameSuffixSelect2 = _interopRequireDefault(_FormNameSuffixSelect);

    var _FormGooglePlaceLookup2 = _interopRequireDefault(_FormGooglePlaceLookup);

    var _FormPanel2 = _interopRequireDefault(_FormPanel);

    var _FormGroup2 = _interopRequireDefault(_FormGroup);

    var _FormSection2 = _interopRequireDefault(_FormSection);

    var _FormLoader2 = _interopRequireDefault(_FormLoader);

    var _FormAlert2 = _interopRequireDefault(_FormAlert);

    var _FormModal2 = _interopRequireDefault(_FormModal);

    var _FormProgressBar2 = _interopRequireDefault(_FormProgressBar);

    var _FormErrors2 = _interopRequireDefault(_FormErrors);

    var _FormSaveButton2 = _interopRequireDefault(_FormSaveButton);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var VueForms = exports.VueForms = {
        install: function install(Vue, options) {
            Vue.use(VueFormsCore, options);
            Vue.use(VueFormHelpers, options);

            /**
             * Components requiring all libs libs...
             */
            Vue.component('form-daterange', _FormDateRange2.default);
            Vue.component('form-date', _FormDate2.default);
            Vue.component('form-text-mask', _FormTextMask2.default);

            Vue.component('form-name-prefix-select', _FormNamePrefixSelect2.default);
            Vue.component('form-name-suffix-select', _FormNameSuffixSelect2.default);
            Vue.component('form-state-select', _FormStateSelect2.default);

            Vue.component('form-tinymce', _FormTinymce2.default);
            Vue.component('form-markdown', _FormMarkdown2.default);
            Vue.component('form-ckeditor', _FormCkeditor2.default);
            Vue.component('form-google-place-lookup', _FormGooglePlaceLookup2.default);

            Vue.component('form-dropzone', _FormDropzone2.default);
            Vue.component('form-dropzone-button', _FormDropzoneButton2.default);
            Vue.component('form-file-picker', _FormFilePicker2.default);
            Vue.component('form-file-edit', _FormFileEdit2.default);
            Vue.component('form-file-gallery', _FormFileGallery2.default);

            Vue.component('form-options-list', _FormOptionsLists2.default);
            Vue.component('form-options-list-scoped', _FormOptionsListsScoped2.default);
        }
    };

    /**
     * Core Components
     */
    var VueFormsCore = exports.VueFormsCore = {
        install: function install(Vue, option) {
            _prototypes.vfconfig.configure(option || {});

            Object.defineProperty(Vue.prototype, '$vfconfig', {
                get: function get() {
                    return _prototypes.vfconfig;
                }
            });

            Object.defineProperty(Vue.prototype, '$vfselect', {
                get: function get() {
                    return _data_sources.selectUtil;
                }
            });

            Vue.component('form-text', _FormText2.default);

            Vue.component('form-number', _FormNumber2.default);
            Vue.component('form-password', _FormPassword2.default);

            Vue.component('form-slider', _FormSlider2.default);
            Vue.component('form-checkbox', _FormCheckbox2.default);

            Vue.component('form-select', _FormSelect2.default);
            Vue.component('form-select-many', _FormSelectMany2.default);

            Vue.component('form-radio-button', _FormRadioButton2.default);
            Vue.component('form-checkbox-group', _FormCheckboxGroup2.default);
            Vue.component('form-segmented-control', _FormSegmentedControl2.default);

            Vue.component('form-textarea', _FormTextarea2.default);

            Vue.component('form-file', _FormFile2.default);

            Vue.component('form-panel', _FormPanel2.default);
            Vue.component('form-group', _FormGroup2.default);
            Vue.component('form-section', _FormSection2.default);

            Vue.component('form-seo', _FormSeoData2.default);
            Vue.component('form-address', _FormAddress2.default);
        }
    };

    /**
     * Helpers
     */
    var VueFormHelpers = exports.VueFormHelpers = {
        install: function install(Vue, options) {
            Vue.component('form-loader', _FormLoader2.default);
            Vue.component('form-errors', _FormErrors2.default);
            Vue.component('form-save-button', _FormSaveButton2.default);
            Vue.component('form-modal', _FormModal2.default);
            Vue.component('form-alert', _FormAlert2.default);
            Vue.component('form-progress-bar', _FormProgressBar2.default);

            var validator = new _prototypes.ValidatorStore();

            Vue.mixin({
                data: function data() {
                    return {
                        VueForms_ValidatorStore: validator
                    };
                }
            });

            Object.defineProperty(Vue.prototype, '$validation', {
                get: function get() {
                    return this.$root.VueForms_ValidatorStore;
                }
            });

            Object.defineProperty(Vue.prototype, '$vfalert', {
                get: function get() {
                    return _prototypes.vfalert;
                }
            });
        }
    };

    exports.FormText = _FormText2.default;
    exports.FormTextMask = _FormTextMask2.default;
    exports.FormTextarea = _FormTextarea2.default;
    exports.FormTinymce = _FormTinymce2.default;
    exports.FormMarkdown = _FormMarkdown2.default;
    exports.FormPassword = _FormPassword2.default;
    exports.FormNumber = _FormNumber2.default;
    exports.FormFile = _FormFile2.default;
    exports.FormSlider = _FormSlider2.default;
    exports.FormCheckbox = _FormCheckbox2.default;
    exports.FormSelect = _FormSelect2.default;
    exports.FormSelectMany = _FormSelectMany2.default;
    exports.FormRadioButton = _FormRadioButton2.default;
    exports.FormCheckboxGroup = _FormCheckboxGroup2.default;
    exports.FormSegmentedControl = _FormSegmentedControl2.default;
    exports.FormOptionsLists = _FormOptionsLists2.default;
    exports.FormOptionsListsScoped = _FormOptionsListsScoped2.default;
    exports.FormDateRange = _FormDateRange2.default;
    exports.FormDate = _FormDate2.default;
    exports.FormDropzone = _FormDropzone2.default;
    exports.FormDropzoneButton = _FormDropzoneButton2.default;
    exports.FormFilePicker = _FormFilePicker2.default;
    exports.FormFileEdit = _FormFileEdit2.default;
    exports.FormFileGallery = _FormFileGallery2.default;
    exports.FormPanel = _FormPanel2.default;
    exports.FormGroup = _FormGroup2.default;
    exports.FormSection = _FormSection2.default;
    exports.FormAddress = _FormAddress2.default;
    exports.FormSeoData = _FormSeoData2.default;
    exports.FormLoader = _FormLoader2.default;
    exports.FormErrors = _FormErrors2.default;
    exports.FormSaveButton = _FormSaveButton2.default;
    exports.FormProgressBar = _FormProgressBar2.default;
    exports.FormModal = _FormModal2.default;
    exports.core = _mixins.core;
    exports.values = _mixins.values;
    exports.props = _mixins.props;
    exports.errors = _mixins.errors;
    exports.dates = _mixins.dates;
    exports.options = _mixins.options;
    exports.vf_uid = _mixins.vf_uid;
    exports.formData = _mixins.formData;
    exports.ValidatorStore = _prototypes.ValidatorStore;
    exports.ValidationSyncMixin = _prototypes.ValidationSyncMixin;
    exports.vfconfig = _prototypes.vfconfig;
    exports.dateFormats = _data_sources.dateFormats;
    exports.fileTypes = _data_sources.fileTypes;
});

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(114);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("57c2ca2f", content, true, {});

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports
exports.i(__webpack_require__(115), "");
exports.i(__webpack_require__(116), "");

// module
exports.push([module.i, ".dropzone .dz-preview .dz-image img{width:100%}", ""]);

// exports


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "@-webkit-keyframes passing-through{0%{opacity:0;-webkit-transform:translateY(40px);-moz-transform:translateY(40px);-ms-transform:translateY(40px);-o-transform:translateY(40px);transform:translateY(40px)}30%,70%{opacity:1;-webkit-transform:translateY(0);-moz-transform:translateY(0);-ms-transform:translateY(0);-o-transform:translateY(0);transform:translateY(0)}to{opacity:0;-webkit-transform:translateY(-40px);-moz-transform:translateY(-40px);-ms-transform:translateY(-40px);-o-transform:translateY(-40px);transform:translateY(-40px)}}@-moz-keyframes passing-through{0%{opacity:0;-webkit-transform:translateY(40px);-moz-transform:translateY(40px);-ms-transform:translateY(40px);-o-transform:translateY(40px);transform:translateY(40px)}30%,70%{opacity:1;-webkit-transform:translateY(0);-moz-transform:translateY(0);-ms-transform:translateY(0);-o-transform:translateY(0);transform:translateY(0)}to{opacity:0;-webkit-transform:translateY(-40px);-moz-transform:translateY(-40px);-ms-transform:translateY(-40px);-o-transform:translateY(-40px);transform:translateY(-40px)}}@keyframes passing-through{0%{opacity:0;-webkit-transform:translateY(40px);-moz-transform:translateY(40px);-ms-transform:translateY(40px);-o-transform:translateY(40px);transform:translateY(40px)}30%,70%{opacity:1;-webkit-transform:translateY(0);-moz-transform:translateY(0);-ms-transform:translateY(0);-o-transform:translateY(0);transform:translateY(0)}to{opacity:0;-webkit-transform:translateY(-40px);-moz-transform:translateY(-40px);-ms-transform:translateY(-40px);-o-transform:translateY(-40px);transform:translateY(-40px)}}@-webkit-keyframes slide-in{0%{opacity:0;-webkit-transform:translateY(40px);-moz-transform:translateY(40px);-ms-transform:translateY(40px);-o-transform:translateY(40px);transform:translateY(40px)}30%{opacity:1;-webkit-transform:translateY(0);-moz-transform:translateY(0);-ms-transform:translateY(0);-o-transform:translateY(0);transform:translateY(0)}}@-moz-keyframes slide-in{0%{opacity:0;-webkit-transform:translateY(40px);-moz-transform:translateY(40px);-ms-transform:translateY(40px);-o-transform:translateY(40px);transform:translateY(40px)}30%{opacity:1;-webkit-transform:translateY(0);-moz-transform:translateY(0);-ms-transform:translateY(0);-o-transform:translateY(0);transform:translateY(0)}}@keyframes slide-in{0%{opacity:0;-webkit-transform:translateY(40px);-moz-transform:translateY(40px);-ms-transform:translateY(40px);-o-transform:translateY(40px);transform:translateY(40px)}30%{opacity:1;-webkit-transform:translateY(0);-moz-transform:translateY(0);-ms-transform:translateY(0);-o-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes pulse{0%{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1)}10%{-webkit-transform:scale(1.1);-moz-transform:scale(1.1);-ms-transform:scale(1.1);-o-transform:scale(1.1);transform:scale(1.1)}20%{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1)}}@-moz-keyframes pulse{0%{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1)}10%{-webkit-transform:scale(1.1);-moz-transform:scale(1.1);-ms-transform:scale(1.1);-o-transform:scale(1.1);transform:scale(1.1)}20%{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1)}}@keyframes pulse{0%{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1)}10%{-webkit-transform:scale(1.1);-moz-transform:scale(1.1);-ms-transform:scale(1.1);-o-transform:scale(1.1);transform:scale(1.1)}20%{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1)}}.dropzone,.dropzone *{box-sizing:border-box}.dropzone{min-height:150px;border:2px solid rgba(0,0,0,.3);background:#fff;padding:20px}.dropzone.dz-clickable{cursor:pointer}.dropzone.dz-clickable *{cursor:default}.dropzone.dz-clickable .dz-message,.dropzone.dz-clickable .dz-message *{cursor:pointer}.dropzone.dz-started .dz-message{display:none}.dropzone.dz-drag-hover{border-style:solid}.dropzone.dz-drag-hover .dz-message{opacity:.5}.dropzone .dz-message{text-align:center;margin:2em 0}.dropzone .dz-preview{position:relative;display:inline-block;vertical-align:top;margin:16px;min-height:100px}.dropzone .dz-preview:hover{z-index:1000}.dropzone .dz-preview.dz-file-preview .dz-image{border-radius:20px;background:#999;background:linear-gradient(180deg,#eee,#ddd)}.dropzone .dz-preview.dz-file-preview .dz-details{opacity:1}.dropzone .dz-preview.dz-image-preview{background:#fff}.dropzone .dz-preview.dz-image-preview .dz-details{-webkit-transition:opacity .2s linear;-moz-transition:opacity .2s linear;-ms-transition:opacity .2s linear;-o-transition:opacity .2s linear;transition:opacity .2s linear}.dropzone .dz-preview .dz-remove{font-size:14px;text-align:center;display:block;cursor:pointer;border:none}.dropzone .dz-preview .dz-remove:hover{text-decoration:underline}.dropzone .dz-preview:hover .dz-details{opacity:1}.dropzone .dz-preview .dz-details{z-index:20;position:absolute;top:0;left:0;opacity:0;font-size:13px;min-width:100%;max-width:100%;padding:2em 1em;text-align:center;color:rgba(0,0,0,.9);line-height:150%}.dropzone .dz-preview .dz-details .dz-size{margin-bottom:1em;font-size:16px}.dropzone .dz-preview .dz-details .dz-filename{white-space:nowrap}.dropzone .dz-preview .dz-details .dz-filename:hover span{border:1px solid hsla(0,0%,78%,.8);background-color:hsla(0,0%,100%,.8)}.dropzone .dz-preview .dz-details .dz-filename:not(:hover){overflow:hidden;text-overflow:ellipsis}.dropzone .dz-preview .dz-details .dz-filename:not(:hover) span{border:1px solid transparent}.dropzone .dz-preview .dz-details .dz-filename span,.dropzone .dz-preview .dz-details .dz-size span{background-color:hsla(0,0%,100%,.4);padding:0 .4em;border-radius:3px}.dropzone .dz-preview:hover .dz-image img{-webkit-transform:scale(1.05);-moz-transform:scale(1.05);-ms-transform:scale(1.05);-o-transform:scale(1.05);transform:scale(1.05);-webkit-filter:blur(8px);filter:blur(8px)}.dropzone .dz-preview .dz-image{border-radius:20px;overflow:hidden;width:120px;height:120px;position:relative;display:block;z-index:10}.dropzone .dz-preview .dz-image img{display:block}.dropzone .dz-preview.dz-success .dz-success-mark{-webkit-animation:passing-through 3s cubic-bezier(.77,0,.175,1);-moz-animation:passing-through 3s cubic-bezier(.77,0,.175,1);-ms-animation:passing-through 3s cubic-bezier(.77,0,.175,1);-o-animation:passing-through 3s cubic-bezier(.77,0,.175,1);animation:passing-through 3s cubic-bezier(.77,0,.175,1)}.dropzone .dz-preview.dz-error .dz-error-mark{opacity:1;-webkit-animation:slide-in 3s cubic-bezier(.77,0,.175,1);-moz-animation:slide-in 3s cubic-bezier(.77,0,.175,1);-ms-animation:slide-in 3s cubic-bezier(.77,0,.175,1);-o-animation:slide-in 3s cubic-bezier(.77,0,.175,1);animation:slide-in 3s cubic-bezier(.77,0,.175,1)}.dropzone .dz-preview .dz-error-mark,.dropzone .dz-preview .dz-success-mark{pointer-events:none;opacity:0;z-index:500;position:absolute;display:block;top:50%;left:50%;margin-left:-27px;margin-top:-27px}.dropzone .dz-preview .dz-error-mark svg,.dropzone .dz-preview .dz-success-mark svg{display:block;width:54px;height:54px}.dropzone .dz-preview.dz-processing .dz-progress{opacity:1;-webkit-transition:all .2s linear;-moz-transition:all .2s linear;-ms-transition:all .2s linear;-o-transition:all .2s linear;transition:all .2s linear}.dropzone .dz-preview.dz-complete .dz-progress{opacity:0;-webkit-transition:opacity .4s ease-in;-moz-transition:opacity .4s ease-in;-ms-transition:opacity .4s ease-in;-o-transition:opacity .4s ease-in;transition:opacity .4s ease-in}.dropzone .dz-preview:not(.dz-processing) .dz-progress{-webkit-animation:pulse 6s ease infinite;-moz-animation:pulse 6s ease infinite;-ms-animation:pulse 6s ease infinite;-o-animation:pulse 6s ease infinite;animation:pulse 6s ease infinite}.dropzone .dz-preview .dz-progress{opacity:1;z-index:1000;pointer-events:none;position:absolute;height:16px;left:50%;top:50%;margin-top:-8px;width:80px;margin-left:-40px;background:hsla(0,0%,100%,.9);-webkit-transform:scale(1);border-radius:8px;overflow:hidden}.dropzone .dz-preview .dz-progress .dz-upload{background:#333;background:linear-gradient(180deg,#666,#444);position:absolute;top:0;left:0;bottom:0;width:0;-webkit-transition:width .3s ease-in-out;-moz-transition:width .3s ease-in-out;-ms-transition:width .3s ease-in-out;-o-transition:width .3s ease-in-out;transition:width .3s ease-in-out}.dropzone .dz-preview.dz-error .dz-error-message{display:block}.dropzone .dz-preview.dz-error:hover .dz-error-message{opacity:1;pointer-events:auto}.dropzone .dz-preview .dz-error-message{pointer-events:none;z-index:1000;position:absolute;display:block;display:none;opacity:0;-webkit-transition:opacity .3s ease;-moz-transition:opacity .3s ease;-ms-transition:opacity .3s ease;-o-transition:opacity .3s ease;transition:opacity .3s ease;border-radius:8px;font-size:13px;top:130px;left:-10px;width:140px;background:#be2626;background:linear-gradient(180deg,#be2626,#a92222);padding:.5em 1.2em;color:#fff}.dropzone .dz-preview .dz-error-message:after{content:\"\";position:absolute;top:-6px;left:64px;width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid #be2626}", ""]);

// exports


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".dropzone,.dropzone *{box-sizing:border-box}.dropzone{position:relative}.dropzone .dz-preview{position:relative;display:inline-block;width:120px;margin:.5em}.dropzone .dz-preview .dz-progress{display:block;height:15px;border:1px solid #aaa}.dropzone .dz-preview .dz-progress .dz-upload{display:block;height:100%;width:0;background:green}.dropzone .dz-preview .dz-error-message{color:red;display:none}.dropzone .dz-preview.dz-error .dz-error-mark,.dropzone .dz-preview.dz-error .dz-error-message,.dropzone .dz-preview.dz-success .dz-success-mark{display:block}.dropzone .dz-preview .dz-error-mark,.dropzone .dz-preview .dz-success-mark{position:absolute;display:none;left:30px;top:30px;width:54px;height:58px;left:50%;margin-left:-27px}", ""]);

// exports


/***/ }),
/* 117 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 118 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_118__;

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form',{class:{dropzone: _vm.id === _vm.rootId},attrs:{"action":_vm.url,"id":_vm.rootId}},[(!!_vm.$slots['button'])?_c('div',{staticClass:"btn btn-primary btn-dropzone",attrs:{"id":_vm.id}},[_vm._t("button")],2):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('lodash'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.lodash);
        global.options = mod.exports;
    }
})(this, function (exports, _lodash) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        props: {
            valueMap: {
                type: Function,
                required: false
            },

            options: {
                type: [Array, Object],
                required: false
            },

            textKey: {
                type: String,
                default: 'text'
            },

            valueKey: {
                type: [String, Boolean],
                default: 'value'
            },

            useIndexAsValue: {
                type: Boolean,
                default: false
            },

            useKeyAsValue: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            $_VF_OptionsMixin_optionsListIsObject: function $_VF_OptionsMixin_optionsListIsObject() {
                return !(0, _lodash.isArray)(this.options);
            },
            optionsIsArrayOfObjects: function optionsIsArrayOfObjects() {
                return (0, _lodash.isObject)(_.get(this, 'options.0'));
            }
        },

        methods: {
            optionDescription: function optionDescription(opt) {
                if ((0, _lodash.isObject)(opt)) {
                    return opt[this.textKey];
                }
                return opt;
            },
            optionValue: function optionValue(opt, indexOrKey) {
                if (this.valueMap) {
                    return this.valueMap(opt, indexOrKey);
                }

                if (!this.$_VF_OptionsMixin_optionsListIsObject && this.useIndexAsValue) return indexOrKey;

                if (this.useKeyAsValue === true) {
                    return indexOrKey;
                }

                if ((0, _lodash.isObject)(opt) && this.valueKey !== false) {
                    return opt[this.valueKey];
                }
                return opt;
            }
        }
    };
});

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(18), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('moment'), require('lodash'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.moment, global.lodash);
        global.dates = mod.exports;
    }
})(this, function (exports, _moment, _lodash) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _moment2 = _interopRequireDefault(_moment);

    var _lodash2 = _interopRequireDefault(_lodash);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        props: {

            dateConfig: {
                type: Object,
                default: function _default() {
                    return {};
                }
            },

            dropdowns: {
                type: Boolean,
                default: false
            },

            opens: {
                type: String,
                default: 'center'
            },

            autoApply: {
                type: Boolean,
                default: true
            },

            timePicker: {
                type: Boolean,
                default: false
            },

            timePickerIncrement: {
                type: Number,
                default: 15
            },

            showRanges: {
                type: Boolean,
                default: false
            },

            valueFormat: {
                type: String,
                required: false
            }
        },

        methods: {
            $_makeFormattedDate: function $_makeFormattedDate(aMoment) {
                if (!aMoment || !aMoment.isValid()) return null;

                if (this.timePicker) {
                    return aMoment.format(this.dateValueFormat);
                }
                return aMoment.utc().startOf('day').format(this.dateValueFormat);
            },
            updateStart: function updateStart(aMoment) {
                if (aMoment.isValid()) {
                    if (!this.timePicker) {
                        aMoment = aMoment.utc().startOf('day');
                    }
                    this.picker.setStartDate(aMoment);
                }
            },
            updateEnd: function updateEnd(aMoment) {
                if (aMoment.isValid()) {
                    if (!this.timePicker) {
                        aMoment = aMoment.utc().startOf('day');
                    }
                    this.picker.setEndDate(aMoment);
                }
            },
            safeDate: function safeDate(string) {
                var date = (0, _moment2.default)(string);
                if (date.isValid()) {
                    return date;
                }
                return (0, _moment2.default)({});
            }
        },

        computed: {
            pickerLocaleFormat: function pickerLocaleFormat() {
                var format = _lodash2.default.get(this.$vfconfig, 'format.date') || 'MM/DD/YYYY';
                if (this.timePicker) {
                    format += ' ' + (_lodash2.default.get(this.$vfconfig, 'format.time') || 'h:mm A');
                }
                return format;
            },
            dateValueFormat: function dateValueFormat() {
                return this.valueFormat || _lodash2.default.get(this, '$vfconfig.format.dateValueFormat', null);
            },
            params: function params() {
                var date = this.safeDate(this.value);
                return {
                    'singleDatePicker': this.single || false,
                    'autoApply': this.autoApply,
                    'showDropdowns': this.dropdowns,
                    'timePicker': this.timepicker,
                    'startDate': date,
                    'endDate': date,
                    'opens': this.opens
                };
            }
        }
    };
});

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3), __webpack_require__(38)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('lodash'), require('../vue/VueDropzone'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.lodash, global.VueDropzone);
        global.dropzone = mod.exports;
    }
})(this, function (exports, _lodash, _VueDropzone) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _lodash2 = _interopRequireDefault(_lodash);

    var _VueDropzone2 = _interopRequireDefault(_VueDropzone);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        components: {
            'vue-dropzone': _VueDropzone2.default
        },

        props: {
            // Used for v-bind
            value: {
                type: [Object, Array]
            },

            // the label for the form element
            label: {
                type: String,
                required: true
            },

            // The type of model
            type: {
                type: String,
                required: true
            },

            // The id of the model
            id: {
                type: Number
            },

            // The model property the image should be attached to
            property: {
                type: String
            },

            private: {
                type: Boolean,
                default: false
            },

            endpoint: {
                type: String,
                required: false
            },

            headers: {
                type: Object,
                required: false
            },

            // Supported file types
            fileTypes: {
                type: [String, Array],
                default: 'image/*'
            },

            // If multiple files are allowed, how many
            limit: {
                type: Number,
                default: 1
            },

            // Max File size in MB
            maxFileSize: {
                type: Number,
                default: 10
            },

            helpText: {
                type: String,
                required: false
            }
        },

        data: function data() {
            return {
                error: null,
                progress: 0
            };
        },


        computed: {
            dzHelpText: function dzHelpText() {
                return 'Limited to ' + this.limitText + '. ' + this.eachText + ' must not exceed ' + this.maxFileSize + 'MB.';
            },
            requestHeaders: function requestHeaders() {
                return this.headers || _lodash2.default.get(this.$vfconfig, 'headers', {});
            },
            acceptedFileTypes: function acceptedFileTypes() {
                if (_lodash2.default.isString(this.fileTypes)) {
                    return this.fileTypes;
                }

                if (_lodash2.default.isArray(this.fileTypes)) {
                    return this.fileTypes.join(',');
                }
            },
            requestEndpoint: function requestEndpoint() {
                var base = this.endpoint || _lodash2.default.get(this.$vfconfig, 'endpoints.upload');

                var endpoint = base + '?type=' + this.type;

                if (this.id) {
                    endpoint += '&model=' + this.id;
                }

                if (this.property) {
                    endpoint += '&property=' + this.property;
                }

                return endpoint;
            },
            fileList: function fileList() {
                if (this.value instanceof Array) {
                    return this.value;
                } else if (this.value instanceof Object) {
                    return [this.value];
                }
            },
            impliedArray: function impliedArray() {
                return Boolean(this.limit > 1 || this.value instanceof Array);
            },
            eachText: function eachText() {
                return this.limit > 1 ? 'Each file' : 'The file';
            },
            limitText: function limitText() {
                return '' + this.limit + ' file' + (this.limit > 1 ? 's' : '');
            }
        },

        methods: {
            dzError: function dzError(file, response, xhr) {
                console.error('FormDropzone Error:', response, xhr);
                this.error = response;

                this.progress = 0;
                if (this.$vfalert && _lodash2.default.isFunction(this.$vfalert.errorResponse)) {
                    this.$vfalert.errorResponse(response, 'There was a problem uploading the file', xhr);
                }

                this.$emit('error', response);
            },
            dzAdded: function dzAdded(file) {
                this.progress = 0;
                if (this.impliedArray) {
                    var files = this.value || [];
                    files.push(file);
                    return this.$emit('input', files);
                }

                this.$emit('input', file);
                this.$emit('added', file);
            },
            dzRemoved: function dzRemoved(file) {
                var _this = this;

                this.progress = 0;

                var success = function success(response) {
                    var files = null;
                    if (_this.impliedArray) {
                        files = _lodash2.default.filter(_this.value, function (f) {
                            return f.id !== file.id;
                        });
                    }
                    _this.$emit('input', files);
                    _this.$emit('removed', file);
                    console.log('Successfully removed ' + file.name);
                };

                var error = function error(response) {
                    _this.error = response;
                    _this.$emit('error', response);
                };

                if (file.id) {
                    var base = this.endpoint || _lodash2.default.get(this.$vfconfig, 'endpoints.upload');
                    if (_lodash2.default.isEmpty(base)) {
                        console.error('[FORM DROPZONE] No base path set.');
                        return;
                    }

                    var endpoint = base + '/' + file.id;
                    this.$http.delete(endpoint).then(success, error);
                }
            }
        }
    };
});

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(42), __webpack_require__(43), __webpack_require__(40), __webpack_require__(17)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./values'), require('./errors'), require('./props'), require('./vf_uid'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.values, global.errors, global.props, global.vf_uid);
        global.core = mod.exports;
    }
})(this, function (exports, _values, _errors, _props, _vf_uid) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _values2 = _interopRequireDefault(_values);

    var _errors2 = _interopRequireDefault(_errors);

    var _props2 = _interopRequireDefault(_props);

    var _vf_uid2 = _interopRequireDefault(_vf_uid);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        mixins: [_values2.default, _vf_uid2.default, _props2.default, _errors2.default]
    };
});

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(19), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('babel-runtime/core-js/json/stringify'), require('lodash'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.stringify, global.lodash);
        global.formData = mod.exports;
    }
})(this, function (exports, _stringify, _lodash) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _stringify2 = _interopRequireDefault(_stringify);

    var _lodash2 = _interopRequireDefault(_lodash);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        methods: {
            /**
                 * Convert a model to FormData for xhr submission
                 * @param  Object model     The Data to submit
                 * @param  String method    The method to spoof,  ["PUT", "POST"]
                 *                          Note: Make sure to POST the actual xhr request!
                 * @return FormData         FormData object
                 */
            transformModelToFormData: function transformModelToFormData(model, method) {
                var formData = new FormData();
                formData.append('_method', method || 'POST');

                _lodash2.default.forOwn(model, function (value, key) {
                    if (value instanceof FileList) {
                        _lodash2.default.each(value, function (file) {
                            formData.append(key + '[]', file);
                        });
                    } else if (value instanceof Array) {
                        var serialize = _lodash2.default.find(value, _lodash2.default.isObject) !== undefined;
                        _lodash2.default.each(value, function (raw) {
                            var aValue = serialize ? (0, _stringify2.default)(raw) : raw;
                            formData.append(key + '[]', aValue);
                        });
                    } else if (value instanceof Object) {
                        formData.append(key, (0, _stringify2.default)(value));
                    } else {
                        formData.append(key, value);
                    }
                });
                return formData;
            }
        }
    };
});

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(7);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(127), __webpack_require__(133), __webpack_require__(46)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./validation'), require('./vfconfig'), require('./vfalert'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.validation, global.vfconfig, global.vfalert);
    global.index = mod.exports;
  }
})(this, function (exports, _validation, _vfconfig, _vfalert) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'ValidatorStore', {
    enumerable: true,
    get: function () {
      return _validation.ValidatorStore;
    }
  });
  Object.defineProperty(exports, 'ValidationSyncMixin', {
    enumerable: true,
    get: function () {
      return _validation.ValidationSyncMixin;
    }
  });
  Object.defineProperty(exports, 'vfconfig', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_vfconfig).default;
    }
  });
  Object.defineProperty(exports, 'vfalert', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_vfalert).default;
    }
  });

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(23), __webpack_require__(3), __webpack_require__(132)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('babel-runtime/helpers/defineProperty'), require('lodash'), require('../data_sources/Rules'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.defineProperty, global.lodash, global.Rules);
        global.validation = mod.exports;
    }
})(this, function (exports, _defineProperty2, _lodash, _Rules) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ValidatorStore = exports.ValidationSyncMixin = undefined;

    var _defineProperty3 = _interopRequireDefault(_defineProperty2);

    var _lodash2 = _interopRequireDefault(_lodash);

    var _Rules2 = _interopRequireDefault(_Rules);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var lang = {
        REQUIRED: 'This field is required',
        NUMBER: 'The value must be a number',
        EMAIL: 'This must be a valid email address',
        URL: 'The value must be a valid, secure url (https://)',
        MATCH: 'Does not match',
        MAX: 'The value is to large',
        MIN: 'The value is too small',
        DATE: 'The value must be a valid date',
        IMAGE: 'This must be a valid image'
    };

    var ValidationSyncMixin = exports.ValidationSyncMixin = {
        mounted: function mounted() {
            console.warn('The vue-forms ValidationSyncMixin is no longer required and should be removed.');
        }
    };

    var ValidatorStore = exports.ValidatorStore = function ValidatorStore() {
        return {
            VueForms_validation_registry: {},

            VueForm_validation_internalRules: {
                required: function required(value) {
                    return _Rules2.default.required(value) || lang.REQUIRED;
                },

                number: function number(value) {
                    return _Rules2.default.number(value) || lang.NUMBER;
                },

                email: function email(value) {
                    return _Rules2.default.email(value) || lang.EMAIL;
                },

                url: function url(value) {
                    return _Rules2.default.url(value) || lang.URL;
                },

                date: function date(value) {
                    return _Rules2.default.date(value) || lang.DATE;
                },

                max: function max(_max) {
                    return _Rules2.default.max(_max) || lang.MAX;
                },

                min: function min(_min) {
                    return _Rules2.default.min(_min) || lang.MIN;
                },

                match: function match(compared, label) {
                    var response = lang.MATCH + ' ' + (label || 'other value');
                    return _Rules2.default.match(compared, label, response);
                }
            },

            // ----------------------------------------------------------
            // Computed
            // -------------------------------------------------------
            get registry() {
                return _lodash2.default.reduce(this.VueForms_validation_registry, function (registry, value, key) {
                    registry[key] = value === true;
                    return registry;
                }, {});
            },

            get failing() {
                return _lodash2.default.omitBy(this.registry, function (value, key) {
                    return value === true;
                });
            },

            get rules() {
                return this.VueForm_validation_internalRules;
            },

            get passes() {
                return _lodash2.default.isEmpty(this.failing);
            },

            get fails() {
                return !this.passes;
            },

            get inUse() {
                return !_lodash2.default.isEmpty(this.VueForms_validation_registry);
            },

            // ----------------------------------------------------------
            // Methods
            // -------------------------------------------------------
            clear: function clear() {
                this.VueForms_validation_registry = {};
            },
            update: function update(key, status) {
                if (!_lodash2.default.has(this.VueForms_validation_registry, key)) {
                    return this.register(key, status === true);
                }

                this.VueForms_validation_registry = _lodash2.default.assign({}, this.VueForms_validation_registry, (0, _defineProperty3.default)({}, key, status === true));
            },
            register: function register(key, status) {
                this.VueForms_validation_registry = _lodash2.default.assign({}, this.VueForms_validation_registry, (0, _defineProperty3.default)({}, key, status === true));
            },
            unregister: function unregister(key) {
                this.VueForms_validation_registry = _lodash2.default.omitBy(this.VueForms_validation_registry, function (value, aKey) {
                    return key === aKey;
                });
            },
            addRules: function addRules(rules) {
                var _this = this;

                _lodash2.default.forOwn(rules, function (rule, key) {
                    _this.addRule(key, value);
                });
            },
            addRule: function addRule(key, rule) {
                if (!_lodash2.default.isString(key)) {
                    console.error("[VFValidation] The First Parameter passed into addRule shuould be the key", { key: key, rule: rule });
                }
                if (!_lodash2.default.isFunction(rule)) {
                    console.error("[VFValidation] Rules must be functions", { key: key, rule: rule });
                }
                this.VueForm_validation_internalRules[key] = rule;
            },
            getStatus: function getStatus(key) {
                return _lodash2.default.get(this.registry, key) === true;
            }
        };
    };
});

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(129);
var $Object = __webpack_require__(7).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(8);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(12), 'Object', { defineProperty: __webpack_require__(11).f });


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(12) && !__webpack_require__(24)(function () {
  return Object.defineProperty(__webpack_require__(25)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(14);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3), __webpack_require__(18)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('lodash'), require('moment'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.lodash, global.moment);
        global.Rules = mod.exports;
    }
})(this, function (exports, _lodash, _moment) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.image = exports.match = exports.min = exports.max = exports.date = exports.url = exports.email = exports.number = exports.required = undefined;

    var _lodash2 = _interopRequireDefault(_lodash);

    var _moment2 = _interopRequireDefault(_moment);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    var HTTPS_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
    var IMAGE_REGEX = /\.(gif|jpe?g|tiff|png|svg)$/i;

    var required = exports.required = function required(value) {
        if (!_lodash2.default.isEmpty(value)) {
            return true;
        }
        return false;
    };

    var number = exports.number = function number(value) {
        return _lodash2.default.isNumber(value);
    };

    var email = exports.email = function email(value) {
        return EMAIL_REGEX.test(value);
    };

    var url = exports.url = function url(value) {
        return HTTPS_REGEX.test(value);
    };

    var date = exports.date = function date(value) {
        return (0, _moment2.default)(value).isValid();
    };

    var max = exports.max = function max(_max) {
        return function (value) {
            if (_lodash2.default.isString(value)) {
                return value.length <= _max;
            }
            if (_lodash2.default.isNumber(value)) {
                return value <= _max;
            }
            return true;
        };
    };

    var min = exports.min = function min(max) {
        return function (value) {
            if (_lodash2.default.isString(value) || _lodash2.default.isArray(value)) {
                return value.length > max;
            }
            if (_lodash2.default.isNumber(value)) {
                return value > max;
            }
            return true;
        };
    };

    var match = exports.match = function match(compared, label, response) {
        return function (value) {
            return compared === value || response || false;
        };
    };

    var image = exports.image = function image(value) {
        return _lodash2.default.isString(value) && IMAGE_REGEX.test(value);
    };

    exports.default = {
        required: required,
        number: number,
        email: email,
        date: date,
        url: url,
        match: match,
        min: min,
        max: max
    };
});

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(45), __webpack_require__(3), __webpack_require__(15)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('vue'), require('lodash'), require('../data_sources'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.vue, global.lodash, global.data_sources);
        global.vfconfig = mod.exports;
    }
})(this, function (exports, _vue, _lodash, _data_sources) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _vue2 = _interopRequireDefault(_vue);

    var _lodash2 = _interopRequireDefault(_lodash);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var DEFAULT_DATE_FORMAT = 'MM/DD/YYYY';
    var DEFAULT_TIME_FORMAT = 'h:mm A';

    exports.default = new _vue2.default({
        data: {
            headers: {},
            endpoints: {
                upload: null,
                files: null
            },

            format: {
                date: DEFAULT_DATE_FORMAT,
                time: DEFAULT_TIME_FORMAT,
                dateValueFormat: null // Format to return
            },

            dropzone: {
                maxFileSize: 10 // in MB
            },

            tinymce: {
                apiKey: null,
                config: {
                    plugins: ['advlist autolink lists link image charmap print preview hr anchor pagebreak', 'searchreplace wordcount visualchars', 'searchreplace visualblocks fullscreen textcolor contextmenu', 'insertdatetime media table contextmenu paste imagetools code'],
                    toolbar: 'undo redo | insert code  | bold italic | alignleft aligncenter alignright alignjustify |\n                    bullist numlist outdent indent | link image vf_image_picker | styleselect fontselect fontsizeselect forecolor | visualblocks code',
                    css: '',
                    menubar: true
                }
            }
        },

        computed: {
            fileTypes: function fileTypes() {
                return _data_sources.fileTypes;
            }
        },

        methods: {
            csfrToken: function csfrToken() {
                var token = document.head.querySelector('meta[name="csrf-token"]');
                if (token) return token.content;
            },
            filesEndpoint: function filesEndpoint(key) {
                var files = _lodash2.default.get(this, 'endpoints.files');
                if (_lodash2.default.isObject(files)) {
                    return _lodash2.default.get(files, key || 'default');
                } else if (_lodash2.default.isString(files)) {
                    return files;
                }
            },
            configure: function configure(options) {
                var headers = options.headers,
                    format = options.format,
                    endpoints = options.endpoints,
                    tinymce = options.tinymce;

                if (headers) {
                    this.headers = headers;
                }

                if (tinymce) {
                    console.log('Setting tinymce', tinymce);
                    this.tinymce = _lodash2.default.assign({}, this.tinymce, tinymce);
                }

                this.format.date = _lodash2.default.get(format, 'date', DEFAULT_DATE_FORMAT);
                this.format.time = _lodash2.default.get(format, 'time', DEFAULT_TIME_FORMAT);
                this.format.dateValueFormat = _lodash2.default.get(format, 'dateValueFormat', null);

                this.endpoints.upload = _lodash2.default.get(endpoints, 'upload', null);
                this.endpoints.files = _lodash2.default.get(endpoints, 'files', null);
            }
        }
    });
});

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.States = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        'AL': 'Alabama',
        'AK': 'Alaska',
        'AS': 'American Samoa',
        'AZ': 'Arizona',
        'AR': 'Arkansas',
        'CA': 'California',
        'CO': 'Colorado',
        'CT': 'Connecticut',
        'DE': 'Delaware',
        'DC': 'District Of Columbia',
        'FM': 'Federated States Of Micronesia',
        'FL': 'Florida',
        'GA': 'Georgia',
        'GU': 'Guam',
        'HI': 'Hawaii',
        'ID': 'Idaho',
        'IL': 'Illinois',
        'IN': 'Indiana',
        'IA': 'Iowa',
        'KS': 'Kansas',
        'KY': 'Kentucky',
        'LA': 'Louisiana',
        'ME': 'Maine',
        'MH': 'Marshall Islands',
        'MD': 'Maryland',
        'MA': 'Massachusetts',
        'MI': 'Michigan',
        'MN': 'Minnesota',
        'MS': 'Mississippi',
        'MO': 'Missouri',
        'MT': 'Montana',
        'NE': 'Nebraska',
        'NV': 'Nevada',
        'NH': 'New Hampshire',
        'NJ': 'New Jersey',
        'NM': 'New Mexico',
        'NY': 'New York',
        'NC': 'North Carolina',
        'ND': 'North Dakota',
        'MP': 'Northern Mariana Islands',
        'OH': 'Ohio',
        'OK': 'Oklahoma',
        'OR': 'Oregon',
        'PW': 'Palau',
        'PA': 'Pennsylvania',
        'PR': 'Puerto Rico',
        'RI': 'Rhode Island',
        'SC': 'South Carolina',
        'SD': 'South Dakota',
        'TN': 'Tennessee',
        'TX': 'Texas',
        'UT': 'Utah',
        'VT': 'Vermont',
        'VI': 'Virgin Islands',
        'VA': 'Virginia',
        'WA': 'Washington',
        'WV': 'West Virginia',
        'WI': 'Wisconsin',
        'WY': 'Wyoming',
        'AB': 'Alberta'
    };
});

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.CountryCodes = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = [{ 'text': 'United States', 'value': 'US' }, { 'text': 'Afghanistan', 'value': 'AF' }, { 'text': 'Åland Islands', 'value': 'AX' }, { 'text': 'Albania', 'value': 'AL' }, { 'text': 'Algeria', 'value': 'DZ' }, { 'text': 'American Samoa', 'value': 'AS' }, { 'text': 'AndorrA', 'value': 'AD' }, { 'text': 'Angola', 'value': 'AO' }, { 'text': 'Anguilla', 'value': 'AI' }, { 'text': 'Antarctica', 'value': 'AQ' }, { 'text': 'Antigua and Barbuda', 'value': 'AG' }, { 'text': 'Argentina', 'value': 'AR' }, { 'text': 'Armenia', 'value': 'AM' }, { 'text': 'Aruba', 'value': 'AW' }, { 'text': 'Australia', 'value': 'AU' }, { 'text': 'Austria', 'value': 'AT' }, { 'text': 'Azerbaijan', 'value': 'AZ' }, { 'text': 'Bahamas', 'value': 'BS' }, { 'text': 'Bahrain', 'value': 'BH' }, { 'text': 'Bangladesh', 'value': 'BD' }, { 'text': 'Barbados', 'value': 'BB' }, { 'text': 'Belarus', 'value': 'BY' }, { 'text': 'Belgium', 'value': 'BE' }, { 'text': 'Belize', 'value': 'BZ' }, { 'text': 'Benin', 'value': 'BJ' }, { 'text': 'Bermuda', 'value': 'BM' }, { 'text': 'Bhutan', 'value': 'BT' }, { 'text': 'Bolivia', 'value': 'BO' }, { 'text': 'Bosnia and Herzegovina', 'value': 'BA' }, { 'text': 'Botswana', 'value': 'BW' }, { 'text': 'Bouvet Island', 'value': 'BV' }, { 'text': 'Brazil', 'value': 'BR' }, { 'text': 'British Indian Ocean Territory', 'value': 'IO' }, { 'text': 'Brunei Darussalam', 'value': 'BN' }, { 'text': 'Bulgaria', 'value': 'BG' }, { 'text': 'Burkina Faso', 'value': 'BF' }, { 'text': 'Burundi', 'value': 'BI' }, { 'text': 'Cambodia', 'value': 'KH' }, { 'text': 'Cameroon', 'value': 'CM' }, { 'text': 'Canada', 'value': 'CA' }, { 'text': 'Cape Verde', 'value': 'CV' }, { 'text': 'Cayman Islands', 'value': 'KY' }, { 'text': 'Central African Republic', 'value': 'CF' }, { 'text': 'Chad', 'value': 'TD' }, { 'text': 'Chile', 'value': 'CL' }, { 'text': 'China', 'value': 'CN' }, { 'text': 'Christmas Island', 'value': 'CX' }, { 'text': 'Cocos (Keeling) Islands', 'value': 'CC' }, { 'text': 'Colombia', 'value': 'CO' }, { 'text': 'Comoros', 'value': 'KM' }, { 'text': 'Congo', 'value': 'CG' }, { 'text': 'Congo, The Democratic Republic of the', 'value': 'CD' }, { 'text': 'Cook Islands', 'value': 'CK' }, { 'text': 'Costa Rica', 'value': 'CR' }, { 'text': "Cote D'Ivoire", 'value': 'CI' }, { 'text': 'Croatia', 'value': 'HR' }, { 'text': 'Cuba', 'value': 'CU' }, { 'text': 'Cyprus', 'value': 'CY' }, { 'text': 'Czech Republic', 'value': 'CZ' }, { 'text': 'Denmark', 'value': 'DK' }, { 'text': 'Djibouti', 'value': 'DJ' }, { 'text': 'Dominica', 'value': 'DM' }, { 'text': 'Dominican Republic', 'value': 'DO' }, { 'text': 'Ecuador', 'value': 'EC' }, { 'text': 'Egypt', 'value': 'EG' }, { 'text': 'El Salvador', 'value': 'SV' }, { 'text': 'Equatorial Guinea', 'value': 'GQ' }, { 'text': 'Eritrea', 'value': 'ER' }, { 'text': 'Estonia', 'value': 'EE' }, { 'text': 'Ethiopia', 'value': 'ET' }, { 'text': 'Falkland Islands (Malvinas)', 'value': 'FK' }, { 'text': 'Faroe Islands', 'value': 'FO' }, { 'text': 'Fiji', 'value': 'FJ' }, { 'text': 'Finland', 'value': 'FI' }, { 'text': 'France', 'value': 'FR' }, { 'text': 'French Guiana', 'value': 'GF' }, { 'text': 'French Polynesia', 'value': 'PF' }, { 'text': 'French Southern Territories', 'value': 'TF' }, { 'text': 'Gabon', 'value': 'GA' }, { 'text': 'Gambia', 'value': 'GM' }, { 'text': 'Georgia', 'value': 'GE' }, { 'text': 'Germany', 'value': 'DE' }, { 'text': 'Ghana', 'value': 'GH' }, { 'text': 'Gibraltar', 'value': 'GI' }, { 'text': 'Greece', 'value': 'GR' }, { 'text': 'Greenland', 'value': 'GL' }, { 'text': 'Grenada', 'value': 'GD' }, { 'text': 'Guadeloupe', 'value': 'GP' }, { 'text': 'Guam', 'value': 'GU' }, { 'text': 'Guatemala', 'value': 'GT' }, { 'text': 'Guernsey', 'value': 'GG' }, { 'text': 'Guinea', 'value': 'GN' }, { 'text': 'Guinea-Bissau', 'value': 'GW' }, { 'text': 'Guyana', 'value': 'GY' }, { 'text': 'Haiti', 'value': 'HT' }, { 'text': 'Heard Island and Mcdonald Islands', 'value': 'HM' }, { 'text': 'Holy See (Vatican City State)', 'value': 'VA' }, { 'text': 'Honduras', 'value': 'HN' }, { 'text': 'Hong Kong', 'value': 'HK' }, { 'text': 'Hungary', 'value': 'HU' }, { 'text': 'Iceland', 'value': 'IS' }, { 'text': 'India', 'value': 'IN' }, { 'text': 'Indonesia', 'value': 'ID' }, { 'text': 'Iran, Islamic Republic Of', 'value': 'IR' }, { 'text': 'Iraq', 'value': 'IQ' }, { 'text': 'Ireland', 'value': 'IE' }, { 'text': 'Isle of Man', 'value': 'IM' }, { 'text': 'Israel', 'value': 'IL' }, { 'text': 'Italy', 'value': 'IT' }, { 'text': 'Jamaica', 'value': 'JM' }, { 'text': 'Japan', 'value': 'JP' }, { 'text': 'Jersey', 'value': 'JE' }, { 'text': 'Jordan', 'value': 'JO' }, { 'text': 'Kazakhstan', 'value': 'KZ' }, { 'text': 'Kenya', 'value': 'KE' }, { 'text': 'Kiribati', 'value': 'KI' }, { 'text': "Korea, Democratic People'S Republic of", 'value': 'KP' }, { 'text': 'Korea, Republic of', 'value': 'KR' }, { 'text': 'Kuwait', 'value': 'KW' }, { 'text': 'Kyrgyzstan', 'value': 'KG' }, { 'text': "Lao People'S Democratic Republic", 'value': 'LA' }, { 'text': 'Latvia', 'value': 'LV' }, { 'text': 'Lebanon', 'value': 'LB' }, { 'text': 'Lesotho', 'value': 'LS' }, { 'text': 'Liberia', 'value': 'LR' }, { 'text': 'Libyan Arab Jamahiriya', 'value': 'LY' }, { 'text': 'Liechtenstein', 'value': 'LI' }, { 'text': 'Lithuania', 'value': 'LT' }, { 'text': 'Luxembourg', 'value': 'LU' }, { 'text': 'Macao', 'value': 'MO' }, { 'text': 'Macedonia, The Former Yugoslav Republic of', 'value': 'MK' }, { 'text': 'Madagascar', 'value': 'MG' }, { 'text': 'Malawi', 'value': 'MW' }, { 'text': 'Malaysia', 'value': 'MY' }, { 'text': 'Maldives', 'value': 'MV' }, { 'text': 'Mali', 'value': 'ML' }, { 'text': 'Malta', 'value': 'MT' }, { 'text': 'Marshall Islands', 'value': 'MH' }, { 'text': 'Martinique', 'value': 'MQ' }, { 'text': 'Mauritania', 'value': 'MR' }, { 'text': 'Mauritius', 'value': 'MU' }, { 'text': 'Mayotte', 'value': 'YT' }, { 'text': 'Mexico', 'value': 'MX' }, { 'text': 'Micronesia, Federated States of', 'value': 'FM' }, { 'text': 'Moldova, Republic of', 'value': 'MD' }, { 'text': 'Monaco', 'value': 'MC' }, { 'text': 'Mongolia', 'value': 'MN' }, { 'text': 'Montserrat', 'value': 'MS' }, { 'text': 'Morocco', 'value': 'MA' }, { 'text': 'Mozambique', 'value': 'MZ' }, { 'text': 'Myanmar', 'value': 'MM' }, { 'text': 'Namibia', 'value': 'NA' }, { 'text': 'Nauru', 'value': 'NR' }, { 'text': 'Nepal', 'value': 'NP' }, { 'text': 'Netherlands', 'value': 'NL' }, { 'text': 'Netherlands Antilles', 'value': 'AN' }, { 'text': 'New Caledonia', 'value': 'NC' }, { 'text': 'New Zealand', 'value': 'NZ' }, { 'text': 'Nicaragua', 'value': 'NI' }, { 'text': 'Niger', 'value': 'NE' }, { 'text': 'Nigeria', 'value': 'NG' }, { 'text': 'Niue', 'value': 'NU' }, { 'text': 'Norfolk Island', 'value': 'NF' }, { 'text': 'Northern Mariana Islands', 'value': 'MP' }, { 'text': 'Norway', 'value': 'NO' }, { 'text': 'Oman', 'value': 'OM' }, { 'text': 'Pakistan', 'value': 'PK' }, { 'text': 'Palau', 'value': 'PW' }, { 'text': 'Palestinian Territory, Occupied', 'value': 'PS' }, { 'text': 'Panama', 'value': 'PA' }, { 'text': 'Papua New Guinea', 'value': 'PG' }, { 'text': 'Paraguay', 'value': 'PY' }, { 'text': 'Peru', 'value': 'PE' }, { 'text': 'Philippines', 'value': 'PH' }, { 'text': 'Pitcairn', 'value': 'PN' }, { 'text': 'Poland', 'value': 'PL' }, { 'text': 'Portugal', 'value': 'PT' }, { 'text': 'Puerto Rico', 'value': 'PR' }, { 'text': 'Qatar', 'value': 'QA' }, { 'text': 'Reunion', 'value': 'RE' }, { 'text': 'Romania', 'value': 'RO' }, { 'text': 'Russian Federation', 'value': 'RU' }, { 'text': 'RWANDA', 'value': 'RW' }, { 'text': 'Saint Helena', 'value': 'SH' }, { 'text': 'Saint Kitts and Nevis', 'value': 'KN' }, { 'text': 'Saint Lucia', 'value': 'LC' }, { 'text': 'Saint Pierre and Miquelon', 'value': 'PM' }, { 'text': 'Saint Vincent and the Grenadines', 'value': 'VC' }, { 'text': 'Samoa', 'value': 'WS' }, { 'text': 'San Marino', 'value': 'SM' }, { 'text': 'Sao Tome and Principe', 'value': 'ST' }, { 'text': 'Saudi Arabia', 'value': 'SA' }, { 'text': 'Senegal', 'value': 'SN' }, { 'text': 'Serbia and Montenegro', 'value': 'CS' }, { 'text': 'Seychelles', 'value': 'SC' }, { 'text': 'Sierra Leone', 'value': 'SL' }, { 'text': 'Singapore', 'value': 'SG' }, { 'text': 'Slovakia', 'value': 'SK' }, { 'text': 'Slovenia', 'value': 'SI' }, { 'text': 'Solomon Islands', 'value': 'SB' }, { 'text': 'Somalia', 'value': 'SO' }, { 'text': 'South Africa', 'value': 'ZA' }, { 'text': 'South Georgia and the South Sandwich Islands', 'value': 'GS' }, { 'text': 'Spain', 'value': 'ES' }, { 'text': 'Sri Lanka', 'value': 'LK' }, { 'text': 'Sudan', 'value': 'SD' }, { 'text': 'Suriname', 'value': 'SR' }, { 'text': 'Svalbard and Jan Mayen', 'value': 'SJ' }, { 'text': 'Swaziland', 'value': 'SZ' }, { 'text': 'Sweden', 'value': 'SE' }, { 'text': 'Switzerland', 'value': 'CH' }, { 'text': 'Syrian Arab Republic', 'value': 'SY' }, { 'text': 'Taiwan, Province of China', 'value': 'TW' }, { 'text': 'Tajikistan', 'value': 'TJ' }, { 'text': 'Tanzania, United Republic of', 'value': 'TZ' }, { 'text': 'Thailand', 'value': 'TH' }, { 'text': 'Timor-Leste', 'value': 'TL' }, { 'text': 'Togo', 'value': 'TG' }, { 'text': 'Tokelau', 'value': 'TK' }, { 'text': 'Tonga', 'value': 'TO' }, { 'text': 'Trinidad and Tobago', 'value': 'TT' }, { 'text': 'Tunisia', 'value': 'TN' }, { 'text': 'Turkey', 'value': 'TR' }, { 'text': 'Turkmenistan', 'value': 'TM' }, { 'text': 'Turks and Caicos Islands', 'value': 'TC' }, { 'text': 'Tuvalu', 'value': 'TV' }, { 'text': 'Uganda', 'value': 'UG' }, { 'text': 'Ukraine', 'value': 'UA' }, { 'text': 'United Arab Emirates', 'value': 'AE' }, { 'text': 'United Kingdom', 'value': 'GB' }, { 'text': 'United States Minor Outlying Islands', 'value': 'UM' }, { 'text': 'Uruguay', 'value': 'UY' }, { 'text': 'Uzbekistan', 'value': 'UZ' }, { 'text': 'Vanuatu', 'value': 'VU' }, { 'text': 'Venezuela', 'value': 'VE' }, { 'text': 'Viet Nam', 'value': 'VN' }, { 'text': 'Virgin Islands, British', 'value': 'VG' }, { 'text': 'Virgin Islands, U.S.', 'value': 'VI' }, { 'text': 'Wallis and Futuna', 'value': 'WF' }, { 'text': 'Western Sahara', 'value': 'EH' }, { 'text': 'Yemen', 'value': 'YE' }, { 'text': 'Zambia', 'value': 'ZM' }, { 'text': 'Zimbabwe', 'value': 'ZW' }];
});

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.DateFormats = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        LARAVEL_TIMESTAMP_FORMAT: 'Y-MM-DD HH:mm:ss'
    };
});

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('lodash'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.lodash);
        global.SupportedMimeTypes = mod.exports;
    }
})(this, function (exports, _lodash) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.any = exports.documents = exports.media = exports.video = exports.audio = exports.image = undefined;

    var _lodash2 = _interopRequireDefault(_lodash);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var image = exports.image = ['image/*'];

    var audio = exports.audio = ['audio/*', 'application/ogg'];

    var video = exports.video = ['video/*', 'application/ogg'];

    var media = exports.media = _lodash2.default.uniq(_lodash2.default.concat(image, audio, video));

    var documents = exports.documents = ['text/plain', 'application/pdf', 'application/xls', 'application/excel', 'application/vnd.ms-excel', 'application/vnd.ms-excel; charset=binary', 'application/msexcel', 'application/x-excel', 'application/x-msexcel', 'application/x-ms-excel', 'application/x-dos_ms_excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/docx', 'application/msword', 'application/vnd.ms-powerpoint'];

    var any = exports.any = _lodash2.default.uniq(_lodash2.default.concat(media, documents));

    exports.default = {
        image: image,
        media: media,
        documents: documents,
        any: any
    };
});

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(23), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require("babel-runtime/helpers/defineProperty"), require("lodash"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.defineProperty, global.lodash);
        global.SelectUtil = mod.exports;
    }
})(this, function (exports, _defineProperty2, _lodash) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _defineProperty3 = _interopRequireDefault(_defineProperty2);

    var _lodash2 = _interopRequireDefault(_lodash);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var isSelectedArrayByKey = function isSelectedArrayByKey(opt, value, localKey, foreignKey) {
        var alt = foreignKey || localKey;
        return !_lodash2.default.isEmpty(_lodash2.default.find(value, (0, _defineProperty3.default)({}, localKey, opt[alt])));
    };

    var isSelectedObjectByKey = function isSelectedObjectByKey(opt, value, localKey, foreignKey) {
        var alt = foreignKey || localKey;
        return _lodash2.default.get(opt, alt, false) === _lodash2.default.get(value, localKey, true);
    };

    var isSelectedByKey = function isSelectedByKey(localKey, foreignKey) {
        return function (opt, value) {
            if (_lodash2.default.isEmpty(value)) return false;
            return _lodash2.default.isArray(value) ? isSelectedArrayByKey(opt, value, localKey, foreignKey) : isSelectedObjectByKey(opt, value, localKey, foreignKey);
        };
    };

    var valueByKey = function valueByKey(key) {
        return function (opt, idx) {
            return _lodash2.default.get(opt, key);
        };
    };

    exports.default = {
        isSelected: {
            includes: function includes(opt, value) {
                return _lodash2.default.includes(value, opt);
            },

            is: function is(opt, value) {
                return _lodash2.default.isEqual(opt, value);
            },

            byKey: isSelectedByKey,
            byValue: isSelectedByKey("value"),
            byId: isSelectedByKey("id")
        },

        valueMap: {
            raw: function raw(opt, idx) {
                return opt;
            },
            byIndex: function byIndex(opt, idx) {
                return idx;
            },
            byKey: valueByKey,
            byValue: valueByKey('value'),
            byName: valueByKey('name'),
            byText: valueByKey('text'),
            byEmail: valueByKey('email'),
            byLabel: valueByKey('label')
        }
    };
});

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(140);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(141), __esModule: true };

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(142);
module.exports = __webpack_require__(7).Object.assign;


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(8);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(143) });


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(47);
var gOPS = __webpack_require__(147);
var pIE = __webpack_require__(148);
var toObject = __webpack_require__(33);
var IObject = __webpack_require__(48);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(24)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(21);
var toIObject = __webpack_require__(28);
var arrayIndexOf = __webpack_require__(145)(false);
var IE_PROTO = __webpack_require__(32)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(28);
var toLength = __webpack_require__(30);
var toAbsoluteIndex = __webpack_require__(146);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(31);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 147 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 148 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(150);
__webpack_require__(52);
__webpack_require__(157);
__webpack_require__(161);
__webpack_require__(168);
__webpack_require__(169);
module.exports = __webpack_require__(7).Promise;


/***/ }),
/* 150 */
/***/ (function(module, exports) {



/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(31);
var defined = __webpack_require__(29);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(154);
var descriptor = __webpack_require__(26);
var setToStringTag = __webpack_require__(35);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(10)(IteratorPrototype, __webpack_require__(6)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(9);
var dPs = __webpack_require__(155);
var enumBugKeys = __webpack_require__(51);
var IE_PROTO = __webpack_require__(32)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(25)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(55).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(11);
var anObject = __webpack_require__(9);
var getKeys = __webpack_require__(47);

module.exports = __webpack_require__(12) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(21);
var toObject = __webpack_require__(33);
var IE_PROTO = __webpack_require__(32)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(158);
var global = __webpack_require__(5);
var hide = __webpack_require__(10);
var Iterators = __webpack_require__(16);
var TO_STRING_TAG = __webpack_require__(6)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(159);
var step = __webpack_require__(160);
var Iterators = __webpack_require__(16);
var toIObject = __webpack_require__(28);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(53)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 159 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 160 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(54);
var global = __webpack_require__(5);
var ctx = __webpack_require__(13);
var classof = __webpack_require__(56);
var $export = __webpack_require__(8);
var isObject = __webpack_require__(14);
var aFunction = __webpack_require__(20);
var anInstance = __webpack_require__(162);
var forOf = __webpack_require__(163);
var speciesConstructor = __webpack_require__(60);
var task = __webpack_require__(61).set;
var microtask = __webpack_require__(165)();
var newPromiseCapabilityModule = __webpack_require__(36);
var perform = __webpack_require__(62);
var promiseResolve = __webpack_require__(63);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(6)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(166)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(35)($Promise, PROMISE);
__webpack_require__(167)(PROMISE);
Wrapper = __webpack_require__(7)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(64)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 162 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(13);
var call = __webpack_require__(57);
var isArrayIter = __webpack_require__(58);
var anObject = __webpack_require__(9);
var toLength = __webpack_require__(30);
var getIterFn = __webpack_require__(59);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 164 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var macrotask = __webpack_require__(61).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(22)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(10);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(5);
var core = __webpack_require__(7);
var dP = __webpack_require__(11);
var DESCRIPTORS = __webpack_require__(12);
var SPECIES = __webpack_require__(6)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(8);
var core = __webpack_require__(7);
var global = __webpack_require__(5);
var speciesConstructor = __webpack_require__(60);
var promiseResolve = __webpack_require__(63);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(8);
var newPromiseCapability = __webpack_require__(36);
var perform = __webpack_require__(62);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormText_vue__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormText_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormText_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormText_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormText_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1a8b69d0_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormText_vue__ = __webpack_require__(171);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormText_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1a8b69d0_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormText_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group vf-form-group",class:_vm.formClass},[(_vm.showLabel)?_c('label',{staticClass:"control-label vf-control-label",attrs:{"for":_vm.vf_uid}},[_vm._v(_vm._s(_vm.aLabel))]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"text",class:_vm.groupClass},[((_vm.type)==='checkbox')?_c('input',_vm._g(_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.aValue),expression:"aValue"}],staticClass:"form-control vf-form-control vf-input",class:_vm.inputClass,style:(_vm.inputStyle),attrs:{"required":_vm.required,"name":_vm.property,"id":_vm.vf_uid,"disabled":_vm.disabled || !_vm.enabled,"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.aValue)?_vm._i(_vm.aValue,null)>-1:(_vm.aValue)},on:{"blur":_vm.onBlur,"focus":_vm.onFocus,"keydown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"tab",9,$event.key,"Tab")){ return null; }return _vm.autocomplete($event)},"change":function($event){var $$a=_vm.aValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.aValue=$$a.concat([$$v]))}else{$$i>-1&&(_vm.aValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.aValue=$$c}}}},'input',_vm.$attrs,false),_vm.$listeners)):((_vm.type)==='radio')?_c('input',_vm._g(_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.aValue),expression:"aValue"}],staticClass:"form-control vf-form-control vf-input",class:_vm.inputClass,style:(_vm.inputStyle),attrs:{"required":_vm.required,"name":_vm.property,"id":_vm.vf_uid,"disabled":_vm.disabled || !_vm.enabled,"type":"radio"},domProps:{"checked":_vm._q(_vm.aValue,null)},on:{"blur":_vm.onBlur,"focus":_vm.onFocus,"keydown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"tab",9,$event.key,"Tab")){ return null; }return _vm.autocomplete($event)},"change":function($event){_vm.aValue=null}}},'input',_vm.$attrs,false),_vm.$listeners)):_c('input',_vm._g(_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.aValue),expression:"aValue"}],staticClass:"form-control vf-form-control vf-input",class:_vm.inputClass,style:(_vm.inputStyle),attrs:{"required":_vm.required,"name":_vm.property,"id":_vm.vf_uid,"disabled":_vm.disabled || !_vm.enabled,"type":_vm.type},domProps:{"value":(_vm.aValue)},on:{"blur":_vm.onBlur,"focus":_vm.onFocus,"keydown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"tab",9,$event.key,"Tab")){ return null; }return _vm.autocomplete($event)},"input":function($event){if($event.target.composing){ return; }_vm.aValue=$event.target.value}}},'input',_vm.$attrs,false),_vm.$listeners)),_vm._v(" "),(_vm.showAddon)?_c('span',{staticClass:"input-group-addon input-group-prepend vf-input-group-addon vf-date-addon"},[_c('span',{staticClass:"input-group-text"},[_vm._t("addon",[_c('span',{staticClass:"fa",class:_vm.lockClass,on:{"click":function($event){_vm.enabled = !_vm.enabled}}})])],2)]):_vm._e(),_vm._v(" "),(_vm.displayErrors)?_c('form-errors',_vm._b({},'form-errors',{errors: _vm.errors, warning: _vm.warning, property: _vm.property},false)):_vm._e(),_vm._v(" "),(!!_vm.$slots['help'])?_c('p',{staticClass:"help-block vf-help-block"},[_c('small',[_vm._t("help")],2)]):_vm._e()],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormFile_vue__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormFile_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormFile_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormFile_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormFile_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_110289cc_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormFile_vue__ = __webpack_require__(173);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormFile_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_110289cc_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormFile_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 173 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group vf-form-group",class:_vm.formClass},[_c('label',{staticClass:"control-label vf-control-label",attrs:{"for":_vm.vf_uid}},[_vm._v(_vm._s(_vm.aLabel))]),_vm._v(" "),_c('input',_vm._g(_vm._b({class:_vm.inputClass,style:(_vm.inputStyle),attrs:{"name":_vm.property,"id":_vm.property,"multiple":_vm.multiple,"accept":_vm._accept,"type":"file"},on:{"change":function($event){_vm.processFile($event)}}},'input',_vm.$attrs,false),_vm.$listeners)),_vm._v(" "),(_vm.showAttached)?_c('small',[_vm._v("Current "+_vm._s(_vm.pluralized)+": "+_vm._s(_vm.currentFile))]):_vm._e(),_vm._v(" "),(_vm.displayErrors)?_c('form-errors',_vm._b({},'form-errors',{errors: _vm.errors, warning: _vm.warning, property: _vm.property},false)):_vm._e(),_vm._v(" "),(!!_vm.$slots['help'])?_c('p',{staticClass:"help-block vf-help-block"},[_c('small',[_vm._t("help")],2)]):_vm._e()],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 174 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormTextMask_vue__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormTextMask_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormTextMask_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormTextMask_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormTextMask_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_230161ed_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormTextMask_vue__ = __webpack_require__(176);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormTextMask_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_230161ed_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormTextMask_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 175 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_175__;

/***/ }),
/* 176 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group vf-form-group",class:_vm.formClass},[_c('label',{attrs:{"for":_vm.vf_uid}},[_vm._v(_vm._s(_vm.aLabel)+": ")]),_vm._v(" "),_c('div',{staticClass:"text",class:_vm.groupClass},[_c('the-mask',_vm._g(_vm._b({staticClass:"form-control vf-form-control",class:_vm.inputClass,style:(_vm.inputStyle),attrs:{"id":_vm.vf_uid,"name":_vm.property,"mask":_vm.mask,"disabled":_vm.disabled || !_vm.enabled},on:{"keydown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"tab",9,$event.key,"Tab")){ return null; }return _vm.autocomplete($event)}},model:{value:(_vm.aValue),callback:function ($$v) {_vm.aValue=$$v},expression:"aValue"}},'the-mask',_vm.$attrs,false),_vm.$listeners)),_vm._v(" "),(_vm.showAddon)?_c('span',{staticClass:"input-group-addon vf-input-group-addon"},[_vm._t("addon",[_c('span',{staticClass:"fa",class:_vm.lockClass,on:{"click":function($event){_vm.enabled = !_vm.enabled}}})])],2):_vm._e(),_vm._v(" "),(!!_vm.$slots['help'])?_c('p',{staticClass:"help-block vf-help-block"},[_c('small',[_vm._t("help")],2)]):_vm._e()],1),_vm._v(" "),(_vm.displayErrors)?_c('form-errors',_vm._b({},'form-errors',{errors: _vm.errors, warning: _vm.warning, property: _vm.property},false)):_vm._e()],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 177 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormNumber_vue__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormNumber_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormNumber_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormNumber_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormNumber_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_68038dd1_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormNumber_vue__ = __webpack_require__(178);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormNumber_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_68038dd1_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormNumber_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 178 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form-text',_vm._g(_vm._b({class:_vm.inputClass,style:(_vm.inputStyle),attrs:{"min":_vm.min,"max":_vm.max,"errors":_vm.errors,"property":_vm.property,"label":_vm.label,"type":"number","number":""},model:{value:(_vm.aValue),callback:function ($$v) {_vm.aValue=_vm._n($$v)},expression:"aValue"}},'form-text',_vm.$attrs,false),_vm.$listeners))}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 179 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormPassword_vue__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormPassword_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormPassword_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormPassword_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormPassword_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_be17173e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormPassword_vue__ = __webpack_require__(180);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormPassword_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_be17173e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormPassword_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group vf-form-group",class:_vm.formClass},[_c('label',{staticClass:"control-label vf-control-label",attrs:{"for":_vm.vf_uid}},[_vm._v(_vm._s(_vm.aLabel)+" ")]),_vm._v(" "),_c('input',_vm._g(_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.aValue),expression:"aValue"}],staticClass:"form-control vf-form-control",class:_vm.inputClass,style:(_vm.inputStyle),attrs:{"id":_vm.vf_uid,"disabled":_vm.disabled,"type":"password"},domProps:{"value":(_vm.aValue)},on:{"blur":_vm.onBlur,"focus":_vm.onFocus,"input":function($event){if($event.target.composing){ return; }_vm.aValue=$event.target.value}}},'input',_vm.$attrs,false),_vm.$listeners)),_vm._v(" "),(_vm.displayErrors)?_c('form-errors',_vm._b({},'form-errors',{errors: _vm.errors, warning: _vm.warning, property: _vm.property},false)):_vm._e(),_vm._v(" "),(!!_vm.$slots['help'])?_c('p',{staticClass:"help-block vf-help-block"},[_c('small',[_vm._t("help")],2)]):_vm._e()],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 181 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSlider_vue__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSlider_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSlider_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSlider_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSlider_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d51aca18_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormSlider_vue__ = __webpack_require__(184);
function injectStyle (ssrContext) {
  __webpack_require__(182)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-d51aca18"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSlider_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d51aca18_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormSlider_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(183);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("8bc75432", content, true, {});

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".switch-label[data-v-d51aca18]{padding-right:5px}.switch-toggle[data-v-d51aca18]{position:absolute;margin-left:-9999px;visibility:hidden}.switch-toggle+label[data-v-d51aca18]{display:block;position:relative;cursor:pointer;outline:none;user-select:none}input.switch-toggle-round+label[data-v-d51aca18]{padding:2px;width:30px;height:15px;background-color:#ddd;border-radius:15px}input.switch-toggle-round+label[data-v-d51aca18]:after,input.switch-toggle-round+label[data-v-d51aca18]:before{display:block;position:absolute;top:1px;left:1px;bottom:1px;content:\"\"}input.switch-toggle-round+label[data-v-d51aca18]:before{right:1px;background-color:#f1f1f1;border-radius:15px;transition:background .4s}input.switch-toggle-round+label[data-v-d51aca18]:after{width:14px;background-color:#fff;border-radius:100%;box-shadow:0 2px 5px rgba(0,0,0,.3);transition:margin .4s}input.switch-toggle-round:checked+label[data-v-d51aca18]:before{background-color:#468cc8}input.switch-toggle-round:checked+label[data-v-d51aca18]:after{margin-left:15px}", ""]);

// exports


/***/ }),
/* 184 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('label',{staticClass:"switch-label pull-left"},[_vm._v(_vm._s(_vm.aLabel))]),_vm._v(" "),_c('div',{staticClass:"switch pull-left"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.aValue),expression:"aValue"}],staticClass:"switch-toggle switch-toggle-round",attrs:{"id":'switch-' + _vm.property,"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.aValue)?_vm._i(_vm.aValue,null)>-1:(_vm.aValue)},on:{"change":[function($event){var $$a=_vm.aValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.aValue=$$a.concat([$$v]))}else{$$i>-1&&(_vm.aValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.aValue=$$c}},_vm.toggle]}}),_vm._v(" "),_c('label',{attrs:{"for":'switch-' + _vm.property}})]),_vm._v(" "),_c('div',{staticClass:"clearfix"})])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 185 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormCheckbox_vue__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormCheckbox_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormCheckbox_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormCheckbox_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormCheckbox_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2eb704b4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormCheckbox_vue__ = __webpack_require__(186);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormCheckbox_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2eb704b4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormCheckbox_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 186 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group vf-form-group form-check vf-form-check",class:_vm.formClass},[_c('div',{staticClass:"checkbox vf-checkbox"},[_c('label',{staticClass:"control-label form-check-label vf-control-label",attrs:{"for":_vm.vf_uid}},[_c('input',_vm._g(_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.aValue),expression:"aValue"}],staticClass:"form-check-input vf-form-check-input",class:_vm.inputClass,style:(_vm.inputStyle),attrs:{"id":_vm.vf_uid,"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.aValue)?_vm._i(_vm.aValue,null)>-1:(_vm.aValue)},on:{"change":function($event){var $$a=_vm.aValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.aValue=$$a.concat([$$v]))}else{$$i>-1&&(_vm.aValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.aValue=$$c}}}},'input',_vm.$attrs,false),_vm.$listeners)),_vm._v(_vm._s(_vm.aLabel)+"\n        ")])]),_vm._v(" "),(_vm.displayErrors)?_c('form-errors',_vm._b({},'form-errors',{errors: _vm.errors, warning: _vm.warning, property: _vm.property},false)):_vm._e(),_vm._v(" "),(!!_vm.$slots['help'])?_c('p',{staticClass:"help-block vf-help-block"},[_c('small',[_vm._t("help")],2)]):_vm._e()],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 187 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSelect_vue__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSelect_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSelect_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSelect_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSelect_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5d277c4a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormSelect_vue__ = __webpack_require__(188);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSelect_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5d277c4a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormSelect_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 188 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group vf-form-group",class:_vm.formClass},[(_vm.label)?_c('label',{staticClass:"control-label vf-control-label",attrs:{"for":_vm.vf_uid}},[_vm._v(_vm._s(_vm.aLabel))]):_vm._e(),_vm._v(" "),_c('select',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.aValue),expression:"aValue"}],staticClass:"form-control",attrs:{"id":_vm.vf_uid,"name":_vm.property},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.aValue=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},'select',_vm.$attrs,false),[(!_vm.required)?_c('option',{domProps:{"value":null}},[_vm._v(_vm._s(_vm.placeholder || "Please Choose..."))]):_vm._e(),_vm._v(" "),_vm._l((_vm.options),function(opt,idx){return _c('option',{key:idx,domProps:{"value":_vm.optionValue(opt, idx)}},[_vm._v("\n            "+_vm._s(_vm.optionDescription(opt))+"\n        ")])})],2),_vm._v(" "),(_vm.displayErrors)?_c('form-errors',_vm._b({},'form-errors',{errors: _vm.errors, warning: _vm.warning, property: _vm.property},false)):_vm._e(),_vm._v(" "),(!!_vm.$slots['help'])?_c('p',{staticClass:"help-block vf-help-block"},[_c('small',[_vm._t("help")],2)]):_vm._e()],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 189 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSelectMany_vue__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSelectMany_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSelectMany_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSelectMany_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSelectMany_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7040e46d_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormSelectMany_vue__ = __webpack_require__(192);
function injectStyle (ssrContext) {
  __webpack_require__(190)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7040e46d"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSelectMany_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7040e46d_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormSelectMany_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(191);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("2f60208d", content, true, {});

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".dropdown-menu[data-v-7040e46d]{width:100%}.dropdown-toggle[data-v-7040e46d]{min-width:208px;max-width:100%;overflow-y:hidden;text-overflow:ellipsis;white-space:nowrap}.dropdown-content-wrapper[data-v-7040e46d]{max-height:50vh;overflow-y:scroll}.dropdown .bs-caret .fa-caret-down[data-v-7040e46d]{transition:transform .5s ease;transform:rotate(-90deg)}.dropdown.show .bs-caret .fa-caret-down[data-v-7040e46d]{transform:rotate(0deg)}.btn-left[data-v-7040e46d]{text-align:left}.dropdown-item[data-v-7040e46d]{width:100%;padding:0;clear:both;text-align:inherit;white-space:nowrap;background-color:transparent;border:0}.dropdown-item .fa-check.pull-right[data-v-7040e46d]{float:right}.dropdown-item[data-v-7040e46d]:hover{background-color:#006400}.dropdown-item:hover>label>span>i.fa-check[data-v-7040e46d],.dropdown-item:hover>label[data-v-7040e46d]{color:#fff!important}.dropdown-item:hover.selected[data-v-7040e46d]{background-color:darkred}.dropdown-item .d-none[data-v-7040e46d]{display:none}.dropdown-item>label[data-v-7040e46d]{cursor:pointer;padding:.25rem 1.5rem;width:100%;heigh:100%}.form-group.search[data-v-7040e46d]{padding:5px}", ""]);

// exports


/***/ }),
/* 192 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group vf-form-group",class:_vm.formClass},[(_vm.label)?_c('label',{staticClass:"control-label vf-control-label"},[_vm._v(_vm._s(_vm.aLabel))]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"dropdown"},[_c('button',{staticClass:"btn btn-outline-secondary btn-default btn-block btn-left",attrs:{"id":_vm.vf_uid,"type":"button","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[_vm._t("selected",[_vm._v(_vm._s(_vm.selectedText))],null,{value: _vm.value,}),_vm._v(" "),_c('span',{staticClass:"bs-caret pull-right"},[_vm._t("caret",[_c('i',{staticClass:"fa fa-caret-down",attrs:{"aria-hidden":"true"}})])],2)],2),_vm._v(" "),_c('div',{staticClass:"dropdown-menu",attrs:{"aria-labelledby":_vm.vf_uid}},[(_vm.search)?_c('div',{staticClass:"form-group search px-1"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.searchString),expression:"searchString"}],staticClass:"form-control",attrs:{"placeholder":"Search..."},domProps:{"value":(_vm.searchString)},on:{"input":function($event){if($event.target.composing){ return; }_vm.searchString=$event.target.value}}})]):_vm._e(),_vm._v(" "),_c('form',{staticClass:"dropdown-content-wrapper"},_vm._l((_vm.$_filtered),function(opt,idx){return _c('div',{key:idx,staticClass:"dropdown-item",class:_vm.optItemClass(opt, idx)},[_c('label',{class:_vm.optLabelClass(opt, idx),attrs:{"for":("vf-sel-" + _vm.vf_uid + "-" + idx)}},[((_vm.$_inputType)==='checkbox')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.aValue),expression:"aValue"}],staticClass:"d-none",attrs:{"id":("vf-sel-" + _vm.vf_uid + "-" + idx),"name":_vm.property,"type":"checkbox"},domProps:{"value":_vm.optionValue(opt, idx),"checked":Array.isArray(_vm.aValue)?_vm._i(_vm.aValue,_vm.optionValue(opt, idx))>-1:(_vm.aValue)},on:{"change":function($event){var $$a=_vm.aValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=_vm.optionValue(opt, idx),$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.aValue=$$a.concat([$$v]))}else{$$i>-1&&(_vm.aValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.aValue=$$c}}}}):((_vm.$_inputType)==='radio')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.aValue),expression:"aValue"}],staticClass:"d-none",attrs:{"id":("vf-sel-" + _vm.vf_uid + "-" + idx),"name":_vm.property,"type":"radio"},domProps:{"value":_vm.optionValue(opt, idx),"checked":_vm._q(_vm.aValue,_vm.optionValue(opt, idx))},on:{"change":function($event){_vm.aValue=_vm.optionValue(opt, idx)}}}):_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.aValue),expression:"aValue"}],staticClass:"d-none",attrs:{"id":("vf-sel-" + _vm.vf_uid + "-" + idx),"name":_vm.property,"type":_vm.$_inputType},domProps:{"value":_vm.optionValue(opt, idx),"value":(_vm.aValue)},on:{"input":function($event){if($event.target.composing){ return; }_vm.aValue=$event.target.value}}}),_vm._v(" "),_vm._t("option-label",[_c('span',[_vm._v(_vm._s(_vm.optionDescription(opt)))])],null,{
                            option: opt, selected: _vm.$_isSelected(opt, idx)
                        }),_vm._v(" "),_c('transition',{attrs:{"name":"fade","duration":0.5}},[(_vm.$_isSelected(opt, idx))?_c('i',{staticClass:"fa fa-check pull-right",attrs:{"aria-hidden":"true"}}):_vm._e()])],2)])}))])]),_vm._v(" "),(_vm.displayErrors)?_c('form-errors',_vm._b({},'form-errors',{errors: _vm.errors, warning: _vm.warning, property: _vm.property},false)):_vm._e(),_vm._v(" "),(!!_vm.$slots['help'])?_c('p',{staticClass:"help-block vf-help-block"},[_c('small',[_vm._t("help")],2)]):_vm._e()],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 193 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormRadioButton_vue__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormRadioButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormRadioButton_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormRadioButton_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormRadioButton_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2f59e906_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormRadioButton_vue__ = __webpack_require__(194);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormRadioButton_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2f59e906_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormRadioButton_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 194 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group vf-form-group"},[_c('label',{staticClass:"control-label vf-control-label",attrs:{"for":_vm.property}},[_vm._v(_vm._s(_vm.aLabel))]),_vm._v(" "),(!_vm.inline)?_c('div',{staticClass:"form-group-radio"},_vm._l((_vm.options),function(opt,idx){return _c('div',{key:idx,staticClass:"radio"},[_c('label',{attrs:{"for":(_vm.vf_uid + "-" + idx)}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.aValue),expression:"aValue"}],attrs:{"name":_vm.property,"id":(_vm.vf_uid + "-" + idx),"type":"radio"},domProps:{"value":_vm.optionValue(opt, idx),"checked":_vm._q(_vm.aValue,_vm.optionValue(opt, idx))},on:{"change":function($event){_vm.aValue=_vm.optionValue(opt, idx)}}}),_vm._v("\n                "+_vm._s(_vm.optionDescription(opt))+"\n            ")]),_vm._v(" "),_c('br')])})):_c('div',{staticClass:"form-group-radio"},_vm._l((_vm.options),function(opt,idx){return _c('label',{key:idx,staticClass:"control-label radio-inline",attrs:{"for":(_vm.vf_uid + "-" + idx)}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.aValue),expression:"aValue"}],attrs:{"name":_vm.property,"id":(_vm.vf_uid + "-" + idx),"type":"radio"},domProps:{"value":_vm.optionValue(opt, idx),"checked":_vm._q(_vm.aValue,_vm.optionValue(opt, idx))},on:{"change":function($event){_vm.aValue=_vm.optionValue(opt, idx)}}}),_vm._v("\n            "+_vm._s(_vm.optionDescription(opt))+"\n        ")])})),_vm._v(" "),(_vm.displayErrors)?_c('form-errors',_vm._b({},'form-errors',{errors: _vm.errors, warning: _vm.warning, property: _vm.property},false)):_vm._e(),_vm._v(" "),(!!_vm.$slots['help'])?_c('p',{staticClass:"help-block vf-help-block"},[_c('small',[_vm._t("help")],2)]):_vm._e()],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 195 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormCheckboxGroup_vue__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormCheckboxGroup_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormCheckboxGroup_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormCheckboxGroup_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormCheckboxGroup_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6599680a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormCheckboxGroup_vue__ = __webpack_require__(196);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormCheckboxGroup_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6599680a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormCheckboxGroup_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 196 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group vf-form-group"},[_c('label',{staticClass:"d-block",attrs:{"for":_vm.property}},[_vm._v(_vm._s(_vm.aLabel))]),_vm._v(" "),(!_vm.inline)?_c('div',{staticClass:"form-group-checkbox vf-form-group-checkbox"},_vm._l((_vm.options),function(opt,idx){return _c('div',{key:idx,staticClass:"checkbox form-check vf-checkbox"},[_c('label',{staticClass:"control-label form-check-label vf-control-label",attrs:{"for":(_vm.vf_uid + "-" + idx)}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.aValue),expression:"aValue"}],staticClass:"form-check-input",attrs:{"name":_vm.property,"id":(_vm.vf_uid + "-" + idx),"type":"checkbox"},domProps:{"value":_vm.optionValue(opt, idx),"checked":Array.isArray(_vm.aValue)?_vm._i(_vm.aValue,_vm.optionValue(opt, idx))>-1:(_vm.aValue)},on:{"change":function($event){var $$a=_vm.aValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=_vm.optionValue(opt, idx),$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.aValue=$$a.concat([$$v]))}else{$$i>-1&&(_vm.aValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.aValue=$$c}}}}),_vm._v("\n                "+_vm._s(_vm.optionDescription(opt))+"\n            ")]),_vm._v(" "),_c('br')])})):_c('div',{staticClass:"form-group-checkbox form-check-inline"},_vm._l((_vm.options),function(opt,idx){return _c('label',{key:idx,staticClass:"checkbox-inline control-label form-check-label mr-2",attrs:{"for":(_vm.vf_uid + "-" + idx)}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.aValue),expression:"aValue"}],staticClass:"form-check-input",attrs:{"name":_vm.property,"id":(_vm.vf_uid + "-" + idx),"type":"checkbox"},domProps:{"value":_vm.optionValue(opt, idx),"checked":Array.isArray(_vm.aValue)?_vm._i(_vm.aValue,_vm.optionValue(opt, idx))>-1:(_vm.aValue)},on:{"change":function($event){var $$a=_vm.aValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=_vm.optionValue(opt, idx),$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.aValue=$$a.concat([$$v]))}else{$$i>-1&&(_vm.aValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.aValue=$$c}}}}),_vm._v("\n            "+_vm._s(_vm.optionDescription(opt))+"\n        ")])})),_vm._v(" "),(_vm.displayErrors)?_c('form-errors',_vm._b({},'form-errors',{errors: _vm.errors, warning: _vm.warning, property: _vm.property},false)):_vm._e(),_vm._v(" "),(!!_vm.$slots['help'])?_c('p',{staticClass:"help-block vf-help-block"},[_c('small',[_vm._t("help")],2)]):_vm._e()],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 197 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSegmentedControl_vue__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSegmentedControl_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSegmentedControl_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSegmentedControl_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSegmentedControl_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7a78063e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormSegmentedControl_vue__ = __webpack_require__(201);
function injectStyle (ssrContext) {
  __webpack_require__(198)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7a78063e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSegmentedControl_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7a78063e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormSegmentedControl_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(199);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("baf1f6f8", content, true, {});

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports
exports.i(__webpack_require__(200), "");

// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".segmented-control{width:100%;position:relative;display:inline-block;border:1px solid currentColor;font-style:normal;font-weight:400;text-decoration:none;overflow:hidden;margin:.8em auto;-moz-border-radius:2px;-webkit-border-radius:2px;border-radius:2px;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;-moz-user-select:-moz-none;-ms-user-select:none;-webkit-user-select:none;user-select:none;-moz-transition-duration:.1s;-o-transition-duration:.1s;-webkit-transition-duration:.1s;transition-duration:.1s;-moz-transition-timing-function:cubic-bezier(.445,.05,.55,.95);-o-transition-timing-function:cubic-bezier(.445,.05,.55,.95);-webkit-transition-timing-function:cubic-bezier(.445,.05,.55,.95);transition-timing-function:cubic-bezier(.445,.05,.55,.95);-webkit-tap-highlight-color:transparent}.segmented-control>input{position:absolute;left:-10000px;opacity:0}.segmented-control>input[type=checkbox]~label{-moz-transition-duration:0;-o-transition-duration:0;-webkit-transition-duration:0;transition-duration:0}.segmented-control>input[type=checkbox]~label:before{opacity:0}.segmented-control>input:disabled:first-child ~ label:nth-of-type(1){opacity:.3;cursor:not-allowed}.segmented-control>input:first-child:checked ~ label:nth-of-type(1):after,.segmented-control>input:first-child:checked ~ label:nth-of-type(1):before{opacity:1}.segmented-control>input:first-child:checked ~ label:first-of-type:nth-last-of-type(1):after,.segmented-control>input:first-child:checked ~ label:first-of-type:nth-last-of-type(1):before,.segmented-control>input:first-child:checked ~ label:first-of-type:nth-last-of-type(1) ~ label:after,.segmented-control>input:first-child:checked ~ label:first-of-type:nth-last-of-type(1) ~ label:before,.segmented-control>input:first-child:checked ~ label:first-of-type:nth-last-of-type(2):after,.segmented-control>input:first-child:checked ~ label:first-of-type:nth-last-of-type(2):before,.segmented-control>input:first-child:checked ~ label:first-of-type:nth-last-of-type(2) ~ label:after,.segmented-control>input:first-child:checked ~ label:first-of-type:nth-last-of-type(2) ~ label:before,.segmented-control>input:first-child:checked ~ label:first-of-type:nth-last-of-type(3):after,.segmented-control>input:first-child:checked ~ label:first-of-type:nth-last-of-type(3):before,.segmented-control>input:first-child:checked ~ label:first-of-type:nth-last-of-type(3) ~ label:after,.segmented-control>input:first-child:checked ~ label:first-of-type:nth-last-of-type(3) ~ label:before,.segmented-control>input:first-child:checked ~ label:first-of-type:nth-last-of-type(4):after,.segmented-control>input:first-child:checked ~ label:first-of-type:nth-last-of-type(4):before,.segmented-control>input:first-child:checked ~ label:first-of-type:nth-last-of-type(4) ~ label:after,.segmented-control>input:first-child:checked ~ label:first-of-type:nth-last-of-type(4) ~ label:before{left:0}.segmented-control>input:disabled:nth-child(2)~label:nth-of-type(2){opacity:.3;cursor:not-allowed}.segmented-control>input:nth-child(2):checked~label:nth-of-type(2):after,.segmented-control>input:nth-child(2):checked~label:nth-of-type(2):before{opacity:1}.segmented-control>input:nth-child(2):checked~label:first-of-type:nth-last-of-type(2):after,.segmented-control>input:nth-child(2):checked~label:first-of-type:nth-last-of-type(2):before,.segmented-control>input:nth-child(2):checked~label:first-of-type:nth-last-of-type(2)~label:after,.segmented-control>input:nth-child(2):checked~label:first-of-type:nth-last-of-type(2)~label:before{left:50%}.segmented-control>input:nth-child(2):checked~label:first-of-type:nth-last-of-type(3):after,.segmented-control>input:nth-child(2):checked~label:first-of-type:nth-last-of-type(3):before,.segmented-control>input:nth-child(2):checked~label:first-of-type:nth-last-of-type(3)~label:after,.segmented-control>input:nth-child(2):checked~label:first-of-type:nth-last-of-type(3)~label:before{left:33.33333%}.segmented-control>input:nth-child(2):checked~label:first-of-type:nth-last-of-type(4):after,.segmented-control>input:nth-child(2):checked~label:first-of-type:nth-last-of-type(4):before,.segmented-control>input:nth-child(2):checked~label:first-of-type:nth-last-of-type(4)~label:after,.segmented-control>input:nth-child(2):checked~label:first-of-type:nth-last-of-type(4)~label:before{left:25%}.segmented-control>input:disabled:nth-child(3)~label:nth-of-type(3){opacity:.3;cursor:not-allowed}.segmented-control>input:nth-child(3):checked~label:nth-of-type(3):after,.segmented-control>input:nth-child(3):checked~label:nth-of-type(3):before{opacity:1}.segmented-control>input:nth-child(3):checked~label:first-of-type:nth-last-of-type(3):after,.segmented-control>input:nth-child(3):checked~label:first-of-type:nth-last-of-type(3):before,.segmented-control>input:nth-child(3):checked~label:first-of-type:nth-last-of-type(3)~label:after,.segmented-control>input:nth-child(3):checked~label:first-of-type:nth-last-of-type(3)~label:before{left:66.66667%}.segmented-control>input:nth-child(3):checked~label:first-of-type:nth-last-of-type(4):after,.segmented-control>input:nth-child(3):checked~label:first-of-type:nth-last-of-type(4):before,.segmented-control>input:nth-child(3):checked~label:first-of-type:nth-last-of-type(4)~label:after,.segmented-control>input:nth-child(3):checked~label:first-of-type:nth-last-of-type(4)~label:before{left:50%}.segmented-control>input:disabled:nth-child(4)~label:nth-of-type(4){opacity:.3;cursor:not-allowed}.segmented-control>input:nth-child(4):checked~label:nth-of-type(4):after,.segmented-control>input:nth-child(4):checked~label:nth-of-type(4):before{opacity:1}.segmented-control>input:nth-child(4):checked~label:first-of-type:nth-last-of-type(4):after,.segmented-control>input:nth-child(4):checked~label:first-of-type:nth-last-of-type(4):before,.segmented-control>input:nth-child(4):checked~label:first-of-type:nth-last-of-type(4)~label:after,.segmented-control>input:nth-child(4):checked~label:first-of-type:nth-last-of-type(4)~label:before{left:75%}.segmented-control>label{display:inline-block;padding:0 .71em;cursor:pointer;float:left;line-height:2em;font-style:inherit;font-weight:inherit;text-decoration:inherit;-moz-transition-property:none;-o-transition-property:none;-webkit-transition-property:none;transition-property:none;-moz-transition-duration:inherit;-o-transition-duration:inherit;-webkit-transition-duration:inherit;transition-duration:inherit;-moz-transition-timing-function:inherit;-o-transition-timing-function:inherit;-webkit-transition-timing-function:inherit;transition-timing-function:inherit}.segmented-control>label:after,.segmented-control>label:before{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none}.segmented-control>label:after{color:#fff;content:attr(data-value);text-align:center;padding:inherit;z-index:10;font-style:inherit;text-decoration:inherit;font-weight:inherit;opacity:0;-moz-transition-property:opacity,left;-o-transition-property:opacity,left;-webkit-transition-property:opacity,left;transition-property:opacity,left;-moz-transition-duration:inherit;-o-transition-duration:inherit;-webkit-transition-duration:inherit;transition-duration:inherit;-moz-transition-timing-function:inherit;-o-transition-timing-function:inherit;-webkit-transition-timing-function:inherit;transition-timing-function:inherit}.segmented-control>label,.segmented-control>label:after{text-align:center;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}.segmented-control>label:before{content:\"\";color:inherit;background:currentColor;-moz-transition-property:left;-o-transition-property:left;-webkit-transition-property:left;transition-property:left;-moz-transition-duration:inherit;-o-transition-duration:inherit;-webkit-transition-duration:inherit;transition-duration:inherit;-moz-transition-timing-function:inherit;-o-transition-timing-function:inherit;-webkit-transition-timing-function:inherit;transition-timing-function:inherit}.segmented-control>label:first-of-type:last-of-type,.segmented-control>label:first-of-type:last-of-type:after,.segmented-control>label:first-of-type:last-of-type:before,.segmented-control>label:first-of-type:last-of-type ~ label,.segmented-control>label:first-of-type:last-of-type ~ label:after,.segmented-control>label:first-of-type:last-of-type ~ label:before{width:100%}.segmented-control>label:first-of-type:nth-last-of-type(2),.segmented-control>label:first-of-type:nth-last-of-type(2):after,.segmented-control>label:first-of-type:nth-last-of-type(2):before,.segmented-control>label:first-of-type:nth-last-of-type(2)~label,.segmented-control>label:first-of-type:nth-last-of-type(2)~label:after,.segmented-control>label:first-of-type:nth-last-of-type(2)~label:before{width:50%}.segmented-control>label:first-of-type:nth-last-of-type(3),.segmented-control>label:first-of-type:nth-last-of-type(3):after,.segmented-control>label:first-of-type:nth-last-of-type(3):before,.segmented-control>label:first-of-type:nth-last-of-type(3)~label,.segmented-control>label:first-of-type:nth-last-of-type(3)~label:after,.segmented-control>label:first-of-type:nth-last-of-type(3)~label:before{width:33.33333%}.segmented-control>label:first-of-type:nth-last-of-type(4),.segmented-control>label:first-of-type:nth-last-of-type(4):after,.segmented-control>label:first-of-type:nth-last-of-type(4):before,.segmented-control>label:first-of-type:nth-last-of-type(4)~label,.segmented-control>label:first-of-type:nth-last-of-type(4)~label:after,.segmented-control>label:first-of-type:nth-last-of-type(4)~label:before{width:25%}.segmented-control.italic,.segmented-control .italic{font-style:italic}.segmented-control.bold,.segmented-control .bold{font-weight:700}.segmented-control.underline,.segmented-control .underline{text-decoration:underline}.segmented-control.line-through,.segmented-control .line-through{text-decoration:line-through}", ""]);

// exports


/***/ }),
/* 201 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"segmented-control",class:("text-" + _vm.type)},[_vm._l((_vm.options),function(opt,idx){return [_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.aValue),expression:"aValue"}],key:("sc-input-" + idx),attrs:{"name":_vm.property,"id":("sc-" + _vm.vf_uid + "-" + idx),"type":"radio"},domProps:{"value":idx,"checked":_vm._q(_vm.aValue,idx)},on:{"change":function($event){_vm.aValue=idx}}})]}),_vm._v(" "),_vm._l((_vm.options),function(opt,idx){return [_c('label',{key:("sc-label-" + idx),attrs:{"for":("sc-" + _vm.vf_uid + "-" + idx),"data-value":opt}},[_vm._v(_vm._s(opt))])]})],2)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 202 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormOptionsLists_vue__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormOptionsLists_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormOptionsLists_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormOptionsLists_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormOptionsLists_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f550e656_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormOptionsLists_vue__ = __webpack_require__(207);
function injectStyle (ssrContext) {
  __webpack_require__(203)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-f550e656"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormOptionsLists_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f550e656_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormOptionsLists_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(204);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("4ffb9a06", content, true, {});

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".flip-list-move[data-v-f550e656]{transition:transform .5s}.no-move[data-v-f550e656]{transition:transform 0s}.ghost[data-v-f550e656]{opacity:.5;background:#c8ebfb}.list-group[data-v-f550e656]{min-height:20px}.list-group-item[data-v-f550e656]{cursor:move}.list-group-item i[data-v-f550e656]{cursor:pointer}.empty-drag-area[data-v-f550e656]{min-height:3em;background-color:#eee;border:1px dashed #d3d3d3;text-align:center}ul.list-group.draggable-list[data-v-f550e656]{z-index:2;margin-bottom:0}.empty-drag-area[data-v-f550e656]:before{line-height:3;position:absolute;top:1em;bottom:0;right:0;left:0;margin:auto;content:\"Drag Item Here\";pointer-events:none}.value-container[data-v-f550e656]{max-height:220px;overflow:scroll}", ""]);

// exports


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  "use strict";

  if (!Array.from) {
    Array.from = function (object) {
      return [].slice.call(object);
    };
  }

  function buildAttribute(object, propName, value) {
    if (value == undefined) {
      return object;
    }
    object = object == null ? {} : object;
    object[propName] = value;
    return object;
  }

  function buildDraggable(Sortable) {
    function removeNode(node) {
      node.parentElement.removeChild(node);
    }

    function insertNodeAt(fatherNode, node, position) {
      var refNode = position === 0 ? fatherNode.children[0] : fatherNode.children[position - 1].nextSibling;
      fatherNode.insertBefore(node, refNode);
    }

    function computeVmIndex(vnodes, element) {
      return vnodes.map(function (elt) {
        return elt.elm;
      }).indexOf(element);
    }

    function _computeIndexes(slots, children, isTransition) {
      if (!slots) {
        return [];
      }

      var elmFromNodes = slots.map(function (elt) {
        return elt.elm;
      });
      var rawIndexes = [].concat(_toConsumableArray(children)).map(function (elt) {
        return elmFromNodes.indexOf(elt);
      });
      return isTransition ? rawIndexes.filter(function (ind) {
        return ind !== -1;
      }) : rawIndexes;
    }

    function emit(evtName, evtData) {
      var _this = this;

      this.$nextTick(function () {
        return _this.$emit(evtName.toLowerCase(), evtData);
      });
    }

    function delegateAndEmit(evtName) {
      var _this2 = this;

      return function (evtData) {
        if (_this2.realList !== null) {
          _this2['onDrag' + evtName](evtData);
        }
        emit.call(_this2, evtName, evtData);
      };
    }

    var eventsListened = ['Start', 'Add', 'Remove', 'Update', 'End'];
    var eventsToEmit = ['Choose', 'Sort', 'Filter', 'Clone'];
    var readonlyProperties = ['Move'].concat(eventsListened, eventsToEmit).map(function (evt) {
      return 'on' + evt;
    });
    var draggingElement = null;

    var props = {
      options: Object,
      list: {
        type: Array,
        required: false,
        default: null
      },
      value: {
        type: Array,
        required: false,
        default: null
      },
      noTransitionOnDrag: {
        type: Boolean,
        default: false
      },
      clone: {
        type: Function,
        default: function _default(original) {
          return original;
        }
      },
      element: {
        type: String,
        default: 'div'
      },
      move: {
        type: Function,
        default: null
      },
      componentData: {
        type: Object,
        required: false,
        default: null
      }
    };

    var draggableComponent = {
      name: 'draggable',

      props: props,

      data: function data() {
        return {
          transitionMode: false,
          noneFunctionalComponentMode: false,
          init: false
        };
      },
      render: function render(h) {
        var slots = this.$slots.default;
        if (slots && slots.length === 1) {
          var child = slots[0];
          if (child.componentOptions && child.componentOptions.tag === "transition-group") {
            this.transitionMode = true;
          }
        }
        var children = slots;
        var footer = this.$slots.footer;

        if (footer) {
          children = slots ? [].concat(_toConsumableArray(slots), _toConsumableArray(footer)) : [].concat(_toConsumableArray(footer));
        }
        var attributes = null;
        var update = function update(name, value) {
          attributes = buildAttribute(attributes, name, value);
        };
        update('attrs', this.$attrs);
        if (this.componentData) {
          var _componentData = this.componentData,
              on = _componentData.on,
              _props = _componentData.props;

          update('on', on);
          update('props', _props);
        }
        return h(this.element, attributes, children);
      },
      mounted: function mounted() {
        var _this3 = this;

        this.noneFunctionalComponentMode = this.element.toLowerCase() !== this.$el.nodeName.toLowerCase();
        if (this.noneFunctionalComponentMode && this.transitionMode) {
          throw new Error('Transition-group inside component is not supported. Please alter element value or remove transition-group. Current element value: ' + this.element);
        }
        var optionsAdded = {};
        eventsListened.forEach(function (elt) {
          optionsAdded['on' + elt] = delegateAndEmit.call(_this3, elt);
        });

        eventsToEmit.forEach(function (elt) {
          optionsAdded['on' + elt] = emit.bind(_this3, elt);
        });

        var options = _extends({}, this.options, optionsAdded, { onMove: function onMove(evt, originalEvent) {
            return _this3.onDragMove(evt, originalEvent);
          } });
        !('draggable' in options) && (options.draggable = '>*');
        this._sortable = new Sortable(this.rootContainer, options);
        this.computeIndexes();
      },
      beforeDestroy: function beforeDestroy() {
        this._sortable.destroy();
      },


      computed: {
        rootContainer: function rootContainer() {
          return this.transitionMode ? this.$el.children[0] : this.$el;
        },
        isCloning: function isCloning() {
          return !!this.options && !!this.options.group && this.options.group.pull === 'clone';
        },
        realList: function realList() {
          return !!this.list ? this.list : this.value;
        }
      },

      watch: {
        options: {
          handler: function handler(newOptionValue) {
            for (var property in newOptionValue) {
              if (readonlyProperties.indexOf(property) == -1) {
                this._sortable.option(property, newOptionValue[property]);
              }
            }
          },

          deep: true
        },

        realList: function realList() {
          this.computeIndexes();
        }
      },

      methods: {
        getChildrenNodes: function getChildrenNodes() {
          if (!this.init) {
            this.noneFunctionalComponentMode = this.noneFunctionalComponentMode && this.$children.length == 1;
            this.init = true;
          }

          if (this.noneFunctionalComponentMode) {
            return this.$children[0].$slots.default;
          }
          var rawNodes = this.$slots.default;
          return this.transitionMode ? rawNodes[0].child.$slots.default : rawNodes;
        },
        computeIndexes: function computeIndexes() {
          var _this4 = this;

          this.$nextTick(function () {
            _this4.visibleIndexes = _computeIndexes(_this4.getChildrenNodes(), _this4.rootContainer.children, _this4.transitionMode);
          });
        },
        getUnderlyingVm: function getUnderlyingVm(htmlElt) {
          var index = computeVmIndex(this.getChildrenNodes() || [], htmlElt);
          if (index === -1) {
            //Edge case during move callback: related element might be
            //an element different from collection
            return null;
          }
          var element = this.realList[index];
          return { index: index, element: element };
        },
        getUnderlyingPotencialDraggableComponent: function getUnderlyingPotencialDraggableComponent(_ref) {
          var __vue__ = _ref.__vue__;

          if (!__vue__ || !__vue__.$options || __vue__.$options._componentTag !== "transition-group") {
            return __vue__;
          }
          return __vue__.$parent;
        },
        emitChanges: function emitChanges(evt) {
          var _this5 = this;

          this.$nextTick(function () {
            _this5.$emit('change', evt);
          });
        },
        alterList: function alterList(onList) {
          if (!!this.list) {
            onList(this.list);
          } else {
            var newList = [].concat(_toConsumableArray(this.value));
            onList(newList);
            this.$emit('input', newList);
          }
        },
        spliceList: function spliceList() {
          var _arguments = arguments;

          var spliceList = function spliceList(list) {
            return list.splice.apply(list, _arguments);
          };
          this.alterList(spliceList);
        },
        updatePosition: function updatePosition(oldIndex, newIndex) {
          var updatePosition = function updatePosition(list) {
            return list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
          };
          this.alterList(updatePosition);
        },
        getRelatedContextFromMoveEvent: function getRelatedContextFromMoveEvent(_ref2) {
          var to = _ref2.to,
              related = _ref2.related;

          var component = this.getUnderlyingPotencialDraggableComponent(to);
          if (!component) {
            return { component: component };
          }
          var list = component.realList;
          var context = { list: list, component: component };
          if (to !== related && list && component.getUnderlyingVm) {
            var destination = component.getUnderlyingVm(related);
            if (destination) {
              return _extends(destination, context);
            }
          }

          return context;
        },
        getVmIndex: function getVmIndex(domIndex) {
          var indexes = this.visibleIndexes;
          var numberIndexes = indexes.length;
          return domIndex > numberIndexes - 1 ? numberIndexes : indexes[domIndex];
        },
        getComponent: function getComponent() {
          return this.$slots.default[0].componentInstance;
        },
        resetTransitionData: function resetTransitionData(index) {
          if (!this.noTransitionOnDrag || !this.transitionMode) {
            return;
          }
          var nodes = this.getChildrenNodes();
          nodes[index].data = null;
          var transitionContainer = this.getComponent();
          transitionContainer.children = [];
          transitionContainer.kept = undefined;
        },
        onDragStart: function onDragStart(evt) {
          this.context = this.getUnderlyingVm(evt.item);
          evt.item._underlying_vm_ = this.clone(this.context.element);
          draggingElement = evt.item;
        },
        onDragAdd: function onDragAdd(evt) {
          var element = evt.item._underlying_vm_;
          if (element === undefined) {
            return;
          }
          removeNode(evt.item);
          var newIndex = this.getVmIndex(evt.newIndex);
          this.spliceList(newIndex, 0, element);
          this.computeIndexes();
          var added = { element: element, newIndex: newIndex };
          this.emitChanges({ added: added });
        },
        onDragRemove: function onDragRemove(evt) {
          insertNodeAt(this.rootContainer, evt.item, evt.oldIndex);
          if (this.isCloning) {
            removeNode(evt.clone);
            return;
          }
          var oldIndex = this.context.index;
          this.spliceList(oldIndex, 1);
          var removed = { element: this.context.element, oldIndex: oldIndex };
          this.resetTransitionData(oldIndex);
          this.emitChanges({ removed: removed });
        },
        onDragUpdate: function onDragUpdate(evt) {
          removeNode(evt.item);
          insertNodeAt(evt.from, evt.item, evt.oldIndex);
          var oldIndex = this.context.index;
          var newIndex = this.getVmIndex(evt.newIndex);
          this.updatePosition(oldIndex, newIndex);
          var moved = { element: this.context.element, oldIndex: oldIndex, newIndex: newIndex };
          this.emitChanges({ moved: moved });
        },
        computeFutureIndex: function computeFutureIndex(relatedContext, evt) {
          if (!relatedContext.element) {
            return 0;
          }
          var domChildren = [].concat(_toConsumableArray(evt.to.children)).filter(function (el) {
            return el.style['display'] !== 'none';
          });
          var currentDOMIndex = domChildren.indexOf(evt.related);
          var currentIndex = relatedContext.component.getVmIndex(currentDOMIndex);
          var draggedInList = domChildren.indexOf(draggingElement) != -1;
          return draggedInList || !evt.willInsertAfter ? currentIndex : currentIndex + 1;
        },
        onDragMove: function onDragMove(evt, originalEvent) {
          var onMove = this.move;
          if (!onMove || !this.realList) {
            return true;
          }

          var relatedContext = this.getRelatedContextFromMoveEvent(evt);
          var draggedContext = this.context;
          var futureIndex = this.computeFutureIndex(relatedContext, evt);
          _extends(draggedContext, { futureIndex: futureIndex });
          _extends(evt, { relatedContext: relatedContext, draggedContext: draggedContext });
          return onMove(evt, originalEvent);
        },
        onDragEnd: function onDragEnd(evt) {
          this.computeIndexes();
          draggingElement = null;
        }
      }
    };
    return draggableComponent;
  }

  if (true) {
    var Sortable = __webpack_require__(206);
    module.exports = buildDraggable(Sortable);
  } else if (typeof define == "function" && define.amd) {
    define(['sortablejs'], function (Sortable) {
      return buildDraggable(Sortable);
    });
  } else if (window && window.Vue && window.Sortable) {
    var draggable = buildDraggable(window.Sortable);
    Vue.component('draggable', draggable);
  }
})();

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @license MIT
 */

(function sortableModule(factory) {
	"use strict";

	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else if (typeof module != "undefined" && typeof module.exports != "undefined") {
		module.exports = factory();
	}
	else {
		/* jshint sub:true */
		window["Sortable"] = factory();
	}
})(function sortableFactory() {
	"use strict";

	if (typeof window === "undefined" || !window.document) {
		return function sortableError() {
			throw new Error("Sortable.js requires a window with a document");
		};
	}

	var dragEl,
		parentEl,
		ghostEl,
		cloneEl,
		rootEl,
		nextEl,
		lastDownEl,

		scrollEl,
		scrollParentEl,
		scrollCustomFn,

		lastEl,
		lastCSS,
		lastParentCSS,

		oldIndex,
		newIndex,

		activeGroup,
		putSortable,

		autoScroll = {},

		tapEvt,
		touchEvt,

		moved,

		/** @const */
		R_SPACE = /\s+/g,
		R_FLOAT = /left|right|inline/,

		expando = 'Sortable' + (new Date).getTime(),

		win = window,
		document = win.document,
		parseInt = win.parseInt,
		setTimeout = win.setTimeout,

		$ = win.jQuery || win.Zepto,
		Polymer = win.Polymer,

		captureMode = false,
		passiveMode = false,

		supportDraggable = ('draggable' in document.createElement('div')),
		supportCssPointerEvents = (function (el) {
			// false when IE11
			if (!!navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie)/i)) {
				return false;
			}
			el = document.createElement('x');
			el.style.cssText = 'pointer-events:auto';
			return el.style.pointerEvents === 'auto';
		})(),

		_silent = false,

		abs = Math.abs,
		min = Math.min,

		savedInputChecked = [],
		touchDragOverListeners = [],

		_autoScroll = _throttle(function (/**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl) {
			// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
			if (rootEl && options.scroll) {
				var _this = rootEl[expando],
					el,
					rect,
					sens = options.scrollSensitivity,
					speed = options.scrollSpeed,

					x = evt.clientX,
					y = evt.clientY,

					winWidth = window.innerWidth,
					winHeight = window.innerHeight,

					vx,
					vy,

					scrollOffsetX,
					scrollOffsetY
				;

				// Delect scrollEl
				if (scrollParentEl !== rootEl) {
					scrollEl = options.scroll;
					scrollParentEl = rootEl;
					scrollCustomFn = options.scrollFn;

					if (scrollEl === true) {
						scrollEl = rootEl;

						do {
							if ((scrollEl.offsetWidth < scrollEl.scrollWidth) ||
								(scrollEl.offsetHeight < scrollEl.scrollHeight)
							) {
								break;
							}
							/* jshint boss:true */
						} while (scrollEl = scrollEl.parentNode);
					}
				}

				if (scrollEl) {
					el = scrollEl;
					rect = scrollEl.getBoundingClientRect();
					vx = (abs(rect.right - x) <= sens) - (abs(rect.left - x) <= sens);
					vy = (abs(rect.bottom - y) <= sens) - (abs(rect.top - y) <= sens);
				}


				if (!(vx || vy)) {
					vx = (winWidth - x <= sens) - (x <= sens);
					vy = (winHeight - y <= sens) - (y <= sens);

					/* jshint expr:true */
					(vx || vy) && (el = win);
				}


				if (autoScroll.vx !== vx || autoScroll.vy !== vy || autoScroll.el !== el) {
					autoScroll.el = el;
					autoScroll.vx = vx;
					autoScroll.vy = vy;

					clearInterval(autoScroll.pid);

					if (el) {
						autoScroll.pid = setInterval(function () {
							scrollOffsetY = vy ? vy * speed : 0;
							scrollOffsetX = vx ? vx * speed : 0;

							if ('function' === typeof(scrollCustomFn)) {
								return scrollCustomFn.call(_this, scrollOffsetX, scrollOffsetY, evt);
							}

							if (el === win) {
								win.scrollTo(win.pageXOffset + scrollOffsetX, win.pageYOffset + scrollOffsetY);
							} else {
								el.scrollTop += scrollOffsetY;
								el.scrollLeft += scrollOffsetX;
							}
						}, 24);
					}
				}
			}
		}, 30),

		_prepareGroup = function (options) {
			function toFn(value, pull) {
				if (value === void 0 || value === true) {
					value = group.name;
				}

				if (typeof value === 'function') {
					return value;
				} else {
					return function (to, from) {
						var fromGroup = from.options.group.name;

						return pull
							? value
							: value && (value.join
								? value.indexOf(fromGroup) > -1
								: (fromGroup == value)
							);
					};
				}
			}

			var group = {};
			var originalGroup = options.group;

			if (!originalGroup || typeof originalGroup != 'object') {
				originalGroup = {name: originalGroup};
			}

			group.name = originalGroup.name;
			group.checkPull = toFn(originalGroup.pull, true);
			group.checkPut = toFn(originalGroup.put);
			group.revertClone = originalGroup.revertClone;

			options.group = group;
		}
	;

	// Detect support a passive mode
	try {
		window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
			get: function () {
				// `false`, because everything starts to work incorrectly and instead of d'n'd,
				// begins the page has scrolled.
				passiveMode = false;
				captureMode = {
					capture: false,
					passive: passiveMode
				};
			}
		}));
	} catch (err) {}

	/**
	 * @class  Sortable
	 * @param  {HTMLElement}  el
	 * @param  {Object}       [options]
	 */
	function Sortable(el, options) {
		if (!(el && el.nodeType && el.nodeType === 1)) {
			throw 'Sortable: `el` must be HTMLElement, and not ' + {}.toString.call(el);
		}

		this.el = el; // root element
		this.options = options = _extend({}, options);


		// Export instance
		el[expando] = this;

		// Default options
		var defaults = {
			group: Math.random(),
			sort: true,
			disabled: false,
			store: null,
			handle: null,
			scroll: true,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			draggable: /[uo]l/i.test(el.nodeName) ? 'li' : '>*',
			ghostClass: 'sortable-ghost',
			chosenClass: 'sortable-chosen',
			dragClass: 'sortable-drag',
			ignore: 'a, img',
			filter: null,
			preventOnFilter: true,
			animation: 0,
			setData: function (dataTransfer, dragEl) {
				dataTransfer.setData('Text', dragEl.textContent);
			},
			dropBubble: false,
			dragoverBubble: false,
			dataIdAttr: 'data-id',
			delay: 0,
			forceFallback: false,
			fallbackClass: 'sortable-fallback',
			fallbackOnBody: false,
			fallbackTolerance: 0,
			fallbackOffset: {x: 0, y: 0},
			supportPointer: Sortable.supportPointer !== false
		};


		// Set default options
		for (var name in defaults) {
			!(name in options) && (options[name] = defaults[name]);
		}

		_prepareGroup(options);

		// Bind all private methods
		for (var fn in this) {
			if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
				this[fn] = this[fn].bind(this);
			}
		}

		// Setup drag mode
		this.nativeDraggable = options.forceFallback ? false : supportDraggable;

		// Bind events
		_on(el, 'mousedown', this._onTapStart);
		_on(el, 'touchstart', this._onTapStart);
		options.supportPointer && _on(el, 'pointerdown', this._onTapStart);

		if (this.nativeDraggable) {
			_on(el, 'dragover', this);
			_on(el, 'dragenter', this);
		}

		touchDragOverListeners.push(this._onDragOver);

		// Restore sorting
		options.store && this.sort(options.store.get(this));
	}


	Sortable.prototype = /** @lends Sortable.prototype */ {
		constructor: Sortable,

		_onTapStart: function (/** Event|TouchEvent */evt) {
			var _this = this,
				el = this.el,
				options = this.options,
				preventOnFilter = options.preventOnFilter,
				type = evt.type,
				touch = evt.touches && evt.touches[0],
				target = (touch || evt).target,
				originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0]) || target,
				filter = options.filter,
				startIndex;

			_saveInputCheckedState(el);


			// Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
			if (dragEl) {
				return;
			}

			if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
				return; // only left button or enabled
			}

			// cancel dnd if original target is content editable
			if (originalTarget.isContentEditable) {
				return;
			}

			target = _closest(target, options.draggable, el);

			if (!target) {
				return;
			}

			if (lastDownEl === target) {
				// Ignoring duplicate `down`
				return;
			}

			// Get the index of the dragged element within its parent
			startIndex = _index(target, options.draggable);

			// Check filter
			if (typeof filter === 'function') {
				if (filter.call(this, evt, target, this)) {
					_dispatchEvent(_this, originalTarget, 'filter', target, el, el, startIndex);
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}
			else if (filter) {
				filter = filter.split(',').some(function (criteria) {
					criteria = _closest(originalTarget, criteria.trim(), el);

					if (criteria) {
						_dispatchEvent(_this, criteria, 'filter', target, el, el, startIndex);
						return true;
					}
				});

				if (filter) {
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}

			if (options.handle && !_closest(originalTarget, options.handle, el)) {
				return;
			}

			// Prepare `dragstart`
			this._prepareDragStart(evt, touch, target, startIndex);
		},

		_prepareDragStart: function (/** Event */evt, /** Touch */touch, /** HTMLElement */target, /** Number */startIndex) {
			var _this = this,
				el = _this.el,
				options = _this.options,
				ownerDocument = el.ownerDocument,
				dragStartFn;

			if (target && !dragEl && (target.parentNode === el)) {
				tapEvt = evt;

				rootEl = el;
				dragEl = target;
				parentEl = dragEl.parentNode;
				nextEl = dragEl.nextSibling;
				lastDownEl = target;
				activeGroup = options.group;
				oldIndex = startIndex;

				this._lastX = (touch || evt).clientX;
				this._lastY = (touch || evt).clientY;

				dragEl.style['will-change'] = 'all';

				dragStartFn = function () {
					// Delayed drag has been triggered
					// we can re-enable the events: touchmove/mousemove
					_this._disableDelayedDrag();

					// Make the element draggable
					dragEl.draggable = _this.nativeDraggable;

					// Chosen item
					_toggleClass(dragEl, options.chosenClass, true);

					// Bind the events: dragstart/dragend
					_this._triggerDragStart(evt, touch);

					// Drag start event
					_dispatchEvent(_this, rootEl, 'choose', dragEl, rootEl, rootEl, oldIndex);
				};

				// Disable "draggable"
				options.ignore.split(',').forEach(function (criteria) {
					_find(dragEl, criteria.trim(), _disableDraggable);
				});

				_on(ownerDocument, 'mouseup', _this._onDrop);
				_on(ownerDocument, 'touchend', _this._onDrop);
				_on(ownerDocument, 'touchcancel', _this._onDrop);
				_on(ownerDocument, 'selectstart', _this);
				options.supportPointer && _on(ownerDocument, 'pointercancel', _this._onDrop);

				if (options.delay) {
					// If the user moves the pointer or let go the click or touch
					// before the delay has been reached:
					// disable the delayed drag
					_on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchend', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
					_on(ownerDocument, 'mousemove', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchmove', _this._disableDelayedDrag);
					options.supportPointer && _on(ownerDocument, 'pointermove', _this._disableDelayedDrag);

					_this._dragStartTimer = setTimeout(dragStartFn, options.delay);
				} else {
					dragStartFn();
				}


			}
		},

		_disableDelayedDrag: function () {
			var ownerDocument = this.el.ownerDocument;

			clearTimeout(this._dragStartTimer);
			_off(ownerDocument, 'mouseup', this._disableDelayedDrag);
			_off(ownerDocument, 'touchend', this._disableDelayedDrag);
			_off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
			_off(ownerDocument, 'mousemove', this._disableDelayedDrag);
			_off(ownerDocument, 'touchmove', this._disableDelayedDrag);
			_off(ownerDocument, 'pointermove', this._disableDelayedDrag);
		},

		_triggerDragStart: function (/** Event */evt, /** Touch */touch) {
			touch = touch || (evt.pointerType == 'touch' ? evt : null);

			if (touch) {
				// Touch device support
				tapEvt = {
					target: dragEl,
					clientX: touch.clientX,
					clientY: touch.clientY
				};

				this._onDragStart(tapEvt, 'touch');
			}
			else if (!this.nativeDraggable) {
				this._onDragStart(tapEvt, true);
			}
			else {
				_on(dragEl, 'dragend', this);
				_on(rootEl, 'dragstart', this._onDragStart);
			}

			try {
				if (document.selection) {
					// Timeout neccessary for IE9
					_nextTick(function () {
						document.selection.empty();
					});
				} else {
					window.getSelection().removeAllRanges();
				}
			} catch (err) {
			}
		},

		_dragStarted: function () {
			if (rootEl && dragEl) {
				var options = this.options;

				// Apply effect
				_toggleClass(dragEl, options.ghostClass, true);
				_toggleClass(dragEl, options.dragClass, false);

				Sortable.active = this;

				// Drag start event
				_dispatchEvent(this, rootEl, 'start', dragEl, rootEl, rootEl, oldIndex);
			} else {
				this._nulling();
			}
		},

		_emulateDragOver: function () {
			if (touchEvt) {
				if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY) {
					return;
				}

				this._lastX = touchEvt.clientX;
				this._lastY = touchEvt.clientY;

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', 'none');
				}

				var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
				var parent = target;
				var i = touchDragOverListeners.length;

				if (target && target.shadowRoot) {
					target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
					parent = target;
				}

				if (parent) {
					do {
						if (parent[expando]) {
							while (i--) {
								touchDragOverListeners[i]({
									clientX: touchEvt.clientX,
									clientY: touchEvt.clientY,
									target: target,
									rootEl: parent
								});
							}

							break;
						}

						target = parent; // store last element
					}
					/* jshint boss:true */
					while (parent = parent.parentNode);
				}

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', '');
				}
			}
		},


		_onTouchMove: function (/**TouchEvent*/evt) {
			if (tapEvt) {
				var	options = this.options,
					fallbackTolerance = options.fallbackTolerance,
					fallbackOffset = options.fallbackOffset,
					touch = evt.touches ? evt.touches[0] : evt,
					dx = (touch.clientX - tapEvt.clientX) + fallbackOffset.x,
					dy = (touch.clientY - tapEvt.clientY) + fallbackOffset.y,
					translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';

				// only set the status to dragging, when we are actually dragging
				if (!Sortable.active) {
					if (fallbackTolerance &&
						min(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY)) < fallbackTolerance
					) {
						return;
					}

					this._dragStarted();
				}

				// as well as creating the ghost element on the document body
				this._appendGhost();

				moved = true;
				touchEvt = touch;

				_css(ghostEl, 'webkitTransform', translate3d);
				_css(ghostEl, 'mozTransform', translate3d);
				_css(ghostEl, 'msTransform', translate3d);
				_css(ghostEl, 'transform', translate3d);

				evt.preventDefault();
			}
		},

		_appendGhost: function () {
			if (!ghostEl) {
				var rect = dragEl.getBoundingClientRect(),
					css = _css(dragEl),
					options = this.options,
					ghostRect;

				ghostEl = dragEl.cloneNode(true);

				_toggleClass(ghostEl, options.ghostClass, false);
				_toggleClass(ghostEl, options.fallbackClass, true);
				_toggleClass(ghostEl, options.dragClass, true);

				_css(ghostEl, 'top', rect.top - parseInt(css.marginTop, 10));
				_css(ghostEl, 'left', rect.left - parseInt(css.marginLeft, 10));
				_css(ghostEl, 'width', rect.width);
				_css(ghostEl, 'height', rect.height);
				_css(ghostEl, 'opacity', '0.8');
				_css(ghostEl, 'position', 'fixed');
				_css(ghostEl, 'zIndex', '100000');
				_css(ghostEl, 'pointerEvents', 'none');

				options.fallbackOnBody && document.body.appendChild(ghostEl) || rootEl.appendChild(ghostEl);

				// Fixing dimensions.
				ghostRect = ghostEl.getBoundingClientRect();
				_css(ghostEl, 'width', rect.width * 2 - ghostRect.width);
				_css(ghostEl, 'height', rect.height * 2 - ghostRect.height);
			}
		},

		_onDragStart: function (/**Event*/evt, /**boolean*/useFallback) {
			var _this = this;
			var dataTransfer = evt.dataTransfer;
			var options = _this.options;

			_this._offUpEvents();

			if (activeGroup.checkPull(_this, _this, dragEl, evt)) {
				cloneEl = _clone(dragEl);

				cloneEl.draggable = false;
				cloneEl.style['will-change'] = '';

				_css(cloneEl, 'display', 'none');
				_toggleClass(cloneEl, _this.options.chosenClass, false);

				// #1143: IFrame support workaround
				_this._cloneId = _nextTick(function () {
					rootEl.insertBefore(cloneEl, dragEl);
					_dispatchEvent(_this, rootEl, 'clone', dragEl);
				});
			}

			_toggleClass(dragEl, options.dragClass, true);

			if (useFallback) {
				if (useFallback === 'touch') {
					// Bind touch events
					_on(document, 'touchmove', _this._onTouchMove);
					_on(document, 'touchend', _this._onDrop);
					_on(document, 'touchcancel', _this._onDrop);

					if (options.supportPointer) {
						_on(document, 'pointermove', _this._onTouchMove);
						_on(document, 'pointerup', _this._onDrop);
					}
				} else {
					// Old brwoser
					_on(document, 'mousemove', _this._onTouchMove);
					_on(document, 'mouseup', _this._onDrop);
				}

				_this._loopId = setInterval(_this._emulateDragOver, 50);
			}
			else {
				if (dataTransfer) {
					dataTransfer.effectAllowed = 'move';
					options.setData && options.setData.call(_this, dataTransfer, dragEl);
				}

				_on(document, 'drop', _this);

				// #1143: Бывает элемент с IFrame внутри блокирует `drop`,
				// поэтому если вызвался `mouseover`, значит надо отменять весь d'n'd.
				// Breaking Chrome 62+
				// _on(document, 'mouseover', _this);

				_this._dragStartId = _nextTick(_this._dragStarted);
			}
		},

		_onDragOver: function (/**Event*/evt) {
			var el = this.el,
				target,
				dragRect,
				targetRect,
				revert,
				options = this.options,
				group = options.group,
				activeSortable = Sortable.active,
				isOwner = (activeGroup === group),
				isMovingBetweenSortable = false,
				canSort = options.sort;

			if (evt.preventDefault !== void 0) {
				evt.preventDefault();
				!options.dragoverBubble && evt.stopPropagation();
			}

			if (dragEl.animated) {
				return;
			}

			moved = true;

			if (activeSortable && !options.disabled &&
				(isOwner
					? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
					: (
						putSortable === this ||
						(
							(activeSortable.lastPullMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) &&
							group.checkPut(this, activeSortable, dragEl, evt)
						)
					)
				) &&
				(evt.rootEl === void 0 || evt.rootEl === this.el) // touch fallback
			) {
				// Smart auto-scrolling
				_autoScroll(evt, options, this.el);

				if (_silent) {
					return;
				}

				target = _closest(evt.target, options.draggable, el);
				dragRect = dragEl.getBoundingClientRect();

				if (putSortable !== this) {
					putSortable = this;
					isMovingBetweenSortable = true;
				}

				if (revert) {
					_cloneHide(activeSortable, true);
					parentEl = rootEl; // actualization

					if (cloneEl || nextEl) {
						rootEl.insertBefore(dragEl, cloneEl || nextEl);
					}
					else if (!canSort) {
						rootEl.appendChild(dragEl);
					}

					return;
				}


				if ((el.children.length === 0) || (el.children[0] === ghostEl) ||
					(el === evt.target) && (_ghostIsLast(el, evt))
				) {
					//assign target only if condition is true
					if (el.children.length !== 0 && el.children[0] !== ghostEl && el === evt.target) {
						target = el.lastElementChild;
					}

					if (target) {
						if (target.animated) {
							return;
						}

						targetRect = target.getBoundingClientRect();
					}

					_cloneHide(activeSortable, isOwner);

					if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt) !== false) {
						if (!dragEl.contains(el)) {
							el.appendChild(dragEl);
							parentEl = el; // actualization
						}

						this._animate(dragRect, dragEl);
						target && this._animate(targetRect, target);
					}
				}
				else if (target && !target.animated && target !== dragEl && (target.parentNode[expando] !== void 0)) {
					if (lastEl !== target) {
						lastEl = target;
						lastCSS = _css(target);
						lastParentCSS = _css(target.parentNode);
					}

					targetRect = target.getBoundingClientRect();

					var width = targetRect.right - targetRect.left,
						height = targetRect.bottom - targetRect.top,
						floating = R_FLOAT.test(lastCSS.cssFloat + lastCSS.display)
							|| (lastParentCSS.display == 'flex' && lastParentCSS['flex-direction'].indexOf('row') === 0),
						isWide = (target.offsetWidth > dragEl.offsetWidth),
						isLong = (target.offsetHeight > dragEl.offsetHeight),
						halfway = (floating ? (evt.clientX - targetRect.left) / width : (evt.clientY - targetRect.top) / height) > 0.5,
						nextSibling = target.nextElementSibling,
						after = false
					;

					if (floating) {
						var elTop = dragEl.offsetTop,
							tgTop = target.offsetTop;

						if (elTop === tgTop) {
							after = (target.previousElementSibling === dragEl) && !isWide || halfway && isWide;
						}
						else if (target.previousElementSibling === dragEl || dragEl.previousElementSibling === target) {
							after = (evt.clientY - targetRect.top) / height > 0.5;
						} else {
							after = tgTop > elTop;
						}
						} else if (!isMovingBetweenSortable) {
						after = (nextSibling !== dragEl) && !isLong || halfway && isLong;
					}

					var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

					if (moveVector !== false) {
						if (moveVector === 1 || moveVector === -1) {
							after = (moveVector === 1);
						}

						_silent = true;
						setTimeout(_unsilent, 30);

						_cloneHide(activeSortable, isOwner);

						if (!dragEl.contains(el)) {
							if (after && !nextSibling) {
								el.appendChild(dragEl);
							} else {
								target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
							}
						}

						parentEl = dragEl.parentNode; // actualization

						this._animate(dragRect, dragEl);
						this._animate(targetRect, target);
					}
				}
			}
		},

		_animate: function (prevRect, target) {
			var ms = this.options.animation;

			if (ms) {
				var currentRect = target.getBoundingClientRect();

				if (prevRect.nodeType === 1) {
					prevRect = prevRect.getBoundingClientRect();
				}

				_css(target, 'transition', 'none');
				_css(target, 'transform', 'translate3d('
					+ (prevRect.left - currentRect.left) + 'px,'
					+ (prevRect.top - currentRect.top) + 'px,0)'
				);

				target.offsetWidth; // repaint

				_css(target, 'transition', 'all ' + ms + 'ms');
				_css(target, 'transform', 'translate3d(0,0,0)');

				clearTimeout(target.animated);
				target.animated = setTimeout(function () {
					_css(target, 'transition', '');
					_css(target, 'transform', '');
					target.animated = false;
				}, ms);
			}
		},

		_offUpEvents: function () {
			var ownerDocument = this.el.ownerDocument;

			_off(document, 'touchmove', this._onTouchMove);
			_off(document, 'pointermove', this._onTouchMove);
			_off(ownerDocument, 'mouseup', this._onDrop);
			_off(ownerDocument, 'touchend', this._onDrop);
			_off(ownerDocument, 'pointerup', this._onDrop);
			_off(ownerDocument, 'touchcancel', this._onDrop);
			_off(ownerDocument, 'pointercancel', this._onDrop);
			_off(ownerDocument, 'selectstart', this);
		},

		_onDrop: function (/**Event*/evt) {
			var el = this.el,
				options = this.options;

			clearInterval(this._loopId);
			clearInterval(autoScroll.pid);
			clearTimeout(this._dragStartTimer);

			_cancelNextTick(this._cloneId);
			_cancelNextTick(this._dragStartId);

			// Unbind events
			_off(document, 'mouseover', this);
			_off(document, 'mousemove', this._onTouchMove);

			if (this.nativeDraggable) {
				_off(document, 'drop', this);
				_off(el, 'dragstart', this._onDragStart);
			}

			this._offUpEvents();

			if (evt) {
				if (moved) {
					evt.preventDefault();
					!options.dropBubble && evt.stopPropagation();
				}

				ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

				if (rootEl === parentEl || Sortable.active.lastPullMode !== 'clone') {
					// Remove clone
					cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
				}

				if (dragEl) {
					if (this.nativeDraggable) {
						_off(dragEl, 'dragend', this);
					}

					_disableDraggable(dragEl);
					dragEl.style['will-change'] = '';

					// Remove class's
					_toggleClass(dragEl, this.options.ghostClass, false);
					_toggleClass(dragEl, this.options.chosenClass, false);

					// Drag stop event
					_dispatchEvent(this, rootEl, 'unchoose', dragEl, parentEl, rootEl, oldIndex);

					if (rootEl !== parentEl) {
						newIndex = _index(dragEl, options.draggable);

						if (newIndex >= 0) {
							// Add event
							_dispatchEvent(null, parentEl, 'add', dragEl, parentEl, rootEl, oldIndex, newIndex);

							// Remove event
							_dispatchEvent(this, rootEl, 'remove', dragEl, parentEl, rootEl, oldIndex, newIndex);

							// drag from one list and drop into another
							_dispatchEvent(null, parentEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
							_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
						}
					}
					else {
						if (dragEl.nextSibling !== nextEl) {
							// Get the index of the dragged element within its parent
							newIndex = _index(dragEl, options.draggable);

							if (newIndex >= 0) {
								// drag & drop within the same list
								_dispatchEvent(this, rootEl, 'update', dragEl, parentEl, rootEl, oldIndex, newIndex);
								_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
							}
						}
					}

					if (Sortable.active) {
						/* jshint eqnull:true */
						if (newIndex == null || newIndex === -1) {
							newIndex = oldIndex;
						}

						_dispatchEvent(this, rootEl, 'end', dragEl, parentEl, rootEl, oldIndex, newIndex);

						// Save sorting
						this.save();
					}
				}

			}

			this._nulling();
		},

		_nulling: function() {
			rootEl =
			dragEl =
			parentEl =
			ghostEl =
			nextEl =
			cloneEl =
			lastDownEl =

			scrollEl =
			scrollParentEl =

			tapEvt =
			touchEvt =

			moved =
			newIndex =

			lastEl =
			lastCSS =

			putSortable =
			activeGroup =
			Sortable.active = null;

			savedInputChecked.forEach(function (el) {
				el.checked = true;
			});
			savedInputChecked.length = 0;
		},

		handleEvent: function (/**Event*/evt) {
			switch (evt.type) {
				case 'drop':
				case 'dragend':
					this._onDrop(evt);
					break;

				case 'dragover':
				case 'dragenter':
					if (dragEl) {
						this._onDragOver(evt);
						_globalDragOver(evt);
					}
					break;

				case 'mouseover':
					this._onDrop(evt);
					break;

				case 'selectstart':
					evt.preventDefault();
					break;
			}
		},


		/**
		 * Serializes the item into an array of string.
		 * @returns {String[]}
		 */
		toArray: function () {
			var order = [],
				el,
				children = this.el.children,
				i = 0,
				n = children.length,
				options = this.options;

			for (; i < n; i++) {
				el = children[i];
				if (_closest(el, options.draggable, this.el)) {
					order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
				}
			}

			return order;
		},


		/**
		 * Sorts the elements according to the array.
		 * @param  {String[]}  order  order of the items
		 */
		sort: function (order) {
			var items = {}, rootEl = this.el;

			this.toArray().forEach(function (id, i) {
				var el = rootEl.children[i];

				if (_closest(el, this.options.draggable, rootEl)) {
					items[id] = el;
				}
			}, this);

			order.forEach(function (id) {
				if (items[id]) {
					rootEl.removeChild(items[id]);
					rootEl.appendChild(items[id]);
				}
			});
		},


		/**
		 * Save the current sorting
		 */
		save: function () {
			var store = this.options.store;
			store && store.set(this);
		},


		/**
		 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
		 * @param   {HTMLElement}  el
		 * @param   {String}       [selector]  default: `options.draggable`
		 * @returns {HTMLElement|null}
		 */
		closest: function (el, selector) {
			return _closest(el, selector || this.options.draggable, this.el);
		},


		/**
		 * Set/get option
		 * @param   {string} name
		 * @param   {*}      [value]
		 * @returns {*}
		 */
		option: function (name, value) {
			var options = this.options;

			if (value === void 0) {
				return options[name];
			} else {
				options[name] = value;

				if (name === 'group') {
					_prepareGroup(options);
				}
			}
		},


		/**
		 * Destroy
		 */
		destroy: function () {
			var el = this.el;

			el[expando] = null;

			_off(el, 'mousedown', this._onTapStart);
			_off(el, 'touchstart', this._onTapStart);
			_off(el, 'pointerdown', this._onTapStart);

			if (this.nativeDraggable) {
				_off(el, 'dragover', this);
				_off(el, 'dragenter', this);
			}

			// Remove draggable attributes
			Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
				el.removeAttribute('draggable');
			});

			touchDragOverListeners.splice(touchDragOverListeners.indexOf(this._onDragOver), 1);

			this._onDrop();

			this.el = el = null;
		}
	};


	function _cloneHide(sortable, state) {
		if (sortable.lastPullMode !== 'clone') {
			state = true;
		}

		if (cloneEl && (cloneEl.state !== state)) {
			_css(cloneEl, 'display', state ? 'none' : '');

			if (!state) {
				if (cloneEl.state) {
					if (sortable.options.group.revertClone) {
						rootEl.insertBefore(cloneEl, nextEl);
						sortable._animate(dragEl, cloneEl);
					} else {
						rootEl.insertBefore(cloneEl, dragEl);
					}
				}
			}

			cloneEl.state = state;
		}
	}


	function _closest(/**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx) {
		if (el) {
			ctx = ctx || document;

			do {
				if ((selector === '>*' && el.parentNode === ctx) || _matches(el, selector)) {
					return el;
				}
				/* jshint boss:true */
			} while (el = _getParentOrHost(el));
		}

		return null;
	}


	function _getParentOrHost(el) {
		var parent = el.host;

		return (parent && parent.nodeType) ? parent : el.parentNode;
	}


	function _globalDragOver(/**Event*/evt) {
		if (evt.dataTransfer) {
			evt.dataTransfer.dropEffect = 'move';
		}
		evt.preventDefault();
	}


	function _on(el, event, fn) {
		el.addEventListener(event, fn, captureMode);
	}


	function _off(el, event, fn) {
		el.removeEventListener(event, fn, captureMode);
	}


	function _toggleClass(el, name, state) {
		if (el) {
			if (el.classList) {
				el.classList[state ? 'add' : 'remove'](name);
			}
			else {
				var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
				el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
			}
		}
	}


	function _css(el, prop, val) {
		var style = el && el.style;

		if (style) {
			if (val === void 0) {
				if (document.defaultView && document.defaultView.getComputedStyle) {
					val = document.defaultView.getComputedStyle(el, '');
				}
				else if (el.currentStyle) {
					val = el.currentStyle;
				}

				return prop === void 0 ? val : val[prop];
			}
			else {
				if (!(prop in style)) {
					prop = '-webkit-' + prop;
				}

				style[prop] = val + (typeof val === 'string' ? '' : 'px');
			}
		}
	}


	function _find(ctx, tagName, iterator) {
		if (ctx) {
			var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;

			if (iterator) {
				for (; i < n; i++) {
					iterator(list[i], i);
				}
			}

			return list;
		}

		return [];
	}



	function _dispatchEvent(sortable, rootEl, name, targetEl, toEl, fromEl, startIndex, newIndex) {
		sortable = (sortable || rootEl[expando]);

		var evt = document.createEvent('Event'),
			options = sortable.options,
			onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);

		evt.initEvent(name, true, true);

		evt.to = toEl || rootEl;
		evt.from = fromEl || rootEl;
		evt.item = targetEl || rootEl;
		evt.clone = cloneEl;

		evt.oldIndex = startIndex;
		evt.newIndex = newIndex;

		rootEl.dispatchEvent(evt);

		if (options[onName]) {
			options[onName].call(sortable, evt);
		}
	}


	function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvt, willInsertAfter) {
		var evt,
			sortable = fromEl[expando],
			onMoveFn = sortable.options.onMove,
			retVal;

		evt = document.createEvent('Event');
		evt.initEvent('move', true, true);

		evt.to = toEl;
		evt.from = fromEl;
		evt.dragged = dragEl;
		evt.draggedRect = dragRect;
		evt.related = targetEl || toEl;
		evt.relatedRect = targetRect || toEl.getBoundingClientRect();
		evt.willInsertAfter = willInsertAfter;

		fromEl.dispatchEvent(evt);

		if (onMoveFn) {
			retVal = onMoveFn.call(sortable, evt, originalEvt);
		}

		return retVal;
	}


	function _disableDraggable(el) {
		el.draggable = false;
	}


	function _unsilent() {
		_silent = false;
	}


	/** @returns {HTMLElement|false} */
	function _ghostIsLast(el, evt) {
		var lastEl = el.lastElementChild,
			rect = lastEl.getBoundingClientRect();

		// 5 — min delta
		// abs — нельзя добавлять, а то глюки при наведении сверху
		return (evt.clientY - (rect.top + rect.height) > 5) ||
			(evt.clientX - (rect.left + rect.width) > 5);
	}


	/**
	 * Generate id
	 * @param   {HTMLElement} el
	 * @returns {String}
	 * @private
	 */
	function _generateId(el) {
		var str = el.tagName + el.className + el.src + el.href + el.textContent,
			i = str.length,
			sum = 0;

		while (i--) {
			sum += str.charCodeAt(i);
		}

		return sum.toString(36);
	}

	/**
	 * Returns the index of an element within its parent for a selected set of
	 * elements
	 * @param  {HTMLElement} el
	 * @param  {selector} selector
	 * @return {number}
	 */
	function _index(el, selector) {
		var index = 0;

		if (!el || !el.parentNode) {
			return -1;
		}

		while (el && (el = el.previousElementSibling)) {
			if ((el.nodeName.toUpperCase() !== 'TEMPLATE') && (selector === '>*' || _matches(el, selector))) {
				index++;
			}
		}

		return index;
	}

	function _matches(/**HTMLElement*/el, /**String*/selector) {
		if (el) {
			selector = selector.split('.');

			var tag = selector.shift().toUpperCase(),
				re = new RegExp('\\s(' + selector.join('|') + ')(?=\\s)', 'g');

			return (
				(tag === '' || el.nodeName.toUpperCase() == tag) &&
				(!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length)
			);
		}

		return false;
	}

	function _throttle(callback, ms) {
		var args, _this;

		return function () {
			if (args === void 0) {
				args = arguments;
				_this = this;

				setTimeout(function () {
					if (args.length === 1) {
						callback.call(_this, args[0]);
					} else {
						callback.apply(_this, args);
					}

					args = void 0;
				}, ms);
			}
		};
	}

	function _extend(dst, src) {
		if (dst && src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					dst[key] = src[key];
				}
			}
		}

		return dst;
	}

	function _clone(el) {
		if (Polymer && Polymer.dom) {
			return Polymer.dom(el).cloneNode(true);
		}
		else if ($) {
			return $(el).clone(true)[0];
		}
		else {
			return el.cloneNode(true);
		}
	}

	function _saveInputCheckedState(root) {
		var inputs = root.getElementsByTagName('input');
		var idx = inputs.length;

		while (idx--) {
			var el = inputs[idx];
			el.checked && savedInputChecked.push(el);
		}
	}

	function _nextTick(fn) {
		return setTimeout(fn, 0);
	}

	function _cancelNextTick(id) {
		return clearTimeout(id);
	}

	// Fixed #973:
	_on(document, 'touchmove', function (evt) {
		if (Sortable.active) {
			evt.preventDefault();
		}
	});

	// Export utils
	Sortable.utils = {
		on: _on,
		off: _off,
		css: _css,
		find: _find,
		is: function (el, selector) {
			return !!_closest(el, selector, el);
		},
		extend: _extend,
		throttle: _throttle,
		closest: _closest,
		toggleClass: _toggleClass,
		clone: _clone,
		index: _index,
		nextTick: _nextTick,
		cancelNextTick: _cancelNextTick
	};


	/**
	 * Create sortable instance
	 * @param {HTMLElement}  el
	 * @param {Object}      [options]
	 */
	Sortable.create = function (el, options) {
		return new Sortable(el, options);
	};


	// Export
	Sortable.version = '1.7.0';
	return Sortable;
});


/***/ }),
/* 207 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group col col-md-12"},[_c('div',{staticClass:"row"},[_vm._t("label",[_c('div',{staticClass:"col-md-12"},[(_vm.label)?_c('label',[_vm._v(_vm._s(_vm.label))]):_vm._e()])])],2),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col col-sm-6"},[_c('small',{staticClass:"help-text"},[_vm._v("Current Items")]),_vm._v(" "),_c('vue-draggable',{staticClass:"value-container",class:_vm.valueListClass,attrs:{"options":_vm.dragOptions,"move":_vm.onMove},on:{"start":function($event){_vm.isDragging=true},"end":function($event){_vm.isDragging=false}},model:{value:(_vm.aValue),callback:function ($$v) {_vm.aValue=$$v},expression:"aValue"}},_vm._l((_vm.aValue),function(element){return _c('li',{key:element[_vm.valueKey],staticClass:"list-group-item"},[_c('a',{staticClass:"badge",on:{"click":function($event){$event.preventDefault();$event.stopPropagation();_vm.fixElement(element)}}},[_c('i',{class:_vm.elementIcon(element),attrs:{"aria-hidden":"true"}})]),_vm._v("\n                    "+_vm._s(_vm.elementDescription(element))+"\n                ")])}))],1),_vm._v(" "),_c('div',{staticClass:"col col-sm-6"},[_c('small',{staticClass:"help-text"},[_vm._v("Available Items")]),_vm._v(" "),_c('transition',{attrs:{"name":"fade"}},[(_vm.showOptSearch)?_c('li',{staticClass:"list-group-item"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.optSearch),expression:"optSearch"}],staticClass:"form-control",attrs:{"placeholder":"Search..."},domProps:{"value":(_vm.optSearch)},on:{"input":function($event){if($event.target.composing){ return; }_vm.optSearch=$event.target.value}}})]):_vm._e()]),_vm._v(" "),_c('vue-draggable',{staticClass:"value-container",class:_vm.optionsListClass,attrs:{"value":_vm.availableOptions,"options":_vm.dragOptions,"move":_vm.onMove}},_vm._l((_vm.availableOptions),function(element){return _c('li',{key:element[_vm.valueKey],staticClass:"list-group-item"},[_c('a',{staticClass:"badge",on:{"click":function($event){$event.preventDefault();$event.stopPropagation();_vm.fixElement(element)}}},[_c('i',{class:_vm.elementIcon(element),attrs:{"aria-hidden":"true"}})]),_vm._v("\n                    "+_vm._s(_vm.elementDescription(element))+"\n                ")])}))],1)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 208 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormOptionsListsScoped_vue__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormOptionsListsScoped_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormOptionsListsScoped_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormOptionsListsScoped_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormOptionsListsScoped_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_88d42756_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormOptionsListsScoped_vue__ = __webpack_require__(211);
function injectStyle (ssrContext) {
  __webpack_require__(209)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormOptionsListsScoped_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_88d42756_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormOptionsListsScoped_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(210);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("1f8804e4", content, true, {});

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".flip-list-move{transition:transform .5s}.no-move{transition:transform 0s}.ghost{opacity:.5;background:#c8ebfb}.list-group{min-height:20px}.list-group-item{cursor:move}.list-group-item i{cursor:pointer}.empty-drag-area{min-height:3em;background-color:#eee;border:1px dashed #d3d3d3;text-align:center}ul.list-group.draggable-list{z-index:2;margin-bottom:0}.empty-drag-area:before{line-height:3;position:absolute;top:0;bottom:0;right:0;left:0;content:\"Drag Item Here\";pointer-events:none}.value-container{max-height:220px;overflow:scroll}", ""]);

// exports


/***/ }),
/* 211 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group col col-md-12"},[_c('div',{staticClass:"row"},[_vm._t("label",[_c('div',{staticClass:"col-md-12"},[(_vm.label)?_c('label',[_vm._v(_vm._s(_vm.label))]):_vm._e()])])],2),_vm._v(" "),_c('div',{staticClass:"col-sm-6"},[_c('small',{staticClass:"help-text"},[_vm._v("Current Items")]),_vm._v(" "),_c('draggable',{staticClass:"value-container",class:_vm.valueListClass,attrs:{"options":_vm.dragOptions,"move":_vm.onMove},on:{"start":function($event){_vm.isDragging=true},"end":function($event){_vm.isDragging=false}},model:{value:(_vm.aValue),callback:function ($$v) {_vm.aValue=$$v},expression:"aValue"}},[_c('transition-group',{staticClass:"list-group draggable-list",attrs:{"name":"no","tag":"ul"}},_vm._l((_vm.aValue),function(item){return _c('li',{key:item.id,staticClass:"list-group-item"},[_vm._t("current",null,null,item)],2)}))],1)],1),_vm._v(" "),_c('div',{staticClass:"col-sm-6"},[_c('small',{staticClass:"help-text"},[_vm._v("Available Items")]),_vm._v(" "),_c('transition',{attrs:{"name":"fade"}},[(_vm.showOptSearch)?_c('li',{staticClass:"list-group-item"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.optSearch),expression:"optSearch"}],staticClass:"form-control",attrs:{"placeholder":"Search..."},domProps:{"value":(_vm.optSearch)},on:{"input":function($event){if($event.target.composing){ return; }_vm.optSearch=$event.target.value}}})]):_vm._e()]),_vm._v(" "),_c('draggable',{staticClass:"value-container",class:_vm.optionsListClass,attrs:{"value":_vm.availableOptions,"options":_vm.dragOptions,"move":_vm.onMove}},[_c('transition-group',{staticClass:"list-group draggable-list",attrs:{"name":"no","tag":"ul"}},_vm._l((_vm.availableOptions),function(item){return _c('li',{key:item.id,staticClass:"list-group-item"},[_vm._t("available",null,null,item)],2)}))],1)],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 212 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormTextarea_vue__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormTextarea_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormTextarea_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormTextarea_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormTextarea_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ebdebb0e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormTextarea_vue__ = __webpack_require__(213);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormTextarea_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ebdebb0e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormTextarea_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 213 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group vf-form-group",class:_vm.formClass},[_c('label',{staticClass:"control-label vf-control-label",attrs:{"for":_vm.vf_uid}},[_vm._v(_vm._s(_vm.aLabel))]),_vm._v(" "),_c('textarea',_vm._g(_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.aValue),expression:"aValue"}],staticClass:"form-control vf-form-control",class:_vm.inputClass,style:(_vm.inputStyle),attrs:{"id":_vm.vf_uid,"disabled":_vm.disabled,"rows":_vm.rows},domProps:{"value":(_vm.aValue)},on:{"input":function($event){if($event.target.composing){ return; }_vm.aValue=$event.target.value}}},'textarea',_vm.$attrs,false),_vm.$listeners)),_vm._v(" "),(_vm.displayErrors)?_c('form-errors',_vm._b({},'form-errors',{errors: _vm.errors, warning: _vm.warning, property: _vm.property},false)):_vm._e(),_vm._v(" "),(!!_vm.$slots['help'])?_c('p',{staticClass:"help-block vf-help-block"},[_c('small',[_vm._t("help")],2)]):_vm._e()],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 214 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormTinymce_vue__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormTinymce_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormTinymce_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormTinymce_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormTinymce_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6d3ed61a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormTinymce_vue__ = __webpack_require__(216);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormTinymce_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6d3ed61a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormTinymce_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 215 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_215__;

/***/ }),
/* 216 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group vf-form-group",class:_vm.formClass},[_c('label',{staticClass:"control-label vf-control-label",attrs:{"for":_vm.vf_uid}},[_vm._v(_vm._s(_vm.aLabel))]),_vm._v(" "),(_vm.showModal)?_c('form-file-gallery',{attrs:{"add-meta":true,"endpoint":_vm.$vfconfig.filesEndpoint('/images'),"errors":_vm.errors,"src-key":"path"},on:{"choose":_vm.chooseFile,"close":_vm.closeFilePicker}}):_vm._e(),_vm._v(" "),_c('vue-tinymce',{attrs:{"api-key":_vm._apiKey,"init":_vm.init},model:{value:(_vm.aValue),callback:function ($$v) {_vm.aValue=$$v},expression:"aValue"}}),_vm._v(" "),(_vm.displayErrors)?_c('form-errors',_vm._b({},'form-errors',{errors: _vm.errors, warning: _vm.warning, property: _vm.property},false)):_vm._e(),_vm._v(" "),(!!_vm.$slots['help'])?_c('p',{staticClass:"help-block vf-help-block"},[_c('small',[_vm._t("help")],2)]):_vm._e()],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 217 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormMarkdown_vue__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormMarkdown_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormMarkdown_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormMarkdown_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormMarkdown_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_698e09a9_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormMarkdown_vue__ = __webpack_require__(222);
function injectStyle (ssrContext) {
  __webpack_require__(218)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-698e09a9"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormMarkdown_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_698e09a9_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormMarkdown_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(219);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("a59db71c", content, true, {});

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports
exports.i(__webpack_require__(220), "");

// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".CodeMirror{color:#000}.CodeMirror-lines{padding:4px 0}.CodeMirror pre{padding:0 4px}.CodeMirror-gutter-filler,.CodeMirror-scrollbar-filler{background-color:#fff}.CodeMirror-gutters{border-right:1px solid #ddd;background-color:#f7f7f7;white-space:nowrap}.CodeMirror-linenumber{padding:0 3px 0 5px;min-width:20px;text-align:right;color:#999;white-space:nowrap}.CodeMirror-guttermarker{color:#000}.CodeMirror-guttermarker-subtle{color:#999}.CodeMirror-cursor{border-left:1px solid #000;border-right:none;width:0}.CodeMirror div.CodeMirror-secondarycursor{border-left:1px solid silver}.cm-fat-cursor .CodeMirror-cursor{width:auto;border:0!important;background:#7e7}.cm-fat-cursor div.CodeMirror-cursors{z-index:1}.cm-animate-fat-cursor{width:auto;border:0;-webkit-animation:blink 1.06s steps(1) infinite;-moz-animation:blink 1.06s steps(1) infinite;animation:blink 1.06s steps(1) infinite;background-color:#7e7}@-moz-keyframes blink{50%{background-color:transparent}}@-webkit-keyframes blink{50%{background-color:transparent}}@keyframes blink{50%{background-color:transparent}}.cm-tab{display:inline-block;text-decoration:inherit}.CodeMirror-ruler{border-left:1px solid #ccc;position:absolute}.cm-s-default .cm-header{color:#00f}.cm-s-default .cm-quote{color:#090}.cm-negative{color:#d44}.cm-positive{color:#292}.cm-header,.cm-strong{font-weight:700}.cm-em{font-style:italic}.cm-link{text-decoration:underline}.cm-strikethrough{text-decoration:line-through}.cm-s-default .cm-keyword{color:#708}.cm-s-default .cm-atom{color:#219}.cm-s-default .cm-number{color:#164}.cm-s-default .cm-def{color:#00f}.cm-s-default .cm-variable-2{color:#05a}.cm-s-default .cm-variable-3{color:#085}.cm-s-default .cm-comment{color:#a50}.cm-s-default .cm-string{color:#a11}.cm-s-default .cm-string-2{color:#f50}.cm-s-default .cm-meta,.cm-s-default .cm-qualifier{color:#555}.cm-s-default .cm-builtin{color:#30a}.cm-s-default .cm-bracket{color:#997}.cm-s-default .cm-tag{color:#170}.cm-s-default .cm-attribute{color:#00c}.cm-s-default .cm-hr{color:#999}.cm-s-default .cm-link{color:#00c}.cm-invalidchar,.cm-s-default .cm-error{color:red}.CodeMirror-composing{border-bottom:2px solid}div.CodeMirror span.CodeMirror-matchingbracket{color:#0f0}div.CodeMirror span.CodeMirror-nonmatchingbracket{color:#f22}.CodeMirror-matchingtag{background:rgba(255,150,0,.3)}.CodeMirror-activeline-background{background:#e8f2ff}.CodeMirror{position:relative;overflow:hidden;background:#fff}.CodeMirror-scroll{overflow:scroll!important;margin-bottom:-30px;margin-right:-30px;padding-bottom:30px;height:100%;outline:0;position:relative}.CodeMirror-sizer{position:relative;border-right:30px solid transparent}.CodeMirror-gutter-filler,.CodeMirror-hscrollbar,.CodeMirror-scrollbar-filler,.CodeMirror-vscrollbar{position:absolute;z-index:6;display:none}.CodeMirror-vscrollbar{right:0;top:0;overflow-x:hidden;overflow-y:scroll}.CodeMirror-hscrollbar{bottom:0;left:0;overflow-y:hidden;overflow-x:scroll}.CodeMirror-scrollbar-filler{right:0;bottom:0}.CodeMirror-gutter-filler{left:0;bottom:0}.CodeMirror-gutters{position:absolute;left:0;top:0;min-height:100%;z-index:3}.CodeMirror-gutter{white-space:normal;height:100%;display:inline-block;vertical-align:top;margin-bottom:-30px}.CodeMirror-gutter-wrapper{position:absolute;z-index:4;background:0 0!important;border:none!important;-webkit-user-select:none;-moz-user-select:none;user-select:none}.CodeMirror-gutter-background{position:absolute;top:0;bottom:0;z-index:4}.CodeMirror-gutter-elt{position:absolute;cursor:default;z-index:4}.CodeMirror-lines{cursor:text;min-height:1px}.CodeMirror pre{-moz-border-radius:0;-webkit-border-radius:0;border-radius:0;border-width:0;background:0 0;font-family:inherit;font-size:inherit;margin:0;white-space:pre;word-wrap:normal;line-height:inherit;color:inherit;z-index:2;position:relative;overflow:visible;-webkit-tap-highlight-color:transparent;-webkit-font-variant-ligatures:none;font-variant-ligatures:none}.CodeMirror-wrap pre{word-wrap:break-word;white-space:pre-wrap;word-break:normal}.CodeMirror-linebackground{position:absolute;left:0;right:0;top:0;bottom:0;z-index:0}.CodeMirror-linewidget{position:relative;z-index:2;overflow:auto}.CodeMirror-code{outline:0}.CodeMirror-gutter,.CodeMirror-gutters,.CodeMirror-linenumber,.CodeMirror-scroll,.CodeMirror-sizer{-moz-box-sizing:content-box;box-sizing:content-box}.CodeMirror-measure{position:absolute;width:100%;height:0;overflow:hidden;visibility:hidden}.CodeMirror-cursor{position:absolute}.CodeMirror-measure pre{position:static}div.CodeMirror-cursors{visibility:hidden;position:relative;z-index:3}.CodeMirror-focused div.CodeMirror-cursors,div.CodeMirror-dragcursors{visibility:visible}.CodeMirror-selected{background:#d9d9d9}.CodeMirror-focused .CodeMirror-selected,.CodeMirror-line::selection,.CodeMirror-line>span::selection,.CodeMirror-line>span>span::selection{background:#d7d4f0}.CodeMirror-crosshair{cursor:crosshair}.CodeMirror-line::-moz-selection,.CodeMirror-line>span::-moz-selection,.CodeMirror-line>span>span::-moz-selection{background:#d7d4f0}.cm-searching{background:#ffa;background:rgba(255,255,0,.4)}.cm-force-border{padding-right:.1px}@media print{.CodeMirror div.CodeMirror-cursors{visibility:hidden}}.cm-tab-wrap-hack:after{content:\"\"}span.CodeMirror-selectedtext{background:0 0}.CodeMirror{height:auto;border:1px solid #ddd;border-bottom-left-radius:4px;border-bottom-right-radius:4px;padding:10px;font:inherit;z-index:1}.CodeMirror,.CodeMirror-scroll{min-height:300px}.CodeMirror-fullscreen{background:#fff;position:fixed!important;top:50px;left:0;right:0;bottom:0;height:auto;z-index:9}.CodeMirror-sided{width:50%!important}.editor-toolbar{position:relative;opacity:.6;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none;padding:0 10px;border-top:1px solid #bbb;border-left:1px solid #bbb;border-right:1px solid #bbb;border-top-left-radius:4px;border-top-right-radius:4px}.editor-toolbar:after,.editor-toolbar:before{display:block;content:\" \";height:1px}.editor-toolbar:before{margin-bottom:8px}.editor-toolbar:after{margin-top:8px}.editor-toolbar:hover,.editor-wrapper input.title:focus,.editor-wrapper input.title:hover{opacity:.8}.editor-toolbar.fullscreen{width:100%;height:50px;overflow-x:auto;overflow-y:hidden;white-space:nowrap;padding-top:10px;padding-bottom:10px;box-sizing:border-box;background:#fff;border:0;position:fixed;top:0;left:0;opacity:1;z-index:9}.editor-toolbar.fullscreen:before{width:20px;height:50px;background:-moz-linear-gradient(left,#fff 0,hsla(0,0%,100%,0) 100%);background:-webkit-gradient(linear,left top,right top,color-stop(0,#fff),color-stop(100%,hsla(0,0%,100%,0)));background:-webkit-linear-gradient(left,#fff,hsla(0,0%,100%,0));background:-o-linear-gradient(left,#fff 0,hsla(0,0%,100%,0) 100%);background:-ms-linear-gradient(left,#fff 0,hsla(0,0%,100%,0) 100%);background:linear-gradient(90deg,#fff 0,hsla(0,0%,100%,0));position:fixed;top:0;left:0;margin:0;padding:0}.editor-toolbar.fullscreen:after{width:20px;height:50px;background:-moz-linear-gradient(left,hsla(0,0%,100%,0) 0,#fff 100%);background:-webkit-gradient(linear,left top,right top,color-stop(0,hsla(0,0%,100%,0)),color-stop(100%,#fff));background:-webkit-linear-gradient(left,hsla(0,0%,100%,0),#fff);background:-o-linear-gradient(left,hsla(0,0%,100%,0) 0,#fff 100%);background:-ms-linear-gradient(left,hsla(0,0%,100%,0) 0,#fff 100%);background:linear-gradient(90deg,hsla(0,0%,100%,0) 0,#fff);position:fixed;top:0;right:0;margin:0;padding:0}.editor-toolbar a{display:inline-block;text-align:center;text-decoration:none!important;color:#2c3e50!important;width:30px;height:30px;margin:0;border:1px solid transparent;border-radius:3px;cursor:pointer}.editor-toolbar a.active,.editor-toolbar a:hover{background:#fcfcfc;border-color:#95a5a6}.editor-toolbar a:before{line-height:30px}.editor-toolbar i.separator{display:inline-block;width:0;border-left:1px solid #d9d9d9;border-right:1px solid #fff;color:transparent;text-indent:-10px;margin:0 6px}.editor-toolbar a.fa-header-x:after{font-family:Arial,Helvetica Neue,Helvetica,sans-serif;font-size:65%;vertical-align:text-bottom;position:relative;top:2px}.editor-toolbar a.fa-header-1:after{content:\"1\"}.editor-toolbar a.fa-header-2:after{content:\"2\"}.editor-toolbar a.fa-header-3:after{content:\"3\"}.editor-toolbar a.fa-header-bigger:after{content:\"\\25B2\"}.editor-toolbar a.fa-header-smaller:after{content:\"\\25BC\"}.editor-toolbar.disabled-for-preview a:not(.no-disable){pointer-events:none;background:#fff;border-color:transparent;text-shadow:inherit}@media only screen and (max-width:700px){.editor-toolbar a.no-mobile{display:none}}.editor-statusbar{padding:8px 10px;font-size:12px;color:#959694;text-align:right}.editor-statusbar span{display:inline-block;min-width:4em;margin-left:1em}.editor-preview,.editor-preview-side{padding:10px;background:#fafafa;overflow:auto;display:none;box-sizing:border-box}.editor-statusbar .lines:before{content:\"lines: \"}.editor-statusbar .words:before{content:\"words: \"}.editor-statusbar .characters:before{content:\"characters: \"}.editor-preview{position:absolute;width:100%;height:100%;top:0;left:0;z-index:7}.editor-preview-side{position:fixed;bottom:0;width:50%;top:50px;right:0;z-index:9;border:1px solid #ddd}.editor-preview-active,.editor-preview-active-side{display:block}.editor-preview-side>p,.editor-preview>p{margin-top:0}.editor-preview-side pre,.editor-preview pre{background:#eee;margin-bottom:10px}.editor-preview-side table td,.editor-preview-side table th,.editor-preview table td,.editor-preview table th{border:1px solid #ddd;padding:5px}.CodeMirror .CodeMirror-code .cm-tag{color:#63a35c}.CodeMirror .CodeMirror-code .cm-attribute{color:#795da3}.CodeMirror .CodeMirror-code .cm-string{color:#183691}.CodeMirror .CodeMirror-selected{background:#d9d9d9}.CodeMirror .CodeMirror-code .cm-header-1{font-size:200%;line-height:200%}.CodeMirror .CodeMirror-code .cm-header-2{font-size:160%;line-height:160%}.CodeMirror .CodeMirror-code .cm-header-3{font-size:125%;line-height:125%}.CodeMirror .CodeMirror-code .cm-header-4{font-size:110%;line-height:110%}.CodeMirror .CodeMirror-code .cm-comment{background:rgba(0,0,0,.05);border-radius:2px}.CodeMirror .CodeMirror-code .cm-link{color:#7f8c8d}.CodeMirror .CodeMirror-code .cm-url{color:#aab2b3}.CodeMirror .CodeMirror-code .cm-strikethrough{text-decoration:line-through}.CodeMirror .CodeMirror-placeholder{opacity:.5}.CodeMirror .cm-spell-error:not(.cm-url):not(.cm-comment):not(.cm-tag):not(.cm-word){background:rgba(255,0,0,.15)}", ""]);

// exports


/***/ }),
/* 221 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_221__;

/***/ }),
/* 222 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group vf-form-group"},[(_vm.label)?_c('label',{attrs:{"for":_vm.vf_uid}},[_vm._v(_vm._s(_vm.label)+":")]):_vm._e(),_vm._v(" "),(_vm.showInfo)?_c('p',{staticClass:"help-block vf-help-block"},[_vm._m(0)]):_vm._e(),_vm._v(" "),_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.aValue),expression:"aValue"}],attrs:{"id":_vm.vf_uid},domProps:{"value":(_vm.aValue)},on:{"input":function($event){if($event.target.composing){ return; }_vm.aValue=$event.target.value}}}),_vm._v(" "),(_vm.displayErrors)?_c('form-errors',_vm._b({},'form-errors',{errors: _vm.errors, warning: _vm.warning, property: _vm.property},false)):_vm._e(),_vm._v(" "),(!!_vm.$slots['help'])?_c('p',{staticClass:"help-block vf-help-block"},[_c('small',[_vm._t("help")],2)]):_vm._e()],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('small',[_vm._v("For information on Markdown syntax, "),_c('a',{attrs:{"href":"https://simplemde.com/markdown-guide","target":"_blank"}},[_vm._v("click here")])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 223 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormDateRange_vue__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormDateRange_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormDateRange_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormDateRange_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormDateRange_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_265faa18_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormDateRange_vue__ = __webpack_require__(226);
function injectStyle (ssrContext) {
  __webpack_require__(224)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormDateRange_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_265faa18_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormDateRange_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(225);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("2caf972c", content, true, {});

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports
exports.i(__webpack_require__(82), "");

// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 226 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group vf-form-group",class:_vm.formClass},[_c('label',{staticClass:"control-label vf-control-label",attrs:{"for":_vm.vf_uid}},[_vm._v(_vm._s(_vm.label)+": ")]),_vm._v(" "),_c('div',{staticClass:"input-group vf-input-group"},[_c('input',_vm._g(_vm._b({staticClass:"form-control vf-form-control",class:_vm.inputClass,style:(_vm.inputStyle),attrs:{"id":_vm.vf_uid,"name":_vm.label,"type":"text"},on:{"blur":_vm.onBlur,"focus":_vm.onFocus}},'input',_vm.$attrs,false),_vm.$listeners)),_vm._v(" "),_c('a',{staticClass:"input-group-addon input-group-prepend vf-input-group-addon vf-date-addon",on:{"click":function($event){$event.preventDefault();$event.stopPropagation();return _vm.clear($event)}}},[_vm._m(0)])]),_vm._v(" "),_vm._l((_vm.properties),function(property,idx){return _c('form-errors',{key:idx,attrs:{"errors":_vm.errors,"property":property}})}),_vm._v(" "),(!!_vm.$slots['help'])?_c('p',{staticClass:"help-block vf-help-block"},[_c('small',[_vm._t("help")],2)]):_vm._e()],2)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"input-group-text"},[_c('i',{staticClass:"fa fa-times-circle",attrs:{"aria-hidden":"true"}})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 227 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormDate_vue__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormDate_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormDate_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormDate_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormDate_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_044e4690_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormDate_vue__ = __webpack_require__(230);
function injectStyle (ssrContext) {
  __webpack_require__(228)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-044e4690"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormDate_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_044e4690_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormDate_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(229);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("6ba480a2", content, true, {});

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports
exports.i(__webpack_require__(82), "");

// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 230 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group vf-form-group",class:_vm.formClass},[_c('label',{staticClass:"control-label vf-control-label",attrs:{"for":_vm.vf_uid}},[_vm._v(_vm._s(_vm.aLabel))]),_vm._v(" "),_c('div',{staticClass:"input-group date"},[_c('input',_vm._g(_vm._b({staticClass:"form-control vf-form-control",class:_vm.inputClass,style:(_vm.inputStyle),attrs:{"id":_vm.vf_uid,"type":"text"},on:{"blur":_vm.onBlur,"focus":_vm.onFocus}},'input',_vm.$attrs,false),_vm.$listeners)),_vm._v(" "),_c('a',{staticClass:"input-group-addon input-group-prepend vf-input-group-addon",on:{"click":function($event){$event.preventDefault();$event.stopPropagation();return _vm.clear($event)}}},[_vm._m(0)])]),_vm._v(" "),(_vm.displayErrors)?_c('form-errors',_vm._b({},'form-errors',{errors: _vm.errors, warning: _vm.warning, property: _vm.property},false)):_vm._e(),_vm._v(" "),(!!_vm.$slots['help'])?_c('p',{staticClass:"help-block vf-help-block"},[_c('small',[_vm._t("help")],2)]):_vm._e()],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"input-group-text"},[_c('i',{staticClass:"fa fa-times-circle",attrs:{"aria-hidden":"true"}})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 231 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormDropzone_vue__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormDropzone_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormDropzone_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormDropzone_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormDropzone_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3828fbd0_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormDropzone_vue__ = __webpack_require__(232);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormDropzone_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3828fbd0_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormDropzone_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 232 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group vf-form-group upload"},[_c('transition',{attrs:{"name":"fade"}},[(_vm.id)?_c('div',[_c('label',[_vm._v(_vm._s(_vm.label))]),_vm._v(" "),_c('vue-dropzone',{attrs:{"existing":_vm.value,"url":_vm.requestEndpoint,"accepted-file-types":_vm.acceptedFileTypes,"headers":_vm.requestHeaders,"max-number-of-files":_vm.limit,"max-file-size-in-mb":_vm.maxFileSize},on:{"error":_vm.dzError,"success":_vm.dzAdded,"removed":_vm.dzRemoved}}),_vm._v(" "),_c('small',{staticClass:"help-block form-text"},[_vm._v(_vm._s(_vm.dzHelpText))]),_vm._v(" "),(_vm.helpText)?_c('small',{staticClass:"help-block form-text"},[_vm._v(_vm._s(_vm.helpText))]):_vm._e()],1):_c('div',[_c('small',{staticClass:"help-block form-text"},[_vm._v("File upload is available after initial save.")])])])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 233 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormDropzoneButton_vue__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormDropzoneButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormDropzoneButton_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormDropzoneButton_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormDropzoneButton_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_67c727b6_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormDropzoneButton_vue__ = __webpack_require__(234);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormDropzoneButton_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_67c727b6_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormDropzoneButton_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 234 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group vf-form-group upload"},[_c('transition',{attrs:{"name":"fade"}},[(_vm.id)?_c('div',[_c('div',{staticClass:"row"},[_c('label',{staticClass:"col-xs-12"},[_vm._v(_vm._s(_vm.label))])]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-xs-3"},[_c('vue-dropzone',{attrs:{"existing":_vm.value,"url":_vm.requestEndpoint,"accepted-file-types":_vm.acceptedFileTypes,"headers":_vm.requestHeaders,"max-number-of-files":_vm.limit,"max-file-size-in-mb":_vm.maxFileSize},on:{"error":_vm.dzError,"progress":function($event){_vm.progress = arguments[0]},"success":_vm.dzAdded,"removed":_vm.dzRemoved}},[_c('template',{slot:"button"},[_vm._v(_vm._s(_vm.btnText))])],2)],1),_vm._v(" "),_c('div',{staticClass:"col-xs-9"},[_c('form-progress-bar',{attrs:{"progress":_vm.progress}})],1)]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-xs-12"},[_c('small',{staticClass:"help-block form-text"},[_vm._v(_vm._s(_vm.dzHelpText))]),_vm._v(" "),(_vm.helpText)?_c('small',{staticClass:"help-block form-text"},[_vm._v(_vm._s(_vm.helpText))]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-xs-12"},[(!!_vm.$slots['thumbnail'])?[_vm._t("thumbnail")]:_vm._e()],2)])]):_c('div',[_c('small',{staticClass:"help-block form-text"},[_vm._v("File upload is available after initial save.")])])])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 235 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormFilePicker_vue__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormFilePicker_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormFilePicker_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormFilePicker_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormFilePicker_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_75239e67_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormFilePicker_vue__ = __webpack_require__(241);
function injectStyle (ssrContext) {
  __webpack_require__(236)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-75239e67"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormFilePicker_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_75239e67_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormFilePicker_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(237);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("a7988b66", content, true, {});

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".img-thumbnail.selected[data-v-75239e67]{max-height:50px}", ""]);

// exports


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(239);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("72f4b107", content, true, {});

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports
exports.i(__webpack_require__(90), "");

// module
exports.push([module.i, ".ml-1[data-v-7cdea0d4]{margin-left:1em}", ""]);

// exports


/***/ }),
/* 240 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form-modal',{on:{"close":function($event){_vm.$emit('close')}}},[_c('div',{staticClass:"row",attrs:{"slot":"body"},slot:"body"},[_c('transition',{attrs:{"name":"fade"}},[(_vm.errorMsg)?_c('div',{staticClass:"col-md-12 alert alert-danger alert-dismissible text-center",attrs:{"role":"alert"}},[_c('button',{staticClass:"close",attrs:{"type":"button","aria-label":"Close"},on:{"click":function($event){_vm.errorMsg=null}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])]),_vm._v(" "),_c('h3',[_vm._v(_vm._s(_vm.errorMsg))])]):_vm._e()]),_vm._v(" "),_c('transition',{attrs:{"name":"fade","mode":"out-in"}},[(_vm.selected)?_c('div',{key:"meta",staticClass:"col col-12"},[_c('form-file-edit',{attrs:{"src":_vm.fileSrc(_vm.selected),"property":"selected"},model:{value:(_vm.selected),callback:function ($$v) {_vm.selected=$$v},expression:"selected"}},[_c('div',{staticClass:"text-right",attrs:{"slot":"after"},slot:"after"},[_c('button',{staticClass:"btn btn-default",on:{"click":function($event){_vm.selected = null}}},[_vm._v("Back")]),_vm._v(" "),_c('button',{staticClass:"btn btn-primary ml-1",on:{"click":function($event){_vm.complete(_vm.selected)}}},[_vm._v("Insert")])])])],1):_c('div',{key:"gallery",staticClass:"row"},[_vm._l((_vm.pagedFiles),function(file,idx){return _c('div',{key:idx,staticClass:"col-md-4 text-center",on:{"click":function($event){_vm.choose(file, $event)}}},[_c('form-panel',[(_vm.isImage(_vm.fileSrc(file)))?_c('img',{staticClass:"img-thumbnail gallery",attrs:{"src":_vm.fileSrc(file)}}):_c('i',{staticClass:"fa fa-file-o fa-3x",staticStyle:{"font-size":"3em"},attrs:{"aria-hidden":"true"}}),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.fileSrc(file)))])])],1)}),_vm._v(" "),_c('div',{staticClass:"row text-center"},[(_vm.pagedFiles.length)?_c('div',{staticClass:"col-12 w-100 col-xs-12 text-right"},[_c('ul',{staticClass:"pagination"},[_c('li',{staticClass:"page-item",class:{disabled: !_vm.hasPrev}},[_c('a',{staticClass:"page-link",attrs:{"href":"javascript:void(0)"},on:{"click":function($event){$event.preventDefault();$event.stopPropagation();return _vm.pagePrev($event)}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("«")]),_vm._v(" "),_c('span',{},[_vm._v("Previous")])])]),_vm._v(" "),_c('li',{staticClass:"page-item",class:{disabled: !_vm.hasNext}},[_c('a',{staticClass:"page-link",attrs:{"href":"javascript:void(0)"},on:{"click":function($event){$event.preventDefault();$event.stopPropagation();return _vm.pageNext($event)}}},[_c('span',{},[_vm._v("Next")]),_vm._v(" "),_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("»")])])])])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"col-12 w-100 text-center"},[_c('h4',{staticClass:"help-text help-block"},[_vm._v("\n                            "+_vm._s(_vm.offset + 1)+" - "+_vm._s(_vm.offset + _vm.limit)+" of "+_vm._s(_vm.files.length)+"\n                        ")])])])],2)])],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 241 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group"},[(_vm.showModal)?_c('form-file-gallery',_vm._b({on:{"choose":_vm.choose,"close":_vm.close}},'form-file-gallery',{srcKey: _vm.srcKey, endpoint: _vm.endpoint, headers: _vm.headers},false)):_vm._e(),_vm._v(" "),_c('button',{staticClass:"btn btn-default",on:{"click":_vm.open}},[_vm._v(_vm._s(_vm.btnText))]),_vm._v(" "),(_vm.isImage(_vm.aValue))?_c('span',[_c('img',{staticClass:"img-thumbnail selected",staticStyle:{"height":"2.4em"},attrs:{"src":_vm.aValue}}),_vm._v(" "+_vm._s(_vm.aValue))]):(_vm.aValue)?_c('span',[_c('i',{staticClass:"fa fa-file-o",attrs:{"aria-hidden":"true"}}),_vm._v(" "+_vm._s(_vm.aValue))]):_vm._e(),_vm._v(" "),_c('transition',{attrs:{"name":"fade"}},[(_vm.aValue)?_c('a',{staticClass:"pull-right text-danger",attrs:{"href":"#"},on:{"click":function($event){_vm.aValue = null}}},[_c('i',{staticClass:"fa fa-times-circle",attrs:{"aria-hidden":"true"}})]):_vm._e()])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 242 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormFileEdit_vue__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormFileEdit_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormFileEdit_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormFileEdit_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormFileEdit_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2880a92c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormFileEdit_vue__ = __webpack_require__(246);
function injectStyle (ssrContext) {
  __webpack_require__(243)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2880a92c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormFileEdit_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2880a92c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormFileEdit_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(244);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("c9f624bc", content, true, {});

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports
exports.i(__webpack_require__(245), "");

// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".vf-icon{min-width:2em;min-height:2em}.vf-icon:after{content:\" \";height:2em;width:2em;display:block;background-repeat:no-repeat;background-position:50%;background-size:100%}.vf-icon-image-center:after{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3c?xml version='1.0'?%3e%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3e%3cpath d='M9 9h6c.554 0 1 .446 1 1v5c0 .554-.446 1-1 1H9c-.554 0-1-.446-1-1v-5c0-.554.446-1 1-1zm-5.5 9h17a.5.5 0 0 1 0 1h-17a.5.5 0 0 1 0-1zm0-12h17a.5.5 0 0 1 0 1h-17a.5.5 0 0 1 0-1z' id='align-center'/%3e%3c/svg%3e\")}.vf-icon-image-right:after{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3c?xml version='1.0'?%3e%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3e%3cpath d='M20 9h-6c-.554 0-1 .446-1 1v5c0 .554.446 1 1 1h6c.554 0 1-.446 1-1v-5c0-.554-.446-1-1-1zm-9.5 0h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1zm0 3h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1zm0 3h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1zm10-9h-17a.5.5 0 0 0 0 1h17a.5.5 0 0 0 0-1zm0 12h-17a.5.5 0 0 0 0 1h17a.5.5 0 0 0 0-1z' id='align-float-right'/%3e%3c/svg%3e\")}.vf-icon-image-left:after{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3c?xml version='1.0'?%3e%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3e%3cpath d='M4 9h6c.554 0 1 .446 1 1v5c0 .554-.446 1-1 1H4c-.554 0-1-.446-1-1v-5c0-.554.446-1 1-1zm9.5 0h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1zm0 3h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1zm0 3h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1zm-10-9h17a.5.5 0 0 1 0 1h-17a.5.5 0 0 1 0-1zm0 12h17a.5.5 0 0 1 0 1h-17a.5.5 0 0 1 0-1z' id='align-float-left'/%3e%3c/svg%3e\")}", ""]);

// exports


/***/ }),
/* 246 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-md-12 row"},[_c('div',{staticClass:"col-md-4"},[_c('img',{staticClass:"img-thumbnail selected",style:(_vm.thumbStyle),attrs:{"src":_vm.src}})]),_vm._v(" "),_c('div',{staticClass:"col-md-8"},[_vm._t("before"),_vm._v(" "),_c('form-text',{attrs:{"disabled":true,"property":"src"},model:{value:(_vm.src),callback:function ($$v) {_vm.src=$$v},expression:"src"}}),_vm._v(" "),_c('form-text',{attrs:{"property":"alt"},model:{value:(_vm.aValue.alt),callback:function ($$v) {_vm.$set(_vm.aValue, "alt", $$v)},expression:"aValue.alt"}}),_vm._v(" "),_c('form-number',{attrs:{"min":0,"value":_vm.aValue.width,"placeholder":"auto","property":"width"},on:{"input":_vm.updateWidth}}),_vm._v(" "),_c('form-number',{attrs:{"min":0,"value":_vm.aValue.height,"placeholder":"auto","property":"height"},on:{"input":_vm.updateHeight}}),_vm._v(" "),_c('form-checkbox',{attrs:{"property":"constrain"},model:{value:(_vm.aValue.constrain),callback:function ($$v) {_vm.$set(_vm.aValue, "constrain", $$v)},expression:"aValue.constrain"}}),_vm._v(" "),_c('form-select',{attrs:{"options":_vm.alignment,"property":"align"},model:{value:(_vm.aValue.align),callback:function ($$v) {_vm.$set(_vm.aValue, "align", $$v)},expression:"aValue.align"}}),_vm._v(" "),_c('div',{staticClass:"form-group vf-form-group"},[_c('label',{staticClass:"control-label vf-control-label"},[_vm._v("Alginment")]),_vm._v(" "),_c('div',{staticClass:"btn-group"},_vm._l((_vm.alignment),function(align,idx){return _c('button',{key:idx,staticClass:"btn btn-default",class:{active: (_vm.aValue.align == align.value)},on:{"click":function($event){_vm.selectAlignment(align.value)}}},[_c('i',{staticClass:"vf-icon",class:("vf-icon-image-" + (align.value))})])}))]),_vm._v(" "),_c('form-textarea',{attrs:{"rows":2,"property":"caption"},model:{value:(_vm.aValue.caption),callback:function ($$v) {_vm.$set(_vm.aValue, "caption", $$v)},expression:"aValue.caption"}}),_vm._v(" "),_vm._t("after")],2)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 247 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSeoData_vue__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSeoData_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSeoData_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSeoData_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSeoData_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1acfff7a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormSeoData_vue__ = __webpack_require__(248);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSeoData_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1acfff7a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormSeoData_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 248 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form-panel',[_c('h4',[_vm._v("SEO Tags")]),_vm._v(" "),_c('form-text',{attrs:{"property":"{property}.meta_title","errors":_vm.errors,"label":"Meta Title"},model:{value:(_vm.aValue.meta_title),callback:function ($$v) {_vm.$set(_vm.aValue, "meta_title", $$v)},expression:"aValue.meta_title"}}),_vm._v(" "),_c('form-text',{attrs:{"property":"{property}.meta_description","errors":_vm.errors,"label":"Meta Description"},model:{value:(_vm.aValue.meta_description),callback:function ($$v) {_vm.$set(_vm.aValue, "meta_description", $$v)},expression:"aValue.meta_description"}}),_vm._v(" "),_c('form-text',{attrs:{"property":"{property}.meta_keywords","errors":_vm.errors,"label":"Meta Keywords"},model:{value:(_vm.aValue.meta_keywords),callback:function ($$v) {_vm.$set(_vm.aValue, "meta_keywords", $$v)},expression:"aValue.meta_keywords"}}),_vm._v(" "),_c('form-text',{attrs:{"property":"{property}.og_title","errors":_vm.errors,"label":"OG Title"},model:{value:(_vm.aValue.og_title),callback:function ($$v) {_vm.$set(_vm.aValue, "og_title", $$v)},expression:"aValue.og_title"}}),_vm._v(" "),_c('form-text',{attrs:{"property":"{property}.og_description","errors":_vm.errors,"label":"OG Description"},model:{value:(_vm.aValue.og_description),callback:function ($$v) {_vm.$set(_vm.aValue, "og_description", $$v)},expression:"aValue.og_description"}}),_vm._v(" "),_c('form-text',{attrs:{"property":"{property}.og_image","errors":_vm.errors,"label":"OG Image","placeholder":"https://path.to.image"},model:{value:(_vm.aValue.og_image),callback:function ($$v) {_vm.$set(_vm.aValue, "og_image", $$v)},expression:"aValue.og_image"}},[_c('template',{slot:"help"},[_vm._v("Must Be A Valid URL")])],2)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 249 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormAddress_vue__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormAddress_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormAddress_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormAddress_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormAddress_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_af35601a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormAddress_vue__ = __webpack_require__(256);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormAddress_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_af35601a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormAddress_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 250 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form-select',_vm._b({attrs:{"use-key-as-value":true,"multiple":false,"width":"100%"},model:{value:(_vm.aValue),callback:function ($$v) {_vm.aValue=$$v},expression:"aValue"}},'form-select',{
        property: _vm.property,
        options: _vm.options,
        label: _vm.label,
        errors: _vm.errors,
        disabled: _vm.disabled,
        required: _vm.required,
    },false))}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 251 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormCountrySelect_vue__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormCountrySelect_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormCountrySelect_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormCountrySelect_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormCountrySelect_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7be7ae90_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormCountrySelect_vue__ = __webpack_require__(252);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormCountrySelect_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7be7ae90_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormCountrySelect_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 252 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form-select',_vm._b({attrs:{"multiple":false,"width":"100%"},model:{value:(_vm.aValue),callback:function ($$v) {_vm.aValue=$$v},expression:"aValue"}},'form-select',{
        property: _vm.property,
        options: _vm.options,
        label: _vm.label,
        errors: _vm.errors,
        disabled: _vm.disabled,
        required: _vm.required,
    },false))}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(254);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("fad76a80", content, true, {});

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".vf-google-place-lookup[data-v-0365c97f]{margin-top:5px;margin-bottom:15px}", ""]);

// exports


/***/ }),
/* 255 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.aValue),expression:"aValue"}],staticClass:"form-control vf-google-place-lookup",attrs:{"name":"lookup","type":"text","placeholder":"Lookup Address..."},domProps:{"value":(_vm.aValue)},on:{"input":function($event){if($event.target.composing){ return; }_vm.aValue=$event.target.value}}})}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 256 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form-section',{attrs:{"heading":"Address"}},[(_vm.showLookup)?_c('form-google-place-lookup',{on:{"selected":_vm.placeSelected}}):_vm._e(),_vm._v(" "),(!!_vm.$slots['before'])?_c('div',{staticClass:"row"},[_vm._t("before")],2):_vm._e(),_vm._v(" "),_c('div',{staticClass:"row"},[_c('form-text',{staticClass:"col-md-12",attrs:{"property":(_vm.property + ".line_1"),"label":"Line 1"},model:{value:(_vm.aValue.line_1),callback:function ($$v) {_vm.$set(_vm.aValue, "line_1", $$v)},expression:"aValue.line_1"}}),_vm._v(" "),_c('form-text',{staticClass:"col-md-12",attrs:{"property":(_vm.property + ".line_2"),"label":"Line 2"},model:{value:(_vm.aValue.line_2),callback:function ($$v) {_vm.$set(_vm.aValue, "line_2", $$v)},expression:"aValue.line_2"}})],1),_vm._v(" "),_c('div',{staticClass:"row"},[_c('form-text',{staticClass:"col-md-4",attrs:{"property":(_vm.property + ".city"),"label":"City"},model:{value:(_vm.aValue.city),callback:function ($$v) {_vm.$set(_vm.aValue, "city", $$v)},expression:"aValue.city"}}),_vm._v(" "),(_vm.stateSelect)?_c('form-state-select',{staticClass:"col-md-4",attrs:{"property":(_vm.property + ".state"),"label":"State"},model:{value:(_vm.aValue.state),callback:function ($$v) {_vm.$set(_vm.aValue, "state", $$v)},expression:"aValue.state"}}):_c('form-text',{staticClass:"col-md-4",attrs:{"property":(_vm.property + ".state"),"label":"State"},model:{value:(_vm.aValue.state),callback:function ($$v) {_vm.$set(_vm.aValue, "state", $$v)},expression:"aValue.state"}}),_vm._v(" "),_c('form-text-mask',{staticClass:"col-md-4",attrs:{"property":(_vm.property + ".postal_code"),"label":"Postal Code","placeholder":"55555-5555","mask":"#####-####"},model:{value:(_vm.aValue.postal_code),callback:function ($$v) {_vm.$set(_vm.aValue, "postal_code", $$v)},expression:"aValue.postal_code"}})],1),_vm._v(" "),_c('div',{staticClass:"row"},[(_vm.stateSelect)?_c('form-country-select',{staticClass:"col-md-4 col-md-offset-8",attrs:{"property":(_vm.property + ".country"),"label":"Country"},model:{value:(_vm.aValue.country),callback:function ($$v) {_vm.$set(_vm.aValue, "country", $$v)},expression:"aValue.country"}}):_vm._e()],1),_vm._v(" "),(_vm.includeCoordinates)?_c('div',{staticClass:"row"},[_c('form-number',{staticClass:"col-md-6",attrs:{"max":90,"min":-90,"property":(_vm.property + ".lat"),"label":"Latitude"},model:{value:(_vm.aValue.lat),callback:function ($$v) {_vm.$set(_vm.aValue, "lat", $$v)},expression:"aValue.lat"}}),_vm._v(" "),_c('form-number',{staticClass:"col-md-6",attrs:{"max":90,"min":-90,"property":(_vm.property + ".lng"),"label":"Longitude"},model:{value:(_vm.aValue.lng),callback:function ($$v) {_vm.$set(_vm.aValue, "lng", $$v)},expression:"aValue.lng"}})],1):_vm._e(),_vm._v(" "),(!!_vm.$slots['after'])?_c('div',{staticClass:"row"},[_vm._t("after")],2):_vm._e(),_vm._v(" "),(!!_vm.$slots['help'])?_c('p',{staticClass:"help-block vf-help-block"},[_c('small',[_vm._t("help")],2)]):_vm._e()],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 257 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormNamePrefixSelect_vue__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormNamePrefixSelect_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormNamePrefixSelect_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormNamePrefixSelect_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormNamePrefixSelect_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_148d5fea_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormNamePrefixSelect_vue__ = __webpack_require__(258);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormNamePrefixSelect_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_148d5fea_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormNamePrefixSelect_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 258 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form-select',_vm._b({attrs:{"multiple":false},model:{value:(_vm.aValue),callback:function ($$v) {_vm.aValue=$$v},expression:"aValue"}},'form-select',{placeholder: _vm.placeholder, label: _vm.label, property: _vm.property, options: _vm.options, errors: _vm.errors, width: _vm.width},false))}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 259 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormNameSuffixSelect_vue__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormNameSuffixSelect_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormNameSuffixSelect_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormNameSuffixSelect_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormNameSuffixSelect_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f0d23248_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormNameSuffixSelect_vue__ = __webpack_require__(260);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormNameSuffixSelect_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f0d23248_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormNameSuffixSelect_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 260 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form-select',_vm._b({attrs:{"multiple":false},model:{value:(_vm.aValue),callback:function ($$v) {_vm.aValue=$$v},expression:"aValue"}},'form-select',{placeholder: _vm.placeholder, label: _vm.label, property: _vm.property, options: _vm.options, errors: _vm.errors, width: _vm.width},false))}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 261 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormPanel_vue__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormPanel_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormPanel_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormPanel_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormPanel_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0cf377fc_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormPanel_vue__ = __webpack_require__(262);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormPanel_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0cf377fc_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormPanel_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 262 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"panel",class:_vm.panelClass},[(_vm.hasHeaderSlot)?_c('div',{staticClass:"panel-heading"},[_c('h4',[_vm._t("heading")],2)]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"panel-body"},[_vm._t("default")],2),_vm._v(" "),(_vm.hasFooterSlot)?_c('div',{staticClass:"panel-footer"},[_vm._t("footer")],2):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 263 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormGroup_vue__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormGroup_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormGroup_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormGroup_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormGroup_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6a60b5b6_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormGroup_vue__ = __webpack_require__(264);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormGroup_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6a60b5b6_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormGroup_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 264 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"panel panel-default vf-panel"},[_c('div',{staticClass:"panel-heading clearfix",class:{movable: _vm.movable, },on:{"click":function($event){_vm.isCollapsed = !_vm.isCollapsed}}},[_c('div',{staticClass:"pull-left"},[_vm._t("heading",[_vm._v("\n                "+_vm._s(_vm.heading)+"\n            ")])],2),_vm._v(" "),_c('div',{staticClass:"pull-right"},[_c('i',{staticClass:"fa",class:_vm.isCollapsed ? "fa-caret-up" : "fa-caret-down",attrs:{"aria-hidden":"true"}})])]),_vm._v(" "),_c('div',{staticClass:"panel-collapse collapse",class:{ 'in': !_vm.isCollapsed }},[_c('div',{staticClass:"panel-body"},[_vm._t("default")],2)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 265 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSection_vue__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSection_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSection_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSection_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSection_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6b6d31a1_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormSection_vue__ = __webpack_require__(268);
function injectStyle (ssrContext) {
  __webpack_require__(266)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6b6d31a1"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSection_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6b6d31a1_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormSection_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(267);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("6224c341", content, true, {});

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".vf-form-section[data-v-6b6d31a1]{margin-top:1em}.vf-form-section>.row[data-v-6b6d31a1]{margin-left:0;margin-right:0}.vf-form-section .vf-section-title[data-v-6b6d31a1]{width:100%;padding-bottom:1em;border-bottom:1px solid #eee}", ""]);

// exports


/***/ }),
/* 268 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vf-form-section"},[_c('h4',{staticClass:"vf-section-title"},[_vm._t("heading",[_vm._v(_vm._s(_vm.heading))])],2),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col"},[_vm._t("default")],2)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 269 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormLoader_vue__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormLoader_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormLoader_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormLoader_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormLoader_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4da4202d_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormLoader_vue__ = __webpack_require__(272);
function injectStyle (ssrContext) {
  __webpack_require__(270)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormLoader_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4da4202d_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormLoader_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(271);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("b1130332", content, true, {});

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".loader-wrapper{height:24px;width:24px;position:relative;margin-right:10px;margin-left:10px}.loading-transition{-webkit-transition:all 1s ease;transition:all 1s ease;overflow:hidden}.loading-enter,.loading-leave{opacity:0}.loader{width:100%;height:auto;text-align:center}.loader p{color:#158ca0;font-size:1em;text-transform:uppercase}.loader div{display:block;position:absolute;top:50%;left:50%;border-radius:50%;background-color:transparent;box-shadow:inset 0 0 0 .5em transparent;background:transparent;background-blend-mode:multiply;border-top:2px solid #158ca0;border-left:2px solid #b1c291;border-bottom:2px solid #fd5653;border-right:2px solid #ffd15b}.loader div.ring-1{height:10px;width:10px;margin-top:-5px;margin-left:-5px;-webkit-animation:roto 2s infinite linear;animation:roto 2s infinite linear}.loader div.ring-2{height:16px;width:16px;margin-top:-8px;margin-left:-8px;-webkit-animation:rotob 3s infinite cubic-bezier(.1,1.15,1,1);animation:rotob 3s infinite cubic-bezier(.1,1.15,1,1)}.loader div.ring-3{height:22px;width:22px;margin-top:-11px;margin-left:-11px;-webkit-animation:roto 1s infinite linear;animation:roto 1s infinite linear}@-webkit-keyframes roto{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes roto{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@-webkit-keyframes rotob{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(-1turn);transform:rotate(-1turn)}}@keyframes rotob{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(-1turn);transform:rotate(-1turn)}}", ""]);

// exports


/***/ }),
/* 272 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"loader-wrapper"},[_c('transition',{attrs:{"name":"fade"}},[(_vm.loading)?_c('div',{staticClass:"loader"},[_c('div',{staticClass:"ring-1"}),_vm._v(" "),_c('div',{staticClass:"ring-2"}),_vm._v(" "),_c('div',{staticClass:"ring-3"})]):_vm._e()])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 273 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormAlert_vue__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormAlert_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormAlert_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormAlert_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormAlert_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_52e2a0ea_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormAlert_vue__ = __webpack_require__(276);
function injectStyle (ssrContext) {
  __webpack_require__(274)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-52e2a0ea"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormAlert_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_52e2a0ea_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormAlert_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(275);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("631cf314", content, true, {});

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports
exports.i(__webpack_require__(90), "");

// module
exports.push([module.i, ".vf-toast-message[data-v-52e2a0ea]{padding-left:15px;padding-right:15px}.vf-alert[data-v-52e2a0ea]{position:fixed;right:2em;top:0;z-index:5000;transition:all .3s ease}.vf-alert .alert.top[data-v-52e2a0ea]{position:fixed;right:2em;top:1em}.vf-alert .alert.bottom[data-v-52e2a0ea]{position:fixed;right:2em;bottom:1em}", ""]);

// exports


/***/ }),
/* 276 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vf-alert",attrs:{"id":"vf-form-alert-panel"}},[_c('transition-group',{attrs:{"name":_vm.animation}},_vm._l((_vm.messages),function(message,idx){return _c('div',{key:(idx + "-" + (message.hash)),staticClass:"alert alert-dismissable",class:_vm.toastClass(message),style:({"z-index": message.zIndex})},[_c('a',{staticClass:"close",attrs:{"href":"#","aria-label":"close"},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();_vm.dismissToast(message, true)}}},[_vm._v("×")]),_vm._v(" "),_c('span',{staticClass:"vf-toast-message",domProps:{"innerHTML":_vm._s(message.text)}}),_vm._v(" "),_vm._t("default")],2)})),_vm._v(" "),(_vm.alert)?_c('form-modal',{staticClass:"vf-modal-sm",on:{"close":_vm.closeAlert}},[_c('div',{staticClass:"text-center",attrs:{"slot":"body"},slot:"body"},[(!!_vm.alert.status)?_c('h1',[_c('i',{staticClass:"fa fa-3x",class:_vm.alertIconClass,attrs:{"aria-hidden":"true"}})]):_vm._e(),_vm._v(" "),_c('h4',{domProps:{"innerHTML":_vm._s(_vm.alert.message)}}),_vm._v(" "),(_vm.flattenedAlertErrors.length)?_c('ul',{staticClass:"list-unstyled text-danger"},_vm._l((_vm.flattenedAlertErrors),function(error,key){return _c('li',{key:key,staticClass:"list-item"},[_c('b',[_vm._v(_vm._s(error))])])})):_vm._e()]),_vm._v(" "),(_vm.alert.promise)?_c('div',{staticClass:"text-right",attrs:{"slot":"footer"},slot:"footer"},[_c('div',{staticClass:"btn btn-danger",on:{"click":function($event){_vm.alert.promise.reject({status: "cancelled"})}}},[_vm._v(_vm._s(_vm.alert.cancelText || 'Cancel'))]),_vm._v(" "),_c('div',{staticClass:"btn btn-default btn-primary",on:{"click":function($event){_vm.alert.promise.resolve({status: "confirmed"})}}},[_vm._v(_vm._s(_vm.alert.confirmText || 'OK'))])]):_vm._e()]):_vm._e()],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 277 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormModal_vue__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormModal_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormModal_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormModal_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormModal_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7f569e92_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormModal_vue__ = __webpack_require__(281);
function injectStyle (ssrContext) {
  __webpack_require__(278)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7f569e92"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormModal_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7f569e92_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormModal_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(279);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("34c67c04", content, true, {});

/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports
exports.i(__webpack_require__(280), "");

// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".vf-modal-mask{position:fixed;z-index:2000;top:0;left:0;bottom:0;right:0;width:100%;height:100%;background-color:rgba(0,0,0,.5);display:block;transition:opacity .3s ease;overflow:scroll}.vf-modal-mask.vf-modal-rounded>.vf-modal-wrapper>.vf-modal-container{border-radius:3em}.vf-modal-mask.vf-modal-large>.vf-modal-wrapper>.vf-modal-container{width:90%;margin-left:5%;margin-right:5%}.vf-modal-mask.vf-modal-small>.vf-modal-wrapper>.vf-modal-container{width:60%;margin-left:20%;margin-right:20%}.vf-modal-wrapper{display:block;position:relative;height:100%;overflow:scroll}.vf-modal-container{position:relative;width:80%;margin:5% 10%;padding:20px 30px;background-color:#fff;border-radius:2px;box-shadow:0 2px 8px rgba(0,0,0,.33);transition:all .3s ease}.vf-modal-sm .vf-modal-container{width:60%;margin-left:auto;margin-right:auto}.vf-modal-close{z-index:2;cursor:pointer}.vf-modal-header h3{margin-top:0;color:#42b983}.vf-modal-body{margin:20px 0}.vf-modal-default-button{float:right}.vf-modal-enter,.vf-modal-leave-active{opacity:0}.vf-modal-enter .vf-modal-container,.vf-modal-leave-active .vf-modal-container{-webkit-transform:scale(1.1);transform:scale(1.1)}", ""]);

// exports


/***/ }),
/* 281 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"vf-modal"}},[_c('div',{staticClass:"vf-modal-mask"},[_c('div',{staticClass:"vf-modal-wrapper"},[_c('div',{staticClass:"vf-modal-container"},[(!_vm.hideHeader)?[_c('span',{staticClass:"vf-modal-close close",on:{"click":function($event){_vm.$emit('close')}}},[_vm._v("x")]),_vm._v(" "),(!!_vm.$slots.header)?_c('div',{staticClass:"vf-modal-header clearfix"},[_c('h4',[_vm._t("header")],2)]):_vm._e()]:_vm._e(),_vm._v(" "),_c('div',{staticClass:"vf-modal-body clearfix"},[_vm._t("body",[_vm._v("\n                        default body\n                    ")])],2),_vm._v(" "),(!_vm.hideFooter)?_c('div',{staticClass:"vf-modal-footer clearfix"},[_vm._t("footer",[_c('button',{staticClass:"btn btn-primary vf-modal-default-button",on:{"click":function($event){_vm.$emit('close')}}},[_vm._v("Close")])])],2):_vm._e()],2)])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 282 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormProgressBar_vue__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormProgressBar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormProgressBar_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormProgressBar_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormProgressBar_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_84a847ec_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormProgressBar_vue__ = __webpack_require__(283);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormProgressBar_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_84a847ec_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormProgressBar_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 283 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"progress"},[_c('div',{staticClass:"progress-bar",style:(_vm.barStyle),attrs:{"aria-valuenow":_vm.progress,"aria-valuemin":_vm.min,"aria-valuemax":_vm.max,"role":"progressbar"}},[_c('span',{staticClass:"sr-only"},[_vm._v(_vm._s(_vm.progress)+"% Complete")])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 284 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormErrors_vue__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormErrors_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormErrors_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormErrors_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormErrors_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_905452c4_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormErrors_vue__ = __webpack_require__(287);
function injectStyle (ssrContext) {
  __webpack_require__(285)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-905452c4"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormErrors_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_905452c4_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormErrors_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(286);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("552ab645", content, true, {});

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".error.list-unstyled[data-v-905452c4]{margin-bottom:0}.has-error .help-block[data-v-905452c4]{margin:0}", ""]);

// exports


/***/ }),
/* 287 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"fade"}},[(_vm.hasError || _vm.hasWarning)?_c('ul',{staticClass:"error list-unstyled pull-right"},[_vm._l((_vm.typeErrors),function(err,idx){return (_vm.hasError)?_c('li',{key:idx},[_c('small',{staticClass:"help-block form-text text-danger"},[_vm._v(_vm._s(err))])]):_vm._e()}),_vm._v(" "),(!_vm.hasError && _vm.hasWarning)?_c('li',[_c('small',{staticClass:"help-block form-text text-warning"},[_vm._v(_vm._s(this.warning))])]):_vm._e()],2):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 288 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSaveButton_vue__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSaveButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSaveButton_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSaveButton_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSaveButton_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9110aa5e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormSaveButton_vue__ = __webpack_require__(291);
function injectStyle (ssrContext) {
  __webpack_require__(289)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-9110aa5e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormSaveButton_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9110aa5e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormSaveButton_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(290);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("0a3084a8", content, true, {});

/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "button[data-v-9110aa5e]:disabled,button[disabled][data-v-9110aa5e]{cursor:not-allowed}.btn.btn-save[data-v-9110aa5e]{min-width:110px}.btn.btn-dirty[data-v-9110aa5e]{-webkit-animation:pulse-data-v-9110aa5e 1.5s infinite}@-webkit-keyframes pulse-data-v-9110aa5e{70%{opacity:.8}}", ""]);

// exports


/***/ }),
/* 291 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group vf-form-group row"},[_c('div',{staticClass:"col-md-12 text-right"},[(_vm.deletable)?_c('button',{staticClass:"btn btn-danger btn-delete btn-block",class:{ 'active': _vm.saving },attrs:{"disabled":_vm.saving || _vm.removing},on:{"click":function($event){_vm.remove()}}},[(_vm.removing)?_c('i',{staticClass:"fa fa-spinner fa-spin"}):_vm._e(),_vm._v("\n            "+_vm._s((_vm.removing ? _vm.altRemoveLabel : _vm.removeLabel))+"\n        ")]):_vm._e(),_vm._v(" "),_vm._t("before"),_vm._v(" "),_c('button',{staticClass:"btn btn-primary btn-save btn-block",class:{ 'active': _vm.saving, 'btn-dirty' : _vm.isDirty },attrs:{"disabled":_vm.saving || _vm.removing || _vm.disabled},on:{"click":function($event){_vm.save()}}},[(_vm.saving)?_c('i',{staticClass:"fa fa-spinner fa-spin"}):_vm._e(),_vm._v("\n            "+_vm._s((_vm.saving ? _vm.altLabel : _vm.label))+"\n        ")]),_vm._v(" "),_vm._t("after")],2)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 292 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormCkeditor_vue__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormCkeditor_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormCkeditor_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormCkeditor_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormCkeditor_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_201bb47a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormCkeditor_vue__ = __webpack_require__(301);
function injectStyle (ssrContext) {
  __webpack_require__(293)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FormCkeditor_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_201bb47a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FormCkeditor_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(294);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("648bffcf", content, true, {});

/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".ck-editor__editable{min-height:10em}", ""]);

// exports


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(296), __esModule: true };

/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(52);
__webpack_require__(297);
module.exports = __webpack_require__(7).Array.from;


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(13);
var $export = __webpack_require__(8);
var toObject = __webpack_require__(33);
var call = __webpack_require__(57);
var isArrayIter = __webpack_require__(58);
var toLength = __webpack_require__(30);
var createProperty = __webpack_require__(298);
var getIterFn = __webpack_require__(59);

$export($export.S + $export.F * !__webpack_require__(64)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(11);
var createDesc = __webpack_require__(26);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(44);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 301 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.hasEditor)?_c('div',{staticClass:"form-group vf-form-group",class:_vm.formClass},[_c('label',{staticClass:"control-label vf-control-label",attrs:{"for":_vm.vf_uid}},[_vm._v(_vm._s(_vm.aLabel))]),_vm._v(" "),(_vm.showModal)?_c('form-file-gallery',{attrs:{"add-meta":true,"endpoint":_vm.$vfconfig.filesEndpoint('/images'),"errors":_vm.errors,"src-key":"path"},on:{"choose":_vm.chooseFile,"close":_vm.closeFilePicker}}):_vm._e(),_vm._v(" "),_c('div',{on:{"click":function($event){_vm.showModal=true}}},[_vm._v("Insert Image")]),_vm._v(" "),_c('textarea',{attrs:{"name":_vm.property,"rows":_vm.rows,"id":_vm.vf_uid}},[_vm._v("        <div>--- Enter Text Here ---</div>\n        <div>--- Place Image Above ---</div>\n    ")]),_vm._v(" "),(_vm.displayErrors)?_c('form-errors',_vm._b({},'form-errors',{errors: _vm.errors, warning: _vm.warning, property: _vm.property},false)):_vm._e(),_vm._v(" "),(!!_vm.$slots['help'])?_c('p',{staticClass:"help-block vf-help-block"},[_c('small',[_vm._t("help")],2)]):_vm._e()],1):_vm._e()}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })
/******/ ]);
});