import React, { useEffect, useRef, useState } from 'react';
import note_icon from '../images/note-icon.png';
import TypingBoxModal from '../TypingBoxModal/TypingBoxModal';
import Note from '../note/Note';
import './home.css'
import NavBar from '../navbar/NavBar';
import EditModal from '../editModal/EditModal';
import { PiLightbulbThin } from "react-icons/pi";
import { Modal } from 'antd';
import { BsExclamationSquareFill } from 'react-icons/bs';
import { toast } from 'sonner';

let localList = JSON.parse(localStorage.getItem('noteList'));
let lastNoteId = (localList && localList.length > 0) ?  localList[localList.length - 1][2] : '';
const Home = () => {

  const [list, setList] = useState(JSON.parse(localStorage.getItem('noteList')) || []);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filteredList, setFilteredList] = useState(list);
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
  const [isListView, setIsListView] = useState((localStorage.getItem('view-layout') === 'list') && true);

  const noteContainerRef = useRef(null);
  const bulbIconRef = useRef(null);

  useEffect(() => {
    if (isListView) {
      noteContainerRef.current.className = 'note-container list-view';
    }
  }, [])

  useEffect(() => {
    setFilteredList([...list].reverse());
    if (list.length > 0) bulbIconRef.current.style.display = 'none'
    else bulbIconRef.current.style.display = 'block'
  }, [list]);
  useEffect(() => {
    if (!(list.length == 0)) {
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



  const [sequenceNumber, setSequenceNumber] = useState(lastNoteId ? lastNoteId + 1 : 1);

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

    const tempList = JSON.parse(localStorage.getItem('noteList')) || [];
    const newNote = [title, text, sequenceNumber, 'transparent'];
    tempList.push(newNote);
    setSequenceNumber(sequenceNumber + 1);
    localStorage.setItem('noteList', JSON.stringify(tempList));
    setText('');
    setTitle('');
    setList(tempList);
    toast.success('note sticked🩹🩹', {duration: '1500'});

    if (!(tempList[tempList.length - 1][1] || tempList[tempList.length - 1][0])) {
      const tempList1 = JSON.parse(localStorage.getItem('noteList')) || [];
      tempList1.pop();
      localStorage.setItem('noteList', JSON.stringify(tempList1));
      setTimeout(() => {
        // setSequenceNumber(sequenceNumber - 1);
        toast.warning('Empty note discarded!!', {duration: 1500});
        setList(tempList1);
      }, 800)
    }
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
    setTitle(list[listIndex][0])
  }

  function saveEdit() {
    let tempArr = [...list];
    tempArr[arrayIndex] = [title, text, list[arrayIndex][2], list[arrayIndex][3]];
    setText('');
    setTitle('');
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
        setList(tempArr);
        localStorage.setItem('noteList', JSON.stringify(tempArr));
        break;
      }
    }
    toast.warning('note deleted!!', {duration: '1500'});
  }

  function deteleAllNotes() {
    setIsDeleteAllModalOpen(true);
  }

  function deleteAllFn() { //executes for clicking 'OK' on delete all modal
    localStorage.removeItem('noteList');
    setList([]);
    setIsDeleteAllModalOpen(false);
  }

  function switchLayout() {
    if (isListView) {
      setIsListView(false);
      localStorage.setItem('view-layout', 'grid');
      noteContainerRef.current.className = 'note-container'
    }
    else {
      setIsListView(true);
      localStorage.setItem('view-layout', 'list');
      noteContainerRef.current.className = 'note-container list-view'
    }
  }


  return (
    <>
      <NavBar
        switchLayout={switchLayout}
        isListView={isListView}
        searchText={searchText}
        setSearchText={setSearchText}
        deteleAllNotes={deteleAllNotes} />
        <br />
      <div className='home'>
        <div style={{ cursor: 'pointer', position: 'fixed', right: '50px', bottom: '50px'}} className='add-note d-flex flex-col align-center justify-center'><img src='https://cdn3.iconfinder.com/data/icons/documents-and-files-2/512/Add_Notes-512.png' style={{ width: '70px' }} onClick={showModal} /><span style={{ fontSize: '12px' }}>Add Note</span></div>
        <span className='bulb-icon-wrapper' ref={bulbIconRef}>
          <PiLightbulbThin className='bulb-icon' />
          <div className='hero-text'> 😊Make your first Note !!</div>
        </span>
        <div className='note-container' ref={noteContainerRef}>
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
                  editColor={editColor}
                  highlightText={searchText} />
              ))
            )
          }
        </div>
        <TypingBoxModal
          text={text}
          setText={setText}
          title={title}
          setTitle={setTitle}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          showModal={showModal}
          handleCancel={handleCancel}
        />
        <EditModal isEditTabOpen={isEditTabOpen} saveEdit={saveEdit} setText={setText} text={text} title={title} setTitle={setTitle} />

        <Modal maskClosable={false} open={isDeleteAllModalOpen} onOk={deleteAllFn} onCancel={() => setIsDeleteAllModalOpen(false)} okType='danger'>
          <label style={{ fontSize: '1.1rem', fontWeight: '600' }}><BsExclamationSquareFill className='exclamation-icon' />This will delete all Notes</label>
        </Modal>
      </div>
    </>
  )
}

export default Home;