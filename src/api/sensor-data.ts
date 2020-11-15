import express from "express";
import { SensorDataController } from "../controllers";

export function sensorDataRouter(): express.Router {
    const router = express.Router();
    const sensorDataController = new SensorDataController();

    router.get("/", sensorDataController.getSensorDatas);
    router.get("/:id", sensorDataController.getSensorData);
    router.post("/", sensorDataController.createSensorData);
    router.put("/:id", sensorDataController.updateSensorData);
    router.delete("/:id", sensorDataController.deleteSensorData);

    return router;
}
