import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ModalMap } from './modal-map';

export default class ModalWindow extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      lng: 0,
      lat: 0
    };

    this.setLng = this.setLng.bind(this);
    this.setLat = this.setLat.bind(this);
  }
  setLng(lng) {
    this.setState({ lng });
  }
  setLat(lat) {
    this.setState({ lat });
  }
  render() {
    const { open, toggleModal } = this.props;

    console.log(this.state.lat);
    console.log(this.state.lng);

    return (
      <Modal
        size="large"
        isOpen={open}
      >
        <ModalHeader>
          Добавить Запись
        </ModalHeader>
        <ModalBody>
          <ModalMap
            className="px-1"
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAGaF4cA3wqi33FzmapotsZFDErzY8wFmE&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            actions={{ setLng: this.setLng, setLat: this.setLat }}
          />
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">кг</span>
            </div>
            <input type="text" className="form-control" placeholder="Вес товара" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button>Добавить</Button>
          <Button className="btn-danger" onClick={toggleModal} >Отменить</Button>
        </ModalFooter>
      </Modal>
    );
  }
}