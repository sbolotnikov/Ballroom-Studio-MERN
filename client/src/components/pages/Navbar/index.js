import react from "react"
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap" 

const NavBar = () => {

return (
<Navbar bg="light" expand="lg" className= "containerNav">
  <Navbar.Brand href="#home" className= "navHome">Home</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#aboutUS" className = "aboutNav">About Us</Nav.Link>
      <Nav.Link href="#contactUS" className = "contactNav">Contact US</Nav.Link>
      <NavDropdown title="Dropdown" className = "dropNav" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Form inline className= "form">
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success" className= "searchButton">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
)

}

export default NavBar


