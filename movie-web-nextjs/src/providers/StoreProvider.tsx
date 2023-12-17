"use client";
import { Provider } from "react-redux";
import { store } from "@/lib/store";

export default function StoreProvider({ children }: React.PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
