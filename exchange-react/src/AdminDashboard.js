import React from 'react'
import { Card, Button, Form, Page, List, Grid } from "tabler-react"
import "tabler-react/dist/Tabler.css"
import { connect } from "react-redux";

class AdminDashboard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      brokers: [],
      settings: {}
    }
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/brokers')
      .then(res => res.json())
      .then(brokersJson => {
        fetch('http://localhost:8000/api/settings')
          .then(res => res.json())
          .then(json => {
            this.setState({
              brokers: brokersJson,
              settings: json
            })
          });
      });
  }

  render() {
    return (
      <Page.Card>
        <List unstyled>{
          this.state.brokers.map((broker) => {
            return (
              <List.Item key={broker.name}>
                <Card>
                  <Card.Header>
                    <Card.Title>
                      NAME: {broker.name}
                      {this.state.settings.admins.includes(broker.name) ? " ADMIN" : ""}
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    BALANCE: {broker.balance}<br/>{broker.stocks.length ? "STOCKS:" : ""}
                    <List.Group>{
                      broker.stocks.map((stock) => {
                        return (
                          <List.GroupItem key={stock.symbol}>
                            {stock.symbol}: {stock.amount}
                          </List.GroupItem>
                        )
                      })}
                    </List.Group>
                  </Card.Body>
                </Card>
              </List.Item>
            )
          })}
        </List>
      </Page.Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
} 

export default connect(mapStateToProps, null)(AdminDashboard)
