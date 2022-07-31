import {
  useContext,
} from "react";
import { UserContext } from "./context/UserContext";


export /**
 * 
 *
 * @returns {}
 */
const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUserはUserContextProviderの間で使ってください。`);
  }
  return context;
};
