

export const debounce = (callback: (...args: any[]) => void, wait: number) => {
    let timeout: any = null;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback(...args);
        }, wait);
    };
}