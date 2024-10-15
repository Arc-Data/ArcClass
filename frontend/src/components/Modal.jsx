/* TODO: Listen on Escape Key
Might also need to consider whether to keep using our own Modal
or Flowbite's Modal

Pros: Faster implementation of background dismissible (already includes ESC key listen too)
Cons: I dunno, the fact that we didnt make it ourselves?
*/

const Modal = ({ onClick, children  }) => {
    return (
        <>
            <div className="fixed inset-0 z-10 bg-black bg-opacity-50" onClick={onClick}></div>
            <div className="fixed z-20 p-10 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg bg-background-default top-1/2 left-1/2 max-h-[600px] h-full overflow-hidden">
                {children}
            </div>
        </>
    )
}

export default Modal