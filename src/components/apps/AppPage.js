import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PageChange from '../ui/PageChange';

// css
import '../css/AppPage.css';

// utilities
import ReverseStack, {updateCache} from '../../utilities/ReverseStack';
import processHtmlStack from '../../utilities/processHtmlStack';
import processCssStack from '../../utilities/processCssStack';
import processJsStack from '../../utilities/processJsStack';

const AppPage = () => {

  const {collection, app} = useParams();
  
  const buttonContainer = useRef(null);
  const flexContainer1 = useRef(null);
  const flexContainer2 = useRef(null);

  useEffect(() => {
    const buildApp = async () => {
      document.querySelector(".app-master-container").classList.add("REACT-bottom-border");

      const buttons = buttonContainer.current.children;
      const codeContainer = [];
      
      for (let div of flexContainer1.current.children) {
        if (div.classList.contains("APP-code-container")) codeContainer.push(div);
      }

      for (let i of buttons) {
        i.addEventListener("click", () => {
          for (let j of buttons) {
            if (i===j) {
              j.classList = "APP-button bg-green-400";
              codeContainer.forEach((div, k) => {
                if (+j.getAttribute('page') === k) div.classList.remove("none");
                else div.classList.add("none");
              })
            }
            else {
              j.classList = "APP-button bg-gray-500";
            }
          }
        });
      }
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND}/apps/${collection}/${app}`);

      const iframe = document.createElement('iframe');
      iframe.frameBorder="0";

      const iframeCode = document.createElement('span');

      for (const key in data) {
        let iframeCodePiece = document.createElement('span');
        const pre = document.createElement("pre");
        let code = data[key];
        let cache = new ReverseStack();
        if (key !== "route") updateCache(cache, code.split(''), '');
        switch (key) {
          case "app":
            processHtmlStack(cache, pre);
            codeContainer[0].appendChild(pre);
            iframeCodePiece.innerHTML = (`<html>${code}</html>`);
            iframeCode.appendChild(iframeCodePiece);
            break;
          case "style":
            pre.appendChild(processCssStack(cache));
            codeContainer[1].appendChild(pre);
            iframeCodePiece.innerHTML = (`<style>${code}</ht>`);
            iframeCode.appendChild(iframeCodePiece);
            break;
          case "script":
            processJsStack(cache, pre);
            codeContainer[2].appendChild(pre);
            iframeCodePiece.innerHTML = (`<script>${code}</script>`);
            iframeCode.appendChild(iframeCodePiece);
            break;
          default:
            break;
        }
      }
      iframe.srcdoc = iframeCode.innerHTML;
      flexContainer2.current.appendChild(iframe);
      return () => {
        document.querySelector(".app-master-container").classList.remove("REACT-bottom-border");
      }
    }
    if (collection !== 'react') buildApp();
  }, [])

  if (collection === 'react') return null;
  return <>
    <PageChange title={app} />
    <div className="APP-master-container f fade-in">
      <div className="APP-flex-container APP-flex-container-mediaquery f p-10">
        <div className="APP-button-container a f f-d-column" ref={buttonContainer}>
          <div className="APP-button bg-green-400" page="0" />
          <div className="APP-button bg-gray-500" page="1" />
          <div className="APP-button bg-gray-500" page="2" />
        </div>
        <div className="APP-flex-container1 bg-brown-500 f-1 b-r-5 relative" ref={flexContainer1}>
          <div className="APP-patch bg-brown-500 a"></div>
          <div className="APP-code-container a h-100p w-100p of-auto t-white mini-scroll brown-scroll p-10" />
          <div className="APP-code-container a h-100p w-100p of-auto t-white mini-scroll brown-scroll p-10 none" />
          <div className="APP-code-container a h-100p w-100p of-auto t-white mini-scroll brown-scroll p-10 none" />
        </div>
        <div className="APP-flex-container2 f-2 m-l-10" ref={flexContainer2} />
      </div>
    </div>
  </>
}

export default AppPage