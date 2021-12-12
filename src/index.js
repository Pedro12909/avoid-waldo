import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import GAME_STATUS from './game-status'

import { Desk } from './components/desk'
import { GameStatusButton } from './components/GameStatusButton'

const Container = styled.div`
    width: 60%;
    margin: 1% auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const Title = styled.h1`
    font-size: 64px;
    font-weight: bold;
    color: white;
    text-align: center;
    margin-bottom: 0;
`

const Subtitle = styled.p`
    font-size: 20px;
    font-weight: regular;
    color: white;
    text-align: center;
`

const App = () => {
    const [gameStatus, setgameStatus] = useState(GAME_STATUS.PLAYING)

    const isGameOver = gameStatus !== GAME_STATUS.PLAYING

    return (
        <Container>
            <Title>Avoid Waldo!</Title>
            <Subtitle>
                A twist of the classic Minesweeper game, but you have to avoid
                Waldo.
            </Subtitle>
            <GameStatusButton status={gameStatus} />
            <Desk
                boardSize={20}
                numberOfMines={40}
                setGameStatus={setgameStatus}
                isGameOver={isGameOver}
            />
        </Container>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
