import React from 'react'

import { Desk } from '../components/desk'
import { Square } from '../components/square'
import { Mine } from '../components/mine'
import { Flag } from '../components/flag'

export const Game = () => {


    return (
        <Desk boardSize={10} numberOfMines={4}>
            {[...Array(100).keys()].map((i) => (
                <Square key={i} disabled={i === 55 || i === 10}>
                    {i === 10 && <Mine />}
                    {i === 25 && <Flag />}
                    {i === 77 ? '4' : ''}
                </Square>
            ))}
        </Desk>
    )
}
