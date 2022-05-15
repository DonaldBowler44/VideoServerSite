import axios from 'axios';
import React, { useState } from 'react';

const AddPic = () => {
    
    const [thumbnail, setThumbnail] = useState('');

    const addPicHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('thumbnail', thumbnail);
        await axios.post('http://localhost:5000/api/uploadpic/uploadThumb', formData)

    }

    return (
        <div>
            <form onSubmit={addPicHandler} method="POST" encType='multipart/form-data'>
            <input
                 type="file" 
                 size="lg"
                 name="thumbnail"
                 onChange={(e) => setThumbnail(e.target.files[0])}
                />
            <button type="submit">Upload</button>
            </form>
        </div>
    );
  }
  
  export default AddPic;