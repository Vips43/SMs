import ModalButton from '../oth/ModalButton'

function LeaveApplication() {
  return (
    <>
      <div className="p-4">
        <h3 className="text-3xl font-semibold my-5 text-base-content">
          Leave Section
        </h3>

        <div>
          <ModalButton title="Apply for Leave">
            <form className="w-full max-w-3xl bg-base-100 text-base-content p-6 rounded-lg shadow-sm">
              {/* Header */}
              <div className="border-b border-base-300 pb-4 mb-6">
                <h3 className="font-bold text-xl uppercase tracking-wide text-center sm:text-left">
                  Leave Application Form
                </h3>
                <p className="text-xs text-base-content/70 text-center sm:text-left">
                  (Half / Full Day / Planned Leave)
                </p>

                <div className="flex justify-end items-center gap-2 mt-4 text-sm">
                  <span className="font-semibold">Date:</span>
                  <input
                    type="date"
                    className="bg-transparent border-b border-base-content/40 focus:border-primary focus:outline-none px-1 text-sm"
                  />
                </div>
              </div>

              {/* Recipient */}
              <div className="text-sm space-y-1 mb-6">
                <p className="font-semibold">To,</p>
                <p className="text-base-content/80 pl-2">ADMIN-HO / B2 KW / PMO</p>
              </div>

              {/* Form Fields Grid */}
              <div className="space-y-4 text-sm">
                {/* Applicant Name */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="font-semibold min-w-36">
                    Name of Applicant:
                  </label>
                  <input
                    type="text"
                    className="flex-1 bg-transparent border-b border-base-content/30 focus:border-primary focus:outline-none px-2 py-1"
                  />
                </div>

                {/* Department & Head */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <label className="font-semibold min-w-28">Department:</label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-base-content/30 focus:border-primary focus:outline-none px-2 py-1"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="font-semibold min-w-28">Dept. Head:</label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-base-content/30 focus:border-primary focus:outline-none px-2 py-1"
                    />
                  </div>
                </div>

                {/* Leave Duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <label className="font-semibold min-w-32">Leave Applied From:</label>
                    <input
                      type="date"
                      className="w-full bg-transparent border-b border-base-content/30 focus:border-primary focus:outline-none px-2 py-1"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="font-semibold min-w-8 text-center">To:</label>
                    <input
                      type="date"
                      className="w-full bg-transparent border-b border-base-content/30 focus:border-primary focus:outline-none px-2 py-1"
                    />
                  </div>
                </div>

                {/* Reason */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="font-semibold min-w-20">Reason:</label>
                  <input
                    type="text"
                    className="flex-1 bg-transparent border-b border-base-content/30 focus:border-primary focus:outline-none px-2 py-1"
                  />
                </div>

                {/* Contact & Handover Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <label className="font-semibold min-w-32">Contact Number:</label>
                    <input
                      type="tel"
                      className="w-full bg-transparent border-b border-base-content/30 focus:border-primary focus:outline-none px-2 py-1"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="font-semibold min-w-32">Incharge Person:</label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-base-content/30 focus:border-primary focus:outline-none px-2 py-1"
                    />
                  </div>
                </div>

                {/* Incharge Department */}
                <div className="flex items-center gap-2">
                  <label className="font-semibold min-w-44">Incharge Department:</label>
                  <input
                    type="text"
                    className="flex-1 bg-transparent border-b border-base-content/30 focus:border-primary focus:outline-none px-2 py-1"
                  />
                </div>
              </div>

              {/* Signature Section Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-6 border-t border-base-300 text-center">
                <div className="flex flex-col justify-end">
                  <input type="text" className="bg-transparent border-b border-base-content/40 text-center mb-1 focus:outline-none" />
                  <span className="text-xs font-semibold">Signature of Applicant</span>
                </div>
                <div className="flex flex-col justify-end">
                  <input type="text" className="bg-transparent border-b border-base-content/40 text-center mb-1 focus:outline-none" />
                  <span className="text-xs font-semibold">Department Head</span>
                </div>
                <div className="flex flex-col justify-end">
                  <input type="text" className="bg-transparent border-b border-base-content/40 text-center mb-1 focus:outline-none" />
                  <span className="text-xs font-semibold">Leave Sanctioned</span>
                </div>
                <div className="flex flex-col justify-end">
                  <input type="text" className="bg-transparent border-b border-base-content/40 text-center mb-1 focus:outline-none" />
                  <span className="text-xs font-semibold">Admin Dept.</span>
                </div>
              </div>
              <div className="mt-7 flex justify-center">
                <button className="btn btn-info">Apply</button>
              </div>
            </form>
          </ModalButton>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">All Leave Applications</h3>
          {/* Table / List can be rendered here */}
        </div>
      </div>
    </>
  )
}

export default LeaveApplication