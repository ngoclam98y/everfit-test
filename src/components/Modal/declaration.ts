import { ReactNode } from 'react';
import { ButtonProps } from '../Button/declaration';


export interface ModalContextValue {
    isOpen: boolean;
    closable?: boolean;
    open: () => void;
    close: () => void;
    closeWithoutBackdrop: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
    disableEscapeKeyDown?: boolean;
}

export interface ModalProps {
    isOpen?: boolean;
    closable?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    onCloseWithoutBackdrop?: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
    children?: ReactNode;
    disableEscapeKeyDown?: boolean;
}

export interface ModalBodyProps {
    children?: ReactNode;
}

export interface ModalContentProps {
    children?: ReactNode;
}

export interface ModalCancelButtonProps extends ButtonProps {
    text?: string;
}

export interface ModalOkButtonProps extends ButtonProps {
    text?: string;
    loading?: boolean;
    closable?: boolean;
}


export interface ModalFooterProps {
    isCancel?: boolean;
    isOk?: boolean;
    onClickOk?: (e?: any) => void;
}

export interface ModalHeaderProps {
    isClose?: boolean;
    onClose?: () => void;
    title: string;
}