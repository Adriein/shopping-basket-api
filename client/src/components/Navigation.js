import React from 'react';

import GroupWorkIcon from '@material-ui/icons/GroupWork';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';


export default function Navigation() {
  return (
    <BottomNavigation value={0} showLabels>
      <BottomNavigationAction label="Grupos" icon={<GroupWorkIcon />} />
      <BottomNavigationAction label="Cestas" icon={<ShoppingBasketIcon />} />
    </BottomNavigation>
  );
}
