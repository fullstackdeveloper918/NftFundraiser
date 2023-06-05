import React, { useState } from 'react';
import ReactImagePickerEditor, { ImagePickerConf } from 'react-image-picker-editor';



const UploadImage = ({ imageSrc, setImageSrc }) => {

    

    const config2 = {
        borderRadius: '8px',
        language: 'en',
        width: '330px',
        height: '250px',
        objectFit: 'contain',
        compressInitial: null,
        hideDownloadBtn: true
    };

    const initialImage = '';

    return <div className='image-container'>


        <ReactImagePickerEditor
            config={config2}
            imageSrcProp={initialImage}
            imageChanged={(newDataUri) => { setImageSrc(newDataUri); }} /><br /><br /><hr /><br /><p>Image preview:</p>
        {imageSrc && <img src={imageSrc} alt="example" style={{ maxHeight: '900px', maxWidth: '100%', objectFit: 'contain', background: 'black' }} />}
        {!imageSrc && <h2 style={{ textAlign: 'center', color: '#FFF' }}>No image loaded yet</h2>}


    </div>
}

export default UploadImage;

