"use client"
import { QueryClient, QueryClientProvider as QCP } from "@tanstack/react-query"
import { ReactNode } from "react";

const client = new QueryClient();

function Provider({ children }: { children: ReactNode }) {
  return (
    <QCP client={client}>
      {children}
    </QCP>
  )
}

export default Provider