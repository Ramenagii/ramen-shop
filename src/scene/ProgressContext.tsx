import { createContext, useContext, useState, type ReactNode } from "react";

interface ProgressState {
  progress: number;
  done: boolean;
}

const ProgressCtx = createContext<ProgressState>({ progress: 0, done: false });
const SetProgressCtx = createContext<React.Dispatch<React.SetStateAction<ProgressState>>>(() => {});

export function useIntroProgress() {
  return useContext(ProgressCtx);
}
export function useSetIntroProgress() {
  return useContext(SetProgressCtx);
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<ProgressState>({ progress: 0, done: false });
  return (
    <SetProgressCtx.Provider value={setValue}>
      <ProgressCtx.Provider value={value}>
        {children}
      </ProgressCtx.Provider>
    </SetProgressCtx.Provider>
  );
}
