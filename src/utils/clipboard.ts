export const writeTextOnClipBoard = (text: string) => {
    void navigator.clipboard.writeText(text);
};
