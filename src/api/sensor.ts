import express from "express";
import { SensorController } from "../controllers";

export function sensorRouter(): express.Router {
    const router = express.Router();
    const sensorController = new SensorController();

    router.get("/", sensorController.getSensors);
    router.get("/:id", sensorController.getSensor);
    router.post("/", sensorController.createSensor);
    router.put("/:id", sensorController.updateSensor);
    router.delete("/:id", sensorController.deleteSensor);

    return router;
}
