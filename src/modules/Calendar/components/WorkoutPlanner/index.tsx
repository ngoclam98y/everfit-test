import React from "react";
import { getCurrentDay, getDayText } from "../WeeklyCalendar/until";
import WorkoutItem from "../WorkoutItem";
import Icon from "@/components/Icon";
import { AddIcon } from "@/assets/icons";
import "./style.scss"
import { WorkoutPlannerDayProps } from "../declaration";
import { ThreeDot } from "@/assets/icons/ThreeDot";

const WorkoutPlannerDay: React.FC<WorkoutPlannerDayProps> = ({
    plannerWeekly,
    onDragOver,
    onDrop,
    handleAddWorkoutPlannerModal,
    handleAddWorkoutPlannerItemModal,
    onDragStart,
    handleReorder,
    handleDragStartWorkoutPlanner,
    handleDropWorkoutPlanner,
    handleDropWorkoutItem
}) => {
    return (
        <div
            key={plannerWeekly.id}
            className={`day ${plannerWeekly.date == getCurrentDay() ? "current-day" : ""}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDropWorkoutPlanner(e, plannerWeekly.id)}
        >
            <div className="day-text">{getDayText(plannerWeekly.date)}</div>
            <div className="workout-planner">
                <div className="workout-planner-header">
                    <h2 className="workout-planner--day">{plannerWeekly.date}</h2>
                    <Icon icon={<AddIcon />} onClick={() => handleAddWorkoutPlannerModal(plannerWeekly.date)} />
                </div>

                {plannerWeekly.workoutPlanners.length > 0 && <div className="workout-planner-item-wrap">
                    {(plannerWeekly.workoutPlanners || []).map((workoutPlanner) => (
                        <div
                            key={workoutPlanner.id}
                            draggable
                            onDragStart={(e) => handleDragStartWorkoutPlanner(e, workoutPlanner, plannerWeekly.id)}
                            onDragOver={onDragOver}
                            onDrop={(e) => handleDropWorkoutPlanner(e, plannerWeekly.id)}
                            className="workout-planner-item"
                        >
                            <div className="workout-name">
                                <div className="title">{workoutPlanner.name}</div>
                                <Icon icon={<ThreeDot />} />
                            </div>
                            <WorkoutItem
                                key={workoutPlanner.id}
                                workoutPlanner={workoutPlanner}
                                dayId={workoutPlanner.id}
                                onDragOver={onDragOver}
                                handleReorder={handleReorder}
                                onDragStart={onDragStart}
                                handleDropWorkoutItem={handleDropWorkoutItem}
                            />
                            <div className="workout-planner-item-action">
                                <Icon icon={<AddIcon />} onClick={() => handleAddWorkoutPlannerItemModal({ plannerWeeklyId: plannerWeekly.id, workoutPlannerId: workoutPlanner.id })} />
                            </div>
                        </div>
                    ))}

                </div>
                }

            </div>
        </div>
    );
};

export default WorkoutPlannerDay;
