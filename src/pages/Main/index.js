import { useState } from 'react';
import './style.css';
import logo from '../../assets/Logo.png'
import cardBack from '../../assets/card-back.png';
import arrayCards from '../../cards';
import congrats from '../../assets/congrats.png'

function Main() {

  const [cards, setCards] = useState(arrayCards);

  function handleClickCard(card) {
    let localCards = [...cards];

    const cardFindId = localCards.find((cardId) => cardId.id === card.id);
    cardFindId.turned = !cardFindId.turned;

    setCards(localCards);

    const cardFindSlug = localCards.find((cardSlug) => cardSlug.slug === card.slug && cardSlug.id !== card.id);
    if (cardFindId.turned && cardFindSlug.turned) {
      localCards = localCards.filter((card) => {

        return card.slug !== cardFindSlug.slug
      });

      setTimeout(() => {
        setCards(localCards);
      }, 700)
      return
    }

    const changeCards = localCards.filter((card) => { return card.turned === true })

    if (changeCards.length > 1) {
      setTimeout(() => {
        localCards = localCards.map(card => {
          return card = { ...card, turned: false };
        });
        setCards(localCards);
      }, 700);
      return
    }


    setCards(localCards);
  }


  function handleResetCards() {
    const localCards = [...arrayCards];

    localCards.forEach(card => {
      return card.turned = false;
    });

    setCards(localCards);
  }


  return (
    <div className='container'>

      <div className="div-black">
        <img src={logo} />
        <button
          className="btn-reset"
          onClick={() => handleResetCards()}
        >
          Reset
        </button>
      </div>

      <div className="div-white">
        <div className="card-block">
          {cards.map((card) => {
            return (
              <img
                key={card.id}
                src={card.turned ? card.image : cardBack}
                onClick={() => handleClickCard(card)}
              />
            )
          })}
          <img src={congrats} className={cards.length > 1 && 'show-congrats'} style={{ width: '600px', height: '500px' }} />
        </div>
      </div>
    </div >
  );
}

export default Main;
