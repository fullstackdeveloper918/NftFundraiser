import { React } from 'react';
import ReactImagePickerEditor from 'react-image-picker-editor';

import 'react-image-picker-editor/dist/index.css'

const UploadImage = ({ initalImag, imageSrc, setImageSrc, show = true }) => {
  const config2 = {
    borderRadius: '8px',
    language: 'en',
    width: '330px',
    height: '250px',
    objectFit: 'contain',
    compressInitial: null,
    hideDownloadBtn: true
  };

  const initialImage = initalImag;

  return <div className='image-container'>
    < ReactImagePickerEditor
      config={config2}
      // initialImage={im}
      imageSrcProp={initialImage}
      imageChanged={(newDataUri) => { setImageSrc(newDataUri) }} />
    {/* <br /> <br />
    <hr />
    <br /> */}
    {/* <p>Image preview:</p> */}
    {/* {imageSrc && <img src={imageSrc} alt="example" style={{ maxHeight: '900px', maxWidth: '100%', objectFit: 'contain', background: 'black' }} />}
    {!imageSrc && <h2 style={{ textAlign: 'center', color: '#FFF' }}>No image loaded yet</h2>} */}

  </div>
}

export default UploadImage;


