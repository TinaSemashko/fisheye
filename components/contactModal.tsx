type Props = {
  photographerName: string;
  onClose: () => void;
};

const ContactModal = ({ photographerName, onClose }: Props) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-label={`Contactez ${photographerName}`}
      aria-modal="true"
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-6"
    >
      <div className="bg-[#faf7f2] rounded-xl w-full max-w-md p-8 relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 text-2xl leading-none text-[#901C1C]"
        >
          ✕
        </button>

        <h2 className="text-2xl font-serif text-[#901C1C] mb-6">
          Contactez-moi {photographerName}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="contact-name" className="font-semibold">
              Prénom
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              className="border border-[#e7ded3] rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="contact-email" className="font-semibold">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              className="border border-[#e7ded3] rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="contact-message" className="font-semibold">
              Votre message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              className="border border-[#e7ded3] rounded-lg px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="bg-[#901C1C] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#6e1515] mt-2"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;