import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomePage from "./components/pages/home-page/HomePage.tsx";
import ProfilePage from "./components/pages/profile-page/ProfilePage.tsx";
import {profileLoader} from "./components/pages/profile-page/ProfilePage.loader.ts";
import PageNotFound from "./components/pages/not-found-page/PageNotFound.tsx";
import ScaledPage from "./components/pages/ScaledPage.tsx"
import LoadingPage from "./components/pages/profile-page/LoadingPage.tsx";


const router = createBrowserRouter([
    {
        path: "/profile/:server/:gameName/:tagLine",
        element: <ProfilePage/>,
        loader: profileLoader,
        errorElement: <PageNotFound/>,
        hydrateFallbackElement: <LoadingPage/>,
    },
    {
       path: "/home",
       element: <HomePage/>,
    },
    {
        path:"*",
        element:<PageNotFound/>,
    },
])

function App() {
  return (
      <>
            <ScaledPage designWidth ={1920}>
                {
                <RouterProvider  router={router}/>
                }
            </ScaledPage>
      </>
  );
}

export default App
