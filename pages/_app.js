import Head from 'next/head';
import Layout from '../components/layout/layout';
import '../styles/globals.css';

function MyApp({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>Next Events</title>
        <meta name='description' content='NextJS events' />
        <meta name='viewport' content='inital-scale=1.0,width=device-width' />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
