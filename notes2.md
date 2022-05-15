//Detailvideopage code for frontend and backend that works

//DetailVideoPage.js
import { useParams } from 'react-router-dom';

function DetailVideoPage() {
  const [Video, setVideo] = useState([]);

  const { videoId } = useParams();

  const videoVariable = {
    videoId: videoId
  }

  useEffect(() => {

    const getSingleVideoData = async () => {
      axios.get(`http://localhost:5000/api/upload/getVideo`, videoVariable)
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

//Upload.js
router.get("/getVideo", async (req, res) => {
    // let id = req.params.videoId

        try {
            const getvideo = await video.findOne({
                "_id" : req.body.videoId
                // where: { id: id }
            })
    
            // return res.status(200).json({ success: true, getvideo});
            return res.json(getvideo)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: 'Something went wrong' });
        }
    })

    //LandingVideo.js
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
         <Link to={`/video/${video._id}`} >
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