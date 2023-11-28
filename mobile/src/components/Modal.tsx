import { useRef } from 'react';
import { IonButton, IonModal, IonItem, IonHeader, IonContent, IonToolbar, IonTitle, IonPage } from '@ionic/react';

import './Modal.css';

interface Props {
  message: string;
  confirmText: string;
  cancelText?: string;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  onConfirm: any;
}

const Modal: React.FC<Props> = ({
  message,
  confirmText,
  cancelText = '',
  modalOpen,
  setModalOpen,
  onConfirm,
}) => {
  const modal = useRef<HTMLIonModalElement>(null);

  return (
    <IonModal
      ref={modal}
      isOpen={modalOpen}
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      backdropDismiss={false}
    >
      <IonHeader className="block">{message}</IonHeader>
      <IonButton onClick={onConfirm}>
        {confirmText}
      </IonButton>
      {cancelText && (
        <IonButton onClick={() => setModalOpen(false)}>
          {cancelText}
        </IonButton>
      )}
    </IonModal>
  );
}

export default Modal;