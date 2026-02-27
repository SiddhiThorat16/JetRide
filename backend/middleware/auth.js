module.exports = (req, res, next) => {
  // Temporary: bypass auth for Day 4 testing
  req.user = { id: 'temp_user_id', clerkId: 'temp_clerk_id' }
  next()
}
