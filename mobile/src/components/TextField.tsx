import React from 'react'
import { IonList, IonItem, IonInput, IonText } from '@ionic/react'

interface Props {
  label: string;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  helperText?: string;
  type: 'text' | 'email' | 'password';
  required?: boolean;
}

const TextField: React.FC<Props> = ({
  label,
  placeholder = '',
  value,
  setValue,
  helperText = '',
  type,
  required = false
}) => {
  return (
    <IonItem>
      <IonInput
        labelPlacement="floating"
        value={value}
        onInput={(e: any) => { setValue(e.target.value) }}
        placeholder={placeholder}
        clearInput={true}
        helperText={helperText}
        type={type}
        required={required}
      >
        <div slot="label">
          {label}
        </div>
      </IonInput>
    </IonItem>
  )
}

export default TextField