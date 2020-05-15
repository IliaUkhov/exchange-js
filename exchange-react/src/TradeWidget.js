import React from 'react'
import { Card, List, Button, Form } from "tabler-react"
import "tabler-react/dist/Tabler.css"
import { connect } from "react-redux";

class TradeWidget extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      stocks: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/stocks')
      .then(res => res.json())
      .then(json => {
        this.setState({
          stocks: json
        })
      });
  }

  render() {
    return (
      <Card>
        <Card.Header>
          <Card.Title>
            Trade
          </Card.Title>
        </Card.Header>
        <Card.Body>
        <List unstyled>{
          this.state.stocks.map((stock) => {
            return (
              <List.Item key={stock.symbol}>
                <Card>
                <Card.Header>
                  <Card.Title>
                    {stock.symbol}
                  </Card.Title>
                  <Card.Options>
                    <Button color="success" size="sm">Buy</Button>
                    <Button class="sell" color="danger" size="sm">Sell</Button>
                  </Card.Options>
                </Card.Header>
                <Card.Body>
                  <Form.Input name='amount' placeholder='10'/>
                </Card.Body>
                </Card>
              </List.Item>
            )
          })}
        </List>
        </Card.Body>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
} 

export default connect(mapStateToProps, null)(TradeWidget)
