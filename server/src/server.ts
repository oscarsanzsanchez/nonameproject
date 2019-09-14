import * as bodyParser from "body-parser";
import colors from "colors";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { Connection, createConnection } from "typeorm";
import routing from "./routes/apiRoute";

class Server {
  public app: Application;
  public connection!: Connection;
  public colors = colors;

  private port!: number;
  private enviroment!: string;

  constructor(port: number, enviroment: string) {
    this.port = port;
    this.enviroment = enviroment;
    this.app = express();
    this.config();
    this.routes();
    this.openConnection();
  }

  private config(): void {
    this.app.set("port", process.env.PORT || this.port);
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.app.use("/api", routing);
  }

  public start(): void {
    this.app
      .listen(this.app.get("port"), () => {
        console.log(
          `\n\n\tServer running and listening on port ${this.app.get(
            "port"
          )}.\n`.white.bgGreen.bold + "\n"
        );
        console.log(
          `\n\n\tServer running under "${this.enviroment}" mode\n`.white.bgBlue
            .bold + "\n"
        );
      });
  }

  private async openConnection() {
    const connection = await createConnection();
    if (connection === undefined) {
      throw new Error("Error connecting to database.".black.bgRed);
    } else {
      console.log("Connected successfully to database".black.bgWhite);
      this.connection = connection;
      // this.pruebas();
    }
  }
}

export default Server;
