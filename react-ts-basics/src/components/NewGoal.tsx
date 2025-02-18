import { FormEvent, useRef } from "react";

type NewGoalProps ={
    onAddGoal: (goal: string, summary: string) => void;
}

export default function NewGoal({onAddGoal}: NewGoalProps){
    const goal = useRef<HTMLFormElement>(null);
    const summary = useRef<HTMLFormElement>(null);

    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        const enteredGoal = goal.current!.value;
        const enteredSummary  = summary.current!.value;

        event.currentTarget.reset();
        onAddGoal(enteredGoal, enteredSummary);
    }

    return(
        <form onSubmit={handleSubmit}>
            <p>
                <label htmlFor="goal">Your goal</label>
                <input id="goal" type="text" ref={goal}></input>
            </p>
            <p>
                <label htmlFor="summary">Summary</label>
                <input id="summary" type="text" ref={summary}></input>
            </p>
            <p>
                <button>Add Goal</button>
            </p>
        </form>
    );
}