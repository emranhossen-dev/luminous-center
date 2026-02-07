"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useAuth } from "./AuthContext";

const STORAGE_KEY = "luminous_enrollments";

export interface EnrollmentRecord {
  courseSlug: string;
  courseId: string;
  courseTitle: string;
  projectLabel: string;
  enrolledAt: string;
  method: "govt" | "payment";
  tranId?: string;
}

type EnrollmentsByUser = Record<string, Record<string, Omit<EnrollmentRecord, "courseSlug">>>;

function loadEnrollments(): EnrollmentsByUser {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveEnrollments(data: EnrollmentsByUser) {
  if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

interface EnrollmentContextType {
  enrollments: EnrollmentRecord[];
  addEnrollment: (record: Omit<EnrollmentRecord, "enrolledAt">) => void;
  isEnrolled: (courseSlug: string) => boolean;
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

export function EnrollmentProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [data, setData] = useState<EnrollmentsByUser>({});

  useEffect(() => {
    setData(loadEnrollments());
  }, [user?.id]);

  const enrollments: EnrollmentRecord[] = user
    ? Object.entries(data[user.id] || {}).map(([courseSlug, rec]) => ({
        ...rec,
        courseSlug,
      }))
    : [];

  const addEnrollment = useCallback(
    (record: Omit<EnrollmentRecord, "enrolledAt">) => {
      if (!user) return;
      setData((prev) => {
        const next = { ...prev };
        next[user.id] = { ...(next[user.id] || {}) };
        next[user.id][record.courseSlug] = {
          courseId: record.courseId,
          courseTitle: record.courseTitle,
          projectLabel: record.projectLabel,
          enrolledAt: new Date().toISOString(),
          method: record.method,
          tranId: record.tranId,
        };
        saveEnrollments(next);
        return next;
      });
    },
    [user]
  );

  const isEnrolled = useCallback(
    (courseSlug: string) => {
      if (!user) return false;
      return Boolean(data[user.id]?.[courseSlug]);
    },
    [user, data]
  );

  return (
    <EnrollmentContext.Provider value={{ enrollments, addEnrollment, isEnrolled }}>
      {children}
    </EnrollmentContext.Provider>
  );
}

export function useEnrollment() {
  const ctx = useContext(EnrollmentContext);
  if (ctx === undefined) throw new Error("useEnrollment must be used within EnrollmentProvider");
  return ctx;
}
