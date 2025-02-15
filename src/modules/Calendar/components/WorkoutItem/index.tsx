import { WorkoutItemProps } from "../declaration";
import "./style.scss";

const WorkoutItem = ({ workoutPlanner, onDragStart, handleReorder, handleDropWorkoutItem, dayId }: WorkoutItemProps) => {
    return (
        <div
            key={workoutPlanner.id}
            onDrop={(e) => handleDropWorkoutItem(e, workoutPlanner.id, dayId)}
            onDragOver={(e) => e.preventDefault()}
            className="workout-item"
        >
            {workoutPlanner.workouts.length > 0 &&
                workoutPlanner.workouts.map((workout) => (
                    <div
                        className="workout-planner-content"
                        key={workout.id}
                        draggable
                        onDragStart={(e) => onDragStart(e, workout, workoutPlanner.id)}
                        onDragOver={(e) => {
                            e.preventDefault();
                            handleReorder(workout.id, workoutPlanner.id);
                        }}
                    >
                        <div className="workout-item-name">
                            <span>{workout.name}</span>
                        </div>
                        <div className="workout-item-details">
                            <div className="workout-item-sets">{workout.sets}x</div>
                            <div className="workout-item-reps">{workout.reps}</div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default WorkoutItem;
