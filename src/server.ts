import app from './app';


const port = process.env.PORT || 8088;
if (!port) {
  process.exit(1);
}

app.listen(port as number, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});

