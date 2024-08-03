import React, { useEffect, useState } from "react";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/20/solid";
import { FunnelIcon } from "@heroicons/react/24/outline";
import CampaignItem from "../../components/dashboard/campaign/CampaignItem";
import CreateCampaign from "@/components/dashboard/campaign/createCampaign";
import { useCampaignContext } from "@/context";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Campaign } from "@/types";

const stats = [
  {
    name: "New Subscriptions",
    stat: "71,897",
    previousStat: "70,946",
    change: "24%",
    changeType: "increase",
  },
  {
    name: "New Orders",
    stat: "58.16%",
    previousStat: "56.14%",
    change: "17%",
    changeType: "decrease",
  },
  {
    name: "Average Revenue",
    stat: "24.57%",
    previousStat: "28.62%",
    change: "25%",
    changeType: "increase",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CampaignsPage() {
  const [draftCampaigns, setDraftCampaigns] = useState<Campaign[]>([]);
  const [inProgressCampaigns, setInProgressCampaigns] = useState<Campaign[]>([]);
  const [completedCampaigns, setCompletedCampaigns] = useState<Campaign[]>([]);

  const { fetchCampaigns, campaigns, loading } = useCampaignContext();

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  useEffect(() => {
    if (campaigns) {
      setDraftCampaigns(campaigns.filter((campaign) => campaign.status === "DRAFT"|| ""));
      setInProgressCampaigns(campaigns.filter((campaign) => campaign.status === "IN_PROGRESS"));
      setCompletedCampaigns(campaigns.filter((campaign) => campaign.status === "COMPLETED"));
    }
  }, [campaigns]);

  return (
    <div className="w-full">
      <div className="w-full md:flex md:justify-between">
        <div>
          <p className="text-4xl font-semibold">Your total revenue</p>
          <p className="bg-gradient-to-r from-[#e644d0] via-[#f28884] text-4xl font-semibold to-[#fec640] bg-clip-text text-transparent">
            Ghc 6,609,604.00
          </p>
        </div>
        <div className="flex gap-5 items-center mt-5 md:mt-0">
          <button
            type="button"
            className="rounded-md flex items-center gap-3 bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <FunnelIcon className="h-4 w-4" /> Select dates
          </button>
          <button
            type="button"
            className="rounded-md flex items-center gap-3 bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <FunnelIcon className="h-4 w-4" /> Filter
          </button>
        </div>
      </div>
      <div className="mt-10">
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.name}
              className="overflow-hidden rounded-lg bg-white px-4 py-5 border-2 border-zinc-200 sm:p-6"
            >
              <dt className="truncate text-sm font-medium text-gray-500 mb-5">
                {item.name}
              </dt>
              <span className="flex items-center gap-2">
                <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
                  {item.stat}
                </dd>
                <div
                  className={classNames(
                    item.changeType === "increase"
                      ? "bg-green-100 text-green-500"
                      : "bg-red-100 text-red-500",
                    "inline-flex items-baseline rounded-lg px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0"
                  )}
                >
                  {item.changeType === "increase" ? (
                    <ArrowTrendingUpIcon
                      aria-hidden="true"
                      className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                    />
                  ) : (
                    <ArrowTrendingDownIcon
                      aria-hidden="true"
                      className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                    />
                  )}
                  {item.change}
                </div>
              </span>
              <p className="text-sm font-light mt-2">Compared to last week</p>
            </div>
          ))}
        </dl>
      </div>
      <div className="w-full flex justify-between mt-4 items-center">
        <h3 className="text-2xl font-semibold">Recent Campaigns</h3>
        <span className="text-lg w-max underline flex items-center">
          <Link to="/dashboard/campaign/view-all">View all</Link>
          <ArrowUpRightIcon className="h-5 w-5 underline" />
        </span>
      </div>

      {loading ? (
        <div className="w-full h-[50vh] flex justify-center items-center py-10">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </div>
      ) : (
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h2 className="text-base mb-4 flex items-center gap-2">
                Draft{" "}
                <div className="rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-black">
                  {draftCampaigns.length}
                </div>
              </h2>
              <div className="w-full flex flex-col gap-3">
                {draftCampaigns.slice(0, 5).map((campaign) => (
                  <CampaignItem key={campaign.id} data={campaign} />
                ))}
              </div>
              <CreateCampaign />
            </div>
            <div>
              <h2 className="text-base mb-4 flex items-center gap-2">
                In Progress{" "}
                <div className="rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-black">
                  {inProgressCampaigns.length}
                </div>
              </h2>
              <div className="w-full flex flex-col gap-3">
                {inProgressCampaigns.slice(0, 5).map((campaign) => (
                  <CampaignItem key={campaign.id} data={campaign} />
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-base mb-4 flex items-center gap-2">
                Completed{" "}
                <div className="rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-black">
                  {completedCampaigns.length}
                </div>
              </h2>
              <div className="w-full flex flex-col gap-3">
                {completedCampaigns.slice(0, 5).map((campaign) => (
                  <CampaignItem key={campaign.id} data={campaign} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
