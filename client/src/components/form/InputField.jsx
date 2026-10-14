
function InputField({ label, disabled = false, type = "text", name, register, error, validation = {}, placeholder = "" }) {
  const fieldId = name || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div>
      <fieldset className="fieldset">
        <label className={`label font-semibold capitalize text-base text-gray-700 $`} htmlFor={fieldId || name}>
          {label}
        </label>
        <input
          type={type}
          disabled={disabled}
          id={fieldId || name}
          className={`input w-full text-black ${error ? 'input-error border-error' : ''}`}
          placeholder={placeholder || label}
          {...(register ? register(name, validation) : {})}
        />
        {error && <span className="text-error text-xs mt-1">{error.message}</span>}
      </fieldset>
    </div >
  )
}

export default InputField;