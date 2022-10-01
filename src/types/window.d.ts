import Script from "../BaseScript";
declare global {
    interface Window {
        customScript: Record<string, Script>
    }
}