import { useState } from 'react'
import { TypingBoxContext } from './TypingBoxContext'

const TypingBoxProvider = ({children}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

  return (
    <TypingBoxContext.Provider  value={{isModalOpen, setIsModalOpen, showModal, handleOk, handleCancel}}>
        {children}
    </TypingBoxContext.Provider>
  )
}

export default TypingBoxProvider;