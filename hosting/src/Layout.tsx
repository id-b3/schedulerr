import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className = "container-fluid">
            <div className = "row justify-content-center mt-3">
                <div className = "col-md-4 text-center">
                    <p className = "lead"><h1>Schedul👋</h1></p>
                </div>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
