class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(html) {
    if (typeof html === "string") {
      this.nodes.forEach( (node) => {
        node.innerHTML = html;
      });
    } else {
      return this.nodes[0].innerHTML;
    }
  } 

  empty() {
    this.html("");
  }

  append(arg) {
    if (arg instanceof HTMLElement) {
      this.nodes.emptyforEach( (node) => {
        node.innerHTML += arg.outerHTML;
      });
    } else if (typeof arg === "string" ) {
      this.nodes.forEach((node) => {
        node.innerHTML += arg;
      });
    }
  }

  attr(getter, setter) {
    let el = this.nodes[0];

    if (setter) {
      const att = document.createAttribute(`${getter}`);
      att.value = `${setter}`;
      el.setAttributeNode(att);
    } else {
      return el.getAttribute(`${getter}`);
    }
  }

  addClass(c, val) {
    this.nodes.forEach((node) => {
      const att = document.createAttribute(`${c}`);
      att.value = `${val}`;
      node.setAttributeNode(att);
    });
  }

  removeClass(...args) {
    this.nodes.forEach((node) => {
      args.forEach((arg) => {
        node.removeAttribute(`${arg}`);
      });

    });
  }

  children() {
    let childrens = [];

    this.nodes.forEach((node) => {
      childrens.push(node.children);
    });

    return new DOMNodeCollection(childrens);
  }

  parent() {
    let parents = [];

    this.nodes.forEach((node) => {
      parents.push(node.parentNode);
    });

    return new DOMNodeCollection(parents);
  }

  find(node, aSelector) {
    let selectors = [];

    let arr = Array.from(node.children);

    arr.forEach((nodeChild) => {
      if (nodeChild.localName === aSelector) {
        selectors.push(nodeChild);
      }
    });

    return new DOMNodeCollection(selectors);
  }

  remove(val) {
    this.nodes.forEach((node) => {
      let childs = node.children;
      for (let prop in childs) {
        for (let i = 0; i < childs.length; i++) {
          childs[i].remove();
        }
      }
    });
  }
}


module.exports = DOMNodeCollection;