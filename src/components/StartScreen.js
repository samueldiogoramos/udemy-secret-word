import './StartScreen.css'

const StartScreen = ({nextStage}) => {

  return (
    <div className="start">
      <h1>Secret Word</h1>
      <p>Clique no botão abaixo para começar a jogar</p>
      <button onClick={nextStage}>Começar o jogo</button>
    </div>
  )
}

export default StartScreen