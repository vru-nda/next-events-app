import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';
import {useRouter} from 'next/router';
import {getAllEvents} from '../../helpers/api-util';

const Events = ({events}) => {
  const router = useRouter();

  const findEventHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <EventSearch onSearch={findEventHandler} />
      <EventList events={events} />
    </>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}

export default Events;
