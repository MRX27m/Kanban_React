import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SelectWorkSpace } from "./components/SelectWorkSpace";
import { WorkSpace } from "./components/WorkSpace";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30000 } },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/SelectWorkpres" element={<SelectWorkSpace />} />
        <Route path="/workpres/:id" element={<WorkSpace />} />
        <Route path="*" element={<SelectWorkSpace />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>,
);
