import {useRouter} from 'next/router';

import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import {getFilteredEvents} from '../../helpers/api-util';

const FilteredEvent = ({hasError, filteredEvents, date}) => {
  // const router = useRouter();

  // const filters = router.query.slug;

  // if (!filters) {
  //   return <ErrorAlert className='center'>Loading...</ErrorAlert>;
  // }

  // const year = +filters[0];
  // const month = +filters[1];

  if (hasError) {
    return (
      <>
        <ErrorAlert>Invalid filter. Please adjust your values</ErrorAlert>
        <div className='center'>
          <Button href='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

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

  const readableDate = new Date(date?.year, date?.month - 1);

  return (
    <>
      <ResultsTitle date={readableDate} />
      <EventList events={filteredEvents} />
    </>
  );
};

export async function getServerSideProps({params}) {
  const filters = params.slug;

  const year = +filters[0];
  const month = +filters[1];

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return {
      props: {
        hasError: true,
      },
      // notFound: true,
      // redirect: {
      //   destination:"/error"
      // }
    };
  }

  const filteredEvents = await getFilteredEvents({year, month});

  return {
    props: {
      filteredEvents,
      data: {
        year,
        month,
      },
    },
  };
}

export default FilteredEvent;
