import { useEffect } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import TriviaGameBootstrap from "../components/TriviaGameBootstrap";
import { useGetUser } from "../hooks/useGetUser";

function Home() {
  const { user, getUser } = useGetUser();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <BaseLayout>
        {user && <h2>{user.UserId}</h2>}
        <TriviaGameBootstrap />
      </BaseLayout>
    </>
  );
}

export default Home;
