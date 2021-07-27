import { Modal, Button } from "antd";

export default function ModalForm({
  children,
  visible,
  handleCancel,
  title,
}) {
  return (
    <Modal
      visible={visible}
      title={title}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
      ]}
    >
      {children}
    </Modal>
  );
}
