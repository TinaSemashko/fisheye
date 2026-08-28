"use client";

import { useState } from "react";
import ContactModal from "./contactModal";

type Props = {
  photographerName: string;
};

const ContactButton = ({ photographerName }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Contact Me"
        className="bg-[#901C1C] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#6e1515] whitespace-nowrap"
      >
        Contactez-moi
      </button>

      {isOpen && (
        <ContactModal
          photographerName={photographerName}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default ContactButton;