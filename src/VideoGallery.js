import React, {useEffect, useState} from 'react'
import YouTube from 'react-youtube';
import "./VideoGallery.css"


const url2 = "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=PL80FQH49MzPnsuz13lCC4jMIYg_CsH1AO&key=AIzaSyBfFLXBhhF2-lRRwjTZqU5neZO43HEOT9Q"


function VideoGallery() {

    const [videos, setVideos] = useState([]);
    const opts = {
        host: 'https://www.youtube.com',
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          origin:'http://localhost:3000' 
    }}
    const fetchAPI = async () => {
        const resp = await fetch(url2);
        const data = await resp.json();
        // console.log(data.items);
        setVideos(data.items);
    }

    useEffect(()=>{
        fetchAPI();
    }, [])
    const _onReady = e => {
        e.target.pauseVideo();
    }
    return (
        <div className="videos">
            <ul className="videos__container">
            {videos.map(video => {
                const {contentDetails,id} = video;
                return <li key={id} className="videos__items">
                    <YouTube 
                         videoId={contentDetails.videoId} 
                         opts={opts}  
                         onReady={_onReady}
                    />
                </li>
            })}

            </ul>
           
        </div>
    )
}

export default VideoGallery
