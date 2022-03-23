import ITunargProtocol from "./protocol";

export default abstract class Client{
    ws: WebSocket;
    private readonly _actions: {
        [K in any]: Function;
    } = {};
    get actions() {
        return this._actions;
    }
    constructor(host: string, actions?: {[K in any]: Function}){
        const ws = new WebSocket(host);
        this.ws = ws;

        for(let type in actions){
            this.addAction(type, actions[type]);
        }

        ws.addEventListener('message', (mes)=>{
            const json: ITunargProtocol = JSON.parse(mes.data);

            const type = json.type;
            const content = json.content;
            
            this._actions[type](content);
        })
    }
    send(type: string, content: any){
        this.ws.send(JSON.stringify({
            type: type,
            content: content
        }));
    }
    addAction(type: string, act: Function){
        this._actions[type] = act;
    }
}
