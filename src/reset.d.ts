import "@total-typescript/ts-reset";

interface HTMLMediaElement {
	setSinkId?(sinkId: string): Promise<void>;
}
