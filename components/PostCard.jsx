import React from 'react'
import api from '@/api'
import { useAuthStore, useNotifyStore } from '@/store'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export default function PostCard({ post, users }) {

    const setError = useNotifyStore((state) => state.setError)
    const setSuccess = useNotifyStore((state) => state.setSuccess)

    const sendRequest = async () => {

        try {
            await api.post('/api/requests/', {
                "sender": currentUser.id,
                "recipient": post.author,
                "post": post.id
            })
            setSuccess("Sent Request.")
        }
        catch (e) {
            setError("Failed to Sent Request.")
        }

    }

    const getUserById = (post_id) => {
        return users.find(user => user.id === post_id)
    }

    const postUser = getUserById(post.author)
    const currentUser = useAuthStore((state) => state.current_user)

    return (
        <Box sx={{ minWidth: '90dvw', }}>
            <Card variant="outlined" sx={{background: ''}}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        @{postUser?.username || 'unknown'}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {post.ticket}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>${post.ticket_price}</Typography>
                    <Divider />
                </CardContent>
                <CardActions>
                    <Button onClick={sendRequest} size="small">Send Request</Button>
                </CardActions>
            </Card>
        </Box>
    )
}
