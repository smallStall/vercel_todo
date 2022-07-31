import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { supabaseClient } from "../../libs/supabaseClient";


type UserContextType = {
  user: User | null;
  session: Session | null;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * sessionとuserのコンテキストを提供する
 * また、authの状態が変化した際に/api/authにSupabaseからのsessionをPOSTする
 * @param {{ children: ReactChild }} { children }
 */
export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    const session = supabaseClient.auth.session();
    setSession(session);
    setUser(session?.user ?? null);

    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        setSession(session);
        setUser(session?.user ?? null);
        await fetch('/api/auth', {
          method: 'POST',
          body: JSON.stringify({ event, session }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
    );
    return () => {
      listener?.unsubscribe();
    };
  }, []);

  const value: UserContextType = { user, session };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
