import Server from "./server";
import config from "../config/config.json";

const actualconfig = config.dev;

const server = new Server(actualconfig.node_port, actualconfig.config_id);

server.start();
