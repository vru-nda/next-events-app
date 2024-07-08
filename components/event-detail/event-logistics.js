import Image from 'next/image';

import LogisticsItem from '@/components/event-detail/logistics-item';
import AddressIcon from '@/components/icons/address-icon';
import DateIcon from '@/components/icons/date-icon';

import classes from './event-logistics.module.css';

function EventLogistics({event}) {
  const {date, location, image, imageAlt} = event;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const addressText = location.replace(', ', '\n');

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={`/${image}`} alt={imageAlt} width={400} height={400} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
