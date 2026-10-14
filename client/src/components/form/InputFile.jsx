function InputFile({ label, id, allowed, onChange }) {
  return (
    <div className="mt-3">
      <label htmlFor={id} className="label capitalize">
        {label}
      </label>
      <input
        id={id}
        type="file"
        accept={allowed || ".pdf,.docx,image/*"}
        className="file-input file-input-bordered file-input-sm w-full"
        onChange={onChange}
      />
    </div>
  );
}

export default InputFile;