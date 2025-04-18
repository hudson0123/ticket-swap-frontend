export default function ExpandableSection({ id, title, boxExpanded, handleExpand, children }) {
    const isExpanded = boxExpanded === id
    return (
      <div className="flex flex-col bg-white w-full rounded px-5 py-2">
        <div className="relative flex items-center">
          <p className="font-bold">{title}</p>
          <button onClick={() => handleExpand(isExpanded ? "0" : id)} className="ml-auto">
            <img src="dropdown.svg" alt="dropdown-icon" className={`h-10 w-10 transition-transform duration-150 ${isExpanded ? 'rotate-180' : 'rotate-0'}`} />
          </button>
        </div>
        <div className={`overflow-y-hidden transition-max-height duration-150 ${isExpanded ? 'max-h-screen mt-5' : 'max-h-0'}`}>
          {children}
        </div>
      </div>
    )
  }  