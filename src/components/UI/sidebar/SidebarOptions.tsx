"use client";

import React, { useState } from "react";
import { Link } from "@heroui/link";
import { Accordion, AccordionItem } from "@heroui/accordion"; // assuming HeroUI has this
import { ChevronDown, ChevronRight } from "lucide-react"; // optional icons

type LinkItem = {
  href: string;
  label: string;
};

type SidebarGroup = {
  label: string;
  links: LinkItem[];
};

export const SidebarOptions = ({ groups }: { groups: SidebarGroup[] }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {groups.map((group, index) => (
        <Folder key={index} label={group.label} links={group.links} />
      ))}
    </div>
  );
};

const Folder = ({ label, links }: { label: string; links: LinkItem[] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg">
      <button
        className="w-full flex justify-between items-center px-4 py-2 font-semibold bg-default-100 hover:bg-default-200 hover:rounded-md transition"
        onClick={() => setOpen(!open)}
      >
        <span>{label}</span>
        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      {open && (
        <div className="flex flex-col px-2 py-2 gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              className="text-default-500 block w-full rounded-md px-3 py-1.5 transition-all hover:bg-default-200"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
