import express from "express";
import { DeviceController } from "../controllers";

export function deviceRouter(): express.Router {
    const router = express.Router();
    const deviceController = new DeviceController();

    router.get("/", deviceController.getDevices);
    router.get("/:id", deviceController.getDevice);
    router.post("/", deviceController.createDevice);
    router.put("/:id", deviceController.updateDevice);
    router.delete("/:id", deviceController.deleteDevice);

    return router;
}
