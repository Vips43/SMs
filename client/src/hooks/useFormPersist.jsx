import { useEffect } from "react";

export function useFormPersist(key, watch, setValue, options = {}) {
  const { excludeFields = [], enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;

    try {
      const savedData = localStorage.getItem(key);

      if (savedData) {
        const parsedData = JSON.parse(savedData);

        Object.entries(parsedData).forEach(([field, value]) => {
          if (!excludeFields.includes(field)) {
            setValue(field, value, {
              shouldDirty: true,
            });
          }
        });
      }
    } catch (error) {
      console.error("Error restoring form:", error);
    }
  }, [key, setValue, enabled]);

  useEffect(() => {
    if (!enabled) return;

    const subscription = watch((values) => {
      try {
        const data = { ...values };

        excludeFields.forEach((field) => {
          delete data[field];
        });

        localStorage.setItem(key, JSON.stringify(data));
      } catch (error) {
        console.error("Error persisting form:", error);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, key, enabled, excludeFields]);

  const clearPersistedData = () => {
    localStorage.removeItem(key);
  };

  return { clearPersistedData };
}