import React, { useState } from 'react'
import './navbar.css'
import { CiGrid2H, CiSearch } from 'react-icons/ci'
import { IoGridOutline } from "react-icons/io5";
import { Tooltip } from 'antd';

const NavBar = ({ searchText, setSearchText, deteleAllNotes, isListView, switchLayout }) => {
    return (
        <div className='d-flex flex-row nav-bar' >
            <div className='d-flex icon'>
                <img className="gb_Hc gb_Hd" src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
                    alt="" aria-hidden="true" role="presentation" style={{ width: '40px', height: '40px' }}></img>
                <h1>Keep</h1>
            </div>
            <div className='d-flex search-wrapper'>
                <CiSearch className='searchIcon' />
                <input placeholder='search...' value={searchText} onChange={e => setSearchText(e.target.value)} />
            </div>
            {(isListView && <Tooltip title='Grid view' color='orange'><IoGridOutline onClick={switchLayout} className='view-layout-icon' /></Tooltip>) || (<Tooltip title='List view' color='orange'><CiGrid2H onClick={switchLayout} className='view-layout-icon' /></Tooltip>)}
            <button onClick={deteleAllNotes} className='clear-btn' style={{ backgroundColor: 'white', boxShadow: '0 0 3px', outline: 'none' }}>Delete All</button>
        </div>
    )
}

export default NavBar