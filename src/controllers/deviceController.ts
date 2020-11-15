import { EventEmitter2 } from "eventemitter2";
import { Device } from "../entity";
import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { logger } from "../utils";

export class DeviceController {
    private readonly emitter = new EventEmitter2();

    async getDevices(_: Request, res: Response) {
        try {
            const deviceRepository = getRepository(Device);
            const devices = await deviceRepository.find();

            res.send(devices);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(500).json({ error });
        }
    }

    async getDevice(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const deviceRepository = getRepository(Device);
            const device = await deviceRepository.findOneOrFail(id);
            res.send(device);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("Device not found");
        }
    }

    async createDevice(req: Request, res: Response) {
        const {
            name, description, ip, mac, type
        } = req.body;

        if (!name || !ip || !mac) {
            return res.status(400)
                .send({ error: "Missing data: name, ip, or mac" });
        }

        const device = new Device();
        device.name = name;
        device.description = description;
        device.ip = ip;
        device.mac = mac;
        device.type = type;

        const errors = await validate(device);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            const deviceRepository = getRepository(Device);
            await deviceRepository.save(device);
        } catch (e) {
            res.status(409).send("Invalid device");
            return;
        }

        res.status(201).send(device);
    }

    async updateDevice(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const {
            name, description, ip, mac, type
        } = req.body;

        if (!name || !ip || !mac) {
            return res.status(400)
                .send({ error: "Missing data: name, ip, or mac" });
        }

        let device;
        const deviceRepository = getRepository(Device);
        try {
            device = await deviceRepository.findOneOrFail(id);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("Device not found");
            return;
        }

        device.name = name;
        device.description = description;
        device.ip = ip;
        device.mac = mac;
        device.type = type;

        const errors = await validate(device);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await deviceRepository.save(device);
        } catch (e) {
            res.status(409).send("Invalid device");
            return;
        }

        res.status(200).send(device);
    }

    async deleteDevice(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        const deviceRepository = getRepository(Device);
        try {
            await deviceRepository.findOneOrFail(id);
        } catch (error) {
            logger.log("error", `API Error:`);
            logger.log("error", error);
            res.status(404).send("Device not found");
            return;
        }
        deviceRepository.delete(id);

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
