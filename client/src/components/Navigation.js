import React from 'react';

import HistoryIcon from '@material-ui/icons/History';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';


export default function Navigation() {
  return (
    <BottomNavigation value={0} showLabels>
      <BottomNavigationAction label="Cestas" icon={<ShoppingBasketIcon />} />
      <BottomNavigationAction label="Historico" icon={<HistoryIcon />} />
    </BottomNavigation>
  );
}
