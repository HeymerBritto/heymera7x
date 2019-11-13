export interface IConn {
    createConnection(): Promise<void>;
    disconnect(): Promise<void>;
}