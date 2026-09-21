// Central contact details — update here to change site-wide.
export const WHATSAPP_NUMBER = '919949826052';
export const CONTACT_EMAIL = 'tuningideas@gmail.com';

// Plain, generic links — used by the Contact page, footer, and floating button.
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
export const EMAIL_LINK = `mailto:${CONTACT_EMAIL}`;
export const WHATSAPP_LABEL = 'Message Tuning Ideas on WhatsApp.';

/**
 * WhatsApp link pre-filled with an enquiry message for a specific project.
 */
export const getProjectWhatsAppLink = (projectTitle: string, projectCode?: string): string => {
  const ref = projectCode ? ` (${projectCode})` : '';
  const message = `Hi Tuning Ideas, I am interested and want details regarding the "${projectTitle}"${ref} project.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

/**
 * Mailto link pre-filled with subject + body for a specific project.
 */
export const getProjectEmailLink = (projectTitle: string, projectCode?: string): string => {
  const ref = projectCode ? ` (${projectCode})` : '';
  const subject = `Enquiry: ${projectTitle}${ref}`;
  const body = `Hi Tuning Ideas team,\n\nI am interested and want details regarding the "${projectTitle}"${ref} project.\n\nPlease share more information.\n\nThanks.`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
