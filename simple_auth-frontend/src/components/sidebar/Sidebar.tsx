import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, SubmitButton } from '../../styles/shared/sharedStyles.tsx';
import {Marginer} from "../marginer";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    handleLogout: () => void;
    handleChangePassword: (oldPassword: string, newPassword: string) => void;
    handleDeleteAccount: (password: string) => void;
}

const SidebarContainer = styled.div<{ isOpen: boolean }>`
    position: fixed;
    right: ${({ isOpen }) => (isOpen ? '0' : '-300px')};
    top: 0;
    width: 300px;
    height: 100%;
    background-color: #fff;
    box-shadow: -2px 0 5px rgba(15, 15, 15, 0.3);
    transition: right 0.3s ease-in-out;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const CloseButton = styled.button`
    background: transparent;
    border: none;
    font-size: 30px;
    align-self: flex-end;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

const DeleteButton = styled(SubmitButton)`
    width: 100%;
    background: linear-gradient(
            58deg, rgba(235, 0, 0, 1) 20%, rgba(256, 0, 0, 1) 100%
    );
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    
    &:hover {
        background: linear-gradient(
                58deg, rgba(256, 0, 0, 1) 20%, rgba(235, 0, 0, 1) 100%
        );
    }
`;

const FormTitle = styled.h3`
    margin-bottom: 10px;
    color: #333;
`;

const FormContainer = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;

const Sidebar: React.FC<SidebarProps> = ({
                                             isOpen,
                                             toggleSidebar,
                                             handleLogout,
                                             handleChangePassword,
                                             handleDeleteAccount,
                                         }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [deletePassword, setDeletePassword] = useState('');

    const handlePasswordChangeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleChangePassword(oldPassword, newPassword);
        setOldPassword('');
        setNewPassword('');
    };

    const handleDeleteAccountSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleDeleteAccount(deletePassword);
        setDeletePassword('');
    };

    return (
        <SidebarContainer isOpen={isOpen}>
            <CloseButton onClick={toggleSidebar}>×</CloseButton>
            <SubmitButton onClick={handleLogout}>Logout</SubmitButton>

            <FormContainer onSubmit={handlePasswordChangeSubmit}>
                <FormTitle>Change password</FormTitle>
                <Input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <Marginer direction="vertical" margin="5px" />
                <SubmitButton type="submit">Change password</SubmitButton>
            </FormContainer>

            <FormContainer onSubmit={handleDeleteAccountSubmit}>
                <FormTitle>Delete account</FormTitle>
                <Input
                    type="password"
                    placeholder="Password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                />
                <Marginer direction="vertical" margin="5px" />
                <DeleteButton type="submit">Delete account</DeleteButton>
            </FormContainer>
        </SidebarContainer>
    );
};

export default Sidebar;