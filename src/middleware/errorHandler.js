export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (req.path.startsWith('/api/')) {
    return res.status(err.statusCode || 500).json({
      error: err.message || 'Internal server error',
    });
  }

  res.status(500).send('Internal server error');
};

export const notFoundHandler = (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.status(404).send('Not found');
};
