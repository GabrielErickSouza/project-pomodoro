import { useState } from "react";
import { PomodoroTimer } from "../PomodoroTimer/PomodoroTimer";
import { GlobalStyle } from "../../utils/globalStyle";

import { AppWrapper, Container } from "./styles";

function App(): JSX.Element {
  const [isWorking, setIsWorking] = useState(false);
  return (
    <>
      <GlobalStyle />
      <AppWrapper $isWorking={isWorking}>
        <Container>
          <PomodoroTimer
            pomodoroTime={3600}
            shortRestTime={300}
            longRestTime={900}
            cycles={4}
            setIsWorking={setIsWorking}
          />
        </Container>
      </AppWrapper>
    </>
  );
}

export default App;
