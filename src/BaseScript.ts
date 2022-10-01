export default class BaseScript {
    private name: string;

    constructor(name: string){
        this.name = name;
    }

    init() {
        if(!window.customScript) window.customScript = {};
        if (window.customScript[this.name]) {
            if (window.customScript[this.name].cleanup) window.customScript[this.name].cleanup();
            delete window.customScript[this.name];
        }
        window.customScript[this.name] = this;
    } 

    cleanup() {

    }
    
}