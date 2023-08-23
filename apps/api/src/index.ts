import { createServer } from "./server";
// import { log } from "logger";

const port = process.env.PORT || 5001;
const server = createServer();

server.listen(port, () => {
  console.log(`api running on ${port}`);
           
});