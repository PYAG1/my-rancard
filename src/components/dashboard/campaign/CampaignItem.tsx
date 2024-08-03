import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import UpdateCampaign from "./UpdateCamPaign";
import { ViewCampaign } from "./ViewCampaign";
import { Campaign, formatDate } from "@/types";

import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

interface CampaignItemProps {
  data: Campaign;
}

export default function CampaignItem({ data }: CampaignItemProps) {

  const getProgress = () => {
    switch (data.status) {
      case 'COMPLETED':
        return 100;
      case 'IN_PROGRESS':
        return 50;
      default:
        return 0;
    }
  };

  const getStatusText = () => {
    switch (data.status) {
      case 'COMPLETED':
        return 'Completed';
      case 'IN_PROGRESS':
        return 'In Progress';
      default:
        return 'Draft';
    }
  };

  return (
    <Card className="w-full border-2 shadow-none p-1">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <AvatarGroup total={24} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 12 } }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </AvatarGroup>
          <UpdateCampaign data={data} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-3">
          <p className="text-lg w-full">{data.description}</p>
          <div className='my-3'>
            <p className="text-black font-base text-xs mb-3">
              Status: <span className="text-gray-400">{getStatusText()}</span>
            </p>
            <Progress value={getProgress()} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-gray-400 font-thin text-xs">
          Last Updated: <span className="text-black">{formatDate(data?.updated_at)}</span>
        </p>
        <ViewCampaign data={data} />
      </CardFooter>
    </Card>
  );
}
