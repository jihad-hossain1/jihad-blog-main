const VideoFrame = ({ videoUrl }) => {
  return (
    <div className="max-w-full m-auto">
      {videoUrl ? (
        <iframe
          src={videoUrl}
          id="ytplayer"
          type="text/html"
          width="100%"
          height="360"
        />
      ) : null}
    </div>
  );
};

export default VideoFrame;
