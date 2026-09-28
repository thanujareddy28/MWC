export const clerkAppearance = {
  variables: {
    colorPrimary: '#3D5245',
    colorBackground: '#FFFFFF',
    colorText: '#3D5245',
    colorTextSecondary: '#6B9080',
    colorDanger: '#E8A488',
    borderRadius: '0.9rem',
    fontFamily: 'inherit',
  },
  elements: {
    card: {
      boxShadow:
        '0 10px 30px -12px rgba(61, 82, 69, 0.18), 0 4px 10px -6px rgba(61, 82, 69, 0.10)',
      border: '1px solid rgba(138, 168, 143, 0.30)',
    },
    formButtonPrimary: {
      backgroundColor: '#3D5245',
      '&:hover': {
        backgroundColor: '#6B9080',
      },
    },
    footerActionLink: {
      color: '#6B9080',
      '&:hover': {
        color: '#3D5245',
      },
    },
  },
}

export default clerkAppearance
