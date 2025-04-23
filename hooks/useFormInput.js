import { useState, useCallback } from 'react'

export default function useFormInput(initial_value = '') {

    const [value, setValue] = useState(initial_value)

    const handleChange = useCallback((e) => {
        setValue(e.target.value)
    }, [])

    const reset = useCallback(() => {
        setValue(initial_value)
    }, [initial_value])

    return {
        value,
        onChange: handleChange,
        reset
    }
}
