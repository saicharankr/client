import React from 'react'
import { useState } from 'react'
import Modal from '../common/Modal/Modal'

const Test = () => {
    const [modal, setModal] = useState(false)
    const Toggle = () =>{setModal(!modal)} 

    return (
        <div>
            <button onClick={() => Toggle()}>Toggle Modal</button>

            <Modal show={modal} close={Toggle} title="testing"> This is Modal content </Modal>
        </div>
    )
}

export default Test
