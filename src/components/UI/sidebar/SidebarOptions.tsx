import Link from "next/link";

type LinkItem = {
  href: string;
  label: string;
};

export const SidebarOptions = ({ links }: { links: LinkItem[] }) => {
  return (
    <div className="flex flex-col gap-2">
      {links.map((link) => (
        <Link
          key={link.href}
          className="block w-full rounded-lg px-4 py-2 transition-all duration-300 ease-in-out hover:bg-default-200  hover:shadow-lg transform hover:scale-105"
          href={link.href}>
          <span className="font-semibold">{link.label}</span>
        </Link>
      ))}
    </div>
  );
};
