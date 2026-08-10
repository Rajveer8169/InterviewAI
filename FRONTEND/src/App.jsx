import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import { AuthProivider } from "./features/auth/auth.context.jsx";
import { InterviewProvider } from "./features/interview/interview.context.jsx";

const App = () => {
  return (
    <AuthProivider>
      <InterviewProvider>
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProivider>
  );
};

export default App;
