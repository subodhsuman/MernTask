import { Routes, Route} from "react-router-dom";
import AllNotes  from "../component/AllNotes.jsx";
import Notes from "../component/Notes.jsx";
import AllData from "../component/AllData.jsx";

const  Router = ()=> {
  const routes = [
    {
      path: "/",
      name: "allnotest",
      Component:AllNotes 
    },
    {
      name: "Notes",
      path: "/notes",
      Component:Notes 
    },
    {
      name: "alldata",
      path: "/alldata",
      Component:AllData 
    },
    
  ];

  // translate (map) your array of objects into jsx
  const Routing = routes.map(({ path, Component }, i) => (
    <Route key={i} path={path} element={<Component />} />
  ));

  return (
    <div className="">
      <Routes>{Routing}</Routes>
    </div>
  );
}
export default Router;