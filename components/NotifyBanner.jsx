import React from 'react'
import { useNotifyStore } from '@/store'
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function NotificationBanner() {

    const notification = useNotifyStore()

    return (
        <div className='fixed w-screen'>
            {notification.error !== null ? (
                <Box sx={{ width: '100%'}}>
                    <Collapse in={open}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => notification.clearNotification("error")}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2, pl: 3 }}
                            severity="error"
                        >
                            {notification.error}
                        </Alert>
                    </Collapse>
                </Box>
            ) : notification.warn !== null ? (
                <Box sx={{ width: '100%' }}>
                    <Collapse in={open}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => notification.clearNotification("warn")}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                            severity="warning"
                        >
                            {notification.warn}
                        </Alert>
                    </Collapse>
                </Box>
            ) : notification.info !== null ? (
                <Box sx={{ width: '100%' }}>
                    <Collapse in={open}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => notification.clearNotification("info")}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                            severity="info"
                        >
                            {notification.info}
                        </Alert>
                    </Collapse>
                </Box>
            ) : notification.success !== null ? (
                <Box sx={{ width: '100%' }}>
                    <Collapse in={open}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => notification.clearNotification("success")}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                            severity="success"
                        >
                            {notification.success}
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
