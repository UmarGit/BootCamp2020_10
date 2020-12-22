import React from 'react';
import PropTypes from 'prop-types';
import './TimerButton.css'
import Fab from '@material-ui/core/Fab';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import ResetIcon from '@material-ui/icons/Stop';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import useSound from 'use-sound';
import pop_down from '../../../assets/sounds/pop-down.mp3';
import pop_up_on from '../../../assets/sounds/pop-up-on.mp3';
import pop_up_off from '../../../assets/sounds/pop-up-off.mp3';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button_color: {
      backgroundColor: 'rgb(109, 0, 255)',
    },
  }),
);

const TimerButton = ({ buttonAction, buttonValue }: {buttonAction: React.MouseEventHandler, buttonValue: string}) => {
  const classes = useStyles();

  const [playActive] = useSound(
    pop_down,
    { volume: 0.25 }
  );
  const [playOn] = useSound(
    pop_up_on,
    { volume: 0.25 }
  );
  const [playOff] = useSound(
    pop_up_off,
    { volume: 0.25 }
  );  
  
  function play_on(){
    playOn()
  }

  function play_off(){
    playOff()
  }

  return(
    <Fab color="primary" size={ window.outerWidth <= 300 ? 'medium' : 'large'} aria-label={buttonValue} id={buttonValue} className={classes.button_color} onClick={buttonAction} onMouseDown={()=>{playActive()}} onMouseUp={() => {buttonValue === "Start" ? play_off() : play_on()}} >
      {
        buttonValue === "Start" ?
        <PlayIcon />
        :
        buttonValue === "Stop" ?
        <PauseIcon />
        :
        <ResetIcon />
      }
    </Fab>
  )
};

TimerButton.propTypes = {
  buttonAction: PropTypes.func.isRequired,
  buttonValue: PropTypes.string.isRequired,
};

export default TimerButton;