import CreatePost from "./CreatePost";
import Home from "./Home";
import Notifications from "./Notifications";
import ProfileLink from "./ProfileLink";
import Explore from "./Explore";
import Messages from "./Messages";

const SidebarItems = () => {
  return (
    <>
      <Home />
      <Explore />
      <Notifications />
      <Messages />

      <CreatePost />
      <ProfileLink />
    </>
  );
};

export default SidebarItems;
