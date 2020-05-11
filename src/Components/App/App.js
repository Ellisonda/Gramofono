import React from 'react';

import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
    constructor(props){
        super(props)
        this.state={searchResults:[],
                    playlistName:'My Playlist',
                    playlistTracks: []};
              
        this.addTrack=this.addTrack.bind(this);
        this.removeTrack=this.removeTrack.bind(this);
        this.updatePlaylistName=this.updatePlaylistName.bind(this);
        this.savePlaylist=this.savePlaylist.bind(this);
        this.search=this.search.bind(this);
    }
    addTrack(track){
      let tracks=this.state.playlistTracks;  //OJO AÑADIDA S FINAL
      if (tracks.find(savedTrack => savedTrack.id === track.id)) {
        return;
      }
      tracks.push(track);
      this.setState({playlistTracks: tracks});  //OJO ESTAS DOS ULTIMAS LINEAS. Fundamentales para que añada las canciones
    }
    removeTrack(track){
      let tracks=this.state.playlistTracks;  //OJO AÑADIDA S FINAL
      tracks=tracks.filter(currentTrack=>currentTrack.id !== track.id);
      this.setState({playlistTracks: tracks});
    }
    updatePlaylistName(name){
      this.setState({playlistName:name})
    }
    savePlaylist(){
      const trackUris=this.state.playlistTracks.map(track=>track.uri);
      Spotify.savePlaylist(this.state.playlistName, trackUris).then(()=>{
        this.setState({ playlistName: 'New Playlist', playlistTracks:[]})   //asi de base, genericamente aparecera New playlist, y un empty array para rellenar con tracks
      });
      
    }
    search(term){
      Spotify.search(term).then(searchResults=>{
        this.setState({searchResults:searchResults}) //Entiendes?Dice q el resiltado de SearchResult sea lo que resulta del metodo search en Spotify
      });
    }
    render(){
  return (
    <div>
  <h1><span className="highlight">G</span>ramófono</h1>
  <div className="App">
    <SearchBar onSearch={this.search}/>
      <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
        <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave= {this.savePlaylist}/>
          </div>
        </div>
    </div>
     );
  }
}

export default App;


