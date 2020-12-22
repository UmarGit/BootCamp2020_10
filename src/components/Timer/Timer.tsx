import React from 'react';
import TimerButton from './TimerButton/TimerButton'
import TimerSVG from '../../assets/TimerSVG'
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Zoom from '@material-ui/core/Zoom';
import Fade from '@material-ui/core/Fade';
import { VariantType, useSnackbar, ProviderContext } from 'notistack';
import './Timer.css';
import useSound from 'use-sound';
import tick_sound from '../../assets/sounds/pop-down.mp3';

interface CurrentTimerState {
    hours: number,
    minutes: number,
    seconds: number,
    isOn: boolean
}

const Timer = ({ start }: { start: boolean} ) => {
    const [timerState, setTimerState] = React.useState<CurrentTimerState>({
        hours: 60,
        minutes: 60,
        seconds: 60,
        isOn: false
    });
    const [myInterval, setMyInterval] = React.useState<NodeJS.Timeout>(setInterval(() => { }, 0));

    const [tick, setTick] = React.useState<number>(360);

    const [SnackBarLoader] = React.useState<ProviderContext>(useSnackbar())

    const [play_ticking] = useSound(
        tick_sound,
        { volume: 0.4, playbackRate: 6 }
    );

    const handleInformation = (message: string, variant: VariantType) => {
        SnackBarLoader?.enqueueSnackbar(message, { variant });
    };

    function startTimer() {
        if (timerState.isOn === true) {
            return;
        } 
        let obj: CurrentTimerState = timerState;
        setMyInterval(setInterval(() => {
            if (obj.seconds > 0) {
                obj = {
                    hours: obj.hours,
                    minutes: obj.minutes,
                    seconds: obj.seconds - 1,
                    isOn: true
                }
            }
            if (obj.seconds === 0) {
                if (obj.minutes === 0) {
                    if (obj.hours === 0) {
                        clearInterval(myInterval);
                    } else {
                        obj = {
                            hours: obj.hours - 1,
                            minutes: 60,
                            seconds: obj.seconds,
                            isOn: true
                        }
                        handleInformation("One minute had been passed", "success")
                    }
                } else {
                    obj = {
                        hours: 60,
                        minutes: obj.minutes - 1,
                        seconds: 60,
                        isOn: true
                    }
                    handleInformation("One minute had been passed", "success")
                }
            }
            setterForTimerState(obj);
            setterForTicking();
        }, 1000));
        handleInformation("Timer Started", "info")
        setTimerState({
            hours: timerState.hours,
            minutes: timerState.minutes,
            seconds: timerState.seconds,
            isOn: true
        })
    }

    function setterForTimerState(obj: CurrentTimerState) {
        setTimerState(obj);
        play_ticking();
    }

    function setterForTicking() {
        setTick(tickValue => tickValue !== 0 ? tickValue - 36 : 360);
        setTick(tickValue => tickValue === 360 ? tickValue - 36 : tickValue);
    }

    function getTime(): string{
        return timerState.hours.toString() + " : " + timerState.minutes.toString() + " : " + timerState.seconds.toString()
    }

    function stopTimer() {
        handleInformation("Timer Stopped at " + getTime(), "warning")
        clearInterval(myInterval);
        setTimerState({
            hours: timerState.hours,
            minutes: timerState.minutes,
            seconds: timerState.seconds,
            isOn: false
        })
    }

    function resetTimer() {
        handleInformation("Timer Resetted at " + getTime(), "error")
        clearInterval(myInterval);
        setTimerState({
            hours: 60,
            minutes: 60,
            seconds: 60,
            isOn: false
        })
        setTick(tickValue => 360);
    }

    return (
        <Fade in={start} timeout={1000}>
            <Grid id="timer-container" className="timer-container">
                <input type="hidden" name="timer-status" value={timerState.isOn.toString()} />
                <input type="hidden" name="timer-minutes" value={timerState.minutes.toString()} />
                <input type="hidden" name="timer-seconds" value={timerState.seconds.toString()} />
                <Grid className="ticker" item xs={12}>
                    <TimerSVG tick={tick} />
                </Grid>
                <Grid className="timer-display" item xs={12}>
                    <div className="timer-displaybox">
                        <div className="timer-text" >{timerState.hours} : </div>
                        <div className="timer-details">Hours</div>
                    </div>
                    <div className="timer-displaybox">
                        <div className="timer-text" >{timerState.minutes < 10 ? `0${timerState.minutes}` : timerState.minutes} : </div>
                        <div className="timer-details">Minutes</div>
                    </div>
                    <div className="timer-displaybox">
                        <div className="timer-text" >{timerState.seconds < 10 ? `0${timerState.seconds}` : timerState.seconds}</div>
                        <div className="timer-details">Seconds</div>
                    </div>
                </Grid>
                {
                    timerState.isOn ?
                        <Zoom in={timerState.isOn}>
                            <Grid className="timer-control" item xs={12}>
                                <TimerButton buttonAction={stopTimer} buttonValue={'Stop'}/>
                                <TimerButton buttonAction={resetTimer} buttonValue={'Reset'} />
                            </Grid>
                        </Zoom>
                        :
                        <Grow in={!timerState.isOn}>
                            <Grid className="timer-control" item xs={12}>
                                <TimerButton buttonAction={startTimer} buttonValue={'Start'} />
                            </Grid>
                        </Grow>
                }
            </Grid>
        </Fade>
    )
};

export default Timer;