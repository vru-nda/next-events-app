import {useRouter} from 'next/router';
import {getEventById} from '../../dummy-data';

import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

const EventDetails = () => {
  const router = useRouter();
  const event = getEventById(router.query?.eventId);

  if (!event) {
    return <p>No event found.</p>;
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics event={event} />
      <EventContent>{event.description}</EventContent>
    </>
  );
};

export default EventDetails;
