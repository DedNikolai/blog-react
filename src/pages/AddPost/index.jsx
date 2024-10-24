import React, {useReducer, useRef, useState} from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import {imageUpload, imageRemove} from '../../api/post';
import usePosts from '../../api/queries/usePosts';
import {app} from '../../constants';

const initialState = {
  title: '',
  tags: [],
  text: '',
  imageUrl: null
};

const initState = (state) => {
  return {...state};
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_TITLE':
      return {...state, title: action.payload}
    case 'CHANGE_TAGS':
      return {...state, tags: action.payload.replace(/\s/g, '').split(',')}
    case 'CHANGE_TEXT':
      return {...state, text: action.payload}
    case 'CHANGE_IMAGE':
      return {...state, imageUrl: action.payload}
    case 'RESER_STATE':
      return {...initState}    
    default: 
      return {...state}      
  }
}


export const AddPost = () => {
  const [state, dispatch] = useReducer(reducer, initialState, initState)
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const {mutation} = usePosts({cb: setIsLoading});

  const handleChangeFile = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    imageUpload(formData).then(res => {
      dispatch({type: 'CHANGE_IMAGE', payload: res.url})
    })

  };

  const onClickRemoveImage = () => {
    if (state.imageUrl) {
      inputRef.current.value = ''
      imageRemove(state.imageUrl).then(res => {
        if (res.status === 200) {
            dispatch({type: 'CHANGE_IMAGE', payload: null})
        }
      })
    }
  };

  const onChange = React.useCallback((value) => {
    dispatch({type: 'CHANGE_TEXT', payload: value})
  }, []);

  const onSubmit = () => {
    setIsLoading(true)
    mutation.mutate(state);
  }

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (isLoading) return <h2>Loading...</h2>

  return (
    <Paper elevation={0} style={{ padding: 30 }}>
      <Button onClick={() => inputRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputRef} type="file" onChange={handleChangeFile} hidden />
      {state.imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {state.imageUrl && (
        <img className={styles.image} src={app.SERVER_URL + state.imageUrl} alt="Uploaded" />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        value={state.title}
        onChange={(e) => dispatch({type: 'CHANGE_TITLE', payload: e.target.value})}
      />
      <TextField 
        classes={{ root: styles.tags }} 
        variant="standard" 
        placeholder="Тэги" 
        fullWidth
        value={state.tags}
        onChange={(e) => dispatch({type: 'CHANGE_TAGS', payload: e.target.value})} 
      />
      <SimpleMDE 
        className={styles.editor} 
        value={state.text} 
        onChange={onChange} 
        options={options} 
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          Опубликовать
        </Button>
        <a href="/">
          <Button onClick={() => initState(initState)} size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
