import React, { useEffect, useState } from 'react';
import { getUserData } from '../service/UserService';

const UserComponent = () => {
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

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};

export default UserComponent;
