import React from 'react'
import { Card, Button, Form, Page, List, Grid } from "tabler-react"
import "tabler-react/dist/Tabler.css"
import { connect } from "react-redux";
import TradeWidget from './TradeWidget';

class Dashboard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      stocks: []
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
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
      <Grid.Row>
        <Grid.Col>
          <TradeWidget {...this.props}/>
        </Grid.Col>
        <Grid.Col>
          <Card>
            <Card.Header>
              <Card.Title>
                My Stocks
              </Card.Title>
              <Card.Options>
                <Button color="primary"
                  onClick={this.fetchData.bind(this)}
                >Refresh</Button>
              </Card.Options>
            </Card.Header>
            <Card.Body>
            <List.Group>{
              this.props.user.stocks.map((stock) => {
                return (
                  <List.GroupItem key={stock.symbol}>
                    SYMBOL: {stock.symbol}<br/>
                    AMOUNT: {stock.amount}<br/>
                    PROFIT: {stock.profit.toFixed(2)}<br/>
                  </List.GroupItem>
                )
              })}
            </List.Group>
            </Card.Body>
          </Card>
        </Grid.Col>
        <Grid.Col>
          
        </Grid.Col>
      </Grid.Row>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
} 

export default connect(mapStateToProps, null)(Dashboard)
