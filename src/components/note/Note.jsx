import React, { useRef, useState } from 'react'
import './note.css'
import { MdOutlineEdit } from "react-icons/md"
import { RiDeleteBin5Line } from "react-icons/ri"
import { IoColorPaletteOutline } from "react-icons/io5"; 
import { Modal } from 'antd';

const Note = ({ title, text, index, editText, deleteFun }) => {

  const editSpanRef = useRef(null);
  const deleteSpanRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  function handleDelete() {
    setShowModal(true);
  }

  function handleOk() {
    deleteFun(deleteSpanRef);
    setShowModal(false);
  }

  function handleCancel() {
    setShowModal(false);
  }

  return (
    <>
      <div className='note'>
        <h3>{title}</h3>
        <div className='note-body'>{text}</div>
        <span className='edit-icon-wrapper icon-wrapper' index={index} ref={editSpanRef} onClick={() => editText(editSpanRef)}><MdOutlineEdit /></span>
        <span className='delete-icon-wrapper icon-wrapper' index={index} ref={deleteSpanRef} onClick={handleDelete}><RiDeleteBin5Line /></span>
        {/* <span><IoColorPaletteOutline /></span> */}
      </div>
      <Modal open={showModal} onOk={handleOk} onCancel={handleCancel}>
        <label>Are you sure, you want to delete</label>
      </Modal>
    </>
  )
}

export default Note;