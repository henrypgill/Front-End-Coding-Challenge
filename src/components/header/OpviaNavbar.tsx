import { Alignment, Button, InputGroup, Navbar } from '@blueprintjs/core';
import TableButtons from './TableButtons';

const OpviaNavbar: React.FC = () => {
  return (
    <header>
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Bio-Reactor 5</Navbar.Heading>
          <Navbar.Divider />
          <TableButtons />
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <InputGroup leftIcon="search" />
          <Button icon="more" minimal={true} />
        </Navbar.Group>
      </Navbar>
    </header>
  );
};

export default OpviaNavbar;
