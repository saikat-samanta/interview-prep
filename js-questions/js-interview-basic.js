// # shallow clone
const nestedObject = {
  name: "User",
  address: {
    city: "test city",
    state: {
      name: "test state",
      pin: "123456",
    },
    country: "test country",
  },
};

const cloned = { ...nestedObject };
cloned.name = "new name";
cloned.address.city = "new city";

console.log("clone test", cloned, nestedObject);

// # Deep clone
const deepClone = structuredClone(nestedObject);

// #8. intersection for two array
function getIntersection(arr1, arr2) {
  const uniqueArr1 = [...new Set(arr1)];
  return uniqueArr1.filter((el) => arr2.includes(el));
}
console.log(getIntersection([1, 3, 4, 2, 3, 1], [2, 3, 2, 1, 5]));

// #9. Debouncing
function myTask(args) {
  console.log("this is calling debounce", args.target.value);
}

function debounce(fn, delay) {
  let timeOutHandler;
  return function (...args) {
    clearTimeout(timeOutHandler);
    timeOutHandler = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const getDebouncing = debounce(myTask, 300);

document.getElementById("name").addEventListener("keyup", getDebouncing);

// #10.throttling
function myTask1(args) {
  console.log("this is calling throttle", args.target.value);
}

const throttle = (fn, delay) => {
  let prev = 0;
  return function (...args) {
    let now = new Date().getTime();
    if (now - prev >= delay) {
      prev = now;
      return fn(...args);
    }
  };
};

const getThrottling = throttle(myTask1, 300);

document.getElementById("name").addEventListener("keyup", getThrottling);

// #11. Flatten array
function flattenArray(val) {
  const output = [];
  for (const item of val) {
    if (typeof item === "object") {
      output.push(...flattenArray(item));
    } else {
      output.push(item);
    }
  }
  return output;
}
console.log(flattenArray([5, 7, [3, 8, [1, 2]]]));

// #12. Flatten object
let flattenedObject = {};

function flattenObject(val, parentKey) {
  for (const key in val) {
    if (typeof val[key] === "object") {
      flattenObject(val[key], `${parentKey}_${key}`);
    } else {
      flattenedObject[`${parentKey}_${key}`] = val[key];
    }
  }
  return flattenedObject;
}

const user = {
  fName: "saikat",
  lName: "samanta",
  address: {
    city: "Howrah",
    country: "India",
  },
};

console.log(flattenObject(user, "user"));

// #13. generator function
function* myGenFibonacci(n) {
  let a = 0,
    b = 1,
    c = 0;
  yield a;
  yield b;
  if (n > 1) {
    for (let i = 1; i < n - 1; i++) {
      c = a + b;
      a = b;
      b = c;
      yield c;
    }
  }
}

const result = myGenFibonacci(10);
let output1;
while (!(output1 = result.next()).done) {
  console.log(output1.value);
}

// #14. sum with closer
function sum(n) {
  return function (m) {
    if (m) {
      return sum(n + m);
    } else {
      return n;
    }
  };
}

console.log(sum(1)(2)(3)());

// #currying
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3));