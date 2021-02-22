import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import getCards from '../../utilities/getCards';

// css
import '../css/NotePage.css';

const adjustXButtonSpacing = (card, buttonContainer, maxHeight) => {
  if (buttonContainer) {
    const button = buttonContainer.firstChild;
    button.classList.add('REACT-green-light');
    if (card.offsetHeight != maxHeight) button.classList.add('NOTE-x-space1');
    else button.classList.add('NOTE-x-space2');
    button.addEventListener('click', () => buildApp(card));
  }
}

const adjustYButtonSpacing = (cards) => {
  for (let card of cards) {
    let buttonContainer = card.lastChild;
    if (buttonContainer.className === "NOTE-button-container") {
      if (card.scrollWidth > card.clientWidth) {
        buttonContainer.firstChild.classList.remove('NOTE-y-space');
      } else {
        buttonContainer.firstChild.classList.add('NOTE-y-space');
      }
    }
  }
}

const buildApp = (card) => {
  if (document.querySelector('.app-container') !== null) document.querySelector('.app-container').remove();
  let appContainer = document.createElement('div');
  appContainer.classList.add('app-container');
  let background = document.createElement('div');
  background.classList.add('NOTE-background');
  background.addEventListener('click', () => {
    appContainer.remove();
    document.body.removeAttribute("style");;
  });
  appContainer.appendChild(background);
  let iframe = document.createElement('iframe');
  iframe.classList.add('NOTE-iframe');
  let html = card.innerText.slice(0, -6);
  iframe.srcdoc = html;
  appContainer.appendChild(iframe);
  document.body.style.overflow = 'hidden';
  document.body.appendChild(appContainer);
}

const NotePage = () => {

  const [cards, setCards] = useState(undefined);
  const [maxCardHeight] = useState(500);
  const container = useRef(null);
  const params = useParams();

  useEffect(() => {
    document.title = params.note;
    getCards(params, setCards);
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

  useEffect(() => {
    if (cards) {
      for (let card of cards) {
        container.current.appendChild(card);
        const buttonContainer = card.querySelector('.NOTE-button-container');
        adjustXButtonSpacing(card, buttonContainer, maxCardHeight);
      }
      adjustYButtonSpacing(cards, maxCardHeight);
      const adjustYButtonSpacingHandler = () => adjustYButtonSpacing(cards, maxCardHeight);
      window.addEventListener('resize', adjustYButtonSpacingHandler);
      return () => {
        window.removeEventListener('resize', adjustYButtonSpacingHandler);
      }
    }
  });

  return (
    <>
      <div 
        className="NOTE-card-container" 
        ref={container}>
      </div>
    </>
  );
}

export default NotePage;