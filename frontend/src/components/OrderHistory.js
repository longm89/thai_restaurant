import React, { useEffect, useState, Fragment } from 'react'
import userService from '../services/users'
import { Table } from 'react-bootstrap'
import PropTypes from 'prop-types'
function OrderItem({ order }) {
  const rowColor = function () {
    if (order.status === 'Delivered') {
      return 'table-success'
    }
    if (order.status === 'Ready for pick up') {
      return 'table-info'
    }
    return 'table-warning'
  }
  return (
    <tr className={rowColor()}>
      <td>#{order.id}</td>
      <td>{new Date(order.date).toLocaleString()}</td>
      <td className='pl-4'>{order.items.map(dish =>
        <li key={dish.item.id}>{dish.item.name} ({' x '} {dish.qty})</li>)}</td>
      <td>{order.cost} Euros</td>
      <td>{order.status}</td>
    </tr>
  )
}
OrderItem.propTypes = {
  order: PropTypes.object,
}
function ProcessingSection ({ orders }) {
  return (
    <Fragment>
      {orders.map(order => <OrderItem key={order.id} order={order}/>)}
    </Fragment>
  )
}
ProcessingSection.propTypes = {
  orders: PropTypes.array,
  updateStatus: PropTypes.func
}
export default function OrderHistory  ({ user }) {
  const [orders, setOrder] = useState([])
  useEffect(() => {
    if (user) {
      userService
        .getOrders(user.id)
        .then(items => {setOrder(items)})
    }

  }, [])
  const currentOrders = orders.filter(order => order.status==='Currently processing')
  const readyOrders = orders.filter(order => order.status==='Ready for pick up')
  const deliveredOrders = orders.filter(order => order.status==='Delivered')
  return (
    <Fragment>
      <h1 className='m-5'>Your order history</h1>
      <Fragment>
        <Table bordered hover style={{ width: '80%', marginBottom: '10vh' }} className='mx-auto'>
          <thead>
            <tr>
              <th>Order Ref.</th>
              <th>Time</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <ProcessingSection orders={currentOrders} />
            <ProcessingSection orders={readyOrders}/>
            <ProcessingSection orders={deliveredOrders}/>
          </tbody>
        </Table>
      </Fragment>
    </Fragment>
  )
}
OrderHistory.propTypes = {
  user: PropTypes.object,
}