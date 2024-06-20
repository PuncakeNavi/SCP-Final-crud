import {useState} from 'react';
import {collection, addDoc} from 'firebase/firestore';
import {db} from './fbconfig'
import {fetchData} from './ReadComponent'

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { storage } from './fbconfig';

function CreateComponent()
{
    //state variables
    const [title, setTitle] = useState("");
    const [tagline, setTagline] = useState("");
    const [content, setContent] = useState("");

    const [image, setImage] = useState(null); 


    const ourCollection = collection(db,"data");

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        if (!image) return; 
        const imageRef = ref(storage, `images/${image.name}`);
        try {
            const imageSnapshot = await uploadBytes(imageRef, image); 
            const imageURL = await getDownloadURL(imageRef);
            await addDoc(ourCollection, ({Title: title, Tagline: tagline, Content: content, ImageURL: imageURL}));
            fetchData();
            setTitle("");
            setTagline("");
            setContent("");
            setImage(null);
        }
        catch(error)
        {
            console.error("Error creating document: ", error);
        }
    };
    return(
        <div>
            <form onSubmit={handleSubmit} className='form-group bg-dark rounded p-3'>
                <input className='form-control mb-3' type='text' value={title} onChange={e => setTitle(e.target.value)} placeholder='Title' />

                <input className='form-control mb-3' type='text' value={tagline} onChange={e => setTagline(e.target.value)} placeholder='Tagline' />

                <input className='form-control mb-4' type='text' value={content} onChange={e => setContent(e.target.value)} placeholder='Content' />

                <input className='form-control mb-3' type="file"  
                onChange={e => setImage(e.target.files[0])} /> 


                <button className= 'btn btn-primary'>Activate SCP</button>

            </form>
        </div>
    )
}

export default CreateComponent;