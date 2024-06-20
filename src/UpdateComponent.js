import { useState } from "react";
import {doc, updateDoc} from 'firebase/firestore';
import { db } from "./fbconfig";

function UpdateComponent({id, initialTitle, initialTagline, initialContent, onUpdated})
{
    //state variables
    const [title, setTitle] = useState(initialTitle);
    const [tagline, setTagline] = useState(initialTagline);
    const [content, setContent] = useState(initialContent);

    const handleUpdate = async(e) => {

        e.preventDefault();
        console.log("Update button clicked!");
        const documentRef = doc(db, "data", id); 
        try{
            await updateDoc(documentRef, {Title: title, Tagline: tagline, Content: content});
            onUpdated();
        }
        catch(error)
        {
            console.error("Error updating document: ", error)
        }
    }

    return(
       
        <>
        <form onSubmit={handleUpdate} className="form-group bg-light rounded p-3 mt-5" >

            <input className="form-control mb-3" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title"/>
            

            <input className="form-control mb-3"value={tagline} onChange={e => setTagline(e.target.value)} placeholder="Tagline"/>

            <textarea className="form-control mb-3"value={content} onChange={e => setContent(e.target.value)} placeholder="Content"></textarea>
            <button type="submit" className="btn btn-primary">Update Document</button>
        </form>
        </>
    )
}

export default UpdateComponent;