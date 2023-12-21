import React, { useEffect, useState } from 'react';
import { CiSquarePlus } from "react-icons/ci";
import TypingBoxModal from '../TypingBoxModal/TypingBoxModal';
import Note from '../note/Note';
import './home.css'
import NavBar from '../navbar/NavBar';
import EditModal from '../EditModal';

const Home = () => {

  const [list, setList] = useState(JSON.parse(localStorage.getItem('noteList')) || [[]]);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filteredList, setFilteredList] = useState(list);
  useEffect(() => {
    setFilteredList(list);
  }, [list]);
  useEffect(() => {
    if (!(list.length == 1 && list[0].length == 0)) {
      let arr = list.filter(ele => ele[0].includes(searchText));
      setFilteredList(arr);
    }
  }, [searchText]);

  const [isEditTabOpen, setIsEditTabOpen] = useState(false);

  let lastNoteIdx = list[list.length - 1][2];

  const [sequenceNumber, setSequenceNumber] = useState(lastNoteIdx ? lastNoteIdx + 1 : 0);

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
    tempList.push([title, text, sequenceNumber]);
    setSequenceNumber(sequenceNumber + 1);
    localStorage.setItem('noteList', JSON.stringify(tempList));
    setText('');
    setTitle('');
    setList(tempList);
  }

  const [arrayIndex, setArrayIndex] = useState(0);

  function editTextfun(tagRef, textRef) {
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
    tempArr[arrayIndex] = [list[arrayIndex][0], text, list[arrayIndex][2]];
    setText('');
    setList(tempArr);
    setIsEditTabOpen(false);
    localStorage.setItem('noteList', JSON.stringify(tempArr));
  }

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


  return (
    <>
      <NavBar searchText={searchText} setSearchText={setSearchText} />
      <hr />
      <div className='home'>
        <span style={{ cursor: 'pointer' }}><CiSquarePlus style={{ fontSize: '200px' }} onClick={showModal} /></span>
        {
          (list.length == 1 && list[0].length == 0) ||
          (
            filteredList.map((e) => (
              <Note title={e[0]} text={e[1]} index={e[2]} editText={editTextfun} deleteFun={deleteFun} />
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
      </div>
    </>
  )
}

export default Home;