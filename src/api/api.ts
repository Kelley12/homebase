import express from "express";
import { deviceRouter } from "./device";
import { raspberryPiRouter } from "./raspberrypi";
import { arduinoRouter } from "./arduino";
import { sensorRouter } from "./sensor";

export function apiRouter(): express.Router {
    const router = express.Router();

    router.use("/devices", deviceRouter());
    router.use("/sensors", sensorRouter());
    router.use("/arduino", arduinoRouter());
    router.use("/raspberrypi", raspberryPiRouter());

    router.get("*", (_req, res) => res.sendStatus(404));

    return router;
}
