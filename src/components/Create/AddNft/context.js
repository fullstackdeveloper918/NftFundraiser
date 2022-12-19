import { createContext, useContext, useState } from "react";

export const FormContext = createContext();

export default function FormProviderNft({ children }) {
    const [data, setData] = useState({});
    console.log(data, 'dataaacreate')
    // localStorage.setItem("data", JSON.stringify(data))

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