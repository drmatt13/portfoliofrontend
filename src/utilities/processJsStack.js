import syntaxColor from './syntaxColor';
import encode from './encode';

const jsLightBlue = [
  'if',
  'else',
  'for',
  'of',
  'in',
  'while',
  'async',
  'await',
  'this',
  'return',
  'export',
  'module',
  'exports',
  'default',
  'import',
  'from',

  'new',
  'undefined',
  '/',
  '|',
  '{',
  '}',
  '!',
  '&',
  ',',
  '*',
  '+',
  '=',
  '-',
  '>',
  '<',
  ';',
  '.',
  ':',
  '@',
  '?'
];

const jsBlue = [
  'if',
  'for',
  'while',
  'async',
];

const jsRed = [
  '(',
  ')',
  '[',
  ']'
];


const jsPurple = [
  'let',
  'var',
  'const',
  'function',
  'constructor',
  'class',
  'extends',
  'static'
];

const jsYellow = [
  
]

let jsClassList = ["Number", "Boolean", "String", "Array", "Date", "RegExp", , "Function", "Object", "FormData", "FileReader"];

const jsNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

// const specialChars = { "\n": true, "-": true, "+": true, "=": true, "'": true, '"': true, ';': true, ':': true, '/': true, '?': true, '<': true, '>': true, ',': true, '.': true, '[': true, ']': true, '{': true, '}': true, '(': true, ')': true, '*': true, '&': true, '^': true, '%': true, '$': true, '#': true, '@': true, '!': true, '|': true, '~': true, '`': true, ' ': true, '\\': true };
let prevWord, switchSelector, quotationChar, isComment;

const processJsStack = (cache, pre) => {
  prevWord = null;
  switchSelector = 0;
  quotationChar = null;
  isComment = false;
  while (cache.first) {
    jsProcessWord(cache.pop(), cache.value(), pre);
  }
}

const jsProcessWord = (s, n, x) => {
  let span = document.createElement('span');
  span.innerHTML = encode(s);
  if (quotationChar !== null) {
    switchSelector = 9;
    if (quotationChar === s) quotationChar = null;
  } else {
    if (['"', "'", "`"].includes(s) && !isComment) {
      quotationChar = s;
      switchSelector = 9;
    } else {
      if (isComment) {
        if (n === '\n') isComment = false;
        switchSelector = 7;
      } else if (s === '/') {
        if (n === '/') {
          isComment = true;
          switchSelector = 7;
        } else {
          switchSelector = 1;
        }
      }
      else if (jsPurple.includes(s)) switchSelector = 4;
      else if (n === '(' && prevWord !== 'new') switchSelector = 2;
      else if (jsLightBlue.includes(s) && !isComment) {
        if (!['new', 'undefined', '\\', '|', '{', '}', '!', '&', ',', '*', '+', '=', '-', '>', '<', '/', ';', ':', '@', '?'].includes(s)) switchSelector = 8;
        else switchSelector = 1;
      }
      else if (jsRed.includes(s)) switchSelector = 3;
      else if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'true', 'false'].includes(s)) switchSelector = 5;
      else if (s.charAt(0) === s.charAt(0).toUpperCase() && (prevWord !== '.')) {
        if (['class', 'extends'].includes(prevWord) && ![' ', '\n'].includes(s)) {
          jsClassList.push(s);
          switchSelector = 6;
        } else if (jsClassList.includes(s)) switchSelector = 6;
      }
    }
  }
  syntaxColor(span, switchSelector);
  x.appendChild(span);
  if (![' ', '\n'].includes(s)) prevWord = s;
  switchSelector = 0;
}

export default processJsStack