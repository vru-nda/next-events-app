import Head from 'next/head';

import EventContent from '@/components/event-detail/event-content';
import EventLogistics from '@/components/event-detail/event-logistics';
import EventSummary from '@/components/event-detail/event-summary';
import Comments from '@/components/input/comments';

import {getEventById, getFeaturedEvents} from '@/helpers/api-util';

const EventDetails = ({event}) => {
  if (!event) {
    return <div className='center'>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics event={event} />
      <EventContent>{event.description}</EventContent>
      <Comments eventId={event.id} />
    </>
  );
};

export async function getStaticProps(context) {
  const {
    params: {eventId},
  } = context;

  const event = await getEventById(eventId);

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({
    params: {eventId: event.id},
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export default EventDetails;
