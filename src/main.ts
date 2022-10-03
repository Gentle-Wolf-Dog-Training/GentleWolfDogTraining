function inject(target: Window){
    const STACK_TRACE_SPLIT_PATTERN = /(?:Error)?\n(?:\s*at\s+)?/;
    const STACK_TRACE_ROW_PATTERN1 = /^.+?\s\((.+?):\d+:\d+\)$/;
    const STACK_TRACE_ROW_PATTERN2 = /^(?:.*?@)?(.*?):\d+(?::\d+)?$/;

    const getFileParams = (): URLSearchParams | undefined => {
        const stack = new Error().stack;
        const row = stack.split(STACK_TRACE_SPLIT_PATTERN, 2)[1];
        const [, url] = row.match(STACK_TRACE_ROW_PATTERN1) || row.match(STACK_TRACE_ROW_PATTERN2) || [];
        if (!url) {
            console.warn("Something went wrong. This probably means that the browser you are using is non-modern. You should debug it!");
            return undefined;
        }
        try {
            const urlObj = new URL(url);
            return urlObj.searchParams;
        } catch (e) {
            console.warn(`The URL '${url}' is not valid.`);
        }
        return undefined;
    };
    const params = getFileParams();
    if (params && params.has("script")) {
        const scr = params.get("script");
        const CUSTOM_CLASS = `custom-code-${scr}`;
        const isProd = target.location.host === "gentlewolfdogtraining.com";
        const URL_BASE = `//code.gentlewolfdogtraining.com/${isProd ? "prod" : "dev"}/${scr}`;


        let scriptURL = `${URL_BASE}/script.js`;
        let cssURL = `${URL_BASE}/style.min.css`;
        if (!isProd) {
            scriptURL = scriptURL + `?v=${Date.now()}`;
            cssURL = cssURL + `?v=${Date.now()}`;
        }

        const elements = target.document.getElementsByClassName(CUSTOM_CLASS);
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
        const scriptEle = target.document.createElement("script");
        scriptEle.src = scriptURL;
        scriptEle.classList.add(CUSTOM_CLASS);

        const cssEle = target.document.createElement("link");
        cssEle.type = "text/css";
        cssEle.rel = "stylesheet";
        cssEle.href = cssURL;
        cssEle.classList.add(CUSTOM_CLASS);

        target.document.body.appendChild(cssEle);
        target.document.body.appendChild(scriptEle);
    }
}

((target: Window) => {
   inject(target.parent || target) //navigate to parent if called within an iframe
   var frame = target.parent.document.getElementById(target.frameElement.getAttribute("ID"));
    var widget = frame && frame.closest(".widget-html") as HTMLElement;
    if(target && target.parent.location.host === "gentlewolfdogtraining.com"){
        widget.style.display = 'none';
    }
})(window);
