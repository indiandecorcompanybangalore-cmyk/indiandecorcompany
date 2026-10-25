import React, { createContext, useContext, useState } from 'react';

const LeadContext = createContext();

export const LeadProvider = ({ children }) => {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [initialRequirement, setInitialRequirement] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [lastSubmission, setLastSubmission] = useState(null);

  const openConsultation = (requirement = '') => {
    setInitialRequirement(requirement);
    setIsConsultationOpen(true);
  };

  const closeConsultation = () => {
    setIsConsultationOpen(false);
  };

  const submitLead = (leadData) => {
    console.log('Lead captured:', leadData);
    setLastSubmission(leadData);
    setIsConsultationOpen(false);
    setIsSuccessModalOpen(true);
  };

  return (
    <LeadContext.Provider
      value={{
        isConsultationOpen,
        openConsultation,
        closeConsultation,
        initialRequirement,
        isSuccessModalOpen,
        setIsSuccessModalOpen,
        lastSubmission,
        submitLead
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

export const useLead = () => useContext(LeadContext);
