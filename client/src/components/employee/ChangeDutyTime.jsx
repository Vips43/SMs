import { useForm } from "react-hook-form";
import InputField from "../form/InputField";
import SelectField from "../form/SelectField";
import { useAddDuty, useGetDuties } from "@/hooks/empHooks";
import { dateFormat } from "@/utils/helperfn";

function ChangeDutyTime({ user, sites }) {
  const defaultVals = {
    site: user?.site?._id || user?.site?.id || "",
  };

  const { mutateAsync: addDuty, isPending: addingDuty, error } = useAddDuty();
  const { data: duties } = useGetDuties({ id: user?._id, date: "" }, {});

  console.log(duties, user?._id);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues: defaultVals });

  const siteOptions =
    sites?.map((s) => ({ label: s?.name, value: s?._id })) || [];

  const submit = async (data) => {
    const payload = {
      ...data,
      id: user._id,
    };
    const result = await addDuty(payload);
    console.log(result);
  };

  return (
    <div className="">
      <h3 className="text-2xl font-semibold text-center underline mb-2">
        Change Duty Time
      </h3>
      <form onSubmit={handleSubmit(submit)} className="mt-5 px-3 flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <InputField
            name={"instruction"}
            register={register}
            error={errors}
            label={"Enter Instruction"}
          />
          <InputField
            type="datetime-local"
            name={"startTime"}
            register={register}
            error={errors}
            label={"Choose Start Date"}
          />
          <InputField
            type="datetime-local"
            name={"endTime"}
            register={register}
            error={errors}
            label={"Choose End Time"}
          />
          <SelectField
            error={errors}
            register={register}
            options={siteOptions}
            label="Select Site"
            name="site"
          />
        </div>

        {error && (
          <div
            role="alert"
            className="alert alert-error my-2 justify-center font-semibold w-fit mx-auto py-1">
            <span>{error?.message}</span>
          </div>
        )}
        <button className="btn btn-info mx-auto my-4 disabled:opacity-80">
          {addingDuty ? "Saving..." : "Save"}
        </button>
      </form>

      {/* Duties List Table */}
      <div className="overflow-auto mt-4 max-h-96">
        <table className="table table-pin-rows w-full">
          <thead className="[&_th]:bg-gray-300">
            <tr>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Instruction</th>
            </tr>
          </thead>
          <tbody>
            {!duties?.length ? (
              <tr>
                <td
                  colSpan={3}
                  className="text-center py-4 text-base-content/60">
                  No duties found
                </td>
              </tr>
            ) : (
              duties.map((duty) => (
                <tr key={duty._id || duty.id}>
                  <td>
                    {dateFormat(duty?.startTime)?.fullDateAndTime ||
                      duty?.startTime || "N/A"}
                  </td>
                  <td>
                    {dateFormat(duty?.endTime)?.fullDateAndTime ||
                      duty?.endTime || "N/A"}
                  </td>
                  <td>{duty?.instruction || "N/A"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ChangeDutyTime;
