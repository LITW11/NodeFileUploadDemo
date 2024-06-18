import { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const FileUpload = () => {

    const fileRef = useRef();

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    
    const navigate = useNavigate();

    const onUploadClick = async () => {
        if (!fileRef.current.files.length) {
            return;
        }
        const file = fileRef.current.files[0];
        const base64 = await toBase64(file);
        await axios.post('/api/fileupload/upload', {
            title,
            base64data: base64
        });

        navigate('/');
    }

    const onFileChosen = e => {
        setImage(fileRef.current.files[0]);
    }
    
    let imageUrl = '';
    if(image) {
        imageUrl = URL.createObjectURL(image);
    }

    return (
        <div className="d-flex vh-100" style={{ marginTop: -70 }}>
            <div className="d-flex w-100 justify-content-center align-self-center">
                {imageUrl && <img src={imageUrl} style={{width:200}} /> }
                <div className="row">
                    <div className='col-md-4'>
                        <input type='text' className='form-control' value={title} onChange={e => setTitle(e.target.value)} placeholder='Title' />
                    </div>
                    <div className="col-md-6">
                        <input ref={fileRef} type="file" onChange={onFileChosen} className='form-control' />
                    </div>
                    <div className='col-md-2'>
                        <button className='btn btn-primary' onClick={onUploadClick}>Upload</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FileUpload;