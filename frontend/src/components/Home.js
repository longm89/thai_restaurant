import React from 'react'
let homeStyle = {
  backgroundImage: 'url("/images/background.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: '92vh',
  border: 'px solid red',

}

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button  from 'react-bootstrap/Button'
import {
  Link
} from 'react-router-dom'
export default function Home() {
  return (
    <div style={homeStyle}>
      <Row style={{ height: '100%' }} className="align-items-center">
        <Col sm={12} md={4} className ='offset-1 text-center mb-5' >
          <div className=' blurryCardBefore'>
          </div>
          <Card className='border-0 blurryCard p-5' text='white' style={{ backgroundColor: 'inherit' }}>

            <Card.Title className='mb-5'>
              <blockquote className="blockquote">
                <p>
                  {' '}
                Laughter is brightest where food is best...{' '}
                </p>
                <footer className="blockquote-footer">
              Irish Proverb.
                </footer>
              </blockquote>
            </Card.Title>

            <Card.Text className='my-5' style={{ lineHeight: '200%' }}>
            At Thai Corner, our chefs make healthy and delicious Thai&apos;s dishes using
            organic ingredients. Save your precious time for friends and family
            and let us take care of the food!
            </Card.Text>
            <Link to="/menu">
              <Button variant="primary">Our menu</Button>
            </Link>

          </Card>
        </Col>
      </Row>


    </div>


  )
}