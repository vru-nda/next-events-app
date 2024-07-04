import Head from 'next/head';
import EventList from '@/components/events/event-list.js';
import {getFeaturedEvents} from '@/helpers/api-util.js';

const HomePage = ({featuredEvents}) => {
  return (
    <div>
      <Head>
        <title>NextJS events</title>
        <meta
          name='description'
          content='Find a lot of events that allows you to evolve...'
        />
      </Head>
      <EventList events={featuredEvents} />
    </div>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
