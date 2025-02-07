import { create } from "zustand";

export type setSession = {
  url: string;
  token: string;
};

export type Session = {
  id: string;
  name: string;
  token: string;
};

type SessionStore = {
  session: Session | null;
};

type SessionActions = {
  setSession: (session: setSession) => void;
};

export const useSessionStore = create<SessionStore & SessionActions>((set) => ({
  session: null,
  setSession: (newSession) => {
    const id = "temp"; //FIX: add id gen here
    set((prev) => ({
      ...prev,
      session: {
        id,
        name: newSession.url,
        token: newSession.token,
      },
    }));
  },
}));
