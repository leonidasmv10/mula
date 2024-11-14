import { useEffect } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import TriviaOptions from "../components/TriviaOptions";
import { useGetUser } from "../hooks/useGetUser";

function HomePage() {
  const { user, getUser } = useGetUser();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <BaseLayout>
        {user && <h2>{user.UserId}</h2>}
        <TriviaOptions />
      </BaseLayout>
    </>
  );
}

export default HomePage;
