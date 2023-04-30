import { useEffect, useRef, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [teacher, setTeacher] = useState([])
  const inp1 = useRef(null)
  const inp2 = useRef(null)
  const inp3 = useRef(null)
  const inp4 = useRef(null)
  const inp5 = useRef(null)
  const inp6 = useRef(null)

  useEffect(() => {
    getUrl()
  }, [])

  //axios get request
  async function getUrl() {
    const url = 'http://localhost:3000/teachers'
    const data = await axios(url)
    setTeacher(data.data.data)
  }

  //axios post request
  async function postUrl() {
    const url = 'http://localhost:3000/teachers'
    const data = await axios.post(url, {
      firstName: inp1.current.value,
      lastName: inp2.current.value,
      email: inp3.current.value,
      phoneNumber: inp4.current.value,
      password: inp5.current.value,
      subject: inp6.current.value,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    inp1.current.value = ''
    inp2.current.value = ''
    inp3.current.value = ''
    inp4.current.value = ''
  }

  //axios delete request
  async function deleteUrl(id) {
    const url = `http://localhost:3000/teachers/${id}`
    const data = await axios.delete(url)
    getUrl()
  }

  //axios put request
  async function putUrl(id) {
    const url = `http://localhost:3000/teachers/${id}`
    const data = await axios.put(url, {
      firstName: inp1.current.value,
      lastName: inp2.current.value,
      email: inp3.current.value,
      phoneNumber: inp4.current.value,
      password: inp5.current.value,
      subject: inp6.current.value
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    getUrl()
    inp1.current.value = ''
    inp2.current.value = ''
    inp3.current.value = ''
    inp4.current.value = ''
  }
  return (
    <>
      <div className="home">
        <div className="left">
          {teacher.map(item => {
            return (
              <div className='Item' key={item.id}>
                <div onClick={()=>{putUrl(item.id)}} className="edit">
                  <i className="fa-solid fa-pencil"></i>
                </div>
                <h1>{item.firstName} {item.lastName}</h1>
                <h2>{item.email}</h2>
                <h2 className='h2' >{item.phoneNumber}</h2>
                <div onClick={() => { deleteUrl(item.id) }} className="delete">
                  <i className="fa-solid fa-trash-can"></i>
                </div>
              </div>
            )
          })}
        </div>
        <div className="right">
          <form>
            <input ref={inp1} placeholder='firsName' type="text" />
            <input ref={inp2} placeholder='lastName' type="text" />
            <input ref={inp3} placeholder='email' type="email" />
            <input ref={inp4} placeholder='phoneNumber' type="number" />
            <input ref={inp5} placeholder='password' type="text" />
            <input ref={inp6} placeholder='subject' type="text" />
            <button type='submit' onClick={postUrl}>Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
