import { Button, Input, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'

const EditModal = ({ isEditTabOpen, saveEdit, text, setText, title, setTitle }) => {
    return (
        <Modal title='Edit Note' open={isEditTabOpen} onCancel={saveEdit} footer={<Button type='primary' onClick={saveEdit}>OK</Button>}>
            <Input
             placeholder='Title'
             value={title}
             onChange={e => setTitle(e.target.value)}
            ></Input><br /><br />
            <TextArea
                placeholder='note content'
                value={text}
                style={{ height: '300px', Width: '400px' }}
                onChange={(e) => setText(e.target.value)} />
        </Modal>
    )
}

export default EditModal