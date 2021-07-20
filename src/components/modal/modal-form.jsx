import { Modal, Button } from "antd";

export default function studentModal({
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
