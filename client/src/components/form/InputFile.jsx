import { Upload } from "lucide-react";

function InputFile({ label, id, allowed, onChange, type = 'input' }) {

  return (
    <>
      {type === "btn" ?
        <button type="button" className="btn btn-dash">
          <Upload />
          <Type allowed={allowed} id={id} label={label} onChange={onChange} hidden={true} />
        </button>
        :
        <Type allowed={allowed} id={id} label={label} onChange={onChange} />
      }
    </>
  );
}

export default InputFile;

function Type({ label, id, allowed, onChange, hidden = false }) {
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor={id} className="label capitalize text-gray-800 text-base font-semibold">
          {label}
        </label>
        <input
          hidden={hidden}
          id={id}
          type="file"
          accept={allowed || ".pdf,.docx,image/*"}
          className="file-input file-input-bordered file-input-md file-input-primary file:px-2 border-green-400 w-full"
          onChange={onChange}
        />
      </div>
    </>
  )
}