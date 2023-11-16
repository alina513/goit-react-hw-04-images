import React from 'react';
import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImagesWithQuery } from './helpers/helpers';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import  toast, { Toaster } from 'react-hot-toast';
export const App = () => {
  
const [page, setPage] = useState(1);
const [query, setQuery] = useState('');
const [images, setImages] = useState([]);
const [loading, setLoading] = useState(false);


 const addPhoto = value => {
    setQuery(value);
    setPage(1);
    setImages([])
  };


  const onButton = () => {
    setPage(prevPage => 
      prevPage + 1,
    );
  };


  useEffect(() => {async function getPhoto() {
    if(query==="") {
      return
    }
    try {
      setLoading(true);
      
      const photos = await fetchImagesWithQuery(query, page);
      setImages(prevImages=>[...prevImages, ...photos])
    }
    catch (error) {
      toast.error('Please, try loading page again')
    }
    finally {
      setLoading(false);
    }

  } getPhoto()}, [page, query])
  
    return (
      <div
        style={{
          height: '100vh',
          display: 'block',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={addPhoto} />
        {loading && <Loader />}
        {images.length > 0 && (
          <ImageGallery images={images}/>
        )}
        {images.length > 11 && <Button onButton={onButton} />}
        <Toaster/>
      </div>
    );
  }

