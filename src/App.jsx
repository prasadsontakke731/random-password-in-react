import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';
export default function App() {
  const [length, setLength] = useState(5)
  const [num, setNum] = useState(false)
  const [char, setChar] = useState(false)
  const [pass, setPass] = useState("")
  const passwordRef = useRef(null)
  const passwordGen = useCallback(() => {
    let password = ""
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (num) string += "0123456789"
    if (char) string += "!@#$%^&*-_+=[]{}~`"
    for (let i = 0; i < length; i++) {
      let gen = Math.floor(Math.random() * string.length + 1)
      password += string.charAt(gen)
    }
    setPass(password)
  }, [length, num, char, setPass])
  useEffect(() => {
    passwordGen()
    console.log("render");
  }, [length, num, char, setPass, passwordGen])

  const copyText = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0.10)
    window.navigator.clipboard.writeText(pass)

  }, [pass])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-green-600 bg-gray-600">
        <h1 className="text-3xl font-bold text-white text-center">
          Password Generator
        </h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={pass}
            className='outline-none w-full py-1 px-3'
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <div className='new'>
            <button onClick={copyText} className='button'>COPY</button>
          </div>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={5}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultCheckedIn={num}
              id='numberInput'
              onChange={() => { setNum((prev) => !prev) }}
            />
            <label>Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultCheckedIn={char}
              onChange={() => { setChar((prev) => !prev) }}
            />
            <label>Character</label>
          </div>
        </div>
      </div>

    </>
  )
}