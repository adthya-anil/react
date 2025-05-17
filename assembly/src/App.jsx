import React from "react";
import './App.css';
import { languages } from './language.js';
import clsx from 'clsx';
import { getFarewellText } from "./utils.js";
import { words } from "./words.js";

export default function App() {
  const [currentWord, setCurrentWord] = React.useState(()=>newgame());
  const [guessedLetter, setGuessedLetter] = React.useState([]);
  
  const wrongGuessCount = guessedLetter.filter(letter=> !currentWord.includes(letter)).length
  const isGameWon = currentWord.split('').every(letter=>guessedLetter.includes(letter))
  const isGameLost = wrongGuessCount >= languages.length
  const isGameOver = isGameWon || isGameLost
  const lastGuessed = guessedLetter[guessedLetter.length - 1]
  const isLastGuessedIncorrect  = lastGuessed && !currentWord.includes(lastGuessed)
  

  function addGuessedLetter(letter) {
    setGuessedLetter(prevLetters =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  function newgame(){
    const index = Math.floor(Math.random() * words.length)
    setCurrentWord(words[index])
    setGuessedLetter([])
  }

  const alpha = 'abcdefghijklmnopqrstuvwxyz';

  const languageElements = languages.map((lang,index) => {
    const className=clsx(
      'chip',
      wrongGuessCount>index && 'lost'
    )

    return (
      <span
      className={className}
      key={lang.name}
      style={{
        backgroundColor: lang.backgroundColor,
        color: lang.color
      }}
    >
      {lang.name}
    </span>
    )
    
    
  }
    
  );

  const keyboardElements = alpha.split('').map(key => {
    const isGuessed = guessedLetter.includes(key)
    const isCorrect = isGuessed && currentWord.includes(key)
    const isWrong = isGuessed && !currentWord.includes(key)
    const className = clsx(
      isCorrect && 'correct',
      isWrong && 'wrong'
    )

    return (
      <button className={className}
      disabled={isGameOver}
      onClick={() => addGuessedLetter(key)}
      key={key.toUpperCase()}
    >
      {key.toUpperCase()}
    </button>
    )
  })

  const wordElements = currentWord.split('').map((elem, index) => (
    <span key={index}>{guessedLetter.includes(elem)? elem.toUpperCase():'' || isGameOver ? elem.toUpperCase() : ''}</span>
  ));
  const gameClass = clsx(
    'game-status',
    isGameWon && 'gameWon',
    isGameLost && 'gameLost'
  )
  return (
    <main>
      <header>
        <h1>Welcome To Assembly</h1>
        <p>this is a fun game</p>
      </header>
      <section className={gameClass}>
        {isGameOver ? (
          isGameWon ? (
            <>
              <h3>You Win</h3>
              <p>this is a fun game</p>
            </>
          ) : isGameLost ? (
            <>
              <h3>You lose</h3>
              <p>Now Start Learning Assembly!!</p>
            </>
          ) : null
        ) : (wrongGuessCount > 0 && isLastGuessedIncorrect ? getFarewellText(languages[wrongGuessCount-1].name) : null)}
      </section>
      <section className='language-chip'>
        {languageElements}
      </section>
      <section className='wordElements'>
        {wordElements}
      </section>
      <section className="keyboard">
        {keyboardElements}
      </section>
      {isGameOver ? <button onClick={newgame} className="new-game">New Game</button> : ''}
    </main>
  );
}