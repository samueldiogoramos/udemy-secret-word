import './App.css';

import { useCallback, useEffect, useState } from 'react';

import StartScreen from './components/StartScreen';

import {wordsList} from "./data/words";
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id:1, name: "start"},
  {id:2, name: "game"},
  {id:3, name: "end"}
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState("")

  const [guessedLetter, setGuessedLetter] = useState([])
  const [wrongLetter, setWrongLetter] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    const wordsCategory = Object.values(words[category])
    const word = wordsCategory[Math.floor(Math.random() * wordsCategory.length)]

    return {category, word}
  }, [words])

  const startGame = useCallback(() => {
    clearLettersStates()

    const {category, word} = pickWordAndCategory()
    let letters = word.toLowerCase().split("")

    setPickedCategory(category)
    setPickedWord(word)
    setLetters(letters)
    setGameStage(stages[1].name)
  }, [pickWordAndCategory])

  const verifyLatter = (letter) => {
    const letterNormalized = normalizeLetter(letter)

    if(checkLetterGuess(letterNormalized) || checkLetterWrong(letterNormalized)){
      return
    }

    if(letters.includes(letterNormalized)){
      setGuessedLetter((actual) => [
        ...actual, letterNormalized
      ])
    }else{
      setWrongLetter((actual) => [
        ...actual, letterNormalized
      ])

      setGuesses((actual) => actual - 1)
    }
  }

  // Monitora condição de perder o jogo
  useEffect(() => {
    if(guesses <= 0){
      clearLettersStates()

      setGameStage(stages[2].name)
    }
  }, [guesses])

  // Monitora condição de ganhar o jogo
  useEffect(() => {
    const uniqueLetters = [... new Set(letters)]

    if(guessedLetter.length === uniqueLetters.length){
      setScore((actual) => actual += 100)
      startGame()
    }

  }, [guessedLetter, letters, startGame])

  const normalizeLetter = (letter) => {
    return letter.toLowerCase()
  }

  const clearLettersStates = () =>{
    setWrongLetter([])
    setGuessedLetter([])
  }

  const checkLetterGuess = (letter) => {
    return guessedLetter.includes(letter)
  }

  const checkLetterWrong = (letter) => {
    return wrongLetter.includes(letter)
  }

  const retry = () => {
    setGuesses(3)
    setScore(0)

    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
     {gameStage === stages[0].name && <StartScreen nextStage={startGame}/>}
     {gameStage === stages[1].name && <Game verifyLatter={verifyLatter} guessedLetter={guessedLetter} wrongLetter={wrongLetter}  guesses={guesses} score={score} pickedCategory={pickedCategory} letters={letters} />}
     {gameStage === stages[2].name && <GameOver nextStage={retry} score={score}/>}
    </div>
  );
}

export default App;
