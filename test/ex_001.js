const Observer = () => {
  this.handlers = [];
};

Observer.prototype = {
  subscribe: (fn) => {
    this.handlers.push(fn);
  },
  usubscribe: (fn) => {
    this.handlers = this.handlers.filter((item) => {
      if (item != fn) return item;
    });
  },
  run: (o, thisobj) => {
    var scope = thisobj || window;
    this.handlers.forEach((element) => {
      element.call(scope, o);
    });
  },
};
