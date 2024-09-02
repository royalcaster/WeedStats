import { Colors } from "@/constants/Colors";
import { createContext } from "react";

interface UserContextType {
    user: User | null,
    setUser: (user: User | null) => void
}

export const UserContext = createContext<UserContextType>({user: null, setUser: () => null});