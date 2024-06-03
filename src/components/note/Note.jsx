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
  const titleRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  
  useEffect(() => {
    if(highlightText) {
      const ranges = findIndeces(text.toUpperCase(), highlightText.toUpperCase());
      text = addHAtRanges(text, ranges);

      const titleRanges = findIndeces(title.toUpperCase(), highlightText.toUpperCase());
      title = addHAtRanges(title, titleRanges);
    }
    textBoxRef.current.innerHTML = text;
    titleRef.current.innerHTML = title;
  });

  function addHAtRanges(str, ranges) {
    let arr = str.split('');

    for (let range of ranges) {
        let [start, end] = range;
        arr[start] = '<mark>' + arr[start];
        arr[end] += '</mark>';
    }
    return arr.join('');
}

  function findIndeces(text, subText) {
    let arr = [];
    const m = text.length;
    const n = subText.length;
    for(let i = 0; i < m; i++) {
      let num = text.substring(i, i+n).indexOf(subText);
      if(num != -1) arr.push([i + num, i + num + n-1]);
    }
    return arr;
  }

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
        <h3 ref={titleRef}></h3>
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