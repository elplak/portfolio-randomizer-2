export function randomChoice<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function randomBool(prob: number = 0.5): boolean {
    return Math.random() < prob;
}