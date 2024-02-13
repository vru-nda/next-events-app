import {getAllEvents, getFilteredEvents} from '../../dummy-data';

import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';
import {useRouter} from 'next/router';

const Events = () => {
  const router = useRouter();
  const events = getAllEvents();

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

export default Events;
