import React from 'react'
import styled from 'styled-components'

import waldo from '../resources/waldo.svg'

const Image = styled.img`
    width: 1rem;
    height: auto;
`

export const Flag = () => (
    <Image src={waldo} />
)
