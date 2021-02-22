import syntaxColor from './syntaxColor';
import encode from './encode';

const processCssStack = (cache) => {
  const masterSpan = document.createElement('span');
  while (cache.first) {
    const span = document.createElement('span');
    span.innerHTML = encode(cache.pop());
    masterSpan.appendChild(span);
  }
  return masterSpan;
}

export default processCssStack
