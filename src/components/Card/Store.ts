import create from 'zustand'
import { CardType } from './type'

export interface Store {
  cards: CardType[]
  setCards: (i: number) => void
  focus: number
  flip: (i: number) => void
  setFocus: (i: number) => void
  bump: (i: number) => void
}

export const useStore = create<Store | any>((set: any) => ({
  cards: [],
  focus: 0,
  setCards: (i: number) => {
    set((state: any) => {
      state.setFocus(0)
      return {
        cards: Array.apply(null, { length: i } as number[]).map(() => ({
          flip: false,
        })),
      }
    })
  },
  setFocus: (i: number) => set(() => ({ focus: i })),
  flip: (i: number) =>
    set((state: any) => {
      state.bump(i)
      const cards = state.cards
      cards[i].flip = !cards[i].flip
      return { cards }
    }),
  bump: (i: number) => {
    set((state: any) => {
      const cards = state.cards
      cards[i].lift = 4.5
    })
    setTimeout(
      () =>
        set((state: any) => {
          const cards = state.cards
          cards[i].lift = 0
        }),
      100,
    )
  },
}))
