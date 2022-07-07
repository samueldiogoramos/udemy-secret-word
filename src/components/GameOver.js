import "./GameOver.css"

const GameOver = ({ nextStage, score}) => {
  return (
    <div>
      <h1>Game Over</h1>
      <h2>Sua pontuação é de: <span>{score}</span></h2>
      <button onClick={nextStage}>Tentar novamente</button>
    </div>
  )
}

export default GameOver