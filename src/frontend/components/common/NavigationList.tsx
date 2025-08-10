interface NavigationListProps {
  title: string;
  children: React.ReactNode;
}

const NavigationList = ({ title, children }: NavigationListProps) => {
  return (
    <section className="mb-6">
      <h3 className="mb-3 px-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">{title}</h3>
      <ul className="space-y-1">{children}</ul>
    </section>
  );
};

export default NavigationList;
