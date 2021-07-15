import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavBar } from "..";
import "./Guidelines.css";

const api = axios.create({
  baseURL: "http://localhost:2000/api/guideline",
});

const url = "http://localhost:2000/api/guideline";

const Guidelines = () => {
  const [guidelines, setGuidelines] = useState("");
  const [editid, seteditid] = useState("");
  const [editguide, seteditguide] = useState({
    guideline: "",
  });
  const [add, setadd] = useState("");
  const [addguide, setaddguide] = useState({
    guideline: "",
  });

  useEffect(() => {
    const retrieve_guidelines = async () => {
      const response = await axios.get(url);
      setGuidelines(response.data);
      return response.data;
    };
    retrieve_guidelines();
  }, []);

  const handleEdit = (guide) => {
    seteditid(guide._id);
    seteditguide({
      guideline: guide.guideline,
    });
  };

  const handleadd = () => {
    setadd("Yes");
  };

  if (!guidelines) {
    return <NavBar />;
  }

  const updateguideline = async (new_guide) => {
    const response = await axios.put(`${url}/${editid}`, new_guide);
    const retrieve_guidelines = async () => {
      const response = await axios.get(url);
      setGuidelines(response.data);
      return response.data;
    };
    retrieve_guidelines();
  };

  const update = (e) => {
    e.preventDefault();
    console.log(editguide);
    if (editguide.guideline === undefined) {
      alert("Please fill in a guideline");
      return;
    }
    updateguideline(editguide);
    seteditid("");
    seteditguide({ guideline: "" });
  };

  const newguide = async (new_guide) => {
    const response = await axios.post(`${url}/`, new_guide);
    const retrieve_guidelines = async () => {
      const response = await axios.get(url);
      setGuidelines(response.data);
      return response.data;
    };
    retrieve_guidelines();
    console.log(new_guide);
  };

  const add_g = (e) => {
    e.preventDefault();
    if (addguide.guideline === undefined) {
      alert("Please fill in a guideline");
      return;
    }
    newguide(addguide);
    setadd("");
    setaddguide({ guideline: "" });
  };

  console.log(guidelines);

  return (
    <>
      <NavBar />
      <div className="main">
        {editid === "" && add === "" ? (
          <div style={{ margin: "auto" }}>
            <button onClick={(e) => handleadd()} className="addBtnG">
              Add Guideline
            </button>
          </div>
        ) : (
          <></>
        )}
        {add === "" ? (
          <>
            {guidelines.map((guide) => (
              <div className="guideCardG">
                {editid !== guide._id ? (
                  <>
                    <h1>
                      {guide.guideline}
                      <button
                        className="btnEditG"
                        type="submit"
                        onClick={(e) => handleEdit(guide)}
                      >
                        Edit
                      </button>
                    </h1>
                  </>
                ) : (
                  <>
                    <form onSubmit={update}>
                      <div>
                        <label>Guideline</label>
                        <input
                          type="text"
                          // className="form-control"
                          placeholder="New Guideline"
                          value={editguide.guideline}
                          onChange={(e) =>
                            seteditguide({
                              ...editguide,
                              guideline: e.target.value,
                            })
                          }
                        />
                      </div>
                      <button type="submit" className="btnSaveG">
                        Save
                      </button>
                    </form>
                  </>
                )}
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="flexG">
              <div>
                <form className="formEditG" onSubmit={add_g}>
                  <div>
                    <label>Guideline</label>
                    <input
                      type="text"
                      // className="form-control"
                      placeholder="New Guideline"
                      value={addguide.guideline}
                      onChange={(e) =>
                        setaddguide({ ...editguide, guideline: e.target.value })
                      }
                    />
                  </div>
                  <button type="submit" className="addBtnG">
                    Add
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Guidelines;
