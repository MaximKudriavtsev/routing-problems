import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as actionCreators from "./actions";
import { ModalMap } from './modal-map';

class ModalWindow extends React.PureComponent {
  render() {
    const { toggleModal, addRow, setVolume, setFrom, setTo } = this.props;
    const { showModal, volume, from, to } = this.props.main;
    
    const onButtonAddClick = (_from, _to, _volume) => {
      addRow({ from: _from, to: _to, volume: _volume });
      toggleModal();
    };

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
            setData={setFrom}
            from
          />
          <ModalMap
            setData={setTo}
          />
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">м3</span>
            </div>
            <input onChange={e => setVolume(e.target.value)} type="text" className="form-control" placeholder="Объем товара" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => onButtonAddClick(from, to, volume)}
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