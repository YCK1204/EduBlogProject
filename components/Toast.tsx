"use client";

import React, { useState, useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  isVisible: boolean;
  onHide: () => void;
  duration?: number;
}

export default function Toast({ message, type, isVisible, onHide, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onHide, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onHide]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-100 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300";
      case "error":
        return "bg-red-100 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-700 dark:text-red-300";
      case "info":
      default:
        return "bg-blue-100 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-300";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-green-600 dark:text-green-400">
            <path d="M13.5 4.5L6 12l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case "error":
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-red-600 dark:text-red-400">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 5v3M8 11h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case "info":
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-blue-600 dark:text-blue-400">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 7v4M8 5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
    }
  };

  return (
    <div 
      className={`fixed top-4 right-4 z-50 max-w-sm w-full transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
      }`}
    >
      <div className={`rounded-lg border px-4 py-3 shadow-lg ${getToastStyles()}`}>
        <div className="flex items-center gap-2">
          {getIcon()}
          <span className="text-sm font-medium">{message}</span>
          <button
            onClick={onHide}
            className="ml-auto text-current opacity-70 hover:opacity-100 transition-opacity"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M4 12L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Toast hook for easy usage
export function useToast() {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
    isVisible: boolean;
  }>({
    message: "",
    type: "info",
    isVisible: false,
  });

  const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return {
    toast,
    showToast,
    hideToast,
  };
}