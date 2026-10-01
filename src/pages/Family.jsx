import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Family() {
  const { lang, t } = useLanguage();

  // Load contacts from localStorage with friendly default demo contacts
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('senior_shield_contacts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return [
      { id: 1, name: 'बेटी प्रिया (Daughter Priya)', phone: '9876543210' },
      { id: 2, name: 'बेटा राहुल (Son Rahul)', phone: '9812345678' }
    ];
  });

  const [callerDetails, setCallerDetails] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [alertConfirmation, setAlertConfirmation] = useState(null);

  useEffect(() => {
    localStorage.setItem('senior_shield_contacts', JSON.stringify(contacts));
  }, [contacts]);

  const cleanPhone = (phone) => {
    // Strip non-digits
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      cleaned = '91' + cleaned; // default India code
    }
    return cleaned;
  };

  const getAlertMessage = () => {
    let msg = t.whatsappMessagePrefix;
    if (callerDetails.trim()) {
      msg += lang === 'hi' 
        ? `\n\nसंदिग्ध कॉलर विवरण: ${callerDetails.trim()}`
        : `\n\nSuspicious Caller Info: ${callerDetails.trim()}`;
    }
    msg += `\n\n- Sent via Honey Shield (Senior Protection App)`;
    return msg;
  };

  const triggerAlertAll = () => {
    if (contacts.length === 0) {
      alert(t.noContactsYet);
      setShowAddModal(true);
      return;
    }

    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([60, 40, 60, 40, 60]);
    }

    const msg = getAlertMessage();
    const primaryContact = contacts[0];
    const encoded = encodeURIComponent(msg);
    const targetUrl = `https://wa.me/${cleanPhone(primaryContact.phone)}?text=${encoded}`;

    // Open WhatsApp
    window.open(targetUrl, '_blank');

    // Show confirmation screen
    setAlertConfirmation({
      sentAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      contacts: contacts,
      message: msg
    });
  };

  const alertIndividual = (contact) => {
    const msg = getAlertMessage();
    const encoded = encodeURIComponent(msg);
    const targetUrl = `https://wa.me/${cleanPhone(contact.phone)}?text=${encoded}`;
    window.open(targetUrl, '_blank');
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;

    const newEntry = {
      id: Date.now(),
      name: newName.trim(),
      phone: newPhone.trim()
    };
    setContacts([...contacts, newEntry]);
    setNewName('');
    setNewPhone('');
    setShowAddModal(false);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  return (
    <div className="flex flex-col w-full pb-14 pt-2 animate-fadeIn max-w-[640px] mx-auto">
      
      {/* Title & Introduction */}
      <div className="flex flex-col gap-1 mb-4">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold">
          {t.familyTitle}
        </h1>
        <p className="font-body-xl text-body-xl text-on-surface-variant leading-relaxed">
          {t.familySubtitle}
        </p>
      </div>

      {/* Optional Caller Info Input */}
      <div className="bg-surface-container rounded-2xl p-5 shadow-sm mb-5 border border-surface-container-high">
        <label
          htmlFor="caller-info"
          className="block font-label-lg text-label-lg text-primary font-bold mb-2"
        >
          {t.callerDetailsLabel}
        </label>
        <input
          id="caller-info"
          type="text"
          value={callerDetails}
          onChange={(e) => setCallerDetails(e.target.value)}
          placeholder={t.callerDetailsPlaceholder}
          className="w-full min-h-[56px] px-4 rounded-xl bg-surface-container-lowest border-2 border-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/40 font-body-xl text-body-xl text-primary placeholder-outline outline-none"
        />
        <p className="text-[15px] text-on-surface-variant mt-2 font-medium">
          {lang === 'hi'
            ? 'यदि धोखेबाज ने कोई नाम या नंबर बताया है, तो वह संदेश में अपने आप जुड़ जाएगा।'
            : 'If the caller gave a fake name or badge number, it will be attached to the alert.'}
        </p>
      </div>

      {/* BIG RED "ALERT FAMILY" BUTTON */}
      <div className="mb-6">
        <button
          onClick={triggerAlertAll}
          className="w-full min-h-[76px] py-4 bg-error text-on-error hover:bg-red-700 active:scale-[0.98] rounded-2xl flex items-center justify-center gap-space-sm shadow-xl transition-transform border-2 border-red-800 font-headline-md text-headline-md focus:outline-none focus:ring-4 focus:ring-error/40 text-center px-4"
          aria-label={t.alertFamilyBigBtn}
        >
          <span className="material-symbols-outlined text-[36px] animate-pulse">
            emergency_share
          </span>
          <span className="font-bold">{t.alertFamilyBigBtn}</span>
        </button>
      </div>

      {/* Saved Trusted Contacts List */}
      <div className="bg-surface-container-low rounded-3xl p-5 sm:p-6 shadow-sm border border-surface-container-high flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[28px]">
              contact_phone
            </span>
            <span className="font-label-xl text-label-xl text-primary font-bold">
              {lang === 'hi' ? 'विश्वसनीय संपर्क' : 'Trusted Contacts'} ({contacts.length})
            </span>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 py-2 px-3.5 rounded-full bg-secondary-container text-on-secondary-container font-label-lg text-[16px] font-bold shadow-sm active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>{t.addContact}</span>
          </button>
        </div>

        {contacts.length === 0 ? (
          <div className="py-6 text-center text-on-surface-variant font-body-xl">
            {t.noContactsYet}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container-high flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0 font-bold text-[20px]">
                    {contact.name.charAt(0)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-lg text-label-lg text-primary font-bold truncate">
                      {contact.name}
                    </span>
                    <span className="font-body-md text-body-md text-on-surface-variant">
                      {contact.phone}
                    </span>
                  </div>
                </div>

                {/* Direct Actions: WhatsApp & Remove */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => alertIndividual(contact)}
                    aria-label={`Send alert to ${contact.name}`}
                    className="min-h-[48px] px-3.5 rounded-xl bg-success text-on-success flex items-center gap-1.5 font-bold text-[16px] shadow-sm active:scale-95"
                    title="Send WhatsApp Alert"
                  >
                    <span className="material-symbols-outlined text-[22px]">send</span>
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={() => deleteContact(contact.id)}
                    aria-label={`Delete ${contact.name}`}
                    className="w-11 h-11 rounded-xl bg-surface-container text-error flex items-center justify-center active:bg-surface-container-high"
                  >
                    <span className="material-symbols-outlined text-[24px]">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Guardian Reassurance Banner */}
      <div className="mt-5 w-full bg-surface-container rounded-2xl p-space-md flex items-center gap-space-md shadow-sm border border-surface-container-high">
        <div className="w-14 h-14 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
          <span className="material-symbols-outlined text-[32px]">shield</span>
        </div>
        <div className="flex flex-col">
          <span className="font-label-xl text-label-xl text-primary font-bold">
            {t.guardianCardTitle}
          </span>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            {lang === 'hi'
              ? 'संदेश जाते ही परिवार तुरंत जान जाएगा कि आप किसी दबाव में नहीं हैं।'
              : 'Alerting loved ones gives you an immediate layer of protection against fraud.'}
          </p>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {alertConfirmation && (
        <div
          aria-labelledby="confirm-modal-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-margin bg-primary/70 backdrop-blur-md animate-fadeIn"
          role="dialog"
        >
          <div className="w-full max-w-md rounded-3xl bg-surface-container-lowest p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center border-2 border-success">
            <div className="w-20 h-20 rounded-full bg-success text-on-success flex items-center justify-center mb-4 shadow-lg">
              <span className="material-symbols-outlined text-[48px]">check</span>
            </div>

            <h3
              className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold mb-2"
              id="confirm-modal-title"
            >
              {t.alertSentSuccessTitle}
            </h3>

            <p className="font-body-xl text-body-xl text-on-surface-variant mb-4 leading-relaxed">
              {t.alertSentSuccessDesc}
            </p>

            <div className="w-full bg-surface-container-low rounded-2xl p-4 mb-5 text-left border border-surface-container-high">
              <span className="text-[15px] font-bold text-secondary uppercase block mb-1">
                {lang === 'hi' ? 'अलर्ट किए गए परिजन:' : 'Alerted Family Members:'}
              </span>
              <ul className="space-y-1">
                {alertConfirmation.contacts.map((c) => (
                  <li key={c.id} className="font-body-lg text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-success text-[20px]">
                      task_alt
                    </span>
                    <span>{c.name} ({c.phone})</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="w-full min-h-[64px] rounded-2xl bg-primary text-on-primary font-headline-md text-headline-md flex items-center justify-center shadow-md active:scale-95 transition-transform"
              onClick={() => setAlertConfirmation(null)}
              type="button"
            >
              {lang === 'hi' ? 'ठीक है (OK)' : 'Understood (OK)'}
            </button>
          </div>
        </div>
      )}

      {/* ADD CONTACT MODAL */}
      {showAddModal && (
        <div
          aria-labelledby="add-contact-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-margin bg-primary/60 backdrop-blur-sm animate-fadeIn"
          role="dialog"
        >
          <div className="w-full max-w-sm rounded-3xl bg-surface-container-lowest p-6 shadow-2xl border border-surface-container-high">
            <h3
              className="font-headline-md text-headline-md text-primary font-bold mb-4"
              id="add-contact-title"
            >
              {t.addContact}
            </h3>

            <form onSubmit={handleAddContact} className="flex flex-col gap-4">
              <div>
                <label className="block font-label-lg text-primary mb-1 font-semibold">
                  {t.contactName}
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Priya"
                  className="w-full min-h-[54px] px-4 rounded-xl bg-surface-container border-2 border-outline-variant font-body-xl text-primary outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="block font-label-lg text-primary mb-1 font-semibold">
                  {t.contactPhone}
                </label>
                <input
                  type="tel"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full min-h-[54px] px-4 rounded-xl bg-surface-container border-2 border-outline-variant font-body-xl text-primary outline-none focus:border-secondary"
                />
              </div>

              <div className="flex gap-3 mt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 min-h-[56px] rounded-xl bg-surface-container-high text-primary font-label-xl"
                >
                  {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="w-1/2 min-h-[56px] rounded-xl bg-primary text-on-primary font-label-xl"
                >
                  {t.saveContact}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
