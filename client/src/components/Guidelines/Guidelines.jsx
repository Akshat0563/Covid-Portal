import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavBar } from "..";

const api = axios.create({
  baseURL: "http://localhost:2000/api/guidelines",
});

const url = "http://localhost:2000/api";

const Guidelines = () => {
  const [guidelines, setGuidelines] = useState("");
  const [editid, seteditid] = useState("");
  const [editguide, seteditguide] = useState({
      guideline:""
  });
  const [add, setadd] = useState("");
  const [addguide, setaddguide] = useState("");

  const retrieve_guidelines = async () => {
    const response = await api.get();
    return response.data;
  };

  useEffect(() => {
    const getAllGuidelines = async () => {
      const allGuidelines = await retrieve_guidelines();
      if (allGuidelines) setGuidelines(allGuidelines);
    };
    getAllGuidelines();
  }, []);

  if (!guidelines) {
    return <NavBar />;
  }

  const updateguide=async(new_guide)=>{
      console.log(new_guide);
    const response=await axios.put(`${url}/guidelines/${editid}`,new_guide);
    
  }

  const update=(e)=>{
    e.preventDefault();
    if(editguide.guideline===undefined){
        alert("Please fill in a guideline");
        return;
    }
     updateguide(editguide);
     seteditid("");
     seteditguide("");
  }

  const newguide=async(new_guide)=>{
      console.log(new_guide);
  }

  const add_g=(e)=>{
      e.preventDefault();
      if(!addguide){
        alert("Please fill in a guideline");
        return;
      }
      newguide(addguide);
      setadd("");
      setaddguide("");
  }

  const handleedit=(guide)=>{
      seteditid(guide._id);
      seteditguide({
          guideline:guide.guideline
      })
  }

  console.log(guidelines);

  return (
    <>
      <NavBar />
      <div className="hospitalMain">
     {editid===""&&add===""?<button onClick={()=>setadd("Yes")}>Add Guideline</button>:<></>}
     { add===""?<>
        {guidelines.map((guide) => (
          <div className="hospitalCard">
        { editid!==guide._id ?
           <>
            <h1 className="hospitalHeader">{guide.guideline}</h1>
            <button style={{float: 'right'}} type='submit' onClick={() => handleedit(guide)}>Edit</button>
           </>:
           <>
           <form className="hospitalHeader" onSubmit={update}>
          <div>
            <label>Guideline</label>
            <input
              type="text"
             // className="form-control"
              placeholder="New Guideline"
              value={editguide}
              onChange={(e) => seteditguide({...editguide,guideline:e.target.value}) }
            />
          </div>
          <button type="submit" className="ui button blue">Edit</button>
          </form>
           </>} 
          </div>
        ))}
        </>:
        <>
        <div className="hospitalMain">
        {guidelines.map((guide) => (
          <div className="hospitalCard">
            <h1 className="hospitalHeader">{guide.guideline}</h1>
          </div>  
        ))}
        <div className="hospitalCard">
        <form className="hospitalHeader" onSubmit={add_g}>
          <div>
            <label>Guideline</label>
            <input
              type="text"
             // className="form-control"
              placeholder="New Guideline"
              value={addguide}
              onChange={(e) => setaddguide(e.target.value) }
            />
          </div>
          <button type="submit" className="ui button blue">Add</button>
          </form>
        </div>
      </div>
        </>}
      </div>
    </>
  );
};

export default Guidelines;