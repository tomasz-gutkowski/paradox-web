import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import DefaultPage from "./components/pages/DefaultPage.tsx";
import ProfilePage, {profileLoader} from "./components/pages/profile-page/ProfilePage.tsx";
import PageNotFound from "./components/pages/PageNotFound.tsx";
import ScaledPage from "./components/pages/ScaledPage.tsx"


const router = createBrowserRouter([
    {
        path: "/profile/:server/:gameName/:tagLine",
        element: <ProfilePage/>,
        loader: profileLoader,
    },
    {
       path: "/home",
       element: <DefaultPage/>,
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
