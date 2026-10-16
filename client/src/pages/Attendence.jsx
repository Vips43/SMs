import ShowUserAttendence from "@/components/employee/ShowUserAttendence";
import { useGetAttendenceQuery, useMarkAttandence } from "@/hooks/empHooks";
import useAuthStore from "@/store/authStore";
import { dateFormat } from "@/utils/helperfn";
import toast from "react-hot-toast";

const getStatusStyle = (val) => {
  switch (val) {
    case "Present":
      return {
        btn: "btn-accent shadow-emerald-500/30 hover:shadow-emerald-500/50",
        ring: "bg-emerald-500/15",
        icon: "✓",
        label: "Marked (Present)",
      };
    case "Absent":
      return {
        btn: "btn-error shadow-rose-500/30 hover:shadow-rose-500/50",
        ring: "bg-rose-500/15",
        icon: "✘",
        label: "Marked (Absent)",
      };
    case "Half-day":
      return {
        btn: "btn-warning shadow-amber-500/30 hover:shadow-amber-500/50",
        ring: "bg-amber-500/15",
        icon: "½",
        label: "Marked (Half-Day)",
      };
    default:
      return {
        btn: "btn-primary shadow-primary/30 hover:shadow-primary/50",
        ring: "bg-primary/15",
        icon: "👆",
        label: "Tap to Check-In",
      };
  }
};

function Attendence() {
  const { user } = useAuthStore((state) => state.user);

  const {
    mutateAsync: marking,
    isPending: isMarking,
    data,
  } = useMarkAttandence();

  const { data: attendence, isFetching: loadingAttdnc } = useGetAttendenceQuery(
    user?.id
  );
  const history = attendence?.user || {};

  const handleMark = async () => {
    try {
      const res = await marking();
      toast.success(res?.msg || "Attendance marked successfully");
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.msg || error?.message || "Internal server error"
      );
    }
  };

  return (
    <div className="relative p-6 md:p-8 bg-base-100 rounded-2xl shadow-xs border border-base-200/60 flex flex-col gap-10">
      {["admin", "operator"].includes(user?.role) && (
        <ShowUserAttendence users={attendence?.users} />
      )}

      <ShowEmpAttendence
        data={data}
        handleMark={handleMark}
        isMarking={isMarking}
        loadingAttdnc={loadingAttdnc}
        history={history}
      />
    </div>
  );
}

export default Attendence;

function ShowEmpAttendence({ handleMark, isMarking, loadingAttdnc, history }) {
  const statusConfig = getStatusStyle(history?.todayAttendence);
  const records = history?.attendenceRecords || [];
console.log(records);
  return (
    <div className="flex flex-col gap-10">
      {/* Header Section */}
      <div className="text-center space-y-1.5">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-base-content">
          Work Attendance
        </h2>
        <p className="text-sm text-base-content/60">
          Check-in daily to record your work log
        </p>
      </div>

      {/* Interactive Action Button with Decorative Ring */}
      <div className="flex flex-col items-center justify-center py-2">
        <div className="relative flex items-center justify-center">
          <div
            className={`absolute -inset-3 rounded-full blur-md transition-all duration-300 ${statusConfig.ring}`}
          />
          <button
            type="button"
            onClick={handleMark}
            disabled={isMarking}
            className={`relative btn ${statusConfig.btn} btn-circle w-40 h-40 text-sm font-bold tracking-wide shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border-none flex flex-col items-center justify-center gap-2 text-white`}
          >
            {isMarking ? (
              <span className="loading loading-spinner loading-lg"></span>
            ) : (
              <>
                <span className="text-3xl drop-shadow-xs">
                  {statusConfig.icon}
                </span>
                <span className="px-3 text-center leading-snug">
                  {statusConfig.label}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* History Log Section */}
      <div className="flex flex-col gap-4 border-t border-base-200 pt-6">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-bold text-xs uppercase tracking-widest text-base-content/60">
            Recent Logs
          </h3>
          <span className="badge badge-neutral badge-sm font-semibold px-3 py-2.5">
            {records.length} {records.length === 1 ? "Day" : "Days"}
          </span>
        </div>

        {loadingAttdnc ? (
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-spinner text-accent loading-md"></span>
          </div>
        ) : records.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-base-300 rounded-2xl bg-base-200/20">
            <p className="text-sm font-medium text-base-content/50">
              No attendance logs recorded yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 max-h-72 overflow-y-auto pr-1">
            {records.map((att) => {
              const statusLower = att?.history?.at(-1)?.status?.toLowerCase();
              const isPresent = statusLower === "present";
              const isAbsent = statusLower === "absent";

              return (
                <div
                  key={att?._id}
                  className="group flex flex-col items-center justify-between gap-3.5 p-4 rounded-2xl border border-base-300/80 bg-base-100 hover:border-base-content/20 hover:shadow-md transition-all duration-200"
                >
                  {/* Date & Status Dot */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isPresent
                          ? "bg-emerald-500 ring-4 ring-emerald-500/15"
                          : isAbsent
                            ? "bg-rose-500 ring-4 ring-rose-500/15"
                            : "bg-amber-500 ring-4 ring-amber-500/15"
                      }`}
                    />
                    <span className="text-sm font-bold text-base-content/90">
                      {dateFormat(att?.createdAt).date}
                    </span>
                  </div>

                  {/* Status Pill */}
                  <span
                    className={`badge badge-sm font-semibold tracking-wide px-3 py-2.5 border-none text-white ${
                      isPresent
                        ? "bg-emerald-600"
                        : isAbsent
                          ? "bg-rose-600"
                          : "bg-amber-500"
                    }`}
                  >
                    {att?.history?.at(-1)?.status || "Marked"}
                  </span>

                  {/* Timestamp */}
                  <span className="text-xs font-medium text-base-content/50 group-hover:text-base-content/80 transition-colors">
                    {dateFormat(att?.createdAt).time}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}