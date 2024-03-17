const express = require('express');
const cluster = require('cluster');
const usersRoutes = require('./routes/users');

const app = express();
const PORT = 3999;

if (cluster.isMaster) {
  for (let i = 0; i < 4; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} exited`);
  });
} else {
  app.use(express.json());
  app.use('/api/users', usersRoutes);
  app.listen(PORT + cluster.worker.id, () => {
    console.log(`Worker ${cluster.worker.id} is running on port ${PORT + cluster.worker.id}`);
  });
}

