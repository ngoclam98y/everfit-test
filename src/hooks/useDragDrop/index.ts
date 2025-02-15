import { useState } from "react";
import { WorkouPlanner } from "../../modules/Calendar/components/WeeklyCalendar/declaration";

export const useDragDrop = (initialItems: any[]) => {
  const [data, setData] = useState<WorkouPlanner[]>(initialItems);

  const onDragEnd = (result: any) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === "DAY") {
      const items = Array.from(data);
      const [movedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, movedItem);
      setData(items);
    } else if (type === "WORKOUT") {
      const sourceDay = data.find((day) => day.id === source.droppableId);
      const destDay = data.find((day) => day.id === destination.droppableId);
      if (!sourceDay || !destDay) return;

      const sourceWorkouts = Array.from(sourceDay.workouts || []);
      const [movedWorkout] = sourceWorkouts.splice(source.index, 1);

      if (source.droppableId === destination.droppableId) {
        sourceWorkouts.splice(destination.index, 0, movedWorkout);
        const newData = data.map((day) =>
          day.id === sourceDay.id ? { ...day, workouts: sourceWorkouts } : day
        );
        setData(newData);
      } else {
        const destWorkouts = Array.from(destDay.workouts || []);
        destWorkouts.splice(destination.index, 0, movedWorkout);
        const newData = data.map((day) => {
          if (day.id === sourceDay.id) return { ...day, workouts: sourceWorkouts };
          if (day.id === destDay.id) return { ...day, workouts: destWorkouts };
          return day;
        });
        setData(newData);
      }
    }
  };

  return { data, setData, onDragEnd };
};
