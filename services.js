var frame = window.parent.document.getElementById(window.frameElement.getAttribute("ID"));
var widget = frame && frame.closest(".widget-html");
if(widget && window.parent.location.host === "gentlewolfdogtraining.com"){
widget.style.display='none';
}

const elements = window.parent.document.getElementsByClassName("custom-code");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }

var customStyle = document.getElementById("custom-style");
if(customStyle !== undefined){
window.parent.document.body.appendChild(customStyle);
}else{
console.error("No custom style found")
}
