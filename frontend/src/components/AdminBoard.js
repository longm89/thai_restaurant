import React, { useEffect, useState, Fragment } from 'react'
import orderService from '../services/orders'
import { Table } from 'react-bootstrap'
import PropTypes from 'prop-types'
import KitchenItem from './KitchenItem'


function ProcessingSection ({ orders, updateStatus }) {
  return (
    <Fragment>
      {orders.map(order => <KitchenItem key={order.id} order={order} updateStatus={updateStatus}/>)}
    </Fragment>
  )
}
ProcessingSection.propTypes = {
  orders: PropTypes.array,
  updateStatus: PropTypes.func
}
export default function AdminBoard  () {
  const [orders, setOrders] = useState([])
  const updateStatus = (orderId, newStatus) => {
    const order = orders.find(order => order.id === orderId)
    const updatedOrder = JSON.parse(JSON.stringify(order))
    updatedOrder.status = newStatus
    updatedOrder.date = order.date
    orderService
      .update(orderId, updatedOrder)
      .then(response => {
        setOrders(orders.map(order => order.id !== orderId ? order : response))
      })
  }
  useEffect(() => {
    orderService
      .getAll()
      .then(orders => {setOrders(orders)})
  }, [])
  console.log('The orders are ', orders)
  const currentOrders = orders.filter(order => order.status==='Currently processing')
  const readyOrders = orders.filter(order => order.status==='Ready for pick up')
  const deliveredOrders = orders.filter(order => order.status==='Delivered')

  return (
    <Fragment className='m-5'>
      <h1 className='m-5'>List of orders</h1>
      <Table bordered hover style={{ width: '80%', marginBottom: '10vh' }} className='mx-auto'>
        <thead>
          <tr>
            <th>Order Ref.</th>
            <th>Customer Name</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <ProcessingSection orders={currentOrders} updateStatus={updateStatus}/>
          <ProcessingSection orders={readyOrders} updateStatus={updateStatus}/>
          <ProcessingSection orders={deliveredOrders} updateStatus={updateStatus}/>
        </tbody>
      </Table>
    </Fragment>
  )
}