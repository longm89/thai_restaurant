import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './bootstrap.min.css'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import PropTypes from 'prop-types'
import Cart from './components/Cart'
import Home from './components/Home'
import Menu from './components/Menu'
import Navigation from './components/Navigation'
import Authentication from './components/Authentication'
import OrderHistory from './components/OrderHistory'
import { useState, useEffect } from 'react'
import { Container, Alert } from 'react-bootstrap'
import menuService from './services/menu'
import orderService from './services/orders'
import userService from './services/users'
import AdminBoard from './components/AdminBoard'
function Notification ({ message, variant='success' }) {
  const visible = message ? 'block' : 'none'
  return (
    <Alert variant={variant} style={{ width: '30%', position: 'fixed', top: '5vh', left: '35%', zIndex: 10, display: `${visible}` }}>
      {message}
    </Alert>
  )
}
Notification.propTypes = {
  variant: PropTypes.string,
  message: PropTypes.string
}
const App = () => {
  const [menu, setMenu] = useState([])
  const [cart, setCart] = useState([])
  // For the cart, each meal course, for example, Starters will contain an array of dish item:
  // {id: id of the dish, qty: number of orders, name, price}
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [variant, setVariant] = useState(null)

  const addItemToCart = (item) => {
    // item is an object with properties:
    // id, qty, name, price, image src, courseType

    // First, find the object in the cart that has the id
    // If it's possible to find the object, increase the quantity by quantity
    // Otherwise, create a new object with the id, quantity, name, price, image src, courseType

    const foundIndex = cart.findIndex(dish => dish.id === item.id)
    if (foundIndex !== -1) {
      let deepCartCopy = cart.slice()
      deepCartCopy[foundIndex].qty += item.qty
      setCart(deepCartCopy)
      setMessage(`${item.name} is added to the basket`)
      setVariant('success')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } else {
      const newItem = { ...item }
      let deepCartCopy = cart.concat(newItem)
      setCart(deepCartCopy)
      setMessage(`${item.name} is added to the basket`)
      setVariant('success')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }
  useEffect(() => {
    menuService
      .getAll()
      .then(items => {setMenu(items)})
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      orderService.setToken(user.token)
      userService.setToken(user.token)
    }
  },[])
  const updateQty = (id, qty) => {
    const foundIndex = cart.findIndex(dish => dish.id === id)
    let deepCartCopy = cart.slice()
    deepCartCopy[foundIndex].qty = qty
    setCart(deepCartCopy)
    setMessage(`The quantity of ${deepCartCopy[foundIndex].name} is updated`)
    setVariant('success')
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }
  const delItem = (id) => {
    let deepCartCopy = cart.slice()
    let itemName = cart[cart.findIndex(dish => dish.id === id)].name
    deepCartCopy= deepCartCopy.filter(item => item.id !== id)
    setCart(deepCartCopy)
    setMessage(`The item ${itemName} is deleted from the basket`)
    setVariant('success')
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }
  const handleSignUp = () => {
    userService
      .createUser({ username, name, password })
      .then(() => {
        setMessage(`Welcome ${name}, your account is created!`)
        setVariant('success')
        setTimeout(() => {
          setMessage(null)
        }, 3000)}
      )

  }
  return (
    <Container fluid>
      <Notification message={message} variant={variant}/>
      <Router>
        <Navigation user={user} setUser={setUser}/>
        <Switch>
          <Route path="/menu">
            <Menu
              menu={menu}
              addItemToCart={addItemToCart}
              setMessage={setMessage}
              setVariant={setVariant}
            />
          </Route>
          <Route path="/cart">
            <Cart cart={cart} updateQty={updateQty} delItem={delItem} user={user}  setCart={setCart} setMessage={setMessage}/>
          </Route>
          <Route path='/orderhistory'>
            <OrderHistory user={user}/>
          </Route>
          <Route path="/authentication">
            <Authentication
              username={username}
              password={password}
              fullname={name}
              setUsername={setUsername}
              setPassword={setPassword}
              setName={setName}
              user={user}
              setUser={setUser}
              setMessage={setMessage}
              handleSignUp={handleSignUp}
              setVariant={setVariant}
            />
          </Route>
          <Route path='/admin'>
            <AdminBoard/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Container>
  )
}

ReactDOM.render(

  <React.StrictMode>

    <App/>

  </React.StrictMode>,

  document.getElementById('root')

)

