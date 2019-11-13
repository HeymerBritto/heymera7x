import mongoose, { mongo } from 'mongoose';
import { config } from '../../../config/api-config';
import { IConn } from '../../generic/interface/database';

export class MongoDb implements IConn {

    constructor() {

        mongoose.set('useCreateIndex', true);

        // CONNECTION EVENTS
        // When successfully connected
        mongoose.connection.on('connected', () => {
            console.log('Mongoose default connection open to ' + config.mongo.url);
        });

        // If the connection throws an error
        mongoose.connection.on('error', (err: any) => {
            console.log('Mongoose default connection error: ' + err);
        });

        // When the connection is disconnected
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose default connection disconnected');
        });

        // If the Node process ends, close the Mongoose connection 
        process.on('SIGINT', () => {
            mongoose.connection.close(function () {
                console.log('Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });
    }

    createConnection(): Promise<any> {
        // Create the database connection 
        return mongoose.connect(config.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true })
    }

    disconnect(): Promise<void> {
        return mongoose.disconnect();
    }
}

export const mongoConn = new MongoDb();