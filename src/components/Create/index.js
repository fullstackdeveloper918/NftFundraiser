import { useState } from "react";
import Create from "./Create";
import UploadNft from "./uploadNft";
import FormProvider from "./Context/context";
import { Steps } from 'antd';

const steps = [
  {
    title: 'Create Project',
    content: <Create />
  },
  {
    title: 'Upload NFT',
    content: <UploadNft />,
  },
];

const UploadNftIndex = () => {

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  return (
    <section className="author-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-14 col-md-9 mt-10">
            {/* Intro */}
            <div className="intro mt-5  mb-4 mb-lg-5">
              <div className="intro-content">
                <span>Get Started</span>
                {current === 0 ? (
                  <h3 className="mt-3 mb-0">Create Project</h3>
                ) : (
                  <><h3 className="mt-3 mb-0">Upload NFT</h3><p> Allowed types: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF</p><p>Maximum size: 100 MB</p></>
                )}
              </div>
            </div>
            <FormProvider>
              {/* <FormCard currentStep={formStep} prevFormStep={prevFormStep}> */}
              <div className="steps-content">
                <Steps current={current} items={items} />
                {current === 0 && (
                  <Create current={current} next={next} prev={prev} />
                )}
                {current === 1 && <><UploadNft prev={prev} />
                </>
                }
              </div>
              {/* </FormCard> */}
            </FormProvider>
          </div>
        </div >
      </div >
    </section >
  );
};
export default UploadNftIndex;
