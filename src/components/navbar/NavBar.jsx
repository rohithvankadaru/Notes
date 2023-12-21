import React from 'react'
import './navbar.css'
import { CiSearch } from 'react-icons/ci'

const NavBar = () => {
    return (
        <div className='d-flex flex-row nav-bar' >
            <div className='d-flex icon'>
                <img className="gb_Hc gb_Hd" src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
                    alt="" aria-hidden="true" role="presentation" style={{ width: '40px', height: '40px' }}></img>
                <h1>Keep</h1>
            </div>
            <div className='d-flex search'>
                <CiSearch className='searchIcon' />
                <input placeholder='search with title...' />
            </div>
        </div>
    )
}

export default NavBar