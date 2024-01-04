import { TailSpin } from 'react-loader-spinner';
import { LoaderContainer } from 'styled';

export const Loader = () => {
  return (
    <LoaderContainer>
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#3f51b5"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </LoaderContainer>
  );
};
