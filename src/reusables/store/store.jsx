import { create } from 'zustand'
import { devtools, persist } from "zustand/middleware";

export const useCredStore = create()(
  devtools (
    persist((set, ) => ({
      token: "",
      setToken: (token) => set({ token })
    }), {
      name: "cred-store"
    })
  )
);