import CourseGoal from "./CourseGoal.tsx";
import { CourseGoal as CGoal } from "../App.tsx";
import InfoBox from "./InfoBox.tsx";
import { ReactNode } from "react";

type CourseGoaListProps = {
  goals: CGoal[];
  onDeleteGoal: (id: number) => void;
};

export default function CourseGoaList({
  goals,
  onDeleteGoal,
}: CourseGoaListProps) {
  if (goals.length === 0) {
    return <InfoBox mode="hint">You have no goals yet.</InfoBox>;
  }

  let warningBox: ReactNode;

  if (goals.length >= 4) {
    warningBox = (
      <InfoBox mode="warning" severity="high">
        You have too many goals.
      </InfoBox>
    );
  }
  return (
    <>
      {warningBox}
      <ul>
        {goals.map((goals) => (
          <li key={goals.id}>
            <CourseGoal
              id={goals.id}
              title={goals.title}
              onDelete={onDeleteGoal}
            >
              <p>{goals.description}</p>
            </CourseGoal>
          </li>
        ))}
      </ul>
    </>
  );
}
