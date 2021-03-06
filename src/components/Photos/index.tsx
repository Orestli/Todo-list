import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getPhotos } from '../../redux/reducers/photosReducer';
import { photosInput } from '../../utils/validations';
import clsx from 'clsx';
import SearchIcon from '../../media/icons/search-icon.svg';

import s from './Photos.module.scss';

const PhotosPage: React.FC = () => {
  const [lastId, setLastId] = useState<number | null>(null);
  const { photos } = useAppSelector((state) => state.photos);
  const dispatch = useAppDispatch();

  const onSubmit = (id: number) => {
    dispatch(getPhotos(id));
    setLastId(id);
  };

  return (
    <div>
      <Formik
        initialValues={{ id: 1 }}
        onSubmit={({ id }) => onSubmit(id)}
        validationSchema={photosInput}
        enableReinitialize
      >
        {({ errors, values }) => (
          <Form className={s.search_container}>
            <h1 className={s.title}>Specify album id from 1 to 100</h1>
            {errors.id && <p className={s.error_message}>{errors.id}</p>}
            <div className={clsx(s.input_container)}>
              <Field
                type="number"
                name="id"
                placeholder="1..."
                className={clsx('text', s.search_input)}
              />
              <button
                type="submit"
                className={s.search_button}
                disabled={values.id === lastId || !!errors.id}
              >
                <img src={SearchIcon} alt="Search Icon" />
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {Object.keys(photos).length !== 0 && (
        <div className={s.grid}>
          {photos.map((photo) => (
            <img
              key={photo.id}
              className={s.img_grid}
              src={photo.thumbnailUrl}
              alt="Album img"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotosPage;
