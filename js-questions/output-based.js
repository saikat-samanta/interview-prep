// # Output based

// Question
var length = 10;
function fn() {
  console.log(this.length);
}
var obj1 = {
  length: 5,
  method: function (fn) {
    fn();
    arguments[0]();
  },
};
obj1.method(fn, 1);

// Question
(function () {
  console.log(1);
  setTimeout(function () {
    console.log(2);
  }, 1000);
  setTimeout(function () {
    console.log(3);
  }, 0);
  setTimeout(
    (function () {
      console.log(4);
    })(),
    1000
  );
  console.log(4);
})();


// Question
function func() {
  const a = b = c = 1;
}
func();
console.log(typeof a, typeof b, typeof c);

// Question
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}

// Question
for (var i = 1; i <= 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 0);
}

// Question
let arr = ["1", "2", "4", "5", "6"];
if ("3" in arr) { // it's search array index
  return true;
} else {
  return false;
}

// Question
var a = 10;
function outer() {
  var b = 20;
  function inner() {
    var c = 30;
    console.log(a + b + c);
  }
  inner();
}
outer();

// Question
function outerFunction(x) {
  return function innerFunction(y) {
    return x + y;
  };
}
console.log(outerFunction(1)(2)(3));

//  Question
sayOtherName();
sayName();
var sayName = () => {
  console.log("hello world");
};
function sayOtherName() {
  console.log("world is beautiful");
}

// Question
var a = {},
  b = { key: "b" },
  c = { key: "c" };

a[b] = 123;
a[c] = 456;

console.log(a[b]);
`The reason for this is as follows: When setting an object property, JavaScript will implicitly stringify the parameter value. In this case, since b and c are both objects, they will both be converted to "[object Object]". As a result, a[b] and a[c] are both equivalent to a["[object Object]"] and can be used interchangeably. Therefore, setting or referencing a[c] is precisely the same as setting or referencing a[b].`;


// Question
var value = 10;
var getOutput = function () {
  console.log(value);
  var value = 20;
};
getOutput();

//
function getPersonInfo(one, two, three) {
  console.log(one);
  console.log(two);
  console.log(three);
}

const person = 'Lydia';
const age = 21;

getPersonInfo`${person} is ${age} years old`;