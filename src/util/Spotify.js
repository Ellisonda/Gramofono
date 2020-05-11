import Searchbar from '../Components/SearchBar/SearchBar';

const clientId='4c18518499644df8bc85f2e642168b4f';
const redirectUri="http://localhost:3000/";
let accessToken;
const Spotify ={
getAccessToken(){
    if(accessToken){
        return accessToken;
    }
    //check tokens
    const accessTokenMatch= window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch= window.location.href.match(/expires_in=([^&]*)/);
    if(accessTokenMatch && expiresInMatch){
        accessToken= accessTokenMatch[1];
        const expiresIn= Number(expiresInMatch[1]); 
        //wipe accessToken tras cierto tiempo
        window.setTimeout(()=>accessToken= '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
     
        //Y si no tiene token, se direcciona al usuario a logearse.
    }else {
       const accessUrl= `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
       window.location= accessUrl;
    }
},
search(term){
    const accessToken= Spotify.getAccessToken(); 
   return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {headers: {Authorization: `Bearer ${accessToken}`}}).then(response=>{
       return response.json()
   }).then(jsonResponse=>{
       if(!jsonResponse.tracks){ //si jsonResponse.tracks es falso, n existe, entocnes devuelve un empy array.
           return []
       }else{
           return jsonResponse.tracks.items.map( track=>({
               id: track.id,
               name: track.name,
               artist: track.artists[0].name,
               album: track.album.name,
               uri: track.uri 
           }))
       }
   })
},
savePlaylist(name, trackUris){
    
    if(!name || !trackUris.length){  //comprueba si hay valores grabados con mismo name o  array con trackUris
        return;
    }
    const accessToken= Spotify.getAccessToken(); //iguala el accesToken al token actual
    const headers={Authorization: `Bearer ${accessToken}`}
    let userId;
    return fetch(` https://api.spotify.com/v1/me`, {headers: headers}).then(response=>response.json()).then(jsonResponse=>{
        userId= jsonResponse.id; //no lo he entendido muy bien.Hemos convertido el reponse a JSON como siempre, y guardado response.id parameter en la variable de userId
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {headers:headers, method: 'POST', body:JSON.stringify({name: name})}).then(response=> response.json()
        ).then(jsonResponse=>{
            const playlistId= jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, { headers: headers, method: 'POST', body: JSON.stringify({uris: trackUris})})
        })
    })
}
    
};
export default Spotify;