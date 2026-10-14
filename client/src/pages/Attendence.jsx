import ShowUserAttendence from "@/components/employee/ShowUserAttendence";
import { useGetAttendenceQuery, useMarkAttandence } from "@/hooks/empHooks";
import useAuthStore from "@/store/authStore";
import { dateFormat } from "@/utils/helperfn";
import toast from "react-hot-toast";

function Attendence() {
  const { user } = useAuthStore((state) => state.user);

  const {
    mutateAsync: marking,
    isPending: isMarking,
    data,
    error: markingError,
    isSuccess,
    isError,
  } = useMarkAttandence();

  const { data: attendence, isFetching: loadingAttdnc } = useGetAttendenceQuery(user?.id);
  const history = attendence?.attendenceRecords || [];

  const handleMark = async () => {
    try {
      const res = await marking();
      toast.success(res?.msg || "Attendance marked successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg || error?.message || "Internal server error");
    }
  };

  return (
    <div className="relative p-6 bg-base-100 flex flex-col gap-8">
      <ShowUserAttendence users={attendence?.data} />
      {/* Header Banner */}
      {<ShowEmpAttendence data={data} handleMark={handleMark} isError={isError} isMarking={isMarking} isSuccess={isSuccess} loadingAttdnc={loadingAttdnc} markingError={markingError} history={history} />}
    </div>
  );
}

export default Attendence;

function ShowEmpAttendence({ isSuccess, isError, data, markingError, handleMark, isMarking, loadingAttdnc, history }) {
  return (
    <div>
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-base-content">Work Attendance</h2>
        <p className="text-xs text-base-content/60 mt-1">Check-in daily to record your log</p>
      </div>

      {(isSuccess || isError) && (
        <div
          key={`${isSuccess}-${data?.msg || markingError?.message}`}
          className="toast toast-center toast-top z-50 mb-4 animate-toast-fade"
        >
          {isSuccess && data?.msg && (
            <div className="alert alert-success shadow-lg text-white font-medium flex items-center gap-2">
              <span>✅</span>
              <span>{data.msg}</span>
            </div>
          )}

          {isError && markingError && (
            <div className="alert alert-error shadow-lg text-white font-medium flex items-center gap-2">
              <span>❌</span>
              <span>{markingError.message || "Something went wrong"}</span>
            </div>
          )}
        </div>
      )}

      {/* Interactive Action Button */}
      <div className="flex flex-col items-center justify-center gap-2">
        <button
          type="button"
          onClick={handleMark}
          disabled={isMarking}
          className="btn btn-accent btn-circle w-36 h-36 text-md font-bold tracking-wide shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:scale-105 active:scale-95 transition-all duration-200 border-none flex flex-col gap-1 text-white"
        >
          {isMarking ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <>
              <span className="text-2xl">⏳</span>
              <span>Mark Today</span>
            </>
          )}
        </button>
      </div>

      {/* History Log Section */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-bold text-sm uppercase tracking-wider text-base-content/70">Recent Logs</h3>
          <span className="badge badge-sm badge-neutral font-medium">{history.length} Days</span>
        </div>

        {loadingAttdnc ? (
          <div className="flex justify-center items-center py-10">
            <span className="loading loading-spinner text-accent loading-md"></span>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-base-300 rounded-xl bg-base-200/30">
            <p className="text-sm text-base-content/50">No logs recorded yet.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3 max-h-64 overflow-y-auto pr-1">
            {history?.map((att) => {


              const isPresent = att?.status?.toLowerCase() === "present";
              const isAbsent = att?.status?.toLowerCase() === "absent";

              return (
                <div
                  key={att?._id}
                  className="flex flex-col gap-5 items-center justify-between p-3 rounded-xl border max-w-42 bg-base-200/20 hover:bg-base-200/50 transition-colors shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${isPresent ? "bg-success" : isAbsent ? "bg-error" : "bg-warning"}`} />
                    <span className="text-sm font-semibold text-base-content/90">{dateFormat(att?.createdAt).date}</span>
                  </div>

                  <span
                    className={`badge badge-sm font-bold tracking-wide ${isPresent
                      ? "badge-success text-white bg-emerald-600 border-none"
                      : isAbsent
                        ? "badge-error text-white bg-rose-600 border-none"
                        : "badge-warning text-white bg-amber-500 border-none"
                      }`}
                  >
                    {att?.status || "Marked"}
                  </span>
                  <span className="text-xs font-bold">
                    {dateFormat(att?.createdAt).time}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}