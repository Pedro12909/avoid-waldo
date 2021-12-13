import React from 'react'
import styled from 'styled-components'
import { Mine } from './mine'
import { Flag } from './flag'

const cellBgColorFn = (cellProps) => {
    if (cellProps.isMine && cellProps.isRevealed) return 'red'

    if (cellProps.isRevealed) return '#c0c0c0'

    if (cellProps.isFlagged) return 'orange'

    return 'white'
}

const Cell = styled.div`
    width: 40px;
    height: 40px;
    padding: 10px;
    cursor: ${(props) => (props.disabled ? 'initial' : 'pointer')};
    background-color: ${(props) => props.backgroundColor};
    border: 1px solid black;
    border-radius: 4px;
    line-height: 1;
    text-align: center;
    font-size: 18px;
`

const NeighborCount = styled.span`
    font-weight: bold;
    color: ${(props) => {
        let color
        switch (props.value) {
            case 1:
                color = 'blue'
                break
            case 2:
                color = 'green'
                break
            case 3:
                color = 'purple'
                break
            case 5:
                color = 'darkred'
                break
            case 6:
                color = 'yellow'
                break
            case 7:
                color = 'cyan'
                break
            default:
                color = 'red'
                break
        }

        return color
    }};
`

export const Square = (props) => {
    const handleLeftClick = () => {
        if (!props.isRevealed) {
            props.revealSquareHandler(props.posX, props.posY)
        }
    }

    const handleRightClick = (evt) => {
        // Toggle flag status
        evt.preventDefault()
        if (!props.isRevealed) {
            props.flagSquareHandler(props.posX, props.posY)
        }
    }

    let squareColor = cellBgColorFn(props)

    return (
        <Cell
            onClick={handleLeftClick}
            onContextMenu={handleRightClick}
            backgroundColor={squareColor}
        >
            {props.isRevealed && props.isMine && <Mine />}
            {props.isRevealed && !props.isMine && (
                <NeighborCount value={props.neighbors}>
                    {props.neighbors > 0 ? props.neighbors : null}
                </NeighborCount>
            )}
            {props.isFlagged && <Flag />}
        </Cell>
    )
}
