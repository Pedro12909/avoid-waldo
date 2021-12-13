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

const Span = styled.span`
    font-weight: bold;
    color: ${(props) => props.color};
`

const NeighborCount = ({ value }) => {
    let color

    switch (value) {
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

    return <Span color={color}>{value > 0 ? value : null}</Span>
}

export const Square = (props) => {
    const handleLeftClick = () => {
        if (!props.isRevealed) {
            props.revealSquareHandler(props.posX, props.posY)
        }
    }

    /**
     * Toggle flag status
     */
    const handleRightClick = (evt) => {
        // Prevent context menu open
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
            disabled={props.isRevealed}
        >
            {props.isRevealed && props.isMine && <Mine />}
            {props.isRevealed && !props.isMine && (
                <NeighborCount value={props.neighbors} />
            )}
            {props.isFlagged && <Flag />}
        </Cell>
    )
}
