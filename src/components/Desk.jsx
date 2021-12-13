import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { GameStatusButton } from './GameStatusButton'
import { Square } from './square'
import { generateMineField } from '../helpers/generate-mine-field'

import GAME_STATUS from '../game-status'

const Grid = styled.div`
    width: ${(props) => `${props.boardSize * 40}px`};
    display: flex;
    flex-wrap: wrap;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`

export const Desk = (props) => {
    const { boardSize, numberOfMines } = props

    const [mineLocations, setMineLocations] = useState([])
    const [revealedSquares, setRevealedSquares] = useState(0)
    const [flaggedSquares, setFlaggedSquares] = useState(0)
    const [mineField, setMineField] = useState([])
    const [gameStatus, setGameStatus] = useState(GAME_STATUS.PLAYING)

    /**
     * Executed every time the user interacts with the grid
     */
    useEffect(() => {
        console.log('Revealed', revealedSquares)
        console.log('Flagged', flaggedSquares)
        console.log('Minefield', mineField)

        if (checkIfUserWon()) {
            setGameStatus(GAME_STATUS.WIN)
            alert("CONGRATULATIONS! You have successfully avoided Waldo. Now go brag to your friends!")
        }
    }, [revealedSquares, flaggedSquares])

    /**
     * Init
     */
    useEffect(() => {
        // Generate the minefield
        const { mineField: newMineField, mines } = generateMineField(
            boardSize,
            numberOfMines
        )

        setMineLocations(mines)

        setMineField(newMineField)
    }, [])

    /**
     * Reverts this component to it's initial state
     */
    const resetGame = () => {
        setMineLocations([])
        setRevealedSquares(0)
        setFlaggedSquares(0)

        const { mineField: newMineField, mines } = generateMineField(
            boardSize,
            numberOfMines
        )
        setMineLocations(mines)

        setMineField(newMineField)
        setGameStatus(GAME_STATUS.PLAYING)
    }

    /**
     * Checks if the user won the game by looking at the amount of revealed
     * and flagged squares (safe squares) and also the mine locations
     * @returns {boolean} true if the user won the game
     */
    const checkIfUserWon = () => {
        const totalBoardSize = Math.pow(boardSize, 2)

        return (
            revealedSquares + flaggedSquares === totalBoardSize &&
            revealedSquares === totalBoardSize - mineLocations.length
        )
    }

    /**
     * Reveals all the mines in the grid
     * Used when the user loses the game by clicking on a mine
     */
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
    
    /**
     * Handles the onClick of each square
     * 
     * @param {number} posX x position of the square that was clicked
     * @param {number} posY y position of the square that was clicked
     */
    const revealSquareHandler = (posX, posY) => {
        if (gameStatus !== GAME_STATUS.PLAYING) return

        const newMineField = [...mineField]

        const clickedSquare = newMineField[posX][posY]

        // User clicked a mine. Game over
        if (clickedSquare.isMine) {
            revealAllMines()
            setGameStatus(GAME_STATUS.DEFEAT)
        }

        // User clicked on a square with no neighbors.
        if (clickedSquare.neighbors === 0 && !clickedSquare.isMine) {
            revealAdjacentEmptySquares(posX, posY)
        } else {
            // Set state
            newMineField[posX] = [...newMineField[posX]]
            newMineField[posX][posY] = {
                ...newMineField[posX][posY],
                isRevealed: true,
            }

            if (clickedSquare.isFlagged) {
                clickedSquare.isFlagged = false
                setFlaggedSquares(flaggedSquares - 1)
            }

            setRevealedSquares(revealedSquares + 1)

            setMineField(newMineField)
        }
    }

    /**
     * Uses an iterative algorithm to reveal all adjacent squares that
     * have 0 neighbors
     * @param {number} posX x position of the square that was clicked
     * @param {number} posY y position of the square that was clicked 
     */
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

            currentSquare.isRevealed = true
            revealed++

            if (currentSquare.isFlagged) {
                currentSquare.isFlagged = false
                setFlaggedSquares(flaggedSquares - 1)
            }

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

    /**
     * An array of the given square's neighbors that are: not mines, not revealed and not flagged
     * @param {*} square The target square
     * @param {*} mineField A shallow copy of the entire mineField/grid
     * @returns [] empty neighbors
     */
    const getEmptyNeighbors = (square, mineField) => {
        const { posX, posY } = square

        const emptyNeighbors = []

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (x === 0 && y === 0) continue

                let square = null
                try {
                    square = mineField[posX + x][posY + y]
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

    /**
     * Handles the right click of a square
     * @param {number} posX x position of the square that was clicked
     * @param {number} posY y position of the square that was clicked
     */
    const flagSquareHandler = (posX, posY) => {
        if (gameStatus !== GAME_STATUS.PLAYING) return

        const newMineField = [...mineField]
        newMineField[posX] = [...newMineField[posX]]

        const flaggedSquare = newMineField[posX][posY]

        const invertedFlag = !flaggedSquare.isFlagged
        newMineField[posX][posY] = {
            ...flaggedSquare,
            isFlagged: invertedFlag,
        }

        if (invertedFlag) {
            setFlaggedSquares(flaggedSquares + 1)
        } else {
            setFlaggedSquares(flaggedSquares - 1)
        }

        setMineField(newMineField)
    }

    return (
        <>
            <GameStatusButton status={gameStatus} resetGame={resetGame} />
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
        </>
    )
}
