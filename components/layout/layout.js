import {useContext} from 'react';

import Notification from '@/components/ui/notification';
import NotificationContext from '@/context/notificationContext';
import MainHeader from './main-header';

const Layout = (props) => {
  const notificationContext = useContext(NotificationContext);
  const activeNotification = notificationContext.notification;

  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
};

export default Layout;
