import React from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default function KitchenItem({ order, updateStatus }) {
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
      <td>{order.user.name}</td>
      <td className='pl-4'>{order.items.map(dish =>
        <li key={dish.item.id}>{dish.item.name} ({' x '} {dish.qty})</li>)}</td>
      <td>{order.cost} Euros</td>
      <td >
        <Form.Control
          size='sm'
          type='text'
          as='select'
          value={order.status}
          onChange={(event) => updateStatus(order.id, event.target.value)}
        >
          <option>{'Currently processing'}</option>
          <option>{'Ready for pick up'}</option>
          <option>{'Delivered'}</option>
        </Form.Control>
      </td>
    </tr>
  )
}

KitchenItem.propTypes = {
  order: PropTypes.object,
  updateStatus: PropTypes.func
}