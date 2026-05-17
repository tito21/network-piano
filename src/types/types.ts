
export interface Note {
    note: string;
    startTime: number;
    duration: number;
    attackTime: number;
    releaseTime: number;
}

export interface NetworkData {
    contentType: string;
    startTime: number;
    requestTime: number;
    waitingTime: number;
    downLoadTime: number;
}

