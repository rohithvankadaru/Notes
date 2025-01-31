import { Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';


const TypingBoxModal = ({ text, setText, title, setTitle, isModalOpen, handleCancel }) => {

  return (
    <Modal width={'100vw'} maskClosable={false} title="Add Note" open={isModalOpen} onCancel={handleCancel} footer=''>
      <Input placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} /><br /><br />
      <TextArea
        bordered={false}
        placeholder='Type your content...'
        style={{ height: '371px', Width: '400px' }}
        value={text}
        onChange={(e) => setText(e.target.value)} />
    </Modal>
  )
}

export default TypingBoxModal;