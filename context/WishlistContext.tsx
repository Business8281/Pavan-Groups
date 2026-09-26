"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { ProductStone, getProductById, PRODUCTS_DATABASE } from "@/lib/productsData";

interface WishlistContextType {
  wishlistIds: string[];
  wishlistItems: ProductStone[];
  wishlistCount: number;
  isWishlisted: (id: string) => boolean;
  toggleWishlist: (id: string, e?: React.MouseEvent) => void;
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  openWishlistDrawer: () => void;
  closeWishlistDrawer: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = "pavan_stones_shortlist_v1";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setWishlistIds(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load wishlist from localStorage:", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage when wishlist changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch (e) {
      console.error("Failed to save wishlist to localStorage:", e);
    }
  }, [wishlistIds, isInitialized]);

  const isWishlisted = useCallback(
    (id: string) => {
      return wishlistIds.includes(id);
    },
    [wishlistIds]
  );

  const addToWishlist = useCallback((id: string) => {
    setWishlistIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const removeFromWishlist = useCallback((id: string) => {
    setWishlistIds((prev) => prev.filter((item) => item !== id));
  }, []);

  const toggleWishlist = useCallback((id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const clearWishlist = useCallback(() => {
    setWishlistIds([]);
  }, []);

  const openWishlistDrawer = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const closeWishlistDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  // Compute full ProductStone objects for valid ids
  const wishlistItems = useMemo(() => {
    return wishlistIds
      .map((id) => getProductById(id) || PRODUCTS_DATABASE.find((p) => p.id === id))
      .filter((p): p is ProductStone => Boolean(p));
  }, [wishlistIds]);

  const wishlistCount = wishlistIds.length;

  const value = useMemo(
    () => ({
      wishlistIds,
      wishlistItems,
      wishlistCount,
      isWishlisted,
      toggleWishlist,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
      isDrawerOpen,
      setIsDrawerOpen,
      openWishlistDrawer,
      closeWishlistDrawer,
    }),
    [
      wishlistIds,
      wishlistItems,
      wishlistCount,
      isWishlisted,
      toggleWishlist,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
      isDrawerOpen,
      openWishlistDrawer,
      closeWishlistDrawer,
    ]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
