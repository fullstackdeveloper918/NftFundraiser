import { useState } from "react";

// import styles from "../styles/styles.module.scss";
import FormCard from "./FormCard";

import Signup from './Signup'
import CreateOrganization from './createOrganization';
import FormProvider from "./Context/context";

const SignupIndex = () => {
  const [formStep, setFormStep] = useState(0);

  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

  return (
    <FormProvider>

      <FormCard currentStep={formStep} prevFormStep={prevFormStep}>
        {formStep === 0 && (
          <Signup formStep={formStep} nextFormStep={nextFormStep} />
        )}
        {formStep === 1 && <CreateOrganization />
        }
      </FormCard>
    </FormProvider>
  );
};

export default SignupIndex;
