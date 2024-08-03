import React, { createContext, useContext, useState, useCallback } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/AuthSlice";
import { Campaign } from "@/types";

const CampaignContext = createContext(null);

const useCampaignContext = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaignContext must be used within a ContextProvider');
  }
  return context;
};

const ContextProvider = ({ children }) => {
  const { userToken } = useSelector(selectAuth);
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/campaigns`, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
      setCampaigns(response.data.data);
    //  toast.success(response.data.message);
    } catch (error) {
      toast.error('Error fetching campaigns:', error.message);
    } finally {
      setLoading(false);
    }
  }, [userToken]);

  return (
    <CampaignContext.Provider value={{ fetchCampaigns, campaigns, loading }}>
      {children}
    </CampaignContext.Provider>
  );
};

export { CampaignContext, useCampaignContext, ContextProvider };
