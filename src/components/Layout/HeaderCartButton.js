import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';

const HeaderCartButton = props => {
  const cartCtx = useContext(CartContext);
  const [highlightButton, setHighlightButton] = useState(false);

  const numberOfItems = cartCtx.items.reduce((currNum, items) => {
    return currNum + items.amount;
  }, 0);

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    
    setHighlightButton(true);

    const timer = setTimeout(() => {
      setHighlightButton(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [cartCtx.items])

  const btnClasses = `${classes.button} ${highlightButton ? classes.bump : ''}`;

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  )
};

export default HeaderCartButton;