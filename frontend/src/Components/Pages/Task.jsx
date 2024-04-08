import ComingSoonPage from "./ComingSoon";
import { useGetUnassignedTask } from "../../Hooks/useTaskQueries";
import { useAllBlocks } from "../../Hooks/useBlockQueries";
import * as moment from "moment";
import Loading from "./Loading";
import { buildWeekdayBar } from "../Utility/weekDayBar";
import { useModal } from "../../Context/Modal";
import CreateEditTask from "../Modals/Create-Edit-Task";
import TaskDetails from "../Modals/Task-Details";
import { useState, useEffect } from "react";
import "../../Styling/task.css";
import DashTaskHex from "../Utility/DashTaskHex";

export default function Task() {
  const {
    unassignedTask,
    isLoading: uaTaskIsLoading,
    isError: uaTaskIsError,
    error: uaTaskError,
  } = useGetUnassignedTask();
  const {
    allBlocks,
    isError: abIsError,
    isLoading: abIsLoading,
    error: abError,
  } = useAllBlocks();

  const { showModal } = useModal();

  if (uaTaskIsLoading || abIsLoading) return <Loading />;

  const getClass = (task) => {
    if (task.status) return "taskTitle greyOut";
    return "taskTitle gold";
  };

  return (
    <div className="taskPageBackground">
      <div className="taskPageCont">
        <div className="taskPageTitle cursive">Task</div>

        <div className="taskBlockRow">
          <div className="taskBlockInfoCont" id="noBlockAssignedTitle">
            <div className="tpBlockTitle handwriting">No Block Assigned</div>

            <div
              onClick={() => showModal(<CreateEditTask />, "gold")}
              className="TPaddTaskButton handwriting"
              id="noBlockButton"
            >
              Add task
            </div>
          </div>
          <div className="taskforBlockContainer">
            {unassignedTask?.map((task) => {
              return (



                <div
                  key={`TASK${task.id}`}
                  className={getClass(task)}
                  onClick={() => showModal(<TaskDetails task={task} />, "gold")}
                >
                  {task.subtasks?.length ? <DashTaskHex task={task} colorClass="blackHex"/> : ''}

                  {task.title}
                </div>
              );
            })}
          </div>
        </div>

        {allBlocks.map((block) => {
          return (
            <div key={`BLOCK${block.id}`} className="taskBlockRow">
              <div className="taskBlockInfoCont">
                <div className="tpBlockTitle handwriting">{block.title}</div>
                <div className="taskBlockTime">
                  {moment(block.startTime, "HH:mm:ss").format("h:mm A")} -{" "}
                  {moment(block.endTime, "HH:mm:ss").format("h:mm A")}
                </div>

                <div className="taskWeedayBar">
                  {buildWeekdayBar(block, "rgba(247, 211, 5, 0.758)")}
                </div>

                <div
                  onClick={() =>
                    showModal(<CreateEditTask blockId={block.id} />, "gold")
                  }
                  className="TPaddTaskButton handwriting"
                >
                  Add task
                </div>
              </div>

              <div className="taskforBlockContainer">
                {block.tasks && block.tasks.length > 0 ? (
                  block.tasks.map((task) => (
                    <div
                      key={`TASK${task.id}`}
                      className={getClass(task)}
                      onClick={() =>
                        showModal(
                          <TaskDetails task={task} blockTitle={block.title} />,
                          "gold"
                        )
                      }
                    >
                      {task.subtasks?.length ? <DashTaskHex task={task} colorClass="blackHex"/> : ''}
                      {task.title}
                    </div>
                  ))
                ) : (
                  <div>No assigned task</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
