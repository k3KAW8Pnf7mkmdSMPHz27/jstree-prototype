import React, { useEffect } from "react";
import "./App.css";
import jstree_prototypes from "./jstree_prototypes";
import "jstree/dist/themes/default/style.min.css";

function App(): JSX.Element {
  useEffect(() => jstree_prototypes());

  return (
    <>
      <div className="App">
        <h2> Taxonomy </h2>
        These are all the topics retrieved by the CfA Index crawler and their
        manually associated synonyms.
        <br />
        This is how items are being classified in the codeforamerica github{" "}
        <a
          href="https://github.com/codeforamerica/civic-tech-taxonomy"
          target="new"
        >
          Taxonomy
        </a>{" "}
        repo.
        <br />
        This tree is populated from the json returned by the Taxonomy API at
        https://statusboard.brigade.cloud/api/taxonomy.json
        <br />
        <i>
          Empty folders are because there is a file in the taxonomy project but
          I didn't find a good use of it.
        </i>
        <br />
        <br />
        <table style={{ border: 1 }}>
          <tr>
            <td>
              <input id="search-input" className="search-input" />
              <br />

              <div id="folder_jstree"></div>
            </td>
            <td>
              <div id="tree"></div>
            </td>
            <td>
              <div id="tree3"></div>
            </td>
            <td>
              <div id="tree4"></div>
            </td>
            <td>
              Demo 2<div id="demo2"></div>
            </td>
            <td>
              SimpleJSTree
              <div id="SimpleJSTree"></div>
            </td>
            <td>
              Nada
              <div id="tree5"></div>
            </td>
          </tr>
        </table>
        <br />
      </div>
    </>
  );
}

export default App;
