import BaseLayout from "../components/layouts/BaseLayout";
import TriviaGameBootstrap from "../components/TriviaGameBootstrap";
function UserPage() {
  return (
    <>
      <BaseLayout>
        <TriviaGameBootstrap></TriviaGameBootstrap>
        <h2>UserPage</h2>
      </BaseLayout>
    </>
  );
}

export default UserPage;
