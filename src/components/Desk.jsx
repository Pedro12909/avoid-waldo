import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Square } from './square'

import { generateMineField } from '../helpers/generate-mine-field'

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

    const [mineLocations, setMineLocations] = useState([])
    const [revealedSquares, setRevealedSquares] = useState(0)
    const [mineField, setMineField] = useState([])
    const [gameOver, setGameOver] = useState(false)

    useEffect(() => {
        // Generate the minefield
        const { mineField: newMineField, mines } = generateMineField(
            boardSize,
            numberOfMines
        )

        setMineLocations(mines)

        setMineField(newMineField)
    }, [])

    const revealAllMines = () => {
        const newMineField = [...mineField]

        mineLocations.forEach((mine) => {
            const { posX, posY } = mine

            newMineField[posX][posY] = {
                ...newMineField[posX][posY],
                isFlagged: false,
                isRevealed: true,
            }
        })

        setMineField(newMineField)
    }

    const revealSquareHandler = (posX, posY) => {
        if (gameOver) return

        const newMineField = [...mineField]

        const clickedSquare = newMineField[posX][posY]

        // User clicked a mine. Game over
        if (clickedSquare.isMine) {
            revealAllMines()
            setGameOver(true)
        }

        // User clicked on a square with no neighbors.
        if (clickedSquare.neighbors === 0 && !clickedSquare.isMine) {
            revealAdjacentEmptySquares(posX, posY)
        } else {
            // Set state
            newMineField[posX] = [...newMineField[posX]]

            newMineField[posX][posY] = {
                ...newMineField[posX][posY],
                isFlagged: false,
                isRevealed: true,
            }

            setRevealedSquares(revealedSquares + 1)

            setMineField(newMineField)
        }
    }

    const revealAdjacentEmptySquares = (posX, posY) => {
        let revealed = 0

        // Shallow copy all the minefield to prevent state mutations
        const newMineField = [...mineField].map((row) =>
            [...row].map((square) => ({ ...square }))
        )

        let unvisitedEmptySquares = []
        unvisitedEmptySquares.push(newMineField[posX][posY])

        while (unvisitedEmptySquares.length > 0) {
            let currentSquare = unvisitedEmptySquares.pop()

            if (currentSquare.isRevealed) continue

            let { posX: x, posY: y } = currentSquare

            newMineField[x][y].isRevealed = true
            revealed++

            if (currentSquare.neighbors !== 0) continue

            const emptyNeighbors = getEmptyNeighbors(
                currentSquare,
                newMineField
            )
            unvisitedEmptySquares.push(...emptyNeighbors)
        }

        setMineField(newMineField)
        setRevealedSquares(revealedSquares + revealed)
    }

    const getEmptyNeighbors = (square, mineFieldClone) => {
        const { posX, posY } = square

        const emptyNeighbors = []

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (x === 0 && y === 0) continue

                let square = null
                try {
                    square = mineFieldClone[posX + x][posY + y]
                } catch (e) {
                    continue
                }

                if (
                    square &&
                    !square.isMine &&
                    !square.isRevealed &&
                    !square.isFlagged
                ) {
                    emptyNeighbors.push(square)
                }
            }
        }

        return emptyNeighbors
    }

    const flagSquareHandler = (posX, posY) => {
        if (gameOver) return
        const newMineField = [...mineField]
        newMineField[posX] = [...newMineField[posX]]

        const invertedFlag = !newMineField[posX][posY].isFlagged
        newMineField[posX][posY] = {
            ...newMineField[posX][posY],
            isFlagged: invertedFlag,
        }

        setMineField(newMineField)
        setRevealedSquares(revealedSquares + 1)
    }

    console.log(revealedSquares)

    return (
        <Grid boardSize={boardSize}>
            {mineField.map((row) =>
                row.map((square) => (
                    <Square
                        key={`${square.posX},${square.posY}`}
                        isMine={square.isMine}
                        neighbors={square.neighbors}
                        isFlagged={square.isFlagged}
                        isRevealed={square.isRevealed}
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
