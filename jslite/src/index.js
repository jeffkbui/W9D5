const DOMNodeCollection = require("./dom_node_collection");

window.$l = (arg) => {
  if (typeof arg === "string") {
    const i = document.querySelectorAll(arg);
    return new DOMNodeCollection(Array.from(i));
  } else if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  }
  
};


const x = new DOMNodeCollection([]);

window.x = x;
