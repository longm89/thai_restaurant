import React from 'react'
import Card from 'react-bootstrap/Card'
import { Row, Col, Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useState } from 'react'
function Dish ({ item, addItemToCart, setMessage, setVariant }) {
  const [qty, setQty] = useState(0)

  const handleQtyChange = (event) => {
    setQty(event.target.value)
  }

  const addToCart = (event) => {
    event.preventDefault()
    if (qty > 0) {
      const dishObject = {
        ...item,
        qty: Number(qty)
      }
      setQty(0)
      addItemToCart(dishObject)
    } else {
      setMessage('Please choose a positive quantity')
      setVariant('warning')
      setTimeout(() => {setMessage(null)}, 3000)
    }
  }
  return (
    <Card className='p-2'>
      <Card.Img variant="top" src={item['src']}/>
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text style={{ height:'8vh' }}>
          {item.description}
        </Card.Text>
        <Card.Text>
          Price: {item.price} Euros
        </Card.Text>

        <Form onSubmit={addToCart}>
          <Form.Row >

            <Form.Label xs={3} >
            Qty :
            </Form.Label>
            <Col xs={3}>
              <Form.Control
                size='sm'
                type='number'
                as='select'
                value={qty}
                onChange={handleQtyChange}
              >
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Col>
            <Col xs={6} >
              <Button
                className="btn btn-sm ml-3"
                variant="primary"
                type="submit"
                onMouseDown={e => e.preventDefault()}
              >
                Add to basket</Button>
            </Col>
          </Form.Row>

        </Form>

      </Card.Body>
    </Card>
  )
}

Dish.propTypes = {
  item: PropTypes.object,
  addItemToCart: PropTypes.func,
  courseName: PropTypes.string,
  setMessage: PropTypes.func,
  setVariant: PropTypes.func
}
function MealCourse ({ nameTitle, course, addItemToCart, setMessage, setVariant }) {

  return (
    <div className='my-5'>
      <h2 className='my-3 ml-3'>{nameTitle}</h2>
      <Row className='p-2'>
        {course.map(item =>
          <Col key={item.id} sm={12} md={6} lg={4} xl={3}>
            <Dish item={item} addItemToCart={addItemToCart} setMessage={setMessage} setVariant={setVariant}/>
          </Col>
        )}
      </Row>
    </div>
  )
}
MealCourse.propTypes = {
  nameTitle: PropTypes.string,
  course: PropTypes.array,
  addItemToCart: PropTypes.func,
  setMessage: PropTypes.func,
  setVariant: PropTypes.func
}


export default function Menu({ menu, addItemToCart, setMessage, setVariant }) {

  return (
    <div>
      <h1>Our Menu</h1>
      <Row>
        <MealCourse
          nameTitle='Starters'
          course={menu.filter(item => item.courseType === 'Starters')}
          addItemToCart={addItemToCart}
          setMessage={setMessage}
          setVariant={setVariant}
        />
      </Row>
      <MealCourse
        nameTitle='Main Dishes'
        course={menu.filter(item => item.courseType === 'MainDishes')}
        addItemToCart={addItemToCart}
        setMessage={setMessage}
        setVariant={setVariant}
      />
      <MealCourse
        nameTitle='Desserts and Drinks'
        course={menu.filter(item => item.courseType === 'DessertsAndDrinks')}
        addItemToCart={addItemToCart}
        setMessage={setMessage}
        setVariant={setVariant}
      />
    </div>
  )
}

Menu.propTypes = {
  menu: PropTypes.array,
  addItemToCart: PropTypes.func,
  setMessage: PropTypes.func,
  setVariant: PropTypes.func
}