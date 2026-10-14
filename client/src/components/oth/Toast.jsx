import { useEffect } from "react";

const TYPES = {
  info: "alert-info",
  success: "alert-success",
  error: "alert-error",
};

function Toast({ message, type = "info", onClose, duration = 3000 }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="toast toast-center toast-top z-9999">
      <div className={`alert ${TYPES[type]}`}>
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Toast;