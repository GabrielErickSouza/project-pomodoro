import { secondsToMinutes } from '../utils/second-to-minutes'
import {Time} from '../utils/pomodoro'

interface Props {
    mainTime:number
}

export function Timer(props:Props): JSX.Element{
     return (
        <Time>{secondsToMinutes(props.mainTime)}</Time>
     )
}