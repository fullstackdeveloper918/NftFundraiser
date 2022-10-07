import { useState } from 'react' 
import CreatorForm from './Signup'
import CreateOrganization from './createOrganization'

const SignUp = ()=>{
    const [step,setStep] = useState(0)
    return (
        <>
          {step === 0 ?
            <CreatorForm setStep={setStep}/>
          :
           <CreateOrganization/>
          }
        </>

    )
}

export default SignUp;