import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Ellipsis } from "lucide-react";
import { useMarkAttandence } from "@/hooks/empHooks";

const MENU_W = 144;
const MENU_H = 170;

const OPTIONS = [
  { value: "Present", label: "🟢 Present", color: "btn-success" },
  { value: "Absent", label: "🔴 Absent", color: "btn-error" },
  { value: "Half-day", label: "🟡 Half-day", color: "btn-warning" },
];

function MarkAttendence({ user }) {
  const btnRef = useRef(null);
  const [pos, setPos] = useState(null); // null = closed

  const { mutateAsync: mark, } = useMarkAttandence();

  const close = () => setPos(null);
  const toggle = (e) => {
    e.stopPropagation();
    if (pos) return close();

    const r = btnRef.current.getBoundingClientRect();
    const openUp = window.innerHeight - r.bottom < MENU_H;

    setPos({
      left: Math.max(8, r.left - MENU_W),
      ...(openUp
        ? { bottom: window.innerHeight - r.top + 8 }
        : { top: r.top }),
    });
  };

  const handleMark = async (e, value) => {
    e.stopPropagation();
    console.log(`Marking ${user?.firstname || "User"} as: ${value}, ${user._id}`);
    await mark({ status: value, id: user._id });
    close();
  };

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        className="btn btn-ghost btn-sm btn-square text-slate-600"
      >
        <Ellipsis className="w-5 h-5" />
      </button>

      {pos &&
        createPortal(
          <>
          
            <div className="fixed inset-0 z-9998" onClick={close} />

            <ul
              style={{ position: "fixed", width: MENU_W, ...pos }}
              className="menu p-2 gap-1.5 z-9999 bg-base-100 rounded-xl border border-base-200 shadow-2xl"
            >
              <li className="menu-title uppercase">Attendance</li>
              {OPTIONS.map(({ value, label, color }) => (
                <li key={value}>
                  <button
                    type="button"
                    onClick={(e) => handleMark(e, value)}
                    className={`btn btn-md ${color} text-white font-semibold justify-start w-full`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </>,
          document.body
        )}
    </>
  );
}

export default MarkAttendence;