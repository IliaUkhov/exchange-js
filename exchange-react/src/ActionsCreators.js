const setUser = function (user) {
  console.log(JSON.stringify(user))
  return {
    type: "SET", state: {
      user: user
    }
  }
};

module.exports = { setUser };
