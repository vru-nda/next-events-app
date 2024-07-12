import {useContext, useEffect, useState} from 'react';

import CommentList from '@/components/input/comment-list';
import NewComment from '@/components/input/new-comment';
import NotificationContext from '@/context/notificationContext';
import classes from './comments.module.css';

function Comments(props) {
  const notificationContext = useContext(NotificationContext);

  const {eventId} = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showComments) {
      setLoading(true);
      fetch(`/api/comments/${eventId}`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data.comments);
          setLoading(false);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationContext.showNotification({
      title: 'Sending comment',
      message: 'Your comment is being processed',
      status: 'pending',
    });

    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return res.json().then((data) => {
          throw new Error(data.message || 'Something went wrong');
        });
      })
      .then((data) => {
        notificationContext.showNotification({
          title: 'Success',
          message: 'Your comment was saved.',
          status: 'success',
        });
      })
      .catch((err) => {
        notificationContext.showNotification({
          title: 'Error',
          message: err.message || 'Something went wrong!',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !loading && (
        <>
          {comments && comments.length > 0 ? (
            <CommentList items={comments} />
          ) : (
            <h4>No Comments</h4>
          )}
        </>
      )}
      {showComments && loading && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
