import { Navbar, Nav, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import PropTypes from 'prop-types'
import React from 'react'
import orderService from '../services/orders'
import userService from '../services/users'
export default function Navigation({ user, setUser }) {
  const handleSignOut = () => {
    window.localStorage.removeItem('loggedUser')
    orderService.setToken(null)
    userService.setToken(null)
    setUser(null)
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className ='pr-0 border-0'>
      <LinkContainer to="/" className='p-2 border-0'>
        <Navbar.Brand >
          <i className="fas fa-pepper-hot"></i>{' '}Thai Corner
        </Navbar.Brand>
      </LinkContainer>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" >
        <Nav className="ml-auto p-0" >
          <LinkContainer to="/" className ='border-0'>
            <Nav.Link as="span" className ='px-4'>
              Home
            </Nav.Link>
          </LinkContainer>
          {(!user || !user.isAdmin) && <LinkContainer to="/menu" className ='border-0'>
            <Nav.Link as="span" className ='px-4'>
            Menu
            </Nav.Link>
          </LinkContainer>
          }
          {(!user || !user.isAdmin) && <LinkContainer to="/cart" className ='border-0'>
            <Nav.Link as="span" className ='px-4'>
              <i className="fas fa-shopping-basket"></i>{' '}Basket
            </Nav.Link>
          </LinkContainer>
          }
          {user && !user.isAdmin && <LinkContainer to="/orderhistory" className ='border-0' >
            <Nav.Link as="span" className='px-4'>
              Order History
            </Nav.Link>
          </LinkContainer>
          }
          {user && user.isAdmin && <LinkContainer to="/admin" className ='border-0' >
            <Nav.Link as="span" className='px-4'>
              Admin Board
            </Nav.Link>
          </LinkContainer>
          }

          { !user ?
            <LinkContainer to="/authentication" >
              <Nav.Link as="span" className='px-4'>
                    Sign in
              </Nav.Link>
            </LinkContainer>
            :
            <LinkContainer to='/home' >
              <Nav.Link as='span' className=''style={{ border: '0px solid blue' }}>
                <Button size='sm' onClick={handleSignOut}>Sign out</Button>
              </Nav.Link>
            </LinkContainer>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

Navigation.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired
}