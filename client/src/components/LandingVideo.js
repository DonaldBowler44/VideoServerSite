import React, { useState, useEffect } from 'react';
import { Col, Row} from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

// const LandingVideo = () => {

//     const [showvideos, setShowVideos] = useState([]);

//     useEffect(() => {
//         const getVideosData = async () => {
//             const { data } = await axios.get('http://localhost:5000/api/upload/allVideos');
//             console.log(data);
//             setShowVideos(data);
//         }
//         getVideosData();
//     }, [])

//     return (
//         <section>
//             <div>
//                 {showvideos.map(video => {
//                     <img src={video.thumbnail} />
//                 }
//                 )}
//             </div>
//             <div>
//         </div>            
//         </section>
//     )
// }

function LandingVideo() {

    const [showvideos, setShowVideos] = useState([]);
    
    useEffect(() => {
        const getVideosdata = async () => {
            const { data } = await axios.get('http://localhost:5000/api/upload/allVideos');
            console.log(data);
            setShowVideos(data);
        }
        getVideosdata();

    }, []);


        const videos = showvideos.map((video, index) => {

            var minutes = Math.floor(video.duration / 60);
            var seconds = Math.floor(video.duration - minutes * 60);
            //key={video.id}

    return <Col lg={6} md={8} xs={24} key={video.id} span={6}>


        <div style={{ position: 'relative', 
        
         }}>
         <Link to={`/video/${video.id}`} >
        {/* <a href={`/video/${video._id}`} > */}
          <img style={{ width: '100%' }}
          alt="thumbnail"
          src=
              {`http://localhost:5000/${video.thumbnail}`}

               />
                <div className="duration"
                    style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
                    color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                    padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                    fontWeight:'500', lineHeight:'12px' }}>
                    <span>{minutes} : {seconds}</span>
                </div>

                {/* </a> */}
                </Link>
              </div><br />
              <span>{video.title}</span>
              <span> {moment(video.createdAt).format("MMM Do YY")} </span>

              </Col>
    
     
    })

    return (
        
        <div style={{ width: '85%', margin: '3rem auto', }}>
        <label>Recommended </label>
        
        <Row gutter={16}>
            {videos}
        </Row>
        </div>
    )
};


     
// function LandingVideo() {
//     const [showvideos, setShowVideos] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:5000/api/upload/allVideos')
//         .then(response => {
//             if (response.data.success) {
//                 console.log(response.data.videos);
//                 setShowVideos(response.data.videos);
//             } else {
//                 console.log(err);
//             }
//         })
//     }, [])

//     const renderCards = showvideos.map((video, index) => {
//         return (
//             <div style={{ position: 'relative' }}>
//                 <a href={`/video/${video.id}`} ></a>
//             </div>
//         )
//     })

//     return (
//         <div style={{ width: '85%', margin: '3rem auto' }}>
//             {renderCards}
//         </div>
//     )

// }

  
  export default LandingVideo;