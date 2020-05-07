export interface Stock {
    symbol: string,
    company: string,
    initialPrice: number,
    amount: number,
    distribution: string,
    maxChangePercentage: number
}