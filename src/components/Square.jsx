import React, {useState} from 'react'
import styled from 'styled-components'
import { Mine } from './mine'

const Cell = styled.div`
    width: 40px;
    height: 40px;
    padding: 10px;
    cursor: ${(props) => (props.disabled ? 'initial' : 'pointer')};
    background-color: ${(props) => (props.disabled ? '#CCC' : '#FFF')};
    border: 1px solid black;
    line-height: 1;
    text-align: center;
    font-size: 18px;
`

export const Square = (props) => {
    const [revealed, setRevealed] = useState(false)

    const revealSquare = () => {
        if (revealed) return

        setRevealed(true)
    }

    return (
        <Cell onClick={revealSquare} disabled={revealed}>
            {revealed && props.isBomb && <Mine />}
            {revealed && !props.isBomb && <span>{props.neighbors > 0 ? props.neighbors : null}</span>}
        </Cell>
    )
}
