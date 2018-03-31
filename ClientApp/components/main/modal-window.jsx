import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as actionCreators from "./actions";
import { ModalMap } from './modal-map';

class ModalWindow extends React.PureComponent {
  onButtonAddClick = (_lat, _lng, _volume) => {
    addRow({ from: _lat, to: _lng, volume: _volume });
    toggleModal();
  };
  render() {
    const { toggleModal, setLat, setLng, addRow, setVolume } = this.props;
    const { showModal, lat, lng, volume } = this.props.main;


    return (
      <Modal
        size="large"
        isOpen={showModal}
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
            actions={{ setLng, setLat }}
          />
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">кг</span>
            </div>
            <input onChange={setVolume} type="text" className="form-control" placeholder="Вес товара" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => this.onButtonAddClick(lat, lng, volume)}
          >
            Добавить
          </Button>
          <Button className="btn-danger" onClick={toggleModal}>Отменить</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect(
  state => ({
      main: state.main
  }),
  (actionCreators)
)(ModalWindow);