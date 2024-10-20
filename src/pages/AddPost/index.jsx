import React, {useReducer, useRef} from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

const initialState = {
  title: '',
  tags: '',
  text: ''
};

const initState = (state) => {
  return {...state};
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_TITLE':
      return {...state, title: action.payload}
    case 'CHANGE_TAGS':
      return {...state, tags: action.payload}
    case 'CHANGE_TEXT':
      return {...state, text: action.payload}
    default: 
      return {...state}      
  }
}


export const AddPost = () => {
  const imageUrl = '';
  const [state, dispatch] = useReducer(reducer, initialState, initState)
  const inputRef = useRef(null);

  const handleChangeFile = async (e) => {
    console.log(e.target.files[0])
  };

  const onClickRemoveImage = () => {};

  const onChange = React.useCallback((value) => {
    dispatch({type: 'CHANGE_TEXT', payload: value})
  }, []);

  const onSubmit = () => {
    console.log(state)
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

  return (
    <Paper elevation={0} style={{ padding: 30 }}>
      <Button onClick={() => inputRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
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
