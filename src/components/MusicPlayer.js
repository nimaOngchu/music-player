import React, { Component } from 'react';
import './musicplayer.css';
import SongInfo from './song-info/SongInfo';
import Controller from './controller/Controller';
import Slider from './slider/Slider';
import songs from '../songs';

const song = new Audio();

class MusicPlayer extends Component {
  constructor() {
    super();

    this.state = {
      songs: songs,
      currentSongIndex: 0,
      playPauseButton: 'play_circle_outline',

    };
  }

  componentDidMount() {
    this.loadSong();
  }
  loadSong = () => {
    song.src = songs[this.state.currentSongIndex].src;
  };
  playPause = () => {
    if (song.paused) {
      song.play();
      this.setState({ playPauseButton: 'pause_circle_outline' });
    } else {
      song.pause();
      this.setState({ playPauseButton: 'play_circle_outline' });
    }
  };
  nextSong = () => {

    if (this.state.currentSongIndex < songs.length - 1) {
      song.src = songs[this.state.currentSongIndex+1].src
      this.setState({ currentSongIndex: this.state.currentSongIndex + 1 })
    }
    else {
      this.setState({ currentSongIndex: 0 })
      song.src = songs[0].src
    }
    this.setState({ playPauseButton: 'pause_circle_outline' });
    song.play();

  }
  prevSong = () => {
    if(this.state.currentSongIndex = 0){}
  }
  render() {
    let currentSongInfo = songs[this.state.currentSongIndex];
    return (
      <div className="muicplayer-conatainer">
        <SongInfo
          songTitle={currentSongInfo.song_name}
          albumName={currentSongInfo.artist}
          image={currentSongInfo.image}
        />
        <div className="slider-controls">
          <Controller
            playPause={this.playPause}
            prevSong={this.prevSong}
            nextSong={this.nextSong}
            shuffle={this.shuffle}
            repeat={this.repeat}
            playPauseButton={this.state.playPauseButton}
          />
          <div className="slider-time-container">
            <div className="song-duration">0:12</div>
            <Slider />
            <div className="song-duration">2:23</div>
          </div>
        </div>
        <div className="playlist-volume-container">
          <i className="material-icons">list_alt</i>
          <i className="material-icons">volume_down</i>
          <Slider />
        </div>
      </div>
    );
  }
}
export default MusicPlayer;
