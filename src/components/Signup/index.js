import { useState } from "react";

// import styles from "../styles/styles.module.scss";
import FormCard from "./FormCard";

import Signup from './Signup'
import CreateOrganization from './createOrganization';

const SignupIndex = () => {
  const [formStep, setFormStep] = useState(0);

  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

  return (
    <div>

      <FormCard currentStep={formStep} prevFormStep={prevFormStep}>
        {formStep >= 0 && (
          <Signup formStep={formStep} nextFormStep={nextFormStep} />
        )}
        {formStep >= 1 && (
          <CreateOrganization formStep={formStep} nextFormStep={nextFormStep} />
        )}



      </FormCard>
    </div>
  );
};

export default SignupIndex;
