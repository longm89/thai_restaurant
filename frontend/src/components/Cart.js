import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Image, Form, Button } from 'react-bootstrap'
import orderService from '../services/orders'
function CartItem ({ item, updateQty, delItem }) {

  const handleQtyChange = (event) => {
    updateQty(item.id, Number(event.target.value))
  }

  const deleteItem = (event) => {
    event.preventDefault()
    delItem(item.id)
  }
  return (
    <Row >
      <Col xs={2} className='offset-2'>
        <Image className='m-2' src={item['src']} thumbnail/>
      </Col>
      <Col xs={4} >
        <h4>{item.name}</h4>
        <Row>
          <Col xs={4}>
          Price: {item.price} Euros
          </Col>
          <Col xs={1} >
          Qty:
          </Col>
          <Col xs={4} >
            <Form.Control
              size='sm'
              type='number'
              as='select'
              value={item.qty}
              onChange={handleQtyChange}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </Form.Control>
          </Col>
          <Col xs={3}>
            <Button className="btn btn-primary btn-sm ml-3" onClick={deleteItem}>Delete</Button>
          </Col>
        </Row>
      </Col>
      <Col xs={2} style={{ textAlign: 'center' }}>
        <h4>Subtotal</h4>
        {item.price * item.qty} Euros
      </Col>
    </Row>
  )
}

CartItem.propTypes = {
  item: PropTypes.object,
  updateQty: PropTypes.func,
  courseName: PropTypes.string,
  delItem: PropTypes.func
}

function CartMealCourse ({ nameTitle, course, updateQty, delItem }) {
  return (
    <div className='mb-5'>
      {course.length > 0 &&
            <div>
              <Col style={{ textAlign:'left' }}>
                <h2>{nameTitle} </h2>
              </Col>
              {course.map(item => <CartItem key={item.id} item={item} updateQty ={updateQty} delItem={delItem}/>)}
            </div>
      }
    </div>
  )
}
CartMealCourse.propTypes = {
  nameTitle: PropTypes.string,
  course: PropTypes.array,
  updateQty: PropTypes.func,
  delItem: PropTypes.func
}
function TotalPrice({ cart }) {
  const totalPrice = (cart) => {
    const reducer = (accum, currItem) => accum + currItem.price * currItem.qty
    return cart.reduce(reducer, 0)
  }
  return (
    <div style={{ textAlign:'center' }}>
      <h3>Total order: {' '}
        {totalPrice(cart)} Euros
      </h3>
    </div>
  )
}

TotalPrice.propTypes = {
  cart: PropTypes.array
}
export default function Cart({ cart, updateQty, delItem, user, setCart, setMessage }) {

  const totalPrice = (cart) => {
    const reducer = (accum, currItem) => accum + currItem.price * currItem.qty
    return cart.reduce(reducer, 0)
  }

  const handleOrder = () => {
    if (user) {
      const orderObject = {
        date: new Date(),
        items: cart.map(item => {return { qty: item.qty, item: item.id }}),
        cost: totalPrice(cart)
      }
      orderService
        .create(orderObject)
        .then(() => {
          setCart([])
          setMessage('Your order is sent to our kitchen!')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    } else {
      setMessage('Please login first!')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  return (
    <div className='my-5'>
      <h1 className='mb-5'>YOUR BASKET</h1>
      {cart.length === 0 ?
        <p style={{ textAlign: 'center' }}>Your basket is currently empty</p>
        : <div style={{ textAlign:'center' }}>
          <CartMealCourse
            nameTitle='Starters'
            course={cart.filter(item => item.courseType === 'Starters')}
            updateQty={updateQty}
            delItem={delItem}
          />
          <CartMealCourse
            nameTitle='Main Dishes'
            course={cart.filter(item => item.courseType === 'MainDishes')}
            updateQty={updateQty}
            delItem={delItem}
          />
          <CartMealCourse
            nameTitle='Desserts and Drinks'
            course={cart.filter(item => item.courseType === 'DessertsAndDrinks')}
            updateQty={updateQty}
            delItem={delItem}
          />

          <TotalPrice cart={cart}/>
          <Button className='btn btn-primary' onClick={handleOrder} onMouseDown={e => e.preventDefault()}>Place the order</Button>
        </div>
      }
    </div>
  )
}

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func,
  updateQty: PropTypes.func.isRequired,
  delItem: PropTypes.func.isRequired,
  user: PropTypes.object,
  setMessage: PropTypes.func
}