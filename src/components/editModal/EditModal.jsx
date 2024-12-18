import { Button, Input, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'

const EditModal = ({ isEditTabOpen, saveEdit, text, setText, title, setTitle }) => {
    return (
        <Modal width={'100vw'} maskClosable={false} title='Edit Note' open={isEditTabOpen} onCancel={saveEdit} footer=''>
            <Input
             placeholder='Title'
             value={title}
             onChange={e => setTitle(e.target.value)}
            ></Input><br /><br />
            <TextArea
                bordered={false}
                placeholder='note content'
                value={text}
                style={{ height: '371px', Width: '400px' }}
                onChange={(e) => setText(e.target.value)} />
        </Modal>
    )
}

export default EditModal