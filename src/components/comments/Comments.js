import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';



const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { sendRequest, status, data: lodedComment } = useHttp(getAllComments)
  const params = useParams()
  const { quoteid } = params;
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  

  useEffect(() => {
    sendRequest(quoteid)
  }, [sendRequest, quoteid])

  const addCommentHandler = useCallback(() => {
    setIsAddingComment(false);
    sendRequest(quoteid)

  }, [sendRequest,quoteid])


  let comment;
  if (status === 'pending') {
    comment = <div className='centered'><LoadingSpinner/></div>
  }
  if (status === 'completed' && (!lodedComment || lodedComment.length === 0)) {
    comment = <p className='centered'>NO Comment Added Yet!</p>
  }
  if(status==='completed' && (lodedComment && lodedComment.length>0))
  {
    comment=<CommentsList comments={lodedComment}/>
  }



  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm id={quoteid} onAddComment={addCommentHandler} />}
      {comment}
    </section>
  );
};

export default Comments;
