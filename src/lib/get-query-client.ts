import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

// This is needed to prevent multiple instances of QueryClient during SSR
export const getQueryClient = cache(() => new QueryClient());
