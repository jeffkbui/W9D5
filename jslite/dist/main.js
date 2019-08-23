/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor(nodes) {\n    this.nodes = nodes;\n  }\n\n  html(html) {\n    if (typeof html === \"string\") {\n      this.nodes.forEach( (node) => {\n        node.innerHTML = html;\n      });\n    } else {\n      return this.nodes[0].innerHTML;\n    }\n  } \n\n  empty() {\n    this.html(\"\");\n  }\n\n  append(arg) {\n    if (arg instanceof HTMLElement) {\n      this.nodes.emptyforEach( (node) => {\n        node.innerHTML += arg.outerHTML;\n      });\n    } else if (typeof arg === \"string\" ) {\n      this.nodes.forEach((node) => {\n        node.innerHTML += arg;\n      });\n    }\n  }\n\n  attr(getter, setter) {\n    let el = this.nodes[0];\n\n    if (setter) {\n      const att = document.createAttribute(`${getter}`);\n      att.value = `${setter}`;\n      el.setAttributeNode(att);\n    } else {\n      return el.getAttribute(`${getter}`);\n    }\n  }\n\n  addClass(c, val) {\n    this.nodes.forEach((node) => {\n      const att = document.createAttribute(`${c}`);\n      att.value = `${val}`;\n      node.setAttributeNode(att);\n    });\n  }\n\n  removeClass(...args) {\n    this.nodes.forEach((node) => {\n      args.forEach((arg) => {\n        node.removeAttribute(`${arg}`);\n      });\n\n    });\n  }\n\n  children() {\n    let childrens = [];\n\n    this.nodes.forEach((node) => {\n      childrens.push(node.children);\n    });\n\n    return new DOMNodeCollection(childrens);\n  }\n\n  parent() {\n    let parents = [];\n\n    this.nodes.forEach((node) => {\n      parents.push(node.parentNode);\n    });\n\n    return new DOMNodeCollection(parents);\n  }\n\n  find(node, aSelector) {\n    let selectors = [];\n\n    let arr = Array.from(node.children);\n\n    arr.forEach((nodeChild) => {\n      if (nodeChild.localName === aSelector) {\n        selectors.push(nodeChild);\n      }\n    });\n\n    return new DOMNodeCollection(selectors);\n  }\n\n  remove(val) {\n    this.nodes.forEach((node) => {\n      let childs = node.children;\n      for (let prop in childs) {\n        for (let i = 0; i < childs.length; i++) {\n          childs[i].remove();\n        }\n      }\n    });\n  }\n}\n\n\nmodule.exports = DOMNodeCollection;\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection */ \"./src/dom_node_collection.js\");\n\nwindow.$l = (arg) => {\n  if (typeof arg === \"string\") {\n    const i = document.querySelectorAll(arg);\n    return new DOMNodeCollection(Array.from(i));\n  } else if (arg instanceof HTMLElement) {\n    return new DOMNodeCollection([arg]);\n  }\n  \n};\n\n\nconst x = new DOMNodeCollection([]);\n\nwindow.x = x;\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });