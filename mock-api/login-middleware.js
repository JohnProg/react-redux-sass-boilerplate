module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/login') {
    if (req.body.email === 'john@test.com' && req.body.password === '123') {
      res.status(200).json({});
    } else {
      res.status(400).json({ message: 'wrong credentials' });
    }
  } else {
    next();
  }
};
