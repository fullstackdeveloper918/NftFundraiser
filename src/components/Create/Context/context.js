import { createContext, useContext, useState } from "react";

export const FormContext = createContext();

export default function FormProvider({ children }) {
    const [data, setData] = useState({});
    console.log(data, 'dataaacreate')

    const setFormValues = (data) => {
        setData((prevValues) => ({
            ...prevValues,
            ...data,
        }));
    };

    return (
        <FormContext.Provider value={{ data, setFormValues }}>
            {children}
        </FormContext.Provider>
    );
}

export const useFormData = () => useContext(FormContext);