import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useState } from 'react'
import '../style/phoneNumberstyle.css'

export  function PhoneInputComponent() {
  
  const [value, setValue] = useState()
  return (
    <PhoneInput
      placeholder="Enter phone number"      
      value={value}      
      className='phone-input'
      initialValueFormat='CM'
      onChange={setValue}/>
  )
}