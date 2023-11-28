import { IonToast } from '@ionic/react'
import { ToastData } from '../definitions'
import './Toast.css'

interface Props {
  toastOpen: boolean
  toast: ToastData
  setToastOpen: (open: boolean) => void
}

const Toast: React.FC<Props> = ({
  toastOpen,
  toast,
  setToastOpen
}) => {
  return (
    <div>
      <IonToast
        isOpen={toastOpen}
        message={toast.message}
        onDidDismiss={() => setToastOpen(false)}
        duration={5000}
        className={`custom-toast ${toast.type}-toast`}
        buttons={[
          {
            text: 'X',
            role: 'cancel',
          },
        ]}
      />
    </div>
  )
}

export default Toast