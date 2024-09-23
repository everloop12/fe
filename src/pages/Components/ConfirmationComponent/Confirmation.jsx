/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Button, Modal } from '../../../../node_modules/@mui/material/index';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'rgb(229 231 235);',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '10px',
    p: 2,
};

const ConfirmationModal = ({
    children,
    show,
    setShow,
    onConfirm,
}) => (
    <Modal
        className="confirmation-model"
        open={show}
        onClose={() => setShow(false)}
    >
        <Box sx={style}>
            <div className='tw-bg-white tw-w-full tw-rounded-md tw-shadow-lg tw-h-full tw-p-6'>
                <div>
                    <h6 className="mb-3 fw-semi-bold tw-text-base tw-mt-0 tw-mb-4">Are you sure?</h6>
                    <div className="small tw-mb-4">{children}</div>
                </div>
                <div className='tw-flex tw-justify-between'>
                    <Button
                        type="button"
                        color='primary'
                        className="btn btn-cancel btn-sm"
                        onClick={() => setShow(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        color='error'
                        size="sm"
                        onClick={() => setShow(false) || onConfirm()}
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </Box>
    </Modal>
);

export default ConfirmationModal;
