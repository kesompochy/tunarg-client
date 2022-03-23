import ITunargProtocol from "./protocol";

export default abstract class Client{
    ws: WebSocket;
    protected abstract _actions: {
        [K in any]: Function;
    };
    constructor(host: string){
        const ws = new WebSocket(host);
        this.ws = ws;

        ws.addEventListener('message', (mes)=>{
            const json: ITunargProtocol = JSON.parse(mes.data);

            const type = json.type;
            const data = json.content;
            
            this._actions[type](data);
        })
    }
}
