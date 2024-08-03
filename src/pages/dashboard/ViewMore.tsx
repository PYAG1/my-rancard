import { Button } from '@/components/ui/button';
import { selectAuth } from '@/redux/AuthSlice';
import { Campaign } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CampaignItem from '../../components/dashboard/campaign/CampaignItem';
import { useCampaignContext } from '@/context';

const statuses = ['ALL', 'DRAFT', 'IN_PROGRESS', 'COMPLETED'];

export default function ViewMore() {

  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');



  const { fetchCampaigns, campaigns, loading } = useCampaignContext();

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  useEffect(() => {
    const filtered = campaigns.filter(campaign =>
      (statusFilter === 'ALL' || campaign.status === statusFilter) &&
      (campaign.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCampaigns(filtered);
  }, [searchTerm, statusFilter, campaigns]);

  return (
    <div className="w-full p-4">
        <Button className='mb-3'>
            <Link to="/dashboard/campaign">Go Back</Link>
        </Button>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search campaigns"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          {statuses.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredCampaigns.length === 0 ? (
        <p>No campaigns found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredCampaigns.map(campaign => (
            <CampaignItem key={campaign.id} data={campaign} />
          ))}
        </div>
      )}
    </div>
  );
}
