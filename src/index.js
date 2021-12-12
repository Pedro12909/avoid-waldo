import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { Desk } from './components/desk'

const Container = styled.div`
    width: 40%;
    margin: 0 auto;
`

const GAME_STATUS = {
    PLAYING: 'playing',
    WIN: 'win',
    DEFEAT: 'defeat',
}

const App = () => {
    return (
        <Container>
            <h1>Avoid Waldo</h1>
            <p>
                The classic Where's Waldo game, but with a spin. Click the image
                below at any time to restart the game
            </p>
            
            <Desk boardSize={10} numberOfMines={10} />
        </Container>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
