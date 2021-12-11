import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { Desk } from './components/desk'

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
        <Desk boardSize={10} numberOfMines={10} />
    </Container>
)

ReactDOM.render(<App />, document.getElementById('root'))
