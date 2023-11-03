import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

export default function ReportStatusModal(props: {
  serverName: string;
  defaultStatus: string;
  onClose: (save: boolean, serverName: string, serverStatus: string) => void;
}) {
  const [serverStatus, setServerStatus] = useState<string>(props.defaultStatus);

  return (
    <Modal
      show={true}
      onHide={() => props.onClose(false, props.serverName, serverStatus)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Report Server Status</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Server Name</strong>
          </Form.Label>
          <Form.Control type="text" readOnly value={props.serverName} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Server Status</strong>
          </Form.Label>

          <div>
            <Form.Check
              inline
              type="radio"
              name="online"
              id="radio-online"
              label="Online"
              checked={serverStatus === "Online"}
              onChange={() => setServerStatus("Online")}
            />

            <Form.Check
              inline
              type="radio"
              name="online"
              id="radio-offline"
              label="Offline"
              checked={serverStatus === "Offline"}
              onChange={() => setServerStatus("Offline")}
            />
          </div>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => props.onClose(false, props.serverName, serverStatus)}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => props.onClose(true, props.serverName, serverStatus)}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
