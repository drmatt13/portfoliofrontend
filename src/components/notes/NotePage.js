import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import getCards from '../../utilities/getCards';
import PageChange from '../ui/PageChange';
import ContainerPortal from '../ui/ContainerPortal';
import NoteIframe from './NoteIframe';

// css
import '../css/NotePage.css';

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

const NotePage = () => {

  const [cards, setCards] = useState(undefined);
  const [maxCardHeight] = useState(500);
  const [html, setHtml] = useState(undefined);

  const container = useRef(null);
  const params = useParams();

  useEffect(() => {
    getCards(params, setCards);
  }, [params]);

  useEffect(() => {
    if (cards) {
      for (let card of cards) {
        container.current.appendChild(card);
        const buttonContainer = card.querySelector('.NOTE-button-container');
        if (buttonContainer) {
          const button = buttonContainer.firstChild;
          button.classList.add('REACT-green-light');
          if (card.offsetHeight !== maxCardHeight) button.classList.add('NOTE-x-space1');
          else button.classList.add('NOTE-x-space2');
          button.addEventListener('click', () => setHtml(card.innerText.slice(0, -6)));
        }
      }
      adjustYButtonSpacing(cards, maxCardHeight);
      const adjustYButtonSpacingHandler = () => adjustYButtonSpacing(cards, maxCardHeight);
      window.addEventListener('resize', adjustYButtonSpacingHandler);
      return () => {
        window.removeEventListener('resize', adjustYButtonSpacingHandler);
      }
    }
  }, [cards]);

  return (
    <>
      <PageChange title={params.note} />
      {html && <ContainerPortal showContainerPortal={setHtml}>
        <NoteIframe html={html} />
      </ContainerPortal>}
      <div className="NOTE-page-container w-100vw f f-d-column f-a-center" ref={container}></div>
    </>
  );
}

export default NotePage;