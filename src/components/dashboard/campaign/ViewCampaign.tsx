import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Campaign, formatDate } from "@/types";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { selectAuth } from "@/redux/AuthSlice";
import { useSelector } from "react-redux";
import { useCampaignContext } from "@/context";

export function ViewCampaign({ data }: { data: Campaign }) {
  const getStatusBadge = () => {
    switch (data.status) {
      case "COMPLETED":
        return (
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            Completed
          </span>
        );
      case "IN_PROGRESS":
        return (
          <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
            In progress
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
            Draft
          </span>
        );
    }
  };

  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { userToken } = useSelector(selectAuth);
  const { fetchCampaigns } = useCampaignContext();
  const deleteCampaign = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/campaigns/${data.id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        toast.success(response.data?.message);
        setIsDialogOpen(false); // Close the dialog on successful deletion
      }
    } catch (error) {
      //@ts-ignore
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
      setIsDialogOpen(false);
      await fetchCampaigns();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="md:min-w-[800px] w-[400px]">
        <DialogHeader>
          <DialogTitle>Campaign Details</DialogTitle>
        </DialogHeader>

        <div className="border-t border-gray-100">
          <dl className="grid grid-cols-2 sm:grid-cols-3 sm:gap-4">
            <div className="border-t border-gray-100 px-4 py-6">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700">
                {data.name}
              </dd>
            </div>
            <div className="border-t border-gray-100 px-4 py-6">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Start Date
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700">
                {formatDate(data.start_date)}
              </dd>
            </div>
            <div className="border-t border-gray-100 px-4 py-6">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                End Date
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700">
                {formatDate(data.end_date)}
              </dd>
            </div>
            <div className="border-t border-gray-100 px-4 py-6">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Status
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700">
                {getStatusBadge()}
              </dd>
            </div>
            <div className="border-t border-gray-100 px-4 py-6">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Banner URL
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 break-words truncate">
                <a
                  href={data.banner_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {data.banner_url}
                </a>
              </dd>
            </div>
            <div className="border-t border-gray-100 px-4 py-6 col-span-3">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Description
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700">
                {data.description}
              </dd>
            </div>
          </dl>
        </div>
        <DialogFooter>
          <Button rel="noopener noreferrer" className="md:mr-2 ">
            <Link to={data.banner_url}>Go to banner url</Link>
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="bg-red-500 w-full md:w-max hover:bg-red-700">Delete</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">
                    Delete Confirmation
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Are you sure you want to delete this campaign?
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    className="bg-gray-300 hover:bg-gray-400"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-700"
                    onClick={deleteCampaign}
                    disabled={loading}
                  >
                    {loading ? "Deleting..." : "Confirm"}
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
