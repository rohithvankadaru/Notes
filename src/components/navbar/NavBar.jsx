import React, { useRef, useState } from 'react'
import './navbar.css'
import { CiGrid2H, CiSearch } from 'react-icons/ci'
import { IoGridOutline } from "react-icons/io5";
import { Tooltip } from 'antd';

const NavBar = ({ searchText, setSearchText, deteleAllNotes, isListView, switchLayout }) => {
    const searchBarRef = useRef(null);
    return (
        <div className='nav-bar-wrapper'>
            <div className='d-flex flex-row nav-bar'>
                <div className='d-flex icon'>
                    <img className="gb_Hc gb_Hd" src="https://cdn-icons-png.freepik.com/256/13454/13454799.png?semt=ais_hybrid"
                    alt="" aria-hidden="true" role="presentation"></img>
                    <h1 style={{fontFamily: "Arial", fontSize: '1.85rem'}}>Sticky Note</h1>
                </div>
                <div className='d-flex search-wrapper'>
                    <CiSearch className='searchIcon' onClick={() => searchBarRef.current.focus()} />
                    <input ref={searchBarRef} placeholder='search...' value={searchText} onChange={e => setSearchText(e.target.value)} />
                </div>
                {(isListView && <Tooltip title='Grid view' color='orange'><IoGridOutline onClick={switchLayout} className='view-layout-icon' /></Tooltip>) || (<Tooltip title='List view' color='orange'><CiGrid2H onClick={switchLayout} className='view-layout-icon' /></Tooltip>)}
                <button onClick={deteleAllNotes} className='clear-btn' style={{ backgroundColor: 'white', boxShadow: '0 0 3px', outline: 'none' }}>Delete All</button>
            </div>
            <hr/> 
        </div> 
    )
}

export default NavBar