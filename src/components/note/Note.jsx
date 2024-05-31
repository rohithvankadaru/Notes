import React, { useEffect, useRef, useState } from 'react'
import './note.css'
import { MdOutlineEdit } from "react-icons/md"
import { RiDeleteBin5Line } from "react-icons/ri"
import { Modal } from 'antd';
import { BsExclamationSquareFill } from "react-icons/bs";
import ColorPallet from '../colorPallet/ColorPallet';

const Note = ({ title, text, index, editText, deleteFun, bgColor, editColor, highlightText }) => {

  const editSpanRef = useRef(null);
  const deleteSpanRef = useRef(null);
  const textBoxRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  
  useEffect(() => {
    if(text.toUpperCase().includes(highlightText.toUpperCase())) {
      text = text.split(highlightText).join(`<mark>${highlightText}</mark>`);
    }
    textBoxRef.current.innerHTML = text;
  })

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

  function noteColor(tagRef) {
    editColor(tagRef.current.getAttribute('index'), tagRef.current.getAttribute('noteBg'));
  }

  return (
    <>
      <div className='note' style={{ backgroundColor: bgColor }}>
        <h3>{title}</h3>
        <div className='note-body' ref={textBoxRef}></div>
        <div className='icon-container'>
          <span className='edit-icon-wrapper icon-wrapper' index={index} ref={editSpanRef} onClick={() => editText(editSpanRef)}>
            <MdOutlineEdit />
          </span>
          <span className='delete-icon-wrapper icon-wrapper' index={index} ref={deleteSpanRef} onClick={handleDelete}>
            <RiDeleteBin5Line />
          </span>
          <span className='color-icon-wrapper icon-wrapper' index={index}><ColorPallet noteColor={noteColor} index={index} /></span>
          </div>
      </div>
      <Modal open={showModal} onOk={handleOk} onCancel={handleCancel} okType='danger' okText='Yes' cancelText='No'>
        <label style={{ fontSize: '1.1rem', fontWeight: '600' }}><BsExclamationSquareFill className='exclamation-icon' />Are you sure delete this Note</label>
      </Modal>
    </>
  )
}

export default Note;