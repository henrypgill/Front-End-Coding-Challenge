import {
    Alignment,
    Button,
    ButtonGroup,
    InputGroup,
    Navbar,
} from '@blueprintjs/core';
import NavAddColumnMenu from './NavAddColumnMenu';
import NavAnalysisMenu from './NavAnalysisMenu';

const OpviaNavbar: React.FC = () => {
    return (
        <header>
            <Navbar>
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>Bio-Reactor 5</Navbar.Heading>
                    <Navbar.Divider />
                    <ButtonGroup minimal={true}>
                        <NavAddColumnMenu />
                        <NavAnalysisMenu />
                    </ButtonGroup>
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
