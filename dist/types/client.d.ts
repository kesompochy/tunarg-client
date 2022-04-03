export default abstract class Client {
    ws: WebSocket;
    host: string | URL;
    private readonly _actions;
    get actions(): {
        [x: string]: Function;
        [x: number]: Function;
        [x: symbol]: Function;
    };
    constructor(host: string | URL, actions?: {
        [K in any]: Function;
    });
    private _connectWebSocket;
    private _initWebSocket;
    private _addMessageEvent;
    private _addCloseEvent;
    send(type: string, content: any): void;
    addAction(type: string, act: Function): void;
    doAction(type: string, content: any): void;
}
//# sourceMappingURL=client.d.ts.map