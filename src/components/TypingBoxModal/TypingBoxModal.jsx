import { useContext } from 'react';
import { Modal } from 'antd';
import { TypingBoxContext } from '../../context/TypingBoxContext';
import TextArea from 'antd/es/input/TextArea';


const TypingBoxModal = ({text, setText}) => {

  const {isModalOpen, setIsModalOpen, showModal, handleOk, handleCancel} = useContext(TypingBoxContext);

  

  return (
    <>
        <Modal title="Add Note" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <TextArea style={{height: '300px', width: '500px'}} value={text} onChange={(e) => setText(e.target.value)} />
        </Modal>
    </>
  )
}

export default TypingBoxModal;
