import React, { createRef, useRef } from 'react';
import { FaCircle } from "react-icons/fa";
import './colorPallet.css'
import { IoColorPaletteOutline } from 'react-icons/io5';
import { TbDropletOff } from "react-icons/tb";

const ColorPallet = ({ noteColor, index }) => {

    const spanRefs = items.map(() => useRef(null));
    const noColorIconRef = useRef(null);

    const items = [
        {
            label: (
                <FaCircle fill='#faafa8' className='color-icon' />
            )
        },
        {
            label: (
                <FaCircle fill='#f39f76' className='color-icon' />
            )
        },
        {
            label: (
                <FaCircle fill='#fff8b8' className='color-icon' />
            )
        },
        {
            label: (
                <FaCircle fill='#d3bfdb' className='color-icon' />
            )
        },
        {
            label: (
                <FaCircle fill='#efeff1' className='color-icon' />
            )
        },
        {
            label: (
                <FaCircle fill='#e2f6d3' className='color-icon' />
            )
        },
    ];

    return (
        <div className='color-pallet'>
            <IoColorPaletteOutline className='color-pallet-icon' />
            <div className='colors-box'>
                <span ref={noColorIconRef} onClick={e => noteColor(noColorIconRef)} noteBg='transparent' index={index}>
                    <TbDropletOff className='color-icon' />
                </span>
                {
                    items.map((ele, idx) =>
                        <span key={idx} ref={spanRefs[idx]} onClick={e => noteColor(spanRefs[idx])} noteBg={ele.label.props.fill} index={index}>
                            {ele.label}
                        </span>
                    )
                }
            </div>
        </div>
    )
};
export default ColorPallet;