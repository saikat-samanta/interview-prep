// #4. polyfill for reduce
Array.prototype.myReduce = function (cb, initial) {
  let values = this;

  for (let i = 0; i < values.length; i++) {
    initial =
      initial !== undefined ? cb(initial, values[i], i, values) : values[i];
  }

  return initial;
};
const values = [2, 5, 5];
console.log(values.myReduce((acc, cur) => acc + cur, 0));

// #5. polyfill for map
Array.prototype.myMap = function (cb) {
  const values = this;
  const output = [];
  for (let i = 0; i < values.length; i++) {
    const returnValue = cb(values[i], i, values);
    output.push(returnValue);
  }
  return output;
};

console.log(values.myMap((el, i) => `${el}-map`));

// #6. polyfill for filter
Array.prototype.myFilter = function (cb) {
  const values = this;
  const output = [];
  for (let i = 0; i < values.length; i++) {
    if (cb(values[i], i, values)) {
      output.push(values[i]);
    }
  }
  return output;
};
console.log(values.myFilter((el, i) => el > 3));

// #7. polyfill for bind
const obj = {
  name: "saikat",
};
function myFunction(address, state) {
  console.log(this.name, address, state);
}

Function.prototype.myBind = function (context, ...args) {
  const _context = this;
  return function (...params) {
    _context.apply(context, [...args, ...params]);
  };
};

const getFn = myFunction.myBind(obj);
getFn("Howrah", "West Bengal");

// #Polyfill for call

const nameObj = {
  name: "Tony",
};

function testCall(a, b) {
  console.log("myCall", this.name, a, b);
}

Function.prototype.myCall = function (obj, ...args) {
  obj._myCallMethod = this;
  obj._myCallMethod(...args);
};

testCall.myCall(nameObj, 5, 6);

// #Polyfill for apply

const testObj = {
  name: "Tony",
};

function testApply(a, b) {
  console.log("myApply", this.name, a, b);
}

Function.prototype.myApply = function (obj, args) {
  obj._myApplyMethod = this;
  obj._myApplyMethod(...args);
};

testApply.myApply(nameObj, [5, 6]);

// #polyfill for promise.all
const p0 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(2);
  }, 10);
});
const p1 = Promise.resolve(3);
const p2 = 4;

Promise.myAll = (promises) => {
  const out = [];
  return new Promise((resolve, reject) => {
    promises.forEach((singlePromise, index) => {
      Promise.resolve(singlePromise)
        .then((data) => {
          out[index] = data;
          if (index === promises.length - 1) {
            resolve(out);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

Promise.myAll([p0, p1, p2])
  .then((res) => {
    console.log(res);
  })
  .catch((er) => {
    console.log(er);
  });
