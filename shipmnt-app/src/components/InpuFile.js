import React, { useState } from 'react'
import * as XLSX from 'xlsx'

const InpuFile = () => {

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
    async function handleConfirm=()=>{

        const response = 


    }
    const handleCancle = () =>{
        setData(null);
    }

  return (
    <div>
        <input type = "file" onChange={handleFileUpload}></input>
        {data && (
        <div>
          <h2>Imported Data:</h2>
          <table className='width'>
            
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
        
          </table>
        <button onClick={handleConfirm}>Upload</button>
        <button onClick={handleCancle}>Cancel</button>
        </div>
      )}
    </div>
  )
}

export default InpuFile
