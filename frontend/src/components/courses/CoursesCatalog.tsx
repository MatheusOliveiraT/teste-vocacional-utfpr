"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { CourseFilterButton } from "@/components/courses/CourseFilterButton";
import { CourseCard } from "@/components/courses/CourseCard";
import { CourseEmptyState } from "@/components/courses/CourseEmptyState";
import { COURSE_CATALOG, COURSE_FILTERS } from "@/data/courses";
import { CourseCategory } from "@/types";

export function CoursesCatalog() {
  const [category, setCategory] = useState<"all" | CourseCategory>("all");
  const [query, setQuery] = useState("");

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return COURSE_CATALOG.filter((course) => {
      const matchesCategory =
        category === "all" || course.category === category;
      const matchesQuery =
        !normalizedQuery ||
        [
          course.title,
          course.degreeType,
          course.description,
          course.turno ?? "",
          ...course.focusTags,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  function handleReset() {
    setCategory("all");
    setQuery("");
  }

  return (
    <>
      <div
        id="catalogo-cursos"
        className="w-full bg-surface-card rounded-xl p-space-md shadow-sm"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-space-md">
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {COURSE_FILTERS.map((filter) => (
              <CourseFilterButton
                key={filter.category}
                label={filter.label}
                icon={filter.icon}
                count={filter.count}
                active={category === filter.category}
                onClick={() => setCategory(filter.category)}
              />
            ))}
          </div>

          <div className="relative w-full lg:w-80">
            <Icon
              name="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-[20px] pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar curso ou interesse..."
              className="w-full pl-10 pr-4 py-2 bg-surface-track text-text-high-contrast placeholder:text-text-muted rounded-lg font-body-sm text-body-sm focus:outline-none focus:bg-surface-bright transition-colors"
            />
          </div>
        </div>
      </div>

      <section className="w-full bg-surface-base pt-space-lg pb-space-2xl">
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <CourseEmptyState onReset={handleReset} />
        )}
      </section>
    </>
  );
}
