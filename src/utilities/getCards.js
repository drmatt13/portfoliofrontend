import axios from 'axios';
import encode from './encode.js';
import ReverseStack, {updateCache} from './ReverseStack';
import processHtmlStack from './processHtmlStack';
//     processEjsStack
import processCssStack from './processCssStack';
//     processSassStack
import processJsStack from './processJsStack';
//     processJsxStack
//     processSqlStack

const getCards = async (params, updateState) => {

  let cache = new ReverseStack();

  let cards = [];
  let { collection, note } = params;
  
  const notes = await axios.get(`${process.env.REACT_APP_BACKEND}/notes/${collection}/${note}`);
  for (let data of JSON.parse(notes.data)) {

    let card = document.createElement('div');
    card.classList.add('NOTE-card', 'REACT-global-scroll', 'REACT-gray-dark');

    let code, pre, flag=false, isEmpty=true;

    // html index --------------------------
    if (data[0].length !== 0) {
      flag=true;
      isEmpty = false;
      code = document.createElement('div');
      code.classList.add('NOTE-code');
      pre = document.createElement('pre');
      pre.innerHTML = `<span class="light-blue">` + encode('<') + `</span><span class="red">html</span><span class="light-blue">` + encode('>') + "</span>";
      code.appendChild(pre);

      for (let i of data[0]) {
        pre = document.createElement('pre');
        // load up the cache
        updateCache(cache, i[Object.keys(i)].split(''));
        // html object
        if (i.html) {
          processHtmlStack(cache, pre);
        }
        // ejs object
        else if (i.ejs) {
          cache = new ReverseStack();
          // console.log("Cannot process ejs yet: cache cleared");
        }
        else {
          cache = new ReverseStack();
          console.log("Error: cache cleared");
        }
        code.appendChild(pre);
      }

      pre = document.createElement('pre');
      pre.innerHTML = `<span class="light-blue">` + encode('</') + `</span><span class="red">html</span><span class="light-blue">` + encode('>') + "</span>";
      code.appendChild(pre);
    }
    if (flag) card.appendChild(code);
    flag = false;

    // css index --------------------------
    if (data[1].length !== 0) {
      flag=true;
      isEmpty = false;
      code = document.createElement('div');
      code.classList.add('NOTE-code');
      pre = document.createElement('pre');
      pre.innerHTML = `<span class="light-blue">` + encode('<') + `</span><span class="red">style</span><span class="light-blue">` + encode('>') + "</span>";
      code.appendChild(pre);

      for (let i of data[1]) {
        pre = document.createElement('pre');
        // load up the cache
        updateCache(cache, i[Object.keys(i)].split(''));
        // css object
        if (i.css) {
          pre.appendChild(processCssStack(cache));
        }
        // sass object
        else if (i.sass) {
          cache = new ReverseStack();
          // console.log("Cannot process sass yet: cache cleared");
        }
        else {
          cache = new ReverseStack();
          console.log("Error: cache cleared");
        }
        code.appendChild(pre);
      }

      pre = document.createElement('pre');
      pre.innerHTML = `<span class="light-blue">` + encode('</') + `</span><span class="red">style</span><span class="light-blue">` + encode('>') + "</span>";
      code.appendChild(pre);
    }
    if (flag) card.appendChild(code);
    flag = false;

    // script index --------------------------
    if (data[2].length !== 0) {
      flag=true;
      isEmpty = false;
      code = document.createElement('div');
      code.classList.add('NOTE-code');
      pre = document.createElement('pre');
      pre.innerHTML = `<span class="light-blue">` + encode('<') + `</span><span class="red">script</span><span class="light-blue">` + encode('>') + "</span>";
      code.appendChild(pre);

      for (let i of data[2]) {
        pre = document.createElement('pre');
        // load up the cache
        updateCache(cache, i[Object.keys(i)].split(''));
        // js object
        if (i.js) {
          processJsStack(cache, pre);
        }
        // jsx object
        else if (i.jsx) {
          cache = new ReverseStack();
          // console.log("Cannot process jsx yet: cache cleared");
        }
        // sql object
        else if (i.sql) {
          cache = new ReverseStack();
          // console.log("Cannot process sql yet: cache cleared");
        }
        else {
          cache = new ReverseStack();
          console.log("Error: cache cleared");
        }
        code.appendChild(pre);
      }

      pre = document.createElement('pre');
      pre.innerHTML = `<span class="light-blue">` + encode('</') + `</span><span class="red">script</span><span class="light-blue">` + encode('>') + "</span>";
      code.appendChild(pre);
    }
    if (flag) card.appendChild(code);
    flag = false;

    // output index --------------------------
    if (data[3].length !== 0) {
      flag=true;
      isEmpty = false;
      code = document.createElement('div');
      code.classList.add('NOTE-code');

      for (let i of data[3]) {
        pre = document.createElement('pre');
        // comment
        if (i.comment) pre.innerHTML = `<span class="comment">${encode(i.comment)}</span>`;
        // input
        else if (i.input) pre.innerHTML = `<span class="input">${encode(i.input)}</span>`;
        // output
        else if (i.output) pre.innerHTML = `<span class="output">${encode(i.output)}</span>`;
        // images
        else if (i.imageSm || i.imageMd || i.imageLg) {
          card.classList.add("NOTE-picture-comment");
          pre = document.createElement('div');
          pre.classList = "NOTE-image"
          if (i.imageSm) pre.innerHTML = `<img class="NOTE-imageSm" src="/images/notes/${i.imageSm}" />`;
          else if (i.imageMd) pre.innerHTML = `<img class="NOTE-imageMd" src="/images/notes/${i.imageMd}" />`;
          else if (i.imageLg) pre.innerHTML = `<img class="NOTE-imageLg" src="/images/notes/${i.imageLg}" />`;
        }
        // else
        else console.log("Output Error");
        code.appendChild(pre);
      }

    }
    if (flag) card.appendChild(code);
    flag = false;

    // render index --------------------------
    if (data[4].render !== false) {
      pre = document.createElement('div');
      pre.classList.add('NOTE-button-container');
      pre.innerHTML = '<div class="NOTE-button">render</div>';
      card.appendChild(pre);
    }
    
    if (!isEmpty) cards.push(card);
  }
  // Update state --------------------------
  updateState(cards);
}

export default getCards;