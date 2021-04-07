import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Col } from 'react-bootstrap'
import loginService from '../services/login'
import orderService from '../services/orders'
import userService from '../services/users'
import { useHistory } from 'react-router-dom'
export function UserLogin ({ username, password, setUsername, setPassword, setShowSignUp, setUser, setMessage, setVariant }) {
  const history = useHistory()
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      orderService.setToken(user.token)
      userService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      history.push('/')
      setMessage(`Welcome back, ${user.name}`)
      setVariant('success')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setMessage('Wrong username or password')
      setVariant('danger')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }

  }

  return (
    <Col xs={6} className='mx-auto'>
      <Form onSubmit={handleLogin} className='my-4' >
        <Form.Group >
          <Form.Label >Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type='submit' size='lg' block>
        Login
        </Button>
      </Form>

      <Col className='text-center' >
        New to Thai&apos;s Corner?
        <Button variant="primary" onClick={() => setShowSignUp(true)} size='sm' className='px-4 mx-4'>
        Create your account
        </Button>
      </Col>
    </Col>
  )
}

export function SignUp ({ username, password, setUsername, setPassword, fullname, setName, setShowSignUp, handleSignUp }) {

  const handleSubmit =() => {
    setShowSignUp(false)
    handleSignUp()
  }
  return (
    <Col xs={6} className='mx-auto'>
      <Form onSubmit={event => event.preventDefault()}>
        <Form.Group >
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={fullname}
            onChange={({ target }) => setName(target.value)}/>
        </Form.Group>
        <Form.Group >
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
        </Button>
      </Form>
    </Col>
  )
}

export default function Authentication ({ username, password, setUsername, setPassword, fullname, setName, setUser, setMessage, handleSignUp, setVariant }) {
  const [showSignUp, setShowSignUp] = useState(false)
  return (
    <div>
      {!showSignUp ?
        <UserLogin
          username={username}
          password={password}
          setUsername = {setUsername}
          setPassword={setPassword}
          setShowSignUp={setShowSignUp}
          setUser={setUser}
          setMessage={setMessage}
          setVariant={setVariant}
        />
        : <SignUp
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          fullname={fullname}
          setName={setName}
          setShowSignUp={setShowSignUp}
          handleSignUp={handleSignUp}
        />
      }
    </div>
  )
}
Authentication.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  fullname: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  setMessage: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired,
  setVariant: PropTypes.func.isRequired
}
SignUp.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  fullname: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  setShowSignUp: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired
}
UserLogin.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setShowSignUp: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setVariant: PropTypes.func.isRequired
}