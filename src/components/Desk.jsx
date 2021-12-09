import React from 'react'
import styled from 'styled-components'
import { Square } from './square'

const rand = (max) => Math.floor(Math.random() * max)

const Grid = styled.div`
    margin: 32px;
    width: ${(props) => `${props.boardSize * 40 + 2}px`};
    height: 402px;
    border: 1px solid black;
    display: flex;
    flex-wrap: wrap;
`

export const Desk = (props) => {
    const { boardSize, numberOfMines } = props
    // Generate the minefield

    // Initialize a 2D array of zeros
    const mineField = [...Array(boardSize).keys()].map(() =>
        [...Array(boardSize).keys()].map(() => 0)
    )

    // Randomly populate the mine field with mines
    // If a given square is a mine, it will be equal to 1
    let remainingMines = numberOfMines
    while (remainingMines > 0) {
        const randX = rand(boardSize)
        const randY = rand(boardSize)

        // Confirm that this square is not a mine already
        if (!mineField[randX][randY]) {
            mineField[randX][randY] = 1
            remainingMines--
        }
    }

    return (
        <Grid boardSize={10}>
            {mineField.map((row, posX) =>
                row.map((square, posY) => (
                    <Square key={`${posX},${posY}`} isBomb={square === 1} />
                ))
            )}
        </Grid>
    )
}
