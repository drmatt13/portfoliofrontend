import Node from './Node';

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  enqueue(value) {
    let newNode = new Node(value);
    if (!this.first) {
      this.first = newNode;
      this.last = this.first;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    return ++this.size;
  }
  dequeue() {
    if (!this.first) return null;
    let temp = this.first;
    if (this.first == this.last) this.last = null;
    this.first = this.first.next;
    this.size--;
    return temp.value;
  }
  clear() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
}

export default Queue;