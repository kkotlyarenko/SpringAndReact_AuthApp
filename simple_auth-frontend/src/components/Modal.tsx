import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { CloseButton } from '../styles/shared/sharedStyles.tsx';

interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    contentLabel: string;
    children: React.ReactNode;
}

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
`;

const Modal: React.FC<ModalProps> = ({ isOpen, onRequestClose, contentLabel, children }) => {
    return (
        <ReactModal
            isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel={contentLabel}
    style={{
        content: {
            top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                border: 'none',
                background: 'none',
                overflow: 'visible',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
    }}
    ariaHideApp={false}
    >
    <ModalContent>
        <CloseButton onClick={onRequestClose}>×</CloseButton>
    {children}
    </ModalContent>
    </ReactModal>
);
};

export default Modal;