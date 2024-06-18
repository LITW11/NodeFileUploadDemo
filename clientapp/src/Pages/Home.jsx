import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {

    const [images, setImages] = useState([]);

    useEffect(() => {
        const loadImages = async () => {
            const { data } = await axios.get('/api/fileupload/getall');
            setImages(data);
        }

        loadImages();
    }, []);

    return (
        <div className='row'>
            <div className='col-md-6 offset-md-3'>
                <table className='table table-hover table-stripe table-bordered'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {images.map(i => <tr key={i.id}>
                            <td>{i.title}</td>
                            <td>
                                <img src={`/api/fileupload/image/${i.imageName}`} style={{width: 200}} />
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home;