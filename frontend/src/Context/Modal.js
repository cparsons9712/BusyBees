import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [closeButtonClass, setCloseButtonClass] = useState('black');;

  const showModal = (content, closeButtonClass = 'black') => {
    setModalContent(content);
    setCloseButtonClass(closeButtonClass); // Optionally set a different class
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ isVisible, showModal, hideModal, closeButtonClass, modalContent }}>
      {children}
    </ModalContext.Provider>
  );
};
