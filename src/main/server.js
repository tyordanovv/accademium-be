import createApp from './app.js';

async function startServer() {
  const app = await createApp();
  const port = process.env.PORT || 3005;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
