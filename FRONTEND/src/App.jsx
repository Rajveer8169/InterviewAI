import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import { AuthProivider } from "./features/auth/auth.context.jsx";

const App = () => {
  return (
    <AuthProivider>
      <RouterProvider router={router} />
    </AuthProivider>
  );
};

export default App;
