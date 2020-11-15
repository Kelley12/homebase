import { EventEmitter2 } from "eventemitter2";
import { Sensor } from "../entity";
import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { logger } from "../utils";

export class SensorController {
    private readonly emitter = new EventEmitter2();

    async getSensors(_: Request, res: Response) {
        try {
            const sensorRepository = getRepository(Sensor);
            const sensors = await sensorRepository.find();

            res.send(sensors);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(500).json({ error });
        }
    }

    async getSensor(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const sensorRepository = getRepository(Sensor);
            const sensor = await sensorRepository.findOneOrFail(id);
            res.send(sensor);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("Sensor not found");
        }
    }

    async createSensor(req: Request, res: Response) {
        const {
            name, description
        } = req.body;

        if (!name) {
            return res.status(400)
                .send({ error: "Missing data: name" });
        }

        const sensor = new Sensor();
        sensor.name = name;
        sensor.description = description;

        const errors = await validate(sensor);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            const sensorRepository = getRepository(Sensor);
            await sensorRepository.save(sensor);
        } catch (e) {
            res.status(409).send("Invalid sensor");
            return;
        }

        res.status(201).send(sensor);
    }

    async updateSensor(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const {
            name, description
        } = req.body;

        if (!name) {
            return res.status(400)
                .send({ error: "Missing data: name" });
        }

        let sensor;
        const sensorRepository = getRepository(Sensor);
        try {
            sensor = await sensorRepository.findOneOrFail(id);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("Sensor not found");
            return;
        }

        sensor.name = name;
        sensor.description = description;

        const errors = await validate(sensor);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await sensorRepository.save(sensor);
        } catch (e) {
            res.status(409).send("Invalid sensor");
            return;
        }

        res.status(200).send(sensor);
    }

    async deleteSensor(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        const sensorRepository = getRepository(Sensor);
        try {
            await sensorRepository.findOneOrFail(id);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("Sensor not found");
            return;
        }
        sensorRepository.delete(id);

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
