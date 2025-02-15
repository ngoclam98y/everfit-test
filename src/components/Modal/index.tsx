import { createContext, useContext, useEffect, useMemo } from 'react';
import { useDisclosure } from '../../hooks/useDisclosure';
import { ModalBodyProps, ModalCancelButtonProps, ModalContentProps, ModalContextValue, ModalFooterProps, ModalHeaderProps, ModalOkButtonProps, ModalProps } from './declaration';
import Button from '../Button';
import './style.scss';
import Icon from '../Icon';
import { CloseIcon } from '../../assets/icons/CloseIcon';

const ModalContext = createContext<ModalContextValue>(null as any);

const ModalContent = ({ children }: ModalContentProps) => {
    const { isOpen } = useContext(ModalContext);
    return <div className={`modal-content modal-overlay${isOpen ? ' active' : ''}`}>
        {children}
    </div>
}


const ModalContainer = (props: ModalBodyProps) => {
    const { children } = props;

    return (
        <div className='modal-container'>
            {children}
        </div>
    );
};

const ModalBody = (props: ModalBodyProps) => {
    const { children } = props;

    return (
        <div className='modal-body'>
            {children}
        </div>
    );
};

const ModalHeader = ({ onClose, isClose, title }: ModalHeaderProps) => {
    return <div className='modal-header'>
        <h3 className='modal-header-title'>{title}</h3>
        {isClose && <Icon icon={<CloseIcon />} onClick={onClose} />}
    </div>
}


const ModalFooter = ({ isCancel = true, isOk = true, onClickOk }: ModalFooterProps) => {
    return <div className='modal-footer'>
        {isCancel && <ModalCancelButton className='secondary' />}
        {isOk && <ModalOkButton onClick={onClickOk} />}
    </div>
}


const ModalCancelButton = (props: ModalCancelButtonProps) => {
    const { text = 'Cancel', onClick, ...rest } = props;
    const { close, closable } = useContext(ModalContext);

    return (
        <Button
            onClick={(e) => {
                if (!closable) return;

                close();
                onClick?.(e);
            }}
            {...rest}
        >
            {text}
        </Button>
    );
};

const ModalOkButton = (props: ModalOkButtonProps) => {
    const { text = 'OK', loading, closable, onClick, ...rest } = props;
    const { close } = useContext(ModalContext);

    return (
        <Button
            type="submit"
            onClick={(e) => {
                onClick && onClick(e);
                closable && close();
            }}
            {...rest}
        >
            {text}
        </Button>
    );
};

const Modal = (props: ModalProps) => {
    const { children, closable = true, onOpen, onClose, onCloseWithoutBackdrop, disableEscapeKeyDown } = props;
    const { isOpen, open, close, closeWithoutBackdrop } = useDisclosure();

    const contextValue = useMemo(
        () => ({
            isOpen,
            closable,
            open: () => {
                open();
                onOpen && onOpen();
            },
            close: () => {
                close();
                onClose && onClose();
            },
            closeWithoutBackdrop: (event: any, reason: 'backdropClick' | 'escapeKeyDown') => {
                closeWithoutBackdrop(event);
                onCloseWithoutBackdrop && onCloseWithoutBackdrop(event, reason);
            },
            disableEscapeKeyDown,
        }),
        [isOpen, closable, open, close, onClose, onOpen, onCloseWithoutBackdrop, disableEscapeKeyDown]
    );

    useEffect(() => {
        if (props.isOpen) {
            open();
        } else {
            close();
        }
    }, [props.isOpen]);

    return (
        <ModalContext.Provider value={contextValue}>
            {children}
        </ModalContext.Provider>
    );
};

export { Modal, ModalBody, ModalCancelButton, ModalOkButton, ModalFooter, ModalContent, ModalHeader, ModalContainer };
