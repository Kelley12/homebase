import { EventEmitter2 } from "eventemitter2";
import { SensorData } from "../entity";
import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { logger } from "../utils";

export class SensorDataController {
    private readonly emitter = new EventEmitter2();

    async getSensorDatas(_: Request, res: Response) {
        try {
            const sensorDataRepository = getRepository(SensorData);
            const sensorDatas = await sensorDataRepository.find();

            res.send(sensorDatas);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(500).json({ error });
        }
    }

    async getSensorData(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const sensorDataRepository = getRepository(SensorData);
            const sensorData = await sensorDataRepository.findOneOrFail(id);
            res.send(sensorData);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("Sensor not found");
        }
    }

    async createSensorData(req: Request, res: Response) {
        const {
            sensor, sensorValue
        } = req.body;

        if (!name) {
            return res.status(400)
            .send({ error: "Missing data: sensor or sensorValue" });
        }

        const sensorData = new SensorData();
        sensorData.sensor = sensor;
        sensorData.sensorValue = sensorValue;

        const errors = await validate(sensorData);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            const sensorDataRepository = getRepository(SensorData);
            await sensorDataRepository.save(sensorData);
        } catch (e) {
            res.status(409).send("Invalid sensor data");
            return;
        }

        res.status(201).send(sensorData);
    }

    async updateSensorData(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const {
            sensor, sensorValue
        } = req.body;

        if (!name) {
            return res.status(400)
                .send({ error: "Missing data: sensor or sensorValue" });
        }

        let sensorData;
        const sensorDataRepository = getRepository(SensorData);
        try {
            sensorData = await sensorDataRepository.findOneOrFail(id);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("Sensor not found");
            return;
        }

        sensorData.sensor = sensor;
        sensorData.sensorValue = sensorValue;

        const errors = await validate(sensorData);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await sensorDataRepository.save(sensorData);
        } catch (e) {
            res.status(409).send("Invalid sensor data");
            return;
        }

        res.status(200).send(sensorData);
    }

    async deleteSensorData(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        const sensorDataRepository = getRepository(SensorData);
        try {
            await sensorDataRepository.findOneOrFail(id);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("Sensor not found");
            return;
        }
        sensorDataRepository.delete(id);

        res.status(200).send(true);
    }

    on(event: "Error", cb: (error: Error) => void): this;
    on(event: string, cb: (...args: any[]) => void): this {
        this.emitter.on(event, cb);
        return this;
    }

    once(event: string, cb: (...args: any[]) => void): this {
        this.emitter.once(event, cb);
        return this;
    }

    onAny(cb: (event: string | string[], ...args: any[]) => void): this {
        this.emitter.onAny(cb);
        return this;
    }
}
