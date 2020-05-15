const reducer = (state = {}, action) => {
  switch (action.type) {
    case "SET":
      console.log(`SET ${JSON.stringify(action.state)}`)
      return action.state
    default:
      console.log(`ret ${JSON.stringify(state)}`)
      return state
  }
}

export default reducer
