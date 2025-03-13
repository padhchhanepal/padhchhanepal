
import React from "react";

export function CategoryLoadingSkeleton() {
  return (
    <div className="space-y-12">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="space-y-4">
          <div className="h-8 w-48 bg-muted rounded animate-pulse"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(5)].map((_, bookIndex) => (
              <div key={bookIndex} className="h-96 rounded-lg bg-muted animate-pulse"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
