//from jae's yt github detailvideopage.js

import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscriber from './Sections/Subscriber';
import Comments from './Sections/Comments'
import LikeDislikes from './Sections/LikeDislikes';
function DetailVideoPage(props) {

    //an object of key/value pairs of URL parameters. Use it to access match.params of the current <Route>. for useParams/props.m
    //params have to match <Route path='/path/:title>

    const videoId = props.match.params.videoId

    //useState is hook for initial state, state doesn't have to be object, it returns current state and function that updates it
    const [Video, setVideo] = useState([])

    //creates variable to be passed
    const videoVariable = {
        videoId: videoId
    }

    //UseEffect allows count state variable, tells which effect to use for a specific function.
    useEffect(() => {
        //grabs data from axios route through backend
        axios.post('/api/video/getVideo', videoVariable)
        //gets response, if successful, data is transfered
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.video)
                    setVideo(response.data.video)
                } else {
                //if unsucessful, data fails to be transfered
                    alert('Failed to get video Info')
                }
            })


    }, [])

    //database user link
    if (Video.writer) {
        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                    //video html5 tag, summons player
                    // src links to filepath for database
                        <video style={{ width: '100%' }} src=
                        {`http://localhost:5000/${Video.filePath}`} controls></video>

                
                            <div></div>
                        </List.Item>


                    </div>
                </Col>
            </Row>
        )

    } else {
        return (
            <div>Loading...</div>
        )
    }


}

export default DetailVideoPage

//Errors:
//Failed to load resource: the server responded with a status of 404 (Not Found)

-however object data is returning
-changing src on video tag did not change anything- 5/9/2022
-adding key did not change anything- 5/9/2022

-look up data fetching with axios, sequelize and useEffect React for video
    -note: https://maxrozen.com/fetching-data-react-with-useeffect

-can't get fetched data from video, may need to recreate axios, useffect and react component from scratch with useparams, and sequelize backend. 

-axios works, useffect works, problem is mostly isolated transfering data from useffect/axios syntax to video tag 5/10/2022

-url returns undefined, focus on url/useparams to find out what the issue is
    -req.body.videoId, req.params.videoId, works either way in get route.

-Try Link from react-router-dom, instead of ahref to be used with useparams, 

-Try data.filter(video => video.id === videoId) for filter function.
    -It's on this turtioal on 12:50 https://www.youtube.com/watch?v=BLbTGKUzND4&t=11s 

-https://tutorialmeta.com/question/how-do-i-configure-axios-in-react-to-retrieve-data-with-an-objects-id-from-an-ap try this method for data fetching with useParams.

-add props? to detailvideopage

-//url parameters is returning undefined.
  console.log(videoId);

  -Url is fixed, data fetching per specific video is still not specificed only bringing id from first video. 5/13/2022
    -// where: { id: id } in /getvideo route if commented does not effect the outcome at all for fetching video, need to add where function for video
    