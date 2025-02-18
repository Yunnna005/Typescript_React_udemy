import Button from "./UI/Button.tsx";
import { useTimerContext } from "../Store/timer-contex.tsx";

export default function Header() {
  const timerCts = useTimerContext();
  return (
    <header>
      <h1>ReactTimer</h1>

      <Button
        onClick={
          timerCts.isRunning ? timerCts.stopTimers : timerCts.startTimers
        }
      >
        {timerCts.isRunning ? "Stop" : "Start"}Timers
      </Button>
    </header>
  );
}
