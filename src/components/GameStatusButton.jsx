import React from 'react'
import styled from 'styled-components'

import GAME_STATUS from '../game-status'

import evilWaldo from '../resources/evil-waldo.svg'
import waldo from '../resources/waldo.svg'
import mage from '../resources/mage.svg'

const Image = styled.img`
    width: 4rem;
    height: auto;
    cursor: pointer
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

    return <Image src={path} onClick={props.reset}/>
}
