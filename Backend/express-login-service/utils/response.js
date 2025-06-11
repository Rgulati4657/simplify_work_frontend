function formatAuthResponse(success, user) {
  return {
    authenticated: success,
    user: success ? { id: user.id, username: user.username } : null,
  };
}

module.exports = { formatAuthResponse };
