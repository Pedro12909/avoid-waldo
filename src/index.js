import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { Game } from './containers/game'

const Title = styled.h1`
    margin: 32px;
`

const Container = styled.div`
  width: 40%;
  margin: 0 auto;
`

const App = () => (
    <Container>
        <Title>Minesweeper</Title>
        <Game />
    </Container>
)

ReactDOM.render(<App />, document.getElementById('root'))
