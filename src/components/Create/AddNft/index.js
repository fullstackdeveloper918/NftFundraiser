import { useEffect, useState } from "react";

// import styles from "../styles/styles.module.scss";
import FormCard from "./FormCard";

import Create from "./Create";
import UploadNft from "./uploadNft";
import FormProvider from "../Context/context";

import { Button, message, Steps } from 'antd';
import { set, useForm } from "react-hook-form";
import AddNFT from "./addNft";
import AddNFT2 from "./nft2";
import FormProviderNft from "./context";

const steps = [
  {
    title: 'Step1',
    content: <AddNFT />
  },
  {
    title: 'Step2',
    content: <AddNFT2 />,
  },
];
const UploadNftIndex = () => {

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const { setValue } = useForm();

  const prev = () => {
    // 
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  return (

    <FormProvider>

      {/* <FormCard currentStep={formStep} prevFormStep={prevFormStep}> */}
      <div className="steps-content">
        <Steps current={current} items={items} />
        {current === 0 && (

          <AddNFT current={current} next={next} prev={prev} />
        )}

        {current === 1 && <><AddNFT2 prev={prev} />

        </>
        }
      </div>


    </FormProvider>

  );
};

export default UploadNftIndex;
