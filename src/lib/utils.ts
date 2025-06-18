import { clsx } from "clsx";
import { twJoin } from "tailwind-merge";


export const cn = (...inputs: string[]) => {
    return twJoin(clsx(inputs));
};