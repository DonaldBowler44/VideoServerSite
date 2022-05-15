import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DetailVideoPage() {
  const [Video, setVideo] = useState([]);

  const { videoId } = useParams();

  const videoVariable = {
    videoId: videoId
  }

  //url parameters is returning undefined.
  console.log(videoId);

  useEffect(() => {

    const getSingleVideoData = async () => {
      //videoVariable after url
      axios.get(`http://localhost:5000/api/upload/getVideo/${videoId}`)
      .then(response => {
              console.log(response);
              // setVideo(response.data);
              setVideo(response.data.filePath);
            //   let myPath = response.data.filePath; 
            //   alert( "MP4 path is : " + myPath);
      })
      .catch(function (error) {
          console.log(error);
      });

    }
    getSingleVideoData();

  }, []);


  return (

    <>
      <Row>
          <Col lg={18} xs={24}>
          <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }} >
          <video style={{ width: '100%' }} src={`http://localhost:5000/${Video}`} type='video/mp4' controls autoPlay muted />
          </div>
          </Col>
      </Row>

      </>
  )

}






export default DetailVideoPage;