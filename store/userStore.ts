import { User } from "@/interfaces/objects";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
	user: User | null;
}

interface Actions {
	setUser: (user: User) => void;
	removeUser: () => void;
}

export const userStore = create<State & Actions>()(
	persist(
		(set) => ({
			user: null,
			setUser: (user) => set({ user }),
			removeUser: () => set({ user: null }),
		}),
		{ name: "userStore" }
	)
);