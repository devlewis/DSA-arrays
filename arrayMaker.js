const Memory = require("./memory.js");

console.log(Memory);

this.memory = new Memory();

class Array {
  constructor() {
    this.memory = new Memory();
    this.length = 0;
    this._capacity = 0;
    this.ptr = this.memory.allocate(this.length);
  }

  push(value) {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }
    this.memory.set(this.ptr + this.length, value);
    this.length++;
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = this.memory.allocate(size);
    if (this.ptr === null) {
      throw new Error("Out of memory");
    }
    this.memory.copy(this.ptr, oldPtr, this.length);
    this.memory.free(oldPtr);
    this._capacity = size;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    return this.memory.get(this.ptr + index);
  }

  pop() {
    if (this.length == 0) {
      throw new Error("Index error");
    }
    const value = this.memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }

    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    this.memory.copy(
      this.ptr + index + 1,
      this.ptr + index,
      this.length - index
    );
    this.memory.set(this.ptr + index, value);
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    this.memory.copy(
      this.ptr + index,
      this.ptr + index + 1,
      this.length - index - 1
    );
    this.length--;
  }
}

Array.SIZE_RATIO = 3;

function main() {
  let arr = new Array();

  arr.push("tauhida");

  console.log(arr.get(0));
}

main();

function URLify(str) {
  return str
    .split("")
    .forEach((i) => {
      if (i === " ") {
        return "%20";
      } else return str[i];
    })
    .join("");
}

// console.log(URLify("tauhida parveen"));

function filter(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 5) {
      con;
    } else {
      res.push(arr[i]);
    }
  }

  return res;
}

//console.log(filter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

//You are given an array containing
//positive and negative integers.
//Write an algorithm which will find the
//largest sum in a continuous sequence.

// Input: [4, 6, -3, 5, -2, 1]
// Output: 12

function arrSum(arr) {
  let maxSum = 0;
  let newSum = 0;
  for (let i = 0; i < arr.length; i++) {
    newSum += arr[i];
    if (maxSum < newSum) {
      maxSum = newSum;
    }
  }
  return maxSum;
}

console.log(arrSum([4, 6, -3, 5, -2, 1]));
