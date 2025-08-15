declare function startSpeakAudio(): void;
declare function cancelSpeakAudio(): void;
declare function startSpeakText(text: string): void;
declare function cancelSpeakText(): void;
declare const _default: {
    startSpeakAudio: typeof startSpeakAudio;
    cancelSpeakAudio: typeof cancelSpeakAudio;
    startSpeakText: typeof startSpeakText;
    cancelSpeakText: typeof cancelSpeakText;
};
export default _default;
