import { useRef, useState } from "react"
import "./Game.css"

const Game = (props) => {
  const {verifyLatter, guessedLetter, wrongLetter, guesses, score, pickedCategory, letters} = props
  const [letter, setLetter] = useState("")
  const letterInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    verifyLatter(letter)

    setLetter("")
    letterInputRef.current.focus()
  }

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda possui {guesses} tentativa(s)</p>
      <div className="wordContainer">
        {letters.map((letter, i) => (
          guessedLetter.includes(letter)?(
            <span key={i} className="letter">{letter}</span>
          ):(
            <span key={i} className="blankSquare"></span>
          )
        ))}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="letter" maxLength="1" required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef} />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras utilizadas:</p>
        {wrongLetter.map((letter, i) => (
            <span key={i}>{letter}</span>
        ))}
      </div>
    </div>
  )
}

export default Game