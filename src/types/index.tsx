export interface Campaign {
    id: string;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    banner_url: string;
    created_by?: string;
    created_at?: string;
    updated_at?: string;
    status: string
  }
  
  export   function formatDate(isoDateString:any) {
  const date = new Date(isoDateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  //@ts-ignore
  return date.toLocaleDateString(undefined, options);
}