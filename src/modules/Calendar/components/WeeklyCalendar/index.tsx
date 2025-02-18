import React from "react";
import "./style.scss";
import { useLogic } from "./hooks/useLogic";
import { Modal, ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader } from "@/components/Modal";
import { useDisclosure } from "@/hooks/useDisclosure";
import Input from "@/components/Input";
import * as uuid from "uuid";
import WorkoutPlannerDay from "../WorkoutPlanner";
import { ErrorWorkout, WorkoutPlannerItemSelected } from "../declaration";

const WeeklyCalendar: React.FC = () => {
    const {
        handleAddWorkoutPlanner, handleDragStart,
        handleDrop, handleDragOver, handleReorder, plannerWeeklies,
        handleAddWorkoutItem, handleDropWorkoutPlanner, handleDragStartWorkoutPlanner,
        handleDropWorkoutItem
    } = useLogic();
    const { close, isOpen, open, } = useDisclosure();
    const { close: closeWorkoutModal, isOpen: isOpenWorkoutModal, open: openWorkoutModal } = useDisclosure();

    const [selectedDate, setSelectedDate] = React.useState<string>('');
    const [workoutPlannerItemSelected, setWorkoutPlannerItemSelected] = React.useState<WorkoutPlannerItemSelected>({
        plannerWeeklyId: '',
        workoutPlannerId: ''
    });

    const [workoutSets, setworkoutSets] = React.useState<number>(0);
    const [workoutReps, setWorkoutReps] = React.useState<string>('');
    const [workoutName, setWorkoutName] = React.useState<string>('');

    const [titleWorkoutPlanner, setTitleWorkoutPlanner] = React.useState<string>('');

    const [errorTitleWorkoutPlanner, setErrorTitleWorkoutPlanner] = React.useState<string>('');

    const [errorWorkout, setErrorWorkout] = React.useState<ErrorWorkout>({
        name: '',
        sets: '',
        reps: ''
    });

    const handleAddWorkoutPlannerModal = (date: string) => {
        open();
        setSelectedDate(date);
    }

    const handleAddWorkoutPlannerItemModal = ({ plannerWeeklyId, workoutPlannerId }: WorkoutPlannerItemSelected) => {
        setWorkoutPlannerItemSelected({ plannerWeeklyId, workoutPlannerId })
        openWorkoutModal()
    }

    return (
        <>
            <div className="weekly-calendar">
                <div className="days">
                    {plannerWeeklies.map((plannerWeekly) => (
                        <WorkoutPlannerDay
                            key={plannerWeekly.id}
                            plannerWeekly={plannerWeekly}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            handleReorder={handleReorder}
                            handleAddWorkoutPlannerModal={handleAddWorkoutPlannerModal}
                            handleAddWorkoutPlannerItemModal={handleAddWorkoutPlannerItemModal}
                            onDragStart={handleDragStart}
                            handleDragStartWorkoutPlanner={handleDragStartWorkoutPlanner}
                            handleDropWorkoutPlanner={handleDropWorkoutPlanner}
                            handleDropWorkoutItem={handleDropWorkoutItem}
                        />
                    ))}
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={close}>
                {
                    isOpen && <ModalContent>
                        <ModalContainer>
                            <ModalHeader title="Add Workout Planner" isClose onClose={close} />
                            <ModalBody>
                                <Input error={errorTitleWorkoutPlanner} label="Name" onChange={(e) => setTitleWorkoutPlanner(e.target.value)} />
                            </ModalBody>
                            <ModalFooter onClickOk={() => {
                                if (!titleWorkoutPlanner) {
                                    setErrorTitleWorkoutPlanner("Title workout planner is required");
                                    return;
                                }
                                setErrorTitleWorkoutPlanner('');
                                handleAddWorkoutPlanner({
                                    id: uuid.v4(),
                                    name: titleWorkoutPlanner,
                                    date: selectedDate,
                                    workouts: []
                                })
                                close();
                            }} />
                        </ModalContainer>
                    </ModalContent>
                }
            </Modal>

            <Modal isOpen={isOpenWorkoutModal} onClose={closeWorkoutModal}>
                {
                    isOpenWorkoutModal && <ModalContent>
                        <ModalContainer>
                            <ModalHeader title="Add Workout" isClose onClose={closeWorkoutModal} />
                            <ModalBody>
                                <Input label="Name" error={errorWorkout.name} onChange={(e) => setWorkoutName(e.target.value)} />
                                <Input type="number" min={1} error={errorWorkout.sets} label="Sets" onChange={(e) => setworkoutSets(+e.target.value)} />
                                <Input label="Reps" error={errorWorkout.reps} onChange={(e) => setWorkoutReps(e.target.value)} />
                            </ModalBody>
                            <ModalFooter onClickOk={() => {
                                if (!workoutName || workoutSets == 0 || !workoutReps) {
                                    const setsErrStr = workoutSets == 0 ? "Sets workout is required" : "";
                                    const repsErrStr = !workoutReps ? "Reps workout is required" : "";
                                    const nameErrStr = !workoutName ? "Name workout is required" : "";
                                    setErrorWorkout({ ...errorWorkout, sets: setsErrStr, name: nameErrStr, reps: repsErrStr });
                                    return;
                                }
                                setErrorWorkout({ name: '', sets: '', reps: '' });

                                handleAddWorkoutItem(workoutPlannerItemSelected, {
                                    id: uuid.v4(),
                                    name: workoutName,
                                    sets: workoutSets,
                                    reps: workoutReps
                                })
                                closeWorkoutModal();
                            }} />
                        </ModalContainer>
                    </ModalContent>
                }
            </Modal>
        </>

    );
};

export default WeeklyCalendar;
