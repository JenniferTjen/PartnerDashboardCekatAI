// pages/index.tsx
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        redirect: {
            destination: '/home',
            permanent: false, // or `true` if you want the redirect to be permanent
        },
    };
};

const HomePage = () => {
    return;
};

export default HomePage;
