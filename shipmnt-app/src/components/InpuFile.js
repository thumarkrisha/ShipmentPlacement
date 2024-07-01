import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import { baseurl } from '../url/baseurl'
import axios from 'axios'

const InpuFile = () => {

    const [selectedOption, setSelectedOption] = useState('company');


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

    const [data,setData] = useState(null)

    const handleFileUpload = (e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) =>{
            const book = XLSX.read(event.target.result,{type : 'binary'});
            const workbook = XLSX.read(event.target.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const sheetData = XLSX.utils.sheet_to_json(sheet);

            setData(sheetData);
        }

        reader.readAsBinaryString(file);
    }
    async function handleConfirm(){

        try {
            const response = await axios.post(`${baseurl}/upload`, { data, selectedOption });
            console.log('Upload successful', response.data);

            

        
            
          } catch (error) {
            console.error('Error uploading:', error);
            
          }

    }
    const handleCancle = () =>{
        setData(null);
    }

  return (
    <div className='middle'>
        <div className='Option'>
        For What You What to Enter DATA:
        <label>
        <input
          type="radio"
          value="company"
          checked={selectedOption === 'company'}
          onChange={handleOptionChange}
          
        />
        company
      </label>

      <label>
        <input
          type="radio"
          value="contact"
          checked={selectedOption === 'contact'}
          onChange={handleOptionChange}
        />
        contact     
        </label>
        </div>

        <br/>
        <br></br>

        <input  className="input" type = "file" onChange={handleFileUpload}></input>

        {data && (
        <div className='table'>
          <table border={1}>
            {selectedOption === 'company' ?
            <div>
            <tr style={{width: '50px',}}>
                <th> CompanyName</th>
                <th>CompanyAddress</th>
                <th>CompanyPhone</th>
                <th>CompanyEmail</th>
                <th>CompanyWebsite</th>
                <th>NoOfEmploy</th>
                <th>FoundedDate</th>
                <th>IndustryType</th>
            </tr>
            {data.map((data)=>
                (
                  <tr style={{width: '50px',}}>
                      <td>{data.CompanyName}</td>
                      <td>{data.CompanyAddress}</td>
                      <td>{data.CompanyPhone}</td>
                      <td>{data.CompanyEmail}</td>
                      <td>{data.CompanyWebsite}</td>
                      <td>{data.NoOfEmploy}</td>
                      <td>{data.FoundedDate}</td>
                      <td>{data.IndustryType}</td>
                  </tr>
                )
              )}
              </div>
            :
            <div>
            <tr style={{width: '50px',}}>
                <th> ContactName</th>
                <th>ContactEmail</th>
                <th>ContactPhone</th>
                <th>BirthDate</th>
                <th>ContactType</th>
                <th>CompanyId</th>
            </tr>
        
            
          {data.map((data)=>
          (
            <tr style={{width: '50px',}}>
                <td>{data.ContactName}</td>
                <td>{data.ContactEmail}</td>
                <td>{data.ContactPhone}</td>
                <td>{data.BirthDate}</td>
                <td>{data.ContactType}</td>
                <td>{data.CompanyId}</td>
            </tr>
          )
        )}
        </div>
    }
        
          </table>
          <div className='button'>
        <button onClick={handleConfirm}>Upload</button>
        <button onClick={handleCancle}>Cancel</button>
        </div>
        </div>
      )}
    </div>
  )
}

export default InpuFile
