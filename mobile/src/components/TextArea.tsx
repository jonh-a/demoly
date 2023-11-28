import React from 'react'
import { IonTextarea, IonItem, IonInput, IonText } from '@ionic/react'

interface Props {
  label: string;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  helperText?: string;
  rows: number;
}

const TextArea: React.FC<Props> = ({
  label,
  placeholder = '',
  value,
  setValue,
  helperText = '',
  rows = 2,
}) => {
  return (
    <IonItem>
      <IonTextarea
        labelPlacement="floating"
        value={value}
        onInput={(e: any) => { setValue(e.target.value) }}
        placeholder={placeholder}
        helperText={helperText}
        rows={rows}
      >
        <div slot="label">
          {label}
        </div>
      </IonTextarea>
    </IonItem>
  )
}

export default TextArea