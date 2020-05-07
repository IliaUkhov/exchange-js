import { Stock } from './stock'

export interface Broker {
  name: string,
  balance: number,
  stocks: Stock[]
}