import React, { useState } from 'react'
import { Modal, Button } from "react-bootstrap"

const Songinfo = ({ song }) => {

    const [showModal, setShowModal] = useState(false);

    let duration = new Date(song.duration * 1000).toISOString().substring(14, 19)

    const modal = (
        <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showModal}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
            Song Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <p>Position: {song.position} </p>
        <p>
            Artist: {song.artist.name}
        </p>
        <p>
            Title: {song.title}
        </p>
        <p>
            Duration: {duration}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShowModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
    )

  return (
    <>
        <tr onClick={() => setShowModal(true)}>
            <td>{song.position}</td>
            <td>{song.title}</td>
        </tr>
        {modal}
    </>

  )
}

export default Songinfo