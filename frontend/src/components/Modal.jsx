const Modal = ({ onClick, children  }) => {
    return (
        <>
            <div className="fixed inset-0 z-10 bg-black bg-opacity-50" onClick={onClick}></div>
            <div className="fixed z-20 p-10 overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg bg-background-default top-1/2 left-1/2 max-h-[400px] overflow-x-hidden">
                {children}
            </div>
        </>
    )
}

export default Modal