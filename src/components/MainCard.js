import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

// project import
import Highlighter from './third-party/Highlighter';

// header style
const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

// ==============================|| CUSTOM - MAIN CARD ||============================== //

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentSX = {},
      elevation,
      secondary,
      // shadow,
      sx = {},
      title,
      codeHighlight,
      borderColor,
      reversed = false,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();
    const [hovered, setHovered] = useState(false);
    // boxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow;
    return (
      <Card
        onMouseEnter={() => setHovered(reversed ? false : true)}
        onMouseLeave={() => setHovered(reversed ? true : false)}
        elevation={elevation || 0}
        ref={ref}
        {...others}
        style={!hovered ? { boxShadow: '2px 3px 3px 2px #CCC' } : {}}
        sx={{
          padding: '10px',
          border: border ? '1px solid' : 'none',
          borderRadius: 2,
          borderColor: borderColor ? 'black' : theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey.A800,
          boxShadow: boxShadow,
          '& pre': {
            m: 0,
            p: '16px !important',
            fontFamily: theme.typography.fontFamily,
            fontSize: '0.75rem'
          },
          ...sx
        }}
      >
        {/* card header and action */}
        {title && <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />}

        {/* card content */}
        {content && <CardContent sx={contentSX}>{children}</CardContent>}
        {!content && children}

        {/* card footer - clipboard & highlighter  */}
        {codeHighlight && (
          <>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Highlighter codeHighlight={codeHighlight} main>
              {children}
            </Highlighter>
          </>
        )}
      </Card>
    );
  }
);

MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  divider: PropTypes.bool,
  elevation: PropTypes.number,
  secondary: PropTypes.node,
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  codeHighlight: PropTypes.bool,
  content: PropTypes.bool,
  borderColor: PropTypes.string,
  children: PropTypes.node
};

export default MainCard;
