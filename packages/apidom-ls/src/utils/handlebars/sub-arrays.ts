// Source ChatGPT
export default function subArrays(arr: string[]): string[][] {
    const result: string[][] = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            result.push(arr.slice(i, j + 1));
        }
    }
    return result;
}
