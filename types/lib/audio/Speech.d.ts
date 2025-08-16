declare function startSpeakAudio(): void;
export declare function cancelSpeakAudio(): void;
declare function startSpeakText(text: string): void;
declare function cancelSpeakText(): void;
declare const Speech: {
    startSpeakAudio: typeof startSpeakAudio;
    cancelSpeakAudio: typeof cancelSpeakAudio;
    startSpeakText: typeof startSpeakText;
    cancelSpeakText: typeof cancelSpeakText;
};
export default Speech;
