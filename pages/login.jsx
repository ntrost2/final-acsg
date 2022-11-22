import Head from 'next/head';
import Button from '@mui/material/Button';

import withAuth from '../lib/withAuth';
import { styleGoogleButton } from '../components/Styles';

const Login = () => (
  <div style={{ textAlign: 'center', margin: '0 20px' }}>
     <Button variant="contained" style={styleGoogleButton} href="/auth/google">
      <picture>
      <img
        src="https://storage.googleapis.com/builderbook/G.svg"
        alt="Log in with Google"
        style={{ marginRight: '10px' }}
      />
      </picture>
      Log in with Google
    </Button>
  </div>
);

export default withAuth(Login, { logoutRequired: true });
