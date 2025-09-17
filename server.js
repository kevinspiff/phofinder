const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');

app.disable('x-powered-by');
app.use(express.static(distPath, { maxAge: '1h', etag: true }));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


