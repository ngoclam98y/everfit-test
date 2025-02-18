export type WorkoutPlan = {
    id: string;
    date: string;
    workout: WorkoutItem[];
};

export type ErrorWorkout = {
    name?: string;
    sets?: string;
    reps?: string;
};

export interface WorkoutPlannerProps {
    day: string;
    open: (date: string) => void;
    workouPlanners: WorkoutPlanner[];
}

export interface WorkoutPlanner {
    id: string;
    name: string;
    date: string;
    workouts: WorkoutItem[];
}

export interface WorkoutItemProps {
    workoutPlanner: WorkoutPlanner;
    dayId: string;
    onDragOver: (e: React.DragEvent, workoutId: string, dayId: string) => void;
    onDragStart: (e: React.DragEvent, workout: any, workoutPlannerId: string) => void;
    handleReorder: (workoutId: string, workoutPlannerId: string) => void;
    handleDropWorkoutItem: (e: React.DragEvent, workoutPlannerId: string, dayId: string) => void;
}

export type WorkoutItem = {
    id: string;
    name?: string;
    sets?: number;
    reps?: string;
};

export interface WorkoutPlanner {
    id: string;
    name: string;
    date: string;
    workouts: WorkoutItem[];
}

export interface PlannerWeekly {
    id: string;
    date: string;
    workoutPlanners: WorkoutPlanner[];
}

export interface WorkoutPlannerItemSelected {
    plannerWeeklyId: string;
    workoutPlannerId: string;
}

export interface WorkoutPlannerDayProps {
    plannerWeekly: PlannerWeekly;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent, dayId: string) => void;
    onDragStart: (e: React.DragEvent, workout: any, dayId: string) => void;
    handleAddWorkoutPlannerModal: (date: string) => void;
    handleAddWorkoutPlannerItemModal: ({ plannerWeeklyId, workoutPlannerId }: WorkoutPlannerItemSelected) => void;
    handleReorder: (workoutId: string, workoutPlannerId: string) => void;
    handleDragStartWorkoutPlanner: (e: React.DragEvent, planner: WorkoutPlanner, fromWeeklyId: string) => void;
    handleDropWorkoutPlanner: (e: React.DragEvent, dayId: string) => void;
    handleDropWorkoutItem: (e: React.DragEvent, workoutPlannerId: string, dayId: string) => void;
}