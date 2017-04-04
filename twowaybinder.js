function TwoWayBinder(data, inputNodes, textNodes) {
  this.data = data; //data object
  this.inputNodes = []; //bind form elements
  this.textNodes = []; //bind text elements

  //init
  this.addInputNodes(inputNodes);
  textNodes && this.addTextNodes(textNodes);
}

TwoWayBinder.prototype = {
  addInputNodes: function(elements) {
    var _binder = this;

    for(var i = 0; i < elements.length; i++) {
      _binder.inputNodes.push(new InputNode(elements[i])); //add to list
      _binder.bindModelToDom(elements[i]);
      _binder.bindDomToModel(elements[i]);

      elements[i].addEventListener('input', function() { //bind change event
        _binder.updateInputNodes('value', this.value); //sync elements
      });
    }
  },
  updateInputNodes: function(attr, value) {
    var list = this.inputNodes;

    for(var i = 0; i < list.length; i++) {
      list[i].update(list[i].node, attr, value);
    }
  },
  updateInputNodesAttr: function(attr, value) {
    var list = this.inputNodes;

    for(var i = 0; i < list.length; i++) {
      list[i].updateAttr(list[i].node, attr, value);
    }
  },
  bindModelToDom: function(dom) {
    var _binder = this;
    Array.apply(null, dom.attributes).forEach(function(attr, index) {
      var attrName = attr.name;
      Object.defineProperty(_binder.data, attrName, {
        get: function() {
          return dom[attrName];
        },
        set: function(newVal) { //trigger when property change
          dom[attrName] = newVal; //set proterty
          dom.setAttribute(attrName, newVal); //set attribute
          _binder.updateInputNodes(attrName, newVal); //sync elements
          _binder.updateTextNodes(newVal);
        },
        configurable: true
      })
    })
  },
  bindDomToModel: function(dom) {
    var _binder = this;
    var observer = new MutationObserver(function(mutations) { //set attribute
      var attrName = mutations[0].attributeName;
      var newVal = dom.getAttribute(attrName);

      _binder.updateInputNodesAttr(attrName, newVal); //sync elements -> notify all
      _binder.updateTextNodes(newVal);
    });

    observer.observe(dom, {
      attributes: true,
      childList: false,
      characterData: false
    });
  },
  addTextNodes: function(list) {
    for(var i = 0; i < list.length; i++) {
      this.textNodes.push(new TextNode(list[i]));
    }
  },
  updateTextNodes: function(value) {
    var list = this.textNodes;

    for(var i = 0; i < list.length; i++) {
      list[i].update(list[i].node, value);
    }
  }
}

function InputNode(node) {
  this.node = node;
}

InputNode.prototype = {
  update: function(element, attr, value) {
    element.setAttribute(attr, value);
    element[attr] = value;
  },
  updateAttr: function(element, attr, value) {
    element[attr] = value;
  }
};

function TextNode(node) {
  this.node = node;
}

TextNode.prototype = {
  update: function(element, value) {
    element.innerHTML = value;
  }
};