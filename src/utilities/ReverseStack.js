/* eslint-disable no-unused-expressions */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class ReverseStack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  value() {
    if (this.first) return this.first.val;
    else return null;

  }
  push(value) {
    let newNode = new Node(value);
    if (!this.first) {
      this.first = newNode;
      this.last = this.first;
    } else {
      let temp = this.first;
      this.first = newNode;
      this.first.next = temp;
    }
    return ++this.size;
  }
  pop() {
    if (!this.first) return null;
    let temp = this.first;
    if (this.first === this.last) {
      this.last === null;
    }
    this.first = this.first.next;
    this.size--;
    return temp.val;
  }
  update(val) {
    if (!this.first) this.push(val);
    else this.first.val = `${val}` + this.first.val;
    return this;
  }
}

const specialChars = { "\n": true, "-": true, "+": true, "=": true, "'": true, '"': true, ';': true, ':': true, '/': true, '?': true, '<': true, '>': true, ',': true, '.': true, '[': true, ']': true, '{': true, '}': true, '(': true, ')': true, '*': true, '&': true, '^': true, '%': true, '$': true, '#': true, '@': true, '!': true, '|': true, '~': true, '`': true, ' ': true, '\\': true };

export const updateCache = (cache, s, spaces="  ") => {
  let char;
  let newString = true;
  let prevSpace = false;
  let specialCharExeption = false;
  for (let i = s.length - 1; i >= 0; i--) {
    char = s.pop();
    if (specialChars[char]) {
      if (char === " ") {
        specialCharExeption = false;
        if (prevSpace) cache.update(char);
        else {
          cache.push(char);
          newString = true;
        }
        prevSpace = true;
      } else if (!["-", '!', "<"].includes(char)) {
        if (char === "\n") {
          if (prevSpace) cache.update(spaces);
          else cache.push(spaces);
        }
        newString = true;
        prevSpace = false;
        cache.push(char);
      } else {
        // if (newString && [">", "-"].includes(char)) {
        //   specialCharExeption = true;
        //   newString = false;
        // }
        if (specialCharExeption) {
          if (prevSpace) {
            prevSpace = false;
            cache.push(char);
          }
          else if (!newString) cache.update(char);
          else cache.push(char);
        } else cache.push(char); 
        prevSpace = false;
      }
    } else {
      prevSpace = false;
      if (specialCharExeption) {
        newString = false;
        specialCharExeption = false;
        cache.push(char);
      }
      else if (newString) {
        cache.push(char);
        newString = false;
      } else {
        if (!isNaN(char)) {
          cache.push(char);
          newString = true;
        } else {
          cache.update(char);
        }
      }
    }
  }
  cache.push(spaces);
}

export default ReverseStack
