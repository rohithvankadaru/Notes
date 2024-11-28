import React, { useRef, useState } from 'react'
import './navbar.css'
import { CiGrid2H, CiSearch } from 'react-icons/ci'
import { IoGridOutline } from "react-icons/io5";
import DropDown from '../dropdown/DropDown';

const NavBar = ({ searchText, setSearchText, deteleAllNotes, isListView, switchLayout }) => {
    const searchBarRef = useRef(null);
    
    return (
        <div className='nav-bar-wrapper'>
            <div className='d-flex flex-row nav-bar'>
                <div className='d-flex icon'>
                    <img className="gb_Hc gb_Hd" src="https://cdn-icons-png.freepik.com/256/13454/13454799.png?semt=ais_hybrid"
                        alt="" aria-hidden="true" role="presentation"></img>
                    <h1 style={{ fontFamily: "Arial", fontSize: '1.85rem' }}>Sticky Note</h1>
                </div>
                <div className='d-flex search-wrapper'>
                    <CiSearch className='searchIcon' onClick={() => searchBarRef.current.focus()} />
                    <input ref={searchBarRef} placeholder='search...' value={searchText} onChange={e => setSearchText(e.target.value)} />
                </div>

                <DropDown deteleAllNotes={deteleAllNotes} isListView={isListView} switchLayout={switchLayout}/>
            </div>
            <hr />
        </div>
    )
}

export default NavBar