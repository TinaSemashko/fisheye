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
        className="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-dark whitespace-nowrap"
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