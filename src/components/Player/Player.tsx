import React, { useRef } from 'react';
import './Player.css';
import { PlayerProps } from '../../models/Player';

const Player: React.FC<PlayerProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <div className="player-container">
      <video ref={videoRef} width="100%" controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Player;
