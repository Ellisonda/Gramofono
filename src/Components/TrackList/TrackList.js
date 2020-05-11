import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component{
    render(){
        return(
<div className="TrackList"> 
    {this.props.tracks && this.props.tracks.map(track=>{ //OJO he añadido this.props.tracks &&, n se si es correcto
       return <Track track={track} key={track.id}  onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>
    })}
    
</div>
        )
    }
}
export default TrackList;