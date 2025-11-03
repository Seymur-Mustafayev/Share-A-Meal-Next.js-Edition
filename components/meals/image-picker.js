'use client'

import { useRef, useState } from 'react';
import clases from './image-picker.module.css'
import Image from 'next/image';
export default function ImagePicker({ label, name }) {
const[previewImg,setPreviewImg]=useState()
const imageRef=useRef()


function handleClick(){
imageRef.current.click()
}

function handleChange(event){
    const file=event.target.files[0]
    const fileReader=new FileReader()
    if(!file){
        setPreviewImg(null)
    }
    fileReader.onload=()=>{
      setPreviewImg(fileReader.result)
    }
     fileReader.readAsDataURL(file)
    
}

    return (
        <>
            <div className={clases.picker}>
                <label htmlFor={name}>{label}</label>
                <div className={clases.controls}>
                <div className={clases.preview}>
                        {!previewImg && <p>Choose Image.</p>}
                        {previewImg && (
                            <Image fill src={previewImg} alt="Choseen Image" />
                        )}
                    </div>
                    <input ref={imageRef} className={clases.input} id={name} accept='image/png, image/jpeg' type="file" name={name} onChange={handleChange} />
                    <button className={clases.button} onClick={handleClick} type='button'>Add Image </button>
                </div>
               
            </div>


        </>


    )
}
