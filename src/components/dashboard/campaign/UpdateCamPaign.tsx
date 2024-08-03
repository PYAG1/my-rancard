

import CustomSelect from '@/components/core-ui/custom-select'
import { DatePickerDemo } from '@/components/core-ui/date-picker'
import TextAreaField from '@/components/core-ui/text-area'
import TextField from '@/components/core-ui/text-field'
import { selectAuth } from '@/redux/AuthSlice'
import { Campaign } from '@/types'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { useFormik } from 'formik'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

export default function UpdateCampaign({data}:{data:Campaign}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
 
  const {userToken} = useSelector(selectAuth)

  const CamPaignFormik= useFormik({
    initialValues:{
  name:data?.name,
  description:data?.description,
  start_date:data?.start_date,
  end_date:data?.end_date,
  banner_url:data?.banner_url,
  status:data?.status
    },onSubmit:async (values, {resetForm}) =>{
        setLoading(true);
        try {
          const response = await axios.put(
          `https://test.quups.app/api/campaigns/${data.id}`,
            values,{
                headers: {
                
                  'Authorization':`Bearer ${userToken}`,
               
                }
              }
          );
          if (response.status === 200) {

            console.log(response.data);
           // dispatch(signIn({name,access_token}))
            toast.success(response.data?.message);
       
           
          }
        } catch (error) {
            //@ts-ignore
          toast.error(error.message);
        } finally {
          setLoading(false);
          resetForm()
          setOpen(false)
        }
    },
  })
  return (
    <>
         <button
      
      onClick={()=> setOpen(true)}
          className=" flex gap-2 items-center" ><PencilSquareIcon className=" w-5 h-5 "/> Edit</button>

   
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black bg-opacity-70 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sitems-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mt-3 text-left sm:mt-5">
                <DialogTitle as="h3" className=" text-xl font-semibold leading-6 flex justify-between items-center text-gray-900">
              Update Campaign
             <button onClick={()=> setOpen(false)}>  <XMarkIcon className=' w-5 h-5'/></button>
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
Edit Campaign details by filling in the necessary details.
                  </p>
                </div>
                <form className=' flex flex-col gap-5 my-4'>
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

          <div className=' w-full flex gap-8  justify-between'>
          <DatePickerDemo
                placeholder={"Enter start date"}
                label={""}
                id="start_date"
                {...CamPaignFormik}
              />     <DatePickerDemo
              placeholder={"Enter  date"}
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
                options={[{id:"DRAFT",name:"Draft"},{id:"IN_PROGRESS",name:"In Progress"},{id:"COMPLETED",name:"Completed"}]}
                {...CamPaignFormik}
                id={"status"}
              
              />
                </form>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 md:flex sm:gap-3">
              <button
         
                onClick={() => CamPaignFormik.handleSubmit()}
                className="inline-flex w-full md:w-[200px]  order-2 justify-center rounded-[8em] bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:col-start-2"
              >
                        {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Update Campaign"
                )}
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full md:w-[150px] justify-center rounded-[8em] bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
    </>
  )
}

