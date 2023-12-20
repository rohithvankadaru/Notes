import React, { useContext, useState } from 'react';
import { CiSquarePlus } from "react-icons/ci";
import TypingBoxModal from '../TypingBoxModal/TypingBoxModal';
import { TypingBoxContext } from '../../context/TypingBoxContext';
import Note from '../note/Note';

const AddNote = () => {

  const {isModalOpen, setIsModalOpen, showModal, handleOk, handleCancel} = useContext(TypingBoxContext);
  const[list, setList] = useState([]);
  const [text, setText] = useState('');

  return (
    <div className='addNote'>
        <span style={{cursor:'pointer'}}><CiSquarePlus style={{fontSize: '200px'}} onClick={showModal} /></span> 
        <Note text={'Sample Note'}/>
        {

        }


        <TypingBoxModal  text={text} setText={setText} />
    </div>
  )
}

export default AddNote;