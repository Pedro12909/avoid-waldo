import React, {useMemo} from 'react'
import styled from 'styled-components'

import GAME_STATUS from '../game-status'

import evilWaldo from '../resources/evil-waldo.svg'
import waldo from '../resources/waldo.svg'
import mage from '../resources/mage.svg'

const Image = styled.img`
    width: 3rem;
    height: auto;
    margin-bottom: 1rem;
    &:hover {
        cursor: pointer;
    }
`

export const GameStatusButton = (props) => {
    let path = ''

    switch (props.status) {
        case GAME_STATUS.DEFEAT:
            path = evilWaldo
            break
        case GAME_STATUS.WIN:
            path = mage
            break
        default:
            path = waldo
            break
    }
    return useMemo(() => <Image src={path} onClick={props.resetGame}/>)
}

