import { create } from "zustand";

export const useProductsStore = create((set) => ({
    products: [],
    updateProducts: (products: []) => {
        set({ products: products });
    },
}));

export const useLoginStore = create((set) => ({
    user: "admin",
    updateUser: (user: string) => {
        set({ user: user });
    },
}));

export const useSettingsStore = create((set) => ({
    profit1: null,
    updateProfit: (profit: number) => {
        set({ profit1: profit });
    },
    distributorsNames: [],
    updateDistributorsNames: (distributorsNames: any) => {
        set({ distributorsNames: distributorsNames });
    },
    companyNames: [],
    updateCompanyNames: (companyNames: any) => {
        set({ companyNames: companyNames });
    },
    productSizes: [],
    updateProductSizes: (productSizes: any) => {
        set({ productSizes: productSizes });
    },
}));
