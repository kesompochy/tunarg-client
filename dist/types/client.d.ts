export default abstract class Client {
    ws: WebSocket;
    private readonly _actions;
    get actions(): {
        [x: string]: Function;
        [x: number]: Function;
        [x: symbol]: Function;
    };
    constructor(host: string, actions?: {
        [K in any]: Function;
    });
    send(type: string, content: any): void;
    addAction(type: string, act: Function): void;
}
//# sourceMappingURL=client.d.ts.map