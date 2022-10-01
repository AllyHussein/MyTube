import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import {useParams , Link} from 'react-router-dom'
import { useEffect } from 'react'
import {Box , Stack , Typography} from '@mui/material'
import {CheckCircle} from '@mui/icons-material'
import Videos from './Videos'
import {fetchFromApi} from "../utils/FetchFromApi"
function VideoDetails() {
    const [videoDetails , setVideoDetails ] = useState(null)
    const [videos , setVideos] = useState(null)
    const {id} = useParams()

    useEffect(() => {
        fetchFromApi(`videos?part=snippet,statistics&id=${id}`)
        .then((data) => setVideoDetails(data?.items[0]) )

        fetchFromApi(`search?part=snippet&relatedToVideoId=${id}&type=video`)
        .then((data) => setVideos(data.items))

    } , [id])
    if(!videoDetails?.snippet) return "Loading..."
    return (
        <Box minHeight='95vh'>
            <Stack direction={{xs: 'column' , md : "row"}}>
                <Box flex={1}>
                    <Box sx={{width : "100%" , position : "sticky" , top : "86px"}}>
                        <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
                        <Typography color="#FFF" variant='h5' fontSize="30px" fontWeight="bold" p={2}>
                            {videoDetails.snippet.title}
                        </Typography>
                        <Stack direction='row' justifyContent='space-between' sx={{color : "#FFF"}} py={1} px={2}>
                            <Link to={`/channel/${videoDetails.snippet.channelId}`}>
                                <Typography color="#FFF" fontSize="24px">
                                    {videoDetails.snippet.channelTitle}
                                    <CheckCircle sx={{fontSize : "18px" , color : "gray" , ml : "5px"}} />
                                </Typography>
                            </Link>
                            <Stack direction='row' gap='20px' alignItems='center'>
                                <Typography variant='body1' fontSize="18px" sx={{ opacity : 0.7}}>
                                    {parseInt(videoDetails.statistics.viewCount).toLocaleString()} Views
                                </Typography>
                                <Typography variant='body1' fontSize="18px" sx={{ opacity : 0.7}}>
                                    {parseInt(videoDetails.statistics.likeCount).toLocaleString()} Likes
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
            <Box px={2} py={{md : 1, xs: 5}} justifyContent = "center" alignItems = "center">
                <Videos videos={videos} direction="column" />

            </Box>
            </Stack>

        </Box>
    )
}

export default VideoDetails