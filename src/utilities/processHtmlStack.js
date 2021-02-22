import syntaxColor from './syntaxColor';
import encode from './encode';

const specialChars = { "\n": true, "-": true, "+": true, "=": true, "'": true, '"': true, ';': true, ':': true, '/': true, '?': true, '<': true, '>': true, ',': true, '.': true, '[': true, ']': true, '{': true, '}': true, '(': true, ')': true, '*': true, '&': true, '^': true, '%': true, '$': true, '#': true, '@': true, '!': true, '|': true, '~': true, '`': true, ' ': true, '\\': true };
let prevWord, switchSelector, quotationChar, isComment, isTag, isTagName;

const processHtmlStack = (cache, pre) => {
  prevWord = null;
  switchSelector = 0;
  quotationChar = null;
  isComment = false;
  isTag = false;
  isTagName = true;
  while (cache.first) {
    htmlProcessWord(cache.pop(), cache.value(), pre);
  }
}

const htmlProcessWord = (s, n, x) => {
  let span = document.createElement('span');
  span.innerHTML = encode(s);
  if (quotationChar) {
    if (s == quotationChar) {
      quotationChar = null;
    }
    switchSelector = 9; // quotationChar
  } else if (isComment) {
    if (s == "-->") {
      isComment = false;
      switchSelector = 6; // comment
    } else switchSelector = 7;
  } else if (!isTag) {
    if (s == "<!--") {
      isComment = true;
      switchSelector = 6; // comment
    }
    else if (s == "<") {
      if (!specialChars[n] || ["/", "!"].includes(n)) {
        isTag = true;
        switchSelector = 1; // blue
      }
    }
  } 
  else if (s == "!" && prevWord == "<") switchSelector = 1; // blue
  else {
    if (s == ">") {
      isTag = false;
      isTagName = true;
      switchSelector = 1; // blue
    } else if (s == "/") {
      switchSelector = 1; // blue
    } else {
      if (isTagName) {
        isTagName = false;
        switchSelector = 3; // red
      } else {
        if (s == "=") switchSelector = 1; // blue
        else if (["'", '"'].includes(s)) {
          quotationChar = s;
          switchSelector = 9; // quotationChar
        } else switchSelector = 4; // purple
      }
    }
  }
  syntaxColor(span, switchSelector);
  x.appendChild(span);
  if (![' ', '\n'].includes(s)) prevWord = s;
  switchSelector = 0;
}

export default processHtmlStack
