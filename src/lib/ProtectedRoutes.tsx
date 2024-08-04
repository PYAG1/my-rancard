import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';


export default function ProtectedRoute({children,user}:{children:ReactNode,user:any}) {
   
  if (!user) {
    return <Navigate to={"/auth/signin"} replace />;
  }

  return children;
}