import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext()

export const StateContextProvider = ({children}) => {
  const {contract} = useContract('0x792ae76D470CC8f11A9819a4a6D4E1A25381465e')
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress()
  const connect = useMetamask()

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address,
        form.title,
        form.description, // description
        form.target,
        new Date(form.deadline).getTime(), // deadline,
        form.image
      ])
      
      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  return (
    <StateContext.Provider 
    value={{
      address,
      contract,
      createCampaign: publishCampaign
    }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);