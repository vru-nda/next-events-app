import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import useSWR from 'swr';

import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

const FilteredEvent = () => {
  const router = useRouter();
  const filters = router.query.slug;

  const [events, setEvents] = useState([]);

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const {data, error} = useSWR(
    'https://next-demo-1f261-default-rtdb.firebaseio.com/events.json',
    fetcher
  );

  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setEvents(events);
    }
  }, [data]);

  if (!filters || !events) {
    return <ErrorAlert className='center'>Loading...</ErrorAlert>;
  }

  const year = +filters[0];
  const month = +filters[1];

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12 ||
    error
  ) {
    return (
      <>
        <ErrorAlert>Invalid filter. Please adjust your values</ErrorAlert>
        <div className='center'>
          <Button href='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>No events found for the chosen filters!</ErrorAlert>
        <div className='center'>
          <Button href='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const readableDate = new Date(year, month - 1);

  return (
    <>
      <ResultsTitle date={readableDate} />
      <EventList events={filteredEvents} />
    </>
  );
};

export default FilteredEvent;
