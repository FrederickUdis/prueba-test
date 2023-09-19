import express, { Application } from "express";
import router  from "./config/routes";

export class App {
  public express: Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(express.json());
  }

  private routes(): void {
    this.express.use("/api", router);
  }
}
