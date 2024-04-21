import { createContext, useContext } from "react";

const UserContext = createContext<any | null>(null);

export default UserContext;
