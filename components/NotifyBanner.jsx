import React from 'react'
import { useNotifyStore } from '@/store'
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
export default function ErrorBanner() {

    const error = useNotifyStore((state) => state.error)
    const warn = useNotifyStore((state) => state.warn)
    const info = useNotifyStore((state) => state.info)
    const success = useNotifyStore((state) => state.success)
    const clear_error = useNotifyStore((state) => state.clearError)
    const clear_warn = useNotifyStore((state) => state.clearWarn)
    const clear_info = useNotifyStore((state) => state.clearInfo)
    const clear_success = useNotifyStore((state) => state.clearSuccess)

    return (
        <div className='fixed w-screen'>
            {error !== null ? (
                <Box sx={{ width: '100%'}}>
                    <Collapse in={open}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={clear_error}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2, pl: 3 }}
                            severity="error"
                        >
                            {error}
                        </Alert>
                    </Collapse>
                </Box>
            ) : warn !== null ? (
                <Box sx={{ width: '100%' }}>
                    <Collapse in={open}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={clear_warn}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                            severity="warning"
                        >
                            {warn}
                        </Alert>
                    </Collapse>
                </Box>
            ) : info !== null ? (
                <Box sx={{ width: '100%' }}>
                    <Collapse in={open}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={clear_info}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                            severity="info"
                        >
                            {info}
                        </Alert>
                    </Collapse>
                </Box>
            ) : success !== null ? (
                <Box sx={{ width: '100%' }}>
                    <Collapse in={open}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={clear_success}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                            severity="success"
                        >
                            {success}
                        </Alert>
                    </Collapse>
                </Box>
            ) : (
                <>
                </>
            )}
        </div>
    )
}
