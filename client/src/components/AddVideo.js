import axios from 'axios';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Input, Typography, Button, FormControl,} from '@mui/material';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { TextArea } = Input;

const AddVideo =() => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [Thumbnail, setThumbnail] = useState("")

    const handleChangeTitle = (event) => {
        setTitle(event.currentTarget.value);
    }

    const handleChangeDescription = (event) => {
        console.log(event.currentTarget.value);

        setDescription(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (title === "" || Description === "" ||
        FilePath === "" || Duration === "" || 
        Thumbnail === "") {
            return alert('please first fill all the fields in')
        };

        const variables = {
            title: title, 
            description: Description,
            filePath: FilePath,
            duration: Duration,
            thumbnail: Thumbnail
        };

        axios.post('http://localhost:5000/api/upload/uploadVideo', variables)
        .then(response => {
            if (response.data.success) {
                alert('video Uploaded Successfully');
                console.log(response);
                // props.navigate()
            } else {
                // alert('Failed to upload video');
                console.log(response);
            }
        });

    }

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        console.log(files)
        formData.append("file", files[0])

        axios.post('http://localhost:5000/api/upload/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {

                    let variable = {
                        filePath: response.data.filePath,
                        fileName: response.data.fileName
                    }
                    setFilePath(response.data.filePath)

                    //gerenate thumbnail with this filepath ! 

                    axios.post('http://localhost:5000/api/upload/thumbnail', variable)
                        .then(response => {
                            if (response.data.success) {
                                setDuration(response.data.fileDuration)
                                setThumbnail(response.data.thumbsFilePath)
                            } else {
                                alert('Failed to make the thumbnails');
                            }
                        })


                } else {
                    alert('failed to save the video in server')
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <label> Upload Video</label>
            </div>

            {/* <FormControl> */}
            <form onSubmit={onSubmit}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <VideoLibraryIcon type="plus" style={{ fontSize: '5rem' }} />

                            </div>
                        )}
                    </Dropzone>

                    {Thumbnail !== "" &&
                        <div>
                            <img src={`http://localhost:5000/${Thumbnail}`} alt="haha" />
                        </div>
                    }

            </div>
            <label>Title</label>
            <Input 
            onChange={handleChangeTitle}
            vaule={title}
            />
            
            <label>Description</label>
            <Input
                onChange={handleChangeDescription}
                value={Description}
                />

            <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
            </Button>
            {/* </FormControl> */}
            </form>
        </div>
    )
}

// const AddVideo = () => {
    
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [video, setVideo] = useState('');
//     const [thumbnail, setThumbnail] = useState('');

//     const addVideoHandler = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();

//         formData.append('video', video);
//         formData.append('title', title);
//         formData.append('description', description);
//         formData.append('thumbnail', thumbnail);
//         await axios.post('http://localhost:5000/api/upload/uploadVideo', formData)

//     }

//     return (
//         <div>
//             <form onSubmit={addVideoHandler} method="POST" encType='multipart/form-data'>
//             <input
//                  type="file" 
//                  size="lg"
//                  name="video"
//                  onChange={(e) => setVideo(e.target.files[0])}
//                 />
//             <input 
//                 type="text"
//                 placeholder="title"
//                 onChange={(e) => setTitle(e.target.value)}
//             />
//             <input 
//                 type="textarea"
//                 placeholder="description"
//                 onChange={(e) => setDescription(e.target.value)}
//             />
//             <input
//                  type="file" 
//                  name="video"
//                  onChange={(e) => setVideo(e.target.files[0])}
//                 />
//             <button type="submit">Upload</button>
//             </form>
//         </div>
//     );
//   }
  
//   export default AddVideo;

export default AddVideo;