import { PropsWithChildren } from "react";

type CourseGoalProps = PropsWithChildren<{
    id: number;
    title: string;
    onDelete: (id: number)=>void;
}>

export default function CourseGoal({title,id, children, onDelete}: CourseGoalProps){
    return (
        <article>
            <div>
                <h1>{title}</h1>
                <p>{children}</p>
            </div>
            <button onClick={() => onDelete(id)}>Delete</button>
        </article>
    );
}