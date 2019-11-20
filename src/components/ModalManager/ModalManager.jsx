import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { closeModal } from "../../redux/actions";
import AddGuild from "../AddGuild";
import DeleteGuild from "../DeleteGuild";
import LeaveGuild from "../LeaveGuild";
import UserSettings from "../UserSettings";
import "./ModalManager.css";

Modal.setAppElement("#root");

const MODAL_GUILD_ADD = "MODAL_GUILD_ADD";
const MODAL_GUILD_DELETE = "MODAL_GUILD_DELETE";
const MODAL_GUILD_LEAVE = "MODAL_GUILD_LEAVE";
const MODAL_USER_UPDATE = "MODAL_USER_UPDATE";

const ModalComponents = {
  [MODAL_GUILD_ADD]: <AddGuild />,
  [MODAL_GUILD_DELETE]: <DeleteGuild />,
  [MODAL_GUILD_LEAVE]: <LeaveGuild />,
  [MODAL_USER_UPDATE]: <UserSettings />
};

export default function ModalManager() {
  const component = useSelector(({ modalState }) => modalState.component);
  const apiLoading = useSelector(
    ({ apiState }) =>
      apiState.generalApiLoading ||
      apiState.chatApiLoading ||
      apiState.userApiLoading
  );
  const dispatch = useDispatch();
  return (
    <Modal
      isOpen={Boolean(component)}
      closeTimeoutMS={250}
      contentLabel="modal"
      onRequestClose={apiLoading ? undefined : () => dispatch(closeModal())}
      className="ModalManager--modal"
      overlayClassName="ModalManager--modalOverlay"
    >
      {ModalComponents[component]}
    </Modal>
  );
}
