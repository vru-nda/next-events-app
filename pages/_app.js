import Head from 'next/head';

import Layout from '@/components/layout/layout';
import {NotificationContextProvider} from '@/context/notificationContext';
import '../styles/globals.css';

function MyApp({Component, pageProps}) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta name='description' content='NextJS events' />
          <meta name='viewport' content='inital-scale=1.0,width=device-width' />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
