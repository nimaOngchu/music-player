import React, { Component } from 'react';
import './musicplayer.css';
import SongInfo from './song-info/SongInfo';
import Controller from './controller/Controller';
import songs from '../songs';
import OngchuSlider from './ongchuSlider/OngchuSlider';
import Slider from './slider/Slider';

const song = new Audio();

class MusicPlayer extends Component {
  constructor() {
    super();

    this.state = {
      songs: songs,
      currentSongIndex: 0,
      playPauseButton: 'play_circle_outline',
      muted: false,
      volume: 100
    };
  }

  componentDidMount() {
    this.loadSong();
  }
  changeSliderValue = (value, name) => {
    if(name === 'progressBar'){
      this.setState({ sliderValue: value });
    } else if (name === 'volume') {
      this.setState({ volume:value})
    }
  };
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
      song.src = songs[this.state.currentSongIndex + 1].src;
      this.setState({ currentSongIndex: this.state.currentSongIndex + 1 });
    } else {
      this.setState({ currentSongIndex: 0 });
      song.src = songs[0].src;
    }
    this.setState({ playPauseButton: 'pause_circle_outline' });
    song.play();
  };

  adjustVolume = (volume) => {
    song.volume = (volume / 100).toFixed(2);
  };

  prevSong = () => {
    if (this.state.currentSongIndex === 0) {
      this.setState({ currentSongIndex: songs.length - 1 });
      song.src = songs[songs.length - 1].src;
    } else {
      this.setState({ currentSongIndex: this.state.currentSongIndex - 1 });
      song.src = songs[this.state.currentSongIndex - 1].src;
    }
    this.setState({ playPauseButton: 'pause_circle_outline' });
    song.play();
  };
  render() {
    let currentSongInfo = songs[this.state.currentSongIndex];
    return (
      <div style={{ margin: '0 2rem' }}>
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
              <OngchuSlider
                sliderName="progressBar"
                value={this.state.sliderValue}
                changeValue={this.changeSliderValue}
              />
              <div className="song-duration">2:23</div>
            </div>
          </div>
          <div className="playlist-volume-container">
            <i className="material-icons">list_alt</i>
            <i className="material-icons">
              volume_down
            </i>
            <OngchuSlider
              sliderName="volume"
              value={this.state.volume}
              changeValue={this.changeSliderValue}
              adjustVolume ={this.adjustVolume}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default MusicPlayer;
