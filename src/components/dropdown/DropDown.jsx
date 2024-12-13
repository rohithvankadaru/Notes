import React, { useEffect, useRef, useState } from 'react';
import './dropDown.css'
import { CiGrid2H } from 'react-icons/ci'
import { IoGridOutline } from "react-icons/io5";



const DropDown = ({ buttonsList }) => {

    const [dropDownVisible, setDropDownVisible] = useState(true);

    function burgerHover ()  {
        setDropDownVisible(!dropDownVisible);
    }

    return (
        <div className='dropDown' onMouseEnter={burgerHover} onMouseLeave={burgerHover}>
            <img className='burgerImg' src="https://cdn.icon-icons.com/icons2/3106/PNG/512/menu_burger_icon_191633.png" />


            <div className='dropDownList' 
            // style={{display: (dropDownVisible && 'flex') || 'none'}}
            >
                {
                    buttonsList.map(({ name, onClickFun }) => {
                        return <p className='listButton' onClick={onClickFun}>{name}</p>
                    })
                }
            </div>
        </div>

        //  <div
        //     onMouseEnter={() => setDropDownVisible(!dropDownVisible)} onMouseLeave={() => setDropDownVisible(!dropDownVisible)} className='dropDown'
        // >
        //     <img className='optionsBurger' style={{ width: '60px' }} src="https://cdn.icon-icons.com/icons2/3106/PNG/512/menu_burger_icon_191633.png" />
        //     <div className='dropDown-list' style={{ display: ((dropDownVisible && 'block') || 'none') }}>
        //         <div
        //             onClick={deteleAllNotes}
        //             className='deleteAll-btn dropDown-item'>
        //             <img src="https://cdn-icons-png.flaticon.com/512/8256/8256069.png" alt="" />
        //             <p>Delete All</p>
        //         </div>
        //         <div className='changeViewBtn dropDown-item' onClick={switchLayout}>
        //             {(isListView && <IoGridOutline className='view-layout-icon' />) || (<CiGrid2H className='view-layout-icon' />)}
        //             <p>view</p>
        //         </div>
        //     </div>
        // </div> 
    )
};

export default DropDown;