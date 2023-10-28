import app from "./server/server";

const port = process.env.PORT || 3000;

app.listen(() => {
  console.log(`Server running on port ${port}`);
});
