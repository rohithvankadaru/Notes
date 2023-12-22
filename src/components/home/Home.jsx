import React, { useEffect, useRef, useState } from 'react';
import { CiSquarePlus } from "react-icons/ci";
import TypingBoxModal from '../TypingBoxModal/TypingBoxModal';
import Note from '../note/Note';
import './home.css'
import NavBar from '../navbar/NavBar';
import EditModal from '../editModal/EditModal';
import { PiLightbulbThin } from "react-icons/pi";

const Home = () => {

  const [list, setList] = useState(JSON.parse(localStorage.getItem('noteList')) || [[]]);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filteredList, setFilteredList] = useState(list);
  const [noteIdBg, setNoteIdBg] = useState([0, 'transparent']);

  const bulbIconRef = useRef(null);

  useEffect(() => {
    setFilteredList(list);
    if (list[0].length > 0) bulbIconRef.current.style.display = 'none'
    else bulbIconRef.current.style.display = 'block'
  }, [list]);
  useEffect(() => {
    if (!(list.length == 1 && list[0].length == 0)) {
      let arr = list.filter(ele => ((ele[0].toLocaleLowerCase()).includes(searchText.toLocaleLowerCase())));
      setFilteredList(arr);
    }
  }, [searchText]);


  ////////////////////////////////////////////////////////////////////
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
    tempArr[arrayIndex] = [list[arrayIndex][0], text, list[arrayIndex][2], list[arrayIndex][3]];
    setText('');
    setList(tempArr);
    setIsEditTabOpen(false);
    localStorage.setItem('noteList', JSON.stringify(tempArr));
  }

  
  useEffect(() => {
    if (!(list.length == 1 && list[0].length == 0)) {
      const tempArr = JSON.parse(localStorage.getItem('noteList'))
      let listIndex;
      for (let i = 0; i < list.length; i++) {
        if (list[i][2] == noteIdBg[0]) {
          listIndex = i;
          break;
        }
      }
      const currNote = tempArr[listIndex];
      currNote[3] = noteIdBg[1];
      tempArr[listIndex] = currNote;
      localStorage.setItem('noteList', JSON.stringify(tempArr))
      setList(tempArr);
    }
  }, [noteIdBg])

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
    tempList.push([title, text, sequenceNumber, 'transparent']);
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
    tempArr[arrayIndex] = [list[arrayIndex][0], text, list[arrayIndex][2], list[arrayIndex][3]];
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
        <span style={{ cursor: 'pointer' }}><CiSquarePlus className='plus-icon' style={{ fontSize: '200px' }} onClick={showModal} /></span>
        <span className='bulb-icon-wrapper' ref={bulbIconRef}><PiLightbulbThin className='bulb-icon' /></span>
        {
          (list.length == 1 && list[0].length == 0) ||
          (
            filteredList.map((e) => (
              <Note title={e[0]}
                text={e[1]}
                index={e[2]}
                editText={editTextfun}
                deleteFun={deleteFun}
                setNoteIdBg={setNoteIdBg}
                bgColor={e[3]} />
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