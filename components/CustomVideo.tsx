import { useState } from 'react';

interface CustomVideoProps {
  src: string;
}

const CustomVideo: React.FC<CustomVideoProps> = ({ src }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  return (
    <>
      {hasError ? (
        <div style={{ width: '250px', height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'gray' }}>
          Video no longer available
        </div>
      ) : (
        <video src={src} controls width={250} height={250} onError={handleError}>
          Your browser does not support the video tag.
        </video>
      )}
    </>
  );
};

export default CustomVideo;
