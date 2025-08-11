import SidebarToggleButton from './SidebarToggleButton';

const Header = () => {
  return (
    <header className="border-border sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-white/80 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <SidebarToggleButton />
      </div>
    </header>
  );
};

export default Header;
