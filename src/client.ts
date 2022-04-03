import ITunargProtocol from "./protocol";

export default abstract class Client{
    ws: WebSocket;
    host: string | URL;
    private readonly _actions: {
        [K in any]: Function;
    } = {};
    get actions() {
        return this._actions;
    }
    constructor(host: string | URL, actions?: {[K in any]: Function}){
        const ws = new WebSocket(host);
        this.ws = ws;
        this.host = host;

        for(let type in actions){
            this.addAction(type, actions[type]);
        }

        this._initWebSocket(ws);
    }
    private _connectWebSocket(host: string | URL){
        const ws = new WebSocket(host);
        this.ws = ws;
        this._initWebSocket(ws);
    }
    private _initWebSocket(ws: WebSocket){
        this._addMessageEvent(ws);
        this._addCloseEvent(ws);
    }
    private _addMessageEvent(ws: WebSocket){
        ws.addEventListener('open', ()=>{
            ws.addEventListener('message', (mes)=>{
                const json: ITunargProtocol = JSON.parse(mes.data);
    
                const type = json.type;
                const content = json.content;
                
                this.doAction(type, content);
            });
        });
    }
    private _addCloseEvent(ws: WebSocket){
        ws.addEventListener('close', (e: Event)=>{
            console.log('closed! i will connect again...');
            this._connectWebSocket(this.host);
        });
    }
    send(type: string, content: any){
        const ws = this.ws;
        if(ws.readyState == ws.OPEN){

            ws.send(JSON.stringify({
                type: type,
                content: content
            }));
        }
    }
    addAction(type: string, act: Function){
        this._actions[type] = act;
    }
    doAction(type: string, content: any){
        const ws = this.ws;
        if(ws.readyState == ws.OPEN){
            this._actions[type](content);
        }
    }
}
