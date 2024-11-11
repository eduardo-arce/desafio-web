import { useEffect, useState } from 'react';
import { getUserData } from '../service/UserService';

export const UserComponent = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        setUser(userData);
      } catch (error) {
        console.error('Erro ao carregar os dados do usuário');
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (<div>usercomponent</div>)
};

export default UserComponent;
