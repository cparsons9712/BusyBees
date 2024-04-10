import React, { useState, useRef, useEffect } from "react";
import { useCreateSubtask } from "../../Hooks/useSubtaskQueries";
import { useGetSubtask } from "../../Hooks/useSubtaskQueries";
import { useChangeSubtaskStatus } from "../../Hooks/useSubtaskQueries";
import { useDeleteSubtask } from "../../Hooks/useSubtaskQueries";
import { useChangeSubtaskTitle } from "../../Hooks/useSubtaskQueries";

const SubtaskList = ({ task }) => {
  const [showSubtask, setShowSubtask] = useState(false);
  const [showAddST, setShowAddST] = useState(false);
  const [title, setTitle] = useState("");
  const [editST, setEditST] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRefs = useRef({});
  const { mutate } = useCreateSubtask();
  const { subtask } = useGetSubtask(task.id);
  const { mutate: checkOffST } = useChangeSubtaskStatus();
  const { mutate: deleteSubtask } = useDeleteSubtask();
  const { mutate: changeTitle } = useChangeSubtaskTitle();

  const onSubmit = (e) => {
    e.preventDefault();

    if (editST) {
      const payload = { title, status: editST.status };
      changeTitle({ id: editST.id, payload });
      setTitle("");
      setShowAddST(false);
    } else {
      const payload = { title, taskId: +task.id };
      mutate({ payload });
      setTitle("");
      setShowAddST(false);
    }
  };
  const onCancel = () => {
    setTitle("");
    setShowAddST(false);
  };

  const onEdit = (st) => {
    setTitle(st.title);
    setEditST(st);
    setShowAddST(true);
  };

  const showAddSubtask = () => {
    if (showAddST) {
      return (
        <form className="addStForm" onSubmit={onSubmit}>
          <div className="addStTitleLabel">Title</div>
          <textarea
            maxLength="60"
            minLength={"3"}
            className="stTitleInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="STButtonBar">
            <div className="STButton" onClick={() => onCancel()}>
              Cancel
            </div>
            {title.length < 3 ? (
              <div className="disabledButton"> Save </div>
            ) : (
              <div
                className="STButton"
                type="submit"
                onClick={(e) => onSubmit(e)}
              >
                Save
              </div>
            )}
          </div>
        </form>
      );
    }
  };

  const getSubtask = () => {
    return subtask?.length ? (
      subtask.map((st) => (
        <div className="stTitle" key={st.id}>
          {st.status ? (
            <div className="subtaskDone" onClick={() => checkOffST(st)}>
              {" "}
              X
            </div>
          ) : (
            <div className="subtaskUndone" onClick={() => checkOffST(st)}>
              {" "}
            </div>
          )}

          <div>{st.title}</div>

          <div className="stOptionsMenu" onClick={() => toggleMenu(st.id)}>
            ⋮
          </div>
          {openMenuId === st.id && (
            <div ref={menuRefs.current[st.id]} className="stMenu">
              <div
                className="stMenuOption"
                onClick={() => {
                  onEdit(st);
                }}
              >
                Edit
              </div>
              <div
                className="stMenuOption"
                onClick={() => deleteSubtask({ id: +st.id })}
              >
                Delete
              </div>
              <div className="stMenuOption" onClick={() => checkOffST(st)}>
                Check Off
              </div>
            </div>
          )}
        </div>
      ))
    ) : (
      <div className="stTitle">No subtask to display</div>
    );
  };

  const showSubtaskList = () => {
    if (showSubtask) {
      return (
        <div className="tdSubtaskList">
          {getSubtask()}

          {showAddST ? (
            showAddSubtask()
          ) : (
            <div className="addSTButton" onClick={() => setShowAddST(true)}>
              +
            </div>
          )}
        </div>
      );
    }
  };

  const toggleMenu = (id) => {
    if (openMenuId === id) {
      setOpenMenuId(null);
    } else {
      setOpenMenuId(id);
      // Ensure the ref object for this menu is created
      if (!menuRefs.current[id]) {
        menuRefs.current[id] = React.createRef();
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuId !== null) {
        const currentRef = menuRefs.current[openMenuId];
        if (currentRef && !currentRef.current?.contains(event.target)) {
          setOpenMenuId(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  return (
    <div className="tdSubtaskcont">
      <div
        className="tdToggleSubtask"
        onClick={() => setShowSubtask(!showSubtask)}
      >
        <div></div>
        <div>Subtask</div>
        <div>{showSubtask ? "-" : "+"} </div>
      </div>

      {showSubtaskList()}
    </div>
  );
};

export default SubtaskList;
