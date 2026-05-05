import { View, Text, Modal } from 'react-native'
import React from 'react'

interface AddressFormData {
    label: string;
    fullName: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    isDefault: boolean;
}


interface AddressFormModalProps {
    visible: boolean;
    isEditing: boolean;
    addressForm: AddressFormData;
    isAddingAddress: boolean;
    isUpdatingAddress: boolean;
    onClose: () => void;
    onSave: () => void;
    onFormChange: (form: AddressFormData) => void;
}

const AddressFormModal = ({ addressForm,
    isAddingAddress,
    isEditing,
    isUpdatingAddress,
    onClose,
    onFormChange,
    onSave,
    visible, }: AddressFormModalProps) => {

    return (
        <Modal visible={visible} animationType='slide' transparent onRequestClose={onClose}>

        </Modal>
    )
}


export default AddressFormModal