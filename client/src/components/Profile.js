import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Profile({headers}) {

    const [displayName, setName] = useState(null);
    const [picUrl, setUrl] = useState(null);

    useEffect(() => {
        const getData = async() => {
            const response = await axios.get("/profile", {headers})
            setName(response.data.display_name)
            setUrl(response.data.images[0].url)
        }

        getData()
    }, [])

    return(
        <div id="profile">
            <img id="profilePic" src={picUrl} style={{border: "2px solid black"}}/>
            <h4 className="center">{displayName}</h4>
        </div>
    )
}