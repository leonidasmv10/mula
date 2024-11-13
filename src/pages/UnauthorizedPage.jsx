import BaseLayout from "../components/layouts/BaseLayout";
// import withAuth from "../hoc/withAuth";
function UnauthorizedPage() {
  return (
    <>
      <BaseLayout>
        <h2>UnauthorizedPage</h2>
      </BaseLayout>
    </>
  );
}

export default UnauthorizedPage;

// export default withAuth( UnauthorizedPage,"admin");
