

function ModalButton({ id = "my-modal-1", title, children, onClick }) {
  return (
    <>
      {/* Trigger Button */}
      {title && (
        <button className="btn btn-primary" popoverTarget={id} onClick={onClick}>
          {title}
        </button>
      )}

      {/* Popover Container */}
      <div
        id={id}
        popover="auto"
        className="modal bg-black/40 backdrop-blur-[2px] backdrop:bg-neutral-900/50 p-0"
      >
        <div className="modal-box max-w-5xl w-fit bg-base-100 text-base-content border border-base-300 shadow-2xl relative p-2">

          {/* Close Button at top-right */}
          <button
            popoverTarget={id}
            popoverTargetAction="hide"
            className="btn btn-sm btn-circle btn-error absolute right-3 top-3 text-base-content/70 hover:text-base-content z-10"
          >
            ✕
          </button>

          {/* Form / Children Content */}
          <div className="pt-2">
            {children}
          </div>

          {/* Bottom Action Footer */}
          <div className="modal-action mt-6 flex justify-end hidden">
            <button
              popoverTarget={id}
              popoverTargetAction="hide"
              className="btn btn-outline"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalButton;