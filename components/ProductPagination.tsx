"use client";

import React, { useEffect, useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface ProductPaginationProps {
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  scrollTargetId?: string;
  className?: string;
}

export function useResponsiveItemsPerPage() {
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(8); // Mobile: 8 products per page
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(16); // Tablet: 16 products per page
      } else {
        setItemsPerPage(20); // Desktop: 20 products per page
      }
    };

    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  return itemsPerPage;
}

export default function ProductPagination({
  totalItems,
  currentPage,
  onPageChange,
  scrollTargetId = "product-catalog-grid",
  className = "",
}: ProductPaginationProps) {
  const itemsPerPage = useResponsiveItemsPerPage();
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // Ensure current page is within valid range
  const validPage = Math.min(Math.max(1, currentPage), totalPages);

  const startIndex = totalItems === 0 ? 0 : (validPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(validPage * itemsPerPage, totalItems);

  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages || page === validPage) return;
    onPageChange(page);

    // Scroll to top of catalog section smoothly
    const element = document.getElementById(scrollTargetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  // Generate pagination items with ellipses
  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (validPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (validPage >= totalPages - 3) {
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "...", validPage - 1, validPage, validPage + 1, "...", totalPages];
  }, [totalPages, validPage]);

  if (totalItems <= itemsPerPage && totalPages <= 1) {
    return (
      <div className={`py-6 flex justify-center text-xs font-mono text-[#747474] ${className}`}>
        Showing all {totalItems} stone specimens
      </div>
    );
  }

  return (
    <div className={`py-10 border-t border-[#e5e5e5] bg-white flex flex-col items-center justify-center gap-3 px-4 sm:px-6 ${className}`}>
      {/* Pagination Controls Centered */}
      <div className="flex items-center justify-center gap-1 sm:gap-1.5 select-none flex-wrap">
        {/* First Page */}
        <button
          type="button"
          onClick={() => handlePageClick(1)}
          disabled={validPage === 1}
          className="hidden sm:flex w-8 h-8 rounded-[4px] border border-[#252422]/20 hover:border-[#252422] bg-white hover:bg-neutral-50 text-[#252422] disabled:opacity-30 disabled:pointer-events-none items-center justify-center transition-colors cursor-pointer"
          aria-label="First page"
          title="First page"
        >
          <ChevronsLeft className="w-3.5 h-3.5" />
        </button>

        {/* Prev Page */}
        <button
          type="button"
          onClick={() => handlePageClick(validPage - 1)}
          disabled={validPage === 1}
          className="px-2.5 sm:px-3 h-8 rounded-[4px] border border-[#252422]/20 hover:border-[#252422] bg-white hover:bg-neutral-50 text-[#252422] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-1 text-xs font-mono font-medium transition-colors cursor-pointer"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Page numbers */}
        {pageNumbers.map((p, idx) => {
          if (p === "...") {
            return (
              <span key={`ellipsis-${idx}`} className="w-8 h-8 flex items-center justify-center text-xs font-mono text-[#747474]">
                ...
              </span>
            );
          }

          const pageNum = Number(p);
          const isActive = pageNum === validPage;

          return (
            <button
              key={`page-${pageNum}`}
              type="button"
              onClick={() => handlePageClick(pageNum)}
              className={`w-8 h-8 sm:w-9 sm:h-8 rounded-[4px] text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center ${
                isActive
                  ? "bg-[#252422] text-white shadow-xs scale-105"
                  : "bg-white hover:bg-neutral-50 text-[#252422] border border-[#252422]/20 hover:border-[#252422]"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next Page */}
        <button
          type="button"
          onClick={() => handlePageClick(validPage + 1)}
          disabled={validPage === totalPages}
          className="px-2.5 sm:px-3 h-8 rounded-[4px] border border-[#252422]/20 hover:border-[#252422] bg-white hover:bg-neutral-50 text-[#252422] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-1 text-xs font-mono font-medium transition-colors cursor-pointer"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* Last Page */}
        <button
          type="button"
          onClick={() => handlePageClick(totalPages)}
          disabled={validPage === totalPages}
          className="hidden sm:flex w-8 h-8 rounded-[4px] border border-[#252422]/20 hover:border-[#252422] bg-white hover:bg-neutral-50 text-[#252422] disabled:opacity-30 disabled:pointer-events-none items-center justify-center transition-colors cursor-pointer"
          aria-label="Last page"
          title="Last page"
        >
          <ChevronsRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Information text Centered */}
      <div className="text-xs font-mono text-[#747474] text-center">
        Showing <span className="font-semibold text-[#241919]">{startIndex}–{endIndex}</span> of{" "}
        <span className="font-semibold text-[#241919]">{totalItems}</span> stone specimens (Page {validPage} of {totalPages})
      </div>
    </div>
  );
}
