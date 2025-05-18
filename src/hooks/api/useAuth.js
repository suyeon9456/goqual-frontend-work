import { useMutation } from '@tanstack/react-query';
import { login } from '../../apis/auth';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();

  const {
    mutateAsync: loginMutate,
    isPending: isLoading,
    error,
    isError,
  } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      navigate('/');
    },
    onError: (error) => {
      console.error(error);
      localStorage.removeItem('token');
    },
  });

  return { loginMutate, isLoading, error, isError };
};

export default useAuth;
