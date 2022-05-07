import { Box } from '@chakra-ui/react';
import NavItem from '../../../../components/Elements/NavItem/NavItem';
import pages from '../../../../constants/pages';

const NavBar = () => {
  return (
    <Box>
      {pages.map(({ id, Icon, href, title }) => (
        <NavItem key={id} href={href}>
          {Icon && <Icon marginEnd={2} />}
          {title}
        </NavItem>
      ))}
    </Box>
  );
};

export default NavBar;
