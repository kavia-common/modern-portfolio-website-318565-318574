import { useCallback, useMemo, useState } from "react";

/**
 * Small toast hook (no dependency) with automatic dismissal.
 */
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback((toast) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const next = {
      id,
      title: toast.title || "Notice",
      message: toast.message || "",
      timeoutMs: typeof toast.timeoutMs === "number" ? toast.timeoutMs : 3200
    };

    setToasts((prev) => [next, ...prev].slice(0, 3));

    window.setTimeout(() => removeToast(id), next.timeoutMs);
  }, [removeToast]);

  return useMemo(() => ({ toasts, pushToast }), [toasts, pushToast]);
}
