import { Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'

const EditModal = ({isEditTabOpen, saveEdit, text, setText}) => {
    return (
        <Modal open={isEditTabOpen} onOk={saveEdit} onCancel={saveEdit}>
            <TextArea
                value= {text}
                style={{ height: '300px', minWidth: '400px' }}
                onChange={(e) => setText(e.target.value)} />
        </Modal>
    )
}

export default EditModal