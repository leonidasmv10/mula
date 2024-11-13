import Footer from "../shared/Footer";
import Header from "../shared/Header";
import Container from "react-bootstrap/Container";

const BaseLayout = (props) => {
  const { children } = props;
  return (
    <div className="layout-container">
      <Header />
      <main>
        <div style={{ marginTop: "20px" }}>
          <Container>{children}</Container>
        </div>
      </main>
      <br></br>
      <Footer></Footer>
    </div>
  );
};

export default BaseLayout;
