import React from "react";

import NavBar from "../../components/NavBar/index";

function Home() {
  return (
    <div>
      <NavBar />
      <div className="column">
        <div className="pageBody">
          <p className="paragraph">
            Let's walk. <br />
            <br />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
