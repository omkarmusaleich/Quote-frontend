import { useRef,useState } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import { Prompt } from 'react-router-dom';
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();
  const [isPageChange,setIsPageChange]=useState(false)

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;
    if(enteredText.trim().length===0)
    {
      return;
    }
    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }
  const btnClickHandler=()=>{
    setIsPageChange(false);
  }
  const formFocusHandler=()=>{
    setIsPageChange(true);
  }

  return (
    <Fragment>
      <Prompt when={isPageChange} message={(location)=>'Do you Want to leave Page?add data from the form lost'}/>
      <Card>
        <form className={classes.form} onFocus={formFocusHandler} onSubmit={submitFormHandler}>
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor='author'>Author</label>
            <input type='text' id='author' ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='text'>Text</label>
            <textarea id='text' rows='5' ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button className='btn' onClick={btnClickHandler}>Add Quote</button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
