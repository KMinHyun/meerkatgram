import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import Login from '../components/auth/Login.jsx';
import PostIndex from '../components/posts/PostIndex.jsx';
import PostShow from "../components/posts/PostShow.jsx";
import PostCreate from "../components/posts/PostCreate.jsx";
import Registration from '../components/users/Registration.jsx';
import UserInfo from "../components/users/UserInfo.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        loader: async () => {
          // 'loader'에 정의한 처리는 라우터 진입 시 실행
          // 'redirect()'를 이용해 해당 라우터로 이동
          return redirect('/posts');
        }
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/posts',
        element: <PostIndex />
      },
      {
        path: '/posts/:id',
        element: <PostShow />
      },
      {
        path: '/posts/create',
        element: <PostCreate />
      },
      {
        path: '/users',
        element: <UserInfo />
      },
      {
        path: '/users/create',
        element: <Registration />
      }
    ]
  }
]);

export default function Router() {
  return <RouterProvider router={router}/>
}