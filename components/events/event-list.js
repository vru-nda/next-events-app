import classes from './event-list.module.css';
import EventItem from './event-item';

const EventList = ({events}) => {
  return (
    <ul className={classes.list}>
      {events.map((item) => (
        <EventItem key={item.id} event={item} />
      ))}
    </ul>
  );
};

export default EventList;
