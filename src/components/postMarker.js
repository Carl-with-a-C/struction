import { useEffect, useState } from "react";
import { postMarker } from "../utils/api";
// import { useContext } from 'react';
// import { UserContext } from './user';

const PostMarker = ({ currFloor, setNewMarkers }) => {
  const [input, setInput] = useState({});
  const [sending, setsending] = useState(false);
  // const user = useContext(UserContext)

  const handleChangeMarker = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setInput((currinput) => {
      const newInput = { ...currinput, [name]: value };
      return newInput;
    });
  };
  const handleChangearray = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    const Arr = value.split(",");
    setInput((currinput) => {
      const newInput = { ...currinput, [name]: Arr };
      return newInput;
    });
  };

  const handleSubmitNewmarker = (event) => {
    setsending(true);
    event.preventDefault();
    const user = `offline_user-${Date.now()}`;
    const post = {
      [user]: {
        ...input,
        id: user,
        location: currFloor,
        locationOnDrawing: ["100", "100"],
        photos: ["url to photo 1", "url to photo 2"],
        photos_after: ["url to photo 1", "url to photo 2"],
      },
    };
    const projectName = "project1";
    postMarker(projectName, post).then((res) => {
      setNewMarkers(res.data.markers);
    });
    setsending(false);
    setInput({ number: "", materialsUsed: "", service: "", measurements: "" });
  };

  return (
    <form className="floorButton" onSubmit={handleSubmitNewmarker}>
      <label>
        number
        <input
          type="text"
          name="number"
          value={input.number}
          onChange={handleChangeMarker}
        />
      </label>
      <label>
        {" "}
        measurements
        <input
          type="text"
          placeholder="add measurements seperated by a comma"
          value={input.measurements}
          className="textbox"
          name="measurements"
          onChange={handleChangearray}
        />
      </label>
      <label>
        service
        <input
          type="text"
          placeholder="add services seperated by a comma"
          name="service"
          value={input.service}
          onChange={handleChangearray}
        />
      </label>
      <label>
        materialsUsed
        <input
          type="text"
          placeholder="add materials seperated by a comma"
          name="materialsUsed"
          value={input.materialsUsed}
          onChange={handleChangearray}
        />
      </label>
      <button className="submitbutton" disabled={!input || sending === true}>
        submit
      </button>
    </form>
  );
};

export default PostMarker;
