import React from "react";
import "./style.scss";
import { useLogic } from "./hooks/useLogic";
import { Modal, ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader } from "@/components/Modal";
import { useDisclosure } from "@/hooks/useDisclosure";
import Input from "@/components/Input";
import * as uuid from "uuid";
import WorkoutPlannerDay from "../WorkoutPlanner";
import { WorkoutPlannerItemSelected } from "../declaration";

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
                                <Input label="Name" onChange={(e) => setTitleWorkoutPlanner(e.target.value)} />
                            </ModalBody>
                            <ModalFooter onClickOk={() => {
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
                                <Input label="Name" onChange={(e) => setWorkoutName(e.target.value)} />
                                <Input type="number" label="Sets" onChange={(e) => setworkoutSets(+e.target.value)} />
                                <Input label="Reps" onChange={(e) => setWorkoutReps(e.target.value)} />
                            </ModalBody>
                            <ModalFooter onClickOk={() => {
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
