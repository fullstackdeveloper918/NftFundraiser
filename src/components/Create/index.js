import { useEffect, useState } from "react";

// import styles from "../styles/styles.module.scss";
import FormCard from "./FormCard";

import Create from "./Create";
import UploadNft from "./uploadNft";
import FormProvider, { useFormData } from "./Context/context";

import { Button, message, Steps } from 'antd';
import { set, useForm } from "react-hook-form";

const steps = [
  {
    title: 'First Step',
    content: <Create />
  },
  {
    title: 'second Step',
    content: <UploadNft />,
  },
];
const UploadNftIndex = () => {
  // const [formStep, setFormStep] = useState(0);
  // const { setValue } = useForm();
  const [current, setCurrent] = useState(0);
  // debugger

  // const { prevValues, setFormValues } = useFormData();
  const next = () => {
    setCurrent(current + 1);
  };
  const { setValue } = useForm();
  // const da = localStorage.getItem("data")

  // Object.keys(da).map((item) => {

  // console.log('des', da)
  // })
  const prev = () => {
    // debugger
    setCurrent(current - 1);


  };


  // const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

  // const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  return (
    <FormProvider>

      {/* <FormCard currentStep={formStep} prevFormStep={prevFormStep}> */}
      <div className="steps-content">
        <Steps current={current} items={items} />
        {current === 0 && (

          <Create current={current} next={next} prev={prev} />
        )}

        {current === 1 && <><UploadNft />
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button></>
        }
        {/* <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}

          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div> */}
      </div>
      {/* </FormCard> */}
    </FormProvider>
  );
};

export default UploadNftIndex;
