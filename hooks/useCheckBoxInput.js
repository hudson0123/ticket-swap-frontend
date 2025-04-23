import React, { useState, useCallback} from 'react';

const UseCheckBoxInput = (initial_value = false) => {
    const [value, setValue] = useState(initial_value)

    const handleToggle = useCallback(() => {
        setValue(prev => !prev)
    }, [])

    const reset = useCallback(() => {
        setValue(initial_value)
    }, [initial_value])

    return {
        value,
        onChange: handleToggle,
        reset
    }

}

export default UseCheckBoxInput;
