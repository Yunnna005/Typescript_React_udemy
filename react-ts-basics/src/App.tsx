import CourseGoal from "./components/CourseGoal.tsx";
import Header from "./components/Header.tsx";
import GoalImg from "./assets/goals.jpg";
import { useState } from "react";
import NewGoal from "./components/NewGoal.tsx";
import CourseGoaList from "./components/CourseGoalList.tsx";



export type CourseGoal= {
    title: string;
    description: string;
    id: number;
};

export default function App(){
  const [goals, setGoal] = useState<CourseGoal[]>([]);

  function AddGoalHandler(goal: string, summary: string){
      setGoal((prevGoal) => {
        const newGoal: CourseGoal = {
          id: Math.random(),
          title: goal,
          description: summary
        };
        return [...prevGoal, newGoal];
      });
  }

  function DeleteGoalHandler(id: number){
    setGoal(prevGoal => prevGoal.filter((goal) => goal.id !== id))
  }

  return (
    <main>
      <Header image={{src:GoalImg, alt: "A list of goals"}}>
        <h1>Your course goal</h1>
      </Header>
      <NewGoal onAddGoal={AddGoalHandler}></NewGoal>
      <CourseGoaList goals={goals} onDeleteGoal={DeleteGoalHandler}></CourseGoaList>
    </main>
  );
}