import {useState, useEffect} from 'react';
import {collection, getDocs, deleteDoc, doc} from 'firebase/firestore';
import {db} from './fbconfig';
import UpdateComponent from './UpdateComponent';
export let fetchData;

function ReadComponent()
{
    //state variables
    const ourCollection = collection(db, "data");
    const [readData, setReadData] = useState([]);
    const [editingId, setEditingId] = useState(null);

    // fetch data function
    fetchData = async () => {
        try{
            const snapshot = await getDocs(ourCollection);
            setReadData(
                snapshot.docs.map(
                    doc => ({...doc.data(), id: doc.id})
                )
            );
        }
        catch(error)
        {
            console.error("Error fetching data: ", error);
        }
    }

    useEffect(() => {fetchData()}, []);


     // Delete function
     const handleDelete = async(id) =>
     {
         const docRef = doc(db, "data", id);
         try
         {
             await deleteDoc(docRef);
             //window.location.reload();
         }
         catch(error)
         {
             console.error("Error deleteing document: ", error);
         }
         fetchData();
     }

     const handleRefresh = () => {
        setEditingId(null);
        fetchData();
     }

    return(
        <>
        <div className='mt-3 border rounded shadow p-3'>
            {
                readData.map(
                    ({id, Title, Tagline, Content, ImageURL}) => (
                        <div key={id}>
                            {ImageURL && <img src={ImageURL} 
                            alt="Document" 
                            style={{ width: '30%' }} />} 
                            <h3>{Title}</h3>
                            <h4>{Tagline}</h4>
                            <p>{Content}</p>
                            <button className='btn btn-danger' onClick={()=> handleDelete(id)}>Delete SCP</button>
                            <button onClick={()=>setEditingId(id)} className='btn btn-info'>Edit</button>
                            <hr className='mb-3' />

                            
                            {
                                editingId === id && (
                                    <UpdateComponent 
                                        id={id}
                                        initialTitle={Title}
                                        initialTagline={Tagline}
                                        initialContent={Content}
                                        onUpdated={handleRefresh}
                                    />
                                )
                            }
                        </div>
                    )
                )
            }

        </div>
        </>
    );
}

export default ReadComponent;