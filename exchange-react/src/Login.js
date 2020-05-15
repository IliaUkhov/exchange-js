const React = require("react");
const { Button, Form, Page } = require("tabler-react");

class LoginForm extends React.Component {

  constructor(props) {
    super(props)
    this.selector = React.createRef()
    this.state = {
      user: "",
      brokers: [],
      settings: {}
    }
  }

  handleChange(event) {
    const user = this.state.brokers.find(broker => broker.name === event.target.value)
    this.props.setUser(user)
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/brokers')
      .then(res => res.json())
      .then(json => {
        this.setState({
          brokers: json
        })
      });
    fetch('http://localhost:8000/api/settings')
      .then(res => res.json())
      .then(json => {
        this.setState({
          settings: json
        })
      });
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(JSON.stringify(this.state.settings))
    console.log(this.props.user.name)
    if (!this.state.settings.admins.includes(this.props.user.name)) {
      this.props.history.push("/dashboard")
    } else {
      this.props.history.push("/admin")
    }
  }

  render() {
    return (
      <Page.Card>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Select onChange={this.handleChange.bind(this)}>{
            this.state.brokers.map(broker => {
              return <option key={broker.name} value={broker.name}>{broker.name}</option>
            })}
          </Form.Select>
          <Form.Footer>
            <Button color="primary" type="submit">Go</Button>
          </Form.Footer>
        </Form>
      </Page.Card>
    );
  }
}

class LoginView extends React.Component {
  render() {
    return (
        <LoginForm setUser={this.props.setUser} {...this.props}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    brokers: state.brokers,
    user: state.user
  }
}

const connect = require("react-redux").connect;
const actions = require("./ActionsCreators");

export default connect(mapStateToProps, actions)(LoginView)
