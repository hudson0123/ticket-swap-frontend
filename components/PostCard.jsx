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
import { useMutation } from '@tanstack/react-query';

export default function PostCard({ post }) {

    const setNotification = useNotifyStore((state) => state.setNotification)

    const createRequestMutation = useMutation({
        mutationFn: (request) => {
            return api.post('/api/requests/', {
                "sender_id": request.sender_id,
                "post_id": request.post_id
            })
        },
        onError: (error) => {
            setNotification("error", JSON.stringify(error.response.data))
        },
        onSuccess: () => {
            setNotification("success", "Sent Request.")
        }
    })

    return (
        <Box sx={{ minWidth: '90dvw', }}>
            <Card variant="outlined" sx={{ background: '' }}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        @{post.author.username} {post.author.is_verified_uga && "(Verified)"}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {post.ticket}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>${post.ticket_price}</Typography>
                    <Divider />
                </CardContent>
                <CardActions>
                    <Button onClick={() => {
                        createRequestMutation.mutate({
                            sender_id: post.author.id,
                            post_id: post.id,
                        })
                    }} size="small">Send Request</Button>
                </CardActions>
            </Card>
        </Box>
    )
}
