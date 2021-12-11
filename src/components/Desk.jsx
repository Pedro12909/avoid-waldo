import React, { useState, useEffect } from 'react'
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

const generateMineField = (size, numberOfMines) => {
    // Initialize a 2D array
    const mineField = [...Array(size).keys()].map((row, x) =>
        [...Array(size).keys()].map((square, y) => ({
            neighbors: 0,
            isMine: false,
            posX: x,
            posY: y,
            flagged: false,
            revealed: false,
        }))
    )

    // Randomly populate the mine field with mines
    // If a given square is a mine, it will be equal to 1
    let remainingMines = numberOfMines
    while (remainingMines > 0) {
        const randX = rand(size)
        const randY = rand(size)

        // Confirm that this square is not a mine already
        if (!mineField[randX][randY].isMine) {
            mineField[randX][randY].isMine = true
            remainingMines--
        }
    }

    // Populate neighbor mine count
    for (let x = 0; x < mineField.length; x++) {
        const row = mineField[x]

        for (let y = 0; y < row.length; y++) {
            const square = row[y]

            // Only increment neighbor counters if this is a a mine
            if (!square.isMine) continue

            // Top left
            if (x > 0 && y > 0) {
                mineField[x - 1][y - 1].neighbors++
            }
            // Top
            if (y > 0) {
                mineField[x][y - 1].neighbors++
            }
            // Top right
            if (x < size - 1 && y > 0) {
                mineField[x + 1][y - 1].neighbors++
            }
            // Right
            if (x < size - 1) {
                mineField[x + 1][y].neighbors++
            }
            // Bottom right
            if (x < size - 1 && y < size - 1) {
                mineField[x + 1][y + 1].neighbors++
            }
            // Bottom
            if (y < size - 1) {
                mineField[x][y + 1].neighbors++
            }
            // Bottom left
            if (x > 0 && y < size - 1) {
                mineField[x - 1][y + 1].neighbors++
            }
            // Left
            if (x > 0) {
                mineField[x - 1][y].neighbors++
            }
        }
    }

    return mineField
}

export const Desk = (props) => {
    const { boardSize, numberOfMines } = props

    const [mineField, setMineField] = useState([])
    const [gameOver, setGameOver] = useState(false)

    useEffect(() => {
        // Generate the minefield
        setMineField(generateMineField(boardSize, numberOfMines))
    }, [])

    const revealSquareHandler = (posX, posY) => {
        const newMineField = [...mineField]

        const clickedSquare = newMineField[posX][posY]

        // User clicked a mine. Game over
        if (clickedSquare.isMine) {
            //TODO: do something with this
            setGameOver(true);
        }

        // User clicked on a square with no neighbors.
        if (clickedSquare.neighbors === 0) {
            //TODO: implement recursive click
        }

        // Set state
        newMineField[posX] = [...newMineField[posX]]

        newMineField[posX][posY] = {
            ...newMineField[posX][posY],
            flagged: false,
            revealed: true
        }

        setMineField(newMineField)
    }

    const flagSquareHandler = (posX, posY) => {
        const newMineField = [...mineField]
        newMineField[posX] = [...newMineField[posX]]

        const invertedFlag = !newMineField[posX][posY].flagged
        newMineField[posX][posY] = {
            ...newMineField[posX][posY],
            flagged: invertedFlag,
        }

        setMineField(newMineField)
    }

    return (
        <Grid boardSize={boardSize}>
            {mineField.map((row) =>
                row.map((square) => (
                    <Square
                        key={`${square.posX},${square.posY}`}
                        isMine={square.isMine}
                        neighbors={square.neighbors}
                        isFlagged={square.flagged}
                        isRevealed={square.revealed}
                        flagSquareHandler={flagSquareHandler}
                        revealSquareHandler={revealSquareHandler}
                        posX={square.posX}
                        posY={square.posY}
                    />
                ))
            )}
        </Grid>
    )
}
