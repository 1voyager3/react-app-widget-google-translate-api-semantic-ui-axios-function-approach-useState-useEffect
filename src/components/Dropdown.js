import React, {useState, useEffect, useRef} from "react";


const Dropdown = ({options, selected, onSelectedChange, label}) => {
    //hook for close and open (toggle) drop down menu
    const [open, setOpen] = useState(false);

    // allow us to get direct reference to a DOM element
    const ref = useRef();

    // use hook to close the dropdown menu when click on any DOM element
    // we need to figure out if the clicked inside or outside the dropdown menu
    // if (ref.current.contains(event.target)) {return;} - the same as return true;
    useEffect( () => {

        const onBodyClick = (event) => {
            if (ref.current.contains(event.target)) {
                return;
            }
            setOpen(false)
        }

        document.body.addEventListener('click', onBodyClick);

        // inside the cleanup function in case if the body is null ( component will be removed)
        // from the DOM we remove that callback entirely
        // if for example if the Dropdown will be removed from the DOM, React is going automatically
        // call this cleanup function and it' going to remove the EventListener watching for that click
        return () => {
            document.body.removeEventListener('click', onBodyClick);
        }

    }, []);

    const renderedOptions = options.map( option => {
        //hiding the particular selected option from dropdown list
        // null means do not render anything
        if (option.value === selected.value) {
            return null;
        }

        return (
            <div
                key={option.value}
                className="item"
                onClick={() => {
                    onSelectedChange(option)
                }}
            >
                {option.label}
            </div>
        )
    })

    return (
        // getting the access to this element through useRef hook
        <div
            ref={ref}
            className="ui form"
        >
            <div className="field">
                <label  className="label">{label}</label>
                {/* click (flip it to opposite) and first condition for toggle dropdown menu*/}
                <div
                    onClick={() => {
                        setOpen(!open)
                    }}
                    className={`ui selection dropdown ${open ? 'visible active': ''}`}
                >
                    <i className="dropdown icon" />
                    <div className="text">{selected.label}</div>
                    {/* second condition for toggle dropdown menu*/}
                    <div className={`menu ${open ? 'visible transition': ''}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Dropdown;