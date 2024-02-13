import classes from './event-item.module.css';

import Button from '../ui/button';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import RightArrowIcon from '../icons/arrow-right-icon';

const EventItem = ({event: {id, title, location, date, image}}) => {
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const address = location.replace(', ', '\n');

  return (
    <li className={classes.item} key={id}>
      <img src={`/${image}`} alt={title} />
      <div className={classes.content}>
        <div>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{address}</address>
          </div>
        </div>

        <div className={classes.actions}>
          <Button href={`/events/${id}`}>
            <span>Explore event</span>
            <span className={classes.icon}>
              <RightArrowIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
