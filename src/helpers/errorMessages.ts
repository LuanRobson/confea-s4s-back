export const fieldRequired = (field: string): string =>
    `O campo '${field}' é obrigatório`;
  
  export const fieldFormatInvalid = (field: string): string =>
    `O formato do campo '${field}' é inválido`;
  
  export const minContent = (min: number, field = null): string => {
    const text = field ? `O campo '${field}'` : '';
    return `${text} deve conter no mínimo ${min} caracteres`;
  };
  
  export const maxContent = (max: number, field = null): string => {
    const text = field ? `O campo '${field}'` : '';
    return `${text} deve conter no máximo ${max} caracteres`;
  };