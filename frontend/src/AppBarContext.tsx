import {createContext, useContext, useState, useCallback, type ReactNode} from "react";

export type AppBarContextAction = { actionName: string; link: string }

const INITIAL_ACTION: AppBarContextAction = {
    actionName: "Мои объявления",
    link: "/my_trips"
}

type AppBarContextValue = {
    action: AppBarContextAction;
    setAction: (action: AppBarContextAction) => void;
    reset: () => void;
};

const AppBarContext = createContext<AppBarContextValue | undefined>(undefined);

export function AppBarProvider({children}: { children: ReactNode }) {
    const [action, setActionState] = useState<AppBarContextAction>(INITIAL_ACTION);

    const setAction = useCallback((action: AppBarContextAction) => {
        setActionState(action);
    }, []);

    const reset = useCallback(() => setActionState(INITIAL_ACTION), []);

    return (
        <AppBarContext.Provider value={{action, setAction, reset}}>
            {children}
        </AppBarContext.Provider>
    );
}

export function useAppBarAction() {
    const ctx = useContext(AppBarContext);
    if (!ctx) {
        throw new Error("useAppBarAction must be used within an AppBarProvider");
    }
    return ctx;
}
