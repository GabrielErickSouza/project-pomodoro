import React from 'react'
import {ButtonStyle} from './pomodoroStyle'

interface Props {
    text: string
    onClick?: ()=> void 
}

export function Button(props:Props): JSX.Element{
     return (<ButtonStyle onClick={props.onClick} >{props.text}</ButtonStyle>
        
     )
}