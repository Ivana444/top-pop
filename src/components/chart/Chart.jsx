import React from 'react'
import Songinfo from '../modal/Songinfo'
import { cloneDeep } from "lodash";
import { useState , useEffect } from 'react';
import axios from 'axios';
import './chart.css'

const Chart = () => {

    const [sortValue, setSortValue] = useState("select");

  const [data,setData] = useState ([])

  useEffect(() =>
    {
        axios.get("https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart")
        .then(response =>
            {
                setData(response.data.tracks.data);
            })
        .catch((err) => console.log(err))
    }, [])

       const sorter = ( stringValue) =>
    {
        let sortCopy = cloneDeep(data)
        switch (stringValue) 
        {
            case "ascending":
                sortCopy.sort((itemA, itemB) =>
                {
                    return itemA.duration - itemB.duration
                })
                setData(sortCopy);
                break;
            case "descending":
                sortCopy.sort((itemA, itemB) =>
                {
                    return itemB.duration - itemA.duration
                })
                setData(sortCopy);
                break;
           default:
               break;
       }
    }

    const handleChange = (e) =>
    {
        setSortValue(e.target.value);
    }

    useEffect(() =>
    {
        sorter(sortValue);
    },[sortValue])


 return (
    <div className='d-flex flex-column align-items-center'>
        <div className='d-flex justify-contect-between align-items-center mt-5 mb-3'>
            <img style={{width: "75px", height: "75px" }}src={'https://static.cdnlogo.com/logos/d/6/deezer.png'} alt='' />
          <div>
          <select
            className='form-select'
            name='sorter' 
            id='sorter' 
            value={sortValue} onChange={(e) => handleChange(e)}>
                <option value="select" disabled >Select</option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
            </select>
          </div>
        </div>
        <h1 className='mt-3 mb-3'>~Top 10 songs~</h1>
        <div color='lightblue'></div>
        <table className='songchart'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) =>
                {
                    return (
                        <Songinfo key={index} song={item}/>
                    )
                })}
            </tbody>
        </table>
       
    </div>
  )
}
export default Chart