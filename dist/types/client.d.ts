export default abstract class Client {
    ws: WebSocket;
    protected abstract _actions: {
        [K in any]: Function;
    };
    constructor(host: string);
}
//# sourceMappingURL=client.d.ts.map