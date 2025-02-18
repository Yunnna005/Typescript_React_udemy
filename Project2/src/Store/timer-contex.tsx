import React, { createContext, ReactNode, useContext, useReducer } from "react";

export type Timer = {
  name: string;
  duration: number;
};

type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

const initialState: TimersState = {
  isRunning: true,
  timers: [],
};

type TimersContextValues = TimersState & {
  addTimer: (timerData: Timer) => void;
  startTimers: () => void;
  stopTimers: () => void;
};

export const TimersContext = createContext<TimersContextValues | null>(null);
export function useTimerContext() {
  const timerCts = useContext(TimersContext);

  if (timerCts === null) {
    throw new Error("Error");
  }

  return timerCts;
}

type TimerContextProvideProps = {
  children: ReactNode;
};

type startTimersAction = {
  type: "START_TIMER";
};
type stopTimersAction = {
  type: "STOP_TIMER";
};
type addTimersAction = {
  type: "ADD_TIMER";
  payload: Timer;
};

type Action = startTimersAction | stopTimersAction | addTimersAction;

function timerReducer(state: TimersState, action: Action): TimersState {
  if (action.type === "START_TIMER") {
    return {
      ...state,
      isRunning: true,
    };
  }
  if (action.type === "STOP_TIMER") {
    return {
      ...state,
      isRunning: false,
    };
  }
  if (action.type === "ADD_TIMER") {
    return {
      ...state,
      timers: [
        ...state.timers,
        {
          name: action.payload.name,
          duration: action.payload.duration,
        },
      ],
    };
  }

  return state;
}

export default function TimerContextProvider({
  children,
}: TimerContextProvideProps) {
  const [timerState, dispatch] = useReducer(timerReducer, initialState);
  const ctx: TimersContextValues = {
    timers: timerState.timers,
    isRunning: timerState.isRunning,
    addTimer(timerData) {
      dispatch({ type: "ADD_TIMER", payload: timerData });
    },
    startTimers() {
      dispatch({ type: "START_TIMER" });
    },
    stopTimers() {
      dispatch({ type: "STOP_TIMER" });
    },
  };
  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
}
