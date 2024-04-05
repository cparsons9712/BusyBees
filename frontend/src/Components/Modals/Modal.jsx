import { useEffect } from "react";
import { useSpring, animated, useTransition } from "@react-spring/web";
import { useModal } from "../../Context/Modal";
import "../../Styling/modal.css";

const Modal = () => {
const { isVisible, hideModal, modalContent, closeButtonClass  } = useModal();
  const handleEscape = (e) => {
    if (e.keyCode === 27) {
        hideModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, []);
  const modalTransition = useTransition(isVisible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
    config: {
      duration: 300,
    },
  });

  const springs = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0%)" : "translateY(-100%)",
    config: {
      duration: 300,
    },
  });
  return modalTransition(
    (styles, isVisible) =>
    isVisible && (
        <animated.div style={styles} className="modalBackground">
          <animated.div style={springs} className="modalContainer">
            <div className="modalContent">
              <button onClick={hideModal} type="button" className={`closeButton ${closeButtonClass}`}>
                X
              </button>
              {modalContent}
            </div>
          </animated.div>
        </animated.div>
      )
  );
};

export default Modal;
