import Link from 'next/link';
import classes from './button.module.css';

const Button = (props) => {
  return props.href ? (
    <Link href={props.href} className={classes.btn}>
      {props.children}
    </Link>
  ) : (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
