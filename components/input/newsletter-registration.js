import {useContext, useRef} from 'react';

import NotificationContext from '@/context/notificationContext';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const inputRef = useRef();
  const notificationContext = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    notificationContext.showNotification({
      title: 'Signing up',
      message: 'Registering for newsletter',
      status: 'pending',
    });

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({email: inputRef.current.value}),
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
          title: 'Signed up',
          message: 'Registered for newsletter successfully',
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
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={inputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
