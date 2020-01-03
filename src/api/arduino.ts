import express from "express";
// import { basicStatus } from "./helpers";

export function arduinoRouter(): express.Router {
    const router = express.Router();

    // router.post("/", (req, res) => basicStatus(res, ));

    return router;
}
