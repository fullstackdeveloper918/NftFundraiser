import { useState } from "react";

// import styles from "../styles/styles.module.scss";
import FormCard from "./FormCard";

import Create from "./Create";
import UploadNft from "./uploadNft";
import FormProvider from "./Context/context";

const UploadNftIndex = () => {
  const [formStep, setFormStep] = useState(1);

  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

  return (
    <FormProvider>

      <FormCard currentStep={formStep} prevFormStep={prevFormStep}>
        {formStep === 0 && (
          <Create formStep={formStep} nextFormStep={nextFormStep} />
        )}
        {formStep === 1 && <UploadNft />
        }
      </FormCard>
    </FormProvider>
  );
};

export default UploadNftIndex;
