import React from 'react';
import PropTypes from 'prop-types';
import MainCard from 'components/MainCard';
import { Stack } from '@mui/material';

// ===============================|| SHADOW BOX ||=============================== //

function QuestionBox({ shadow, suffix = 'a', text = 'default', color, noSuffix }) {
    return (
        <MainCard
            border={true}
            sx={{
                justifyContent: 'center',
                display: 'flex',
                height: '100%',
                backgroundColor: color,
                borderColor: color,
                boxShadow: color ? `0px 0px 10px 2px ${color}` : shadow
            }}
        >
            <Stack spacing={1} justifyContent="center" alignItems="center">
                {noSuffix ? (
                    <div style={{ textAlign: 'center', width: '100%' }} className='tw-text-center'>
                        {`${text}`}
                    </div>
                ) : (
                    <div style={{ textAlign: 'left', width: '100%' }}>
                        {`${suffix}-`} {" "} {`${text}`}
                    </div>
                )}
            </Stack>
        </MainCard>
    );
}

QuestionBox.propTypes = {
    shadow: PropTypes.string.isRequired,
    suffix: PropTypes.string,
    text: PropTypes.string,
    color: PropTypes.string,
    noSuffix: PropTypes.bool,
};

export default QuestionBox;
