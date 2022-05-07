import { Box } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { InteractivityProps } from '@chakra-ui/styled-system/src/config/interactivity';
import { NavLink, useLocation } from 'react-router-dom';

type Props = {
  href: string;
};

const styles = {
  px: 2,
  py: 1,
  userSelect: 'none' as InteractivityProps['userSelect'],
  display: 'flex',
  alignItems: 'center',
};

export const NavItem: React.FC<Props> = ({ children, href }) => {
  const { pathname } = useLocation();
  const active = useMemo(() => pathname === href, [pathname, href]);
  return (
    <>
      {active ? (
        <Box
          {...styles}
          bg="teal.50"
          borderRadius={5}
          color="teal.800"
          fontWeight="bold"
        >
          {children}
        </Box>
      ) : (
        <NavLink to={href}>
          <Box {...styles} cursor="pointer" fontWeight="medium">
            {children}
          </Box>
        </NavLink>
      )}
    </>
  );
};
