import CustomSelect from '@/components/core-ui/custom-select';
import { DatePickerDemo } from '@/components/core-ui/date-picker';
import TextAreaField from '@/components/core-ui/text-area';
import TextField from '@/components/core-ui/text-field';
import { useCampaignContext } from '@/context';
import { selectAuth } from '@/redux/AuthSlice';
import { Campaign } from '@/types';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useFormik } from 'formik';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function UpdateCampaign({ data }: { data: Campaign }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userToken } = useSelector(selectAuth);
const {fetchCampaigns}=useCampaignContext()
  const CamPaignFormik = useFormik({
    initialValues: {
      name: data?.name || '',
      description: data?.description || '',
      start_date: data?.start_date || '',
      end_date: data?.end_date || '',
      banner_url: data?.banner_url || '',
      status: data?.status || ''
    },
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const response = await axios.put(
          `https://test.quups.app/api/campaigns/${data.id}`,
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
      await  fetchCampaigns()
        setLoading(false);
        resetForm();
      }
    },
  });

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex gap-2 items-center"
      >
        <PencilSquareIcon className="w-5 h-5" /> Edit
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-70 transition-opacity"
        />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-6 py-8 text-left shadow-xl transition-all"
          >
            <div>
              <div className="flex justify-between items-center">
                <DialogTitle as="h3" className="text-xl font-semibold leading-6 text-gray-900">
                  Update Campaign
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
                  Edit Campaign details by filling in the necessary details.
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
                      "Update Campaign"
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
