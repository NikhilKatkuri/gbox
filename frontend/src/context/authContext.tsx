"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ValueType = string;

interface AuthContextType {
  value: ValueType;
  setValue: (val: ValueType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState<ValueType>("");
  return (
    <AuthContext.Provider value={{ value, setValue }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
