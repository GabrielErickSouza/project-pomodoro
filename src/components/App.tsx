import React from 'react';
import { PomodoroTimer } from './Pomodoro/pomodoroTimer';
import { GlobalStyle, Container} from './globalStyle';

function App(): JSX.Element {
  return (
    <>
    <GlobalStyle/>
    <Container>
        <PomodoroTimer 
        pomodoroTime={3600} 
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
        />
    </Container>
    </>
  );
}

export default App;
