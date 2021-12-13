import React from 'react'
import styled from 'styled-components'

import evilWaldo from '../resources/evil-waldo.svg'

const Image = styled.img`
    width: 1rem;
    height: auto;
`

export const Mine = () => (
    <Image src={evilWaldo} />
)