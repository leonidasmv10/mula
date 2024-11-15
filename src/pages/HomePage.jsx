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
        <TriviaOptions />
      </BaseLayout>
    </>
  );
}

export default HomePage;
