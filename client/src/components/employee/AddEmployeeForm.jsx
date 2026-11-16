import { useForm } from "react-hook-form"
import InputField from "../form/InputField"
import SelectField from "../form/SelectField"

const marryOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
]

function AddEmployeeForm() {
  const { register, formState: { errors }, } = useForm()
  return (
    <div className="p-5 grid grid-cols-3 gap-x-3">
      <InputField error={errors} name={'firstname'} label={"First Name"} register={register} />
      <InputField error={errors} name={'middlename'} label={"Middle Name"} register={register} />
      <InputField error={errors} name={'lastname'} label={"Last Name"} register={register} />
      <InputField error={errors} name={'gender'} label={"Gender"} register={register} />
      <InputField error={errors} name={'dateofbirth'} label={"Date of Birth"} register={register} />
      <InputField error={errors} name={'pob'} label={"Place of Birth"} register={register} />
      <InputField error={errors} name={'sob'} label={"State of Birth"} register={register} />
      <InputField error={errors} name={'religious'} label={"Religious"} register={register} />
      <SelectField error={errors} options={marryOptions} name={'married'} label={"Married"} register={register} />
      <InputField error={errors} name={'bloodGroup'} label={"Blood Group"} register={register} />
      <div className="col-span-full space-y-2">
        <div className="grid grid-cols-3 gap-x-2 outline outline-gray-400 p-2 rounded-md">
          <h3 className="col-span-full font-semibold text-lg">Present Address</h3>
          <InputField error={errors} showLabel={false} name={'address.present.l1'} label={"ex: Room no / area / road "} register={register} />
          <InputField error={errors} showLabel={false} name={'address.present.l2'} label={"ex: near by/ landmark"} register={register} />
          <InputField error={errors} showLabel={false} name={'address.present.l3'} label={"Line 3"} register={register} />
          <InputField error={errors} showLabel={false} name={'address.present.state'} label={"State"} register={register} />
          <InputField error={errors} showLabel={false} name={'address.present.city'} label={"City"} register={register} />
          <InputField error={errors} showLabel={false} name={'address.present.pincode'} label={"Pincode"} register={register} />
        </div>
        <div className="grid grid-cols-3 gap-x-2 outline outline-gray-400 p-2 rounded-md">
          <h3 className="col-span-full font-semibold text-lg flex justify-between">Permanent Address
            <label className="text-sm font-normal outline outline-gray-400 bg-gray-200 px-2 py-0.5 rounded-md">Same as above &nbsp;
              <input type="checkbox" className="checkbox" />
            </label>
          </h3>
          <InputField error={errors} showLabel={false} name={'address.permanent.l1'} label={"ex: Room no / area / road "} register={register} />
          <InputField error={errors} showLabel={false} name={'address.permanent.l2'} label={"ex: near by/ landmark"} register={register} />
          <InputField error={errors} showLabel={false} name={'address.permanent.l3'} label={"Line 3"} register={register} />
          <InputField error={errors} showLabel={false} name={'address.permanent.state'} label={"State"} register={register} />
          <InputField error={errors} showLabel={false} name={'address.permanent.city'} label={"City"} register={register} />
          <InputField error={errors} showLabel={false} name={'address.permanent.pincode'} label={"Pincode"} register={register} />
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default AddEmployeeForm