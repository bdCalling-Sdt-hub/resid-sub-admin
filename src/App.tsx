import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Loader from './common/Loader';
import routes from './routes';
import Residence from './pages/Residence';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Signin from './pages/Authentication/SignIn';
import ForgetPassword from './pages/Authentication/ForgetPassword';
import Otp from './pages/Authentication/Otp';
import UpdatePass from './pages/Authentication/UpdatePass';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />
        <Route path="/auth/otp/:email" element={<Otp />} />
        <Route path="/auth/update-password/:email" element={<UpdatePass />} />
        <Route element={<DefaultLayout />}>
          <Route index element={<PrivateRoute> <Residence /></PrivateRoute>} />
          {routes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <PrivateRoute>
                      <Component />
                    </PrivateRoute>
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
