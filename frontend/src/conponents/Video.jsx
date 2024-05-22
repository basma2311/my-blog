import ReactPlayer from "react-player";

const Video = () => {


  const internalSource = "https://dai.ly/k18JBehNE67SkQA66Mu";
  return (

      <ReactPlayer url={internalSource} playing={true} style={{maxWidth:"100%"}}/>
  
  );
};

export default Video;
