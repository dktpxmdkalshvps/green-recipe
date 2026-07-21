export const validateRecipeForm = (form) => {
  return !!(form.name && form.name.trim() && form.time);
};
