const styles = {
  global: {
    'html,body,#___gatsby,#gatsby-focus-wrapper': {
      height: '100%',
    },
    body: {
      bg: 'bgColor',
      color: 'whiteAlpha.900',
    },
    h1: {
      fontFamily: 'heading',
      fontSize: '4xl',
      fontWeight: 'bold',
      marginTop: { base: 8, sm: 16 },
      marginBottom: 4,
    },
    h2: {
      fontFamily: 'heading',
      fontSize: '2xl',
      fontWeight: 'bold',
      marginTop: 12,
      marginBottom: 4,
    },
    h3: {
      fontFamily: 'heading',
      fontSize: 'xl',
      fontWeight: 'bold',
      marginTop: 8,
      marginBottom: 4,
    },
    h4: {
      fontFamily: 'heading',
      fontSize: 'md',
      fontWeight: 'bold',
      marginTop: 4,
      marginBottom: 4,
    },
    h5: {
      fontFamily: 'heading',
      fontSize: 'md',
      fontWeight: 'normal',
      fontStyle: 'italic',
      marginTop: 4,
      marginBottom: 4,
    },
    p: {
      marginY: 4,
    },
    ul: {
      listStyleType: 'disc',
      listStylePosition: 'outside',
      paddingLeft: '40px',
    },
    ol: {
      listStyleType: 'decimal',
      listStylePosition: 'outside',
      paddingLeft: '40px',
    },
    'ul ul, ol ul': {
      listStyleType: 'circle',
      listStylePosition: 'outside',
      paddingLeft: '16px',
    },
    'ol ol, ul ol': {
      listStyleType: 'lower-latin',
      listStylePosition: 'outside',
      paddingLeft: '16px',
    },
    figure: {
      marginTop: 8,
      marginBottom: 8,
      figcaption: {
        marginTop: 2,
        textAlign: 'center',
        fontStyle: 'italic',
        fontSize: 'sm',
      },
    },
    a: {
      color: '#ff63c3',
      textUnderlineOffset: 3,
      '&:hover': {
        textDecoration: 'underline',
      },
    },

    table: {
      margin: '0 auto',
      backgroundColor: '#252528',
      border: 'none',
      borderCollapse: 'collapse',
      thead: {
        tr: {
          borderBottom: '1px solid #313134',
          th: {
            padding: '16px 32px',
            opacity: 0.5,
            fontWeight: 'normal',
            textAlign: 'center',
          },
        },
      },
      tr: {
        borderTop: '1px solid #313134',
        '&:first-of-type': {
          borderTop: 'none',
        },
      },
      td: {
        padding: '16px 32px',
      },
      'td, th': {
        borderLeft: '1px solid #313134',
        '&:first-of-type': {
          borderLeft: 'none',
        },
      },
    },
    '.gatsby-resp-image-wrapper': {
      borderRadius: '6px',
      overflow: 'hidden',
    },
    '.student-project': {
      counterReset: 'figures',

      figure: {
        counterIncrement: 'figures',
        'figcaption p:before': {
          content: "'Fig. ' counter(figures) '\\0000a0\\0000a0\\0000a0'",
        },
      },
    },
    '.gatsby-code-title': {
      textAlign: 'center',
      fontSize: 'xs',
      fontFamily: 'body',
      paddingTop: 1,
      color: '#999',
      borderRadius: '8px 8px 0 0',
      background: 'rgb(45,45,45)',
    },
    '.gatsby-highlight': {
      '& pre[class*="language-"]': {
        borderRadius: '8px',
      },
    },
    '.gatsby-code-title+.gatsby-highlight': {
      '& pre[class*="language-"]': {
        marginTop: 0,
        borderRadius: '0 0 8px 8px',
      },
    },
    '.math.math-display': {
      overflowX: 'auto',
    },
  },
};

export default styles;
