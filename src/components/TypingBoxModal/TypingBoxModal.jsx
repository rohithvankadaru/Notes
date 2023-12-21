import { Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';


const TypingBoxModal = ({ text, setText, title, setTitle, isModalOpen, setIsModalOpen, showModal, handleOk, handleCancel }) => {

  return (
      <Modal title="Add Note" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
        <br />
        <br />
        <TextArea
          placeholder='Enter a note'
          style={{ height: '300px', Width: '400px' }}
          value={text}
          onChange={(e) => setText(e.target.value)} />
      </Modal>
  )
}

export default TypingBoxModal;