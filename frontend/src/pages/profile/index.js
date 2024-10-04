import Profile from "src/views/profile";

const ProfilePage = () => <Profile />;

ProfilePage.acl = {
  action: "read",
  permission: "profile",
};
export default ProfilePage;
