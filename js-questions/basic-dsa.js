// #1. occurrence counter
function occurrenceCounter(s, k) {
  let counter = 0;
  const k_len = k.length;

  for (let i = 0; i < s.length; i++) {
    for (let j = 0; j < k_len; j++) {
      if (s[i + j] !== k[j]) {
        break;
      }
      if (j === k_len - 1) {
        counter += 1;
      }
    }
  }
  console.log(counter);
  return counter;
}

occurrenceCounter("abcbd", "b");
occurrenceCounter("acbacbddhtfuybvaacbexazwacbsrs", "fuy");

// #2. cost to balance parenthesis
function costToBalanceParenthesis(str) {
  let open = 0,
    close = 0,
    ans = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") {
      open += 1;
    } else {
      close += 1;
    }
  }
  if (open !== close) {
    return -1;
  }
  const a = new Array(str.length);
  if (str[0] === "(") {
    a[0] = 1;
  } else {
    a[0] = -1;
  }
  if (a[0] < 0) {
    ans += Math.abs(a[0]);
  }
  for (let i = 1; i < str.length; i++) {
    if (str[i] === "(") {
      a[i] = a[i - 1] + 1;
    } else {
      a[i] = a[i - 1] - 1;
    }
    if (a[i] < 0) {
      ans += Math.abs(a[1]);
    }
  }
  console.log(a);
  return ans;
}

const str = ")))(((";
console.log(costToBalanceParenthesis(str));

// #3. are bracket balanced
function areBracketsBalanced(expr) {
  let stack = [];
  for (let i = 0; i < expr.length; i++) {
    let x = expr[i];

    if (x == "(" || x == "[" || x == "{") {
      stack.push(x);
      continue;
    }

    if (stack.length == 0) return false;

    let check;
    switch (x) {
      case ")":
        check = stack.pop();
        if (check == "{" || check == "[") return false;
        break;

      case "}":
        check = stack.pop();
        if (check == "(" || check == "[") return false;
        break;

      case "]":
        check = stack.pop();
        if (check == "(" || check == "{") return false;
        break;
    }
  }

  return stack.length == 0;
}
console.log(areBracketsBalanced("{([])}"));

// #15. Subarray with given sum
function subarraySum(arr, n, s) {
  let sum = 0,
    startIndex = 0,
    output = -1,
    endIndex = 0;

  for (let i = 0; i < n; i++) {
    sum += arr[i];
    endIndex = i;
    if (sum === s) {
      output = [startIndex + 1, endIndex + 1];
      break;
    }
    if (sum > s) {
      sum -= arr[startIndex];
      startIndex += 1;
      if (sum === s) {
        output = [startIndex + 1, endIndex + 1];
        break;
      }
    }
    if (i === n - 1 && sum !== s) {
      while (sum !== s) {
        if (startIndex === endIndex) {
          break;
        } else {
          sum -= arr[startIndex];
          startIndex += 1;
          if (sum === s) {
            output = [startIndex + 1, endIndex + 1];
            break;
          }
        }
      }
    }
  }

  return output;
}

const output2 = subarraySum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10, 15);
const output3 = subarraySum(
  [
    28, 68, 142, 130, 41, 14, 175, 2, 78, 16, 84, 14, 193, 25, 2, 193, 160, 71,
    29, 28, 85, 76, 187, 99, 171, 88, 48, 5, 104, 22, 64, 107, 164, 11, 172, 90,
    41, 165, 143, 20, 114, 192, 105, 19, 33, 151, 6, 176, 140, 104, 23, 99, 48,
    185, 49, 172, 65,
  ],
  57,
  1562
);
console.log("______", output3, output2);

// # missing no.
function MissingNumber(array, n) {
  //code here
  const arr = new Array(n + 1).fill(0);
  arr[0] = 1;
  array.forEach((el) => {
    arr[el] = 1;
  });
  console.log(arr);
  return arr.indexOf(0);
}

console.log(MissingNumber([1], 2)); // 2

// # Max sub-array sum
function maxSubarraySum(arr, N) {
  let maxSum = -Infinity;
  let currentSum = 0;
  for (let i = 0; i < N; i++) {
    currentSum = Math.max(arr[i], currentSum + arr[i]);
    maxSum = Math.max(currentSum, maxSum);
  }
  return maxSum;
}

console.log(maxSubarraySum([1, 2, 3, -2, 5], 5));

// # min jump to reach the array end
function minJumps(arr, n) {
  //code here
  let counter = 0,
    nextIndex = 0;
  while (nextIndex < n - 1) {
    if (arr[nextIndex] === 0) {
      counter = -1;
      break;
    }
    nextIndex += arr[nextIndex];
    counter += 1;
  }
  return counter;
}
console.log(minJumps([1, 4, 3, 2, 6, 7], 6));
console.log(minJumps([1, 3, 5, 8, 9, 2, 6, 7, 6, 8, 9], 11));
console.log(minJumps([0, 1, 6], 3));
console.log(minJumps([2, 3, 1, 1, 2, 4, 2, 0, 1, 1], 10));

// # pipeline
function pipeline(values) {
  const myArr = [];
  const outputArr = [];
  let largestNum = 0;
  values.forEach((el) => {
    const [x, val] = el;
    if (Number(val) > largestNum) {
      largestNum = Number(val);
    }
  });
  let counterArr = Array(largestNum).fill(0);
  values.forEach((el) => {
    const [x, val] = el;
    if (Number(x) === 1) {
      myArr.push(Number(val));
      counterArr[Number(val)] = counterArr[Number(val)]
        ? counterArr[Number(val)] + 1
        : 1;
    }
    if (Number(x) === 2) {
      const maxVal = Math.max(...counterArr);
      let maxIndexVal = -1;
      let freqValue = null;
      const maxFreqValue = counterArr.reduce(
        (acc, el, i) => (el === maxVal ? [...acc, i] : acc),
        []
      );
      maxFreqValue.forEach((el) => {
        if (myArr.lastIndexOf(el) > maxIndexVal) {
          freqValue = el;
          maxIndexVal = myArr.lastIndexOf(el);
        }
      });
      if (maxIndexVal >= 0) {
        outputArr.push(myArr[maxIndexVal]);
        myArr.splice(maxIndexVal, 1);
        counterArr[freqValue] -= 1;
      }
    }
  });
  return outputArr;
}

const _arr = [
  [1, 6],
  [1, 2],
  [1, 7],
  [1, 8],
  [1, 8],
  [1, 6],
  [1, 5],
  [1, 6],
  [1, 2],
  [1, 7],
  [1, 8],
  [1, 8],
  [1, 6],
  [2, -1],
  [2, -1],
  [2, -1],
  [2, -1],
  [2, -1],
  [2, -1],
];
// [6, 8, 8, 6, 7, 2]

const out = pipeline(_arr);
console.log(out);

// # check if BST
function isBST(root) {
  let leftOutput = 0;
  let rightOutput = 0;
  if (root.left === null) {
    leftOutput = 1;
  } else if (root.left.data < root.data) {
    leftOutput = 1 * this.isBST(root.left);
  } else {
    return 0;
  }
  if (root.right === null) {
    rightOutput = 1;
  } else if (root.right.data > root.data) {
    rightOutput = 1 * this.isBST(root.right);
  } else {
    return 0;
  }
  return leftOutput * rightOutput;
}

// 10 5 18 2 9 15 19 N 4 8 N 1
const root = {
  data: 10,
  left: {
    data: 5,
    left: { data: 2, left: null, right: { data: 4, left: null, right: null } },
    right: { data: 9, left: { data: 8, left: null, right: null }, right: null },
  },
  right: {
    data: 18,
    left: { data: 15, left: { data: 1, left: null, right: null }, right: null },
    right: { data: 19, left: null, right: null },
  },
};
console.log(isBST(root));

// #
function inversionCount(arr, N) {
  //your code here
  let flag = true;
  let count = 0;
  while (flag) {
    let localFlag = false;
    for (let i = 0; i < N - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        const val = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = val;
        ++count;
        localFlag = true;
      }
    }
    if (localFlag === false) {
      flag = false;
    }
  }
  return count;
}
console.log(
  inversionCount(
    [
      468, 335, 1, 170, 225, 479, 359, 463, 465, 206, 146, 282, 328, 462, 492,
      496, 443, 328, 437, 392, 105, 403, 154, 293, 383, 422, 217, 219, 396, 448,
      227, 272, 39, 370, 413, 168, 300, 36, 395, 204, 312, 323,
    ],
    42
  )
);

// #
let max_level = 0;
function leftView(node, level = 1) {
  // Base Case
  let output = [];
  if (node == null) {
    return output;
  }

  // If this is the first node of its level
  if (max_level < level) {
    output.push(node.data);
    max_level = level;
  }

  // Recur for left and right subtrees
  output.push(...leftView(node.left, level + 1));
  output.push(...leftView(node.right, level + 1));

  return output;
}

const myNode = {
  data: 4,
  left: { data: 5, left: null, right: null },
  right: {
    data: 2,
    left: {
      data: 3,
      left: { data: 6, left: null, right: null },
      right: { data: 7, left: null, right: null },
    },
    right: { data: 1, left: null, right: null },
  },
};
console.log(leftView(myNode));

function printLeftView(root) {
  if (root == null) return;

  let output = [];
  let q = [];
  q.push(root);

  while (q.length) {
    // number of nodes at current level
    let n = q.length;

    // Traverse all nodes of current level
    for (let i = 1; i < n + 1; i++) {
      let temp = q.shift();

      // Print the left most element
      // at the level
      if (i == 1) {
        output.push(temp.data);
      }

      // Add left node to queue
      if (temp.left != null) {
        q.push(temp.left);
      }

      // Add right node to queue
      if (temp.right != null) {
        q.push(temp.right);
      }
    }
  }
  return output;
}
console.log("printLeftView", printLeftView(myNode));

// #remove loop from linked list

function removeLoop(head) {
  //your code here
  let prev = [];
  let index = head;
  while (head !== null) {
    if (prev.includes(head)) {
      index.next = null;
      break;
    } else {
      prev.push(head);
      index = head;
      head = head.next;
    }
  }
}

// Javascript program to find maximum amount of water that can
// be trapped within given set of bars.

// # Method for maximum amount of water
function findWater(arr, n) {
  // left[i] contains height of tallest bar to the
  // left of i'th bar including itself
  let left = new Array(n);

  // Right [i] contains height of tallest bar to
  // the right of ith bar including itself
  let right = new Array(n);

  // Initialize result
  let water = 0;

  // Fill left array
  left[0] = arr[0];
  for (let i = 1; i < n; i++) {
    left[i] = Math.max(left[i - 1], arr[i]);
  }

  console.log(left);

  // Fill right array
  right[n - 1] = arr[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    right[i] = Math.max(right[i + 1], arr[i]);
  }
  console.log(right);
  // Calculate the accumulated water element by element
  // consider the amount of water on i'th bar, the
  // amount of water accumulated on this particular
  // bar will be equal to min(left[i], right[i]) - arr[i] .
  for (let i = 0; i < n; i++) {
    water += Math.min(left[i], right[i]) - arr[i];
  }

  return water;
}

// Driver method to test the above function
console.log(findWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], 12));
