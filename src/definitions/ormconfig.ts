import { ConnectionOptions } from "typeorm";

export function connectionConfig(): ConnectionOptions {
    return {
        name: "development",
        type: "postgres",
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        synchronize: true,
        entities: [
            `${__dirname}/../entity/*.js`
        ],
        migrations: [
            `${__dirname}/../migration/*.js`
        ],
        cli: {
            entitiesDir: `${__dirname}/../entity`,
            migrationsDir: `${__dirname}/../migration`,
        }
    };
}
