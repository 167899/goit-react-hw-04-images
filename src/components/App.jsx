import axios from 'axios';
import styles from './App.module.css';

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
  const perPage = 12;

  useEffect(() => {
    if (query === '') {
      return;
    }
    fetch();
  }, [page, query]);

  const fetch = () => {
    const key = '27831105-5e5b5e1ddfe0fd39cdbde4893';
    const URL = `https://pixabay.com/api/`;
    const per_page = perPage;
    const page_param = page;
    const option = {
      params: {
        key: `${key}`,
        q: `${query}`,
        image_type: 'photo',
        orientation: 'horizontal',
        page: `${page_param}`,
        per_page: `${per_page}`,
      },
    };
    setLoading(true);
    axios.get(URL, option).then(newImages => {
      setImages([...images, ...newImages.data.hits]);
      setTotal(newImages.data.total);
      setLoading(false);
    });
  };

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
