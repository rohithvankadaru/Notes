import React, { useState } from 'react';
import './dropDown.css'



const DropDown = ({ buttonsList }) => {

    const [dropDownVisible, setDropDownVisible] = useState(false);

    function burgerHover ()  {
        setDropDownVisible(!dropDownVisible);
    }

    return (
        <div className='dropDown' onMouseEnter={burgerHover} onMouseLeave={burgerHover}>
            <img className='burgerImg' src="https://cdn.icon-icons.com/icons2/3106/PNG/512/menu_burger_icon_191633.png" />


            <div className='dropDownList' 
            style={{display: (dropDownVisible && 'flex') || 'none'}}
            >
                {
                    buttonsList.map(({ name, onClickFun }) => {
                        return <p className='listButton' onClick={onClickFun}>{name}</p>
                    })
                }
            </div>
        </div>
    )
};

export default DropDown;