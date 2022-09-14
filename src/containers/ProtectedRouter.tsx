import React, { useEffect } from 'react';
import { Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsLoggedIn, selectUser } from '@/store/selectors/userSelector';
import { getMeAction } from '@/store/actions/userActions';
import Loader from '@/components/Loader';

const ProtectedRouter: React.FC<any> = ({ children }: any) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (!user) dispatch(getMeAction());
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/auth" />
  }

  return user ? children : <Loader />;
};

export default ProtectedRouter;
