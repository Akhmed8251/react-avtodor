import { Routes, Route, Navigate } from 'react-router-dom';
import {publicRoutes} from '../router';

const AppRouter = () => {
    return (
        <Routes>
            {publicRoutes.map(route =>
                <Route  
                    element={route.element}
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                />
            )}
            <Route
                element={<Navigate to='/404' />}
                path='*'
                exact={true}
            />
        </Routes>
    );
};

export default AppRouter;
