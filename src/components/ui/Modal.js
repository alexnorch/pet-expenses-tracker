const Modal = (props) => {
    if (props.isShowing) {
        return (
            <div className="backdrop">
              <div className="modal">
                <div className="modal__header">
                  {props.title}
                  <button
                  className="modal__close"
                  onClick={props.toggle}> 
                      <i className="fas fa-times" /> 
                  </button>
                </div>
                <div className="modal__body">
                  {props.children}
                </div>
              </div>
            </div>
        )
    } else {
        return null;
    }
}

export default Modal;