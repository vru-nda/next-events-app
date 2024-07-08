import Image from 'next/image';

import classes from './event-item.module.css';

import AddressIcon from '@/components/icons/address-icon';
import RightArrowIcon from '@/components/icons/arrow-right-icon';
import DateIcon from '@/components/icons/date-icon';
import Button from '@/components/ui/button';

const EventItem = ({event: {id, title, location, date, image}}) => {
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const address = location?.replace(', ', '\n');

  return (
    <li className={classes.item} key={id}>
      <Image src={`/${image}`} alt={title} width={250} height={160} />
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
