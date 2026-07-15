const WHATSAPP_NUMBER = "5535988942863";
const DEFAULT_MESSAGE = "Olá! Quero fazer um orçamento de uma Tattoo.";

export function buildWhatsAppLink(message: string = DEFAULT_MESSAGE) {
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${WHATSAPP_NUMBER}?${params.toString()}`;
}

export const WHATSAPP_DEFAULT_LINK = buildWhatsAppLink();
