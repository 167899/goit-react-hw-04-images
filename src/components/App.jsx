import styles from './App.module.css';
import { fetch } from '../services/api';

import { ThreeDots } from 'react-loader-spinner';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [name, setName] = useState('');
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setLoading(true);
    fetch(page, query).then(newImages => {
      setImages(prevItems => [...prevItems, ...newImages.data.hits]);
      setTotal(newImages.data.total);
      setLoading(false);
    });
  }, [page, query]);

  const hendleChange = e => {
    const { value } = e.currentTarget;
    setName(value);
  };

  const hendleSubmit = e => {
    e.preventDefault();

    if (query !== name && name !== '') {
      setQuery(name);
      setImages([]);
      setPage(1);
    }
  };

  const hendleLoade = e => {
    setPage(page + 1);
  };

  const onClickModal = () => {
    setShowModal(!showModal);
  };

  const toggleModal = e => {
    onClickModal();
    const ID = e.currentTarget.id;
    const img = images.find(e => e.id === Number(ID));

    setLargeImageURL(img.largeImageURL);
  };

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={hendleSubmit} name={name} onChange={hendleChange} />

      {images.length !== 0 && (
        <>
          <ImageGallery images={images} toggleModal={toggleModal} />
          {loading ? (
            <ThreeDots
              height="80"
              s
              width="80"
              radius="9"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              wrapperStyle={{
                display: 'flex',
                justifyContent: 'center',
              }}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            images.length < total && <Button onClick={hendleLoade} />
          )}
        </>
      )}
      {showModal && (
        <Modal onClick={onClickModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
    </div>
  );
};
