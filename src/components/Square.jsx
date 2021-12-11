import React, {useState} from 'react'
import styled from 'styled-components'
import { Mine } from './mine'
import { Flag } from './flag'

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

    const handleLeftClick = () => {
        props.revealSquareHandler(props.posX, props.posY)
    }

    const handleRightClick = evt => {
        // Toggle flag status
        evt.preventDefault()
        if (!props.isRevealed) {
            props.flagSquareHandler(props.posX, props.posY)      
        }
    }

    console.log('render square');
    return (
        <Cell onClick={handleLeftClick} onContextMenu={handleRightClick} disabled={props.isRevealed}>
            {props.isRevealed && props.isMine && <Mine />}
            {props.isRevealed && !props.isMine && <span>{props.neighbors > 0 ? props.neighbors : null}</span>}
            {props.isFlagged && <Flag />}
        </Cell>
    )
}
