import express from "express";
import { SensorDataController } from "../controllers";
import { basicStatus } from "./helpers";
import { logger } from "../utils";

export function sensorDataRouter(): express.Router {
    const router = express.Router();
    const sensorDataController = new SensorDataController();

    router.get("/", (_, res) => sensorDataController.getSensorData()
        .then(data => res.status(200).send(data))
        .catch(error => {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            return res.status(500).json({ error });
        })
    );

    router.get("/:id", (req, res) => {
        const id = parseInt(req.params.id);

        sensorDataController.getDeviceSensorData(id)
            .then(data => res.status(200).send(data))
            .catch(error => {
                logger.log("error", `API Error:`);
                logger.log("error", error);
                return res.status(500).json({ error });
            });
    });

    router.post("/", (req, res) => {
        if (!req.body.name || !req.body.ip || !req.body.mac || !req.body.type) {
            return res.status(400)
                .send({ error: "Missing data: name, ip, mac, or type (RaspberryPi or Arduino)" });
        }

        if (!["RaspberryPi", "Arduino"].includes(req.body.type)) {
            return res.status(400)
                .send({ error: "Incorrect type: Must be 'RaspberryPi' or 'Arduino'" });
        }

        sensorDataController.createSensorData(req.body)
            .then(() => res.sendStatus(201))
            .catch(error => {
                logger.log("error", `API Error:`);
                logger.log("error", error);
                return res.sendStatus(500);
            });
    });

    router.put("/:id", (req, res) => {
        const id = parseInt(req.params.id);
        if (!req.body.name || !req.body.ip || !req.body.mac || !req.body.type) {
            return res.status(400)
                .send({ error: "Missing data: name, ip, mac, or type (RaspberryPi or Arduino)" });
        }

        if (!["RaspberryPi", "Arduino"].includes(req.body.type)) {
            return res.status(400)
                .send({ error: "Incorrect type: Must be 'RaspberryPi' or 'Arduino'" });
        }

        basicStatus(res, sensorDataController.updateSensorData(req.body, id));
    });

    router.delete("/:id", (req, res) => {
        const id = parseInt(req.params.id);

        sensorDataController.deleteSensorData(id)
            .then(sensor => res.status(200).send(sensor))
            .catch(error => {
                logger.log("error", `API Error:`);
                logger.log("error", error);
                return res.status(500).json({ error });
            });
    });

    return router;
}
