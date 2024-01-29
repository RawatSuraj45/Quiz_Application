import '../styles/App.css';
import { createBrowserRouter , RouterProvider } from 'react-router-dom'

/**Import components */
import Main from './Main';
import Quiz from './Quiz';
import Result from './Result';
import { CheckUserExist } from '../Helper/helper';

/** React routes */
const router = createBrowserRouter([
  {
    path : '/',
    element : <Main></Main>
  },
  {
    path : '/quiz',
    element : <CheckUserExist><Quiz/></CheckUserExist>
  },
  {
    path : '/result',
    element : <CheckUserExist><Result/></CheckUserExist>
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
