import React, { useEffect, useRef, useState } from 'react';
import { CiSquarePlus } from "react-icons/ci";
import TypingBoxModal from '../TypingBoxModal/TypingBoxModal';
import Note from '../note/Note';
import './home.css'
import NavBar from '../navbar/NavBar';
import EditModal from '../editModal/EditModal';
import { PiLightbulbThin } from "react-icons/pi";
import { Modal } from 'antd';
import { BsExclamationSquareFill } from 'react-icons/bs';

let localList = JSON.parse(localStorage.getItem('noteList')) || [[]];
let lastNoteId = localList[localList.length - 1][2];
const Home = () => {

  const [list, setList] = useState(JSON.parse(localStorage.getItem('noteList')) || [[]]);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filteredList, setFilteredList] = useState(list);
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false)


  const bulbIconRef = useRef(null);

  useEffect(() => {
    setFilteredList([...list].reverse());
    if (list[0].length > 0) bulbIconRef.current.style.display = 'none'
    else bulbIconRef.current.style.display = 'block'
  }, [list]);
  useEffect(() => {
    if (!(list.length == 1 && list[0].length == 0)) {
      let arr = list.filter(ele => {
        return (
          (ele[0].toLocaleLowerCase()).includes(searchText.toLocaleLowerCase())
          ||
          (ele[1].toLocaleLowerCase()).includes(searchText.toLocaleLowerCase())
        )
      });
      setFilteredList(arr.reverse());
    }
  }, [searchText]);

  const [isEditTabOpen, setIsEditTabOpen] = useState(false);



  const [sequenceNumber, setSequenceNumber] = useState(lastNoteId ? lastNoteId + 1 : 0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  function showModal() {
    setIsModalOpen(true);
  };
  function handleOk() {
    saveText();
    setIsModalOpen(false);
  };
  function handleCancel() {
    saveText();
    setIsModalOpen(false);
  };

  function saveText() {
    if (!(text || title)) {
      alert('Empty note cannot be recorded');
      return;
    }

    const tempList = JSON.parse(localStorage.getItem('noteList')) || [];
    tempList.push([title, text, sequenceNumber, 'transparent']);
    setSequenceNumber(sequenceNumber + 1);
    localStorage.setItem('noteList', JSON.stringify(tempList));
    setText('');
    setTitle('');
    setList(tempList);
  }

  const [arrayIndex, setArrayIndex] = useState(0);

  function editTextfun(tagRef) {
    setIsEditTabOpen(true);
    let fileId = tagRef.current.getAttribute('index');
    let listIndex;

    for (let i = 0; i < list.length; i++) {
      if (list[i][2] == fileId) {
        listIndex = i;
        setArrayIndex(i);
        break;
      }
    }

    setText(list[listIndex][1]);
  }

  function saveEdit() {
    let tempArr = [...list];
    tempArr[arrayIndex] = [list[arrayIndex][0], text, list[arrayIndex][2], list[arrayIndex][3]];
    setText('');
    setList(tempArr);
    setIsEditTabOpen(false);
    localStorage.setItem('noteList', JSON.stringify(tempArr));
  }

  function editColor(noteId, bgColor) {
    const tempArr = JSON.parse(localStorage.getItem('noteList'))
    let listIndex;
    for (let i = 0; i < list.length; i++) {
      if (list[i][2] == noteId) {
        listIndex = i;
        break;
      }
    }
    const currNote = tempArr[listIndex];
    currNote[3] = bgColor;
    tempArr[listIndex] = currNote;
    localStorage.setItem('noteList', JSON.stringify(tempArr))
    setList(tempArr);
  };

  function deleteFun(deleteSpanRef) {
    let fileId = deleteSpanRef.current.getAttribute('index');
    let tempArr = [...list];

    for (let i = 0; i < list.length; i++) {
      if (list[i][2] == fileId) {
        tempArr.splice(i, 1);
        setList(tempArr.length == 0 ? [[]] : tempArr);
        localStorage.setItem('noteList', JSON.stringify(tempArr.length == 0 ? '' : tempArr));
        break;
      }
    }
  }

  function deteleAllNotes() {
    setIsDeleteAllModalOpen(true);
  }

  function deleteAllFn() { //executes for clicking 'OK' on delete all modal
    localStorage.clear();
    setList([[]]);
    setIsDeleteAllModalOpen(false);
  }


  return (
    <>
      <NavBar
        searchText={searchText}
        setSearchText={setSearchText}
        deteleAllNotes={deteleAllNotes} />
      <hr />
      <div className='home'>
        <span style={{ cursor: 'pointer' }}><CiSquarePlus className='plus-icon' style={{ fontSize: '200px' }} onClick={showModal} /></span>
        <span className='bulb-icon-wrapper' ref={bulbIconRef}>
          <PiLightbulbThin className='bulb-icon' />
          <div className='hero-text'> 😊Make your first Note !!</div>
        </span>
        {
          (list.length == 1 && list[0].length == 0) ||
          (
            filteredList.map((e) => (
              <Note title={e[0]}
                text={e[1]}
                index={e[2]}
                editText={editTextfun}
                deleteFun={deleteFun}
                bgColor={e[3]}
                editColor={editColor} />
            ))
          )
        }

        <TypingBoxModal
          text={text}
          setText={setText}
          title={title}
          setTitle={setTitle}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          showModal={showModal}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
        <EditModal isEditTabOpen={isEditTabOpen} saveEdit={saveEdit} setText={setText} text={text} />

        <Modal open={isDeleteAllModalOpen} onOk={deleteAllFn} onCancel={() => setIsDeleteAllModalOpen(false)} okType='danger'>
          <label style={{ fontSize: '1.1rem', fontWeight: '600' }}><BsExclamationSquareFill className='exclamation-icon' />This will delete all Notes</label>
        </Modal>
      </div>
    </>
  )
}

export default Home;