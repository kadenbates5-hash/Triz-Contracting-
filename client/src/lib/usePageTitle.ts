import { useEffect } from "react";

export function usePageTitle(title: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} | Triz Contracting` : "Triz Contracting";
    return () => {
      document.title = previous;
    };
  }, [title]);
}
