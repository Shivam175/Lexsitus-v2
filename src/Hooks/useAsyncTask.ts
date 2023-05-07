import { useState } from "react";

export enum TStatus {
    IDLE = "IDLE",
    PROCESSING = "PROCESSING",
    ERROR = "ERROR",
    SUCCESS = "SUCCESS",
}

function useAsyncTask<T extends unknown[], R = unknown>(
    task: (...args: T) => Promise<R | undefined>,
): {
        run: (...arg: T) => Promise<R | undefined>;
        status: TStatus;
        message: string;
        reset: () => void;
    } {
    const [status, setStatus] = useState<TStatus>(TStatus.IDLE);
    const [message, setMessage] = useState("");
    const run = async (...arg: T) => {
        setStatus(TStatus.PROCESSING);
        try {
            const resp: R | undefined = await task(...arg);
            setStatus(TStatus.SUCCESS);
            return resp;
        } catch (error) {
            const _error = error as any;
            const message = _error?.response?.data?.error?.message || _error.message;
            setMessage(message);
            setStatus(TStatus.ERROR);
            throw error;
        }
    };

    const reset = () => {
        setMessage("");
        setStatus(TStatus.IDLE);
    };

    return {
        run,
        status,
        message,
        reset,
    };
}

export default useAsyncTask;
