import ITunargProtocol from "./protocol";

type actionFunction = (content?: any)=>{};

export default abstract class Client{
    ws: WebSocket;
    private readonly _actions: {
        [K in any]: actionFunction;
    } = {};
    get actions() {
        return this._actions;
    }
    constructor(host: string){
        const ws = new WebSocket(host);
        this.ws = ws;

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
    addAction(type: string, act: actionFunction){
        this._actions[type] = act;
    }
}
