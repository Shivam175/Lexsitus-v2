// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite/client" />
const KEY_PREFIX = "VITE_";

interface ImportMetaEnv extends Record<string, any> {
    readonly VITE_BASE_URL: string;
    readonly VITE_API_URL: string;
    readonly VITE_WEB_BASE_URL: string;
    readonly VITE_CONSOLE_LOGGING: boolean;
}

interface ImportMeta extends Record<string, any> {
    readonly env: ImportMetaEnv;
}

const config = {
    get(key: string) {
        const prefixedKey = `${KEY_PREFIX}${key}`;
         
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return (import.meta as unknown as ImportMeta).env[prefixedKey];
    },
};

export default config;
