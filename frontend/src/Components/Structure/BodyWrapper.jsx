const BodyWrapper = () => {
    const { user, logout } = AuthData()


    return <>{user.isAuthenticated ? <UserHeader /> : <GuestHeader />}</>;
  };

  export default BodyWrapper;
