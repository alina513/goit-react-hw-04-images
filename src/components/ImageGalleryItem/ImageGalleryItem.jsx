import { Modal } from "components/Modal/Modal"
import css from "./ImageGallertItem.module.css"
import React from "react";
import { useState } from "react";


export const ImageGalleryItem = ({image})=>{
    
    const [isModalOpen, setIsModalOpen] = useState(false)

   const openModal = () => {
       setIsModalOpen(true);
      }
    
     const closeModal = (event) => {
        if(event.currentTarget === event.target)
        {setIsModalOpen(false)}
        return
      }
  
    return (
        <li className={css.item}>
  <img src={image.webformatURL} alt={image.tags} className={css.image} onClick={openModal}/>
  {isModalOpen && (<Modal image={image.largeImageURL} closeModal={closeModal}/>)}
</li>
    )}
