declare type actionFunction = (content?: any) => {};
export default abstract class Client {
    ws: WebSocket;
    private readonly _actions;
    get actions(): {
        [x: string]: actionFunction;
        [x: number]: actionFunction;
        [x: symbol]: actionFunction;
    };
    constructor(host: string);
    send(type: string, content: any): void;
    addAction(type: string, act: actionFunction): void;
}
export {};
//# sourceMappingURL=client.d.ts.map