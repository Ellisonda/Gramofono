import React from 'react';
import './Playlist.css'
import TrackList from '../TrackList/TrackList';
class Playlist extends React.Component{
  constructor(props){
    super(props)
    this.handleNameChange=this.handleNameChange.bind(this);
  }
  handleNameChange(event){
  //this.props.updatePlaylistName 
  this.props.onNameChange(event.target.value) //Este es el q hace q se aplice el cambio de nombre de playlist
  //this.setState({input:event.target.value})
  }
  render(){
    return (
<div className="Playlist">
  <input defaultValue={"New Playlist"} onChange={this.handleNameChange}/>
 <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove}  isRemoval={true}/>
  <button className="Playlist-save" onClick={this.props.onSave}>Save to Spotify</button>
</div>
    )
  }
}

export default Playlist;