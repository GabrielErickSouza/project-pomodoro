import { useEffect, useState, useCallback } from 'react'
import { useInterval } from '../hooks/use-interval'
import { Timer } from './Timer/timer'
import {Button} from './Button/button'
import { secondsToTime } from '../utils/second-to-time'
import { Controls, Details, Pomodoro, Title } from './Pomodoro/pomodoroStyle'



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const bellStart = require('../sounds/bell-start.mp3')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const bellFinish = require('../sounds/bell-finish.mp3')

const audioStartWorking = new Audio(bellStart)
const audioStopWorking = new Audio(bellFinish)

interface Props {
    pomodoroTime:number
    shortRestTime:number
    longRestTime:number
    cycles:number
}

export function PomodoroTimer(props:Props): JSX.Element{
    const [mainTime,setMainTime] = useState(props.pomodoroTime)
    const [timeCouting,setTimeCouting] = useState(false)
    const [working, setWorking] = useState(false)
    const [resting, setResting] = useState(false)
    const [cyclesQtdManager, setCyclesQtdManager] = useState(new Array(props.cycles - 1).fill(true))

    const [completedCycles, setCompletedCycles] = useState(0)
    const [fullWorkingTime, setFullWorkingTime] = useState(0)
    const [numberOfPomodoro, setNumberOfPomodoro] = useState(0)

    

    useInterval(()=>{
        setMainTime(mainTime - 1)
        if (working) setFullWorkingTime(fullWorkingTime + 1)
    }, timeCouting? 1000:null)

    const configureWork = useCallback(() =>{
        setTimeCouting(true)
        setWorking(true)
        setResting(false)
        setMainTime(props.pomodoroTime)
        audioStartWorking.play()
    },[setTimeCouting,
        setWorking,
        setResting,
        setMainTime,
        props.pomodoroTime])

    const configureRest = useCallback((long:boolean) =>{
        setTimeCouting(true)
        setWorking(false)
        setResting(true)
        audioStopWorking.play()
        if (long) {
            setMainTime(props.longRestTime)
        }else{
            setMainTime(props.shortRestTime)
        }
    },[
        setTimeCouting,
        setWorking,
        setResting,
        setMainTime,
         props.longRestTime,
          props.shortRestTime,
        ])

    useEffect(()=>{
        if (working) document.body.classList.add('working')
        if (resting) document.body.classList.remove('working')

        if (mainTime > 0) return

        if (working && cyclesQtdManager.length > 0) {
            configureRest(false)
            cyclesQtdManager.pop()
        } else if (working && cyclesQtdManager.length < 0){
            configureRest(true)
            setCyclesQtdManager(new Array(props.cycles - 1).fill(true))
            setCompletedCycles(completedCycles + 1)
        }

        if (working) setNumberOfPomodoro(numberOfPomodoro + 1)
        if (resting) configureWork()
    },[working,resting,mainTime,configureRest,setCyclesQtdManager,completedCycles,configureWork,cyclesQtdManager,numberOfPomodoro,props.cycles])

    return (
        <Pomodoro>
            <Title>You are: {working?'working':'resting'}</Title>
            <Timer mainTime={mainTime}/>
            <Controls>    
                <Button text="Work" onClick={()=> configureWork()}/>
                <Button text="Rest" onClick={()=> configureRest(false)}/>
                {working || resting ?<Button 
                text={timeCouting?'Pause': 'Play'} 
                onClick={()=> setTimeCouting(!timeCouting)}
                />: null }
            </Controls>

            <Details>
                <p>Ciclos concluidos: {completedCycles}</p>
                <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
                <p>Pomodoros concluidos: {numberOfPomodoro}</p>
            </Details>
        </Pomodoro>
        
    )
}