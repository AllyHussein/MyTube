import React, { useEffect, useState } from 'react'
import {Box, CardContent, CardMedia, Typography} from "@mui/material"
import { useParams } from 'react-router-dom'
import { fetchFromApi } from '../utils/FetchFromApi'
import Videos from './Videos'
import { CheckCircle } from '@mui/icons-material'
import { demoProfilePicture } from '../utils/constants'
function ChannelDetails() {
    const { id } = useParams()
    const [channel , setChannel] = useState("")
    const [videos , setVideos] = useState([])

    useEffect(() => {
        fetchFromApi(`channels?part=snippet&id=${id}`)
        .then((data)=> setChannel(data?.items[0]) )

        fetchFromApi(`search?channelId=${id}&part=snippet&order=date`)
        .then((data)=> setVideos(data?.items) )
    } , [id])
    return (
        <Box minHeight='95vh'>
            <Box>
                <div style={{background : "linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%" , zIndex : 10 , height : '300px'}} />
                <Box sx={{boxShadow : "none" ,borderRadius : "20px" , display : "flex" , justifyContent : "center" , alignItems : "center" , width : {xs : '356px' , md : "320px" , height : "326px" , margin : "auto" , marginTop : "-110px"}}}>
            <CardContent sx={{display : "flex" , flexDirection : "column" , justifyContent : "center" , alignItems  : "center" , color : "#FFF"}}>
                <CardMedia image={channel?.snippet?.thumbnails?.high?.url || demoProfilePicture} alt={channel?.snippet?.title} sx={{borderRadius : "50%" , height : '180px' , width : "180px" , mb : 2 , border : "1px solid #e3e3e3"}} />
                <Typography variant='h6'>
                    {channel?.snippet?.title}
                    <CheckCircle sx={{fontSize : 18 , color : 'gray' , ml: '5px'}} />
                </Typography>
                {channel?.statistics?.subscriberCount  && (
                    <Typography>
                        {parseInt(channel?.statistics?.subscriberCount).toLocaleString()} Subscribers
                    </Typography>
                )}
            </CardContent>
    </Box>
            </Box>

            <Box display='flex' p='2'>
                <Box sx={{mr : {sm : '100px'}}} />
                    <Videos videos={videos} />

            </Box>
        </Box>
    )
}

export default ChannelDetails