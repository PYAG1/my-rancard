import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import TextField from '@/components/core-ui/text-field';
import { useFormik } from 'formik';
import TextAreaField from '@/components/core-ui/text-area';
import CustomSelect from '@/components/core-ui/custom-select';
import { DatePickerDemo } from '@/components/core-ui/date-picker';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useSelector } from 'react-redux';
import { selectAuth } from '@/redux/AuthSlice';
import { useCampaignContext } from '@/context';

export default function CreateCampaign() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userToken } = useSelector(selectAuth);
  const {fetchCampaigns}=useCampaignContext()
  const CamPaignFormik = useFormik({
    initialValues: {
      name: "",
      description: "",
      start_date: "",
      end_date: "",
      banner_url: "",
      status: ""
    },
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/campaigns`,
          values,
          {
            headers: {
              'Authorization': `Bearer ${userToken}`,
            }
          }
        );
        if (response.status === 200) {
          toast.success(response.data?.message);
          setOpen(false);
        }
      } catch (error) {
        //@ts-ignore
        toast.error(error.response?.data?.message);
      } finally {
        await fetchCampaigns()
        setLoading(false);
        resetForm();
  
      }
    },
  });

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative mt-5 w-full flex gap-2 justify-center items-center rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-gray-400 focus:outline-none"
      >
        <PlusCircleIcon className='w-5 h-5 text-black' />
        <span className="block text-lg text-gray-900">Add Campaign</span>
      </button>
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <DialogBackdrop
          className="fixed inset-0 bg-black bg-opacity-70 transition-opacity"
        />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            className="relative transform overflow-hidden rounded-lg bg-white px-6 py-8 text-left shadow-xl transition-all"
          >
            <div>
              <div className="flex justify-between items-center">
                <DialogTitle as="h3" className="text-xl font-semibold leading-6 text-gray-900">
                  Create Campaign
                </DialogTitle>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className='w-5 h-5' />
                </button>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Add a new Campaign by filling the necessary details
                </p>
              </div>
              <form className='flex flex-col gap-5 my-4' onSubmit={CamPaignFormik.handleSubmit}>
                <TextField
                  type="text"
                  id="name"
                  placeholder="Campaign name"
                  label=""
                  {...CamPaignFormik}
                />
                <TextAreaField
                  id="description"
                  placeholder="Description"
                  label=""
                  {...CamPaignFormik}
                />
                <div className='w-full flex flex-col gap-5 md:flex-row md:gap-8 justify-between'>
                  <DatePickerDemo
                    placeholder={"Enter start date"}
                    label={""}
                    id="start_date"
                    {...CamPaignFormik}
                  />
                  <DatePickerDemo
                    placeholder={"Enter end date"}
                    label={""}
                    id="end_date"
                    {...CamPaignFormik}
                  />
                </div>
                <TextField
                  type="text"
                  id="banner_url"
                  placeholder="Banner URL"
                  label=""
                  {...CamPaignFormik}
                />
                <CustomSelect
                  options={[
                    { id: "DRAFT", name: "Draft" },
                    { id: "IN_PROGRESS", name: "In Progress" },
                    { id: "COMPLETED", name: "Completed" }
                  ]}
                  {...CamPaignFormik}
                  id="status"
                />
                <div className="flex justify-end gap-3 mt-5">
                  <button
                    type="submit"
                    className="inline-flex w-full md:w-[200px] justify-center rounded-lg bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus:outline-none"
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Create Campaign"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex w-full md:w-[150px] justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
