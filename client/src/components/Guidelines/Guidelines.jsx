import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavBar } from "..";
import { UserContext } from "../../UserContext";
import "./Guidelines.css";
import { Redirect } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:2000/api/guideline",
});

const url = "http://localhost:2000/api/guideline";

const Guidelines = () => {

  const {user} = useContext(UserContext);

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

  if(! user.signedIn) {return <Redirect to="/"/>}
  if (!guidelines) {
    return <NavBar />;
  }

  const updateguideline = async (new_guide) => {
    const response = await axios.put(`${url}/${editid}`, new_guide, user.auth);
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
    const response = await axios.post(`${url}/`, new_guide, user.auth);
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
        {user.isAdmin && editid === "" && add === "" ? (
          <div>
            <button onClick={(e) => handleadd()} className="addBtnG">
              Add New Guideline
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
                     { user.isAdmin && <button
                        className="btnEditG"
                        type="submit"
                        onClick={(e) => handleEdit(guide)}
                      >
                        Edit
                      </button> }
                    </h1>
                  </>
                ) : (
                  <>
                    <form onSubmit={update}>
                      <div>
                        {/* <label>Guideline</label> */}
                        <input
                          type="text"
                          className="inputGuideline"
                          placeholder="New Guideline"
                          value={editguide.guideline}
                          onChange={(e) =>
                            seteditguide({
                              ...editguide,
                              guideline: e.target.value,
                            })
                          }
                        />
                        <button type="submit" className="btnSaveG">
                        Save
                        </button>
                      </div>
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
                <form className="formEditG" style={{marginTop:'20px', marginLeft:'-180px'}} onSubmit={add_g}>
                  <div>
                    <label>New Guideline </label>
                    <input
                      type="text"
                      className="inputGuideline"
                      style={{padding:'7px', width:'500px'}}
                      placeholder="New Guideline"
                      value={addguide.guideline}
                      onChange={(e) =>
                        setaddguide({ ...editguide, guideline: e.target.value })
                      }
                    />
                  </div>
                  <div style={{marginLeft:'180px'}}>
                    <button type="submit" className="addBtnG" style={{marginTop:'20px'}}>
                    Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {guidelines.map((guide) => (
              <div className="guideCardG">
                <h1>
                  {guide.guideline}
                </h1>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Guidelines;
