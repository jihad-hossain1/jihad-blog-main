import translate from "google-translate-api-x";

function modText(text) {
  return text?.toLowerCase()?.trim();
}

async function translateToEnglish(text) {
  try {
    const result = await translate(text, { to: 'en' });
    return result.text;
  } catch (error) {
    throw new Error("Translation failed. Please try again.");
  }
}

async function modSlug(text, Model) {
  // Check if the text contains only English characters, numbers, hyphens, and underscores
  let isEnglish = /^[a-zA-Z0-9\s_-]+$/.test(text);

  // If not English, translate to English
  if (!isEnglish) {
    text = await translateToEnglish(text);
    // isEnglish = /^[a-zA-Z0-9\s_-]+$/.test(text);
    // console.log("🚀 ~ modSlug ~ isEnglish:", isEnglish)

    // // If translation doesn't result in English characters, throw an error
    // if (!isEnglish) {
    //   throw new Error("Title format is not valid. Please ensure the translated text is in English.");
    // }
  }

  const findText = await Model.findOne({ name: modText(text) });

  const modify = text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")         // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, "")      // Remove all non-word characters except hyphens
    .replace(/\-\-+/g, "-");       // Replace multiple hyphens with a single hyphen

  return findText ? `${modify}-${Math.floor(Math.random() * 100)}` : modify;
}

export { modSlug, modText };

