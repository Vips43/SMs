import InputField from './InputField'

function Search({ register, errors, onSubmit }) {

  return (
    <div className='my-3 outline m-2 p-3 rounded-md bg-accent-content text-white'>
      <h3 className='text-lg font-semibold '>Search Employee</h3>
      <form onSubmit={onSubmit}>
        <div className='flex gap-5 items-end '>
          <InputField error={errors} register={register} label='name' name={'name'} /> <span className='mb-5'>or</span>
          <InputField error={errors} type='mail' register={register} label='email' name={'email'} />

          <button type='submit' className='btn btn-active mb-4'>Search</button>
        </div>
      </form>
    </div>
  )
}

export default Search