import Login from "@/components/oth/Login";


function Welcome() {

  return (
    <div className='hero'>
      <div className='hero-content'>
        <div className='card'>
          <div className='card-title'>
            <h3>Employee Corner</h3>
          </div>
          <div className='card-body'>
            <Login />
            <button className='btn btn-primary'>Login</button>
          </div>
        </div>
        <div className='card'>
          <h3 className="card-title">Admin Corner</h3>
          <div className='card-body'>
            <button className='btn btn-secondary'>Login</button>
            <button className='btn btn-secondary'>Login</button>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Welcome