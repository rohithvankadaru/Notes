import React, { useRef, useState } from 'react'
import './navbar.css'
import { CiGrid2H, CiSearch } from 'react-icons/ci'
import { IoGridOutline } from "react-icons/io5";
import { Tooltip } from 'antd';

const NavBar = ({ searchText, setSearchText, deteleAllNotes, isListView, switchLayout }) => {
    const searchBarRef = useRef(null);

    const [dropDownVisible, setDropDownVisible] = useState(false);
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
                <div
                 onMouseEnter={() => setDropDownVisible(!dropDownVisible)} onMouseLeave={() => setDropDownVisible(!dropDownVisible)}
                 >
                <img className='optionsBurger' style={{ width: '60px' }} src="https://cdn.icon-icons.com/icons2/3106/PNG/512/menu_burger_icon_191633.png" alt="" />
                <div className='dropDown' style={{display: ((dropDownVisible && 'flex') || 'none')}}>
                    <button
                        onClick={deteleAllNotes}
                        className='clear-btn'>
                            <img src="https://cdn-icons-png.flaticon.com/512/8256/8256069.png" alt=""  style={{width: '30px'}}/>
                        Delete All</button>
                        <div className='changeViewBtn' onClick={switchLayout}> {(isListView && <Tooltip title='Grid view' color='orange'><IoGridOutline  className='view-layout-icon' /></Tooltip>) || (<Tooltip title='List view' color='orange'><CiGrid2H className='view-layout-icon' /></Tooltip>)}
                        view</div>
                </div>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default NavBar