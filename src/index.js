import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import GAME_STATUS from './game-status'

import { Desk } from './components/desk'
import { GameStatusButton } from './components/GameStatusButton'

const Container = styled.div`
    width: 40%;
    margin: 0 auto;
`

const App = () => {
    const [gameStatus, setgameStatus] = useState(GAME_STATUS.PLAYING)

    const isGameOver = gameStatus !== GAME_STATUS.PLAYING

    return (
        <Container>
            <h1>Avoid Waldo</h1>
            <p>The classic Where's Waldo game, but with a spin.</p>
            <GameStatusButton status={gameStatus} />
            <Desk
                boardSize={10}
                numberOfMines={1}
                setGameStatus={setgameStatus}
                isGameOver={isGameOver}
            />
        </Container>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
