import React from 'react';
import './App.css';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Timer from './Timer/Timer'
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TimerIcon from '@material-ui/icons/Timer';
import { SnackbarProvider} from 'notistack'
import useSound from 'use-sound';
import start_app from '../assets/sounds/start.mp3';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            width: '200px',
            margin: '0 auto',
        },
    }),
);

const App = () => {
    const [start, setStart] = React.useState<boolean>(false);
    const classes = useStyles();

    const [play] = useSound(start_app, {
        volume: 10
      });

    if (start) {
        return (
            <SnackbarProvider dense maxSnack={3} anchorOrigin={{vertical: 'top',horizontal: 'center',}} autoHideDuration={2000}>
                <Timer start={start} />
            </SnackbarProvider>
        )
    }
    else {
        return (
            <Fade in={!start} timeout={3000}>
                <div className="app-main">
                    Hours
                            <Button
                        id="app-main-button"
                        variant="contained"
                        size="large"
                        color="secondary"
                        className={classes.button}
                        endIcon={<TimerIcon />}
                        onClick={() => { setStart(true); play()}}
                    >
                        Start Timer
                            </Button>
                </div>
            </Fade>
        )
    }
};

export default App;