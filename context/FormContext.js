import React, { createContext, useState } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [requestDesignData, setRequestDesignData] = useState({});
  const [measurementsData, setMeasurementsData] = useState({});
  const [uploadData, setUploadData] = useState([]);

  return (
    <FormContext.Provider
      value={{
        requestDesignData,
        setRequestDesignData,
        measurementsData,
        setMeasurementsData,
        uploadData,
        setUploadData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
